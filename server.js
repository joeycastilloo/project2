const path = require("path");
const express = require("express");
const exhbs = require("express-handlebars");




const port = 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// var unirest = require("unirest");

// var req = unirest("GET", "https://rawg-video-games-database.p.rapidapi.com/games/%7Bgame_pk%7D");

// req.headers({
// 	"x-rapidapi-key": "53dc43378b8d4d61904e5b56d2d5ccec",
// 	"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
// 	"useQueryString": true
// });


// req.end(function (res) {
// 	if (res.error) throw new Error(res.error);

// 	console.log(res.body);
// });


var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://api.rawg.io/api/games?key=53dc43378b8d4d61904e5b56d2d5ccec'
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});



app.listen(port,()=>{console.log("listening on "+port)})

