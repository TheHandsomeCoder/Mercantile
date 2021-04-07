const R = require('ramda');
// Hand written types taken from Parser
const adventuringGearTypes = new Set(["G", "A", "SCF"]);
const armorTypes = new Set(["LA", "MA", "HA", "S"]);
const weaponTypes = new Set(["M", "R"]);

const isPHB = R.propEq("source", "PHB");
const isAdventureGear = (i) => adventuringGearTypes.has(i.type);
const isArmorOrShield = (i) => armorTypes.has(i.type);
const hasValueGTEOneCP = R.propSatisfies(R.gte(R.__,1), "value");
const isPHBAndIsAdventureGearAndValueGTOne = R.filter(R.allPass([isPHB, isAdventureGear, hasValueGTEOneCP]));
const isSpellcastingFocus = R.propEq("type", "SCF");
const combineSCFNameAndSCFType = R.compose((s) => s.toUpperCase(),R.join("-"), R.props(["scfType", "type"]));
const isEquipmentPack = R.both(
  R.propEq("page", 151),
  R.propSatisfies(R.includes("Pack"), "name")
);

// Equipment Packs are considered general equipment, break them into custom category
const extractEquipmentPacksToOwnCategory = R.map(
  R.when(isEquipmentPack, R.evolve({'type': R.always("EP")}))
);

const extractOtherAdventuringGearToOwnCategory = R.map(
  R.when(R.propEq('type', 'G'), R.evolve({'type': R.always("OAG")}))
);


const groupAdventureGearByType = R.groupBy(
  R.cond([
    [isSpellcastingFocus, combineSCFNameAndSCFType],
    [R.T, R.prop("type")],
  ])
);


const extractAdventuringGear = R.pipe(
  isPHBAndIsAdventureGearAndValueGTOne,
  R.reject(isEquipmentPack),
  extractOtherAdventuringGearToOwnCategory,
  R.sortBy(R.prop("type")),
  groupAdventureGearByType,
  (data) => Object.fromEntries(Object.entries(data).sort())
);

const extractEquipmentPacks = R.pipe(
  isPHBAndIsAdventureGearAndValueGTOne,
  R.filter(isEquipmentPack),
  extractEquipmentPacksToOwnCategory,
  groupAdventureGearByType
);

const extractArmorAndShields = R.pipe(
  R.filter(isPHB),
  R.filter(isArmorOrShield),
  groupAdventureGearByType,
  (data) => Object.fromEntries(Array.from(armorTypes.keys()).map(k => [k, data[k]]))
);

const extractPlayerHandbookItems = (inventory) => ({
    'G': extractAdventuringGear(inventory),
    'ARM': extractArmorAndShields(inventory),
    'EP': extractEquipmentPacks(inventory),
});

module.exports = {
    extractPlayerHandbookItems
}

