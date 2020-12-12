
// import third party modules(libraries)
const express = require('express');
const app = express();
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');

// import body-parser , morethan 100kb images upload throught mongoose(mongodb)
var myParser = require('body-parser')

// configure cors
app.use(cors());

// configure dotEnv
dotEnv.config({path : './config/config.env'});

// // new addition configure express to receive the form data , morethan 100kb images upload throught mongoose(mongodb)    
app.use(myParser.json({limit: '200mb'}));
app.use(myParser.urlencoded({limit: '200mb', extended: true}));

// const hostname = process.env.HOST_NAME;
const port = process.env.PORT || 5000;

// for React Application Static Home Page
// app.get('/', (request , response) => {
//     response.send(`<h2>Welcome to BigBasket Express Server</h2>`);
// });

// for React Application Deployment Home Page
app.use(express.static(path.join(__dirname , 'client' , 'build')));
app.get('/', (request,response) => {
    response.sendFile(path.join(__dirname , 'client' , 'build' , 'index.html'));
});

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname , 'client' , 'build')));
    app.get('/', (request,response) => {
        response.sendFile(path.join(__dirname , 'client' , 'build' , 'index.html'));
    });
}

// connect to Mongo DB Database
mongoose.connect(process.env.MONGO_DB_CLOUD_URL, {
    useUnifiedTopology : true,
    useNewUrlParser : true,
    useFindAndModify : false,
    useCreateIndex : true
}).then((response) => {
    console.log(`Connected to Mongo DB Successfully...........`);
}).catch((err) => {
    console.error(err);
    process.exit(1); // stop the node js process if unable to connect to mongodb
});

// configure the router
app.use('/api', require('./router/apiRouter'));

app.listen(port, () => {
    console.log(`Express Server is Started at http://${port}`);
});



