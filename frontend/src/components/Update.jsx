import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get the blog ID from the URL

  // Fetch the existing blog data when the component loads
  useEffect(() => {
    axios.get(`http://localhost:3001/get/${id}`)
      .then((res) => {
        setInputs(res.data); // Pre-fill the form with existing data
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Function to send the updated data to the backend
  const updateData = async () => {
    try {
      await axios.put(`http://localhost:3001/update/${id}`, inputs);
      alert("Blog updated successfully");
      navigate("/"); // Navigate back to home page
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "600px",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Title"
          onChange={inputHandler}
          name="title"
          value={inputs.title}
          fullWidth
        />
        <TextField
          variant="outlined"
          placeholder="Content"
          onChange={inputHandler}
          name="content"
          value={inputs.content}
          multiline
          rows={4}
        />
        <TextField
          variant="outlined"
          placeholder="Image URL"
          onChange={inputHandler}
          name="img_url"
          value={inputs.img_url}
        />
        <Button variant="contained" color="secondary" onClick={updateData}>
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default Update;