


const {
  readFile,
  getfolders,
  buffToJSON,
  writeFile,
  exist,
  mkdir,
} = require("../../db/forldermanager");
const {} = require("../../db/console.colors");
const { cc, log } = require("console");
const { path_girls, langs } = require("../../db/RPS/basic_params");




// EXTRACT DATA FROM CHARACTERS MAIN INIT
const extract_data = async () => {
    let data;
    try {
      data = (await readFile(path_girls + "init.js")).toString();
    } catch (error) {
      data = "";
    }
  
    let breaker = 0;
    const max = 99 * 99 * 99;
    const imports = [];
    const exports = [];
  
    // EXTRACTING IMPORTS FILES
  
    do {
      if (
        data.indexOf("//@IMPORT") !== -1 &&
        data.indexOf("//@E.IMPORT") !== -1
      ) {
        let importf = data.substring(
          data.indexOf("//@IMPORT"),
          data.indexOf("//@E.IMPORT")
        );
        importf += "//@E.IMPORT";
        data = data.replace(importf, "");
        importf += "\n";
        imports.push(importf);
      } else {
        break;
      }
      breaker++;
    } while (true || breaker < max);
  
    // EXTRACTING EXPORTS FILES
  
    cc("suc", "Loaded Imports from Init.js");
    breaker = 0;
    do {
      if (
        data.indexOf("//@EXPORT") !== -1 &&
        data.indexOf("//@E.EXPORT") !== -1
      ) {
        let exportf = data.substring(
          data.indexOf("//@EXPORT"),
          data.indexOf("//@E.EXPORT")
        );
        exportf += "//@E.EXPORT";
        data = data.replace(exportf, "");
        exportf += "\n";
        exports.push(exportf);
      } else {
        break;
      }
      breaker++;
    } while (true || breaker < max);
  
    cc("suc", "Loaded Exports from Init.js");
  
    return [imports, exports];
  };
  
  const process_girl = async (gdata) => {
    const folders = await getfolders(path_girls);
    const ids = [];
    const max_ids = 99 * 99 * 99;
  
    for (let i = 0; i < folders.length; i++) {
      try {
        let data = await readFile(path_girls + folders[i] + "/params.json");
        data = buffToJSON(data);
        ids.push(data.id);
      } catch (error) {}
    }
  
    cc("suc", "Loaded IDs");
  
    for (let i = 0; i < max_ids; i++) {
      if (ids.indexOf(i) == -1) {
        gdata.id = i;
        break;
      }
    }
    cc("suc", "New Girl ID selected");
  
    const [imports, exports] = await extract_data();
  
    const new_folder = path_girls + gdata.root + "/";
  
    // CREAR LA CARPETA
    if (!exist(new_folder)) {
      mkdir(new_folder);
    }
    // CREAR EL PARAMS
    if (!exist(new_folder + "params.json")) {
      writeFile(new_folder + "params.json", JSON.stringify(gdata));
    }
  
    let new_import = `
        //@IMPORT
        import ${gdata.root} from "./${gdata.root}/params.json";
        //@E.IMPORT
    `;
  
    let new_export = `
        //@EXPORT
        ${gdata.root},
        //@E.EXPORT
        `;
  
    let new_init = `
    
    `;
  
    if (!exist(new_folder + "game/")) {
      mkdir(new_folder + "game/");
    }
  
    for (let i = 0; i < langs.length; i++) {
      const l = langs[i];
      new_import +=
        "\n" +
        `
  //@IMPORT
  import ${gdata.root}_Costumes_${l.toUpperCase()} from "./${
          gdata.root
        }/${l}/costumes.json"
  //@E.IMPORT
  `;
  
      new_export +=
        "\n" +
        `
      //@EXPORT
      ${gdata.root}_Costumes_${l.toUpperCase()},
      //@E.EXPORT
  `;
  
      if (!exist(new_folder + l + "/")) {
        await mkdir(new_folder + l + "/");
        await writeFile(new_folder + l + "/" + "costumes.json", JSON.stringify([]));
      }
    }
  
  
    imports.push(new_import);
    exports.push(new_export);
  
  
    imports.map((imp) => {
      new_init += imp;
    });
    new_init += `
    export default [\n
    `;
    exports.map((exp) => {
      new_init += exp;
    });
  
    new_init += `
    \n]
    `;
  
  
  
    writeFile(path_girls + "init.js", new_init);
  
    cc("suc", `New girl [${gdata.name}] created`);
  
  
    
  };


  module.exports ={
    process_girl
  };