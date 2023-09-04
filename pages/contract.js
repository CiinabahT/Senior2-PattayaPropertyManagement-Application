import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import Select from 'react-select';
import ContractTable from '../components/ContactTable.js';
import { useRouter } from 'next/router';
import { fetchContract, fetchPeople, fetchAllRoomName } from '../API/api.js';



export default function Contract() {
  const [isAddContractModalOpen, setIsAddContractModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEndContractModal, setShowEndContractModal] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null)
  const [checkoutDate, setCheckoutDate] = useState('');
  const [waterNumber, setWaterNumber] = useState('');
  const [electricNumber, setElectricNumber] = useState('');

  const [isValidContract, setIsValidContract] = useState(true);
  const [isValidWaterNumber, setIsValidWaterNumber] = useState(true);
  const [isValidElectricNumber, setIsValidElectricNumber] = useState(true);
  const [isValidCheckoutDate, setIsValidCheckoutDate] = useState(true);

  const [selectRoomID, setSelectRoomID] = useState(null);
  const [selectPersonID, setSelectPersonID] = useState(null);
  const [startContractDate, setStartContractDate] = useState(null);
  const [endContractDate, setEndContractDate] = useState(null);
  const [rental, setRental] = useState(null);
  const [deposit, setDeposit] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkInWaterNumber, setCheckInWaterNumber] = useState(null);
  const [checkInElectricNumber, setCheckInElectricNumber] = useState(null);

  const [persons, setPersons] = useState([]);
  const [personOptions, setPersonOptions] = useState([]);

  const [rooms, setRooms] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);

  const [nameValid, setNameValid] = useState(true);
  const [roomValid, setRoomValid] = useState(true);
  const [startRentValid, setStartRentValid] = useState(true);
  const [endRentValid, setEndRentValid] = useState(true);
  const [rentalPriceValid, setRentalValid] = useState(true);
  const [depositValid, setDepositValid] = useState(true);
  const [waterUsageValid, setWaterUsageValid] = useState(true);
  const [electricValid, setElectricValid] = useState(true);
  const [checkinValid, setCheckinValid] = useState(true);
  

  const [records, setRecords] = useState([]);

  const router = useRouter();

  const validateForms = () => {
    let isValid = true;

    if (!selectPersonID) {
      setNameValid(false);
      isValid = false;
    } else {
      setNameValid(true);
    }

    if (!selectRoomID) {
      setRoomValid(false);
      isValid = false;
    } else {
      setRoomValid(true);
    }
    if (!startContractDate) {
      setStartRentValid(false);
      isValid = false;
    } else {
      setStartRentValid(true);
    }

    if (!endContractDate) {
      setEndRentValid(false);
      isValid = false;
    } else {
      setEndRentValid(true);
    }

    if (!rental) {
      setRentalValid(false);
      isValid = false;
    } else {
      setRentalValid(true);
    }

    if (!deposit) {
      setDepositValid(false);
      isValid = false;
    } else {
      setDepositValid(true);
    }

    if (!checkInWaterNumber) {
      setWaterUsageValid(false);
      isValid = false;
    } else {
      setWaterUsageValid(true);
    }

    if (!checkInElectricNumber) {
      setElectricValid(false);
      isValid = false;
    } else {
      setElectricValid(true);
    }

    if (!checkInDate) {
      setCheckinValid(false);
      isValid = false;
    } else {
      setCheckinValid(true);
    }

    return isValid;
  };

  const resetValidationStates = () => {
    setNameValid(true);
    setRoomValid(true);
    setStartRentValid(true);
    setEndRentValid(true);
    setRentalValid(true);
    setDepositValid(true);
    setWaterUsageValid(true);
    setElectricValid(true);
    setCheckinValid(true);
  };


  const handleCloseModal = () => {
    setIsAddContractModalOpen(false);
    resetValidationStates();
    resetForm();

  };
  const handleEndCloseModal = () => {
    setShowEndContractModal(false);
    // Reset the states to their initial values
    setSelectedContract('');
    setCheckoutDate('');
    setWaterNumber('');
    setElectricNumber('');

    setSelectedContract("");
    setWaterNumber("");
    setElectricNumber("");
    setCheckoutDate("");

    setIsValidContract(true);
    setIsValidWaterNumber(true);
    setIsValidElectricNumber(true);
    setIsValidCheckoutDate(true);
  };

  const handleNameChange = (option) => {
    setSelectPersonID(option);
    if (option) {
      setNameValid(true);
    }
  };

  const handleRoomChange = (option) => {
    setSelectRoomID(option);
    if (option) {
      setRoomValid(true);
    }
  };


  //////PERSON DROPDOWN DATA

  const fetchPersonData = async () => {
    setLoading(true);
    try {
      const data = await fetchPeople();
      setPersons(data);
      setLoading(false);

    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (persons) {
      const options = persons.map(person => ({
        value: person.id,
        label: person.full_name
      }));
  
      setPersonOptions(options);
    }
  }, [persons]);
  

  useEffect(() => {
    fetchPersonData();
  }, []);

  //////////ROOM DROPDOWN DATA

  const fetchRoomData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllRoomName();
      setRooms(data);
      setLoading(false);

    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rooms) {
      const options = rooms.map(room => ({
        value: room.room_id,
        label: room.room_address
      }));
  
      setRoomOptions(options);
    }
  }, [rooms]);
  
  useEffect(() => {
    fetchRoomData();
  }, []);

  //////////////////////////////////////////

  const validateForm = () => {
    if (
      selectPersonID &&
      selectRoomID &&
      startContractDate &&
      endContractDate &&
      rental &&
      deposit &&
      checkInDate &&
      checkInWaterNumber &&
      checkInElectricNumber
    ) {
      return true;
    }
    return false;
  };

  const resetForm = () => {
    setSelectPersonID(null);
    setSelectRoomID(null);
    setStartContractDate(null);
    setEndContractDate(null);
    setRental(null);
    setDeposit(null);
    setCheckInDate(null);
    setCheckInWaterNumber(null);
    setCheckInElectricNumber(null);
  };







  // const handleDelete = async () => {
  // try {
  //   const response = await DeletePeopleContact(selectedContact);
  //   console.log('Contact deleted:', response);

  //   // Refresh the records after a successful delete operation
  //   const data = await getContactPeople(PersonId);
  //   setRecords(data);

  //   // Close the delete modal
  //   setShowDeleteModal(false);
  // } catch (error) {
  //   console.error('Failed to delete contact:', error);
  // }
  // };

  const handleAddModal = async () => {
    if (validateForms()) {
      setIsAddContractModalOpen(false);
      try {
        const response = await fetch("https://pattayaavenueproperty.xyz/api/contracts/createcontracts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            room_id: selectRoomID?.value,
            person_id: selectPersonID?.value,
            person_contract_type: "Tenant",
            start_contract_date: startContractDate,
            end_contract_date: endContractDate,
            rental: parseFloat(rental),
            deposit: parseFloat(deposit),
            check_in_date: checkInDate,
            check_in_water_number: parseInt(checkInWaterNumber),
            check_in_electric_number: parseInt(checkInElectricNumber),
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Successfully added contract:", data);
          // TODO: Add your success handling logic here
        } else {
          console.log("Failed to add contract:", response.status, response.statusText);
          // TODO: Add your error handling logic here
        }
      } catch (error) {
        console.error("An error occurred:", error);
        // TODO: Add your error handling logic here
      }
      console.log("to refreash page")
      // router.push({
      //   pathname: '/contract'
      // });
      // router.push('/contract');
      window.location.reload();
      resetForm();
      resetValidationStates();
    }
  };
  const contractOptions = useMemo(() => {
    if (records && records.length > 0) {
      return records
        .filter(record => record.contract_status === 'active')
        .map(record => ({
          value: record.id,
          label: `${record.tenant_name} (${record.room_address})`
        }));
    } else {
      return [];
    }
  }, [records]);


  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchContract();
      if (data !== null) {
        setRecords(data);
      }
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEndContract = async () => {
    let isFormValid = true;

    // Validate each field
    if (!selectedContract) {
      setIsValidContract(false);
      isFormValid = false;
    }

    if (!waterNumber) {
      setIsValidWaterNumber(false);
      isFormValid = false;
    }

    if (!electricNumber) {
      setIsValidElectricNumber(false);
      isFormValid = false;
    }

    if (!checkoutDate) {
      setIsValidCheckoutDate(false);
      isFormValid = false;
    }

    if (!isFormValid) {
      return;
    }
    try {
      const response = await fetch('https://pattayaavenueproperty.xyz/api/contracts/closecontracts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if necessary
        },
        body: JSON.stringify({
          room_contract_id: parseInt(selectedContract),
          check_out_date: checkoutDate,
          check_out_water_number: Number(waterNumber),
          check_out_electric_number: Number(electricNumber),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setShowEndContractModal(false);
        // Reset the states to their initial values
        setSelectedContract('');
        setCheckoutDate('');
        setWaterNumber('');
        setElectricNumber('');

        setSelectedContract("");
        setWaterNumber("");
        setElectricNumber("");
        setCheckoutDate("");

        setIsValidContract(true);
        setIsValidWaterNumber(true);
        setIsValidElectricNumber(true);
        setIsValidCheckoutDate(true);

        fetchData()
      } else {
        // Handle error
        console.error('Failed to end contract.');
      }
    } catch (error) {
      console.error('There was an error ending the contract.', error);
    }
  };

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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={{ fontSize: '35px', fontFamily: 'Kanit, sans-serif', marginLeft: '10px' }}>Contract</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>

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
                  width: '120px',
                  height: '45px',
                  marginRight: '7px' // You already had marginRight here
                }}
                onClick={() => setIsAddContractModalOpen(true)}
              >
                Add Contract
              </button>
              <button
                style={{
                  fontSize: '15px',
                  fontFamily: 'Kanit, sans-serif',
                  backgroundColor: '#A91B0D',  // background color for 'End Contract'
                  color: 'white',
                  borderRadius: '5px',
                  padding: '10px 15px',
                  border: 'none',
                  cursor: 'pointer',
                  width: '120px',
                  height: '45px',
                  marginLeft: '7px' // Added marginLeft to match the marginRight of the other button
                }}
                // You'll need to handle what happens when this button is clicked
                onClick={() => setShowEndContractModal(true)}
              >
                End Contract
              </button>
            </div>
          </div>
          <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginBottom: '40px', marginTop: '10px' }} />
          <div style={{ width: '100%', height: '500px' }}>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!isLoading && !error && <ContractTable records={records} />}
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
            <h2>Add Contract</h2>
            <div style={{ color: 'red', marginBottom: '15px' }}>* Warning * The data that Created can not be deleted</div>
            <div><label>Contractor Name: </label></div>
            <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '20px', fontWeight: 'bold', marginTop: '5px', }}>
              <Select
                options={personOptions}
                value={selectPersonID}
                onChange={handleNameChange}
                isSearchable={true}
                placeholder="Select Person"
                styles={{ container: (provided) => ({ ...provided, width: '387px', fontSize: '13px' }) }}
              />
            </div>
            {!nameValid && <div style={{ color: 'red' }}>*Please Fill Contractor name</div>}
            {/* <div><label>Passport/ID: </label></div>
            <input id="name-surname" type="text" placeholder="Passport/ID.." style={commonInputStyle} /> */}
            <div><label>Room Number: </label></div>
            <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '20px', fontWeight: 'bold', marginTop: '5px', }}>
              <Select
                options={roomOptions}
                value={selectRoomID}
                onChange={handleRoomChange}
                isSearchable={true}
                placeholder="Select Room"
                styles={{ container: (provided) => ({ ...provided, width: '387px', fontSize: '13px' }) }}
              />
            </div>
            {!roomValid && <div style={{ color: 'red' }}>*Please fill Room Number</div>}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <label htmlFor="start-rental-date">Start Rental Date: </label>
                <input
                  id="start_contract_date"
                  type="date"
                  placeholder="Start Rental Date.."
                  style={secondInputStyle}
                  onChange={e => {
                    setStartContractDate(e.target.value);
                    setStartRentValid(true);  // This line sets the field as valid
                  }}

                />
                {!startRentValid && <div style={{ color: 'red' }}>*Please fill Date</div>}
              </div>
              <div>
                <label htmlFor="end-rental-date">End Rental Date: </label>
                <input
                  id="end_contract_date"
                  type="date"
                  placeholder="End Rental Date.."
                  style={secondInputStyle}
                  onChange={e => {
                    setEndContractDate(e.target.value);
                    setEndRentValid(true);  // This line sets the field as valid
                  }}
                />
                {!endRentValid && <div style={{ color: 'red' }}>*Please fill Date</div>}
              </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <label htmlFor="start-rental-date">Rental Price: </label>
                <input
                  id="rental"
                  type="text"
                  placeholder="Rental Price.."
                  style={{ padding: '8px', margin: '5px 0', border: '1px solid #ccc', width: '167px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px', marginRight: '-26px' }}
                  onChange={e => {
                    setRental(e.target.value);
                    setRentalValid(true);  // This line sets the field as valid
                  }}
                />
                {!rentalPriceValid && <div style={{ color: 'red' }}>*Please fill Rental</div>}
              </div>
              <div>
                <label>Deposit: </label>
                <input
                  id="deposit"
                  type="text"
                  placeholder="Deposit.."
                  style={secondInputStyle}
                  onChange={e => {
                    setDeposit(e.target.value);
                    setDepositValid(true);  // This line sets the field as valid
                  }}
                />
                {!depositValid && <div style={{ color: 'red' }}>*Please fill Deposit</div>}
              </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <label htmlFor="start-rental-date">Water Usage Amount: </label>
                <input
                  id="check_in_water_number"
                  type="text"
                  placeholder="Water Usage Amount.."
                  style={{ padding: '8px', margin: '5px 0', border: '1px solid #ccc', width: '167px', fontFamily: 'Kanit', outline: 'none', border: 'none', borderRadius: '5px', fontSize: '14px', marginRight: '14px' }}
                  onChange={e => {
                    setCheckInWaterNumber(e.target.value);
                    setWaterUsageValid(true);  // This line sets the field as valid
                  }}
                />
                {!waterUsageValid && <div style={{ color: 'red' }}>*Please fill Usage</div>}
              </div>
              <div>
                <label htmlFor="end-rental-date">Electric Usage Amount: </label>
                <input
                  id="check_in_electric_number"
                  type="text"
                  placeholder="Electric Usage Amount.."
                  style={secondInputStyle}
                  onChange={e => {
                    setCheckInElectricNumber(e.target.value);
                    setElectricValid(true);  // This line sets the field as valid
                  }}
                />
                {!electricValid && <div style={{ color: 'red' }}>*Please fill Usage</div>}
              </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div><label htmlFor="start-rental-date">Check-in Date: </label></div>
                <input
                  id="check_in_date"
                  type="date"
                  placeholder="Check-in Date.."
                  style={secondInputStyle}
                  onChange={e => {
                    setCheckInDate(e.target.value);
                    setCheckinValid(true);  // This line sets the field as valid
                  }}
                />
                {!checkinValid && <div style={{ color: 'red' }}>*Please fill Date</div>}
              </div>

            </div>






            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px', }}>
              <button onClick={handleCloseModal} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', borderRadius: '5px', border: 'none', marginRight: '10px', marginLeft: '1px', width: '60px' }}>Close</button>
              <button onClick={handleAddModal} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px', color: 'white', width: '60px' }}>Add</button>
            </div>
          </div>
        </div>
      )}
      {showEndContractModal && (
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
            <h2 style={{ fontFamily: 'Kanit, sans-serif' }}>End Contract</h2>
            <div>
              <div>
                <label>Contract: </label>
              </div>
              <div style={{
                marginBottom: '10px',
                flex: '0 0 21%',
                marginRight: '1%',
                fontSize: '20px',
                fontWeight: 'bold',
                marginTop: '5px',
              }}>
                <Select
                  options={contractOptions}
                  value={contractOptions.find(option => option.value === selectedContract)}
                  onChange={e => {
                    setSelectedContract(e.value);
                    setIsValidContract(true);
                  }}
                  isSearchable={true}
                  placeholder="Select Contract"
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      width: '320px',
                      fontSize: '13px'
                    })
                  }}
                />
              </div>
              {!isValidContract && <div style={{ color: 'red' }}>*You need to select a contract.</div>}



              <div>
                <div style={{ marginTop: '10px' }}>
                  <div><span style={{ fontFamily: 'Kanit, sans-serif', marginTop: '20px' }}>Check Out Water Number: </span></div>
                  <input
                    type="text"
                    value={waterNumber}
                    placeholder='Water Number..'
                    onChange={e => {
                      setWaterNumber(e.target.value);
                      setIsValidWaterNumber(true);
                    }}
                    style={{ fontFamily: 'Kanit, sans-serif', outline: 'none', border: 'none', borderRadius: '5px', height: '30px', width: '79%' }}
                  />
                </div>
                {!isValidWaterNumber && <div style={{ color: 'red' }}>*You need to fill Water Number.</div>}
              </div>

              <div>
                <div style={{ marginTop: '10px' }}>
                  <div><span style={{ fontFamily: 'Kanit, sans-serif', marginTop: '20px' }}>Check Out Electric Number: </span></div>
                  <input
                    type="text"
                    value={electricNumber}
                    placeholder='Electric Number..'
                    onChange={e => {
                      setElectricNumber(e.target.value);
                      setIsValidElectricNumber(true);
                    }}
                    style={{ fontFamily: 'Kanit, sans-serif', outline: 'none', border: 'none', borderRadius: '5px', height: '30px', width: '79%' }}
                  />
                </div>
                {!isValidElectricNumber && <div style={{ color: 'red' }}>*You need to fill Electric Number.</div>}
              </div>

              <div>
                <div style={{ marginTop: '10px' }}>
                  <div><span style={{ fontFamily: 'Kanit, sans-serif', marginTop: '20px' }}>Check Out Date: </span></div>
                  <input
                    type="date"
                    value={checkoutDate}
                    onChange={e => {
                      setCheckoutDate(e.target.value);
                      setIsValidCheckoutDate(true);
                    }}
                    style={{ fontFamily: 'Kanit, sans-serif', outline: 'none', border: 'none', borderRadius: '5px', height: '30px', width: '150px' }}
                  />
                </div>
              </div>
              {!isValidCheckoutDate && <div style={{ color: 'red' }}>*You need to Select Check Out Date.</div>}
            </div>

            <div style={{ marginTop: '20px' }}>
              <button onClick={handleEndCloseModal} style={{
                padding: '10px',
                marginRight: '10px',
                backgroundColor: 'grey',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                width: '60px',
                fontFamily: 'Kanit, sans-serif'  // Font family set to Kanit
              }}>Close</button>

              <button onClick={handleEndContract} style={{
                padding: '10px',
                backgroundColor: '#A91B0D',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontFamily: 'Kanit, sans-serif',
                width: '70px'
              }}>End</button>
            </div>
          </div>
        </div>
      )}

    </>

  );
}



