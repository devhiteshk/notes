import { useState, useRef, useEffect } from "react";
import {
  convertToExcalidrawElements,
  Excalidraw,
} from "@excalidraw/excalidraw";
import { Box, Paper, Tooltip } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { useParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import axios from "axios";
import { token } from "../utils/getToken";
import ChatbotPopup from "./ChatBot";
import { initialElementsArray } from "../initialElements";

const ExcalidrawComponent = () => {
  const excalidrawRef = useRef(null);
  const { id } = useParams();
  const [theme, setTheme] = useState("light");
  const [elements, setElements] = useState([]);
  const [debouncedElements] = useDebounce(elements, 3000);
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  const handleThemeChange = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const fetchInitialElements = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/files/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }
      );

      const data = response.data;
      const initialElements = data.content ? JSON.parse(data.content) : [];

      if (initialElements?.length === 0) {
        setElements(initialElementsArray);
      } else {
        setElements(initialElements || []);
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const saveToDatabase = async (elements) => {
    let filteredElements = elements.filter((i) => !i.isDeleted);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/api/files/${id}`,
        { content: JSON.stringify(filteredElements) },
        {
          headers: {
            Authorization: `Bearer ${token()}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    fetchInitialElements(); // Fetch initial elements on component mount
  }, []);

  const handleUpdateFromChatbot = (newElements) => {
    if (excalidrawAPI) {
      setElements((prevElements) => {
        const newExcaliElements = convertToExcalidrawElements(newElements);
        const updatedElements = [...prevElements, ...newExcaliElements];

        excalidrawAPI.updateScene({
          elements: updatedElements,
        });

        return updatedElements;
      });
    }
  };

  useEffect(() => {
    if (debouncedElements?.length > 0) {
      saveToDatabase(debouncedElements); // Save debounced elements to the database
    }
  }, [debouncedElements]);

  const onChange = (excalidrawElements, appState, files) => {
    if (
      excalidrawElements?.length > 0 &&
      JSON.stringify(excalidrawElements) !== JSON.stringify(elements)
    ) {
      setElements(excalidrawElements);
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {elements && elements.length > 0 && (
        <Excalidraw
          excalidrawAPI={(api) => setExcalidrawAPI(api)}
          ref={excalidrawRef}
          theme={theme}
          onChange={onChange}
          initialData={{
            elements,
            scrollToContent: true,
          }}
          renderTopRightUI={() => {
            return (
              <Tooltip title={theme === "light" ? "Dark Mode" : "Light Mode"}>
                <Paper
                  elevation={3}
                  sx={{
                    zIndex: 4,
                    mt: 1,
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    backgroundColor: theme === "light" ? "#fff" : "#232329",
                  }}
                  onClick={handleThemeChange}
                >
                  <Box
                    sx={{ padding: 0, margin: 0 }}
                    color={theme === "light" ? "#000" : "#fff"}
                    aria-label="toggle theme"
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {theme === "light" ? (
                      <ModeNightIcon fontSize="10px" />
                    ) : (
                      <WbSunnyIcon fontSize="10px" />
                    )}
                  </Box>
                </Paper>
              </Tooltip>
            );
          }}
        />
      )}
      <ChatbotPopup handleUpdateFromChatbot={handleUpdateFromChatbot} />
    </div>
  );
};

export default ExcalidrawComponent;
