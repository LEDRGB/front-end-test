import React from 'react';
import { Header } from './components/Header'
import { ItemList } from './components/ItemList'
// import logo from './logo.svg';


export class Workspace extends React.Component {
    constructor() {
      super();
      this.state = {color: "red"};
    }
    render() {
      return (
        <div>
            <Header/>
            <ItemList/>
        </div>
    
      )
    }
}