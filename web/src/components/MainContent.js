import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import AddEditModal from './AddEditModal';

export default function MainContent({ items, modal, handleOpen, handleClose }) {
    return (
        <>
        {
            items.length === 0 || items == undefined ?
            (
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
            ) : (
                <p>Got Items</p>
            )
        }
    </>
    )
}
