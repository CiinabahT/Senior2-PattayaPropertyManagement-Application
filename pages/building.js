import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import CustomCards from '../components/CustomCard.js';

export default function Building() {
  const router = useRouter();
  const [buildingName, setBuildingName] = useState('');
  const [buildingId, setBuildingId] = useState(null);

  useEffect(() => {
    if (router.query.buildingName) {
      setBuildingName(router.query.buildingName);
    }

    if (router.query.building_id) { // Make sure to match the name used in the URL
      setBuildingId(router.query.building_id);
    }
  }, [router.query.buildingName, router.query.building_id]); // Add building_id to the dependency

  

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
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <img src="/back(1).png" alt="Back" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => router.back()} />
            <h1 style={{ fontSize: '35px', marginLeft: '10px' }}>Building</h1>
          </div>
          <p style={{ fontSize: '20px', color: '#666' }}>{buildingName || "Your custom text here"}</p>
          <div style={{ width: '100%', height: '500px' }}>
            <CustomCards />
          </div>
        </div>
      </div>
    </>
  );
}
