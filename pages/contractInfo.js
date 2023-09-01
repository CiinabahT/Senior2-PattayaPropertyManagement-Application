import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getContractByID } from '../API/api.js';

export default function ContractInfo() {
  const router = useRouter();
  const { ContractID } = router.query;
  const [contractInfo, setContractInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContractByID(ContractID);
        setContractInfo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [ContractID]);

  const commonInputaStyle = {
    width: '200px',
    height: '35px',
    fontFamily: 'Kanit',
    outline: 'none',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
    marginBottom: '15px',
  };

  const commonLabelStyles = {
    display: 'block',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: 'Kanit'
  };


  const handleSaveClick = (info) => {
    setIsDeleteModalOpen(false);
    console.log(info);
  };

  const handleDownloadClick = (info) => {
    setIsDeleteModalOpen(false);
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
      <div style={{ display: 'flex', minHeight: '100vh' }}> {/* This sets a minimum full viewport height */}
        <div style={{ flex: '0 0 250px', position: 'fixed' }}>
          <Sidebar />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '300px', marginRight: '30px', marginTop: '40px', flex: '1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/back(1).png" alt="Back" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => router.back()} />
              <h1 style={{ fontSize: '35px', fontFamily: 'Kanit, sans-serif', marginLeft: '10px' }}>Contract Information</h1>
            </div>
            {/* <button
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
            </button> */}
          </div>
          <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginBottom: '40px', marginTop: '10px' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '30px' }}>

            <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
              <label style={commonLabelStyles}>Room No:</label>
              <input
                type="text"
                placeholder=" Room No.."
                value={contractInfo.room_number || ''}
                style={commonInputaStyle}

              />
            </div>

            <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
              <label style={commonLabelStyles}>Room Address:</label>
              <input
                type="text"
                placeholder=" Room Address.."
                value={contractInfo.room_address || ''}
                style={commonInputaStyle}

              />
            </div>

            <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
              <label style={commonLabelStyles}>Name-Surname:</label>
              <input
                type="text"
                placeholder=" Name-Surname.."
                value={contractInfo.tenant_name || ''}
                style={commonInputaStyle}

              />
            </div>
            {/* <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
              <label style={commonLabelStyles}>Passport/ID:</label>
              <input
                type="text"
                placeholder=" Passport/ID.."
                value={contractInfo.tenant_name || ''}
                style={commonInputaStyle}

              />
            </div> */}
            <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
              <label style={commonLabelStyles}>Start Rental Date:</label>
              <input
                type="text"
                placeholder=" Start Rental Date.."
                value={(contractInfo?.start_contract_date?.split(' ')[0]) ?? ''}
                style={commonInputaStyle}
              />

            </div>
            <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
              <label style={commonLabelStyles}>End Rental Date:</label>
              <input
                type="text"
                placeholder=" End Rental Date.."
                value={(contractInfo?.end_contract_date?.split(' ')[0]) ?? ''}
                style={commonInputaStyle}
              />

            </div>
            <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
              <label style={commonLabelStyles}>Rental:</label>
              <input
                type="text"
                placeholder=" Rental.."
                value={contractInfo.rental || ''}
                style={commonInputaStyle}

              />
            </div>
            <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
              <label style={commonLabelStyles}>Deposit:</label>
              <input
                type="text"
                placeholder=" Deposit.."
                value={contractInfo.deposit || ''}
                style={commonInputaStyle}
              />
            </div>
            <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
              <label style={commonLabelStyles}>Check-in Date:</label>
              <input
                type="text"
                placeholder=" Check-in Date.."
                value={(contractInfo?.check_in_date?.split(' ')[0]) ?? ''}
                style={commonInputaStyle}
              />
            </div>
            <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
              <label style={commonLabelStyles}>Water Usage Check-in:</label>
              <input
                type="text"
                placeholder=" Water Usage Check-in.."
                value={contractInfo.check_in_water_number || ''}
                style={commonInputaStyle}
              />

            </div>
            <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
              <label style={commonLabelStyles}>Electric Usage Check-in:</label>
              <input
                type="text"
                placeholder=" Electric Usage Check-in.."
                value={contractInfo.check_in_electric_number || ''}
                style={commonInputaStyle}
              />
            </div>

            <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
              <label style={{
                display: 'block',
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Kanit',
                color: '#A91B0D'
              }}>Water Usage Check-out:</label>
              <input
                type="text"
                placeholder=" Water Usage Check-out.."
                value={contractInfo.check_out_water_number || ''}
                style={commonInputaStyle}
              />
            </div>
            <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
              <label style={{
                display: 'block',
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Kanit',
                color: '#A91B0D'
              }}>Electric Usage Check-out:</label>
              <input
                type="text"
                placeholder=" Electric Usage Check-out.."
                value={contractInfo.check_out_electric_number || ''}
                style={commonInputaStyle}
              />
            </div>
            <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
              <label style={{
                display: 'block',
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Kanit',
                color: '#A91B0D'
              }}>End Contract Date:</label>
              <input
                type="text"
                placeholder=" End Contract Date.."
                value={(contractInfo?.check_out_date?.split(' ')[0]) ?? ''}
                style={commonInputaStyle}
              />

            </div>


          </div>
        </div>
      </div>

    </>
  );
}


