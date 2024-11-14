import { useState, useEffect } from 'react'
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  }
})

const StatusBadge = ({ lastVisit }) => {
  const days = Math.floor((new Date() - new Date(lastVisit)) / (1000 * 60 * 60 * 24))
  
  if (days > 180) {
    return (
      <Badge variant="destructive" className="gap-1">
        <AlertCircle size={14} />
        Hace {Math.floor(days/30)} meses
      </Badge>
    )
  }
  if (days > 90) {
    return (
      <Badge variant="warning" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
        Hace {Math.floor(days/30)} meses
      </Badge>
    )
  }
  return (
    <Badge variant="success" className="bg-green-100 text-green-700 hover:bg-green-100">
      Hace {days} días
    </Badge>
  )
}

const SpeciesBadge = ({ speciesName }) => {
  const colors = {
    'Perro': 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    'Gato': 'bg-purple-100 text-purple-700 hover:bg-purple-100',
    'Conejo': 'bg-pink-100 text-pink-700 hover:bg-pink-100',
    'Caballo': 'bg-green-100 text-pink-700 hover:bg-green-100'
  }
  
  return (
    <Badge variant="secondary" className={colors[speciesName] || 'bg-gray-100 text-gray-700'}>
      {speciesName}
    </Badge>
  )
}

const LoadingRow = () => (
  <TableRow>
    {[...Array(6)].map((_, index) => (
      <TableCell key={index}>
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
      </TableCell>
    ))}
  </TableRow>
)

const LoadingSkeleton = () => (
  <>
    {[...Array(5)].map((_, index) => (
      <LoadingRow key={index} />
    ))}
  </>
)

