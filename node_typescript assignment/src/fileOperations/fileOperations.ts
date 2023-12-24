import fs from "fs";
import { Response } from "express";

export const readFileAndHandleErrors = (
  filePath: string,
  callback: (data: string) => void,
  res: Response
): void => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    callback(data);
  });
};

export const writeFileAndHandleErrors = (
  filePath: string,
  data: string,
  res: Response
): void => {
  fs.writeFile(filePath, data, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.status(200).send("Operation Successfully");
  });
};