import axios from 'axios';

const BASE_URL = 'https://pattayaavenueproperty.xyz/api/rooms/places'; //www.pattayaavenueproperty.xyz/api/rooms/places
const BUILDING_URL = 'https://pattayaavenueproperty.xyz/api/rooms/building';
const ROOM_URL = 'https://pattayaavenueproperty.xyz/api/rooms/room';
const FLOOR_URL = 'https://pattayaavenueproperty.xyz/api/rooms/floor';
const OWNERNOBANK_URL = 'https://pattayaavenueproperty.xyz/api/persons/profiles';
const CHANGE_NAME_PLACE = 'https://pattayaavenueproperty.xyz/api/rooms/editplace';
const CONTRACT_ROOM_URL = 'https://pattayaavenueproperty.xyz/api/contracts/contracts/room';
const EDIT_ROOM = 'https://pattayaavenueproperty.xyz/api/rooms/editroom';
const PEOPLE_URL = 'https://pattayaavenueproperty.xyz/api/persons/profiles';
const CONTRACT_URL = 'https://pattayaavenueproperty.xyz/api/contracts/contracts'

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

export const fetchPeople = async () => {
  try {
    console.log(PEOPLE_URL);
    const response = await axios.get(PEOPLE_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching people:', error);
    return [];
  }
};

export const fetchContract = async () => {
  try {
    console.log(CONTRACT_URL);
    const response = await axios.get(CONTRACT_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching contract:', error);
    throw error;
  }
};


export const fetchOwner = async () => {
  try {
    console.log(OWNERNOBANK_URL);
    const response = await axios.get(OWNERNOBANK_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Owner:', error);
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

export const ChangePlaceName = async (placeid, newBuidingName) => {
  try {
    const response = await axios.post(`${CHANGE_NAME_PLACE}/${placeid}/${newBuidingName}`);
    return response.data;
  } catch (error) {
    console.error('Error creating place:', error);
  }
};

export const EditRoom = async (roomID, allRoomData) => {
  try {
    const response = await axios.post(`${EDIT_ROOM}/${roomID}`, allRoomData);
    return response.data;
  } catch (error) {
    console.error('Error editing room:', error);
  }
};


export const createBuilding = async (buildingData) => {
  try {
    const response = await axios.post(BUILDING_URL, buildingData);
    return response.data;
  } catch (error) {
    console.error('Error adding Buiding:', error);
    throw error;
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

export const getRoomById = async (roomId) => {
  try {
    const response = await axios.get(`${ROOM_URL}/${roomId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching room by ID:', error);
    throw error; // Propagate the error up so it can be handled by the calling function
  }
};

export const getContractRoom = async (roomId) => {
  try {
    const response = await axios.get(`${CONTRACT_ROOM_URL}/${roomId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching Contract by ID:', error);
    throw error; // Propagate the error up so it can be handled by the calling function
  }
};



process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

