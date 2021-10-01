import React from 'react';

export class Header extends React.Component {
    constructor() {
      super();
      this.state = {};
    }
    render() {
      return (
        <header className="App-header">
           <div className="App-header-text">
               HEADER
           </div>
        </header> 
      )
    }
}