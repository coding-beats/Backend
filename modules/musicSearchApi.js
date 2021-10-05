const axios = require('axios');
let cacheMemory = {};

// get music Handler fun
function getMusicSearchHandler(req, res) {
  let songName = req.query.song;
  // console.log(req.query);

  let musicURL = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/songs/list-recommendations',
      params: {key: songName, locale: 'en-US'},
      headers: {
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.MUSIC_API_KEY}`
    }
  };
  // console.log(musicURL);
  // console.log('before sending request');
  if (cacheMemory[songName] !== undefined) {
    // console.log("the data is already exist");
    // console.log(cacheMemory);
    res.send(cacheMemory[songName]);
  }
  else {
    try {
      axios.request(musicURL).then(MusicResults => {
        // console.log(MusicResults);
        // console.log("hi",MusicResults.data.tracks.hits[0].images);
        // console.log('inside sending request');

        let newMusicArray = MusicResults.data.tracks.hits.map(element => {
          return new MusicData(element);
        });
        cacheMemory[songName] = newMusicArray;
        res.send(newMusicArray);
      });
    }
    catch (error) {
      res.send(error);
    }

  }
  // console.log('after sending request');
}

// music class
class MusicData {
  constructor(element) {
    this.img = element.track.images.coverart
    this.title = element.track.title;
    this.artist = element.track.subtitle;
    this.songURL = element.track.url;
  }
}
console.log(MusicData)



module.exports = getMusicSearchHandler;
