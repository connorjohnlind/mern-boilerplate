import React from 'react';
import { hot } from 'react-hot-loader';
import Counter from './components/Counter';

import './App.scss';

const App = () => <div className="App"><Counter /></div>;

export default hot(module)(App);
