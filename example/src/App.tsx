import React, { Component } from 'react';

import { TestComponent, Diagram } from './reactComponentLib';

class App extends Component {
  render() {
    return (
      <div>
        <Diagram>Test</Diagram>
      </div>
    );
  }
}

export default App;
