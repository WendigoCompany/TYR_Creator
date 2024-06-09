const path = require("path");

const PUBLIC_URL = path.join(__dirname + "/../../public/");



module.exports = (name) => {
  switch (name) {
    case "RPS":
      return path.join(PUBLIC_URL + "pages/RPS/");

    default:
      break;
  }
};



