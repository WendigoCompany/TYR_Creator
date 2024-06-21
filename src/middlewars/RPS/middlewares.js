const { process_girl } = require("../../controllers/RPS/girls");
const {
  required_values,
  path_girls,
  langs,
} = require("../../db/RPS/basic_params");
const {} = require("../../db/console.colors");
const { cc, log } = require("console");
const {
  readdir,
  readFile,
  buffToJSON,
  mkdir,
  writeFile,
} = require("../../db/forldermanager");

const validate_new_girl = (req, res) => {
  let validator = false;
  const data = req.body;
  let errors = [];
  required_values.map((k) => {
    if (data[k] == undefined) {
      validator = true;
      errors.push(k);
      return "";
    }

    if (data[k].length == 0) {
      validator = true;
      errors.push(k);
      return "";
    }
  });

  if (validator) {
    res.status(409).json({
      msj: `The next values are invalid: ` + errors.toString(),
    });
    return "";
  }

  if (data.id == undefined) {
    process_girl(data);
  } else {
    // update_girl(data);
  }

  res.status(200).json({});
};

// const scene_uri =
// path_girls + params.waifu + "/" + `scene_` + params.scene_id;

const validate_scene = async (req, res) => {
  const params = req.params;

  const scenedata = {};

  langs.map(async (l) => {
    const scene_uri =
      path_girls + params.waifu + "/" + l + "/" + `scene_` + params.scene_id;
    try {
      const data = await readFile(scene_uri + "/data.json");
      scenedata[l] = buffToJSON(data);
      cc("success", "The scene " + params.scene_id + "/" + l + " was loaded!");
    } catch (error) {
      if (error.errno == "-4058") {
  
        cc(
          "error",
          "The scene " + params.scene_id + "/" + l + " doesn't exist... Creating..."
        );
        await mkdir(scene_uri);
        await writeFile(
          scene_uri + "/data.json",
          JSON.stringify([])
        );
        const init_file_data = `
        import SceneData from "./data"

        export default{
            data : SceneData,
            cbs : {}
        }
        `;

        await writeFile(scene_uri + "/init.js", init_file_data);
        scenedata[l] = [];
        cc(
          "success",
          "The scene " + params.scene_id + "/" + l + " was created!"
        );
      } else {
        res.status(500).json(error);
        console.error(error);
      }
    }
  });


  res.status(200).json(scenedata);
};

module.exports = { validate_new_girl, validate_scene };
