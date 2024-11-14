import { AlertCircle } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

export const StatusBadge = ({ lastVisit }) => {
  const days = Math.floor((new Date() - new Date(lastVisit)) / (1000 * 60 * 60 * 24))
  
  if (days > 180) {
    return (
      <Badge variant="destructive" className="gap-1">
        <AlertCircle size={14} />
        Hace {Math.floor(days/30)} meses
      </Badge>
    )
  }
  if (days > 90) {
    return (
      <Badge variant="warning" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
        Hace {Math.floor(days/30)} meses
      </Badge>
    )
  }
  return (
    <Badge variant="success" className="bg-green-100 text-green-700 hover:bg-green-100">
      Hace {days} días
    </Badge>
  )
}