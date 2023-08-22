import axios from 'axios';

const BASE_URL = 'https://www.pattayaavenueproperty.xyz/api/rooms/places'; //www.pattayaavenueproperty.xyz/api/rooms/places
const BUILDING_URL = 'http://146.190.98.250:8080/api/rooms';
const ROOM_URL = 'http://146.190.98.250:8080/api/rooms/room';
const FLOOR_URL = 'http://146.190.98.250:8080/api/rooms/floor';

// Set NODE_TLS_REJECT_UNAUTHORIZED to 0 to temporarily disable SSL certificate validation
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export const fetchPlaces = async () => {
  try {
    console.log(BASE_URL);
    const response = await axios.get(BASE_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
};

export const createPlace = async (input) => {
  try {
    const response = await axios.post(`${BASE_URL}/${input}`);
    return response.data;
  } catch (error) {
    console.error('Error creating place:', error);
  }
};

export const createBuilding = async (buildingData) => {
  try {
    const response = await axios.post(`${BUILDING_URL}/building`, buildingData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200
      console.error('Server responded with error:', error.response.data, error.response.status);
    } else if (error.request) {
      // Request was made, but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something else went wrong
      console.error('Error creating building:', error.message);
    }
    throw error; // Re-throw the error if you want to handle it later
  }
};

export const addRoom = async (roomData) => {
  try {
    const response = await axios.post(ROOM_URL, roomData); // ROOM_URL = 'http://146.190.98.250:8080/api/rooms/room'
    return response.data;
  } catch (error) {
    console.error('Error adding room:', error);
    throw error;
  }
};

export const addFloor = async (floorData) => {
  try {
    const response = await axios.post(FLOOR_URL, floorData);
    return response.data;
  } catch (error) {
    console.error('Error adding floor:', error);
    throw error;
  }
};


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

