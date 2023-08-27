import { Card, Grid, Text, Link, Button } from "@nextui-org/react";
import data from '../pages/data.json';
import { useRouter } from 'next/router';

export default function CustomBuildingCards({ buildingName, onDelete, placeId, buildingId }) {
  const truncatedName = buildingName.length > 20 ? buildingName.slice(0, 20) + "..." : buildingName;
  const router = useRouter();

  // const handleDelete = () => {
  //   onDelete(buildingName);
  // };

  const handleCardClick = () => {
    router.push({
      pathname: '/roomManagement',
      query: {
        buildingName: encodeURIComponent(buildingName),
        placeId: placeId,
        buildingID: buildingId
      }
    });
  };

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
        height: "160px",
        marginLeft: "20px",
        marginRight: "0px",
        fontFamily: "Kanit, Arial, sans-serif",
        border: "2px solid #D9D9D9",
        backgroundColor: "white",
        borderRadius: "30px",
        backgroundImage: `url(/BuildingBorder.png)`, // Add this line
        backgroundSize: 'cover', // And this line
        boxShadow: "none",
      }}
      // onClick={() => window.location.href = `/roomManagement?buildingName=${encodeURIComponent(buildingName), handleCardClick}`}
      onClick={handleCardClick}

    >
      <Card.Header>
        <Grid.Container css={{ pl: "$6", pr: "$6", justify: "space-between", alignItems: "center" }}>
          <Grid xs={13}>
            <Text h4 css={{ lineHeight: "$xs", marginTop: '10px' }}>
              {truncatedName}
            </Text>
          </Grid>

        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: "$2" }}>
        <Text>
        </Text>
      </Card.Body>
    </Card>
  );
}
