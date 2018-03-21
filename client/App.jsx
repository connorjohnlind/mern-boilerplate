import React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Link } from 'react-router-dom';

import './App.scss';
import Counter from './components/Counter';
import Aux from './utils/Aux';

const Home = () => (
  <Aux>
    <Counter />
    <Link to="/about">About</Link>
  </Aux>
);

const About = () => (
  <div>About Page</div>
);

const App = () => (
  <div className="App">
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </div>
);

export default hot(module)(App);
