import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Container, Grid, Form, Menu, Dropdown } from 'semantic-ui-react';
import { EditableHeader } from './components/EditableHeader';
import { Inventory } from './components/Inventory';
import { InventoryTable, InventoryItemProps } from './components/InventoryTable';
import inventory from './computed/items.json';
import itemTypes from './computed/itemTypes.json'
import phb from './computed/phb.json';

const capitalizeFirstLetter = (s: string) => {
  return s[0].toUpperCase() + s.slice(1);
}

// const filteredInventory = (gp: number, sourcebook: string, type: string) => {
//   return inventory
//     .filter(item => item.value !== undefined)
//     .filter(item => (!sourcebook) ? item : item.source === sourcebook)
//     .filter(item => item.value && item.value <= gp * 100)
//     .filter(item => item.source === sourcebook)
//     .filter(item => item.type === type)
//     .map(i => ({ name: i.name, value: i.value, weight: i.weight } as InventoryItemProps));
// }

// const sourcebooksAsOptions = Object.entries(sourcebooks).sort().map(([key, value]) => ({ key, text: value, value: key }));
// const sourcebooksAsOptions = [{ key, 'PHB': "Player's Handbook", value: 'PHB' }];
//TODO: Move the capitalization to precompute
const itemTypesMap = new Map(Object.entries(itemTypes))
const phbMap = new Map(Object.entries(phb));
const phbAsOptions = Object.keys(phb).sort().map((key) => ({ key, text: capitalizeFirstLetter(itemTypesMap.get(key) as string), value: key }));
// const itemTypesAsOptions = [
//   { key: 'A', text: capitalizeFirstLetter('Ammunition'), value: 'A' },
//   { key: 'SCF-druid', text: capitalizeFirstLetter('Druidic Focus'), value: 'SCF-druid' },
//   { key: 'SCF-arcane', text: capitalizeFirstLetter('Arcane Focus'), value: 'SCF-arcane' },
//   { key: 'SCF-holy', text: capitalizeFirstLetter('Hold Focus'), value: 'SCF-holy' }
// ]



const App: React.FC = () => {
  // const [sourceBook, setSourceBook] = useState<string>('PHB');
  // const sourceBookOnChange = (event: SyntheticEvent, data: any) => {
  //   setSourceBook(data.value);
  // };

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

  const [itemType, setItemType] = useState<string[]>([]);
  const itemTypeOnChange = (event: SyntheticEvent, data: any) => {
    setItemType(data.value);
  };

  const selectedTypesToCategories = (selectedCats: string[]) => {
    return new Map<string, any>(selectedCats.flatMap((c) => Object.entries(phbMap.get(c) as any)));    
  }

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
                      <EditableHeader
                        value={shopName}
                        onChange={shopNameOnChange}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width="16">
                      <Form>
                        <Form.Field
                          label="Items up to (GP)"
                          control="input"
                          type="number"
                          onChange={gpOnChange}
                          value={gp}
                        />
                        <Form.Select
                          label="Item Type"
                          search
                          selection
                          multiple
                          onChange={itemTypeOnChange}
                          value={itemType}
                          options={phbAsOptions}
                        />                                            
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <Inventory categories={selectedTypesToCategories(itemType)} /> 
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
}


export default App;
