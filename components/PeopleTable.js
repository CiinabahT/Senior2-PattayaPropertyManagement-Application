import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { useRouter } from 'next/router';

function PeopleTable({ records }) {
  const rowsPerPage = 8;
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filteredRecords, setFilteredRecords] = useState(records);
  const router = useRouter();



  useEffect(() => {
    let filtered = records;
    if (searchTerm) {
      filtered = filtered.filter((record) =>
        Object.values(record).some((value) =>
          value ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
        )
      );

    }
    if (filterStatus) {
      filtered = filtered.filter(
        (record) => record.status.toLowerCase() === filterStatus.toLowerCase()
      );
    }
    setFilteredRecords(filtered);
    setPageNumber(0); // Reset the page number when filtering
  }, [searchTerm, filterStatus, records]);

  const currentRows = filteredRecords.slice(
    pageNumber * rowsPerPage,
    (pageNumber + 1) * rowsPerPage
  );

  // const handleInfoClick = (info) => {
  //   router.push(`/peopleInfo?id=${info.id}`);
  // };

  const handleInfoClick = (Infodata) => {
    router.push({
      pathname: '/peopleInfo',
      query: {
        PersonId: Infodata.id,
      },
    });
  };



  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: (row, index) => pageNumber * rowsPerPage + index + 1,
        id: 'index',
      },
      {
        Header: 'Name-Surname',
        accessor: 'full_name',
      },
      {
        Header: 'Passport/ID',
        accessor: 'identity_number',
      },
      {
        Header: 'More Info',
        accessor: 'info',
        Cell: ({ row }) => (
          <button
            onClick={() => handleInfoClick(row.original)}
            style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px', outline: 'none', marginTop: '5px' }}
          >
            information
          </button>
        ),
      },
    ],
    [pageNumber]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: currentRows });

  const paginate = (page) => {
    setPageNumber(page - 1);
  };


  return (
    <div style={{ fontFamily: 'Kanit, sans-serif', padding: '10px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label>Search bar : </label>
        <input
          type="text"
          placeholder=" Search.."
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            marginRight: '10px',
            fontFamily: 'Kanit',
            outline: 'none',
            border: 'none',
            borderRadius: '5px',
            height: '25px',
          }}
        />
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
                  return <td style={styles.td} {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {Array.from({ length: Math.ceil(filteredRecords.length / rowsPerPage) }, (_, k) => (
          <button
            key={k}
            onClick={() => paginate(k + 1)}
            style={{
              marginTop: '15px',
              fontFamily: 'Kanit',
              margin: '5px',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: pageNumber === k ? '#326896' : '',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {k + 1}
          </button>
        ))}
      </div>


    </div>
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

export default PeopleTable;
