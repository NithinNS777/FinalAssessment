import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { Box, Stack } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = () => {
    axios.get("http://localhost:3001/get")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        alert("Blog deleted successfully");
        fetchBlogs();
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
      });
  };

  const navigateToUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Stack
        spacing={4}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
      >
        {/* --- FIX: Added .filter() to remove blank cards --- */}
        {blogs
          .filter(blog => blog.title && blog.content && blog.img_url)
          .map((blog) => (
            <Card key={blog._id} sx={{ maxWidth: 345, flexGrow: 1 }}>
              <CardMedia
                component="img"
                height="194"
                image={blog.img_url}
                alt={blog.title}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {blog.title}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {blog.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => deleteBlog(blog._id)} variant="contained" color="secondary" size="small">
                  DELETE
                </Button>
                <Button onClick={() => navigateToUpdate(blog._id)} variant="contained" color="secondary" size="small">
                  UPDATE
                </Button>
              </CardActions>
            </Card>
          ))}
      </Stack>
    </Box>
  );
}

export default Home;