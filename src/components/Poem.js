import React from 'react'
import { Typography, Card, CardContent } from '@mui/material'

const Poem = (props) => {
  return (
    <Card className="App" variant='outlined' style={{maxWidth:600, margin:'0 auto'}}>
        <CardContent className="App">
            {props.page === 'feed' && <Typography align='center' gutterBottom variant='h5'>By {props.poem.userName}</Typography>}
            {props.poem.lines.map((line, i) => {
                return <Typography align='center' key={i}>{line}</Typography>
            })}
            <hr></hr>
            <Typography align='center'>With some help from:</Typography>
            <Typography align='center'>
              {props.poem.authors.map((author, i) => {
                  return <span key={i}>{i !== 0 && <span>, </span>}{author}</span>
              })}
            </Typography>
            <hr></hr>
            <Typography align='center'>On {props.poem.date}</Typography>
        </CardContent>
    </Card>
  )
}

export default Poem