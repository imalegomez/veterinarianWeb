import { useState } from 'react'
import { PageHeader } from '@/components/appointments/PageHeader'
import { SearchAndFilters } from '@/components/appointments/SearchAndFilters'
import { AppointmentCard } from '@/components/appointments/AppointmentCard'
import { Card } from "@/components/ui/card"
import { useAppointments } from '@/hooks/useAppointments'

export default function Citas() {
  const {
    appointments,
    isLoading,
    error,
    searchTerm,
    selectedDate,
    appointmentType,
    setSearchTerm,
    setSelectedDate,
    setAppointmentType
  } = useAppointments()

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <Card className="p-6">
        <SearchAndFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          appointmentType={appointmentType}
          setAppointmentType={setAppointmentType}
        />

        {isLoading ? (
          <div className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appointment) => (
              <AppointmentCard 
                key={appointment.id} 
                appointment={appointment}
              />
            ))}
            
            {appointments.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                No se encontraron citas para los filtros seleccionados
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}