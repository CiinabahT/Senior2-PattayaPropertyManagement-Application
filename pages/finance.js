import React, { useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import CreatableSelect from 'react-select/creatable';
import FinanceTable from '../components/FinanceTable.js';

export default function Finance() {
  const [isAddContractModalOpen, setIsAddContractModalOpen] = useState(false);
  const [selectedExpenses, setSelectedExpenses] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [documentObj, setDocumentObj] = useState(null);

  const handleCloseModal = () => {
    setIsAddContractModalOpen(false);
  };

  const handleAddModal = () => {
    setIsAddContractModalOpen(false);
  };



  const handleDocumentChange = (e) => {
    // Handle the document changes here
    // Example:
    const file = e.target.files[0];
    const previewUrl = URL.createObjectURL(file);
    setDocumentObj({ name: file.name, previewUrl });
  };

  const ExpenseOptions = [
    { value: 'rental', label: 'Rental' },
    { value: 'deposit', label: 'Deposit' },
    { value: 'electricBill', label: 'Electric Bill' },
    { value: 'waterBill', label: 'Water Bill' },
    { value: 'repair', label: 'Repair' },
    { value: 'mulct', label: 'Mulct' },
  ];

  const PaymentOptions = [
    { value: 'cash', label: 'Cash' },
    { value: 'deposit', label: 'Bank Transfer' },
    { value: 'electricBill', label: 'Paypal' },
    { value: 'waterBill', label: 'Credit Card' },
  ];

  const OfficeOptions = [
    { value: 'grandCentricSea', label: 'Grand Centric Sea' },

  ];

  const TypeOptions = [
    { value: 'revenue', label: 'Revenue' },
    { value: 'expense', label: 'Expense' },
  ];


  const records = [
    {
      expenseType: 'Rental',
      roomAddress: '123 Main St',
      paymentType: 'Credit Card',
      amountofMoney: 1500,
    },
    {
      expenseType: 'Deposit',
      roomAddress: '456 Elm St',
      paymentType: 'Bank Transfer',
      amountofMoney: 600,
    },
    {
      expenseType: 'Electric Bill',
      roomAddress: '789 Oak Rd',
      paymentType: 'Cash',
      amountofMoney: 100,
    },
    {
      expenseType: 'Water Bill',
      roomAddress: '101 Pine Ave',
      paymentType: 'PayPal',
      amountofMoney: 50,
    },
    {
      expenseType: 'Repair',
      roomAddress: '222 Maple St',
      paymentType: 'Credit Card',
      amountofMoney: 300,
    },
    {
      expenseType: 'Mulct',
      roomAddress: '333 Cedar Rd',
      paymentType: 'Cash',
      amountofMoney: 200,
    },
    {
      expenseType: 'Rental',
      roomAddress: '444 Birch Ave',
      paymentType: 'Bank Transfer',
      amountofMoney: 1600,
    },
    {
      expenseType: 'Electric Bill',
      roomAddress: '555 Oak Rd',
      paymentType: 'Cash',
      amountofMoney: 120,
    },
    {
      expenseType: 'Water Bill',
      roomAddress: '666 Elm St',
      paymentType: 'PayPal',
      amountofMoney: 70,
    },
    {
      expenseType: 'Repair',
      roomAddress: '777 Maple Ave',
      paymentType: 'Credit Card',
      amountofMoney: 250,
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
            <h1 style={{ fontSize: '35px', fontFamily: 'Kanit, sans-serif' }}>Finance</h1>
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
                width: '130px',
                height: '45px',
                marginRight: '7px'
              }}
              onClick={() => setIsAddContractModalOpen(true)}
            >
              Add Document
            </button>
          </div>
          <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginBottom: '40px', marginTop: '10px' }} />
          <div style={{ width: '100%', height: '500px' }}>
            <FinanceTable records={records} />
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
            <h2>Add Document</h2>
            <div><label htmlFor="name-surname">Description* </label></div>
            <textarea
              placeholder="Description..."
              style={{
                marginTop: '5px',
                height: '50px',
                minHeight: '25px',
                width: '383px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid gray',
                resize: 'vertical',
                fontFamily: 'Kanit, Arial, sans-serif',
                fontSize: '16px',
              }}
            />
            <div><label htmlFor="name-surname">Note* </label></div>
            <textarea
              placeholder="Note..."
              style={{
                marginTop: '5px',
                height: '50px',
                minHeight: '25px',
                width: '383px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid gray',
                resize: 'vertical',
                fontFamily: 'Kanit, Arial, sans-serif',
                fontSize: '16px',
              }}
            />
            <div><label>Type of Expense: </label></div>
            <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '20px', fontWeight: 'bold', marginTop: '5px', }}>
              <CreatableSelect
                options={ExpenseOptions}
                value={selectedExpenses}
                onChange={setSelectedExpenses}
                isSearchable={false}
                placeholder="Type of Expense"
                styles={{ container: (provided) => ({ ...provided, width: '387px', fontSize: '13px' }) }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <label htmlFor="start-rental-date">Amount of Money: </label>
                <input id="start-rental-date" type="text" placeholder="Price.." style={secondInputStyle} />
              </div>
              <div>
                <div><label>Payment Type: </label></div>
                <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '20px', fontWeight: 'bold', marginTop: '5px', marginRight: '13px' }}>
                  <CreatableSelect
                    options={PaymentOptions}
                    value={selectedPayment}
                    onChange={setSelectedPayment}
                    isSearchable={false}
                    placeholder="Payment Type"
                    styles={{ container: (provided) => ({ ...provided, width: '184px', fontSize: '13px' }) }}
                  />
                </div>
              </div>
            </div>

            <div><label>Office: </label></div>
            <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '20px', fontWeight: 'bold', marginTop: '5px', }}>
              <CreatableSelect
                options={OfficeOptions}
                value={selectedOffice}
                onChange={setSelectedOffice}
                isSearchable={true}
                placeholder="Select Office or Type a New One"
                styles={{ container: (provided) => ({ ...provided, width: '387px', fontSize: '13px' }) }}
              />
            </div>

            <div><label>Type: </label></div>
            <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '20px', fontWeight: 'bold', marginTop: '5px', marginRight: '13px' }}>
              <CreatableSelect
                options={TypeOptions}
                value={selectedType}
                onChange={setSelectedType}
                isSearchable={false}
                placeholder="Expense/Revenue"
                styles={{ container: (provided) => ({ ...provided, width: '184px', fontSize: '13px' }) }}
              />
            </div>
            <div>
              <div><label>Document: </label></div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label
                  style={{
                    display: 'block',
                    padding: '10px 15px',
                    background: '#326896',
                    color: '#FFF',
                    cursor: 'pointer',
                    width: '150px',
                    textAlign: 'center',
                    borderRadius: '5px',
                    marginTop: '2px'
                  }}
                >
                  Choose File
                  <input
                    type="file"
                    accept=".pdf, image/*"
                    onChange={handleDocumentChange}
                    style={{ display: 'none' }}
                  />
                </label>
                <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '-90px', marginLeft: '30px' }}>
                  <div
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '150px',
                    }}
                  >
                    {documentObj?.name?.length > 12 ? `${documentObj.name.substring(0, 12)}...` : documentObj?.name}
                  </div>
                  {documentObj?.previewUrl && (
                    <img src={documentObj.previewUrl} alt={`preview`} style={{ width: '160px', height: '100px', borderRadius: '5px', marginTop: '10px' }} />
                  )}
                </div>
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



