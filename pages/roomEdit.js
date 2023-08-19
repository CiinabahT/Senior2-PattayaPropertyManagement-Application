import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar.js'; // Import the Sidebar component
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import RecordTable from '../components/RecordTables.js';


export default function RoomEdit() {
  const router = useRouter();
  const [buildingName, setBuildingName] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [activeTab, setActiveTab] = useState('room'); // For the tabs
  const [selectedView, setSelectedView] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [documentObj, setDocumentObj] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;
  const [roomNumber, setRoomNumber] = useState('');

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

const records = [
  { startDate: '2021-08-01', endDate: '2021-08-30', price: 1000, deposit: 500, renter: 'John Doe', contact: '1234567890', status: 'Active' },
  { startDate: '2021-09-01', endDate: '2021-09-30', price: 1200, deposit: 600, renter: 'Jane Smith', contact: '0987654321', status: 'Pending' },
  { startDate: '2021-10-01', endDate: '2021-10-31', price: 1100, deposit: 550, renter: 'James Brown', contact: '1122334455', status: 'Active' },
  { startDate: '2021-11-01', endDate: '2021-11-30', price: 1300, deposit: 650, renter: 'Jessica Lee', contact: '2233445566', status: 'Expired' },
  { startDate: '2021-12-01', endDate: '2021-12-31', price: 900, deposit: 450, renter: 'Jim White', contact: '3344556677', status: 'Active' },
  { startDate: '2022-01-01', endDate: '2022-01-31', price: 800, deposit: 400, renter: 'Jenny Black', contact: '4455667788', status: 'Pending' },
  { startDate: '2022-02-01', endDate: '2022-02-28', price: 1500, deposit: 750, renter: 'Jack Green', contact: '5566778899', status: 'Active' },
  { startDate: '2022-03-01', endDate: '2022-03-31', price: 950, deposit: 475, renter: 'Jill Gray', contact: '6677889900', status: 'Expired' },
  { startDate: '2022-04-01', endDate: '2022-04-30', price: 1000, deposit: 500, renter: 'Joe Teal', contact: '7788990011', status: 'Active' },
  { startDate: '2022-05-01', endDate: '2022-05-31', price: 1200, deposit: 600, renter: 'Jasmine Silver', contact: '8899001122', status: 'Pending' },
  { startDate: '2022-06-01', endDate: '2022-06-30', price: 1400, deposit: 700, renter: 'Jerry Gold', contact: '9900112233', status: 'Active' },
  { startDate: '2022-07-01', endDate: '2022-07-31', price: 1600, deposit: 800, renter: 'Julie Rose', contact: '0011223344', status: 'Expired' },
  { startDate: '2021-08-01', endDate: '2021-08-30', price: 1000, deposit: 500, renter: 'John Doe', contact: '1234567890', status: 'Active' },
  { startDate: '2021-09-01', endDate: '2021-09-30', price: 1200, deposit: 600, renter: 'Jane Smith', contact: '0987654321', status: 'Pending' },
  { startDate: '2021-10-01', endDate: '2021-10-31', price: 1100, deposit: 550, renter: 'James Brown', contact: '1122334455', status: 'Active' },
  { startDate: '2021-11-01', endDate: '2021-11-30', price: 1300, deposit: 650, renter: 'Jessica Lee', contact: '2233445566', status: 'Expired' },
  { startDate: '2021-12-01', endDate: '2021-12-31', price: 900, deposit: 450, renter: 'Jim White', contact: '3344556677', status: 'Active' },
  { startDate: '2022-01-01', endDate: '2022-01-31', price: 800, deposit: 400, renter: 'Jenny Black', contact: '4455667788', status: 'Pending' },
  { startDate: '2022-02-01', endDate: '2022-02-28', price: 1500, deposit: 750, renter: 'Jack Green', contact: '5566778899', status: 'Active' },
  { startDate: '2022-03-01', endDate: '2022-03-31', price: 950, deposit: 475, renter: 'Jill Gray', contact: '6677889900', status: 'Expired' },
  { startDate: '2022-04-01', endDate: '2022-04-30', price: 1000, deposit: 500, renter: 'Joe Teal', contact: '7788990011', status: 'Active' },
  { startDate: '2022-05-01', endDate: '2022-05-31', price: 1200, deposit: 600, renter: 'Jasmine Silver', contact: '8899001122', status: 'Pending' },
  { startDate: '2022-06-01', endDate: '2022-06-30', price: 1400, deposit: 700, renter: 'Jerry Gold', contact: '9900112233', status: 'Active' },
  { startDate: '2022-07-01', endDate: '2022-07-31', price: 1600, deposit: 800, renter: 'Julie Rose', contact: '0011223344', status: 'Expired' },
  
  
];


  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;
  const currentRows = records.slice(firstRowIndex, lastRowIndex);
  

  useEffect(() => {
    const roomNumberFromQuery = router.query.roomNumber;
    if (roomNumberFromQuery) {
      setRoomNumber(roomNumberFromQuery);
    }
  }, [router.query.roomNumber]);

  const [images, setImages] = useState([null, null, null]); // To hold three images

// Function to handle the image change
const handleImageChange = (e, index) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  

  reader.onloadend = () => {
    // Use an object to store both the file name and the preview URL
    const updatedImage = {
      name: file.name,
      previewUrl: reader.result,
    };

    // Copy and update the images array
    const newImages = [...images];
    newImages[index] = updatedImage;
    setImages(newImages);
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};

const handleDocumentChange = (e) => {
  // Handle the document changes here
  // Example:
  const file = e.target.files[0];
  const previewUrl = URL.createObjectURL(file);
  setDocumentObj({ name: file.name, previewUrl });
};

  const tabStyle = {
    fontWeight: activeTab === 'room' ? 'bold' : 'normal',
    fontFamily: 'Kanit, sans-serif',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: activeTab === 'room' ? 'black' : '#666',
  };

  const viewOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];
  const ownerOptions = [
    { value: 'owner1', label: 'Owner 1' },
    { value: 'owner2', label: 'Owner 2' },
  ];
  
  const roomStatusOptions = [
    { value: 'Sale', label: 'Sale' },
    { value: 'Rent', label: 'Rent' },
    { value: 'Sale/Rent', label: 'Sale/Rent' },
    { value: 'Invalid', label: 'Invalid' },
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
          <h2 style={{ fontWeight: 'bold' }}>Floor</h2>
          <div style={{ display: 'flex', marginBottom: '20px', marginLeft: '-5px' }}>
            <button onClick={() => setActiveTab('room')} style={{ fontWeight: activeTab === 'room' ? 'bold' : 'normal', fontFamily: 'Kanit, sans-serif', border: 'none', background: 'none', cursor: 'pointer', color: activeTab === 'room' ? 'black' : '#666' }}>Room</button>
            <span style={{ margin: '0 10px', color: '#666' }}>|</span>
            <button onClick={() => setActiveTab('record')} style={{ fontWeight: activeTab === 'record' ? 'bold' : 'normal', fontFamily: 'Kanit, sans-serif', border: 'none', background: 'none', cursor: 'pointer', color: activeTab === 'record' ? 'black' : '#666' }}>Record</button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', marginTop: '10px', fontWeight: 'bold' }}>
      
    </div>



{activeTab === 'room' && (
  
  <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: '30px' }}>
    <div>
    <button
        style={{
          padding: '5px 10px',
          cursor: 'pointer',
          fontFamily: 'Kanit, sans-serif',
          backgroundColor: '#326896',
          border: 'none',
          borderRadius: '5px',
          color: 'white',
          width: '110px',
          height: '40px',
          fontSize: '16px',
          display: activeTab === 'room' ? 'block' : 'none', // Show the button when activeTab is 'room'
          marginRight: '10px',
          marginTop: '-30px'
        }}
      >
        Save Data
      </button>
    </div>

    <Select
    options={roomStatusOptions}
    value={selectedOption}
    onChange={option => setSelectedOption(option)}
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
        marginLeft: '-118px'
      }),
      menu: styles => ({
        ...styles,
        marginTop: '-22px', // Adjust this value to control the distance between the menu and the input
        zIndex: 9999
      })
    }}
