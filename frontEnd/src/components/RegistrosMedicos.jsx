import { useState } from 'react'
import { Search, Filter, FileText, Download, Printer, ChevronDown, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const StatusBadge = ({ type }) => {
  const colors = {
    'Vacunación': 'bg-green-100 text-green-800',
    'Cirugía': 'bg-red-100 text-red-800',
    'Revisión': 'bg-blue-100 text-blue-800',
    'Tratamiento': 'bg-yellow-100 text-yellow-800'
  }
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[type]}`}>
      {type}
    </span>
  )
}

export default function RegistrosMedicos() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [records] = useState([
    { id: 1, patient: 'Max', type: 'Vacunación', date: '2023-05-15', vet: 'Dr. García', status: 'Completado' },
    { id: 2, patient: 'Luna', type: 'Cirugía', date: '2023-05-10', vet: 'Dra. Rodríguez', status: 'En proceso' },
    { id: 3, patient: 'Rocky', type: 'Revisión', date: '2023-05-08', vet: 'Dr. López', status: 'Completado' },
    { id: 4, patient: 'Milo', type: 'Tratamiento', date: '2023-05-05', vet: 'Dra. Martínez', status: 'Pendiente' },
    { id: 5, patient: 'Bella', type: 'Vacunación', date: '2023-05-01', vet: 'Dr. García', status: 'Completado' },
  ])

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.vet.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || record.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <Card className="container mx-auto p-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Registros Médicos</CardTitle>
          <div className="flex gap-2">
            <Button className="flex items-center gap-2">
              <Calendar size={16} />
              Agendar Cita
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Buscar por paciente o veterinario..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="md:col-span-8 flex justify-end gap-2">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Vacunación">Vacunación</SelectItem>
                <SelectItem value="Cirugía">Cirugía</SelectItem>
                <SelectItem value="Revisión">Revisión</SelectItem>
                <SelectItem value="Tratamiento">Tratamiento</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              Más Filtros
              <ChevronDown size={16} />
            </Button>
          </div>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Paciente</TableHead>
                <TableHead className="font-semibold">Tipo</TableHead>
                <TableHead className="font-semibold">Fecha</TableHead>
                <TableHead className="font-semibold">Veterinario</TableHead>
                <TableHead className="font-semibold">Estado</TableHead>
                <TableHead className="font-semibold">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{record.patient}</TableCell>
                  <TableCell>
                    <StatusBadge type={record.type} />
                  </TableCell>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>{record.vet}</TableCell>
                  <TableCell>
                    <Badge variant={
                      record.status === 'Completado' ? 'success' :
                      record.status === 'En proceso' ? 'warning' : 'secondary'
                    }>
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8">
                        <FileText size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8">
                        <Download size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8">
                        <Printer size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}