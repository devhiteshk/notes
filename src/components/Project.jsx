import { Box, Typography, Card } from "@mui/material";
import Layout from "./Layout";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import FormDialog from "./Dialog";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { token } from "../utils/getToken";

function ProjectC() {
  const [data, setData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [rerender,setRerender] = useState(false)

  const getProjects = async () => {
    let response = await axios.get(
      `${import.meta.env.VITE_APP_API_URL}/api/filesbyProjectId/${params.id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status === 200) {
      setData(response.data);
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
          backgroundColor="#673ab7"
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
            {data?.[0]?.project?.name}
          </Typography>
          <FormDialog type={"file"} projectId={params.id} setRerender={setRerender} />
        </Box>
        <Box maxWidth={"xl"} width="100%" display={"flex"} flexWrap={"wrap"} gap={"16px"}>
          {data?.map((item) => (
            <Box key={item._id} maxWidth="270px" width="100%">
              <Card
                onClick={() => navigate(`/canvas/${item._id}`)}
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
                <FileOpenIcon
                  sx={{ fontSize: "50px", color: "rgba(115,100,255,1)" }}
                />
                <Typography
                  variant="subtitle1"
                  overflow={"hidden"}
                  textOverflow={"ellipsis"}
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

export default ProjectC;
