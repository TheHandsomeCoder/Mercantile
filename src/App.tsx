import React, { useState } from 'react';
import { Container, Grid, Form } from 'semantic-ui-react';
import {InventoryTable, InventoryItemProps} from './components/InventoryTable';
import inventory from './constant/items.json';

const filteredInventory = (gp: number) => inventory.item
  .filter(item => item.value !== undefined)
  .filter(item => item.value && item.value <= gp * 100)
  .filter(item => item.source === 'PHB')
  .map(i => ({ name: i.name, value: i.value, weight: i.weight } as InventoryItemProps));


const App: React.FC = () => {
  const [gp, setGp] = useState<number>(50);
  const gpOnChange = (event: Event) => {
    const newValue = (event.target as HTMLInputElement).value;   
    setGp(Number(newValue));
  };
  
  return (
    <Container fluid className="main">
      <Grid divided={true}>
        <Grid.Row>
          <Grid.Column width="8">

            <div className="add-margin-top">
              <Grid padded className="entry-form">
                <Grid.Row>
                  <Grid.Column width="16">
                    <h2>A mercantile enterprise</h2>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width="16">
                    <Form>
                      <Form.Field label='Items up to (GP)' control='input' type='number' onChange={gpOnChange} value={gp} />
                    </Form>
                </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>

          </Grid.Column>
          <Grid.Column width="8">
            <InventoryTable inventory={filteredInventory(gp)} />
          </Grid.Column>
        </Grid.Row>

      </Grid>
    </Container>);
}


export default App;
