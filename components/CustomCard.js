import React, { useState, useEffect } from 'react';
import { Card, Grid, Text } from '@nextui-org/react';
import CustomBuildingCards from './CustomBuildingCards.js';
// import data from '../pages/data.json';
import { useRouter } from 'next/router';
import {Spinner} from "@nextui-org/react";
import { fetchPlaces, createBuilding } from '../API/api.js'; 

export default function CustomCards({ onSaveBuildingName, onCloseModal, }) {
  const [showModal, setShowModal] = useState(false);
  const [buildingName, setBuildingName] = useState('');
  const [buildingCards, setBuildingCards] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const router = useRouter();
  const selectedBuildingName = router.query.buildingName;
  // const places = data.data;

  // const buildings = [].concat(...places.map((place) => (place.Buildings ? place.Buildings : [])));
  const [smp, setSmp] = useState({});

  const fetchData = async () => {
    try {
      const data = await fetchPlaces();
      setSmp(data);
      return { props: { places: data } };
    } catch (err) {
      console.log(err);
      return { props: { places: [] } };
    }
  };

  const postData = async (buildingData) => {
    try {
      await createBuilding(buildingData);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

useEffect(() => {
  if (typeof window !== 'undefined') {
    const savedBuildingCards = localStorage.getItem('customCardBuildingCards');
    if (savedBuildingCards) {
      setBuildingCards(JSON.parse(savedBuildingCards));
    }
  }
  fetchData();
  console.log(smp)
}, []);


  useEffect(() => {
    localStorage.setItem('customCardBuildingCards', JSON.stringify(buildingCards));
  }, [buildingCards]);

  const handlePlaceSelection = (place) => {
    setSelectedPlace(place);
  };

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleSaveBuildingName = () => {
    onSaveBuildingName(buildingName);
    setShowModal(false);
    setBuildingName('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setBuildingName('');
  };

  const handleBuildingNameChange = (event) => {
    setBuildingName(event.target.value);
  };

  const handleCreateBuildingCard = async () => {
    if (buildingName.trim() !== '') {
      const newBuildingCard = {
        key: buildingName,
        name: buildingName,
        floor: 0,
      };
  
      setBuildingCards((prevCards) => [...prevCards, newBuildingCard]);
  
      // Define the data structure as per your API's expectations
      const buildingData = {
        // Fill this with the actual fields your API expects
        building_name: buildingName,
        // ... other fields ...
      };
  
      // Post the data
      await postData(buildingData);
  
      // Fetch the updated data
      await fetchData();
  
      setShowModal(false);
      setBuildingName('');
    }
  };
  
  

  const handleDeleteBuilding = (name, floor) => {
    const filteredCards = buildingCards.filter((card) => card.key !== name);
    setBuildingCards(filteredCards);
  };

  return (
    <>
    {Object.keys(smp).length > 0 ? (
      <Grid.Container gap={0.5}>
        <Grid key="create" xs={2}>
          <Card
            variant="flat"
            bordered
            shadow={false}
            flat
            isPressable
            style={{
              width: '268px',
              height: '154px',
              padding: '5px',
              borderRadius: '30px',
              border: '2px dashed #D9D9D9',
              backgroundColor: 'white',
              boxShadow: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Kanit, Arial, sans-serif',
              fontWeight: 350,
            }}
            onClick={handleCardClick}
          >
            <Card.Header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src="Vector.png" alt="Image" style={{ maxWidth: '100%', maxHeight: '100%', marginTop: '17px' }} />
            </Card.Header>
            <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
              <Text style={{ fontFamily: 'Kanit, Arial, sans-serif', fontSize: '18px', color: 'black' }}>
                Create Building
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        {smp.map((place) => {
  if (selectedBuildingName && decodeURIComponent(selectedBuildingName) === place.place_name) {
    return (
      <div key={place.place_id} style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        {place.Buildings &&
          place.Buildings.map((building) => (
            <div key={building.building_id} style={{ flex: '0 0 auto', width: '238px', height: '162px' }}>
              <CustomBuildingCards
                placeId={place.place_id}
                buildingName={building.building_name}
                buildingId={building.building_id} // Passing the buildingId here
                onDelete={() => handleDeleteBuilding(building.building_name, building.floor)}
              />
            </div>
          ))}
      </div>
    );
  }
  return null;
})}

      </Grid.Container>
                ) : (
                  <div className="flex gap-4">
                  <Spinner size="lg" />
                  </div> 
                )}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '300px',
              height: '140px',
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: '',
            }}
          >
            <h1 style={{ fontSize: '25px', fontFamily: 'Kanit, sans-serif', marginBottom: '10px', marginTop: '10px' }}>
              Create Building
            </h1>

            <textarea
              value={buildingName}
              onChange={handleBuildingNameChange}
              placeholder="Building's Name..."
              style={{
                marginBottom: '10px',
                height: '20px',
                minHeight: '25px',
                backgroundColor: 'white',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid gray',
                resize: 'vertical',
                color: 'black',
                fontFamily: 'Kanit, Arial, sans-serif',
                fontSize: '16px',
              }}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleCreateBuildingCard}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#326896',
                  borderColor: 'none',
                  borderRadius: '5px',
                  fontFamily: 'Kanit, Arial, sans-serif',
                  outline: 'none',
                  border: 'none',
                  boxShadow: 'none',
                }}
                tabIndex={-1}
              >
                Save
              </button>
              <button
                onClick={handleCloseModal}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'gray',
                  outline: 'none',
                  border: 'none',
                  boxShadow: 'none',
                  borderColor: 'none',
                  borderRadius: '4px',
                  fontFamily: 'Kanit, Arial, sans-serif',
                }}
                tabIndex={-1}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
