import { exist, mkdir } from "../db/forldermanager";

export const create_folders = (folder_name, patch) => {

  // folders_name.map((name) => {
    if (!exist(patch + "/" + folder_name)) {
      mkdir(patch + "/" + folder_name);
    }
  // });
};

module.exports = { create_folders };
