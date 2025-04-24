import React, { ReactNode } from "react"
import { cva, VariantProps } from "class-variance-authority"

export type Column<T> = {
  key: keyof T
  header: string
  render?: (value: T[keyof T], row: T) => ReactNode
}

type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
}

const tableClasses = cva("min-w-full border-collapse border bg-white", {
  variants: {
    striped: {
      true: "even:bg-gray-50",
      false: "",
    },
  },
  defaultVariants: {
    striped: true,
  },
})

const Table = <T extends object>({ columns, data }: TableProps<T> & VariantProps<typeof tableClasses>) => {
  return (
    <div className={`w-full overflow-x-auto rounded-md shadow-lg`}>
      <table className={tableClasses()}>
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
                className={tableClasses({ striped: true })}
              >
                {columns.map((column, colIndex) => {
                  const cellValue = row[column.key]
                  const renderedValue = column.render ? column.render(cellValue, row) : String(cellValue)

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
