import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const SearchAndFilters = ({ searchFocused, setSearchFocused, selectedDate, setSelectedDate }) => (
  <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 mb-6">
    <div className="w-full md:w-1/3 relative">
      <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
        searchFocused ? 'text-blue-500' : 'text-gray-400'
      }`} size={20} />
      <Input 
        type="text" 
        placeholder="Buscar por paciente o dueño..." 
        className={`pl-10 transition-all duration-200 ${
          searchFocused ? 'ring-2 ring-blue-500 border-blue-500' : ''
        }`}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
      />
    </div>
    
    <div className="flex flex-col sm:flex-row gap-2">
      <Select defaultValue="todos">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por tipo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos los tipos</SelectItem>
          <SelectItem value="revision">Revisión</SelectItem>
          <SelectItem value="vacunacion">Vacunación</SelectItem>
          <SelectItem value="cirugia">Cirugía</SelectItem>
        </SelectContent>
      </Select>
      
      <Input 
        type="date" 
        className="w-[180px]"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
    </div>
  </div>
)