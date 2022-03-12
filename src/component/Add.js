import { Button, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

const Add = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: ""
    })
    const [, forceUpdate] = useState();
    const navigate = useNavigate();
    const simpleValidator = useRef(new SimpleReactValidator())



    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            await axios.post("https://reqres.in/api/users", formData)
            console.log(formData);
            navigate('/')

        } else {
            simpleValidator.current.showMessages();
            forceUpdate(1)
        }

    }

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item sm={12} textAlign="center">
                        <Typography variant="h3" component="div" gutterBottom>
                            Add User
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <TextField fullWidth label="First Name" name='first_name' value={formData.first_name} onChange={handleOnChange} variant="outlined" onBlur={() => simpleValidator.current.showMessageFor('first_name')} />
                        {simpleValidator.current.message('first_name', formData.first_name, 'required')}

                    </Grid>
                    <Grid item sm={12}>
                        <TextField fullWidth label="Last Name" name='last_name' value={formData.last_name} onChange={handleOnChange} variant="outlined" onBlur={() => simpleValidator.current.showMessageFor('last_name')} />
                        {simpleValidator.current.message('last_name', formData.last_name, 'required')}

                    </Grid>
                    <Grid item sm={12}>
                        <TextField fullWidth label="Email" name='email' value={formData.email} onChange={handleOnChange} variant="outlined" onBlur={() => simpleValidator.current.showMessageFor('email')} />
                        {simpleValidator.current.message('email', formData.email, 'required|email')}

                    </Grid>
                    <Grid item sm={12} textAlign="center">
                        <Button type='submit' variant="outlined">Save</Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default Add;