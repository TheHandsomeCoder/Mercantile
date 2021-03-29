require("../static/parser.js");
const inventory = require('../constant/items.json');
const fs = require('fs');

const handbookTLAToFullText = inventory.item.reduce((acc,cur) => acc.set(cur.source, Parser.sourceJsonToFull(cur.source)), new Map())


fs.writeFileSync('./src/computed/sourcebooks.json', JSON.stringify(Object.fromEntries(handbookTLAToFullText.entries())))