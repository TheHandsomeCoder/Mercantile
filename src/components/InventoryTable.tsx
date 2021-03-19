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
  <Table celled>
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
        <Table.HeaderCell>{item.name}</Table.HeaderCell>
        <Table.HeaderCell>{item.value}</Table.HeaderCell>
        <Table.HeaderCell>{item.weight}</Table.HeaderCell>
    </Table.Row>
);

export default InventoryTable