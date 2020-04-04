import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Room from './Room'

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={App}></Route>
        <Route path="/connect/video" component={Room}></Route>
      </div>
    </Router>
  );
}

export default App;
