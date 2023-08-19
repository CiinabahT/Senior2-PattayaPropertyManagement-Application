import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import FinancialRecordTable from '../components/FinanciaHistoryTable.js';

export default function FinancialRecord() {
    const [isAddContractModalOpen, setIsAddContractModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

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

      const records = [
        {
          expenseType: 'Rental',
          roomAddress: '123 Main St',
          paymentType: 'Credit Card',
          deletedDate: '2023-08-15',
          amountofMoney: 1500,
          info: 'Lorem ipsum dolor sit amet...',
        },
        {
          expenseType: 'Deposit',
          roomAddress: '456 Elm St',
          paymentType: 'Bank Transfer',
          deletedDate: '2023-08-16',
          amountofMoney: 600,
          info: 'Lorem ipsum dolor sit amet...',
        },
        {
          expenseType: 'Electric Bill',
          roomAddress: '789 Oak Rd',
          paymentType: 'Cash',
          deletedDate: '2023-08-17',
          amountofMoney: 100,
          info: 'Lorem ipsum dolor sit amet...',
        },
        {
          expenseType: 'Water Bill',
          roomAddress: '101 Pine Ave',
          paymentType: 'PayPal',
          deletedDate: '2023-08-18',
          amountofMoney: 50,
          info: 'Lorem ipsum dolor sit amet...',
        },
        {
          expenseType: 'Repair',
          roomAddress: '222 Maple St',
          paymentType: 'Credit Card',
          deletedDate: '2023-08-19',
          amountofMoney: 300,
          info: 'Lorem ipsum dolor sit amet...',
        },
        {
          expenseType: 'Mulct',
          roomAddress: '333 Cedar Rd',
          paymentType: 'Cash',
          deletedDate: '2023-08-20',
          amountofMoney: 200,
          info: 'Lorem ipsum dolor sit amet...',
        },
        {
          expenseType: 'Rental',
          roomAddress: '444 Birch Ave',
          paymentType: 'Bank Transfer',
          deletedDate: '2023-08-21',
          amountofMoney: 1600,
          info: 'Lorem ipsum dolor sit amet...',
        },
        {
          expenseType: 'Electric Bill',
          roomAddress: '555 Oak Rd',
          paymentType: 'Cash',
          deletedDate: '2023-08-22',
          amountofMoney: 120,
          info: 'Lorem ipsum dolor sit amet...',
        },
        {
          expenseType: 'Water Bill',
          roomAddress: '666 Elm St',
          paymentType: 'PayPal',
          deletedDate: '2023-08-23',
          amountofMoney: 70,
          info: 'Lorem ipsum dolor sit amet...',
        },
        {
          expenseType: 'Repair',
          roomAddress: '777 Maple Ave',
          paymentType: 'Credit Card',
          deletedDate: '2023-08-24',
          amountofMoney: 250,
          info: 'Lorem ipsum dolor sit amet...',
        },
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



