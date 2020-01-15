// arquivo de rotas... Chama o express e os controllers

const { Router } = require("express");
const AdmController = require("./controllers/ADMController");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

// cria a rota dev e a search com suas funções
routes.post("/adms", AdmController.store);
routes.get("/adms", AdmController.index);

routes.post("/devs", DevController.store); // cadastrar
routes.get("/devs", DevController.index); // visualizar
routes.put("/devs", DevController.update); // editar
routes.delete("/devs", DevController.delete); // deletar

routes.get("/search", SearchController.index); // visualizar com especificações

module.exports = routes;
