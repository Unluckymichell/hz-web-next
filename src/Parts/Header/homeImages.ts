import * as fs from "fs";
import * as path from "path";
import { readdir } from "fs/promises";

const uploadsDir = path.join(process.cwd(), "public/Images/Home");

const stringMatcher = <t extends string>(string: string, default_: t) =>
  ["top", "center"].includes(string) ? (string as t) : default_;

export type HomeImagesType = {
  url: string;
  objectPosition: "top" | "center";
}[];

export async function getImages(): Promise<HomeImagesType> {
  const files = await readdir(uploadsDir);
  return files.map((p) => ({
    url: "/Images/Home/" + p,
    objectPosition: stringMatcher(
      p.substring(p.indexOf("_") + 1, p.lastIndexOf(".")),
      "top"
    ),
  }));
}

/** @deprecated */
export const images: HomeImagesType = fs.readdirSync(uploadsDir).map((p) => ({
  url: "/Images/Home/" + p,
  objectPosition: stringMatcher(
    p.substring(p.indexOf("_") + 1, p.lastIndexOf(".")),
    "top"
  ),
}));
