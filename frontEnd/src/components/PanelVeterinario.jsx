import { PlusCircle, Users, Calendar, Syringe, Clock, Folder, Stethoscope } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PanelVeterinario() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
          <p className="text-gray-500">Bienvenido de nuevo, Dr. García</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <PlusCircle className="mr-2" size={20} />
          Nueva Cita
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pacientes Totales</CardTitle>
            <Users className="text-blue-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-gray-500 mt-1">Registrados en el sistema</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Citas Hoy</CardTitle>
            <Calendar className="text-blue-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500 mt-1">2 pendientes</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Vacunaciones</CardTitle>
            <Syringe className="text-blue-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-gray-500 mt-1">Esta semana</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pacientes Recientes</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-500">Ver todos</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Max', type: 'Perro', breed: 'Golden Retriever', time: '2 días' },
                { name: 'Luna', type: 'Gato', breed: 'Siamés', time: '3 días' },
                { name: 'Rocky', type: 'Perro', breed: 'Bulldog', time: '5 días' }
              ].map((patient, i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-500">{patient.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-gray-500">{patient.type} • {patient.breed}</p>
                  </div>
                  <span className="text-sm text-gray-400">{patient.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Próximas Citas</CardTitle>
              <Button variant="ghost" size="sm" className="text-blue-500">Ver todas</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Bella', type: 'Gato', time: 'Hoy, 14:00', status: 'Confirmada' },
                { name: 'Charlie', type: 'Perro', time: 'Mañana, 10:00', status: 'Pendiente' },
                { name: 'Milo', type: 'Conejo', time: '23 Mayo, 15:30', status: 'Confirmada' }
              ].map((appointment, i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`w-2 h-2 rounded-full ${appointment.status === 'Confirmada' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <div className="flex-1">
                    <p className="font-medium">{appointment.name}</p>
                    <p className="text-sm text-gray-500">{appointment.type} • {appointment.status}</p>
                  </div>
                  <span className="text-sm text-gray-400">{appointment.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Acceso rápido a funciones comunes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <TooltipProvider>
              {[
                { icon: PlusCircle, label: 'Nuevo Paciente', color: 'bg-green-500', hoverColor: 'hover:bg-green-600', tag: 'Nuevo' },
                { icon: Clock, label: 'Agendar Cita', color: 'bg-blue-500', hoverColor: 'hover:bg-blue-600', tag: 'Rápido' },
                { icon: Folder, label: 'Registros Médicos', color: 'bg-yellow-500', hoverColor: 'hover:bg-yellow-600', tag: 'Seguro' },
                { icon: Syringe, label: 'Vacunaciones', color: 'bg-purple-500', hoverColor: 'hover:bg-purple-600', tag: 'Importante' },
                { icon: Stethoscope, label: 'Examen Físico', color: 'bg-red-500', hoverColor: 'hover:bg-red-600', tag: 'Detallado' }
              ].map((action, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <Button 
                      className={`w-full flex items-center justify-between ${action.color} ${action.hoverColor} text-white group transition-all duration-200`}
                    >
                      <div className="flex items-center gap-3">
                        <action.icon size={18} />
                        <span>{action.label}</span>
                      </div>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded-full group-hover:bg-white/30 transition-colors">
                        {action.tag}
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Acceder a {action.label.toLowerCase()}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}