import { useState } from 'react'
import { PageHeader } from '@/components/appointments/PageHeader'
import { SearchAndFilters } from '@/components/appointments/SearchAndFilters'
import { AppointmentCard } from '@/components/appointments/AppointmentCard'
import { Card } from "@/components/ui/card"

export default function Citas() {
  const [searchFocused, setSearchFocused] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [appointments, setAppointments] = useState([])

  return (
    <div className="space-y-6">
      <PageHeader />
      
      <Card className="p-6">
        <SearchAndFilters 
          searchFocused={searchFocused}
          setSearchFocused={setSearchFocused}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <AppointmentCard 
              key={appointment.id} 
              appointment={appointment} 
            />
          ))}
        </div>
      </Card>
    </div>
  )
}