export default function Pacientes() {
  const [patients, setPatients] = useState([])
  const [filteredPatients, setFilteredPatients] = useState([])
  const [species, setSpecies] = useState([])
  const [owners, setOwners] = useState([])
  const [searchFocused, setSearchFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecies, setSelectedSpecies] = useState('todos')
  const [selectedStatus, setSelectedStatus] = useState('todos')
  const [sortBy, setSortBy] = useState('nombre')
  const [sortOrder, setSortOrder] = useState('asc')
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [patientsRes, speciesRes, ownersRes] = await Promise.all([
          api.get('/pacientes'),
          api.get('/especies'),
          api.get('/propietarios')
        ]);

        const patientsData = Array.isArray(patientsRes.data) ? patientsRes.data : []
        setPatients(patientsData)
        setFilteredPatients(patientsData)
        setSpecies(Array.isArray(speciesRes.data) ? speciesRes.data : [])
        setOwners(Array.isArray(ownersRes.data) ? ownersRes.data : [])
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Error al cargar los datos. Por favor, intente nuevamente.')
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchData()
  }, [])
  
  const getSpeciesName = (speciesId) => {
    const specie = species.find((s) => s.id === speciesId)
    return specie ? specie.nombre : 'Desconocido'
  }

  const getOwnerName = (ownerId) => {
    const owner = owners.find((o) => o.id === ownerId)
    return owner ? `${owner.nombre} ${owner.apellido || ''}` : 'Desconocido'
  }

  const getPatientStatus = (lastVisit) => {
    const days = Math.floor((new Date() - new Date(lastVisit)) / (1000 * 60 * 60 * 24))
    if (days > 180) return 'crítico'
    if (days > 90) return 'advertencia'
    return 'activo'
  }

  // Función para aplicar todos los filtros
  useEffect(() => {
    let result = [...patients]
    
    // Aplicar búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(patient => 
        patient.nombre.toLowerCase().includes(searchLower) ||
        getSpeciesName(patient.especie_id).toLowerCase().includes(searchLower) ||
        getOwnerName(patient.propietario_id).toLowerCase().includes(searchLower)
      )
    }
    
    // Filtrar por especie
    if (selectedSpecies !== 'todos') {
      result = result.filter(patient => patient.especie_id.toString() === selectedSpecies)
    }
    
    // Filtrar por estado
    if (selectedStatus !== 'todos') {
      result = result.filter(patient => getPatientStatus(patient.lastVisit) === selectedStatus)
    }
    
    // Ordenar resultados
    result.sort((a, b) => {
      let compareValue = 0
      switch (sortBy) {
        case 'nombre':
          compareValue = a.nombre.localeCompare(b.nombre)
          break
        case 'especie':
          compareValue = getSpeciesName(a.especie_id).localeCompare(getSpeciesName(b.especie_id))
          break
        case 'ultima_visita':
          compareValue = new Date(b.lastVisit) - new Date(a.lastVisit)
          break
        default:
          compareValue = 0
      }
      return sortOrder === 'asc' ? compareValue : -compareValue
    })
    
    setFilteredPatients(result)
  }, [patients, searchTerm, selectedSpecies, selectedStatus, sortBy, sortOrder])

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
            <p className="text-gray-500 text-sm">Gestiona la información de tus pacientes</p>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 shadow-sm transition-all duration-200 hover:shadow">
            <Plus className="mr-2" size={20} />
            Nuevo Paciente
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 mb-6">
          <div className="w-full md:w-1/3 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
              searchFocused ? 'text-blue-500' : 'text-gray-400'
            }`} size={20} />
            <Input 
              type="text" 
              placeholder="Buscar por nombre, especie o dueño..." 
              className={`pl-10 transition-all duration-200 ${
                searchFocused ? 'ring-2 ring-blue-500 border-blue-500' : ''
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Select 
              disabled={isLoading}
              value={selectedSpecies}
              onValueChange={setSelectedSpecies}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por especie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas las especies</SelectItem>
                {species.map((specie) => (
                  <SelectItem key={specie.id} value={specie.id.toString()}>
                    {specie.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={20} />
                  Más Filtros
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                  <SheetDescription>
                    Ajusta los filtros para encontrar pacientes específicos
                  </SheetDescription>
                </SheetHeader>
                <div className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Estado del Paciente</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        <SelectItem value="activo">Activos</SelectItem>
                        <SelectItem value="advertencia">Advertencia</SelectItem>
                        <SelectItem value="crítico">Críticos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ordenar por</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ordenar por..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nombre">Nombre</SelectItem>
                        <SelectItem value="especie">Especie</SelectItem>
                        <SelectItem value="ultima_visita">Última visita</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Orden</label>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                      <SelectTrigger>
                        <SelectValue placeholder="Orden..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Ascendente</SelectItem>
                        <SelectItem value="desc">Descendente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('nombre')}
                >
                  Nombre
                  {sortBy === 'nombre' && (
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('especie')}
                >
                  Especie
                  {sortBy === 'especie' && (
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </TableHead>
                <TableHead className="font-semibold">Dueño</TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => handleSort('ultima_visita')}
                >
                  Última Visita
                  {sortBy === 'ultima_visita' && (
                    <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </TableHead>
                <TableHead className="font-semibold text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <LoadingSkeleton />
              ) : error ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-red-500 py-4">
                    {error}
                  </TableCell>
                </TableRow>
              ) : filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <AlertCircle size={24} className="mb-2" />
                      <p className="text-sm">No se encontraron pacientes con los filtros seleccionados</p>
                      <Button 
                        variant="link" 
                        className="mt-2 text-blue-500"
                        onClick={() => {
                          setSearchTerm('')
                          setSelectedSpecies('todos')
                          setSelectedStatus('todos')
                          setSortBy('nombre')
                          setSortOrder('asc')
                        }}
                      >
                        Limpiar filtros
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map((patient) => (
                  <TableRow 
                    key={patient.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <TableCell className="font-medium">{patient.nombre}</TableCell>
                    <TableCell>
                      <SpeciesBadge speciesName={getSpeciesName(patient.especie_id)} />
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{getOwnerName(patient.propietario_id)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge lastVisit={patient.lastVisit} />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Resumen de filtros activos */}
        {(searchTerm || selectedSpecies !== 'todos' || selectedStatus !== 'todos') && (
          <div className="mt-4 flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-2">
                Búsqueda: {searchTerm}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setSearchTerm('')}
                >
                  ×
                </Button>
              </Badge>
            )}
            {selectedSpecies !== 'todos' && (
              <Badge variant="secondary" className="flex items-center gap-2">
                Especie: {species.find(s => s.id.toString() === selectedSpecies)?.nombre}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setSelectedSpecies('todos')}
                >
                  ×
                </Button>
              </Badge>
            )}
            {selectedStatus !== 'todos' && (
              <Badge variant="secondary" className="flex items-center gap-2">
                Estado: {selectedStatus}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => setSelectedStatus('todos')}
                >
                  ×
                </Button>
              </Badge>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}