import React from 'react'
import { Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material'

const Poem = (props) => {
  return (
    <Card style={{maxWidth:600, margin:'0 auto', padding: '20px 5px'}}>
        <CardContent>
            {props.page === 'feed' && <Typography gutterBottom variant='h5'>By {props.poem.userName}</Typography>}
            {props.poem.lines.map((line, i) => {
                return <div key={i}>{line}</div>
            })}
            <hr></hr>
            <div>With some help from:</div>
            {props.poem.authors.map((author, i) => {
                return <span key={i}>{i !== 0 && <span>, </span>}{author}</span>
            })}
            <hr></hr>
            <div>On {props.poem.date}</div>
        </CardContent>
    </Card>
  )
}

export default Poem