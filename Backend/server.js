const express = require('express');
const fileupload = require("express-fileupload");
const connectDb = require('./db')
const errorHandler = require('./errorHandler/errorHandler')
const port = 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileupload());



app.use("/api",require('./routes/user'));
app.use("/api/events",require('./routes/event'));

app.use(errorHandler)

connectDb();
app.listen(port,() => {console.log("listing on port",port)});



