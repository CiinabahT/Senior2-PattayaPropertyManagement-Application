import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ContractInfo() {
  const router = useRouter();

  useEffect(() => {

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);


  const handleSaveClick = (info) => {
    setIsDeleteModalOpen(false);
    console.log(info);
  };

  const handleDownloadClick = (info) => {
    setIsDeleteModalOpen(false);
    console.log(info);
  };

  const commonLabelStyle = {
    fontFamily: 'Kanit',
    fontSize: '18px'
  };

  const commonInputStyle = {
    marginBottom: '15px',
    width: '200px',
    height: '30px',
    fontFamily: 'Kanit',
    outline: 'none',
    border: 'none',
    borderRadius: '5px',
    fontSize: '15px',
    marginTop: '2px'
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
              <img src="/back(1).png" alt="Back" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => router.back()} />
              <h1 style={{ fontSize: '35px', fontFamily: 'Kanit, sans-serif', marginLeft: '10px' }}>Contract Information</h1>
            </div>
            <button
              style={{
                fontSize: '17px',
                fontFamily: 'Kanit, sans-serif',
                backgroundColor: '#326896',
                color: 'white',
                borderRadius: '5px',
                padding: '10px 15px',
                border: 'none',
                cursor: 'pointer',
                width: '110px',
                height: '45px',
                marginRight: '7px'
              }}
              onClick={() => handleSaveClick}
            >
              Save Data
            </button>
          </div>
          <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginBottom: '40px', marginTop: '10px' }} />
          <div style={{ width: '100%' }}>
            <div><label style={commonLabelStyle}>Description:</label></div>
            <textarea
              placeholder="Description..."
              style={{
                marginTop: '5px',
                height: '50px',
                minHeight: '25px',
                width: '30%',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid gray',
                resize: 'vertical',
                fontFamily: 'Kanit, Arial, sans-serif',
                fontSize: '16px',
              }}
            />
            <div><label style={commonLabelStyle}>Note:</label></div>
            <textarea
              placeholder="Note..."
              style={{
                marginTop: '5px',
                height: '50px',
                minHeight: '25px',
                width: '30%',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid gray',
                resize: 'vertical',
                fontFamily: 'Kanit, Arial, sans-serif',
                fontSize: '16px',
                marginBottom: '10px'
              }}
            />

            <div><label style={commonLabelStyle}>Type of Expenses:</label></div>
            <input type="text" placeholder='Type of Expense..' style={commonInputStyle} />

            <div><label style={commonLabelStyle}>Amount of Money:</label></div>
            <input type="text" placeholder='Amount of Money..' style={commonInputStyle} />

            <div><label style={commonLabelStyle}>Payment Type:</label></div>
            <input type="text" placeholder='Payment Type..' style={commonInputStyle} />

            <div><label style={commonLabelStyle}>Office:</label></div>
            <input type="text" placeholder='Office..' style={commonInputStyle} />

            <div><label style={commonLabelStyle}>Type:</label></div>
            <input type="text" placeholder='Type..' style={commonInputStyle} />

          </div>

          <div style={{ width: '100%', height: '500px' }}>
          </div>
        </div>
      </div>

    </>
  );
}


