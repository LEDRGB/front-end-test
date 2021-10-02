import React from 'react';
import { Header } from './components/Header'
import { ItemList } from './components/ItemList'
import { ItemDescription } from './components/ItemDescription'
// import logo from './logo.svg';


export class Workspace extends React.Component {
    constructor() {
      super();
      this.state = {
        cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : 0
      };
    }
    componentDidUpdate = () => {
      let lastDate = localStorage.getItem("date")
      if(!lastDate){
        lastDate = new Date() * 1 
        localStorage.setItem('date', new Date() * 1) 
      }
      console.log(((new Date() * 1) - lastDate) / 1000)
      if((((new Date() * 1) - lastDate) / 1000)>3600){
        this.setDataShouldRefresh(true)
        localStorage.setItem('date', new Date() * 1) 
      }
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
    render() {
      return (
        <div>
            <Header setSelectedItem={this.setSelectedItem} selectedItem={this.state.selectedItem} cart={this.state.cart} />
            {
                !this.state.selectedItem 
                    ? <ItemList setSelectedItem={this.setSelectedItem} setDataShouldRefresh={this.setDataShouldRefresh} dataShouldRefresh={this.state.dataShouldRefresh}/>
                    : <ItemDescription setSelectedItem={this.setSelectedItem} selectedItem={this.state.selectedItem} setCart={this.setCart}/> 
            }
        </div>
    
      )
    }
}