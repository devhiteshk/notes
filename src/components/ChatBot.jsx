import { useState } from "react";
import {
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";
import axios from "axios";
import { token } from "../utils/getToken";
import { overrides } from "../overrides";

const ChatbotPopup = ({ handleUpdateFromChatbot }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, sender: "user" }];
      setMessages(newMessages);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/chat`,
          { message: input },
          {
            headers: {
              Authorization: `Bearer ${token()}`,
            },
          }
        );

        const botMessage = JSON.parse(response?.data?.response + "");
        console.log("botMessage", botMessage);

        // Update the Excalidraw canvas with the new elements
        if (botMessage?.elements)
          handleUpdateFromChatbot(botMessage.elements || [{}]);

        setMessages([
          ...newMessages,
          { text: botMessage.message, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error communicating with the chatbot:", error);
        setMessages([
          ...newMessages,
          { text: "Error communicating with the chatbot.", sender: "bot" },
        ]);
      }

      setInput("");
    }
  };

  return (
    <>
      <IconButton
        color="primary"
        onClick={toggleDrawer}
        style={{
          borderRadius: 9,
          zIndex: 20,
          position: "fixed",
          bottom: 70,
          right: 17,
          backgroundColor: "#ececf4",
          color: "white",
        }}
      >
        <ChatIcon sx={{ color: "#000" }} fontSize="small" />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          style: { maxWidth: 450, width: "100%", backgroundColor: "#fff" },
        }}
      >
        <AppBar
          position="static"
          sx={{
            background:
              "linear-gradient(90deg, rgba(115,100,255,1) 0%, rgba(189,8,215,1) 50%, rgba(255,0,202,1) 100%);",
          }}
          style={{ backgroundColor: "#7B1FA2" }}
        >
          <Toolbar>
            <Typography
              variant="h5"
              fontFamily="Caveat, cursive"
              fontWeight={600}
              style={{ flexGrow: 1 }}
            >
              Your AI assistant
            </Typography>
            <IconButton edge="end" color="inherit" onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          style={{
            padding: 16,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box style={{ flexGrow: 1, overflowY: "auto" }}>
            {messages.map((message, index) => (
              <Box
                align={message.sender === "user" ? "right" : "left"}
                mb={3}
                key={index}
              >
                <Typography
                  sx={{
                    backgroundColor:
                      message.sender === "user" ? "#E2BFD9" : "#C8A1E0",
                    width: "fit-content",
                    borderRadius: "40px",
                    padding: "12px 24px",
                    maxWidth: { xs: "270px", md: "310px", lg: "360px" },
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontStyle: "italic",
                  }}
                >
                  {message.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box style={{ display: "flex", padding:"16px" }}>
          <TextField
            size="small"
            fullWidth
            sx={overrides}
            variant="outlined"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            style={{ backgroundColor: "white", borderRadius: 4 }}
          />
          <Button
            size="small"
            variant="contained"
            onClick={sendMessage}
            style={{
              fontFamily: "Caveat, cursive",
              marginLeft: 8,
              backgroundColor: "rgba(189,8,215,1)",
              color: "white",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Send
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default ChatbotPopup;
