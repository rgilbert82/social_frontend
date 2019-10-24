import React from 'react';
import { Header } from '.';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header>
          <Header />
        </header>
      </div>
    );
  }
}
