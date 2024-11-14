import { Search, Filter } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import FilterSelect from './FilterSelect'
import FilterBadge from './FilterBadge'

export const FilterBar = ({
  searchTerm,
  setSearchTerm,
  searchFocused,
  setSearchFocused,
  selectedSpecies,
  setSelectedSpecies,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  species,
  isLoading
}) => (
  <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 mb-6">
    <div className="w-full md:w-1/3 relative">
      <Search 
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
          searchFocused ? 'text-blue-500' : 'text-gray-400'
        }`} 
        size={20} 
      />
      <Input 
        type="text" 
        placeholder="Buscar por nombre, especie o dueño..." 
        className={`pl-10 transition-all duration-200 ${
          searchFocused ? 'ring-2 ring-blue-500 border-blue-500' : ''
        }`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
      />
    </div>
    
    <div className="flex flex-col sm:flex-row gap-2">
      <Select 
        disabled={isLoading}
        value={selectedSpecies}
        onValueChange={setSelectedSpecies}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filtrar por especie" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todas las especies</SelectItem>
          {species.map((specie) => (
            <SelectItem key={specie.id} value={specie.id.toString()}>
              {specie.nombre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={20} />
            Más Filtros
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filtros</SheetTitle>
            <SheetDescription>
              Ajusta los filtros para encontrar pacientes específicos
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 mt-6">
            <FilterSelect
              label="Estado del Paciente"
              value={selectedStatus}
              onValueChange={setSelectedStatus}
              options={[
                { value: 'todos', label: 'Todos' },
                { value: 'activo', label: 'Activos' },
                { value: 'advertencia', label: 'Advertencia' },
                { value: 'crítico', label: 'Críticos' }
              ]}
            />
            
            <FilterSelect
              label="Ordenar por"
              value={sortBy}
              onValueChange={setSortBy}
              options={[
                { value: 'nombre', label: 'Nombre' },
                { value: 'especie', label: 'Especie' },
                { value: 'ultima_visita', label: 'Última visita' }
              ]}
            />
            
            <FilterSelect
              label="Orden"
              value={sortOrder}
              onValueChange={setSortOrder}
              options={[
                { value: 'asc', label: 'Ascendente' },
                { value: 'desc', label: 'Descendente' }
              ]}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </div>
)

export const ActiveFilters = ({
  searchTerm,
  setSearchTerm,
  selectedSpecies,
  setSelectedSpecies,
  selectedStatus,
  setSelectedStatus,
  species
}) => {
  if (!(searchTerm || selectedSpecies !== 'todos' || selectedStatus !== 'todos')) {
    return null
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {searchTerm && (
        <FilterBadge
          label={`Búsqueda: ${searchTerm}`}
          onRemove={() => setSearchTerm('')}
        />
      )}
      {selectedSpecies !== 'todos' && (
        <FilterBadge
          label={`Especie: ${species.find(s => s.id.toString() === selectedSpecies)?.nombre}`}
          onRemove={() => setSelectedSpecies('todos')}
        />
      )}
      {selectedStatus !== 'todos' && (
        <FilterBadge
          label={`Estado: ${selectedStatus}`}
          onRemove={() => setSelectedStatus('todos')}
        />
      )}
    </div>
  )
}

export default FilterBar;