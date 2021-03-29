import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Container, Grid, Form, Menu, DropdownProps } from 'semantic-ui-react';
import { EditableHeader } from './components/EditableHeader';
import { InventoryTable, InventoryItemProps } from './components/InventoryTable';
import inventory from './constant/items.json';
import sourcebooks from './computed/sourcebooks.json';

const filteredInventory = (gp: number, sourcebook?: string) => {
  return inventory.item
    .filter(item => item.value !== undefined)
    .filter(item => (!sourcebook) ? item : item.source === sourcebook)
    .filter(item => item.value && item.value <= gp * 100)
    .filter(item => item.source === sourcebook)
    .map(i => ({ name: i.name, value: i.value, weight: i.weight } as InventoryItemProps));
}

const sourcebooksAsOptions = Object.entries(sourcebooks).sort().map(([key, value]) => ({ key, text: value, value: key }));

const App: React.FC = () => {
  const [sourceBook, setSourceBook] = useState<string>('PHB');
  const sourceBookOnChange = (event: SyntheticEvent, data: any) => {
    setSourceBook(data.value);
  };

  const [shopName, setShopName] = useState<string>('A Mercantile Enterprise');
  const shopNameOnChange = (event: ChangeEvent) => {
    const newValue = (event.target as HTMLInputElement).value;
    setShopName(newValue);
  };

  const [gp, setGp] = useState<number>(50);
  const gpOnChange = (event: Event) => {
    const newValue = (event.target as HTMLInputElement).value;
    setGp(Number(newValue));
  };

  return (
    <>
      <Menu>
        <Menu.Item header>Mercantile</Menu.Item>
      </Menu>
      <Container fluid className="main">
        <Grid divided={true}>
          <Grid.Row>
            <Grid.Column width="8">

              <div className="add-margin-top">
                <Grid padded className="entry-form">
                  <Grid.Row>
                    <Grid.Column width="16">
                      <EditableHeader value={shopName} onChange={shopNameOnChange} />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width="16">
                      <Form>
                        <Form.Select label='Sourcebook' search selection onChange={sourceBookOnChange} value={sourceBook} options={sourcebooksAsOptions} />
                        <Form.Field label='Items up to (GP)' control='input' type='number' onChange={gpOnChange} value={gp} />
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>

            </Grid.Column>
            <Grid.Column width="8">
              <InventoryTable inventory={filteredInventory(gp, sourceBook)} />
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Container>
    </>);
}


export default App;
