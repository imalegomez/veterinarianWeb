import { Calendar, Clock, Users, ChevronRight, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AppointmentType } from './AppointmentType'

export const AppointmentCard = ({ appointment }) => (
  <Card className="hover:shadow-md transition-all duration-200">
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
)