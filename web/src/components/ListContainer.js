import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'

import AddEditModal from '../components/AddEditModal'
export default function ListContainer() {
    return (
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
            <Button variant="contained">Add your first item</Button>
            <AddEditModal mode="" />
        </Box>
    )
}
