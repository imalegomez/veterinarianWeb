import { Badge } from "@/components/ui/badge"

const SPECIES_COLORS = {
  'Perro': 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  'Gato': 'bg-purple-100 text-purple-700 hover:bg-purple-100',
  'Conejo': 'bg-pink-100 text-pink-700 hover:bg-pink-100',
  'Caballo': 'bg-green-100 text-pink-700 hover:bg-green-100'
}

export const SpeciesBadge = ({ speciesName }) => (
  <Badge variant="secondary" className={SPECIES_COLORS[speciesName] || 'bg-gray-100 text-gray-700'}>
    {speciesName}
  </Badge>
)