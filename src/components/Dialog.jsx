import * as React from 'react';
import axios from 'axios';
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
import { token } from '../utils/getToken'; // Assuming you have a utility to get the auth token

export default function FormDialog({ type, setRerender, projectId="" }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const name = formJson.textfieldname;

        try {
            if (type === "folder") {
                // Create a new project (folder)
                const response = await axios.post(
                    `${import.meta.env.VITE_APP_API_URL}/api/projects`,
                    { name },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setRerender((old) => !old)
                console.log("Project created:", response.data);
            } else {
                // Create a new file within a project
                const response = await axios.post(
                    `${import.meta.env.VITE_APP_API_URL}/api/files`,
                    { name, projectId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                setRerender((old) => !old)
                console.log("File created:", response.data);
            }
            handleClose();
        } catch (error) {
            console.error("Error creating resource:", error);
        }
    };

    return (
        <React.Fragment>
            <Tooltip title={type === "folder" ? "Create Folder" : "Create File"}>
                <AddIcon onClick={handleClickOpen} sx={{ color: "#fff", cursor: "pointer" }} />
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit,
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
