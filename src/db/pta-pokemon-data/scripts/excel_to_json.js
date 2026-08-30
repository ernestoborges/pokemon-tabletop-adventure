import fs from "fs";

const input = fs.readFileSync("./src/db/input.txt", "utf8");

function excelToJson(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split("\t");

  return lines.slice(1).map((line) => {
    const values = line.split("\t");

    return headers.reduce((obj, header, index) => {
      obj[header.trim()] = values[index]?.trim() ?? "";
      return obj;
    }, {});
  });
}

const text = input;

const json = excelToJson(text);

fs.writeFileSync("./src/db/output.json", JSON.stringify(json, null, 2), "utf8");
