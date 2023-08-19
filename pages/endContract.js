import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar.js'; // Import the Sidebar component
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import RecordTable from '../components/RecordTables.js';


export default function EndContract() {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState('');
    const [isEndContractModalOpen, setIsEndContractModalOpen] = useState(false);


      const roomStatusOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },

      ];
    
  const commonInputStyle = {
    width: '200px',
    height: '35px',
    fontFamily: 'Kanit',
    outline: 'none',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
  };

  const dateCommonInputStyle = {
    width: '200px',
    height: '35px',
    fontFamily: 'Kanit',
    outline: 'none',
    borderRadius: '5px',
    border: 'none',
    fontWeight: 'bold',
  };
  
  const commonLabelStyle = {
    display: 'block',
    fontSize: '20px',
    fontWeight: 'bold',
  };

  const handleEndContractClick = (info) => {
    setIsEndContractModalOpen(true);
    console.log(info);
  };

  const handleCloseModal = () => {
    setIsEndContractModalOpen(false);
  };

  const handleEndClick = (info) => {
    setIsEndContractModalOpen(false);
    console.log(info);
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
      <div style={{ display: 'flex', fontFamily: 'Kanit, sans-serif' }}>
        <div style={{ flex: '0 0 250px', position: 'fixed' }}>
          <Sidebar />
        </div>
        <div style={{ marginLeft: '300px', marginRight: '30px', marginTop: '40px', flex: '1' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/back(1).png" alt="Back" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => router.back()} />
          <h1 style={{ fontSize: '35px', fontFamily: 'Kanit, sans-serif', marginLeft: '10px', }}>End Contract</h1>
          </div>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginTop: '10px', fontWeight: 'bold' }}>

          </div>
          </div>
          <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px' }} />
          <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '30px' }}>
          <div style={{ marginBottom: '30px', flex: '0 0 14%', marginRight: '10px'}}>
            <label style={commonLabelStyle}>Room Address:</label>
            <Select
                options={roomStatusOptions}
                value={selectedOption}
                onChange={option => setSelectedOption(option)}
                isSearchable = {true}
                placeholder="Room Address"
                styles={{
                container: (provided) => ({
                    ...provided,

                    fontFamily: 'Kanit',
                    borderRadius: '5px',
                    outline: 'none',
                    width: '206px',
 
                }),
                menu: styles => ({
                    ...styles,
                    marginTop: '5px',
                    zIndex: 9999
                })
                }}
            />
            </div>
            
  <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%', marginLeft: '113px'}}>
    <label style={ commonLabelStyle }>Start Rental Date:</label>
    <input type="date" placeholder=" " style={dateCommonInputStyle} />
  </div>
  <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
    <label style={commonLabelStyle}>End Rental Date:</label>
    <input type="date" placeholder=" "style={dateCommonInputStyle} />
  </div>
    <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%'}}>
      <label style={commonLabelStyle}>Rental Price:</label>
      <input type="text" placeholder=" Rental Price:"style={commonInputStyle} />
    </div>
    <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%'}}>
      <label style={commonLabelStyle}>Deposit:</label>
      <input type="text" placeholder=" Deposit.." style={commonInputStyle}/>
    </div>
    <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%'}}>
      <label style={commonLabelStyle}>Check-in Date:</label>
      <input type="date" placeholder=" Check-in Date.."style={dateCommonInputStyle} />
    </div>
    <div style={{marginBottom: '30px', flex: '0 0 21%', marginRight: '1%'}}>
      <label style={commonLabelStyle}>Water Usage Amount (Check-in):</label>
      <input type="text" placeholder=" Water Usage Amount.." style={commonInputStyle}/>
    </div>
    <div style={{marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
      <label style={commonLabelStyle}>Electric Usage Amount (Check-in):</label>
      <input type="text" placeholder=" Electric Usage Amount.." style={commonInputStyle}/>
    </div>
    <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%'}}>
      <label style={commonLabelStyle}>Name-Surname:</label>
      <input type="text" placeholder=" Name-Surname.."style={commonInputStyle} />
    </div>
    <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%'}}>
      <label style={commonLabelStyle}>Passport/ID:</label>
      <input type="text" placeholder=" Passport/ID.."style={commonInputStyle} />
    </div>
    


  </div> 
  <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginTop: '40px' }} />
<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '30px' }}>
  <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
    <label style={commonLabelStyle}>Check-out Date:</label>
    <input type="date" placeholder=" Price.." style={dateCommonInputStyle} />
  </div>
  <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
    <label style={commonLabelStyle}>Water Usage Amount (Check-out):</label>
    <input type="text" placeholder=" Water Usage Amount.." style={commonInputStyle} />
  </div>
  <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
    <label style={commonLabelStyle}>Electric Usage Amount (Check-out):</label>
    <input type="text" placeholder=" Electric Usage Amount.." style={commonInputStyle} />
  </div>
</div>
<hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginTop: '40px' }} />
<div>
    <button
    onClick={handleEndContractClick}
        style={{
          padding: '5px 10px',
          cursor: 'pointer',
          fontFamily: 'Kanit, sans-serif',
          backgroundColor: '#A91B0D',
          border: 'none',
          borderRadius: '5px',
          color: 'white',
          width: '130px',
          height: '40px',
          fontSize: '16px',
          marginRight: '10px',
          marginTop: '30px'
        }}
      >
        End Contract
      </button>
    </div>
    </div>
</div>      

{isEndContractModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
        <div style={{
        backgroundColor: 'white', width: '550px', padding: '30px', borderRadius: '10px', fontFamily: 'Kanit, sans-serif',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', textAlign: 'center', // Add textAlign property here
        }}>
        <h1>End this Contract</h1>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', }}> {/* Change justifyContent to center */}
            <button onClick={handleCloseModal} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', borderRadius: '5px', border: 'none', marginRight: '10px', marginLeft: '1px', width: '70px', height: '40px', fontSize: '16px'}}>Cancel</button>
            <button onClick={handleEndClick} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#A91B0D', border: 'none', borderRadius: '5px', color: 'white', width: '120px', height: '40px', fontSize: '16px' }}>End Contract</button>
        </div>
        </div>
        </div>
      )}
    
    </>
  );
}

