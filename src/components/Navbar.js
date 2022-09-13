import React from 'react'
import { AppBar, Toolbar, Typography, Stack, Button} from '@mui/material'

const Navbar = (props) => {
  return (
    <AppBar position='static' color='primary'>
        <Toolbar>
            <Typography onClick={() => {props.setPage('landing')}} variant='h6' component='div' sx={{flexGrow: 1}}>
                CAESURA
            </Typography>
            <Stack direction='row' spacing='2'>
                <Button onClick={() => {props.setPage('create')}} color='inherit'>Create</Button>
                <Button onClick={() => {props.setPage('login')}} color='inherit'>Login</Button>
                <Button onClick={() => {props.setPage('signup')}} color='inherit'>Signup</Button>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar