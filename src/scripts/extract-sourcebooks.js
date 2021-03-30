require("../static/parser.js");
const inventory = require('../constant/items.json');
const fs = require('fs');

const handbookTLAToFullText = inventory.item.reduce((acc,cur) => cur.value ? acc.set(cur.source, Parser.sourceJsonToFull(cur.source)) : acc, new Map())


fs.writeFileSync('./src/computed/sourcebooks.json', JSON.stringify(Object.fromEntries(handbookTLAToFullText.entries())))