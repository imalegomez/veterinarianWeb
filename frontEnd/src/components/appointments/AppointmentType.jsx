import { Stethoscope, AlertCircle } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

export const AppointmentType = ({ type }) => {
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