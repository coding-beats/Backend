const axios = require('axios');
let cacheMemory = {};

// get music Handler fun
function getMusicSearchHandler(req, res) {
  let song = req.query.songID;
  // console.log(req.query);

  let musicURL = {
    method: 'GET',
    url: 'https://shazam-core.p.rapidapi.com/v1/tracks/related',
    params: { track_id: song, limit: '50' },
    headers: {
      'x-rapidapi-host': 'shazam-core.p.rapidapi.com',
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
      let newMusicArray = MusicResults.data.map(element => {
        return new MusicData(element);
      });
      cacheMemory[song] = newMusicArray;
      res.send(newMusicArray);
    });
  }
  catch (error) {
    res.send(error);
  }
  // console.log('after sending request');
}
function imageHandler (image){
  console.log("hiii",image.images);
if(image == null ){
  return "https://www.liveabout.com/thmb/pwO4o_iDrZRTmmhs7eOfD25Qoqw=/1500x1125/smart/filters:no_upscale()/pop-music-57bce3863df78c87634ea806.jpg";
}
else if (image.images.coverart){
  return image.images.coverart;
}
else if (image.images.coverarthq){
  return image.images.coverarthq;
}
else if (image.images.joecolor){
  return image.images.joecolor;
}
else if(image.images.background){
  return image.images.background
}

}

// music class
class MusicData {
  constructor(element) {
    this.img = element.images? imageHandler(element):"https://www.liveabout.com/thmb/pwO4o_iDrZRTmmhs7eOfD25Qoqw=/1500x1125/smart/filters:no_upscale()/pop-music-57bce3863df78c87634ea806.jpg"
    this.title = element.title;
    this.artist = element.subtitle;
    this.songURL = element.url;
  }
}
console.log(MusicData)



module.exports = getMusicSearchHandler;
