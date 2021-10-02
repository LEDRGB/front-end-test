import React from 'react';
import { Breadcrums } from './Breadcrums'
export class Header extends React.Component {
    constructor() {
      super();
      this.state = {};
    }
    render() {
      return (
        <header className="App-header">
           <div 
            className="App-header-text"
            onClick={(() => this.props.setSelectedItem(undefined))}
            >
               HEADER
           </div>
           <div>
            Shopping cart {this.props.cart}
           </div>
           <Breadcrums setSelectedItem={this.props.setSelectedItem} selectedItem={this.props.selectedItem}/> 
        </header> 
      )
    }
}