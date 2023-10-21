import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ConfirmDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Підтвердити видалення</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Ви впевнені, що хочете видалити цю карту?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Скасувати
                </Button>
                <Button onClick={onConfirm} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
