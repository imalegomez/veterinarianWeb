import { Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FilterBar } from '../components/patients/FilterBar'
import { PatientsTable } from '../components/patients/PatientsTable'
import { ActiveFilters } from '../components/patients/ActiveFilters'
import { usePatients } from '../hooks/usePatients'
import { useState } from 'react'

export default function Pacientes() {
  const [searchFocused, setSearchFocused] = useState(false)
  const {
    species,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedSpecies,
    setSelectedSpecies,
    selectedStatus,
    setSelectedStatus,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filteredPatients,
    getSpeciesName,
    getOwnerName,
    resetFilters
  } = usePatients()

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
            <p className="text-gray-500 text-sm">Gestiona la información de tus pacientes</p>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 shadow-sm transition-all duration-200 hover:shadow">
            <Plus className="mr-2" size={20} />
            Nuevo Paciente
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchFocused={searchFocused}
          setSearchFocused={setSearchFocused}
          selectedSpecies={selectedSpecies}
          setSelectedSpecies={setSelectedSpecies}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          species={species}
          isLoading={isLoading}
        />

        <PatientsTable
          isLoading={isLoading}
          error={error}
          filteredPatients={filteredPatients}
          getSpeciesName={getSpeciesName}
          getOwnerName={getOwnerName}
          sortBy={sortBy}
          sortOrder={sortOrder}
          handleSort={handleSort}
          resetFilters={resetFilters}
        />
        
        <ActiveFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSpecies={selectedSpecies}
          setSelectedSpecies={setSelectedSpecies}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          species={species}
        />
      </Card>
    </div>
  )
}