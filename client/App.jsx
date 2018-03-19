import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'

import Counter from './components/Counter';

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('react-root')
  );
}

render(Counter)

if (module.hot) {
  module.hot.accept("./components/Counter.js", () => {
    const NewCounter = require("./components/Counter.js").default
    render(NewCounter)
  })
}
