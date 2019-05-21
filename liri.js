var axios = require("axios"); //axios request
var moment = require('moment');
//var Spotify = require('node-spotify-api');
require("dotenv").config();
var keys = require('./keys.js');
var fs = require('fs');
//var spotify = new Spotify(keys.spotify);
var terminalReq = process.argv[2];
var apiRes = process.argv[3];

//Spotify//====================================================================================

/*var songTitle = "";

function spotifyThis(songTitle) {
  spotify.search({ type: 'track', query: songTitle })
  .then(function(response) {
    console.log(response);
        spotify.search.tracks('get back')
        .then(data=> {
            console.log("tracks" + response.data.tracks)
        })
        spotify.search.artists('beatles')
        .then(data=> {
            console.log("artists" + response.data.artists)
        })
  })
  .catch(function(err) {
    console.log(err);
  });
}*/

//Bands In Town//==============================================================================

function concertThis(show) {
    axios.get("https://rest.bandsintown.com/artists/" + show + "/events?app_id=codingbootcamp").then(
        function(response) {
            var name = response.data[0].venue.name;
            var cityStateCountry = response.data[0].venue.city;
            var dateTime = response.data[0].datetime;
            var momentDateTime = moment(dateTime).format('MMMM do YYYY');
            console.log(momentDateTime);
        }
    )
}

if (process.argv[2] === "concert-this") {
    concertThis(process.argv[3]);
}

//OMDB//=======================================================================================

var movieTitle = ""; //movie title variable

function getMovie(movieTitle) {
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

    axios.get(queryUrl).then(function (response) {
        console.log(
            "Title: " + response.data.Title + "\n" +
            "IMDB Rating: " + response.data.imdbRating + "\n" +
            "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n" +
            "Country Produced: " + response.data.Country + "\n" +
            "Language: " + response.data.Language + "\n" +
            "Plot: " + response.data.Plot + "\n" +
            "Actors: " + response.data.Actors)
    }).catch(function (error) {
        console.log(error);
    })
}
// if statement 
if (process.argv[2] === "movie-this") {
    getMovie(process.argv[3]);
}

