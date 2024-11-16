import { useState, useEffect } from "react";
import { api } from "@/service/api";
import { format, parseISO } from "date-fns";

export const useAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [appointmentType, setAppointmentType] = useState('todos');

    const fetchAppointmentDetails = async (appointment) => {
        try {
            // Obtener detalles del paciente
            const pacienteResponse = await api.get(`/pacientes/${appointment.paciente_id}`);
            const paciente = pacienteResponse.data;
            
            // Obtener detalles del propietario
            const propietarioResponse = await api.get(`/propietarios/${paciente.propietario_id}`);
            const propietario = propietarioResponse.data;
            
            // Obtener detalles del veterinario
            const vetResponse = await api.get(`/veterinarios/${appointment.veterinario_id}`);
            const veterinario = vetResponse.data;

            return {
                ...appointment,
                paciente: {
                    id: paciente.id,
                    nombre: paciente.nombre,
                    especie: paciente.especie,
                    raza: paciente.raza,
                },
                propietario: {
                    id: propietario.id,
                    nombre: propietario.nombre,
                    telefono: propietario.telefono,
                },
                veterinario: {
                    id: veterinario.id,
                    nombre: veterinario.nombre,
                },
                fecha: appointment.fecha_hora.split(' ')[0],
                hora: appointment.fecha_hora.split(' ')[1]
            };
        } catch (error) {
            console.error('Error al obtener detalles de la cita:', error);
            return {
                ...appointment,
                paciente: { nombre: 'Error al cargar paciente' },
                propietario: { nombre: 'Error al cargar propietario' },
                veterinario: { nombre: 'Error al cargar veterinario' },
                fecha: appointment.fecha_hora.split(' ')[0],
                hora: appointment.fecha_hora.split(' ')[1]
            };
        }
    };

    const fetchAppointments = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.get('/citas');
            const appointmentsWithDetails = await Promise.all(
                response.data.map(fetchAppointmentDetails)
            );
            setAppointments(appointmentsWithDetails);
        } catch (error) {
            setError('Error al cargar las citas');
            console.error('Error detallado: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const filteredAppointments = appointments.filter(appointment => {
        const searchFields = [
            appointment.paciente?.nombre?.toLowerCase() || '',
            appointment.propietario?.nombre?.toLowerCase() || '',
            appointment.veterinario?.nombre?.toLowerCase() || ''
        ].join(' ');
        
        const searchText = searchTerm.toLowerCase();

        // Normalizar las fechas para comparación
        const appointmentDate = format(parseISO(appointment.fecha), 'yyyy-MM-dd');
        const filterDate = selectedDate ? format(parseISO(selectedDate), 'yyyy-MM-dd') : '';

        const matchesSearch = searchTerm === '' || searchFields.includes(searchText);
        const matchesDate = selectedDate === '' || appointmentDate === filterDate;
        const matchesType = appointmentType === 'todos' || appointment.tipo_cita_id.toString() === appointmentType;

        return matchesSearch && matchesDate && matchesType;
    });

    return {
        appointments: filteredAppointments,
        isLoading,
        error,
        searchTerm,
        selectedDate,
        appointmentType,
        setSearchTerm,
        setSelectedDate,
        setAppointmentType,
        refetch: fetchAppointments
    };
};