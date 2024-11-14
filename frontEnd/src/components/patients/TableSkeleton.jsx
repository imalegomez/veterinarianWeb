import { TableRow, TableCell } from "@/components/ui/table"

const LoadingRow = () => (
  <TableRow>
    {[...Array(6)].map((_, index) => (
      <TableCell key={index}>
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
      </TableCell>
    ))}
  </TableRow>
)

export const TableSkeleton = () => (
  <>
    {[...Array(5)].map((_, index) => (
      <LoadingRow key={index} />
    ))}
  </>
)