import React, { ReactNode } from "react"

export type Column<T> = {
  key: keyof T
  header: string
  render?: (value: T[keyof T], row: T) => ReactNode
}

type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
  className?: string
}

const Table = <T extends object>({ columns, data, className }: TableProps<T>) => {
  return (
    <div className={`w-full overflow-x-auto rounded-md shadow-lg ${className || ""}`}>
      <table className="min-w-full border-collapse border border-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-600"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="border border-gray-200 px-4 py-2 text-center text-sm text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="even:bg-gray-50"
              >
                {columns.map((column, colIndex) => {
                  const cellValue = row[column.key]
                  const renderedValue = column.render ? column.render(cellValue, row) : String(cellValue) // Convert non-renderable types to string

                  return (
                    <td
                      key={colIndex}
                      className="border border-gray-200 px-4 py-2 text-sm text-gray-700"
                    >
                      {renderedValue}
                    </td>
                  )
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
