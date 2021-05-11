require('../static/parser');

const baseItems = require('../constant/baseItems.json');
const items = require('../constant/items.json');
const fs = require('fs');
const { extractPlayerHandbookItems } = require('./extract-pbh');

const baseItemsWithValue = baseItems.baseitem.filter(i => i.value);
const itemsWithValue = items.item.filter(i => i.value);

const inventory = [].concat(baseItemsWithValue).concat(itemsWithValue);
fs.writeFileSync('./src/computed/items.json', JSON.stringify(inventory));


const handbookTLAToFullText = inventory.reduce((acc,cur) => acc.set(cur.source, Parser.sourceJsonToFull(cur.source)), new Map())
fs.writeFileSync('./src/computed/sourcebooks.json', JSON.stringify(Object.fromEntries(handbookTLAToFullText.entries())));


const itemTypes = inventory.reduce((acc,cur) => acc.set(cur.type, Parser.ITEM_TYPE_JSON_TO_ABV[cur.type]), new Map())
fs.writeFileSync('./src/computed/itemTypes.json', JSON.stringify(Object.fromEntries(itemTypes.entries())));

//Write PHB values
fs.writeFileSync('./src/computed/phb.json', JSON.stringify(extractPlayerHandbookItems(inventory)));