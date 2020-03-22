import React, { Component } from 'react';

import { TestComponent, Diagram, Node } from './reactComponentLib';

class App extends Component {
  render() {
    return (
      <Diagram width="500px" height="500px">
        <Node>
          <div style={{ height: '90px', width: '90px', backgroundColor: 'lightblue' }}>Test node</div>
        </Node>
      </Diagram>
    );
  }
}

export default App;
