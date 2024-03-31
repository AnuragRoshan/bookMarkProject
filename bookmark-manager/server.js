const express = require('express');
const app = express();
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./Routes/index");
const cors = require("cors");
const cookieParser = require('cookie-parser');


app.use(morgan("dev"));

dotenv.config();

require("./db_connection");//connect to database

app.use(express.json());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ["http://localhost:3000", "chrome-extension://jilhmgfpeebbnffabooobdopgdiobjji"], // <-- location of the react app were connecting to
        credentials: true,
    })
);
app.use(cookieParser())



app.use(routes); //routes

const PORT = 5000;

app.listen(PORT, () => {
    console.log('Listening on port 5000...');
});