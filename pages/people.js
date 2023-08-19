import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import PeopleTable from '../components/PeopleTable.js';

const records = [
    {
      index: 1,
      'name-surname': 'John Doe',
      'passport/ID': '123456789',

    },
    {
      index: 2,
      'name-surname': 'Jane Smith',
      'passport/ID': '987654321',

    },
    {
      index: 3,
      'name-surname': 'Alice Johnson',
      'passport/ID': '111222333',

    },
    {
      index: 4,
      'name-surname': 'Bob Williams',
      'passport/ID': '333444555',

    },
    {
      index: 5,
      'name-surname': 'Charlie Brown',
      'passport/ID': '666777888',
    },
    {
      index: 6,
      'name-surname': 'David Lee',
      'passport/ID': '999000111',
    },
    {
      index: 7,
      'name-surname': 'Emily Adams',
      'passport/ID': '222333444',

    },
    {
        index: 8,
        'name-surname': 'James Adams',
        'passport/ID': '124512512',
  
      },
      {
        index: 9,
        'name-surname': 'Cid Serial',
        'passport/ID': '45732324',
  
      }
  ];
  


  

export default function People() {
    const [isAddPeopleModalOpen, setIsAddPeopleModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsAddPeopleModalOpen(false);
      };
    
      const handleAddModal = () => {
        setIsAddPeopleModalOpen(false);
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
            <div><label htmlFor="name-surname">Name-Surname: </label></div>
            <input id="name-surname" type="text" placeholder="Name-Surname.." style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc', width: '372px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px' }} />
            <div><label htmlFor="passport-id">Passport/ID: </label></div>
            <input id="passport-id" type="text" placeholder="Passport/ID.." style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc', width: '372px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px' }} />
            <div><label>Contact: </label></div>
            <select style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', width:'200px' }}>
            <option value="Line">Line</option>
            <option value="Facebook">Facebook</option>
            <option value="WeChat">WeChat</option>
            <option value="Tel">Tel</option>
            <option value="Weibo">Weibo</option>
            <option value="Shopee">Shopee</option>
            </select>
            <input type="text" placeholder="Contact Info" style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc', fontFamily: 'Kanit', width: '160px', marginLeft: '10px', border: 'none', borderRadius: '5px', outline: 'none', fontSize: '14px' }} />
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



