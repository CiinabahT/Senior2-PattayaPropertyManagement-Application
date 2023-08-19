import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function DeletedFinanceInfo() {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleCloseModal = () => {
        setIsDeleteModalOpen(false);
      };
    
      const handleDeleteModal = () => {
        setIsDeleteModalOpen(false);
      };

      const handleDeleteClick = (info) => {
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
              <h1 style={{ fontSize: '35px', fontFamily: 'Kanit, sans-serif', marginLeft: '10px' }}>Deleted Financial Information</h1>
            </div>
            
              </div>
              <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginBottom: '40px', marginTop: '10px' }} />
            <div style={{ width: '100%' }}>
                <div><label style={commonLabelStyle}>Description:</label></div>
                    <textarea
                    placeholder="Description..."
                    readOnly
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
                    readOnly
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
                <input type="text" placeholder='Type of Expense..' style={commonInputStyle} readOnly />

                <div><label style={commonLabelStyle}>Amount of Money:</label></div>
                <input type="text" placeholder='Amount of Money..' style={commonInputStyle} readOnly />

                <div><label style={commonLabelStyle}>Payment Type:</label></div>
                <input type="text" placeholder='Payment Type..' style={commonInputStyle} readOnly />

                <div><label style={commonLabelStyle}>Office:</label></div>
                <input type="text" placeholder='Office..' style={commonInputStyle} readOnly/>

                <div><label style={commonLabelStyle}>Type:</label></div>
                <input type="text" placeholder='Type..' style={commonInputStyle} readOnly/>

                <div><button onClick={handleDownloadClick} style={{ width: '100px', height: '40px', fontFamily: 'Kanit', width: '170px', outline: 'none', border: 'none', borderRadius: '5px', backgroundColor: '#326896', fontSize: '15px', marginTop: '10px'}}>Download Document</button></div>
            </div>
                    
              <div style={{ width: '100%', height: '500px' }}>
              </div>
            </div>
          </div>

          {isDeleteModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
        <div style={{
        backgroundColor: 'white', width: '550px', padding: '30px', borderRadius: '10px', fontFamily: 'Kanit, sans-serif',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', textAlign: 'center' // Add textAlign property here
        }}>
        <h1>Delete this Transaction</h1>
        <h2 style={{ color: '#A91B0D' }}>This Document Should Not Delete, Are you sure?</h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', }}> {/* Change justifyContent to center */}
            <button onClick={handleCloseModal} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', borderRadius: '5px', border: 'none', marginRight: '10px', marginLeft: '1px', width: '70px', height: '40px', fontSize: '16px'}}>Cancel</button>
            <button onClick={handleDeleteClick} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#A91B0D', border: 'none', borderRadius: '5px', color: 'white', width: '70px', height: '40px', fontSize: '16px' }}>Delete</button>
        </div>
        </div>
        </div>
      )}
    </>
  );
}


