import * as React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '460px',
  height: '240px',
  bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
  p: 4,
};

export default function DeleteModal({ open, setDeleteModal, deleteItem, deleteId }) {

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setDeleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style} elevation={3}>
            <Stack sx={{height:'100%'}} direction="column" justifyContent="space-between">
                <div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Delete Item?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete this item? This can't be undone.
                </Typography>
                </div>
                <Stack direction="row" justifyContent="flex-end">
                    <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
                    <Button onClick={() => deleteItem(deleteId)} variant="contained">Delete</Button>
                </Stack>
            </Stack>
        </Paper>
    
      </Modal>
    </div>
  );
}