/>




  <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%', marginLeft: '113px'}}>
    <label style={ commonLabelStyle }>Room No:</label>
    <input type="text" placeholder=" Room No.." style={commonInputStyle} />
  </div>
  <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
    <label style={commonLabelStyle}>Room Address:</label>
    <input type="text" placeholder=" Room Address.."style={commonInputStyle} />
  </div>
    <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%'}}>
      <label style={commonLabelStyle}>Electric No:</label>
      <input type="text" placeholder=" Electric No.."style={commonInputStyle} />
    </div>
    <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%'}}>
      <label style={commonLabelStyle}>Meter No:</label>
      <input type="text" placeholder=" Meter No.." style={commonInputStyle}/>
    </div>
    <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%'}}>
      <label style={commonLabelStyle}>Room Size:</label>
      <input type="text" placeholder=" Room Size.."style={commonInputStyle} />
    </div>
    <div style={{marginBottom: '30px', flex: '0 0 21%', marginRight: '1%'}}>
      <label style={commonLabelStyle}>Room Address:</label>
      <input type="text" placeholder=" Bed Room Amount.." style={commonInputStyle}/>
    </div>
    <div style={{marginBottom: '30px', flex: '0 0 21%', marginRight: '1%' }}>
      <label style={commonLabelStyle}>Toilet Amount:</label>
      <input type="text" placeholder=" Toilet Amount.." style={commonInputStyle}/>
    </div>
    <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%'}}>
      <label style={commonLabelStyle}>Living Room Amount:</label>
      <input type="text" placeholder=" Living Room Amount.."style={commonInputStyle} />
    </div>
    
    <div style={{ marginBottom: '30px', flex: '0 0 100%' }}> {/* Parent div */}
  <div style={{ display: 'flex', flex: '0 0 100%' }}> {/* Flex div for horizontal alignment */}
    <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '20px', fontWeight: 'bold' }}>
      <label style={commonLabelStyle}>View:</label>
      <Select
        options={viewOptions}
        value={selectedView}
        onChange={setSelectedView}
        isSearchable={false}
        placeholder="Select View"
        styles={{ container: (provided) => ({ ...provided, width: '300px', fontSize: '13px'}) }}
      />
    </div>

    <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '20px', fontWeight: 'bold' }}>
      <label style={{ display: 'block', }}>Owner:</label>
      <CreatableSelect
        options={ownerOptions}
        value={selectedOwner}
        onChange={setSelectedOwner}
        isSearchable={true}
        placeholder="Select Owner or Type a New One"
        styles={{ container: (provided) => ({ ...provided, width: '300px', fontSize: '13px'}) }}
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
<div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
  {images.map((imageObj, index) => (
    <div key={index} style={{ margin: '10px' }}>
      <label
        style={{
          display: 'block',
          padding: '10px 15px',
          background: '#326896',
          color: '#FFF',
          cursor: 'pointer',
          width: '150px',
          textAlign: 'center',
          borderRadius: '5px'
        }}
      >
        Choose File
        <input
          type="file"
          onChange={(e) => handleImageChange(e, index)}
          style={{ display: 'none' }} // This hides the actual input
        />
      </label>
      <div style={{ textAlign: 'center', marginTop: '17px' }}>
        <div
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '150px', // Same as the label width
          }}
        >
          {imageObj?.name?.length > 12 ? `${imageObj.name.substring(0, 12)}...` : imageObj?.name}
        </div>
        {imageObj?.previewUrl && (
          <img src={imageObj.previewUrl} alt={`preview ${index}`} style={{ width: '160px', height: '100px', borderRadius: '5px' }} />
        )}
      </div>
    </div>
  ))}
