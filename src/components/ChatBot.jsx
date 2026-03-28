import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import axios from "axios";
import { token } from "../utils/getToken";

const Avatar = ({ isBot }) => (
  <div
    style={{
      width: 28,
      height: 28,
      borderRadius: "50%",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: isBot
        ? "linear-gradient(135deg, #7364ff, #bd08d7)"
        : "#e2e8f0",
      color: isBot ? "#fff" : "#64748b",
      fontSize: 14,
    }}
  >
    {isBot ? <SmartToyIcon style={{ fontSize: 16 }} /> : "U"}
  </div>
);

const TypingIndicator = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}>
    <Avatar isBot />
    <div
      style={{
        background: "#f1f5f9",
        borderRadius: "18px 18px 18px 4px",
        padding: "10px 16px",
        display: "flex",
        gap: 4,
        alignItems: "center",
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{ width: 6, height: 6, borderRadius: "50%", background: "#94a3b8" }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  </div>
);

const MessageBubble = ({ message, index }) => {
  const isUser = message.sender === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: 8,
        marginBottom: 12,
      }}
    >
      <Avatar isBot={!isUser} />
      <div
        style={{
          maxWidth: "72%",
          padding: "10px 14px",
          borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          background: isUser
            ? "linear-gradient(135deg, #7364ff, #bd08d7)"
            : "#f1f5f9",
          color: isUser ? "#fff" : "#1e293b",
          fontSize: 14,
          lineHeight: 1.55,
          boxShadow: isUser
            ? "0 2px 12px rgba(115,100,255,0.3)"
            : "0 1px 4px rgba(0,0,0,0.06)",
        }}
      >
        {isUser ? (
          message.text
        ) : (
          <ReactMarkdown
            components={{
              p: ({ children }) => <p style={{ margin: 0 }}>{children}</p>,
              code: ({ children }) => (
                <code
                  style={{
                    background: "#e2e8f0",
                    borderRadius: 4,
                    padding: "1px 5px",
                    fontSize: 12,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre
                  style={{
                    background: "#1e293b",
                    color: "#e2e8f0",
                    borderRadius: 8,
                    padding: "10px 14px",
                    overflowX: "auto",
                    fontSize: 12,
                    margin: "6px 0 0",
                  }}
                >
                  {children}
                </pre>
              ),
            }}
          >
            {message.text}
          </ReactMarkdown>
        )}
      </div>
    </motion.div>
  );
};

const ChatbotPopup = ({ handleUpdateFromChatbot }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userInput = input;
    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/chat`,
        { message: userInput },
        { headers: { Authorization: `Bearer ${token()}` } }
      );
      const botMessage = response?.data;
      if (botMessage?.elements) handleUpdateFromChatbot(botMessage.elements || []);
      setMessages([...newMessages, { text: botMessage.message, sender: "bot" }]);
    } catch {
      setMessages([...newMessages, { text: "Something went wrong. Please try again.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB trigger */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{ position: "fixed", bottom: 70, right: 17, zIndex: 20 }}
      >
        <IconButton
          onClick={() => setOpen(true)}
          style={{
            background: "linear-gradient(135deg, #7364ff, #bd08d7)",
            borderRadius: 12,
            padding: 10,
            boxShadow: "0 4px 20px rgba(115,100,255,0.45)",
          }}
        >
          <ChatIcon style={{ color: "#fff", fontSize: 22 }} />
        </IconButton>
      </motion.div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              style={{
                position: "fixed",
                bottom: 130,
                right: 17,
                width: 380,
                height: 540,
                background: "#fff",
                zIndex: 1300,
                display: "flex",
                flexDirection: "column",
                borderRadius: 20,
                boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: "8px 16px",
                  background: "linear-gradient(135deg, #7364ff 0%, #bd08d7 60%, #ff00ca 100%)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <SmartToyIcon style={{ color: "#fff", fontSize: 20 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "Inter, sans-serif" }}>
                    AI Assistant
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>
                    {loading ? "Thinking..." : "Online"}
                  </div>
                </div>
                <IconButton onClick={() => setOpen(false)} size="small" style={{ color: "#fff" }}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>

              {/* Messages */}
              <div
                style={{
                  flex: 1, overflowY: "auto", padding: "20px 16px",
                  display: "flex", flexDirection: "column",
                  background: "#fafafa",
                }}
              >
                {messages.length === 0 && (
                  <div
                    style={{
                      flex: 1, display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      color: "#94a3b8", gap: 12, textAlign: "center",
                    }}
                  >
                    <SmartToyIcon style={{ fontSize: 48, opacity: 0.3 }} />
                    <div style={{ fontSize: 14 }}>Ask me anything about your canvas</div>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <MessageBubble key={i} message={msg} index={i} />
                ))}
                {loading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                style={{
                  padding: "12px 16px",
                  borderTop: "1px solid #e2e8f0",
                  background: "#fff",
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <textarea
                  rows={2}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Message AI assistant... (Shift+Enter for newline)"
                  style={{
                    flex: 1,
                    resize: "none",
                    border: "1.5px solid #e2e8f0",
                    borderRadius: 12,
                    padding: "10px 14px",
                    fontSize: 14,
                    fontFamily: "Inter, sans-serif",
                    outline: "none",
                    lineHeight: 1.5,
                    background: "#f8fafc",
                    color: "#1e293b",
                    transition: "border-color 0.2s",
                    overflowY: "hidden",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#7364ff")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  style={{
                    width: 40, height: 40,
                    borderRadius: 12,
                    border: "none",
                    cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                    background: input.trim() && !loading
                      ? "linear-gradient(135deg, #7364ff, #bd08d7)"
                      : "#e2e8f0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                >
                  <SendIcon style={{ fontSize: 18, color: input.trim() && !loading ? "#fff" : "#94a3b8" }} />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotPopup;
