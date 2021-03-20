import {Table } from 'semantic-ui-react'
import { formatCurrency } from '../util/currency';

export interface InventoryItemProps {
    name: string,
    value: number
    weight: number,
}

interface InventoryTableProps {
    inventory: Array<InventoryItemProps>
}

export const InventoryTable: React.FC<InventoryTableProps> = (props) => (
  <Table celled fixed>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Value</Table.HeaderCell>
        <Table.HeaderCell>Weight</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
        {
            props.inventory.map(i => InventoryItem(i))
        }
    </Table.Body>        
  </Table>
)

const InventoryItem = (item: InventoryItemProps) => (
    <Table.Row key={item.name}>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{formatCurrency(item.value)}</Table.Cell>
        <Table.Cell>{item.weight}</Table.Cell>
    </Table.Row>
);