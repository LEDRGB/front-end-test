import React from 'react';
import { Search } from './Search'
import { Item } from './Item'

export class ItemList extends React.Component {
    constructor() {
      super();
      this.state = {
          items: localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
      };
    }

    componentDidMount() {
        (!this.state.items.length || this.props.dataShouldRefresh) && fetch('https://front-test-api.herokuapp.com/api/product')
            .then(response => response.json())
            .then(data => {
                this.setState({ items: data });
                localStorage.setItem('items', JSON.stringify(data));
                this.props.setDataShouldRefresh(false)
            });
    }

    generateGrid = (items) =>{
        let preapredItems = items
        const searchText = this.state.searchText
        if(this.state.searchText && this.state.searchText.length){
            preapredItems = items.filter((item) => {
                return item.brand.toLowerCase().includes(searchText.toLowerCase()) || item.model.toLowerCase().includes(searchText);
            })
        }
        preapredItems = preapredItems.map((item) => <Item item={item} setSelectedItem={this.props.setSelectedItem} key={'item-'+item.model}/>)
        for(let i = preapredItems.length % 4; i<4; i++){
            preapredItems.push(<Item key={Math.random()}/>)
        }
        const rows = preapredItems.length / 4; 
        const ret = []
        for(let i = 0; i <rows; i++){
            ret.push(
                <div className='body-row' key={'row-' + i}>
                    {preapredItems.slice(i*4, (i*4+4))}
                </div>
            )
        }
        return ret;

    }
    handleOnChange = (searchText) => {
        this.setState({ searchText })
    }
    render() {
      return (
        <div className="App-body">
            <header>
                <Search handleOnChange={this.handleOnChange}/>
            </header>
           <div className="body-container">
              {this.generateGrid(this.state.items)}
           </div>
        </div> 
      )
    }
}