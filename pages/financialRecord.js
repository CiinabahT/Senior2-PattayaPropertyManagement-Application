import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import FinancialRecordTable from '../components/FinanciaHistoryTable.js';
import { fetchDeleteFinance } from '../API/api.js';

export default function FinancialRecord() {
  const [isAddContractModalOpen, setIsAddContractModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDeleteFinance();
      setRecords(data);
    };

    fetchData();
  }, []);

  const handleCloseModal = () => {
    setIsAddContractModalOpen(false);
  };

  const handleAddModal = () => {
    setIsAddContractModalOpen(false);
  };

  const RoomOptions = [
    { value: 'room1', label: 'Room 1' },
    { value: 'room2', label: 'Room 2' },
  ];


  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '0 0 250px', position: 'fixed' }}>
          <Sidebar />
        </div>
        <div style={{ marginLeft: '300px', marginRight: '30px', marginTop: '40px', flex: '1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '35px', fontFamily: 'Kanit, sans-serif' }}>Financial Record (Deleted)</h1>
          </div>
          <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginBottom: '40px', marginTop: '10px' }} />
          <div style={{ width: '100%', height: '500px' }}>
            <FinancialRecordTable records={records} />
          </div>
        </div>
      </div>

    </>
  );
}



