import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import CreatableSelect from 'react-select/creatable';
import ContractTable from '../components/ContactTable.js';
import { fetchContract } from '../API/api.js';



export default function Contract() {
  const [isAddContractModalOpen, setIsAddContractModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEndContractModal, setShowEndContractModal] = useState(false);


  const handleCloseModal = () => {
    setIsAddContractModalOpen(false);
  };

  const handleDelete = async () => {
    // try {
    //   const response = await DeletePeopleContact(selectedContact);
    //   console.log('Contact deleted:', response);

    //   // Refresh the records after a successful delete operation
    //   const data = await getContactPeople(PersonId);
    //   setRecords(data);

    //   // Close the delete modal
    //   setShowDeleteModal(false);
    // } catch (error) {
    //   console.error('Failed to delete contact:', error);
    // }
  };

  const handleAddModal = () => {
    setIsAddContractModalOpen(false);
  };

  const [records, setRecords] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchContract();
      setRecords(data);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const RoomOptions = [
    { value: 'room1', label: 'Room 1' },
    { value: 'room2', label: 'Room 2' },
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={{ fontSize: '35px', fontFamily: 'Kanit, sans-serif', marginLeft: '10px' }}>Contract</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>

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
                  marginRight: '7px' // You already had marginRight here
                }}
                onClick={() => setIsAddContractModalOpen(true)}
              >
                Add Contract
              </button>
              <button
                style={{
                  fontSize: '15px',
                  fontFamily: 'Kanit, sans-serif',
                  backgroundColor: '#A91B0D',  // background color for 'End Contract'
                  color: 'white',
                  borderRadius: '5px',
                  padding: '10px 15px',
                  border: 'none',
                  cursor: 'pointer',
                  width: '120px',
                  height: '45px',
                  marginLeft: '7px' // Added marginLeft to match the marginRight of the other button
                }}
                // You'll need to handle what happens when this button is clicked
                onClick={() => setShowEndContractModal(true)}
              >
                End Contract
              </button>
            </div>
          </div>
          <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginBottom: '40px', marginTop: '10px' }} />
          <div style={{ width: '100%', height: '500px' }}>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!isLoading && !error && <ContractTable records={records} />}
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
                styles={{ container: (provided) => ({ ...provided, width: '387px', fontSize: '13px' }) }}
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
                <input id="start-rental-date" type="text" placeholder="Price.." style={{ padding: '8px', margin: '5px 0', border: '1px solid #ccc', width: '167px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px', marginRight: '-26px' }} />
              </div>
              <div>
                <label htmlFor="end-rental-date">Deposit: </label>
                <input id="end-rental-date" type="text" placeholder="Deposit.." style={secondInputStyle} />
              </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <label htmlFor="start-rental-date">Water Usage Amount: </label>
                <input id="start-rental-date" type="text" placeholder="Usage.." style={{ padding: '8px', margin: '5px 0', border: '1px solid #ccc', width: '167px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px', marginRight: '14px' }} />
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
      {showEndContractModal && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '400px',
            textAlign: 'left',  // Aligned text to the left
            fontFamily: 'Kanit, sans-serif'  // Font family set to Kanit
          }}>
            <h2 style={{ fontFamily: 'Kanit, sans-serif' }}>End Contract</h2>
            <div>
              <div><span style={{ fontFamily: 'Kanit, sans-serif' }}>Contract: </span></div>
              <select
                onChange={e => setSelectedContact(e.target.value)}
                style={{ width: '80%', fontFamily: 'Kanit, sans-serif', outline: 'none', border: 'none', borderRadius: '5px', height: '30px' }}
              >
                {records && records.length > 0 ? (
                  records.map((record) => (
                    <option key={record.id} value={record.id} style={{ fontFamily: 'Kanit, sans-serif' }}>
                      {record.tenant_name} ({record.room_number}) {/* Ensure record.value and record.type are the correct keys */}
                    </option>
                  ))
                ) : (
                  <option disabled>No contracts available</option>
                )}
              </select>


            </div>
            <div style={{ marginTop: '20px' }}>
              <button onClick={() => setShowEndContractModal(false)} style={{
                padding: '10px',
                marginRight: '10px',
                backgroundColor: 'grey',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                width: '60px',
                fontFamily: 'Kanit, sans-serif'  // Font family set to Kanit
              }}>Close</button>

              <button onClick={handleDelete} style={{
                padding: '10px',
                backgroundColor: '#A91B0D',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontFamily: 'Kanit, sans-serif',
                width: '70px'
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



