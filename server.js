const path = require("path");
const express = require("express");
const exhbs = require("express-handlebars");




const port = 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port,()=>{console.log("listening on "+port)})