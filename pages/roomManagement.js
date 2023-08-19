import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar.js';
import RoomTable from '../components/RoomTables.js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { fetchPlaces } from '../API/api.js';
import RoomEdit from '../pages/roomEdit.js';  

export default function RoomManagement() {
  const router = useRouter();
  const [buildingName, setBuildingName] = useState('');
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [isAddFloorModalOpen, setIsAddFloorModalOpen] = useState(false);
  const [sRoomTable, setRoomTable] = useState({});
  const [placeId, setPlaceId] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  {buildingName && (
    <>
      <RoomEdit buildingName={buildingName} />
    </>
  )}
  
  

  

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
    }, [router.query.buildingName, router.query.placeId]);


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
    
    

  const handleAddRoomClick = () => {
    setIsAddRoomModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddRoomModalOpen(false);
  };

  const handleAddRoom = (roomData) => {
    // Handle the logic for adding the room
    // You can use roomData and update the rooms state or API
    setIsAddRoomModalOpen(false); // Close the modal after adding
  };
  
  const handleAddFloorClick = () => {
    setIsAddFloorModalOpen(true);
  };
  
  const handleAddFloor = (floorData) => {
    // Handle the logic for adding the floor
    // You can use floorData and update the floors state or API
    setIsAddFloorModalOpen(false); // Close the modal after adding
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
              <button onClick={handleAddRoomClick} style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px'}}>Add Room</button>
              <button onClick ={handleAddFloorClick} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px'}}>Add Floor</button>
            </div>
          </div>
          
          <p style={{ fontSize: '20px', color: '#666' }}>
  {"Building " + buildingName || "Your custom text here"}
</p>
<hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px' , }} />
{roomsToDisplay && roomsToDisplay.map((floor) => (
  <div key={floor.floor_id}>
    <h3>Floor {floor.floor_number}</h3>
    {floor.rooms && <RoomTable rooms={floor.rooms} />}
  </div>
))}


        </div>
      </div>
      {isAddRoomModalOpen && (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
    <div style={{ backgroundColor: 'white', width: '400px', padding: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '10px', fontFamily: 'Kanit, sans-serif',}}>
      <h2>Add Room</h2>
      {/* Add your form fields here */}
      <label htmlFor="owner">Owner:</label>
      <input 
        id="owner" 
        type="text" 
        placeholder="Owner's Name.." 
        style={{ 
          fontFamily: 'Kanit, sans-serif', 
          color: 'black', 
          backgroundColor: 'white', 
          outline: 'none', 
          border: '1px solid #ccc',
          width: '98%',
          marginBottom: '5px',
          borderRadius: '5px',
          height: '26px',
          marginTop: '5px'
        }} 
      />
      <select
        id="floorSelect"
        value={selectedFloor}
        onChange={(e) => setSelectedFloor(e.target.value)}
        style={{ margin: '10px 0', padding: '5px', width: '100%', fontFamily: 'Kanit', outline: 'none',border: '1px solid #ccc', borderRadius: '5px' }}
      >
        {roomsToDisplay.map((floor) => (
          <option key={floor.floor_id} value={floor.floor_id}>
            Floor {floor.floor_number}
          </option>
        ))}
      </select>
      {/* Add your other form fields for the room's details here */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px', }}>
  <button onClick={handleCloseModal} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', borderRadius: '5px', border: 'none', marginRight: '10px', marginLeft: '5px', width: '60px' }}>Close</button>
  <button onClick={handleAddRoom} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px', color: 'white', width: '60px' }}>Add</button>
</div>

    </div>
  </div>
)}

{isAddFloorModalOpen && (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
    <div style={{ backgroundColor: 'white', width: '400px', padding: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '10px', fontFamily: 'Kanit, sans-serif',}}>
      <h2>Add Floor</h2>
      <label htmlFor="floor">Floor:</label>
      <input 
        id="floor" 
        type="text" 
        placeholder="Floor's Name.." 
        style={{ 
          fontFamily: 'Kanit, sans-serif', 
          color: 'black', 
          backgroundColor: 'white', 
          outline: 'none', 
          border: '1px solid #ccc',
          width: '98%',
          marginBottom: '5px',
          borderRadius: '5px',
          height: '26px',
          marginTop: '5px'
        }} 
      />
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
        <button onClick={() => setIsAddFloorModalOpen(false)} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', borderRadius: '5px', border: 'none', marginRight: '10px', marginLeft: '0px', width: '60px' }}>Close</button>
        <button onClick={handleAddFloor} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px', color: 'white', width: '60px' }}>Add</button>
      </div>
    </div>
  </div>
)}




    </>
  );
}