import { Box, Typography, Card, Tooltip } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import Layout from "./Layout";
import FormDialog from "./Dialog";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { token } from "../utils/getToken";
import { Delete } from "@mui/icons-material";

function DashboardC() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [rerender, setRerender] = useState(false);

  const getProjects = async () => {
    let response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/api/projects`,
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );

    if (response.status === 200) {
      setData(response.data);
    }
  };

  const handleDelete = async (id) => {
    let response = await axios.delete(
      `${import.meta.env.VITE_APP_API_URL}/api/deleteFolderById/${id}`,
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );

    if (response.status === 200) {
      getProjects();
    }
  };

  useEffect(() => {
    try {
      getProjects();
    } catch (err) {
      console.log(err);
    }
  }, [rerender]);

  console.log("data", data);

  return (
    <Layout>
      <Box
        p={"0px 20px"}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        gap={"20px"}
      >
        <Box
          mt={"32px"}
          padding={"10px 20px"}
          sx={{
            background:
              "linear-gradient(90deg, rgba(115,100,255,1) 0%, rgba(189,8,215,1) 50%, rgba(255,0,202,1) 100%);",
          }}
          borderRadius={"20px"}
          maxWidth={"md"}
          width={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            color="#fff"
            fontFamily={"Caveat, cursive"}
            variant="h5"
            fontWeight={600}
          >
            Your Folders 😍
          </Typography>
          <FormDialog type={"folder"} setRerender={setRerender} />
        </Box>
        <Box
          maxWidth={"xl"}
          width="100%"
          sx={{ display: "flex", flexWrap: "wrap", gap: "16px", mt:5, pb:10 }}
        >
          {data?.map((item) => (
            <Box key={item._id} maxWidth="270px" width={"100%"}>
               <Box sx={{ textAlign: "right" }}>
                <Tooltip placement="right-end" title="Delete folder">
                  <Box onClick={() => handleDelete(item._id)}>
                    <Delete sx={{ color: "#C63C51", cursor: "pointer" }} />
                  </Box>
                </Tooltip>
              </Box>
              <Card
                onClick={() => navigate(`/folder/${item._id}`)}
                elevation={1}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "10px",
                  alignItems: "center",
                  padding: "10px 20px",
                  border: "0.5px solid black",
                  color: "#000",
                  cursor: "pointer",
                }}
              >
                <FolderIcon sx={{ fontSize: "35px", color: "#bd68d7" }} />
                <Typography
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
                  variant="subtitle1"
                  fontWeight={400}
                  fontFamily={"Inter"}
                >
                  {item.name}
                </Typography>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Layout>
  );
}

export default DashboardC;
