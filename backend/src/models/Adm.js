// importação do adm para o mongoose

const mongoose = require("mongoose");

const AdmSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  password_hash: String,
  avatar_url: String
});

module.exports = mongoose.model("Adm", AdmSchema);
