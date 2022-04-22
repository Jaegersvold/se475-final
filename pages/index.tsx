import type { NextPage } from 'next'

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import type {FishResponse, LakesResponse, FriendsResponse} from '../common/types';
import {TabPanel} from '../common/helpers';


type ZoomItem = {
  desc: string,
  img_url: string,
  h: string,
  w: string,
  header: string,
}

const Home: NextPage = () => {
  const [currentTab, setCurrentTab] = React.useState(-1);
  const [table, setTable] = React.useState("");

  const [currentZoomItem, setCurrentZoomItem] = React.useState<null | ZoomItem>(null);

  const [fishData, setFishData] = React.useState<null | FishResponse>(null);
  const [lakesData, setLakesData] = React.useState<null | LakesResponse>(null);
  const [friendsData, setFriendsData] = React.useState<null | FriendsResponse>(null);

  const changeTabEventHandler = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const getFishData = async () =>  {
    fetch('/api/fish')
      .then(( res ) => res.json())
      .then((fishResponse: FishResponse) => setFishData(fishResponse));

    setTable("fish");
    setCurrentTab(1);
  };

  const getLakesData = () => {
    fetch('/api/lakes')
      .then(( res ) => res.json())
      .then(( res: LakesResponse ) => setLakesData(res));

      setTable("lakes");
    setCurrentTab(1);
  };

  const getFriendsData = () =>  {
    fetch('/api/friends')
      .then(( res ) => res.json())
      .then(( res: FriendsResponse ) => setFriendsData(res))

    setTable("friends");
    setCurrentTab(1);
  };

  const zoomFishData = (event: React.MouseEvent<HTMLButtonElement>) => {
    const fishName = event.currentTarget.id;
    const fish = fishData!.data.find((f) => f.name === fishName)!;
    setCurrentZoomItem({header: "Description", desc: fish.description, img_url: `/images/${fish.name}.jpeg`, h: "200px", w: "400px"})
    setCurrentTab(2);
  }

  const zoomLakesData = (event: React.MouseEvent<HTMLButtonElement>) => {
    const lakeName = event.currentTarget.id;
    const lake = lakesData!.data.find((f) => f.name === lakeName)!;
    const img_name = lake.name.replaceAll(" ", "_");
    setCurrentZoomItem({header: "About", desc: lake.about, img_url: `/images/${img_name}.jpeg`, h: "200px", w: "400px"})
    setCurrentTab(2);
  }

  const zoomFriendData = (event: React.MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.id;
    const friend = friendsData!.data.find((f) => f.name === name)!;
    setCurrentZoomItem({header: "Bio", desc: friend.bio, img_url: `/images/${friend.name}.jpeg`, h: "400px", w: "300px"})
    setCurrentTab(2);
  }

  const TableDisplay = () => {
    if (table == "fish" && fishData !== null) {
      return (
        <Box>
          {fishData.data.map((fish) => 
            <Box display='flex'>
              <Button id={fish.name} onClick={zoomFishData}>Name: {fish.name}</Button>
              <p>Average Length: {fish.average_size}</p>
            </Box>
          )}
        </Box>
      );
    } else if (table === "lakes" && lakesData !== null) {
      return (
        <Box>
          {lakesData.data.map((lake) => 
            <Box display='flex'>
              <Button id={lake.name} onClick={zoomLakesData}>Name: {lake.name}</Button>
              <p>Max Depth: {lake.max_depth}</p>
            </Box>
          )}
        </Box>
      )
    } else if (table === "friends" && friendsData !== null) {
      return (
        <Box>
          {friendsData.data.map((friend) => 
            <Box display='flex'>
              <Button id={friend.name} onClick={zoomFriendData}>Name: {friend.name}</Button>
              <p>Max Depth: {friend.fishing_score}</p>
            </Box>
          )}
        </Box>
      )
    } else {
      return (<p>No table data has been loaded</p>)
    }
  };

  const ZoomItemDisplay = () => {

    if (currentZoomItem === null) {
      return (<p>No zoom data has been loaded</p>);
    }
    return (
      <>
        <img height={currentZoomItem.h} width={currentZoomItem.w} src={currentZoomItem?.img_url} />
        <h2>{currentZoomItem.header}</h2>
        <p>{currentZoomItem?.desc}</p>
      </>
    );
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={changeTabEventHandler}>
          <Tab label="Select"></Tab>
          <Tab label="Display"></Tab>
          <Tab label="Zoom"></Tab>
        </Tabs>
      </Box>

      {/* Select Pannel Tab Content*/}
      <TabPanel value={currentTab} index={0}>
        <Stack spacing={2} direction="row">
          <Button id="fish" variant="contained" onClick={getFishData}>Fish</Button>
          <Button id="lakes" variant="contained" onClick={getLakesData}>Lakes</Button>
          <Button id="friends" variant="contained" onClick={getFriendsData}>Friends</Button>
        </Stack>
      </TabPanel>

      {/* Table Display Content */}
      <TabPanel value={currentTab} index={1}>
        <TableDisplay />
      </TabPanel>

      {/* Display Zoom Information */}
      <TabPanel value={currentTab} index={2}>
        <ZoomItemDisplay />
      </TabPanel>
      

    </Box>
  )
}

export default Home
