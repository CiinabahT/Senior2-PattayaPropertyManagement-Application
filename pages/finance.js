import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.js';
import Head from 'next/head';
import CreatableSelect from 'react-select/creatable';
import FinanceTable from '../components/FinanceTable.js';
import { fetchFinance } from '../API/api.js';
import { AddFinance } from '../API/api.js';
import { fetchAllRoomName } from '../API/api.js';

export default function Finance() {
  const [isAddContractModalOpen, setIsAddContractModalOpen] = useState(false);
  const [selectedReceive, setSelectedReceive] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [documentObj, setDocumentObj] = useState(null);

  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [roomOptions, setRoomOptions] = useState([]);
  const [selectedFilesForDocument, setSelectedFilesForDocument] = useState([]);
  const firstBase64 = selectedFilesForDocument.length ? selectedFilesForDocument[0].base64 : null;

  const [validationErrors, setValidationErrors] = useState({});


  const validateForm = () => {
    const newValidationErrors = {};

    if (!selectedRoom?.value) {
      newValidationErrors.room = "*Please Select Room";
    }

    if (!selectedType?.value) {
      newValidationErrors.type = "*Please Select Type";
    }

    if (!parseFloat(amount)) {
      newValidationErrors.amount = "*Please input Amount (Number EX. 100)";
    }

    if (!selectedPayment?.value) {
      newValidationErrors.selectedPayment = "*Please Select Payment Type";
    }

    if (!selectedReceive?.value) {
      newValidationErrors.selectedReceive = "*Please Select Receive Type";
    }

    if (selectedFilesForDocument.length === 0) {
      newValidationErrors.file = "*Please Select a File";
    }

    setValidationErrors(newValidationErrors);

    return Object.keys(newValidationErrors).length === 0;
  };

  // const LastvalidateForm = () => {
  //   const newValidationErrors = {};

  //   if (!selectedRoom?.value && !selectedType?.value && !selectedExpenses?.value && !parseFloat(amount) && !selectedPayment?.value && selectedFilesForDocument.length === 0) {
  //   }

  //   setValidationErrors(newValidationErrors);

  //   return Object.keys(newValidationErrors).length === 0;
  // };

  const handleCloseModal = () => {
    setIsAddContractModalOpen(false);
    setSelectedRoom(null);
    setSelectedType(null);
    setDescription('');
    setSelectedPayment(null);
    setAmount('');
    setNote('');
    setSelectedFilesForDocument([]);

    // Reset any validation errors
    setValidationErrors({});
  };


  const handleFileChangeForDocument = async (event) => {
    const files = Array.from(event.target.files);
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors.file;
      return newErrors;
    });
    const base64Files = await Promise.all(files.map(async (file) => {
      const base64 = await toBase64file(file);
      return {
        id: Date.now(),
        name: file.name,
        preview: URL.createObjectURL(file),
        base64
      };
    }));

    setSelectedFilesForDocument(prevFiles => [...prevFiles, ...base64Files]);
  };


  const handleDeleteFile = (indexToDelete) => {
    setSelectedFilesForDocument(prevFiles =>
      prevFiles.filter((_, index) => index !== indexToDelete)
    );
  };

  const toBase64file = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]); // Get only the Base64 content, not the MIME type
    reader.onerror = (error) => reject(error);
  });

  useEffect(() => {
    // This effect cleans up object URLs to avoid memory leaks.
    return () => {
      selectedFilesForDocument.forEach(fileObj => {
        URL.revokeObjectURL(fileObj.preview);
      });
    };
  }, [selectedFilesForDocument]);


  const handleAddDocument = async () => {
    let lastCheck = false

    if (selectedRoom?.value && selectedType?.value && selectedReceive?.value && parseFloat(amount) && selectedPayment?.value && selectedFilesForDocument.length === 0) {
      lastCheck = true
    }


    if (validateForm() || lastCheck) {
      const FinanceInfo = {
        room_id: selectedRoom?.value,
        category_type: selectedType?.value,
        is_receive: selectedReceive?.value, // or some condition
        description,
        payment_method: selectedPayment?.value,
        amount: parseFloat(amount),
        remark: note,
        document_url: firstBase64 // You'll need to actually upload the document and get this URL
      };

      try {
        const data = await AddFinance(FinanceInfo);
        console.log("Success", data);

        setSelectedRoom(null);
        setSelectedType(null);
        setDescription('');
        setSelectedReceive(null);
        setSelectedPayment(null);
        setSelectedReceive(null);
        setAmount('');
        setNote('');
        setSelectedFilesForDocument([]);
        window.location.reload();
      } catch (error) {
        console.log("Error adding document", error);
      }
    }
  };


  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFinance();
      if (data !== null) {
        setRecords(data);
      }
    };

    fetchData();
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
    const options = rooms.map(room => ({
      value: room.room_id,
      label: room.room_address
    }));

    setRoomOptions(options);
  }, [rooms]);

  useEffect(() => {
    fetchRoomData();
  }, []);


  const IsRecieveOptions = [
    { value: 'Receive', label: 'Receive' },
    { value: 'Pay', label: 'Pay' },
  ];

  const PaymentOptions = [
    { value: 'CREDIT', label: 'CREDIT' },
    { value: 'CASH', label: 'CASH' },
    { value: 'TRANSFER', label: 'TRANSFER' },
  ];

  const TypeOptions = [
    { value: 'SELL', label: 'SELL' },
    { value: 'RENTAL', label: 'RENTAL' },
    { value: 'DEPOSIT', label: 'DEPOSIT' },
    { value: 'ELECTRIC', label: 'ELECTRIC' },
    { value: 'WATER', label: 'WATER' },
    { value: 'REPAIR', label: 'REPAIR' },
    { value: 'DEPT', label: 'DEPT' },
  ];



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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '35px', fontFamily: 'Kanit, sans-serif' }}>Finance</h1>
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
                width: '130px',
                height: '45px',
                marginRight: '7px'
              }}
              onClick={() => setIsAddContractModalOpen(true)}
            >
              Add Document
            </button>
          </div>
          <hr style={{ border: 'none', borderBottom: '1px solid #ccc', margin: '0', marginLeft: '0px', marginRight: '0px', marginBottom: '40px', marginTop: '10px' }} />
          <div style={{ width: '100%', height: '500px' }}>
            <FinanceTable records={records} />
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
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          }}>

            <h2>Add Document</h2>
            <div style={{ flex: '0 0 21%', marginRight: '1%', fontSize: '17px', fontWeight: 'bold', marginTop: '5px', marginRight: '13px' }}><label htmlFor="name-surname">Description* </label></div>
            <textarea
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                marginTop: '5px',
                height: '50px',
                minHeight: '25px',
                width: '383px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid gray',
                resize: 'vertical',
                fontFamily: 'Kanit, Arial, sans-serif',
                fontSize: '16px',
              }}
            />
            <div style={{ flex: '0 0 21%', marginRight: '1%', fontSize: '17px', fontWeight: 'bold', marginTop: '5px', marginRight: '13px' }}><label htmlFor="name-surname">Note* </label></div>
            <textarea
              placeholder="Note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{
                marginTop: '5px',
                height: '50px',
                minHeight: '25px',
                width: '383px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid gray',
                resize: 'vertical',
                fontFamily: 'Kanit, Arial, sans-serif',
                fontSize: '16px',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '17px', fontWeight: 'bold', marginTop: '5px', marginRight: '13px' }}>
                <label>Room: </label>
                <CreatableSelect
                  options={roomOptions}
                  value={selectedRoom}
                  onChange={(value) => {
                    setSelectedRoom(value);
                    setValidationErrors((prevErrors) => {
                      const newErrors = { ...prevErrors };
                      delete newErrors.room;
                      return newErrors;
                    });
                  }}
                  isSearchable={true}
                  placeholder="Room"
                  styles={{ container: (provided) => ({ ...provided, width: '184px', fontSize: '13px' }) }}
                />
                {validationErrors.room && <div style={{ color: "red", fontSize: '14px' }}>{validationErrors.room}</div>}
              </div>

              <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '17px', fontWeight: 'bold', marginTop: '5px', marginRight: '13px' }}>
                <label>Type: </label>
                <CreatableSelect
                  options={TypeOptions}
                  value={selectedType}
                  onChange={(value) => {
                    setSelectedType(value);
                    setValidationErrors((prevErrors) => {
                      const newErrors = { ...prevErrors };
                      delete newErrors.type;
                      return newErrors;
                    });
                  }}
                  isSearchable={false}
                  placeholder="Expense/Revenue"
                  styles={{ container: (provided) => ({ ...provided, width: '184px', fontSize: '13px' }) }}
                />
                {validationErrors.type && <div style={{ color: "red", fontSize: '14px' }}>{validationErrors.type}</div>}
              </div>
            </div>

            <div style={{ flex: '0 0 21%', marginRight: '1%', fontSize: '17px', fontWeight: 'bold', marginTop: '5px', marginRight: '13px' }}><label>Is Receive: </label></div>
            <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '20px', fontWeight: 'bold', marginTop: '5px', }}>
              <CreatableSelect
                options={IsRecieveOptions}
                value={selectedReceive}
                onChange={(value) => {
                  setSelectedReceive(value);
                  setValidationErrors((prevErrors) => {
                    const newErrors = { ...prevErrors };
                    delete newErrors.selectedReceive;
                    return newErrors;
                  });
                }}
                isSearchable={false}
                placeholder="Type of Receive"
                styles={{ container: (provided) => ({ ...provided, width: '387px', fontSize: '13px' }) }}
              />
              {validationErrors.selectedReceive && <div style={{ color: "red", fontSize: '14px' }}>{validationErrors.selectedReceive}</div>}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '17px', fontWeight: 'bold', marginTop: '5px', marginRight: '13px' }}>
                <label htmlFor="start-rental-date">Amount of Money: </label>
                <input value={amount}
                  onChange={(e) => {
                    const value = e.target.value;
                    setAmount(value);
                    setValidationErrors((prevErrors) => {
                      const newErrors = { ...prevErrors };
                      delete newErrors.amount;
                      return newErrors;
                    });
                  }}

                  id="start-rental-date" type="text" placeholder="Price.." style={secondInputStyle} />
                {validationErrors.amount && <div style={{ color: "red", fontSize: '14px' }}>{validationErrors.amount}</div>}
              </div>

              <div>
                <div style={{ flex: '0 0 21%', marginRight: '1%', fontSize: '17px', fontWeight: 'bold', marginTop: '5px', marginRight: '13px' }}><label>Payment Type: </label></div>
                <div style={{ marginBottom: '10px', flex: '0 0 21%', marginRight: '1%', fontSize: '20px', fontWeight: 'bold', marginTop: '5px', marginRight: '13px' }}>
                  <CreatableSelect
                    options={PaymentOptions}
                    value={selectedPayment}
                    onChange={(value) => {
                      setSelectedPayment(value);
                      setValidationErrors((prevErrors) => {
                        const newErrors = { ...prevErrors };
                        delete newErrors.selectedPayment;
                        return newErrors;
                      });
                    }}
                    isSearchable={false}
                    placeholder="Payment Type"
                    styles={{ container: (provided) => ({ ...provided, width: '184px', fontSize: '13px' }) }}
                  />
                  {validationErrors.selectedPayment && <div style={{ color: "red", fontSize: '14px' }}>{validationErrors.selectedPayment}</div>}
                </div>
              </div>
            </div>

            <div>
              <button
                style={{ fontFamily: 'Kanit, sans-serif', marginBottom: '30px', backgroundColor: '#326896', outline: 'none', border: 'none', borderRadius: '5px', width: '180px', height: '45px', fontSize: '17px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={() => document.getElementById('fileInputForDocument').click()}
              >
                <img src="upload.png" alt="Upload" style={{ width: '20px', height: '20px', marginRight: '8px', marginLeft: '-5px' }} />
                Select File
              </button>
              <input
                id="fileInputForDocument"
                type="file"
                multiple
                style={{ display: 'none' }}
                onChange={handleFileChangeForDocument}
              />
              {validationErrors.file && <div style={{ color: "red", fontSize: '14px', marginTop: '-20px', fontWeight: 'bold' }}>{validationErrors.file}</div>}


              {/* </button> */}
              <div>
                {selectedFilesForDocument.map((fileObj, index) => (
                  <div key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '10px' }} >
                    <embed src={fileObj.preview} type="application/pdf" style={{ marginTop: '-75px', marginLeft: '200px', width: '200px', height: '120px' }} />
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
                        marginTop: '5px',
                        marginLeft: '202px',
                        marginTop: '-72px'
                      }}
                      onClick={() => handleDeleteFile(index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px', }}>
              <button onClick={handleCloseModal} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', borderRadius: '5px', border: 'none', marginRight: '10px', marginLeft: '1px', width: '60px' }}>Close</button>
              <button onClick={handleAddDocument} style={{ padding: '5px 10px', cursor: 'pointer', fontFamily: 'Kanit, sans-serif', backgroundColor: '#326896', border: 'none', borderRadius: '5px', color: 'white', width: '60px' }}>Add</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}



