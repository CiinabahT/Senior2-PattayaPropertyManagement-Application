import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useGlobalFilter, useFilters } from 'react-table';
import { useRouter } from 'next/router';


function RoomTable({ rooms, buildingName, globalFilter, statusFilter }) {
  const router = useRouter();
  const [data, setData] = useState([]);
  const truncateText = (text, limit = 20) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };


  const handleEditRoom = (roomData) => {
    router.push({
      pathname: '/roomEdit',
      query: {
        buildingName: encodeURIComponent(buildingName),
        roomNumber: roomData.room_number, // Add room number to the query parameters
        roomId: roomData.room_id
      },
    });
  };



  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: (row, index) => index + 1,
        id: 'index',

      },
      {
        Header: 'Room No.',
        accessor: 'room_number',
      },
      {
        Header: 'Size(sq.m)',
        accessor: 'room_size',
      },
      {
        Header: 'Price',
        accessor: 'room_price',
      },
      {
        Header: 'Owner',
        accessor: 'owner_name',
        Cell: ({ value }) => truncateText(value),
      },
      {
        Header: 'Contact',
        accessor: 'owner_contacts',

      },
      {
        Header: 'Room Status',
        accessor: 'status_of_room',
        Filter: SaleRentFilter,
        filter: 'includes',
      },
      {
        Header: 'Info',
        accessor: 'info',
        Cell: ({ row }) => (
          <button
            onClick={() => handleEditRoom(row.original)}
            style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px', outline: 'none' }}
          >
            Edit Room
          </button>
        ),
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state,
    setFilter,
  } = useTable(
    {
      columns,
      data: rooms,
    },
    useGlobalFilter,
    useFilters
  );

  useEffect(() => {
    setGlobalFilter(globalFilter); // update globalFilter whenever it changes
    setFilter('status_of_room', statusFilter); // update filter whenever it changes
  }, [globalFilter, statusFilter, setGlobalFilter, setFilter]);

  const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setGlobalFilter(e.target.value ? e.target.value : undefined);
  };

  return (
    <div style={{ fontFamily: 'Kanit, sans-serif', padding: '10px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Search Room No.: </label>
        <input value={searchValue} onChange={handleSearchChange} style={{ fontFamily: 'Kanit, sans-serif', borderRadius: '5px', outline: 'none', border: '1px solid #ccc' }} />
        <label style={{ marginLeft: '10px' }}>Room Status: </label>
        <select
          onChange={(e) => setFilter('status_of_room', e.target.value === 'all' ? undefined : e.target.value)}
          style={{ fontFamily: 'Kanit, sans-serif', borderRadius: '5px', outline: 'none', border: '1px solid #ccc' }}
        >
          <option value="all">All</option>
          <option value="Sell">Sell</option>
          <option value="Rent">Rent</option>
          <option value="Sell/Rent">Sell/Rent</option>
          <option value="Returned">Returned</option>
        </select>

      </div>
      <table style={styles.table} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th style={styles.th} {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td style={styles.td} {...cell.getCellProps()}>
                      {/* Check if the cell value is null and replace it with "-" */}
                      {cell.value === null || cell.value === "" ? "-" : cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
}

// Custom filter component for Sale/Rent
function SaleRentFilter({ column: { filterValue, setFilter } }) {
  return (
    <select
      value={filterValue || 'all'}
      onChange={(e) => setFilter(e.target.value || undefined)}
      style={{ fontFamily: 'Kanit, sans-serif', color: 'black', backgroundColor: 'White', borderRadius: '5px', outline: 'none', border: '1px solid #ccc' }}
    >
      <option value="all">All</option>
      <option value="Sale">Sale</option>
      <option value="Rent">Rent</option>
      <option value="Invalid">Invalid</option>
      <option value="Sale/Rent">Sale/Rent</option>
    </select>

  );
}

// Styles
const styles = {
  table: {
    border: '1px solid #ccc',
    borderBottom: '0',
    textAlign: 'left',
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ccc',
    padding: '8px',
    backgroundColor: '#f3f3f3',
    width: '200px'
  },
  td: {
    border: '1px solid #ccc',
    padding: '8px',
    width: '200px', // or any value that suits your layout
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

export default RoomTable;