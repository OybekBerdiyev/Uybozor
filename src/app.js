const express = require("express");
const app = express();

require("./start/model")(app,express);
require("./start/run")(app);
