import React from 'react';
import NextImage from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '256px',
        height: '100%',
        background: '#484848',
        color: 'white',
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
        <NextImage src="/LogoPAP.png" alt="PAP Logo" width={150} height={80} />
      </div>

      {/* New Links */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '20px', gap: '5px', }}>
        <Link href="/home" passHref>
          <button style={buttonStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/Home.png" style={{ marginRight: '18px', width: '20px', height: '20px' }} />
              Condo
            </div>
          </button>
        </Link>
        <Link href="/finance" passHref>
          <button style={buttonStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/Finances.png" style={{ marginRight: '18px', width: '20px', height: '20px' }} />
              Finance
            </div>
          </button>
        </Link>
        <Link href="/people" passHref>
          <button style={buttonStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/Peoples.png" style={{ marginRight: '10px', width: '28px', height: '20px' }} />
              People
            </div>
          </button>
        </Link>
        <Link href="/contract" passHref>
          <button style={buttonStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/Contract.png" style={{ marginRight: '16px', width: '21px', height: '22px' }} />
              Contract
            </div>
          </button>
        </Link>
        <Link href="/financialRecord" passHref>
          <button style={buttonStyle}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/History.png" style={{ marginRight: '15px', width: '22px', height: '20px' }} />
              Financial Record
            </div>
          </button>
        </Link>
      </div>
      {/* End of New Links */}
      <div style={{ position: 'absolute', bottom: -10, width: '100%', padding: '0', }}>
        <img src="/SidebarCondo.png" alt="Condo Sidebar" style={{ width: '100%' }} />
      </div>
    </div>
  );
};

const buttonStyle = {
  fontFamily: 'Kanit, sans-serif',
  color: 'white',
  marginTop: '20px',
  fontSize: '17px',
  background: 'gray',
  border: '1px solid gray',
  borderRadius: '7px',
  width: '200px',
  padding: '10px',
  textAlign: 'left',
  // display: 'flex', // added this line
  alignItems: 'center', // added this line
  cursor: 'pointer',
  textDecoration: 'none',
};

export default Sidebar;
