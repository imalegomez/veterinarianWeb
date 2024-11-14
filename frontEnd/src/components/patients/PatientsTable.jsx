import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { StatusBadge } from "./StatusBadge"
import { SpeciesBadge } from "./SpecialBadge"
import { TableSkeleton } from "./TableSkeleton"
import { PatientActions } from "./PatientActions"

export const PatientsTable = ({
  isLoading,
  error,
  filteredPatients,
  getSpeciesName,
  getOwnerName,
  sortBy,
  sortOrder,
  handleSort,
  resetFilters
}) => (
  <div className="rounded-lg border overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <SortableHeader
            field="nombre"
            currentSort={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          >
            Nombre
          </SortableHeader>
          <SortableHeader
            field="especie"
            currentSort={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          >
            Especie
          </SortableHeader>
          <TableHead className="font-semibold">Dueño</TableHead>
          <SortableHeader
            field="ultima_visita"
            currentSort={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
          >
            Última Visita
          </SortableHeader>
          <TableHead className="font-semibold text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableSkeleton />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : filteredPatients.length === 0 ? (
          <EmptyState onReset={resetFilters} />
        ) : (
          filteredPatients.map((patient) => (
            <PatientRow
              key={patient.id}
              patient={patient}
              getSpeciesName={getSpeciesName}
              getOwnerName={getOwnerName}
            />
          ))
        )}
      </TableBody>
    </Table>
  </div>
)

const SortableHeader = ({ field, currentSort, sortOrder, onSort, children }) => (
  <TableHead 
    className="font-semibold cursor-pointer"
    onClick={() => onSort(field)}
  >
    {children}
    {currentSort === field && (
      <span className="ml-2">{sortOrder === 'asc' ? '↑' : '↓'}</span>
    )}
  </TableHead>
)

const ErrorMessage = ({ message }) => (
  <TableRow>
    <TableCell colSpan={6} className="text-center text-red-500 py-4">
      {message}
    </TableCell>
  </TableRow>
)

const EmptyState = ({ onReset }) => (
  <TableRow>
    <TableCell colSpan={6} className="text-center py-8">
      <div className="flex flex-col items-center justify-center text-gray-500">
        <AlertCircle size={24} className="mb-2" />
        <p className="text-sm">No se encontraron pacientes con los filtros seleccionados</p>
        <Button 
          variant="link" 
          className="mt-2 text-blue-500"
          onClick={onReset}
        >
          Limpiar filtros
        </Button>
      </div>
    </TableCell>
  </TableRow>
)

const PatientRow = ({ patient, getSpeciesName, getOwnerName }) => (
    <TableRow className="hover:bg-gray-50 transition-colors duration-150">
      <TableCell className="font-medium">{patient.nombre}</TableCell>
      <TableCell>
        <SpeciesBadge speciesName={getSpeciesName(patient.especie_id)} />
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span>{getOwnerName(patient.propietario_id)}</span>
        </div>
      </TableCell>
      <TableCell>
        <StatusBadge lastVisit={patient.lastVisit} />
      </TableCell>
      <TableCell className="text-right">
        <PatientActions />
      </TableCell>
    </TableRow>
  )