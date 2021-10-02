import React from 'react';

export class Breadcrums extends React.Component {
    constructor() {
      super();
      this.state = {};
    }
    render() {
      return (
        <div className="breadcrums-container">
            <div onClick={() => this.props.setSelectedItem(undefined)}>
                Home
            </div>
            {this.props.selectedItem?.model && <div>
                /{this.props.selectedItem?.model}
            </div>}
        </div>
      )
    }
}