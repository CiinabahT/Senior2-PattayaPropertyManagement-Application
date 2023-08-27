import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar.js'; // Import the Sidebar component
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import RecordTable from '../components/RecordTables.js';
import { getRoomById } from '../API/api.js';
import { fetchOwner } from '../API/api.js';
import { getContractRoom } from '../API/api.js';
import axios from 'axios';
import { EditRoom } from '../API/api.js';



export default function RoomEdit() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('');
  const [activeTab, setActiveTab] = useState('room'); // For the tabs
  const [documentObj, setDocumentObj] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const [roomNumber, setRoomNumber] = useState('');
  const [roomID, setRoomID] = useState('');
  const [roomData, setRoomData] = useState(null);
  const [roomNumbera, setRoomNumbera] = useState('');
  const [roomAddress, setroomAddress] = useState('');
  const [electricNumber, setElectricNumber] = useState('');
  const [meterNumber, setMeterNumber] = useState('');
  const [roomSize, setRoomSize] = useState('');
  const [bedRoom, setbedRoom] = useState('');
  const [toiletAmount, setToiletAmount] = useState('');
  const [livingRoomAmount, setLivingRoomAmount] = useState('');
  const [selectedViews, setSelectedViews] = useState(null);
  const [owners, setOwners] = useState([]); // holds the array of owner objects
  const [ownerOptions, setOwnerOptions] = useState([]); // holds the dropdown options
  const [selectedOwners, setSelectedOwners] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [pictureID, setPictureID] = useState('');
  const [selectedFilesForDocument, setSelectedFilesForDocument] = useState([]);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);






  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;

  useEffect(() => {
    const roomNumberFromQuery = router.query.roomNumber;
    const roomIdFromQuery = router.query.roomId;

    if (roomNumberFromQuery) {
      setRoomNumber(roomNumberFromQuery);
    }

    if (router.query.roomId) {
      setLoading(true);
      getRoomById(router.query.roomId)
        .then(data => {
          console.log('API Response:', data);
          setRoomData(data);


          if (data.room_pictures && data.room_pictures.length > 0) {
            const roomPictures = data.room_pictures.map(picture => ({
              id: picture.id,
              name: `Image-${picture.id}`,
              preview: picture.room_picture_url
            }));
            setSelectedFiles(roomPictures);
          }
          const base64ToBlob = (base64, mimeType = 'application/pdf') => {
            console.log("Base64 Length: ", base64.length); // Check if this is reasonable

            const byteCharacters = atob(base64);
            const byteNumbers = new Array(byteCharacters.length);

            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            return new Blob([byteArray], { type: mimeType });
          };



          // Your existing logic to populate 'selectedFilesForDocument'
          if (data.room_documents && data.room_documents.length > 0) {
            const roomDoc = data.room_documents.map(document => {
              let preview;

              const blob = base64ToBlob(document.room_document);
              preview = URL.createObjectURL(blob);

              return {
                id: document.id,
                name: `PDF-${document.id}`,
                preview: preview,
              };
            });
            setSelectedFilesForDocument(roomDoc);
          }



          console.log("Room Data " + data.owner_name)
          setSelectedStatus({ label: data.status_of_room, value: data.room_id })
          setSelectedOwners({ label: data.owner_name, value: data.owner_id });
          setSelectedViews({ label: data.type_of_view, value: data.room_id })
          setPictureID(data.room_picture.id)

          console.log("Selected Owner" + selectedOwners)
          console.log('match' + data.owner_name)

          setLoading(false); // End loading after processing data
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
          setLoading(false);
        });
      setRoomID(roomIdFromQuery);
    }
    // Fetch owners
    fetchOwnerData()
      .then(() => {
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching owners: ", error);
        setLoading(false); // End loading even if there's an error
      });

  }, [router.query.roomNumber, router.query.roomId,]);

  useEffect(() => {
    console.log("Updated selectedOwners:", selectedOwners);
  }, [selectedOwners]);






  useEffect(() => {
    if (roomData && roomData.room_number) {
      setRoomNumbera(roomData.room_number);
    }
    if (roomData && roomData.room_address) {
      setroomAddress(roomData.room_address);
    }
    if (roomData && roomData.electric_user_number) {
      setElectricNumber(roomData.electric_user_number);
    }
    if (roomData && roomData.electric_number) {
      setMeterNumber(roomData.electric_number);
    }
    if (roomData && roomData.size_sqm) {
      setRoomSize(roomData.size_sqm);
    }
    if (roomData && roomData.amount_of_bed_room) {
      setbedRoom(roomData.amount_of_bed_room);
    }
    if (roomData && roomData.amount_of_toilet_room) {
      setToiletAmount(roomData.amount_of_toilet_room);
    }
    if (roomData && roomData.amount_of_living_room) {
      setLivingRoomAmount(roomData.amount_of_living_room);
    }

  }, [roomData]);

  const fetchOwnerData = async () => {
    setLoading(true);  // Start loading for owner fetch
    try {
      const data = await fetchOwner();
      setOwners(data);  // set owners state
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };


  // useEffect(() => {
  //   fetchOwnerData();
  // }, []);  

  useEffect(() => {
    // Generate ownerOptions from owners state
    const options = owners.map(owner => ({
      value: owner.id,  // Assuming each owner has a unique 'id'
      label: owner.full_name // Use the 'full_name' property for the option label
    }));

    setOwnerOptions(options);
  }, [owners]);


  const sendImageToAPI = async (file, roomID) => {
    const apiUrl = 'https://pattayaavenueproperty.xyz/api/rooms/roompicture';

    try {
      const response = await axios.post(apiUrl, {
        room_id: parseInt(roomID),
        room_picture_url: file.preview  // This is the Base64 encoded image
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Other headers as necessary
        }
      });

      return response.data;  // Return API response data
    } catch (error) {
      console.error('There was a problem uploading the image:', error.message);
    }
  };


  const deleteImageFromAPI = async (pictureID) => {
    const apiUrl = `https://pattayaavenueproperty.xyz/api/rooms/editroompicture/${pictureID}`;

    try {
      const response = await axios.post(apiUrl, {
        id: parseInt(pictureID)
      }, {
        headers: {
          // Headers if necessary
        }
      });

      // Remove the image from local state as well
      setSelectedFiles(prevFiles => prevFiles.filter(file => file.id !== parseInt(pictureID)));

      console.log(response.data);
    } catch (error) {
      console.error('There was a problem deleting the image:', error.message);
    }
  };

  const deleteFileFromAPI = async (documentId) => {
    const apiUrl = `https://pattayaavenueproperty.xyz/api/rooms/editroomdocument/${documentId}`;

    try {
      const response = await axios.post(apiUrl, {
        id: parseInt(documentId)
      }, {
        headers: {
          // Headers if necessary
        }
      });

      // Remove the image from local state as well
      setSelectedFilesForDocument(prevFiles => prevFiles.filter(file => file.id !== parseInt(documentId)));

      console.log(response.data);
    } catch (error) {
      console.error('There was a problem deleting the image:', error.message);
    }
  };

  const handleFileChangeForDocument = async (event) => {
    const files = Array.from(event.target.files);

    const base64Files = await Promise.all(files.map(async file => {
      const base64 = await toBase64file(file);
      return {
        id: Date.now(),
        name: file.name,
        preview: URL.createObjectURL(file),
        base64
      };
    }));


    for (let file of base64Files) {
      const apiResponse = await sendDocumentToAPI(file, roomID);

      if (apiResponse && apiResponse.data && apiResponse.data.id) {
        // Update the id of the file object with the id returned from the API
        file.id = apiResponse.data.id;
      }
      console.log("apiResponse" + apiResponse.data)

    }
    setSelectedFilesForDocument(prevFiles => [...prevFiles, ...base64Files]);
    
    // Reset the value of the file input to allow re-uploading the same file
    // event.target.value = null;
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);

    const base64Files = await Promise.all(files.map(async file => {
      const base64 = await toBase64(file);
      return {
        id: Date.now(), // This is temporary id
        name: file.name,
        preview: base64
      };
    }));

    for (let file of base64Files) {
      const apiResponse = await sendImageToAPI(file, roomID);

      if (apiResponse && apiResponse.data && apiResponse.data.id) {
        // Update the id of the file object with the id returned from the API
        file.id = apiResponse.data.id;
      }
      console.log("apiResponse" + apiResponse.data.id)
    }

    setSelectedFiles(prevFiles => [...prevFiles, ...base64Files]);
  };

  const toBase64file = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]); // Get only the Base64 content, not the MIME type
    reader.onerror = (error) => reject(error);
  });
  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleDeleteFile = (index) => () => {  // extra arrow function here
    const newFiles = [...selectedFilesForDocument];
    newFiles.splice(index, 1);
    setSelectedFilesForDocument(newFiles);
  };

  useEffect(() => {
    console.log('State changed:', selectedFilesForDocument);
  }, [selectedFilesForDocument]);

  useEffect(() => {
    return () => {
      // Cleanup logic
      selectedFilesForDocument.forEach(fileObj => {
        URL.revokeObjectURL(fileObj.preview);
      });
    };
  }, [selectedFilesForDocument]);

  const sendDocumentToAPI = async (file, roomID) => {
    const apiUrl = 'https://pattayaavenueproperty.xyz/api/rooms/roomdocument';

    try {
      const response = await axios.post(apiUrl, {
        room_id: parseInt(roomID),
        room_document: file.base64 // This should be the Base64 encoded document
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Other headers as necessary
        }
      });

      return response.data;  // Return API response data
    } catch (error) {
      console.error('There was a problem uploading the document:', error.message);
    }
  };



  const handleSubmit = async () => {
    const allRoomData = {
      room_number: roomNumbera,
      room_address: roomAddress,
      electric_number: electricNumber,

      size_sqm: parseFloat(roomSize),
      amount_of_bed_room: parseInt(bedRoom),
      amount_of_toilet_room: parseInt(toiletAmount),
      amount_of_living_room: parseInt(livingRoomAmount),

      type_of_view: selectedViews?.label,
      owner_id: selectedOwners?.value,
      // owner_name: selectedOwners?.value,
      status_of_room: selectedStatus?.label,
      electric_user_number: meterNumber

    };

    try {
      const response = await EditRoom(roomID, allRoomData);
      console.log("API Response: ", response);
      if (response && response.statusCode === 200) {
        setShowModal(true); // Show modal upon successful save
        setTimeout(() => setShowModal(false), 3000); // Hide modal after 3 seconds
      }
    } catch (error) {
      console.error("Error: ", error);
    }

  };

  console.log("Selected Views: ", selectedViews);
  console.log("Selected Status: ", selectedStatus);



  // Save to local storage whenever state changes
  useEffect(() => {
    if (selectedStatus) {
      localStorage.setItem('selectedStatus', JSON.stringify(selectedStatus));
    }
    if (selectedViews) {
      localStorage.setItem('selectedViews', JSON.stringify(selectedViews));
    }
  }, [selectedStatus, selectedViews]);

  // Load from local storage when component initializes
  useEffect(() => {
    const savedStatus = JSON.parse(localStorage.getItem('selectedStatus'));
    const savedViews = JSON.parse(localStorage.getItem('selectedViews'));
    if (savedStatus) setSelectedStatus(savedStatus);
    if (savedViews) setSelectedViews(savedViews);
  }, []);



  const tabStyle = {
    fontWeight: activeTab === 'room' ? 'bold' : 'normal',
    fontFamily: 'Kanit, sans-serif',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: activeTab === 'room' ? 'black' : '#666',
  };

  const viewOptions = [
    { value: 'Sea', label: 'Sea' },
    { value: 'City', label: 'City' },
    { value: 'Sea-City', label: 'Sea-City' },
  ];
  // const ownerOptions = [
  //   { value: 'owner1', label: 'Owner 1' },
  //   { value: 'owner2', label: 'Owner 2' },
  // ];

  const roomStatusOptions = [
    { value: 'Sell', label: 'Sell' },
    { value: 'Rent', label: 'Rent' },
    { value: 'Sell/Rent', label: 'Sell/Rent' },
    { value: 'Returned', label: 'Returned' },
  ];


  const commonInputStyle = {
    width: '200px',
    height: '35px',
    fontFamily: 'Kanit',
    outline: 'none',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 'bold',
  };

  const commonLabelStyle = {
    display: 'block',
    fontSize: '20px',
    fontWeight: 'bold',
  };

  const handleRoomNumberChange = (event) => {
    setRoomNumbera(event.target.value);
  };

  const handleRoomAddressChange = (event) => {
    setroomAddress(event.target.value);
  };

  const handleElectricNumberChange = (event) => {
    setElectricNumber(event.target.value);
  };

  const handleMeterNumberChange = (event) => {
    setMeterNumber(event.target.value);
  };

  const handleRoomSizeChange = (event) => {
    setRoomSize(event.target.value);
  };

  const handleBedRoomChange = (event) => {
    setbedRoom(event.target.value);
  };

  const handleToiletAmountChange = (event) => {
    setToiletAmount(event.target.value);
  };

  const handleLivingRoomAmountChange = (event) => {
    setLivingRoomAmount(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        const data = await getContractRoom(roomID);
        setRecords(data);  // Assuming data is an array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setIsLoading(false); // End loading
    };

    fetchData();
  }, [roomID]);

  const handleChangeStatus = (option) => {
    setSelectedStatus(option);
  }




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
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div style={{ display: 'flex', fontFamily: 'Kanit, sans-serif' }}>
            <div style={{ flex: '0 0 250px', position: 'fixed' }}>
              <Sidebar />
            </div>
            <div style={{ marginLeft: '300px', marginRight: '30px', marginTop: '40px', flex: '1' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="/back(1).png" alt="Back" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={() => router.back()} />
                  <h1 style={{ fontSize: '35px', fontFamily: 'Kanit, sans-serif', marginLeft: '10px', }}>Edit Room</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginTop: '10px', fontWeight: 'bold' }}>

                </div>
              </div>
              <p style={{ fontSize: '20px', color: '#666' }}>{"Rooms " + roomNumber || "Your custom text here"}</p>
              <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px' }} />
              {/* <h2 style={{ fontWeight: 'bold' }}>Floor</h2> */}
              <div style={{ display: 'flex', marginBottom: '20px', marginLeft: '-5px' }}>
                <button onClick={() => setActiveTab('room')} style={{ fontWeight: activeTab === 'room' ? 'bold' : 'normal', fontFamily: 'Kanit, sans-serif', border: 'none', background: 'none', cursor: 'pointer', color: activeTab === 'room' ? 'black' : '#666', marginTop: '10px' }}>Room</button>
                <span style={{ margin: '0 10px', color: '#666', marginTop: '10px' }}>|</span>
                <button onClick={() => setActiveTab('record')} style={{ fontWeight: activeTab === 'record' ? 'bold' : 'normal', fontFamily: 'Kanit, sans-serif', border: 'none', background: 'none', cursor: 'pointer', color: activeTab === 'record' ? 'black' : '#666', marginTop: '12px' }}>Record</button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginTop: '10px', fontWeight: 'bold' }}>

              </div>


              {activeTab === 'room' && (

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '30px' }}>
                  <div>
                    <button
                      onClick={handleSubmit}
                      style={{
                        padding: '5px 10px',
                        cursor: 'pointer',
                        fontFamily: 'Kanit, sans-serif',
                        backgroundColor: '#326896',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                        width: '150px',
                        height: '40px',
                        fontSize: '16px',
                        display: activeTab === 'room' ? 'block' : 'none', // Show the button when activeTab is 'room'
                        marginRight: '10px',
                        marginTop: '-30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <img src="CloundUpload.png" alt="Upload" style={{ width: '25px', height: '20px', marginRight: '8px' }} />
                      Save Data
                    </button>
                  </div>

                  <Select
                    options={roomStatusOptions}
                    value={selectedStatus}
                    onChange={handleChangeStatus}
                    placeholder="Room Status"
                    styles={{
                      container: (provided) => ({
                        ...provided,
                        marginRight: '23px',
                        fontFamily: 'Kanit',
                        borderRadius: '5px',
                        outline: 'none',
                        marginBottom: '0px',
                        width: '205px',
                        marginTop: '31px',
                        marginLeft: '-159px'
                      }),
                      menu: styles => ({
                        ...styles,
                        marginTop: '-22px', // Adjust this value to control the distance between the menu and the input
                        zIndex: 9999
                      })
                    }}
                  />




                  <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%', marginLeft: '113px' }}>
                    <label style={commonLabelStyle}>Room No:</label>
                    <input
                      type="text"
                      placeholder=" Room No.."
                      style={commonInputStyle}
                      value={roomNumbera}
                      onChange={handleRoomNumberChange}
                    />
                  </div>

                  <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
                    <label style={commonLabelStyle}>Room Address:</label>
                    <input
                      type="text"
                      placeholder=" Room Address.."
                      style={commonInputStyle}
                      value={roomAddress}
                      onChange={handleRoomAddressChange}
                    />
                  </div>

                  <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
                    <label style={commonLabelStyle}>Electric No:</label>
                    <input
                      type="text"
                      placeholder=" Electric No.."
                      style={commonInputStyle}
                      value={electricNumber}
                      onChange={handleElectricNumberChange}
                    />
                  </div>
                  <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
                    <label style={commonLabelStyle}>Meter No:</label>
                    <input
                      type="text"
                      placeholder=" Meter No.."
                      style={commonInputStyle}
                      value={meterNumber}
                      onChange={handleMeterNumberChange}
                    />
                  </div>
                  <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
                    <label style={commonLabelStyle}>Room Size:</label>
                    <input
                      type="text"
                      placeholder=" Room Size.."
                      style={commonInputStyle}
                      value={roomSize}
                      onChange={handleRoomSizeChange}
                    />
                  </div>
                  <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
                    <label style={commonLabelStyle}>Bedroom Amount:</label>
                    <input
                      type="text"
                      placeholder=" Bedroom Amount.."
                      style={commonInputStyle}
                      value={bedRoom}
                      onChange={handleBedRoomChange}
                    />
                  </div>
                  <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
                    <label style={commonLabelStyle}>Toilet Amount:</label>
                    <input
                      type="text"
                      placeholder=" Toilet Amount.."
                      style={commonInputStyle}
                      value={toiletAmount}
                      onChange={handleToiletAmountChange}
                    />
                  </div>
                  <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
                    <label style={commonLabelStyle}>Living Room Amount:</label>
                    <input
                      type="text"
                      placeholder=" Living Room Amount.."
                      style={commonInputStyle}
                      value={livingRoomAmount}
                      onChange={handleLivingRoomAmountChange}
                    />
                  </div>

                  <div style={{ marginBottom: '30px', flex: '0 0 100%' }}> {/* Parent div */}
                    <div style={{ display: 'flex', flex: '0 0 100%' }}> {/* Flex div for horizontal alignment */}
                      <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '20px', fontWeight: 'bold' }}>
                        <label style={commonLabelStyle}>View:</label>
                        <Select
                          options={viewOptions}
                          value={selectedViews}
                          onChange={setSelectedViews}
                          isSearchable={false}
                          placeholder="Select View"
                          styles={{ container: (provided) => ({ ...provided, width: '300px', fontSize: '13px' }) }}
                        />
                      </div>

                      <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '20px', fontWeight: 'bold' }}>
                        <label style={{ commonLabelStyle }}>Owner:</label>
                        <Select
                          options={ownerOptions}
                          value={selectedOwners}
                          onChange={option => setSelectedOwners(option)}
                          placeholder="Owner"
                          styles={{ container: (provided) => ({ ...provided, width: '300px', fontSize: '13px' }) }}
                        />


                      </div>
                    </div>
                    <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginTop: '40px' }} />
                    <h2 style={{ fontWeight: 'bold' }}>Room Price Detail</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '30px' }}>
                      <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
                        <label style={commonLabelStyle}>Price For Sell:</label>
                        <input type="text" placeholder=" Price.." style={commonInputStyle} />
                      </div>
                      <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
                        <label style={commonLabelStyle}>Price For Rent:</label>
                        <input type="text" placeholder=" Price.." style={commonInputStyle} />
                      </div>
                      <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
                        <label style={commonLabelStyle}>Deposit:</label>
                        <input type="text" placeholder=" Deposit.." style={commonInputStyle} />
                      </div>
                      <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
                        <label style={commonLabelStyle}>Price 1 Month:</label>
                        <input type="text" placeholder=" Price.." style={commonInputStyle} />
                      </div>
                      <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
                        <label style={commonLabelStyle}>Price 2-5 Month:</label>
                        <input type="text" placeholder=" Price.." style={commonInputStyle} />
                      </div>
                      <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
                        <label style={commonLabelStyle}>Price 6-11 Month:</label>
                        <input type="text" placeholder=" Price.." style={commonInputStyle} />
                      </div>
                      <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
                        <label style={commonLabelStyle}>Price 12 Month:</label>
                        <input type="text" placeholder=" Price.." style={commonInputStyle} />
                      </div>
                    </div>
                    <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginTop: '20px' }} />
                    <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%', marginTop: '40px' }}>
                      <h2 style={{ fontWeight: 'bold' }}>Room Image</h2>
                    </div>

                    <div>

                      <button
                        style={{ fontFamily: 'Kanit, sans-serif', marginBottom: '30px', backgroundColor: '#326896', outline: 'none', border: 'none', borderRadius: '5px', width: '180px', height: '45px', fontSize: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => document.getElementById('fileInput').click()}
                      >
                        <img src="upload.png" alt="Upload" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                        Select Images
                      </button>
                      <input
                        id="fileInput"
                        type="file"
                        multiple
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                      <div>
                        {selectedFiles.map(file => (
                          <div key={file.id} style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }}>
                            <img
                              src={file.preview}
                              alt={file.name}
                              style={{
                                width: '150px',
                                height: '100px',
                                border: '2px solid black',  // Add border
                                borderRadius: '10px'  // Add border-radius
                              }}
                            />
                            <img
                              src="X.png"  // Replace this with the actual path to your X.png image
                              alt="Close"
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                cursor: 'pointer',
                                width: '23px',
                                height: '23px',
                                marginLeft: '5px',
                                marginTop: '5px'
                              }}
                              onClick={() => deleteImageFromAPI(file.id)}
                            />
                          </div>
                        ))}
                      </div>

                    </div>


                    <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginTop: '40px' }} />
                    <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%', marginTop: '40px' }}>
                      <h2 style={{ fontWeight: 'bold' }}>Document</h2>
                      <button
                        style={{ fontFamily: 'Kanit, sans-serif', marginBottom: '30px', backgroundColor: '#326896', outline: 'none', border: 'none', borderRadius: '5px', width: '180px', height: '45px', fontSize: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => document.getElementById('fileInputForDocument').click()}
                      >
                        <img src="upload.png" alt="Upload" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                        Select File
                      </button>
                      <input
                        id="fileInputForDocument"
                        type="file"
                        multiple
                        style={{ display: 'none' }}
                        onChange={handleFileChangeForDocument}
                      />


                      {/* </button> */}
                      <div>
                      {selectedFilesForDocument.map((fileObj, index) => (
                        <div key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }} >
                          <embed src={fileObj.preview} type="application/pdf" style={{ width: '500px', height: '600px' }} />
                          <img
                            src="X.png"
                            alt="Close"
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              cursor: 'pointer',
                              width: '23px',
                              height: '23px',
                              marginLeft: '5px',
                              marginTop: '5px'
                            }}
                            onClick={() => deleteFileFromAPI(fileObj.id)}
                          />
                        </div>
                      ))}
                      </div>

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




                    </div>

                  </div>
                </div>
              )}



              {activeTab === 'record' && (
                isLoading ? <div>Loading...</div> : <RecordTable records={records} />
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}