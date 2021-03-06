// controle de cadastro, edição e delete de devs

const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const gitRes = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = gitRes.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return res.json(dev);
  },

  async update(req, res) {
    const { id } = req.params;
    const { techs, latitude, longitude } = req.body;

    const data = {
      latitude,
      longitude
    };

    if (techs) {
      const techsArray = parseStringAsArray(techs);
      data.techs = techsArray;
    }

    const dev = await Dev.findByIdAndUpdate(id, data, { new: true });

    if (!dev) {
      res.json({ message: "Usúario não encontrado" });
    }

    return res.json(dev);
  },

  async delete(req, res) {
    const { id } = req.params;

    await Dev.findByIdAndDelete(id);

    return res.json({ message: "Usuário removido com sucesso." });
  }
};
