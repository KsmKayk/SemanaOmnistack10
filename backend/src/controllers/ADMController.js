const axios = require("axios");
const Adm = require("../models/Adm");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotalySecretKey");

module.exports = {
  async index(req, res) {
    const { github_username } = req.query;
    const adms = await Adm.find({
      github_username: {
        $in: github_username
      }
    });
    return res.json(adms);
  },

  async store(req, res) {
    const { github_username, password } = req.body;

    const password_hash = cryptr.encrypt(password);

    let adm = await Adm.findOne({ github_username });

    if (!adm) {
      const gitRes = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url } = gitRes.data;

      adm = await Adm.create({
        github_username,
        name,
        avatar_url,
        password_hash
      });
    }

    return res.json(adm);
  }
};
