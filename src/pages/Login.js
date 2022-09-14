import React, {useState, useEffect} from 'react'
import { Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material'
import DataService from "../dataService";

const Login = () => {

    useEffect(() => {
        const getStatus = async () => {
            const status = await DataService.checkLogin()
            console.log(status);
        }
        getStatus()
    }, [])
    
    const defaultValues = {
      email: "",
      password: "",
    };

    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormValues({
        ...formValues,
        [name]: value,
      });
    };

    const handleSubmit = e => {
        e.preventDefault();
        DataService.login(formValues);
        console.log(formValues);
    }

    return (
      <Card style={{maxWidth:600, margin:'0 auto', padding: '20px 5px'}}>
          <CardContent>
              <Typography gutterBottom variant='h5'>Log In</Typography>
              <form onSubmit={handleSubmit}>
                  <Grid container spacing={1}>
                      <Grid xs={12} sm={6} item>
                          <TextField name='email' value={formValues.email} onChange={handleInputChange} type='email' label='Email' placeholder='Enter Email' variant='outlined' fullWidth required></TextField>
                      </Grid>
                      <Grid xs={12} sm={6} item>
                          <TextField name='password' value={formValues.password} onChange={handleInputChange} label='Password' placeholder='Enter Password' variant='outlined' fullWidth required></TextField>
                      </Grid>
                      <Grid xs={12}item>
                          <Button type='submit' variant='contained' color='primary' fullWidth>Submit</Button>
                      </Grid>
                  </Grid>
              </form>
          </CardContent>
      </Card>
    )
}

export default Login