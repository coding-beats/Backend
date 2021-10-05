"use strict";

const express = require("express");
const server = express(); 
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT;
const MONGO_SERVER = process.env.MONGO_SERVER

mongoose.connect(`${MONGO_SERVER}`);

const getMusicListHandler = require('./modules/musicListApi.js');
const getMusicSearchHandler = require('./modules/musicSearchApi.js');
const {getMusicHandler, createMusicHandler, deleteMusicHandler, UpdateMusicHandler} = require("./modules/musicHandler");

// Routes
server.get('/', homeRouteHandler);
server.get('/getMusicList', getMusicListHandler);
server.get('/getMusicSearch', getMusicSearchHandler);
server.get('/getMusic', getMusicHandler);
server.post('/createMusic', createMusicHandler);
server.delete('/deleteMusic', deleteMusicHandler);
server.put('/updateMusic', UpdateMusicHandler);
server.get('*', notFoundHandler);

// Function Handlers
function homeRouteHandler(req, res) {
    res.send('home route');
  }
  
  function notFoundHandler(req, res) {
    res.status(404).send('NOT FOUND!!');
  }
  
  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });