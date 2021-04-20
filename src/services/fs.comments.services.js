import fsx from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON } = fsx;

export const dataFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data"
);

export const getComments = async () =>
  await readJSON(join(dataFolderPath, "comments.json"));

export const writeComments = async (content) => {
  await writeJSON(join(dataFolderPath, "comments.json"), content);
};
