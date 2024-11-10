import { useState } from 'react'
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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

const SpeciesBadge = ({ species }) => {
  const colors = {
    'Perro': 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    'Gato': 'bg-purple-100 text-purple-700 hover:bg-purple-100',
    'Conejo': 'bg-pink-100 text-pink-700 hover:bg-pink-100'
  }
  
  return (
    <Badge variant="secondary" className={colors[species] || 'bg-gray-100 text-gray-700'}>
      {species}
    </Badge>
  )
}

export default function Pacientes() {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Max', species: 'Perro', breed: 'Labrador', owner: 'Juan Pérez', lastVisit: '2024-05-15', status: 'Saludable' },
    { id: 2, name: 'Luna', species: 'Gato', breed: 'Siamés', owner: 'María García', lastVisit: '2023-11-10', status: 'En tratamiento' },
    { id: 3, name: 'Rocky', species: 'Perro', breed: 'Bulldog', owner: 'Carlos Rodríguez', lastVisit: '2023-09-08', status: 'Seguimiento' },
    { id: 4, name: 'Milo', species: 'Conejo', breed: 'Holandés', owner: 'Ana Martínez', lastVisit: '2023-08-05', status: 'Saludable' },
    { id: 5, name: 'Bella', species: 'Gato', breed: 'Persa', owner: 'Laura Sánchez', lastVisit: '2023-05-01', status: 'Requiere atención' },
  ])
  const [searchFocused, setSearchFocused] = useState(false)

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
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por especie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="perro">Perro</SelectItem>
                <SelectItem value="gato">Gato</SelectItem>
                <SelectItem value="conejo">Conejo</SelectItem>
              </SelectContent>
            </Select>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter size={20} />
                    Más Filtros
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filtrar por fecha, estado y más</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Nombre</TableHead>
                <TableHead className="font-semibold">Especie</TableHead>
                <TableHead className="font-semibold">Raza</TableHead>
                <TableHead className="font-semibold">Dueño</TableHead>
                <TableHead className="font-semibold">Última Visita</TableHead>
                <TableHead className="font-semibold text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow 
                  key={patient.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>
                    <SpeciesBadge species={patient.species} />
                  </TableCell>
                  <TableCell>{patient.breed}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{patient.owner}</span>
                      <span className="text-sm text-gray-500">ID: {patient.id}</span>
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
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}