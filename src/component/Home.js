import { Add, Delete } from '@mui/icons-material';
import { Avatar, Divider, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {


    const [result, setResult] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const res = await axios.get('https://reqres.in/api/users')
        setResult(res.data.data)
    }

    const sort = (e) => {
        const value = e.target.value
        const temp = [...result]
        if (value === 1) {
            temp.sort((a, b) => a.first_name > b.first_name ? 1 : -1)
        } else if (value === 2) {
            temp.sort((a, b) => a.first_name > b.first_name ? -1 : 1)

        }
        setResult(temp)
    }
    const deleteElement = (i) => {
        const temp = [...result]
        temp.splice(i, 1)
        setResult(temp)
    }

    return (
        <>

            <Grid container direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item>
                    <FormControl style={{ width: '100px' }}>
                        <InputLabel id="demo-simple-select-label">Sort</InputLabel>

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"

                            label="Sort"
                            onChange={sort}
                        >
                            <MenuItem value={1}>A-Z</MenuItem>
                            <MenuItem value={2}>Z-A</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Link to='/add'><Add /></Link>
                </Grid>

            </Grid>
            <Grid container>
                <Grid item sm={12}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {result.map((r, i) => {
                            return (<>
                                <ListItem alignItems="flex-start"
                                    key={i}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => {
                                            deleteElement(i);
                                        }}>
                                            <Delete />
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar alt={r.first_name} src={r.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={`${r.first_name} ${r.last_name}`}
                                        secondary={
                                            <React.Fragment>

                                                {r.email}
                                            </React.Fragment>
                                        }

                                    />

                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </>)
                        })}

                    </List>
                </Grid>

            </Grid>


        </>
    );
}

export default Home;