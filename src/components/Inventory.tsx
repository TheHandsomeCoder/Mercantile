import React from "react";
import { Header } from "semantic-ui-react";
import { InventoryItemProps, InventoryTable } from "./InventoryTable";
import itemTypes from '../computed/itemTypes.json'
import { parseAbreviation } from "../util/parser";

interface InventoryProps {
  categories: Map<string, Array<InventoryItemProps>>;
}

interface InventoryTableWithHeaderProps {
    header: string,
    items: Array<InventoryItemProps>
}

const InventoryTableWithHeader: React.FC<InventoryTableWithHeaderProps> = (props) => {
    return (<>
        <Header as="h2">{props.header}</Header>
        <InventoryTable inventory={props.items} />
    </>)
}

export const Inventory: React.FC<InventoryProps> = (props) => (
  <>
    {Array.from(props.categories.entries()).map(([headerKey, items]) => (
      <InventoryTableWithHeader header={parseAbreviation(headerKey)} items={items} />
    ))}
  </>
);
