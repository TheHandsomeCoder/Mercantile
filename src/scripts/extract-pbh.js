const R = require('ramda');
// Hand written types taken from Parser
const adventuringGearTypes = new Set(["G", "A", "SCF"]);
const armorTypes = new Set(["LA", "MA", "HA", "S"]);
const weaponTypes = new Set(["M", "R"]);

const isPHB = R.propEq("source", "PHB");
const isAdventureGear = (i) => adventuringGearTypes.has(i.type);
const isPHBAndIsAdventureGear = R.filter(R.both(isPHB, isAdventureGear));
const isSpellcastingFocus = R.propEq("type", "SCF");
const combineSCFNameAndSCFType = R.compose(R.join("-"), R.props(["type", "scfType"]));
const isEquipmentPack = R.both(
  R.propEq("page", 151),
  R.propSatisfies(R.includes("Pack"), "name")
);

// Equipment Packs are considered general equipment, break them into custom category
const extractEquipmentPacksToOwnCategory = R.map(
  R.when(isEquipmentPack, R.evolve({'type': R.always("EP")}))
);

const groupAdventureGearByType = R.groupBy(
  R.cond([
    [isSpellcastingFocus, combineSCFNameAndSCFType],
    [R.T, R.prop("type")],
  ])
);


const extractAdventuringGear = R.pipe(
  isPHBAndIsAdventureGear,
  extractEquipmentPacksToOwnCategory,
  groupAdventureGearByType
);


const extractPlayerHandbookItems = (inventory) => ({
    'G': extractAdventuringGear(inventory)
});

module.exports = {
    extractPlayerHandbookItems
}

