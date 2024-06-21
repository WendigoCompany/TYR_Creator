const express = require("express");
const dispatch = require("../../db/dispatch");
const { mkdir, exist, readdir, getfolders, readFile, buffToJSON } = require("../../db/forldermanager");
const router = express.Router();

const { validate_new_girl, validate_scene } = require("../../middlewars/RPS/middlewares");
const { log } = require("console");
const { path_girls, langs } = require("../../db/RPS/basic_params");


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

  const girls = await getfolders(path_girls);
const girls_data = [];
  for (let i = 0; i < girls.length; i++) {
    let data = await readFile(path_girls + girls[i] + "/params.json");
    data = buffToJSON(data);
    girls_data.push(data)
  }

  res.json({ girls_data });
});


router.post("/girls/create", async (req, res) => {
const data = validate_new_girl(req, res)
});


router.get("/girls/preview", (req, res) => {  
  res.sendFile(dispatch("RPS") + "/girls_preview.html");
});



router.get("/girls", (req, res) => {
  res.sendFile(dispatch("RPS") + "/girls.html");
});



router.get("/scenes", (req, res) => {
  res.sendFile(dispatch("RPS") + "/scenes.html");
});

router.post("/scenes", async(req, res) => {
  const girls = await getfolders(path_girls);
  res.json({girls})
});


router.get("/scenes/:waifu", (req, res) => {
  res.sendFile(dispatch("RPS") + "/scenes_waifu.html");
});

router.post("/scenes/:waifu", async (req, res) => {
  const scenes = await getfolders(path_girls + req.params.waifu + "/" + langs[0])
  res.json({scenes})
  // res.sendFile(dispatch("RPS") + "/scenes_waifu.html");
});


router.post("/scenes/:waifu/:scene_id", async (req, res) => {
  // res.sendFile(dispatch("RPS") + "/scene.html");
  validate_scene(req,res)
});


router.get("/scenes/:waifu/:scene_id", async (req, res) => {
  res.sendFile(dispatch("RPS") + "/scene.html");
});

module.exports = router;



