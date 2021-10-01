import React from 'react';

export class Search extends React.Component {
    constructor() {
      super();
      this.state = {};
    }

    render() {
      return (
        <form action="/" method="get" className="App-search">
            <input
                className={"search-input"}
                type="text"
                id="header-search"
                placeholder="SEARCH"
                name="s" 
                onChange={(evt) => {this.props.handleOnChange(evt.target.value)}}
            />
        </form>
      )
    }
}