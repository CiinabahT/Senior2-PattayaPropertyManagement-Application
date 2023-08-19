import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PeopleInfoContactTable from '../components/PeopleInfoContactTable.js';

export default function PeopleInfo() {
    const router = useRouter();
    const [isAddContactModalOpen, setIsContactModalOpen] = useState(false);

    const records = [
      {
        id: 1,
        contact: 'Line',
        contactInfo: 'john',
      },
      {
        id: 2,
        contact: 'Wechat',
        contactInfo: 'smith',
      },
      {
        id: 3,
        contact: 'Facebook',
        contactInfo: 'michael',
      },
      {
        id: 4,
        contact: 'Weibo',
        contactInfo: 'emily',
      },
      {
        id: 5,
        contact: 'Shopee',
        contactInfo: 'david',
      },
    ];
    

    useEffect(() => {

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);


      const handleSaveClick = (info) => {
        // setIsDeleteModalOpen(false);
        console.log(info);
      };

      const handleAddContactClick = (info) => {
        setIsContactModalOpen(true)
        console.log(info);
      };

      const handleAddContact = (info) => {
        setIsContactModalOpen(false)
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
              <h1 style={{ fontSize: '35px', fontFamily: 'Kanit, sans-serif', marginLeft: '10px' }}>People Information</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
                  width: '130px',
                  height: '45px',
                  marginRight: '7px'
                }}
                onClick={() => handleAddContactClick()}
              >
                Add Contact
              </button>
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
                }}
                onClick={() => handleSaveClick()}
              >
                Save Data
              </button>
            </div>  
              </div>
              <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginBottom: '40px', marginTop: '10px' }} />
            <div style={{ width: '100%' }}>

                <div><label style={commonLabelStyle}>Name-Surname:</label></div>
                <input type="text" placeholder='Type of Expense..' style={commonInputStyle}/>

                <div><label style={commonLabelStyle}>Passport/ID:</label></div>
                <input type="text" placeholder='Amount of Money..' style={commonInputStyle}/>

                <div><label style={commonLabelStyle}>Contact:</label></div>
                <PeopleInfoContactTable records={records} />
                



                <h2><label style={commonLabelStyle}>Bank Account: </label></h2>
                </div>
            <div style={{ display: 'flex', flex: '0 0 25%'}}>
            <div>
            <div><label style = {{fontFamily: 'Kanit'}} htmlFor="start-rental-date">Bank Name: </label></div>
            <input id="start-rental-date" type="text" placeholder="Bank Name.." style={{ padding: '8px', margin: '5px 0', border: '1px solid #ccc', width: '187px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px', marginRight: '30px'}} />
            </div>
            <div>
            <div><label style = {{fontFamily: 'Kanit'}} htmlFor="end-rental-date">Bank Address: </label></div>
            <input id="end-rental-date" type="text" placeholder="Bank Address.." style={{ padding: '8px', margin: '5px 0', border: '1px solid #ccc', width: '187px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px', marginRight: '30px'}} />
            </div>
            <div>
            <div><label style = {{fontFamily: 'Kanit'}} htmlFor="end-rental-date">Account Name: </label></div>
            <input id="end-rental-date" type="text" placeholder="Account Name.." style={{ padding: '8px', margin: '5px 0', border: '1px solid #ccc', width: '187px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px', marginRight: '30px'}} />
            </div>
            <div>
            <div><label style = {{fontFamily: 'Kanit'}} htmlFor="end-rental-date">Account No: </label></div>
            <input id="end-rental-date" type="text" placeholder="Account No.." style={{ padding: '8px', margin: '5px 0', border: '1px solid #ccc', width: '187px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px', marginRight: '30px'}} />
            </div>
            <div>
            <div><label style = {{fontFamily: 'Kanit'}} htmlFor="end-rental-date">Swift Code: </label></div>
            <input id="end-rental-date" type="text" placeholder="Swift Code.." style={{ padding: '8px', margin: '5px 0', border: '1px solid #ccc', width: '187px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px', marginRight: '30px'}} />
            </div>
                
            </div>
                    
              <div style={{ width: '100%', height: '500px' }}>
              </div>
            </div>
          </div>

          {isAddContactModalOpen && (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
    <div style={{ backgroundColor: 'white', width: '400px', padding: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '10px', fontFamily: 'Kanit, sans-serif',}}>
      <h2>Add Contact</h2>
      <div><label>Contact: </label></div>
            <select style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', width:'200px', }}>
            <option value="Line">Line</option>
            <option value="Facebook">Facebook</option>
            <option value="WeChat">WeChat</option>
            <option value="Tel">Tel</option>
            <option value="Weibo">Weibo</option>
            <option value="Shopee">Shopee</option>
            </select>
            <div><label htmlFor="passport-id">Contact Info: </label></div>
            <input id="passport-id" type="text" placeholder="Contact Info.." style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc', width: '372px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px' }} />
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
        <button onClick={() => setIsContactModalOpen(false)} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', borderRadius: '5px', border: 'none', marginRight: '10px', marginLeft: '0px', width: '60px' }}>Close</button>
        <button onClick={handleAddContact} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px', color: 'white', width: '60px' }}>Add</button>
      </div>
    </div>
  </div>
)}


    </>
  );
}


