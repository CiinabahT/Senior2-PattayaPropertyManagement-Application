import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import CustomCards from '../components/CustomCard.js';
import { ChangePlaceName } from '../API/api.js';

export default function Building() {
  const router = useRouter();
  const [buildingName, setBuildingName] = useState('');
  const [buildingId, setBuildingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newBuildingName, setNewBuildingName] = useState('');
  const [warning, setWarning] = useState('');

  

  useEffect(() => {
    if (router.query.buildingName) {
      setBuildingName(router.query.buildingName);
    }

    // if (router.query.building_id) {
    //   setBuildingId(router.query.building_id);
    // }

    if (router.query.placeId) {
      setBuildingId(router.query.placeId);
    }
  }, [router.query.buildingName, router.query.placeId]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewBuildingName(''); // Resetting the text box
    setWarning(''); // Resetting the warning
  };

  const handleChangeName = async () => {
    if (!newBuildingName) {
      setWarning('*Please Input the Name of the Condo');
      return;
    }
    if (buildingId && newBuildingName) {
      try {
        await ChangePlaceName(buildingId, newBuildingName);
        setBuildingName(newBuildingName); // Update the displayed building name
        
        // Update the URL to reflect the new building name
        const newRoute = `/building?placeId=${buildingId}&buildingName=${newBuildingName}`;
        router.replace(newRoute, undefined, { shallow: true });
        
        closeModal(); // Close the modal
      } catch (error) {
        console.error('Failed to change name:', error);
      }
    }
    setWarning('');
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
              <h1 style={{ fontSize: '35px', marginLeft: '10px' }}>Building</h1>
            </div>
            <button onClick={openModal} style={{ padding: '10px 20px', fontSize: '16px', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', outline: 'none', borderRadius: '5px' }}>
              Change Condo's Name
            </button>
          </div>
          <p style={{ fontSize: '20px', color: '#666' }}>{buildingName || "Your custom text here"}</p>
          <div style={{ width: '100%', height: '500px' }}>
            <CustomCards />
          </div>
        </div>
      </div>
      
      {showModal && (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '400px', textAlign: 'left', fontFamily: 'Kanit, sans-serif' }}>
      <h2>Change Condo's Name</h2>
      <div>
        <label>New Condo Name:</label>
      </div>
      <div>
        <input type="text" value={newBuildingName} placeholder={buildingName} onChange={e => setNewBuildingName(e.target.value)} style={{ width: '95%', height: '20px', padding: '5px', fontSize: '16px', fontFamily: 'Kanit, sans-serif', marginTop: '5px', backgroundColor: 'white', borderRadius: '10px', color: 'black', outline: 'none', border: '1px solid #ccc' }} />
        {warning && <div style={{ color: 'red' }}>{warning}</div>}
            </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
        <button onClick={closeModal} style={{ marginRight: '10px', outline: 'none', border: 'none', width: '60px', height: '30px', borderRadius: '5px', fontFamily: 'Kanit' }}>Close</button>
        <button onClick={handleChangeName} style={{ backgroundColor: '#326896', outline: 'none', border: 'none', width: '70px', height: '30px', borderRadius: '5px', fontFamily: 'Kanit'  }}>Change</button>
      </div>
    </div>
  </div>
)}


    </>
  );
}
