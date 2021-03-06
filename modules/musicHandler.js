'use strict';

const { musicModel } = require("./music.js");

//function to get all data inside db
let getMusicHandler = (req, res) => {
    let email1 = req.query.email;
    musicModel.find({ email: email1 }).then(data => {
        res.json(data);
    })
        .catch((error) => {
            res.statu(500).send('error there is no data to get');
        });
}

//function to create a new music
let createMusicHandler = async (req, res) => {
    console.log("body",req.body);
    let {img1, title1, artist1, note1, songUrl1, email1 } = req.body;
    await musicModel.create({
        title: title1,
        artist: artist1,
        note: note1,
        songUrl : songUrl1,
        email: email1,
        img: img1
    })

    musicModel.find({ email: email1 }).then(data => {
        console.log("line 28",data);
        res.status(200).json(data);
    }).catch((error) => {
        res.status(500).send('error there is no recived data');
    });
}

//function to delete a specific data from db
let deleteMusicHandler = (req, res) => {

    let id1 = req.query.musicID;

    let email1 = req.query.email;

    musicModel.findByIdAndDelete({ _id: id1 }).then(() => {
        musicModel.find({ email: email1 }).then(data => {
            res.status(200).json(data);
        })
    }).catch((error) => {
        res.status(500).send('error there is no file');
    });
}

//function to update a specific data from db
let UpdateMusicHandler = (req, res) => {

    let { img, title, artist, note, songUrl, id, email } = req.body;
    console.log("req.body",req.body);
    musicModel.findByIdAndUpdate(id, { img, title, artist, note, songUrl }).then(() => {
        musicModel.find({ email: email }).then(data => {
            console.log("data",data);
            res.status(200).json(data);
        })
    }).catch((error) => {
        res.status(500).send('error there is no file');

    });
}

module.exports = {
    getMusicHandler,
    createMusicHandler,
    deleteMusicHandler,
    UpdateMusicHandler,
}