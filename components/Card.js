import React, { useState, useEffect } from 'react';
import { Card, Grid, Text } from '@nextui-org/react';
import Buildingcard from './Buildingcard.js';
import {Spinner} from "@nextui-org/react";
import { fetchPlaces, createPlace } from '../API/api.js'; 
// import data from '../pages/data.json';
import axios from 'axios';

export  default function Cards({ onSaveBuildingName, onCloseModal }) {
  const [showModal, setShowModal] = useState(false);
  const [buildingName, setBuildingName] = useState('');
  const [buildingCards, setBuildingCards] = useState([]);
  const [smt, setSmt] = useState({});

  const fetchData = async () => {
    try {
      const data = await fetchPlaces();
      setSmt(data);
      return { props: { places: data } };
    } catch (err) {
      console.log(err);
      return { props: { places: [] } };
    }
  };

  const postData = async (input) => {
    try {
      await createPlace(input);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedBuildingCards = localStorage.getItem('cardBuildingCards');
      if (savedBuildingCards) {
        setBuildingCards(JSON.parse(savedBuildingCards));
      }
    }
    fetchData();
    console.log(smt)
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('cardBuildingCards', JSON.stringify(buildingCards));
  // }, [buildingCards]);

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
      
      // Post the data
      await postData(buildingName);
  
      // Fetch the updated data
      await fetchData();
  
      setShowModal(false);
      setBuildingName('');
    }
  };
  
  
  


  // const handleDeleteBuilding = (name, floor) => {
  //   const filteredCards = buildingCards.filter((card) => card.key !== name);
  //   setBuildingCards(filteredCards);
  //   // Additional code to handle deleting the card and the floor value, if needed.
  // };

  return (
    <>
    {Object.keys(smt).length > 0 ? (
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
              <img
                src="Vector.png"
                alt="Image"
                style={{ maxWidth: '100%', maxHeight: '100%', marginTop: '17px' }}
              />
            </Card.Header>
            <Card.Body
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}
            >
              <Text style={{ fontFamily: 'Kanit, Arial, sans-serif', fontSize: '18px', color: 'black' }}>
                Create Condo
              </Text>
            </Card.Body>
          </Card>
          </Grid>
          {smt.map((place) => (
    <Grid key={place.place_id} xs={2} style={{ width: '268px', height: '162px', padding: '7px' }}>
      <Buildingcard
        buildingName={place.place_name}
        onDelete={() => handleDeleteBuilding(place.place_id, place.place_name)} // adjust this method as needed
            />
          </Grid>
        ))}
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
            <h1 style={{ fontSize: '25px', fontFamily: 'Kanit, sans-serif', marginBottom: '10px', marginTop: '10px' }}>Create Condo</h1>
            
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