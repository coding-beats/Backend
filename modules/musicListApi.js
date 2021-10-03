const axios = require('axios');
let cacheMemory = {};

// get music Handler fun
function getMusicListHandler(req, res) {
  let songName = req.query.song;
  // console.log(req.query);

  let musicURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${songName}&key=${process.env.MUSIC_API_KEY}`;
  // console.log(musicURL);
  // console.log('before sending request');
  if (cacheMemory[songName] !== undefined) {
    // console.log("the data is already exist");
    // console.log(cacheMemory);
    res.send(cacheMemory[songName]);
  }
  else {
    try {
      axios.get(musicURL).then(MusicResults => {
        // console.log(MusicResults);
        // console.log(MusicResults.data);
        // console.log('inside sending request');

        let newMusicArray = MusicResults.data.data.map(element => {
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
    // this.date = element.datetime;
    // this.desc = element.weather.description;
  }
}

module.exports = getMusicListHandler;
