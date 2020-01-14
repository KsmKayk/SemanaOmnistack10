// arquivo de iniciaçização, chama o express mongoose rotas e inicia aplicaçãpo

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes.js");

const app = express();

mongoose.connect(
  "mongodb://Omnistack:Omnistack@semanaomnistack10-shard-00-00-uexdb.mongodb.net:27017,semanaomnistack10-shard-00-01-uexdb.mongodb.net:27017,semanaomnistack10-shard-00-02-uexdb.mongodb.net:27017/week10?ssl=true&replicaSet=SemanaOmnistack10-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(express.json());
app.use(routes);

app.listen(3333);
