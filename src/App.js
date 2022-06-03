import './App.css';
import React, { useState, useEffect } from "react"
import DisplayComponent from './components/DisplayComponent'
import GuessComponent from './components/GuessComponent';
import { Grid, Typography } from '@mui/material';

/* eslint-disable */
function App() {
  const [counter, setCounter] = useState(1)
  const [data, setData] = useState()

  const API = `https://api.hatchways.io/assessment/sentences/${counter}`

  const getData = async () => {
    fetch(API)
    .then(res => res.json())
    .then(resData => setData(resData.data.sentence))
    .catch(err => console.error(err))
  }

  const nextSentence = () => {
    setCounter(counter+1)
  }

  useEffect(() => {
    getData()
  },[counter])

  return (
    <Grid container className='container'>
      <Grid item lg={3} md={1} sm={0}></Grid>
      <Grid item lg={6} md={10} sm={12} sx={{marginTop: '5rem'}} className='main'>
        { counter <= 10 &&
        <div>
        <DisplayComponent data={data} />
        <GuessComponent data={data} counter={counter} nextSentence={nextSentence} />
        </div>
        }
        { counter > 10 &&
        <div>
          <Typography variant='h4'>You win!</Typography>
        </div>
        }
      </Grid>
      <Grid item lg={3} md={1} sm={0}></Grid>
    </Grid>
  );
}

export default App;
