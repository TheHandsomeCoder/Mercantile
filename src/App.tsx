/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { Container, Grid, Form, Menu } from "semantic-ui-react";
import { EditableHeader } from "./components/EditableHeader";
import { Inventory } from "./components/Inventory";
import phb from "./computed/phb.json";
import { parseAbreviation } from "./util/parser";

const phbMap = new Map(Object.entries(phb));
const phbAsOptions = Object.keys(phb)
  .map((key) => ({ key, text: parseAbreviation(key), value: key }))
  .sort();

const App: React.FC = () => {
  const [shopName, setShopName] = useState<string>("Players Handbook Gear");
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
                        <Form.Select
                          label="Item Type"
                          search
                          selection
                          multiple
                          onChange={itemTypeOnChange}
                          value={itemType}
                          options={phbAsOptions}
                        />
                        <Form.Field label="Items up to (GP)" control="input" type="number" onChange={gpOnChange} value={gp} />
                      </Form>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <Inventory categories={selectedTypesToCategories(itemType)} gpFilter={gp} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
};

export default App;
