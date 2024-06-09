import { exist, mkdir } from "../db/forldermanager";

export const create_folders = (folders_name, patch) => {
  folders_name.map((name) => {
    if (!exist(patch + "/" + name)) {
      mkdir(patch + "/" + name);
    }
  });
};

module.exports = { create_folders };
