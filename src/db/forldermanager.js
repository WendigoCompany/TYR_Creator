const fs = require("fs");
const util = require("util");
const mkdir = util.promisify(fs.mkdir);
const exist = fs.existsSync;
const readdir = util.promisify(fs.readdir);

module.exports = {
    mkdir,
    exist,
    readdir
};