import { useMemo } from 'react'
import { useTable } from 'react-table'
import PropTypes from 'prop-types'
import { filter } from 'lodash'

import styles from './Table.module.scss'

const Table = ({ data, header, onClick }) => {
  const memoizedData = useMemo(
    () => {
      for (let i = 0; i < 10000; i++) {
        console.log(i)
      }
      return data
    },
    [data]
  )

  const memoizedColumns = useMemo(
    () => filter(header, v => v !== false),
    [header]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns: memoizedColumns, data: memoizedData || [] })

  return (
    <table {...getTableProps()} className={styles.tableContainer}>
      <thead className={styles.tableHead}>
        {// Loop over the header rows
          headerGroups.map((headerGroup, index) => (
          // Apply the header row props
            <tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
                headerGroup.headers.map((column, index) => (
                // Apply the header cell props
                  <th key={index} {...column.getHeaderProps()}>
                    {// Render the header
                      column.render('Header')}
                  </th>
                ))}
            </tr>
          ))}
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()} className={styles.tableBody}>
        {// Loop over the table rows
          rows.map((row, index) => {
          // Prepare the row for display
            prepareRow(row)
            return (
            // Apply the row props
              <tr
                key={index}
                {...row.getRowProps()}
                className={styles.tableRow}
              >
                {// Loop over the rows cells
                  row.cells.map((cell, index) => {
                  // Apply the cell props
                    return (
                      <td
                        key={index}
                        {...cell.getCellProps()}
                        className={styles.tableCell}
                        onClick={() => index === 0 && onClick && onClick(row?.original)}
                      >
                        {// Render the cell contents
                          cell.render('Cell')}
                      </td>
                    )
                  })}
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  data: PropTypes.array,
  header: PropTypes.array,
  onClick: PropTypes.func
}

export default Table
