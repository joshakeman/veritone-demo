import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress';

import AddEditModal from '../components/AddEditModal'
export default function ListContainer() {
    const [items, setItems] = useState([])
    const [isFetching, setIsFetching] = useState(false)
    const [modal, setModal] = useState({isOpen: false, mode: ''})

    useEffect(() => {
        fetchItems()
    })

    function fetchItems() {
        // setIsFetching(true)
        
        // fetch('http://localhost:8080/items')
        // .then(response => response.json())
        // .then(data => console.log(data));
        
        // setIsFetching(false)
    }

    function handleOpen( mode ) {
        setModal({
            isOpen: true,
            mode
        })
    }

    function handleClose() {
        setModal({
            isOpen:false
        })
    }

    return (
        <>
            {
            isFetching ? (
                <CircularProgress sx={{marginTop:'120px'}}/>
            ) : (
                <Box
                sx={{ p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column', 
                    border: '1px solid lightgray', 
                    borderRadius: '10px',
                    width: '520px',
                    height: '240px',
                    marginTop: '100px' 
                }}>
                <Typography variant="h6" sx={{color:'gray', marginBottom: '10px'}}>Your shopping list is empty :(</Typography>
                <Button onClick={() => handleOpen('ADD')} variant="contained">Add your first item</Button>
                <AddEditModal mode={modal.mode} open={modal.isOpen} handleClose={handleClose} />
                </Box>
            )
        }
    </>
    )
}
