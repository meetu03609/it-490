import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';

const BASE_API_URL = 'http://192.168.10.55:8000';


export default function AlignItemsList() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    axios.get(`${BASE_API_URL}/messages`)
    .then(res => {
      setMessages(res.data.Messages);
    })
  }

  const _handleKeyDown = e => {
    if (e.key === 'Enter') {
      if (!newMsg)
        alert('Message is empty')
      else {
        axios.post(`${BASE_API_URL}/messages`, {message: newMsg})
        .then(res => {
          fetchMessages();
        }) 
      }
    }
  }

  return (
    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '80ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <TextField id="outlined-basic" value={newMsg} onKeyDown={_handleKeyDown} onChange={e => setNewMsg(e.target.value)} label="Enter Message" variant="outlined" />
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {messages.length <= 0 && <div>No Message</div>}
      {messages.map((message, i) => (
        <React.Fragment key={i}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="RabbitMQ MSG"
              secondary={
                <React.Fragment>
                  {message.message}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
    </Box>
  );
}
