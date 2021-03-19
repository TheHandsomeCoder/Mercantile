import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import InventoryTable from './components/InventoryTable';
import inventory from './constant/items.json';
const filteredInventory = inventory.item.filter(item => item.value && item.value <= 5000).map(i => ({ name: i.name, value: i.value, weight: i.weight }));

const App: React.FC = () =>
  <Container fluid>
    <Grid divided={true}>
      <Grid.Row>
        <Grid.Column width="8">          
        </Grid.Column>
        <Grid.Column width="8">
          <InventoryTable inventory={filteredInventory} />
        </Grid.Column>
      </Grid.Row>

    </Grid>
  </Container>


export default App;
