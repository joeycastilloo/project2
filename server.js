const path = require("path");
const express = require("express");
const exhbs = require("express-handlebars");
const sequelize = require("./config/connection")
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);



const port = 3001;
const app = express();
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Day Two handlebars
const hbs = exhbs.create({})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname, 'public')));





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

app.post('/api/saveGame', (req, res) => {
  console.log(req.session.user)
  console.log(req.body)
})
const axios = require("axios").default;

// var options = {
//   method: 'GET',
//   url: 'https://api.rawg.io/api/games?key=53dc43378b8d4d61904e5b56d2d5ccec'
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// const router = require('express').Router();
app.get('/api/getGame/:game', (req, res)=>{
  let searchTerm = req.params.game
  let slug = searchTerm.split(' ').join('-')
  console.log(slug)
  var options = {
      method: 'GET',
      url: `https://api.rawg.io/api/games?search=${slug}&page_size=1&key=53dc43378b8d4d61904e5b56d2d5ccec`
    };
    console.log('search')
    axios.request(options).then(function (response) {
    	// res.json(response);
      res.json(response.data.results)


      var gamesList = response.data.results[0]
      // var gameName = gamesList.name
      // var metacritic = gamesList.metacritic
      // var screenshot = gamesList.short_screenshots[0].image
      var clip = gamesList.clip.clips;
      var genreList0 = gamesList.genres.name;
      // var genreList1 = gamesList.genres.name;
      var store0 = gamesList.stores.store.name;
      // var store1 = gamesList.stores.store.name;

      // console.log('gameName', gameName)
      // console.log('metacritic', metacritic)
      // console.log('screenshot', screenshot)
      // console.log('clip', clip)
      console.log('genreList0', genreList0)
      // console.log('genreList1', genreList1)
      // console.log('store0', store0)
      // console.log('store1', store1)
    }).catch(function (error) {
    	// console.error(error);
    });
})
const User  = require('./models/User');
const { error } = require("console");

app.post('/api/user', async (req, res) => {
  console.log('signing up')
  console.log(req.body)
  try {
    const userData = await User.create(req.body);


    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
        console.log(userData)
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

app.post('/api/user/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      console.log('bad info')
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('bad password')
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

app.get('/', function(req, res){
  res.render('login')
})
app.get('/landing', function(req, res){
  res.render('landing')
})

sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => console.log('Now listening'+ port));
  });

