const express = require("express");
const dispatch = require("../../db/dispatch");
const { mkdir, exist, readdir } = require("../../db/forldermanager");
const router = express.Router();
const path = require("path");

const path_girls = path.join(__dirname + "../../../db/RPS/girls");
(() => {
  const folders = [path_girls];

  folders.map((f) => {
    if (!exist(f)) {
      mkdir(f);
    }
  });
})();

router.get("/", (req, res) => {
  res.sendFile(dispatch("RPS") + "/index.html");
});

router.get("/girls/gets", async (req, res) => {
  const girls = await readdir(path_girls);
  res.json({ girls });
});

router.post("/girls/preview", (req, res) => {
    res.json(req.session.girls).status(200)
});

router.get("/girls/preview", (req, res) => {  
  res.sendFile(dispatch("RPS") + "/girls_preview.html");
});

router.post("/girls/catch", (req, res) => {
  req.session.girls = req.body;
  console.log( req.body);
  res.json({}).status(200);
});

router.get("/girls", (req, res) => {
  res.sendFile(dispatch("RPS") + "/girls.html");
});

module.exports = router;
