import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getFinancialInfo } from '../API/api.js';

export default function DeletedFinanceInfo() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const router = useRouter();

  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////

  // create state for financial info by each 
  const [description, setDescription] = useState('');
  const [note, setNote] = useState('');
  const [typeOfExpenses, setTypeOfExpenses] = useState('');
  const [amountOfMoney, setAmountOfMoney] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [roomAddress, setRoomAddress] = useState('');
  const [type, setType] = useState('');
  const [selectedFilesForDocument, setSelectedFilesForDocument] = useState([]);

  useEffect(() => {
    const TransactionId = router.query.TransactionID;

    getFinancialInfo(TransactionId)
      .then(data => {
        console.log('API Response:', data);
        setDescription(data.description);
        setNote(data.remark);
        setTypeOfExpenses(data.catorgory_type);
        setAmountOfMoney(data.amount);
        setPaymentType(data.payment_method);
        setRoomAddress(data.room_address);
        setType(data.is_receive);

        const base64ToBlob = (base64, mimeType = 'application/pdf') => {

          const byteCharacters = atob(base64);
          const byteNumbers = new Array(byteCharacters.length);

          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          return new Blob([byteArray], { type: mimeType });
        };

        if (data.transaction_document) {
          console.log([data.transaction_document]);
          let documents = [data.transaction_document];
          const roomDoc = documents.map(document => {
            console.log(document);
            let preview;
            const blob = base64ToBlob(document.document_url);
            preview = URL.createObjectURL(blob);
            return {
              id: document.id,
              name: `PDF-${document.id}`,
              preview: preview,
            };
          });
          setSelectedFilesForDocument(roomDoc);
        }
      })
  }, []);

  useEffect(() => {
  }, [selectedFilesForDocument]);

  useEffect(() => {
    return () => {
      selectedFilesForDocument.forEach(fileObj => {
        URL.revokeObjectURL(fileObj.preview);
      });
    };
  }, [selectedFilesForDocument]);

  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////
  

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
      <div style={{ display: 'flex', height: '100vh', width: '100vw', overflowY: 'auto' }}>
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
              value={description}
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
              value={note}
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
            <input type="text" value={typeOfExpenses} placeholder='Type of Expense..' style={commonInputStyle} readOnly />

            <div><label style={commonLabelStyle}>Amount of Money:</label></div>
            <input type="text" value={amountOfMoney} placeholder='Amount of Money..' style={commonInputStyle} readOnly />

            <div><label style={commonLabelStyle}>Payment Type:</label></div>
            <input type="text" value={paymentType} placeholder='Payment Type..' style={commonInputStyle} readOnly />

            <div><label style={commonLabelStyle}>Room Address:</label></div>
            <input type="text" value={roomAddress} placeholder='Room Address..' style={commonInputStyle} readOnly />

            <div><label style={commonLabelStyle}>Type:</label></div>
            <input type="text" value={type} placeholder='Type..' style={commonInputStyle} readOnly />
          </div>

          {/* SHOW DOC */}
          <div>
            {selectedFilesForDocument.map((fileObj, index) => (
              <div key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }} >
                <embed src={fileObj.preview} type="application/pdf" style={{ width: '500px', height: '600px', marginLeft: '600px', marginTop: '-550px' }} />
              </div>
            ))}
          </div>
          {/* SHOW DOC */}

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
              <button onClick={handleCloseModal} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', borderRadius: '5px', border: 'none', marginRight: '10px', marginLeft: '1px', width: '70px', height: '40px', fontSize: '16px' }}>Cancel</button>
              <button onClick={handleDeleteClick} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#A91B0D', border: 'none', borderRadius: '5px', color: 'white', width: '70px', height: '40px', fontSize: '16px' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}