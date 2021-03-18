import React from 'react';
import inventory from './constant/items.json';

function inventoryList() {

  return inventory.item.map(item => {

    return <tr>
      <td>{item.name}</td>
      <td>{item.value}</td>
      <td>{item.weight}</td>        
    </tr>

  });
}


function App() {
  return (

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Cost</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        {inventoryList()}
      </tbody>

    </table>
  )
}

export default App;
