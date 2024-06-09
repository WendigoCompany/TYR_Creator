const express = require("express");
const dispatch = require("../../db/dispatch");
const { mkdir, exist, readdir, getfolders } = require("../../db/forldermanager");
const router = express.Router();
const path = require("path");
const { validate_new_girl } = require("./middlewares");


const path_girls = path.join(__dirname + "../../../db/RPS/characters");
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
  res.json({ girls });
});


router.post("/girls/create", async (req, res) => {
const data = validate_new_girl(req, res)
  // res.status(300).json({})
  // const girls = await getfolders(path_girls);
  // res.json({ girls });
});

// router.post("/girls/pre  view", (req, res) => {
//     res.json(req.session.girls).status(200)
// });

router.get("/girls/preview", (req, res) => {  
  res.sendFile(dispatch("RPS") + "/girls_preview.html");
});

// router.post("/girls/catch", (req, res) => {
//   req.session.girls = req.body;
//   console.log( req.body);
//   res.json({}).status(200);
// });

router.get("/girls", (req, res) => {
  res.sendFile(dispatch("RPS") + "/girls.html");
});

module.exports = router;



