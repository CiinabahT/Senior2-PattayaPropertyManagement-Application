import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import CreatableSelect from 'react-select/creatable';
import ContractTable from '../components/ContactTable.js';


export default function Contract() {
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
          startDate: '2023-08-01',
          endDate: '2023-08-31',
          price: 1500,
          deposit: 500,
          renter: 'John Doe',
          roomAddress: '123 Main St',

        },
        {
          startDate: '2023-09-01',
          endDate: '2023-09-30',
          price: 1700,
          deposit: 600,
          renter: 'Jane Smith',
          roomAddress: '456 Elm St',

        },
        {
          startDate: '2023-10-01',
          endDate: '2023-10-31',
          price: 1400,
          deposit: 450,
          renter: 'Michael Johnson',
          roomAddress: '789 Oak Rd',

        },
        {
          startDate: '2023-11-01',
          endDate: '2023-11-30',
          price: 1600,
          deposit: 550,
          renter: 'Emily Brown',
          roomAddress: '101 Pine Ave',

        },
        {
          startDate: '2023-12-01',
          endDate: '2023-12-31',
          price: 1800,
          deposit: 700,
          renter: 'David Wilson',
          roomAddress: '222 Maple St',

        },
        {
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          price: 1650,
          deposit: 600,
          renter: 'Olivia Johnson',
          roomAddress: '333 Cedar Rd',

        },
        {
          startDate: '2024-02-01',
          endDate: '2024-02-28',
          price: 1550,
          deposit: 550,
          renter: 'James Miller',
          roomAddress: '444 Birch Ave',

        },
        {
          startDate: '2024-03-01',
          endDate: '2024-03-31',
          price: 1700,
          deposit: 600,
          renter: 'Sophia Davis',
          roomAddress: '555 Oak Rd',

        },
        {
          startDate: '2024-04-01',
          endDate: '2024-04-30',
          price: 1600,
          deposit: 550,
          renter: 'William Jackson',
          roomAddress: '666 Elm St',

        },
        {
          startDate: '2024-05-01',
          endDate: '2024-05-31',
          price: 1750,
          deposit: 650,
          renter: 'Ava Smith',
          roomAddress: '777 Maple Ave',

        },
      ];
      

      const commonInputStyle = {
        width: '100%',
        padding: '8px',
        margin: '5px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '372px',
        fontFamily: 'Kanit',
        outline: 'none',
        border: 'none',
        fontSize: '14px'
      };

      const secondInputStyle = {
        padding: '8px',
        margin: '5px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '167px',
        fontFamily: 'Kanit',
        outline: 'none',
        border: 'none',
        fontSize: '14px'
      };


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
                <h1 style={{ fontSize: '35px', fontFamily: 'Kanit, sans-serif' }}>Contract</h1>
                <button
                  style={{
                    fontSize: '15px',
                    fontFamily: 'Kanit, sans-serif',
                    backgroundColor: '#326896',
                    color: 'white',
                    borderRadius: '5px',
                    padding: '10px 15px',
                    border: 'none',
                    cursor: 'pointer',
                    width: '120px',
                    height: '45px',
                    marginRight: '7px'
                  }}
                  onClick={() => setIsAddContractModalOpen(true)}
                >
                  Add Contract
                </button>
              </div>
              <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginBottom: '40px', marginTop: '10px' }} />
              <div style={{ width: '100%', height: '500px' }}>
              <ContractTable records={records} />
              </div>
            </div>
          </div>

          {isAddContractModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'white', width: '400px', padding: '30px', borderRadius: '10px', fontFamily: 'Kanit, sans-serif',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h2>Add Contract</h2>
            <div style={{ color: 'red', marginBottom: '15px' }}>* Warning * The data that Created can not be deleted</div>
            <div><label htmlFor="name-surname">Contractor Name: </label></div>
            <input id="name-surname" type="text" placeholder="Name-Surname.." style={commonInputStyle} />
            <div><label htmlFor="name-surname">Passport/ID: </label></div>
            <input id="name-surname" type="text" placeholder="Passport/ID.." style={commonInputStyle} />
            <div><label>Room Number: </label></div>
            <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '20px', fontWeight: 'bold', marginTop: '5px', }}>
            <CreatableSelect
            options={RoomOptions}
            value={selectedRoom}
            onChange={setSelectedRoom}
            isSearchable={true}
            placeholder="Select Room or Type a New One"
            styles={{ container: (provided) => ({ ...provided, width: '387px', fontSize: '13px'}) }}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
            <label htmlFor="start-rental-date">Start Rental Date: </label>
            <input id="start-rental-date" type="date" placeholder="Date.." style={secondInputStyle} />
            </div>
            <div>
            <label htmlFor="end-rental-date">End Rental Date: </label>
            <input id="end-rental-date" type="date" placeholder="Date.." style={secondInputStyle} />
            </div>
            
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
            <label htmlFor="start-rental-date">Rental Price: </label>
            <input id="start-rental-date" type="text" placeholder="Price.." style={{ padding: '8px', margin: '5px 0', border: '1px solid #ccc', width: '167px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px', marginRight: '-26px'}} />
            </div>
            <div>
            <label htmlFor="end-rental-date">Deposit: </label>
            <input id="end-rental-date" type="text" placeholder="Deposit.." style={secondInputStyle} />
            </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
            <label htmlFor="start-rental-date">Water Usage Amount: </label>
            <input id="start-rental-date" type="text" placeholder="Usage.." style={{ padding: '8px', margin: '5px 0', border: '1px solid #ccc', width: '167px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px', marginRight: '14px'}} />
            </div>
            <div>
            <label htmlFor="end-rental-date">Electric Usage Amount: </label>
            <input id="end-rental-date" type="text" placeholder="Usage.." style={secondInputStyle} />
            </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
            <div><label htmlFor="start-rental-date">Check-in Date: </label></div>
            <input id="start-rental-date" type="date" placeholder="Date.." style={secondInputStyle} />
            </div>

        </div>
        
        
        
        

            
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px', }}>
            <button onClick={handleCloseModal} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', borderRadius: '5px', border: 'none', marginRight: '10px', marginLeft: '1px', width: '60px' }}>Close</button>
            <button onClick={handleAddModal} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px', color: 'white', width: '60px' }}>Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



