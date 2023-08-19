import React from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import Cards from '../components/Card.js';
import BuildingCard from '../components/Buildingcard.js';

export default function Home() {
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
          <h1 style={{ fontSize: '35px', fontFamily: 'Kanit, sans-serif' }}>Condo</h1>
          <div style={{ width: '100%', height: '500px' }}>
            <Cards />
          </div>
        </div>
      </div>
    </>
  );
}
