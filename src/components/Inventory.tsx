import { InventoryItemProps, InventoryTable } from "./InventoryTable";

interface InventoryProps {
  categories: Map<string, Array<InventoryItemProps>>;
}

export const Inventory: React.FC<InventoryProps> = (props) => (
  <>
    {Array.from(props.categories.values()).map((items) => (
      <InventoryTable inventory={items} />
    ))}
  </>
);
