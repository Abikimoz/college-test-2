#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const fileName = process.argv[2];
const content = fs.readFileSync(path.join(
  __dirname,
  fileName
), 'utf-8');

// BEGIN
// console.log(content)
let data = content.split('\r\n').slice(1);
const creaturesNum = data.length;
console.log(`1) Видов существ в таблице:`, creaturesNum);
// console.log(data);

let power = data.map((row) => Number(row.split('|').at(2)));
// console.log(power);
let powerMax = Math.max(...power);
// console.log(powerMax);
let powerMaxIndex = power.indexOf(powerMax);
// console.log(powerMaxIndex);

let price = data.map((row) => Number(row.split('|').at(7)));
let pricePowerMaxIndex = price[powerMaxIndex]
// console.log(pricePowerMaxIndex);
let quantityPM = 10;

let arrTwoPowerMax = power.slice(0);
arrTwoPowerMax[powerMaxIndex] = -Infinity;
// console.log(arrTwoPowerMax);
let powerTwoMax = Math.max(...arrTwoPowerMax);
// console.log(powerTwoMax);
let powerTwoMaxIndex = power.indexOf(powerTwoMax);
let priceTwoPowerMaxIndex = price[powerTwoMaxIndex]
let quantityTwoPM = 20;

console.log(`2) 10 самых сильных существ и 20 вторых по силе стоят:`, quantityPM*pricePowerMaxIndex+quantityTwoPM*priceTwoPowerMaxIndex);



// END