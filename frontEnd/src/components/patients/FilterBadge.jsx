import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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

export default FilterBadge;