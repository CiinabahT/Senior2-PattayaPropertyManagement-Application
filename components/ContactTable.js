import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import { useRouter } from 'next/router';

function ContractTable({ records }) {
  const rowsPerPage = 8;
  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let filtered = [...records].sort((a, b) => {
      console.log(a)
      console.log(b)
      const aStatus = a.contract_status ? a.contract_status.toLowerCase() : "";
      const bStatus = b.contract_status ? b.contract_status.toLowerCase() : "";

      if (aStatus === 'active' && bStatus !== 'active') return -1;
      if (bStatus === 'active' && aStatus !== 'active') return 1;
      return records.indexOf(b) - records.indexOf(a);
    });

    if (searchTerm) {
      filtered = filtered.filter((record) =>
        Object.values(record).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (filterStatus) {
      filtered = filtered.filter((record) => {
        const recordStatus = record.contract_status ? record.contract_status.toLowerCase() : "";
        return recordStatus === filterStatus.toLowerCase();
      });
    }
    console.log(filtered)
    setFilteredRecords(filtered);
    setPageNumber(0);
  }, [searchTerm, filterStatus, records]);


  const currentRows = filteredRecords.slice(
    pageNumber * rowsPerPage,
    (pageNumber + 1) * rowsPerPage
  );


  const handleInfoClick = (Infodata) => {
    router.push({
      pathname: '/contractInfo',
      query: {
        ContractID: Infodata.id,
      },
    });
  };

  // const handleEndContractClick = (info) => {
  //   router.push({
  //     pathname: '/endContract',
  //   });
  //   console.log(info);
  // };


  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: (row, index) => pageNumber * rowsPerPage + index + 1,
        id: 'index',
      },
      {
        Header: 'Start Date',
        accessor: (row) => row.start_contract_date.split(' ')[0],
        id: 'start_contract_date',
      },
      {
        Header: 'End Date',
        accessor: (row) => row.end_contract_date.split(' ')[0],
        id: 'end_contract_date',
      },
      {
        Header: 'Price(฿)',
        accessor: 'rental',
      },
      {
        Header: 'Deposit(฿)',
        accessor: 'deposit',
      },
      {
        Header: 'Renter',
        accessor: 'tenant_name',
      },
      {
        Header: 'Room Address',
        accessor: 'room_address',
      },
      {
        Header: 'Contract Status',
        accessor: 'contract_status',
      },
      {
        Header: 'More Info',
        accessor: 'info',
        Cell: ({ row }) => (
          <button
            onClick={() => handleInfoClick(row.original)}
            style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px', outline: 'none', marginTop: '5px', }}
          >
            Information
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
          style={{ marginRight: '10px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', height: '25px' }}
        />
        <span>Filter by Contract Status : </span>
        <select onChange={(e) => setFilterStatus(e.target.value)} style={{ fontFamily: 'Kanit', width: '150px', outline: 'none', border: 'none', borderRadius: '5px', height: '28px' }}>
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {/* <select onChange={(e) => setFilterStatus(e.target.value)} style={{ fontFamily: 'Kanit', width: '150px', outline: 'none', border: 'none', borderRadius: '5px', height: '28px'}}>
          <option value="">Filter by Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="expired">Expired</option> */}
        {/* Add more options based on your available statuses */}
        {/* </select> */}
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
                  // Check if the column is "Contract Status" and set the font color accordingly
                  const isContractStatusColumn = cell.column.id === 'contract_status';
                  const fontColor = isContractStatusColumn && cell.value === 'active' ? 'green' : 'red';

                  return (
                    <td
                      style={{
                        ...styles.td,
                        color: isContractStatusColumn ? fontColor : 'inherit',  // Only change color for the "Contract Status" column
                      }}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
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

export default ContractTable;
