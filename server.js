// Application entry point.

// Module dependency.
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');

// Custom dependecy.
const config = require('./config');
const db = require('./src/mongo');
const { getSticky, addStickyInfo, updateSticky } = require('./src/routes');

const app = express();
const router = express.Router();

// Application middleware goes here.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse application/json
app.use(morgan('combined')); // for logging.
app.use(helmet.hidePoweredBy()); // Helmet helps you secure our application.
app.use('/', express.static(path.join(__dirname, 'client')));

// routes.
router.get('/v1/stickies', getSticky);
router.post('/v1/add', addStickyInfo);
router.put('/v1/update/:id/:status', updateSticky);

db.open((err, dbConfig) => {
  if (err) throw err;
  // route specific middleware - will expose the database to route.
  const exposeDb = (req, resp, next) => {
    req.mongoDb = dbConfig;
    next();
  };
  app.use('/', exposeDb, router);
  app.listen(config.port);
  console.log(`server & DB listening ${config.port}`);
});
