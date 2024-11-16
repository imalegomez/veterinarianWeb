import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export const PageHeader = () => (
  <Card className="p-6">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Citas</h1>
        <p className="text-gray-500 text-sm">Gestiona las citas de tus pacientes</p>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 shadow-sm transition-all duration-200 hover:shadow">
              <Plus className="mr-2" size={20} />
              Nueva Cita
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Programar nueva cita</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </Card>
)
