import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import RoomTable from '../components/RoomTables.js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { fetchPlaces } from '../API/api.js';
import RoomEdit from '../pages/roomEdit.js';
import { addRoom } from '../API/api.js';
import { addFloor } from '../API/api.js';
import Link from 'next/link';
import { fetchPeople } from '../API/api.js';
import Select from 'react-select';


export default function RoomManagement() {
  const router = useRouter();
  const [buildingName, setBuildingName] = useState('');
  const [buildingId, setBuildingId] = useState(null);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [isAddFloorModalOpen, setIsAddFloorModalOpen] = useState(false);
  const [sRoomTable, setRoomTable] = useState({});
  const [placeId, setPlaceId] = useState(null);
  const [floorSelectError, setFloorSelectError] = useState(false);
  const [roomNumber, setRoomNumber] = useState('');
  const [floorId, setFloorId] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [isFloorNumberEmpty, setIsFloorNumberEmpty] = useState(false);
  const [floorNumberError, setFloorNumberError] = useState('');
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [size, setSize] = useState("");
  const [roomAddress, setRoomAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const [persons, setPersons] = useState([]);

  const [personOptions, setPersonOptions] = useState([]);
  const [selectPersonID, setSelectPersonID] = useState(null);

  const [nameValid, setNameValid] = useState(true);

  const [roomNumberWarning, setRoomNumberWarning] = useState(false);
  const [roomAddressWarning, setRoomAddressWarning] = useState(false);
  const [sizeWarning, setSizeWarning] = useState(false);
  const [personWarning, setPersonWarning] = useState(false);
  const [statusWarning, setStatusWarning] = useState(false);

  const [isRoomNumberEmpty, setIsRoomNumberEmpty] = useState(false);
  const [isRoomAddressEmpty, setIsRoomAddressEmpty] = useState(false);
  const [isSizeEmpty, setIsSizeEmpty] = useState(false);
  const [isFloorIdEmpty, setIsFloorIdEmpty] = useState(false);
  const [isSelectPersonIDEmpty, setIsSelectPersonIDEmpty] = useState(false);
  const [isRoomStatusEmpty, setIsRoomStatusEmpty] = useState(false);


  const handleGlobalFilterChange = (e) => {
    setGlobalFilter(e.target.value || undefined);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value === "all" ? undefined : e.target.value);
  };

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
    fetchPersonData();
  }, []);

  useEffect(() => {
    if (persons !== null) {
      const options = persons.map(person => ({
        value: person.id,
        label: person.full_name
      }));
      setPersonOptions(options);
    }
  }, [persons]);
  

  const handleNameChange = (option) => {
    setSelectPersonID(option);
    if (option) {
      setNameValid(true);
    }
  };

  const roomStatusOptions = [
    { value: 'Sell', label: 'Sell' },
    { value: 'Rent', label: 'Rent' },
    { value: 'Sell/Rent', label: 'Sell/Rent' },
    { value: 'Returned', label: 'Returned' },
  ];



  const fetchData = async () => {
    try {
      const data = await fetchPlaces();
      setRoomTable({ data }); // Set the data into the data property of the sRoomTable object
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (router.query.buildingName !== undefined) {
      setBuildingName(decodeURIComponent(router.query.buildingName));
    }
    if (router.query.placeId !== undefined) {
      setPlaceId(Number(router.query.placeId));
    }
    if (router.query.buildingID !== undefined) {
      setBuildingId(Number(router.query.buildingID));
      console.log(buildingId)
    }
  }, [router.query.buildingName, router.query.placeId, router.query.buildingID]);




  let roomsToDisplay = [];

  if (sRoomTable.data && sRoomTable.data.length > 0) {
    const selectedPlace = sRoomTable.data.find(place => place.place_id === placeId); // Consider placeId

    if (selectedPlace) {
      const selectedBuilding = selectedPlace.Buildings.find(building => building.building_name === buildingName);

      if (selectedBuilding) {
        roomsToDisplay = selectedBuilding.floors || [];
      }
    }
  }


  const handleCloseFloorModal = () => {
    setIsAddFloorModalOpen(false);
    setFloorNumber(''); // Reset floorNumber when closing the modal
    setFloorNumberError(''); // Reset the error state when closing the modal
  };


  const resetAddFloorModal = () => {
    setIsAddFloorModalOpen(false);
    setFloorNumber(''); // Reset the floor number
    setFloorNumberError(''); // Clear the error message
  };

  const handleAddRoomClick = () => {
    setIsAddRoomModalOpen(true);
  };

  const handleCloseModal = () => {
    setRoomNumber('');
    setRoomNumberWarning(false);

    setRoomAddress('');
    setRoomAddressWarning(false);

    setSize('');
    setSizeWarning(false);

    setFloorId('');
    setFloorSelectError(false);

    setSelectPersonID(null);
    setPersonWarning(false);

    setSelectedStatus(null);
    setStatusWarning(false);

    setIsAddRoomModalOpen(false);
  };

  const handleAddRoom = () => {
    // Check if the floor has been selected
    setRoomNumberWarning(false);
    setRoomAddressWarning(false);
    setSizeWarning(false);
    setPersonWarning(false);
    setStatusWarning(false);

    // Validate each form field and set warnings if empty
    let isValid = true;

    if (!roomNumber || roomNumber === '') {
      setIsRoomNumberEmpty(true);
      setRoomNumberWarning(true);
      isValid = false;
    }
    if (!roomAddress || roomAddress === '') {
      setIsRoomAddressEmpty(true);
      setRoomAddressWarning(true);
      isValid = false;
    }
    if (!size || size === '') {
      setIsSizeEmpty(true);
      setSizeWarning(true);
      isValid = false;
    }
    if (!floorId || floorId === '') {
      setIsFloorIdEmpty(true);
      setFloorSelectError(true);
      isValid = false;
    }
    if (!selectPersonID) {
      setIsSelectPersonIDEmpty(true);
      setPersonWarning(true);
      isValid = false;
    }
    if (!selectedStatus) {
      setIsRoomStatusEmpty(true);
      setStatusWarning(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const data = {
      room_number: roomNumber,
      floor_id: parseInt(floorId),
      owner_id: selectPersonID?.value,
      size_sqm: parseFloat(size),
      room_address: roomAddress,
      status_of_room: selectedStatus?.value

    };

    addRoom(data)
      .then((newRoom) => {
        setRoomNumber('');
        setFloorId('');
        setFloorSelectError(false); // Reset the error state
        setRoomAddressWarning(false);
        setRoomNumberWarning(false);
        setSizeWarning(false);
        setPersonWarning(false);
        setStatusWarning(false);
        setIsAddRoomModalOpen(false);
        fetchData(); // Fetch the data again
      })
      .catch((error) => {
        console.error('Failed to add room:', error);
      });
  };





  const handleAddFloorClick = () => {
    setIsAddFloorModalOpen(true);
    setFloorNumber(''); // Reset floorNumber when opening the modal
    setFloorNumberError(''); // Reset the error state when opening the modal
  };



  const handleAddFloor = () => {
    // Check if the floor number has been provided
    if (!floorNumber || floorNumber === '') {
      setFloorNumberError('* Please input the floor name');
      return; // Return early if there is no floor number
    }

    console.log('router.query', router.query);
    console.log('Building ID inside handleAddFloor:', router.query.buildingID);
    console.log(buildingId);

    const floorData = {
      building_id: buildingId,
      floor_number: floorNumber,
    };

    addFloor(floorData)
      .then(() => {
        resetAddFloorModal(); // Reset the Add Floor Modal state
        fetchData(); // Fetch the data again
      })
      .catch((error) => {
        console.error('Failed to add floor:', error);
      });
    handleCloseFloorModal();
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/back(1).png" alt="Back" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => router.back()} />
              <h1 style={{ fontSize: '35px', fontFamily: 'Kanit, sans-serif', marginLeft: '10px' }}>Room Management</h1>
            </div>
            <div>
              <button onClick={handleAddRoomClick} style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px' }}>Add Room</button>
              <button onClick={handleAddFloorClick} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px' }}>Add Floor</button>
            </div>
          </div>

          <p style={{ fontSize: '20px', color: '#666' }}>
            {"Building " + buildingName || "Your custom text here"}
          </p>
          <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginBottom: '20px' }} />
          <label>Search All Room No.: </label>
          <input type="text" value={globalFilter} onChange={handleGlobalFilterChange} style={{ fontFamily: 'Kanit, sans-serif', borderRadius: '5px', outline: 'none', border: '1px solid #ccc', marginRight: '10px', backgroundColor: 'white', color: 'black' }} />
          <label>Room Status: </label>
          <select onChange={handleStatusFilterChange} style={{ fontFamily: 'Kanit, sans-serif', borderRadius: '5px', outline: 'none', border: '1px solid #ccc', backgroundColor: 'white', color: 'black' }}>
            <option value="all">All</option>
            <option value="Sell">Sell</option>
            <option value="Rent">Rent</option>
            <option value="Sell/Rent">Sell/Rent</option>
            <option value="Returned">Returned</option>
          </select>
          {roomsToDisplay && roomsToDisplay.map((floor) => (
            <div key={floor.floor_id}>
              <h3>Floor {floor.floor_number}</h3>
              {floor.rooms && <RoomTable
                globalFilter={globalFilter}
                statusFilter={statusFilter}
                rooms={floor.rooms} />}
            </div>
          ))}


        </div>
      </div>
      {isAddRoomModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', width: '400px', padding: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '10px', fontFamily: 'Kanit, sans-serif', }}>
            <h2>Add Room</h2>
            {/* Add your form fields here */}
            <label htmlFor="owner">Room Number:</label>
            <input
              id="owner"
              type="text"
              placeholder="Room's Number.."
              value={roomNumber}
              onChange={(e) => { setRoomNumber(e.target.value); setRoomNumberWarning(false); }}
              style={{
                fontFamily: 'Kanit, sans-serif',
                color: 'black',
                backgroundColor: 'white',
                outline: 'none',
                border: '1px solid #ccc',
                width: '98%',
                marginBottom: '5px',
                borderRadius: '5px',
                height: '30px',
                marginTop: '5px'
              }}
            />
            {roomNumberWarning && <p style={{ color: 'red', marginTop: '0px', fontSize: '14px' }}>* Room Number is required.</p>}


            <label htmlFor="owner">Room Address:</label>
            <input
              id="owner"
              type="text"
              placeholder="Room's Address.."
              value={roomAddress}
              onChange={(e) => { setRoomAddress(e.target.value); setRoomAddressWarning(false); }}
              style={{
                fontFamily: 'Kanit, sans-serif',
                color: 'black',
                backgroundColor: 'white',
                outline: 'none',
                border: '1px solid #ccc',
                width: '98%',
                marginBottom: '5px',
                borderRadius: '5px',
                height: '30px',
                marginTop: '5px'
              }}
            />
            {roomAddressWarning && <p style={{ color: 'red', marginTop: '0px', fontSize: '14px' }}>* Room Address is required.</p>}

            <label htmlFor="owner">Size(sqm):</label>
            <input
              id="owner"
              type="text"
              placeholder="Size(sqm).."
              value={size}
              onChange={(e) => { setSize(e.target.value); setSizeWarning(false); }}
              style={{
                fontFamily: 'Kanit, sans-serif',
                color: 'black',
                backgroundColor: 'white',
                outline: 'none',
                border: '1px solid #ccc',
                width: '98%',
                marginBottom: '5px',
                borderRadius: '5px',
                height: '30px',
                marginTop: '5px'
              }}
            />
            {sizeWarning && <p style={{ color: 'red', marginTop: '0px', fontSize: '14px', fontWeight: 'normal' }}>* Size is required.</p>}

            <div><label>Owner Name: </label></div>
            <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '20px', fontWeight: 'bold', marginTop: '5px', }}>
              <Select
                options={personOptions}
                value={selectPersonID}
                onChange={(option) => { handleNameChange(option); setPersonWarning(false); }}
                isSearchable={true}
                placeholder="Select Person"
                styles={{ container: (provided) => ({ ...provided, width: '400px', fontSize: '13px' }) }}
              />
              {personWarning && <p style={{ color: 'red', marginTop: '0px', fontSize: '14px', fontWeight: 'normal' }}>* Owner Name is required.</p>}
            </div>

            <div><label>Room Status: </label></div>
            <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '20px', fontWeight: 'bold', marginTop: '5px', }}>
              <Select
                options={roomStatusOptions}
                value={selectedStatus}
                onChange={(option) => { setSelectedStatus(option); setStatusWarning(false); }}
                placeholder="Room Status"
                styles={{ container: (provided) => ({ ...provided, width: '400px', fontSize: '13px' }) }}
              />
              {statusWarning && <p style={{ color: 'red', marginTop: '0px', fontSize: '14px', fontWeight: 'normal' }}>* Room Status is required.</p>}
            </div>
            <div><label>Floor: </label></div>
            <select
              id="floorSelect"
              value={floorId}
              onChange={(e) => {
                setFloorId(e.target.value);
                setFloorSelectError(false); // Reset the error state when a new value is selected
              }}
              style={{ margin: '10px 0', padding: '5px', width: '100%', fontFamily: 'Kanit', outline: 'none', border: '1px solid #ccc', borderRadius: '5px', marginTop: '5px' }}
            >
              <option value="">Select the Floor</option>
              {roomsToDisplay.map((floor) => (
                <option key={floor.floor_id} value={floor.floor_id}>
                  Floor {floor.floor_number}
                </option>
              ))}
            </select>
            {floorSelectError && <p style={{ color: 'red', marginTop: '-5px', marginBottom: '10px', fontSize: '14px', fontWeight: 'normal' }}>* Please select the floor</p>}


            {/* Add your other form fields for the room's details here */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px', }}>
              <button onClick={handleCloseModal} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', borderRadius: '5px', border: 'none', marginRight: '10px', marginLeft: '5px', width: '60px' }}>Close</button>
              <button onClick={handleAddRoom} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px', color: 'white', width: '60px' }}>Add</button>
            </div>

          </div>
        </div>
      )}

      {isAddFloorModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              width: '400px',
              padding: '20px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '10px',
              fontFamily: 'Kanit, sans-serif',
            }}
          >
            <h2>Add Floor</h2>
            <label htmlFor="floor">Floor:</label>
            <input
              id="floor"
              type="text"
              placeholder="Floor's Name.."
              value={floorNumber}
              onChange={(e) => {
                setFloorNumber(e.target.value);
                setFloorNumberError(''); // Reset the error state when a value is entered
              }}
              style={{
                fontFamily: 'Kanit, sans-serif',
                color: 'black',
                backgroundColor: 'white',
                outline: 'none',
                border: '1px solid #ccc',
                width: '98%',
                marginBottom: '5px',
                borderRadius: '5px',
                height: '30px',
                marginTop: '5px'
              }}
            />
            {floorNumberError && <p style={{ color: 'red', marginTop: '-5px', marginBottom: '10px' }}>{floorNumberError}</p>}
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
              <button
                onClick={handleCloseFloorModal}
                style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', borderRadius: '5px', border: 'none', marginRight: '10px', marginLeft: '0px', width: '60px' }}
              >
                Close
              </button>

              <button onClick={handleAddFloor} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px', color: 'white', width: '60px' }}>Add</button>
            </div>
          </div>
        </div>
      )}




    </>
  );
}