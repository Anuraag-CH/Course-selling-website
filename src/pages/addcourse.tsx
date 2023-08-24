import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import axios from "axios";

function AddCourse() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const handleAddCourse = async () => {
    try {
      await axios.post(`/api/admin/courses`, {
        title: title,
        description: description,
        imageLink: image,
        published: true,
        price: price,
      });
      alert("Added course!");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the course.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "80vh",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant="outlined"
          style={{ width: 400, padding: 20, marginTop: 30, height: "100%" }}
        >
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setImage(e.target.value)}
            fullWidth={true}
            label="Image link"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setPrice(Number(e.target.value))}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />

          <Button size="large" variant="contained" onClick={handleAddCourse}>
            Add course
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default AddCourse;
