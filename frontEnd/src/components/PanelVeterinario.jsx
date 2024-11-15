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
import { useState, useEffect } from 'react'
import axios from 'axios'
import { api } from '@/service/api'

export default function PanelVeterinario() {
  const [openDialog, setOpenDialog] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    weeklyVaccinations: 0
  })
  const [recentPatients, setRecentPatients] = useState([])
  const [upcomingAppointments, setUpcomingAppointments] = useState([])
  const [tiposCita, setTiposCita] = useState([])
  const [especies, setEspecies] = useState([])
  const [historia, setHistorial] = useState([])
  const [pacientes, setPacientes] = useState([])
  const [veterinarios, setVeterinarios] = useState([])
  const [appointmentForm, setAppointmentForm] = useState({
    paciente_id: '',
    veterinario_id: '',
    tipo_cita_id: '',
    fecha_hora: '',
    motivo: '',
    notas: '',
    estado: '' // Add estado (status) field
  })
  const [formValues, setFormValues] = useState({
    // Datos del propietario
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    direccion: '',
    // Datos de la mascota
    paciente: {
      nombre: '',
      especie_id: '',
      fecha_nacimiento: '',
      sexo: '',
      peso: ''
    }
  })
  const [historialForm, setHistorialForm] = useState({
    paciente_id: '',
    alergias: '',
    condiciones_cronicas: '',
    cirugias_previas: ''
  })

  useEffect(() => {
    const fetchEspecies = async () => {
      try {
        const response = await api.get('/especies')
        setEspecies(response.data)
      } catch (error) {
        console.error('Error fetching especies:', error)
      }
    }
    
    fetchEspecies()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('paciente_')) {
      const pacienteField = name.replace('paciente_', '')
      setFormValues(prev => ({
        ...prev,
        paciente: {
          ...prev.paciente,
          [pacienteField]: value
        }
      }))
    } else {
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleNewPatient = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")
    
    try {
      // 1. Primero crear el propietario
      const propietarioData = {
        nombre: formValues.nombre,
        apellido: formValues.apellido,
        telefono: formValues.telefono,
        email: formValues.email,
        direccion: formValues.direccion
      }
      
      const propietarioResponse = await api.post('/propietarios', propietarioData)
      const propietarioId = propietarioResponse.data.id
      
      // 2. Luego crear la mascota asociada al propietario
      const pacienteData = {
        nombre: formValues.paciente.nombre,
        especie_id: parseInt(formValues.paciente.especie_id),
        propietario_id: propietarioId,
        fecha_nacimiento: formValues.paciente.fecha_nacimiento,
        sexo: formValues.paciente.sexo,
        peso: parseFloat(formValues.paciente.peso)
      }
      
      await api.post('/pacientes', pacienteData)
      
      // Limpiar el formulario y cerrar el diálogo
      setFormValues({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        direccion: '',
        paciente: {
          nombre: '',
          especie_id: '',
          fecha_nacimiento: '',
          sexo: '',
          peso: ''
        }
      })
      setOpenDialog("")
      
    } catch (error) {
      console.error('Error creating patient:', error)
      setError(error.response?.data?.message || 'Error al crear el paciente')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [
          especiesRes, 
          pacientesRes, 
          veterinariosRes,
          tiposCitaRes,
        ] = await Promise.all([
          api.get('/especies'),
          api.get('/pacientes'),
          api.get('/veterinarios'),
          api.get('/tipo_citas') // Nuevo endpoint
        ])
        
        setEspecies(especiesRes.data)
        setPacientes(pacientesRes.data)
        setVeterinarios(veterinariosRes.data)
        setTiposCita(tiposCitaRes.data) // Guardamos los tipos de cita en el estado
      } catch (error) {
        console.error('Error fetching initial data:', error)
      }
    }
    
    fetchInitialData()
  }, [])


  const handleHistorialSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const historialData = {
        paciente_id: parseInt(historialForm.paciente_id),
        alergias: historialForm.alergias,
        condiciones_cronicas: historialForm.condiciones_cronicas,
        cirugias_previas: historialForm.cirugias_previas,        
      };

      // Corregir el endpoint para usar el nombre correcto de la tabla
      const response = await api.post('/historial_medico', historialData);

      setHistorialForm({
        paciente_id: '',
        alergias: '',
        condiciones_cronicas: '',
        cirugias_previas: ''
      });

      setOpenDialog("");
    } catch (error) {
      console.error('Error creating historial:', error);
      setError(error.response?.data?.message || error.message || 'Error al crear el historial médico');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHistorialChange = (field, value) => {
    setHistorialForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const appointmentData = {
        paciente_id: parseInt(appointmentForm.paciente_id),
        veterinario_id: parseInt(appointmentForm.veterinario_id),
        tipo_cita_id: parseInt(appointmentForm.tipo_cita_id),
        fecha_hora: new Date(appointmentForm.fecha_hora).toISOString(),
        motivo: appointmentForm.motivo,
        notas: appointmentForm.notas || '',
        estado: 'Programada' // Add estado to the submission
      }

      if (!appointmentData.paciente_id || !appointmentData.veterinario_id || 
          !appointmentData.tipo_cita_id || !appointmentData.fecha_hora) { //
        throw new Error('Por favor complete todos los campos requeridos')
      }

      const response = await api.post('/citas', appointmentData)

      setAppointmentForm({
        paciente_id: '',
        veterinario_id: '',
        tipo_cita_id: '',
        fecha_hora: '',
        motivo: '',
        notas: '',
      })
      setOpenDialog("")

      const updatedAppointments = await api.get('/citas')
      setUpcomingAppointments(updatedAppointments.data)

    } catch (error) {
      console.error('Error creating appointment:', error)
      setError(error.response?.data?.message || error.message || 'Error al crear la cita')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAppointmentChange = (field, value) => {
    setAppointmentForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const quickActions = [
    { 
      icon: PlusCircle, 
      label: 'Nuevo Paciente', 
      color: 'bg-green-500', 
      hoverColor: 'hover:bg-green-600', 
      tag: 'Nuevo',
      content: (
        <form onSubmit={handleNewPatient} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <h3 className="font-medium">Datos del Propietario</h3>
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input 
                id="nombre" 
                name="nombre" 
                value={formValues.nombre}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div>
              <Label htmlFor="apellido">Apellido</Label>
              <Input 
                id="apellido" 
                name="apellido"
                value={formValues.apellido}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div>
              <Label htmlFor="telefono">Teléfono</Label>
              <Input 
                id="telefono" 
                name="telefono"
                type="tel"
                value={formValues.telefono}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div>
              <Label htmlFor="direccion">Dirección</Label>
              <Input 
                id="direccion" 
                name="direccion"
                value={formValues.direccion}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Datos de la Mascota</h3>
            <div>
              <Label htmlFor="paciente_nombre">Nombre de la Mascota</Label>
              <Input 
                id="paciente_nombre" 
                name="paciente_nombre" 
                value={formValues.paciente.nombre}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div>
              <Label htmlFor="paciente_especie_id">Especie</Label>
              <Select 
                name="paciente_especie_id" 
                value={formValues.paciente.especie_id}
                onValueChange={(value) => setFormValues(prev => ({
                  ...prev,
                  paciente: {
                    ...prev.paciente,
                    especie_id: value
                  }
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione especie" />
                </SelectTrigger>
                <SelectContent>
                  {especies.map(especie => (
                    <SelectItem key={especie.id} value={especie.id.toString()}>
                      {especie.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="paciente_fecha_nacimiento">Fecha de Nacimiento</Label>
              <Input 
                id="paciente_fecha_nacimiento" 
                name="paciente_fecha_nacimiento"
                type="date" 
                value={formValues.paciente.fecha_nacimiento}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div>
              <Label htmlFor="paciente_sexo">Sexo</Label>
              <Select 
                name="paciente_sexo" 
                value={formValues.paciente.sexo}
                onValueChange={(value) => setFormValues(prev => ({
                  ...prev,
                  paciente: {
                    ...prev.paciente,
                    sexo: value
                  }
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Macho">Macho</SelectItem>
                  <SelectItem value="Hembra">Hembra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="paciente_peso">Peso (kg)</Label>
              <Input 
                id="paciente_peso" 
                name="paciente_peso"
                type="number" 
                step="0.1" 
                value={formValues.paciente.peso}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Guardar Paciente'}
            </Button>
          </div>
        </form>
      )
    },
    {
      icon: Clock,
      label: 'Agendar Cita',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      tag: 'Rápido',
      content: (
        <form onSubmit={handleAppointmentSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div>
            <Label htmlFor="paciente">Paciente</Label>
            <Select
              value={appointmentForm.paciente_id}
              onValueChange={(value) => handleAppointmentChange('paciente_id', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione paciente" />
              </SelectTrigger>
              <SelectContent>
                {pacientes.map(paciente => (
                  <SelectItem key={paciente.id} value={paciente.id.toString()}>
                    {paciente.nombre} - {paciente.especie_nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="veterinario">Veterinario</Label>
            <Select
              value={appointmentForm.veterinario_id}
              onValueChange={(value) => handleAppointmentChange('veterinario_id', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione veterinario" />
              </SelectTrigger>
              <SelectContent>
                {veterinarios.map(veterinario => (
                  <SelectItem key={veterinario.id} value={veterinario.id.toString()}>
                    {veterinario.nombre} {veterinario.apellido}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="tipo_cita">Tipo de Cita</Label>
            <Select
              value={appointmentForm.tipo_cita_id}
              onValueChange={(value) => handleAppointmentChange('tipo_cita_id', value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccione tipo" />
              </SelectTrigger>
              <SelectContent>
                {tiposCita.map(tipo => (
                  <SelectItem key={tipo.id} value={tipo.id.toString()}>
                    {tipo.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="fecha_hora">Fecha y Hora</Label>
            <Input 
              id="fecha_hora" 
              type="datetime-local" 
              value={appointmentForm.fecha_hora}
              onChange={(e) => handleAppointmentChange('fecha_hora', e.target.value)}
              required 
            />
          </div>
          
          <div>
            <Label htmlFor="motivo">Motivo</Label>
            <Input 
              id="motivo" 
              value={appointmentForm.motivo}
              onChange={(e) => handleAppointmentChange('motivo', e.target.value)}
              required 
            />
          </div>
          
          <div>
            <Label htmlFor="notas">Notas</Label>
            <Textarea 
              id="notas"
              value={appointmentForm.notas}
              onChange={(e) => handleAppointmentChange('notas', e.target.value)}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Agendando...' : 'Agendar Cita'}
            </Button>
          </div>
        </form>
      )
    },
    { 
      icon: Folder, 
      label: 'Historial Médico', 
      color: 'bg-yellow-500', 
      hoverColor: 'hover:bg-yellow-600', 
      tag: 'Seguro',
      content: (
        <form onSubmit={handleHistorialSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <div>
            <div>
              <Label htmlFor="paciente">Paciente</Label>
              <Select
                value={historialForm.paciente_id}
                onValueChange={(value) => handleHistorialChange('paciente_id', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione paciente" />
                </SelectTrigger>
                <SelectContent>
                  {pacientes.map(paciente => (
                    <SelectItem key={paciente.id} value={paciente.id.toString()}>
                      {paciente.nombre} - {paciente.especie_nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="alergias">Alergias</Label>
              <Textarea id="alergias" 
                value={historialForm.alergias}
                onChange={(e) => handleHistorialChange('alergias', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="condiciones_cronicas">Condiciones Crónicas</Label>
              <Textarea id="condiciones_cronicas" 
                value={historialForm.condiciones_cronicas}
                onChange={(e) => handleHistorialChange('condiciones_cronicas', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="cirugias_previas">Cirugías Previas</Label>
              <Textarea id="cirugias_previas" 
                value={historialForm.cirugias_previas}
                onChange={(e) => handleHistorialChange('cirugias_previas', e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Agendando...' : 'Agendar Cita'}
              </Button>
            </div>
          </div>
        </form>
      )
    },
    { 
      icon: Syringe, 
      label: 'Registrar Vacuna', 
      color: 'bg-purple-500', 
      hoverColor: 'hover:bg-purple-600', 
      tag: 'Importante',
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="procedimiento">Procedimiento</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione procedimiento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Vacunación #1</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="nombre_vacuna">Nombre de la Vacuna</Label>
            <Input id="nombre_vacuna" required />
          </div>
          <div>
            <Label htmlFor="lote">Número de Lote</Label>
            <Input id="lote" />
          </div>
          <div>
            <Label htmlFor="fecha_aplicacion">Fecha de Aplicación</Label>
            <Input id="fecha_aplicacion" type="date" required />
          </div>
          <div>
            <Label htmlFor="fecha_proxima">Próxima Aplicación</Label>
            <Input id="fecha_proxima" type="date" />
          </div>
          <div>
            <Label htmlFor="notas">Notas</Label>
            <Textarea id="notas" />
          </div>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Registrar Vacuna</Button>
          </div>
        </div>
      )
    },
    { 
      icon: Stethoscope, 
      label: 'Procedimiento', 
      color: 'bg-red-500', 
      hoverColor: 'hover:bg-red-600', 
      tag: 'Detallado',
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="cita">Cita</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione cita" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Cita #1 - Max</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="tipo">Tipo de Procedimiento</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Vacunación">Vacunación</SelectItem>
                <SelectItem value="Cirugía">Cirugía</SelectItem>
                <SelectItem value="Revisión">Revisión</SelectItem>
                <SelectItem value="Tratamiento">Tratamiento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea id="descripcion" required />
          </div>
          <div>
            <Label htmlFor="estado">Estado</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Completado">Completado</SelectItem>
                <SelectItem value="En proceso">En proceso</SelectItem>
                <SelectItem value="Pendiente">Pendiente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="costo">Costo</Label>
            <Input id="costo" type="number" step="0.01" />
          </div>
          <div>
            <Label htmlFor="notas_medicas">Notas Médicas</Label>
            <Textarea id="notas_medicas" />
          </div>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Guardar Procedimiento</Button>
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