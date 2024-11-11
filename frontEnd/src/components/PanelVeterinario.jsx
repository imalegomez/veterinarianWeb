import { PlusCircle, Users, Calendar, Syringe, Clock, Folder, Stethoscope, X } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from 'react'

export default function PanelVeterinario() {
  const [openDialog, setOpenDialog] = useState("")

  const quickActions = [
    { 
      icon: PlusCircle, 
      label: 'Nuevo Paciente', 
      color: 'bg-green-500', 
      hoverColor: 'hover:bg-green-600', 
      tag: 'Nuevo',
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre de la Mascota</Label>
            <Input id="nombre" required />
          </div>
          <div>
            <Label htmlFor="especie">Especie</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione especie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Perro</SelectItem>
                <SelectItem value="2">Gato</SelectItem>
                <SelectItem value="3">Ave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="raza">Raza</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione raza" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Golden Retriever</SelectItem>
                <SelectItem value="2">Siamés</SelectItem>
                <SelectItem value="3">Bulldog</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="propietario">Propietario</Label>
            <Input id="propietario" required />
          </div>
          <div>
            <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
            <Input id="fecha_nacimiento" type="date" required />
          </div>
          <div>
            <Label htmlFor="telefono">Teléfono de Contacto</Label>
            <Input id="telefono" type="tel" required />
          </div>
          <div>
            <Label htmlFor="email">Email de Contacto</Label>
            <Input id="email" type="email" required />
          </div>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Guardar Paciente</Button>
          </div>
        </div>
      )
    },
    { 
      icon: Clock, 
      label: 'Agendar Cita', 
      color: 'bg-blue-500', 
      hoverColor: 'hover:bg-blue-600', 
      tag: 'Rápido',
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="paciente">Paciente</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione paciente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Max - Golden Retriever</SelectItem>
                <SelectItem value="2">Luna - Siamés</SelectItem>
                <SelectItem value="3">Rocky - Bulldog</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="veterinario">Veterinario</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione veterinario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Dr. García</SelectItem>
                <SelectItem value="2">Dra. Rodríguez</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tipo_cita">Tipo de Cita</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Consulta General</SelectItem>
                <SelectItem value="2">Vacunación</SelectItem>
                <SelectItem value="3">Control</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="fecha_hora">Fecha y Hora</Label>
            <Input id="fecha_hora" type="datetime-local" required />
          </div>
          <div>
            <Label htmlFor="notas">Notas</Label>
            <Textarea id="notas" />
          </div>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Agendar Cita</Button>
          </div>
        </div>
      )
    },
    { 
      icon: Folder, 
      label: 'Registro Médico', 
      color: 'bg-yellow-500', 
      hoverColor: 'hover:bg-yellow-600', 
      tag: 'Seguro',
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="paciente">Paciente</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione paciente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Max - Golden Retriever</SelectItem>
                <SelectItem value="2">Luna - Siamés</SelectItem>
                <SelectItem value="3">Rocky - Bulldog</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="veterinario">Veterinario</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione veterinario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Dr. García</SelectItem>
                <SelectItem value="2">Dra. Rodríguez</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="fecha">Fecha</Label>
            <Input id="fecha" type="date" required />
          </div>
          <div>
            <Label htmlFor="diagnostico">Diagnóstico</Label>
            <Textarea id="diagnostico" required />
          </div>
          <div>
            <Label htmlFor="tratamiento">Tratamiento</Label>
            <Textarea id="tratamiento" required />
          </div>
          <div>
            <Label htmlFor="notas">Notas</Label>
            <Textarea id="notas" />
          </div>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Guardar Registro</Button>
          </div>
        </div>
      )
    },
    { 
      icon: Syringe, 
      label: 'Vacunación', 
      color: 'bg-purple-500', 
      hoverColor: 'hover:bg-purple-600', 
      tag: 'Importante',
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="paciente">Paciente</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione paciente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Max - Golden Retriever</SelectItem>
                <SelectItem value="2">Luna - Siamés</SelectItem>
                <SelectItem value="3">Rocky - Bulldog</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="veterinario">Veterinario</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione veterinario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Dr. García</SelectItem>
                <SelectItem value="2">Dra. Rodríguez</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="fecha">Fecha</Label>
            <Input id="fecha" type="date" required />
          </div>
          <div>
            <Label htmlFor="tipo_vacuna">Tipo de Vacuna</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione vacuna" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Parvovirus</SelectItem>
                <SelectItem value="2">Rabia</SelectItem>
                <SelectItem value="3">Moquillo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="notas">Notas</Label>
            <Textarea id="notas" />
          </div>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Registrar Vacunación</Button>
          </div>
        </div>
      )
    },
    { 
      icon: Stethoscope, 
      label: 'Examen Físico', 
      color: 'bg-red-500', 
      hoverColor: 'hover:bg-red-600', 
      tag: 'Detallado',
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="paciente">Paciente</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione paciente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Max - Golden Retriever</SelectItem>
                <SelectItem value="2">Luna - Siamés</SelectItem>
                <SelectItem value="3">Rocky - Bulldog</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="veterinario">Veterinario</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione veterinario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Dr. García</SelectItem>
                <SelectItem value="2">Dra. Rodríguez</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="fecha">Fecha</Label>
            <Input id="fecha" type="date" required />
          </div>
          <div>
            <Label htmlFor="peso">Peso (kg)</Label>
            <Input id="peso" type="number" step="0.1" required />
          </div>
          <div>
            <Label htmlFor="temperatura">Temperatura (°C)</Label>
            <Input id="temperatura" type="number" step="0.1" required />
          </div>
          <div>
            <Label htmlFor="frecuencia_cardiaca">Frecuencia Cardíaca</Label>
            <Input id="frecuencia_cardiaca" type="number" required />
          </div>
          <div>
            <Label htmlFor="frecuencia_respiratoria">Frecuencia Respiratoria</Label>
            <Input id="frecuencia_respiratoria" type="number" required />
          </div>
          <div>
            <Label htmlFor="observaciones">Observaciones</Label>
            <Textarea id="observaciones" required />
          </div>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Guardar Examen</Button>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Panel de Control</h1>
          <p className="text-gray-500">Bienvenido de nuevo, Dr. García</p>
        </div>
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
            {quickActions.map((action, i) => (
              <Dialog 
                key={i} 
                open={openDialog === action.label} 
                onOpenChange={(open) => setOpenDialog(open ? action.label : "")}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
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
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Acceder a {action.label.toLowerCase()}</p>
                  </TooltipContent>
                </Tooltip>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <action.icon size={20} />
                      {action.label}
                    </DialogTitle>
                  </DialogHeader>
                  {action.content}
                </DialogContent>
              </Dialog>
            ))}
          </TooltipProvider>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}