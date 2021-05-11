const R = require("ramda");
// Hand written types taken from Parser
const adventuringGearTypes = new Set(["G", "A", "SCF"]);
const armorTypes = new Set(["LA", "MA", "HA", "S"]);
const weaponTypes = new Set(["M", "R"]);

const isPHB = R.propEq("source", "PHB");
const isAdventureGear = (i) => adventuringGearTypes.has(i.type);
const isArmorOrShield = (i) => armorTypes.has(i.type);
const isWeapon = (i) => weaponTypes.has(i.type);
const isTreasure = R.propEq("type", "$");
const hasValueGTEOneCP = R.propSatisfies(R.gte(R.__, 1), "value");
const isPHBAndIsAdventureGearAndValueGTOne = R.filter(R.allPass([isPHB, isAdventureGear, hasValueGTEOneCP]));
const isSpellcastingFocus = R.propEq("type", "SCF");
const combineSCFNameAndSCFType = R.compose((s) => s.toUpperCase(), R.join("-"), R.props(["scfType", "type"]));
const combineWeaponCategoryAndType = R.compose((s) => s.toUpperCase(), R.join("-"), R.props(["weaponCategory", "type"]));
const isEquipmentPack = R.both(R.propEq("page", 151), R.propSatisfies(R.includes("Pack"), "name"));

// Equipment Packs are considered general equipment, break them into custom category
const extractEquipmentPacksToOwnCategory = R.map(R.when(isEquipmentPack, R.evolve({ type: R.always("EP") })));

const extractOtherAdventuringGearToOwnCategory = R.map(R.when(R.propEq("type", "G"), R.evolve({ type: R.always("OAG") })));

const groupGearByTypeAndSubType = R.groupBy(
  R.cond([
    [isWeapon, combineWeaponCategoryAndType],
    [isSpellcastingFocus, combineSCFNameAndSCFType],
    [R.T, R.prop("type")],
  ])
);

const extractAdventuringGear = R.pipe(
  isPHBAndIsAdventureGearAndValueGTOne,
  R.reject(isEquipmentPack),
  extractOtherAdventuringGearToOwnCategory,
  R.sortBy(R.prop("type")),
  groupGearByTypeAndSubType,
  (data) => Object.fromEntries(Object.entries(data).sort())
);

const extractEquipmentPacks = R.pipe(
  isPHBAndIsAdventureGearAndValueGTOne,
  R.filter(isEquipmentPack),
  extractEquipmentPacksToOwnCategory,
  groupGearByTypeAndSubType
);

const extractArmorAndShields = R.pipe(R.filter(isPHB), R.filter(isArmorOrShield), groupGearByTypeAndSubType, (data) =>
  Object.fromEntries(Array.from(armorTypes.keys()).map((k) => [k, data[k]]))
);

const extractWeapons = R.pipe(
  R.filter(isPHB),
  R.filter(isWeapon),
  R.sortWith([R.descend(R.prop("weaponCategory")), R.ascend(R.prop("type"))]),
  groupGearByTypeAndSubType
);

const extractRemainingPHBGear = R.pipe(
  R.filter(isPHB),
  R.reject(R.anyPass([isAdventureGear, isTreasure, isWeapon, isArmorOrShield])),
  groupGearByTypeAndSubType,
  (obj) => {
    const newMap = Object.entries(obj).map(([k, v]) => [k, {[k]: v}]);

    return Object.fromEntries(newMap);
  }
);

const extractPlayerHandbookItems = (inventory) => ({
  G: extractAdventuringGear(inventory),
  ARM: extractArmorAndShields(inventory),
  EP: extractEquipmentPacks(inventory),
  W: extractWeapons(inventory),
  ...extractRemainingPHBGear(inventory),
});

module.exports = {
  extractPlayerHandbookItems,
};
