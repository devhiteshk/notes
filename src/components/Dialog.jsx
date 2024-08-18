/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { overrides } from '../overrides';

export default function FormDialog({ type }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Tooltip title="Create Folder">
                <AddIcon onClick={handleClickOpen} sx={{ color: "#fff", cursor: "pointer" }} />
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData).entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>{type === "folder" ? "Create Folder" : "Create File"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {type === "folder" ? "To create new folder, please enter your folder name here." : "To create new file, please enter your file name here."}
                    </DialogContentText>
                    <Box sx={{ marginTop: "20px" }}>
                        <TextField
                            autoFocus
                            hiddenLabel
                            id="filled-hidden-label-small"
                            name="textfieldname"
                            placeholder={type === "folder" ? "Folder Name" : 'File Name'}
                            type="text"
                            fullWidth
                            variant="outlined"
                            sx={overrides}
                            required
                            size='small'
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Create</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}