</div>

<hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginTop: '40px' }} />
    <div style={{ marginBottom: '30px', flex: '0 0 21%', marginRight: '1%', marginTop: '40px' }}>
      <h2 style={{ fontWeight: 'bold' }}>Document</h2>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '4px' }}>
      <div>
        <label
          style={{
            display: 'block',
            padding: '10px 15px',
            background: '#326896',
            color: '#FFF',
            cursor: 'pointer',
            width: '150px',
            textAlign: 'center',
            borderRadius: '5px',
          }}
        >
          Choose File
          <input
            type="file"
            accept=".pdf, image/*"
            onChange={handleDocumentChange}
            style={{ display: 'none' }}
          />
        </label>
        <div style={{ textAlign: 'center', marginTop: '17px' }}>
        <div
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '150px',
          }}
        >
          {documentObj?.name?.length > 12 ? `${documentObj.name.substring(0, 12)}...` : documentObj?.name}
          </div>
        {documentObj?.previewUrl && (
          <img src={documentObj.previewUrl} alt={`preview`} style={{ width: '160px', height: '100px', borderRadius: '5px' }} />
        )}
      </div>
    </div>
    </div>


</div> 
  </div>
)}

{activeTab === 'record' && (
  <RecordTable records={records} />

  
)}

        </div>
      </div>
    </>
  );
}

