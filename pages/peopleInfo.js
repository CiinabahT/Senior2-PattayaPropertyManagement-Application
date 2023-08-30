import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PeopleInfoContactTable from '../components/PeopleInfoContactTable.js';
import { getPeoplebyId, editPersonAndBankInfo, getContactPeople, DeletePeopleContact, AddPeopleContact } from '../API/api.js';

export default function PeopleInfo() {
  const router = useRouter();
  const [isAddContactModalOpen, setIsContactModalOpen] = useState(false);
  const [personInfo, setPersonInfo] = useState({});
  const [apiData, setApiData] = useState(null);
  const [people, setpeople] = useState([]);
  const { PersonId } = router.query;
  const [editablePersonInfo, setEditablePersonInfo] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [records, setRecords] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [selectedContactType, setSelectedContactType] = useState('');
  const [contactInfo, setContactInfo] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [showContactMethodWarning, setShowContactMethodWarning] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPeoplebyId(PersonId);
        setPersonInfo(data);
        setEditablePersonInfo(data); // Set the editable info after successfully fetching data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [PersonId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContactPeople(PersonId);
        console.log("Fetched Data:", data); // debug line
        setRecords(data);
        console.log("State records:", records); // debug line
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [PersonId]);


  const handleEditableInputChange = (e, field) => {
    setEditablePersonInfo({
      ...editablePersonInfo,
      [field]: e.target.value,
    });
  };


  useEffect(() => {

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);




  const handleSave = async () => {
    const PersonInfo = {
      person_id: parseInt(PersonId),
      full_name: editablePersonInfo.full_name,
      identity_number: editablePersonInfo.identity_number,
    };
    const BankInfo = {
      id: parseInt(editablePersonInfo.bank_accounts.id),
      bank_name: editablePersonInfo.bank_accounts.bank_name,
      bank_address: editablePersonInfo.bank_accounts.bank_address,
      account_name: editablePersonInfo.bank_accounts.account_name,
      account_number: editablePersonInfo.bank_accounts.account_number,
      swift_code: editablePersonInfo.bank_accounts.swift_code,
    };

    try {
      const response = await editPersonAndBankInfo(PersonInfo, BankInfo);
      console.log("API Response for Person: ", response.personResponse);
      console.log("API Response for Bank: ", response.bankResponse);

      if (
        (response.personResponse && response.personResponse.statusCode === 200) ||
        (response.bankResponse && response.bankResponse.statusCode === 200)
      ) {
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000);
      }

    } catch (error) {
      console.error("Error: ", error);
    }
  };





  const handleDelete = async () => {
    try {
      const response = await DeletePeopleContact(selectedContact);
      console.log('Contact deleted:', response);

      // Refresh the records after a successful delete operation
      const data = await getContactPeople(PersonId);
      setRecords(data);

      // Close the delete modal
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Failed to delete contact:', error);
    }
  };


  const handleAddContactClick = (info) => {
    setIsContactModalOpen(true)
    console.log(info);
  };

  const handleAddContact = async () => {
    let valid = true;

    if (selectedContactType === '') {
      setShowContactMethodWarning(true);
      valid = false;
    }
  
    if (!contactInfo) {
      setShowWarning(true);
      valid = false;
    }
  
    if (!valid) return;

    const ContactInfo = {
      person_id: parseInt(PersonId, 10),
      type_contact: selectedContactType,
      value_contact: contactInfo
    };

    try {
      const response = await AddPeopleContact(ContactInfo);
      console.log('Contact added:', response);

      // Refresh the records after a successful add operation
      const data = await getContactPeople(PersonId);
      setRecords(data);

      setSelectedContactType('');
      setContactInfo('');
      setShowWarning(false);
      setIsContactModalOpen(false);
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  const handleClose = () => {
    setIsContactModalOpen(false);
    setSelectedContactType('');
    setContactInfo('');
    setShowWarning(false);
    setShowContactMethodWarning(false);
  };


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

  const commonBankStyle = {
    padding: '8px',
    margin: '5px 0',
    border: '1px solid #ccc',
    width: '187px',
    fontFamily: 'Kanit',
    outline: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    marginRight: '30px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: 'black',
    backgroundColor: 'white',
  };

  const commonBankLabelStyles = {
    display: 'block',
    fontSize: '20px',
    fontWeight: 'bold',
    fontFamily: 'Kanit'
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
                onClick={() => handleSave()}
              >
                Save Data
              </button>
            </div>
          </div>
          <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginBottom: '40px', marginTop: '10px' }} />
          <div style={{ width: '100%' }}>

            <div><label style={commonLabelStyles}>Name-Surname:</label></div>
            <input type="text" value={editablePersonInfo.full_name || ''} placeholder='Name - Surname..' onChange={(e) => handleEditableInputChange(e, 'full_name')} style={commonInputaStyle} />

            <div><label style={commonLabelStyles}>Passport/ID:</label></div>
            <input type="text" value={editablePersonInfo.identity_number || ''} placeholder='Passport/ID..' onChange={(e) => handleEditableInputChange(e, 'identity_number')} style={commonInputaStyle} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{display: 'block', fontSize: '25px',fontWeight: 'bold',fontFamily: 'Kanit', marginTop: '30px'}}>Contact:</label>
              <button
                style={{
                  fontSize: '13px',
                  fontFamily: 'Kanit, sans-serif',
                  backgroundColor: '#A91B0D',
                  color: 'white',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer',
                  marginRight: '9px',
                  width: '120px',
                  height: '35px'
                }}
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Contact
              </button>
            </div>

            <PeopleInfoContactTable records={records} />


            <h2><label style={{display: 'block', fontSize: '25px',fontWeight: 'bold',fontFamily: 'Kanit'}}>Bank Account: </label></h2>
            {personInfo.bank_accounts ? (
              <div style={{ display: 'flex', flex: '0 0 25%' }}>
                <div>
                  <div><label style={commonBankLabelStyles}>Bank Name: </label></div>
                  <input
                    type="text"
                    value={editablePersonInfo.bank_accounts.bank_name || ''}
                    placeholder="Bank Name.."
                    style={commonBankStyle}
                    onChange={e => setEditablePersonInfo({
                      ...editablePersonInfo,
                      bank_accounts: {
                        ...editablePersonInfo.bank_accounts,
                        bank_name: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <div><label style={commonBankLabelStyles}>Bank Address: </label></div>
                  <input
                    type="text"
                    value={editablePersonInfo.bank_accounts.bank_address || ''}
                    placeholder="Bank Address.."
                    style={commonBankStyle}
                    onChange={e => setEditablePersonInfo({
                      ...editablePersonInfo,
                      bank_accounts: {
                        ...editablePersonInfo.bank_accounts,
                        bank_address: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <div><label style={commonBankLabelStyles}>Account Name: </label></div>
                  <input
                    type="text"
                    value={editablePersonInfo.bank_accounts.account_name || ''}
                    placeholder="Account Name.."
                    style={commonBankStyle}
                    onChange={e => setEditablePersonInfo({
                      ...editablePersonInfo,
                      bank_accounts: {
                        ...editablePersonInfo.bank_accounts,
                        account_name: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <div><label style={commonBankLabelStyles}>Account No: </label></div>
                  <input
                    type="text"
                    value={editablePersonInfo.bank_accounts.account_number || ''}
                    placeholder="Account No.."
                    style={commonBankStyle}
                    onChange={e => setEditablePersonInfo({
                      ...editablePersonInfo,
                      bank_accounts: {
                        ...editablePersonInfo.bank_accounts,
                        account_number: e.target.value
                      }
                    })}
                  />
                </div>
                <div>
                  <div><label style={commonBankLabelStyles}>Swift Code: </label></div>
                  <input
                    type="text"
                    value={editablePersonInfo.bank_accounts.swift_code || ''}
                    placeholder="Swift Code.."
                    style={commonBankStyle}
                    onChange={e => setEditablePersonInfo({
                      ...editablePersonInfo,
                      bank_accounts: {
                        ...editablePersonInfo.bank_accounts,
                        swift_code: e.target.value
                      }
                    })}
                  />
                </div>
              </div>
            ) : null}


          </div>

          <div style={{ width: '100%', height: '500px' }}>
          </div>
        </div>
      </div>

      {isAddContactModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '10px', fontFamily: 'Kanit, sans-serif', }}>
            <h2>Add Contact</h2>
            <div><label>Contact: </label></div>
            <select
              value={selectedContactType}
              onChange={e => {
                setSelectedContactType(e.target.value);
                if (e.target.value !== '') {
                  setShowContactMethodWarning(false);
                }
              }}
              style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', width: '230px', }}>
              {selectedContactType === '' && <option value="" hidden>Select the Contact Method</option>}
              <option value="Line">Line</option>
              <option value="Facebook">Facebook</option>
              <option value="WeChat">WeChat</option>
              <option value="Tel">Tel</option>
              <option value="Weibo">Weibo</option>
              <option value="Email">Email</option>
              <option value="Skype">Skype</option>
            </select>
            {showContactMethodWarning && <div style={{color: 'red'}}>*Please Select the Contact Method</div>}


            <div><label htmlFor="passport-id">Contact Info: </label></div>
            <input id="passport-id" type="text" placeholder="Contact Info.." onChange={e => { setContactInfo(e.target.value); setShowWarning(false); }} style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px', border: '1px solid #ccc', width: '372px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px' }} />
            {showWarning && <div style={{ color: 'red' }}>*Please Fill the Contact Info</div>}
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
              <button onClick={handleClose} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', borderRadius: '5px', border: 'none', marginRight: '10px', marginLeft: '0px', width: '60px' }}>Close</button>
              <button onClick={handleAddContact} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px', color: 'white', width: '60px' }}>Add</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // this line centers the inner div horizontally
          zIndex: 999  // make sure it's less than the inner div
        }}>
          <div style={{
            backgroundColor: '#fff',
            fontFamily: 'Kanit',
            fontSize: '20px',
            padding: '20px',
            borderRadius: '5px',  // this line sets the border radius
            zIndex: 1000,  // make sure it's higher than the outer div
            display: 'flex', // display the image and text in a row
            alignItems: 'center', // vertically align the image and text
          }}>
            <img
              src="RightCheck.png" // Update with the actual path to your image
              alt="Right Check"
              style={{ width: '22px', height: '22px', marginRight: '10px' }} // Add some spacing between image and text
            />
            Save Successful
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            width: '400px',
            textAlign: 'left',  // Aligned text to the left
            fontFamily: 'Kanit, sans-serif'  // Font family set to Kanit
          }}>
            <h2 style={{ fontFamily: 'Kanit, sans-serif' }}>Delete Contact</h2>
            <div>
              <div><span style={{ fontFamily: 'Kanit, sans-serif' }}>Contact: </span></div>
              <select
                onChange={e => setSelectedContact(e.target.value)}
                style={{ width: '80%', fontFamily: 'Kanit, sans-serif', outline: 'none', border: 'none', borderRadius: '5px', height: '30px' }}
              >
                {records.map(record => (
                  <option key={record.id} value={record.id} style={{ fontFamily: 'Kanit, sans-serif' }}>
                    {record.value} ({record.type})
                  </option>
                ))}
              </select>

            </div>
            <div style={{ marginTop: '20px' }}>
              <button onClick={() => setShowDeleteModal(false)} style={{
                padding: '10px',
                marginRight: '10px',
                backgroundColor: 'grey',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                width: '60px',
                fontFamily: 'Kanit, sans-serif'  // Font family set to Kanit
              }}>Close</button>

              <button onClick={handleDelete} style={{
                padding: '10px',
                backgroundColor: '#A91B0D',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontFamily: 'Kanit, sans-serif',
                width: '70px'
              }}>Delete</button>
            </div>
          </div>
        </div>
      )}





    </>
  );
}