import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Modal from '@mui/material/Modal';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '430px',
  height: '580px',
  bgcolor: 'background.paper',
};

function AddText() {
    return (
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Add an Item
            </Typography>
            <Typography id="modal-modal-title" variant="body1" component="h3">
                Add your new item below
            </Typography>
        </div>
    )
}

function EditText() {
    return (
        <div>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Edit an Item
            </Typography>
            <Typography id="modal-modal-title" variant="body1" component="h3">
                Edit your item below
            </Typography>
        </div>
    )
}

export default function AddEditModal({ open, mode, handleClose }) {
  useEffect(()=>{}, [ mode ]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
            <Stack sx={{backgroundColor: '#FAFAFA', p: 2, borderBottom: '0.5px solid #D5DFE9'}} direction="row" justifyContent="space-between">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    SHOPPING LIST
                </Typography>
                <ArrowForwardIosIcon />
            </Stack>
            <Stack sx={{ p: 2, height: '480px' }} direction="column" justifyContent="space-between">
                {
                    mode === 'ADD' ? (
                        <AddText />
                    ) : (
                        <EditText />
                    )
                }
                <Stack sx={{height: '100%'}} direction="column" justifyContent="space-between">
                    <Stack sx={{height: '100%'}}direction="column">
                        <TextField sx={{ margin: '8px 0 '}} label="Item name" variant="outlined" />
                        <TextField sx={{ margin: '8px 0 '}} label="Description" variant="outlined" multiline minRows={4}/>
                        <FormControl fullWidth>
                            <Select
                            sx={{ margin: '8px 0 '}}
                            // value={age}
                            label="How many?"
                            // onChange={handleChange}
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="row" justifyContent="flex-end">
                        <Button onClick={handleClose} sx={{color:'black'}}>Cancel</Button>
                        <Button variant="contained">
                        {
                            mode === 'ADD' ? (
                                <>Add Task</>
                            ) : (
                                <>Save Item</>
                            )
                        }
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
      </Modal>
    </div>
  );
}
