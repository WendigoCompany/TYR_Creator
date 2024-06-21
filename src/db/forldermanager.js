const fs = require("fs");
const util = require("util");
const mkdirfunc = util.promisify(fs.mkdir);
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const mkdir = util.promisify(fs.mkdir);
const exist = fs.existsSync;
const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

const getfolders = async (patch) => {
  const files = await readdir(patch);
  const folders = [];
  // files.map(async file => {
  //   const fullPath = `${patch}/${file}`;
  //   const fileStat = await stat(fullPath);
  //   if (fileStat.isDirectory()) {
  //     folders.push(file)
  //   }
  // })

  for (let i = 0; i < files.length; i++) {
    const fullPath = `${patch}/${files[i]}`;
    const fileStat = await stat(fullPath);
    if (fileStat.isDirectory()) {
      folders.push(files[i])
    }

  }

  return folders

};


const buffToJSON = (data) => {
  data = new Uint8Array(data);
  data = new TextDecoder().decode(data);
  data = JSON.parse(data);
  return data
}



module.exports = {
  mkdir,
  exist,
  readdir,
  getfolders,
  writeFile,
  readFile,
  getfolders,
  buffToJSON,
};


