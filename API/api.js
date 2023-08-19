import axios from 'axios';

const BASE_URL = 'http://146.190.98.250:8080/api/rooms/places';
const BUILDING_URL = 'http://146.190.98.250:8080/api/rooms';


export const fetchPlaces = async () => {
  try {
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

