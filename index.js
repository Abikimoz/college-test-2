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

let height = data.map((row) => Number(row.split('|').at(5)));
// console.log(height);
let weight = data.map((row) => Number(row.split('|').at(6)));
// console.log(weight);

let i = 0;
let thinness = height.map((row) => {
  // console.log(row);
  row = row / weight[i];
  i ++;
  // console.log(row);
  row = row.toFixed(2);
  row = Number(row.split('|'));
  return row;
});

// худые
let thin = Math.max(...thinness);
// толстые
let thick = Math.min(...thinness);

let thinIndex = thinness.indexOf(thin);
let thickIndex = thinness.indexOf(thick);

// console.log(thinness);
// console.log(thinIndex);
// console.log(thickIndex);

let unit = data.map((row) => Number(row.split('|').at(4)));
// console.log(unit);
// console.log(price);

i = 0
let squadPrice = unit.map((row) => {
  // console.log(row);
  row = row * price[i];
  i ++;
  // console.log(row);
  // row = row.toFixed(2);
  // row = Number(row.split('|'));
  return row;
});

// console.log(squadPrice);

console.log(`3) Стоимость отряда самых толстых: ${squadPrice[thickIndex]} Отряда самых худых ${squadPrice[thinIndex]}`);

i = 0
let pricePower = price.map((row) => {
  row = row / power[i];
  i ++;
  // console.log(row);
  row = row.toFixed(2);
  row = Number(row.split('|'));
  return row;
});

let advantageous = Math.max(...pricePower);
let notProfitable = Math.min(...pricePower);

let advantageousIndex = pricePower.indexOf(advantageous);
let notProfitableIndex = pricePower.indexOf(notProfitable);

let unitName = data.map((row) => row.split('|').at(1));
console.log(unitName);

console.log(`4) Cамым невыгодным по соотношению цены и силы являются юниты ${unitName[advantageousIndex]}, a самым выгодным ${unitName[notProfitableIndex]}`);

console.log(unitName);

// считаем сколько раз видим значение
var result = [1, 3, 4, 1, 1, 3, 4, 5].reduce(function(acc, el) {
  acc[el] = (acc[el] || 0) + 1;
  return acc;
}, {});

console.log(result);

console.log(result['1']);

// END