import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import ItemList from './ItemList';

export default function MainContent({ items, modal, handleOpen, handleClose, deleteItem, editItem, setEditing, setInputs }) {
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
                </Box>
            ) : (
                <Container sx={{width:'1000px'}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{marginTop: '20px',}}>
                        <Typography variant="h6" sx={{ marginBottom: '10px'}}>Your Items</Typography>
                        <Button onClick={() => handleOpen('ADD')} variant="contained">Add item</Button>
                    </Stack>
                    <ItemList items={items} editItem={editItem} deleteItem={deleteItem} setEditing={setEditing} handleOpen={handleOpen} setInputs={setInputs} />
                </Container>
            )
        }
    </>
    )
}
