import { Card, Grid, Text, Button } from "@nextui-org/react";
import React, { useState, useEffect } from 'react';


export default function Buildingcard({ buildingName, onDelete, placeId }) {
  const truncatedName = buildingName.length > 20 ? buildingName.slice(0, 20) + "..." : buildingName;

  // const handleDelete = (event) => {
  //   if (typeof window !== 'undefined') {
  //     event.stopPropagation(); // Stopping propagation
  //     onDelete(buildingName);
  //   }
  // };
  // fech, post

  useEffect(() => {

  }, []);

  return (
    <Card
      variant="flat"
      bordered
      shadow={false}
      flat
      isPressable
      css={{
        p: "$6",
        mw: "400px",
        marginLeft: "8px",
        marginRight: "0px",
        fontFamily: "Kanit, Arial, sans-serif",
        border: "2px solid #D9D9D9",
        backgroundColor: "white",
        borderRadius: "30px",
        backgroundImage: `url(/BuildingBorder.png)`,
        backgroundSize: 'cover',
        boxShadow: "none",
      }}
      onClick={() => {
        window.location.href = `/building?buildingName=${encodeURIComponent(buildingName)}&placeId=${encodeURIComponent(placeId)}`;
      }}
    >
      <Card.Header>
        <Grid.Container css={{ pl: "$6", pr: "$6", justify: "center", alignItems: "center" }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: "$xs", marginTop: '10px' }}>
              {truncatedName}
            </Text>
          </Grid>
          {/* <Button
  auto
  style={{
    position: 'absolute', 
    top: '10px',
    right: '10px',
    fontFamily: "Kanit, Arial, sans-serif",
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#71797E',
  }}
> */}
          {/* <button onClick={handleDelete} style={{ background: 'none', border: 'none', fontSize: '16px' }}>X</button> */}
          {/* </Button> */}
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text>
        </Text>
      </Card.Body>
    </Card>
  );
}
