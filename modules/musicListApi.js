const axios = require('axios');
let cacheMemory = {};

// get music Handler fun
function getMusicListHandler(req, res) {
  let songName = req.query.song;
  // console.log(req.query);

  let musicURL = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/search',
    params: {term: songName, locale: 'en-US', limit: '1'},
    headers: {
      'x-rapidapi-host': 'shazam.p.rapidapi.com',
      'x-rapidapi-key': 'ca1fe05a67msh803e5c79cd99588p194cb2jsn3f78b68111df'
    }
  };
  console.log(musicURL);
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
        console.log(123123123, MusicResults.data.tracks.hits);
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
    this.title = element.track.title;
    this.artist = element.track.subtitle;
    this.songURL = element.track.url;
  }
}
console.log(MusicData)



module.exports = getMusicListHandler;
