import type { NextPage } from 'next'

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import type {FishResponse, LakesResponse, FriendsResponse} from '../common/types';
import {TabPanel} from '../common/helpers';



const Home: NextPage = () => {
  const [currentTab, setCurrentTab] = React.useState(-1);
  const [data, setData] = React.useState(["Select something to load and view data"]);

  const changeTabEventHandler = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const getFishData = () =>  {
    fetch('/api/fish')
      .then(( res ) => res.json())
      .then(( newData: FishResponse ) => newData.data.map(el => `Name: ${el.name}, Average Size: ${el.average_size}"`))
      .then((newData) => setData(newData));
  };

  const getLakesData = () => {
    fetch('/api/lakes')
      .then(( res ) => res.json())
      .then(( newData: LakesResponse ) => newData.data.map(el => `Name: ${el.name}, Max Depth: ${el.max_depth}m`))
      .then((newData) => setData(newData));
  };

  const getFriendsData = () =>  {
    fetch('/api/friends')
      .then(( res ) => res.json())
      .then(( newData: FriendsResponse ) => newData.data.map(el => `Name: ${el.name}, Fishing Score: ${el.fishing_score} points`))
      .then((newData) => setData(newData));
  };

  const selectButtonEventHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button Pressed");
    if (event.currentTarget.id === 'fish') {
      console.log("Getting fish data")
      getFishData();
    } else if (event.currentTarget.id === 'lakes') {
      getLakesData();
    } else if (event.currentTarget.id === 'friends') {
      getFriendsData();
    }
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={changeTabEventHandler}>
          <Tab label="Select"></Tab>
          <Tab label="Display"></Tab>
        </Tabs>
      </Box>

      {/* Select Pannel Tab Content*/}
      <TabPanel value={currentTab} index={0}>
        <Stack spacing={2} direction="row">
          <Button id="fish" variant="contained" onClick={selectButtonEventHandler}>Fish</Button>
          <Button id="lakes" variant="contained" onClick={selectButtonEventHandler}>Lakes</Button>
          <Button id="friends" variant="contained" onClick={selectButtonEventHandler}>Friends</Button>
        </Stack>
      </TabPanel>

      {/* Display Pannel Tab Content*/}
      <TabPanel value={currentTab} index={1}>
        <Box>
          {data.map(( el, i ) => 
            <p key={i}>{el}</p>
          )}
        </Box>
      </TabPanel>

    </Box>
  )
}

export default Home
