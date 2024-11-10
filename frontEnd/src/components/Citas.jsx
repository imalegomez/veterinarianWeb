import { useState } from 'react'
import { Calendar, Clock, Search, Plus, Users, Stethoscope, ChevronRight, MoreVertical, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

const AppointmentType = ({ type }) => {
  const types = {
    'Revisión': {
      color: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      icon: <Stethoscope size={14} className="mr-1" />
    },
    'Vacunación': {
      color: 'bg-green-100 text-green-800 hover:bg-green-100',
      icon: <AlertCircle size={14} className="mr-1" />
    },
    'Cirugía': {
      color: 'bg-red-100 text-red-800 hover:bg-red-100',
      icon: <Stethoscope size={14} className="mr-1" />
    }
  }

  return (
    <Badge variant="secondary" className={`${types[type]?.color} flex items-center`}>
      {types[type]?.icon}
      {type}
    </Badge>
  )
}

export default function Citas() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [appointments, setAppointments] = useState([
    { 
      id: 1, 
      patient: 'Max', 
      owner: 'Juan Pérez', 
      date: '2024-05-20', 
      time: '10:00', 
      type: 'Revisión',
      status: 'pending',
      notes: 'Checkeo mensual'
    },
    { 
      id: 2, 
      patient: 'Luna', 
      owner: 'María García', 
      date: '2024-05-20', 
      time: '11:30', 
      type: 'Vacunación',
      status: 'confirmed',
      notes: 'Vacuna anual'
    },
    { 
      id: 3, 
      patient: 'Rocky', 
      owner: 'Carlos Rodríguez', 
      date: '2024-05-20', 
      time: '14:00', 
      type: 'Cirugía',
      status: 'confirmed',
      notes: 'Cirugía menor'
    },
    { 
      id: 4, 
      patient: 'Milo', 
      owner: 'Ana Martínez', 
      date: '2024-05-21', 
      time: '09:30', 
      type: 'Revisión',
      status: 'pending',
      notes: 'Primera visita'
    },
    { 
      id: 5, 
      patient: 'Bella', 
      owner: 'Laura Sánchez', 
      date: '2024-05-21', 
      time: '16:00', 
      type: 'Vacunación',
      status: 'confirmed',
      notes: 'Refuerzo vacuna'
    },
  ])

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Citas</h1>
            <p className="text-gray-500 text-sm">Gestiona las citas de tus pacientes</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600 shadow-sm transition-all duration-200 hover:shadow">
                  <Plus className="mr-2" size={20} />
                  Nueva Cita
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Programar nueva cita</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
              placeholder="Buscar por paciente o dueño..." 
              className={`pl-10 transition-all duration-200 ${
                searchFocused ? 'ring-2 ring-blue-500 border-blue-500' : ''
              }`}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Select defaultValue="todos">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="revision">Revisión</SelectItem>
                <SelectItem value="vacunacion">Vacunación</SelectItem>
                <SelectItem value="cirugia">Cirugía</SelectItem>
              </SelectContent>
            </Select>
            
            <Input 
              type="date" 
              className="w-[180px]"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <Card 
              key={appointment.id}
              className="hover:shadow-md transition-all duration-200"
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{appointment.patient}</span>
                    <AppointmentType type={appointment.type} />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Editar cita
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Ver historial
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Cancelar cita
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={16} />
                  <span className="text-sm">{appointment.owner}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} className="text-blue-500" />
                    <span className="text-sm">{new Date(appointment.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} className="text-blue-500" />
                    <span className="text-sm">{appointment.time}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-gray-500">{appointment.notes}</p>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between hover:bg-gray-50"
                >
                  Ver detalles
                  <ChevronRight size={16} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
}