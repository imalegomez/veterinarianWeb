import { useState, useEffect } from "react";
import { api } from "@/service/api";


export const useAppointments = () =>{
    const [appointments, setAppointments] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [appointmentType, setAppointmentType] = useState('todos')

    const fetchAppointments = async ()=>{
        setIsLoading(true)
        setError(null)

        try{
            const response = api.get('/citas')
            setAppointments(response.data)
        }catch(error){
            setError('error fetching citas')
            console.error('Error detallado: ', error)
        }finally{
            isLoading(false)
        }
    }
}