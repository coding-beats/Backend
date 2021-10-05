const axios = require('axios');
let cacheMemory = {};

// get music Handler fun
function getMusicSearchHandler(req, res) {
  let songName = req.query.songID;
  // console.log(req.query);

  let musicURL = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/songs/list-artist-top-tracks',
    params: { id: songName, locale: 'en-US' },
    headers: {
      'x-rapidapi-host': 'shazam.p.rapidapi.com',
      'x-rapidapi-key': `${process.env.MUSIC_API_KEY}`
    }
  };
  // console.log(musicURL);
  // console.log('before sending request');
  try {
    axios.request(musicURL).then(MusicResults => {
      // console.log("test",MusicResults.data.tracks);
      // console.log( MusicResults.data.tracks.hits);
      // console.log('inside sending request');
      let newMusicArray = MusicResults.data.tracks.map(element => {
        return new MusicData(element);
      });
      cacheMemory[songName] = newMusicArray;
      res.send(newMusicArray);
    });
  }
  catch (error) {
    res.send(error);
  }
  // console.log('after sending request');
}

// music class
class MusicData {
  constructor(element) {
    this.img = element.images.coverart
    this.title = element.title;
    this.artist = element.subtitle;
    this.songURL = element.url;
  }
}
console.log(MusicData)



module.exports = getMusicSearchHandler;
