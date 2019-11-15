import https from 'https';
import Express from 'express';
import BodyParser from 'body-parser';
import Path from 'path';
import fs from 'fs';
import Cors from 'cors';
import Mongoose from 'mongoose';

import PdfRendererController from './Controllers/PdfRendererController';

import Config from './Config';
import ErrorWrapper from './Classes/ErrorWrapper';


/* DB Connection ------------------------------------------------------------------- */

Mongoose.connect(Config.dbString, { useNewUrlParser: true });
let dbConnection = Mongoose.connection;
dbConnection.on('error', console.error);


/* HTTP Client -------------------------------------------------------------------- */

// Config part -----------------------------------------------------------------------

var app = Express();

app.use(Cors());

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({
  extended: true
}));


process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// Routes ----------------------------------------------------------------------------


var pdfRendererController = new PdfRendererController();
pdfRendererController.init(app);



// Bootstrap -------------------------------------------------------------------------

dbConnection.once('open', () => {

  console.log('Connected to database');

  if(Config.isHttps){

    var sslOptions = {
      key: fs.readFileSync('key.pem', 'utf8'),
      cert: fs.readFileSync('server.crt', 'utf8')
    };

    https.createServer(sslOptions, app).setTimeout(30*60*1000).listen({
      port: Config.srvPort
    }, () => {

      console.log("HTTPS Server listening on port " + Config.srvPort);

    });

  }else{

    let server = app.listen({
      port: Config.srvPort
    }, () => {

      console.log("HTTP Server listening on port " + Config.srvPort);

    });

  }

});