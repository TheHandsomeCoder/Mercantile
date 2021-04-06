import React from "react";
import { Header } from "semantic-ui-react";
import { InventoryItemProps, InventoryTable } from "./InventoryTable";
import { parseAbreviation } from "../util/parser";

interface InventoryProps {
  gpFilter: number,
  categories: Map<string, Array<InventoryItemProps>>;
}

interface InventoryTableWithHeaderProps {
    header: string,
    gpFilter: number,
    items: Array<InventoryItemProps>
}

const FilteredInventoryTableWithHeader: React.FC<InventoryTableWithHeaderProps> = (props) => {
    const filteredInventory = props.items.filter(i => i.value <= props.gpFilter * 100)
    if(filteredInventory.length === 0) {
      return null;
    }

    return (<>
        <Header as="h2">{props.header}</Header>
        <InventoryTable inventory={filteredInventory}/>
    </>)
}

export const Inventory: React.FC<InventoryProps> = (props) => (
  <>
    {Array.from(props.categories.entries()).map(([headerKey, items]) => (
      <FilteredInventoryTableWithHeader header={parseAbreviation(headerKey)} items={items} gpFilter={props.gpFilter}/>
    ))}
  </>
);
