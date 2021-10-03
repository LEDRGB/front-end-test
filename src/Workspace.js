import React from 'react';
import { Header } from './components/Header'
import { ItemList } from './components/ItemList'
import { ItemDescription } from './components/ItemDescription'
import Particles from 'react-particles-js';

// import logo from './logo.svg';


export class Workspace extends React.Component {
    constructor() {
      super();
      this.state = {
        cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : 0,

        beautify: localStorage.getItem("beautify") ? JSON.parse(localStorage.getItem("beautify")) : false,
      };
    }
    componentDidUpdate = () => {
      let lastDate = localStorage.getItem("date")
      if(!lastDate){
        lastDate = new Date() * 1 
        localStorage.setItem('date', new Date() * 1) 
      }
      if((((new Date() * 1) - lastDate) / 1000)>3600){
        this.setDataShouldRefresh(true)
        localStorage.setItem('date', new Date() * 1) 
      }
    }
    setBeautify = (beautify) => {
      this.setState({beautify})
      localStorage.setItem('beautify', beautify);
    }
    setDataShouldRefresh = (should) => {
      this.setState({dataShouldRefresh: should})
    }
    setSelectedItem = (item) => {
        this.setState({selectedItem: item })
    }
    setCart = (items) => {
      const cart = items >1 ? items : this.state.cart + 1
      this.setState({cart})
      localStorage.setItem('cart', cart);
    }
    handleOnSearch = (searchText) => {
      this.setState({ searchText })
    }

    render() {
      return (
        <div className='workpace-container'>
          {this.state.beautify && <Particles 
            style={{position: 'absolute'}}
            params={{
              particles: {
                color: {
                  value: "#000000"
                },
                line_linked: {
                  color: {
                    value: "#000000"
                  }
                },
                number: {
                  value: 100
                },
                size: {
                  value: 3
                }
              }
            }}
          />}
          <div>
              <Header 
                beautify={this.state.beautify} 
                setSelectedItem={this.setSelectedItem} 
                selectedItem={this.state.selectedItem} 
                cart={this.state.cart} 
                setBeautify={this.setBeautify} 
                handleOnSearch={this.handleOnSearch}
                searchText={this.state.searchText}
              />
              {
                  !this.state.selectedItem 
                      ? <ItemList 
                          beautify={this.state.beautify} 
                          setSelectedItem={this.setSelectedItem} 
                          setDataShouldRefresh={this.setDataShouldRefresh} 
                          dataShouldRefresh={this.state.dataShouldRefresh}
                          handleOnSearch={this.handleOnSearch}
                          searchText={this.state.searchText}
                        />
                      : <ItemDescription 
                          beautify={this.state.beautify} 
                          setSelectedItem={this.setSelectedItem} 
                          selectedItem={this.state.selectedItem} 
                          setCart={this.setCart}
                        /> 
              }
          </div>
        </div>
    
      )
    }
}