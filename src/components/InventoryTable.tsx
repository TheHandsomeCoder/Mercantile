import {Table } from 'semantic-ui-react'

interface InventoryItemProps {
    name: string,
    weight?: number,
    value?: number
}

interface InventoryTableProps {
    inventory: Array<InventoryItemProps>
}

const InventoryTable: React.FC<InventoryTableProps> = (props) => (
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
    <Table.Row>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.value}</Table.Cell>
        <Table.Cell>{item.weight}</Table.Cell>
    </Table.Row>
);

export default InventoryTable