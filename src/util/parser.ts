import customAbreviations from '../constant/custom-abv.json'
import itemTypes from '../computed/itemTypes.json'

const itemTypesMap = new Map(Object.entries(itemTypes));
const customAbreviationsMap = new Map(Object.entries(customAbreviations));

const capitalizeWordsInString = (s: string) => {
    return s.split(' ').map(w => w[0].toUpperCase() + w.slice(1) ).join(" ");
  }

export const parseAbreviation = (abv: string): string => {
    const humanReadableName = itemTypesMap.get(abv) || customAbreviationsMap.get(abv) || `__${abv}__`;
    return capitalizeWordsInString(humanReadableName);
};
