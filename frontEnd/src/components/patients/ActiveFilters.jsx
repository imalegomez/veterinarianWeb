import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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

const FilterBadge = ({ label, onRemove }) => (
  <Badge variant="secondary" className="flex items-center gap-2">
    {label}
    <Button
      variant="ghost"
      size="sm"
      className="h-4 w-4 p-0 hover:bg-transparent"
      onClick={onRemove}
    >
      ×
    </Button>
  </Badge>
)