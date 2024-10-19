import XLSX from "xlsx"
import fs from "fs";

const workbook = XLSX.readFile("C:\Users\IDEAPAD\Downloads\Frontend Developer Assignment Data.xlsx")

const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

fs.writeFileSync('output.json', JSON.stringify(data, null, 2));
console.log('Excel converted to JSON successfully');