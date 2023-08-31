import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import PeopleTable from '../components/PeopleTable.js';
import { fetchPeople } from '../API/api.js';
import axios from 'axios';

export default function People() {
  const [isAddPeopleModalOpen, setIsAddPeopleModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [contactType, setContactType] = useState('Line');
  const [contactValue, setContactValue] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [identityNumberError, setIdentityNumberError] = useState('');
  const [contactValueError, setContactValueError] = useState('');

  // const [fullName, setFullName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [fullNameError, setFullNameError] = useState('');

  useEffect(() => {
    const newFullName = `${firstName} ${lastName}`.trim();
    setFullName(newFullName);
  }, [firstName, lastName]);

  const commonInputStyle = {
    width: '93%',
    padding: '8px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontFamily: 'Kanit',
    outline: 'none',
    fontSize: '14px'
  };

  const resetFields = () => {
    setFullName('');
    setIdentityNumber('');
    setContactType('Line');
    setContactValue('');
    setFullNameError('');
    setIdentityNumberError('');
    setContactValueError('');
  };

  const handleCloseModal = () => {
    setIsAddPeopleModalOpen(false);
    resetFields();
  };


  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPeople();
      if (data !== null) {
        setRecords(data);
      }
    };

    fetchData();
  }, []);

  const handleAddPerson = async () => {
    let isValid = true;

    // Validation
    if (!fullName) {
      setFullNameError('Name-Surname is required.');
      isValid = false;
    } else {
      setFullNameError('');
    }

    if (!identityNumber) {
      setIdentityNumberError('Passport/ID is required.');
      isValid = false;
    } else {
      setIdentityNumberError('');
    }

    if (!contactValue) {
      setContactValueError('Contact Info is required.');
      isValid = false;
    } else {
      setContactValueError('');
    }

    if (!isValid) {
      return;
    }

    // API call
    try {
      const response = await axios.post('https://pattayaavenueproperty.xyz/api/persons/createprofiles', {
        full_name: fullName,
        identity_number: identityNumber,
        type_contact: contactType,
        value_contact: contactValue,
      });

      if (response.status === 200) {
        console.log('Successfully added person:', response.data);
        handleCloseModal();
        const data = await fetchPeople();
        setRecords(data);
      }
    } catch (error) {
      console.error('Failed to add person:', error);
    }
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
            <h1 style={{ fontSize: '35px', fontFamily: 'Kanit, sans-serif' }}>People</h1>
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
                width: '112px',
                height: '45px',
                marginRight: '7px'
              }}
              onClick={() => setIsAddPeopleModalOpen(true)}
            >
              Add People
            </button>
          </div>
          <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginBottom: '40px', marginTop: '10px' }} />
          <div style={{ width: '100%', height: '500px' }}>
            <PeopleTable records={records} />

          </div>
        </div>

      </div>
      {isAddPeopleModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'white', width: '400px', padding: '30px', borderRadius: '10px', fontFamily: 'Kanit, sans-serif',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
          }}>
            <h2>Add People</h2>
            <div style={{ color: 'red', marginBottom: '15px' }}>* Warning * The data that Created can not be deleted</div>
            <div>
              <label htmlFor="first-name">Name:</label>
              <input
                id="first-name"
                type="text"
                placeholder="Name..."
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={commonInputStyle}
              />
            </div>
            <div>
              <label htmlFor="last-name">Surname:</label>
              <input
                id="last-name"
                type="text"
                placeholder="Surname..."
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={commonInputStyle}
              />
            </div>
            {/* This input field is not editable. It's just for displaying the combined full name. */}
            <div>
              <label hidden htmlFor="name-surname">Full Name:</label>
              <input
                hidden
                id="name-surname"
                type="text"
                placeholder="Name-Surname..."
                value={fullName}
                readOnly
                style={commonInputStyle}
              />
            </div>
            {fullNameError && <div style={{ color: 'red' }}>{fullNameError}</div>}
            <div><label htmlFor="passport-id">Passport/ID: </label></div>
            <input id="passport-id" type="text" placeholder="Passport/ID.." value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)} style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc', width: '372px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px' }} />
            {identityNumberError && <div style={{ color: 'red' }}>{identityNumberError}</div>}
            <div><label>Contact: </label></div>
            <select value={contactType}
              onChange={(e) => setContactType(e.target.value)} style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', width: '200px' }}>
              <option value="Line">Line</option>
              <option value="Facebook">Facebook</option>
              <option value="WeChat">WeChat</option>
              <option value="Tel">Tel</option>
              <option value="Weibo">Weibo</option>
              <option value="Shopee">Shopee</option>
            </select>
            <input type="text" placeholder="Contact Info" value={contactValue}
              onChange={(e) => setContactValue(e.target.value)} style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc', fontFamily: 'Kanit', width: '160px', marginLeft: '10px', border: 'none', borderRadius: '5px', outline: 'none', fontSize: '14px' }} />
            {contactValueError && <div style={{ color: 'red' }}>{contactValueError}</div>}
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px', }}>
              <button onClick={handleCloseModal} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', borderRadius: '5px', border: 'none', marginRight: '10px', marginLeft: '1px', width: '60px' }}>Close</button>
              <button onClick={handleAddPerson} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px', color: 'white', width: '60px' }}>Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



