import React from 'react';
import { Search } from './Search'
import { Item } from './Item'
import { animations } from 'react-animation'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import Typography from '@mui/material/Typography';

const style = {
    animation: animations.fadeInUp,
  }
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
        const searchText = this.props.searchText

        if(this.props.searchText && this.props.searchText.length){
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

    generateBeautyGrid = (items) =>{
        let preapredItems = items
        const searchText = this.props.searchText
        const styles = {
            media: {
                height: '15vh',
                paddingTop: '5%', // 16:9,
                objectFit: 'contain'
                // marginTop:'30'
            }
        };

        if(this.props.searchText && this.props.searchText.length){
            preapredItems = items.filter((item) => {
                return item.brand.toLowerCase().includes(searchText.toLowerCase()) || item.model.toLowerCase().includes(searchText);
            })
        }
        preapredItems = preapredItems.map((item) => <Card sx={{ width: '22%' }}>
        <CardActionArea onClick={ ()=> this.props.setSelectedItem(item)}>
          <CardMedia
            component="img"
            height="14"
            style={styles.media}
            image={item.imgUrl}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {item.brand  + " " + item.model}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {item.price ? item.price + "€" : 'No disponible' }
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
        );
        for(let i = preapredItems.length % 4; i<4; i++){
            preapredItems.push(<Item key={Math.random()}/>)
        }
        const rows = preapredItems.length / 4; 
        const ret = []
        for(let i = 0; i <rows; i++){
            ret.push(
                <div className='body-row' key={'row-' + i} >
                    {preapredItems.slice(i*4, (i*4+4))}
                </div>
            )
        }
        return ret;

    }
    
    render() {
      return (
        !this.props.beautify 
            ? <div className="app-body">
                    <header>
                        <Search handleOnChange={this.props.handleOnSearch}/>
                    </header>
                <div className="body-container">
                    {this.generateGrid(this.state.items)}
                </div>
            </div> 
            : <div className="app-body-beauty" style={ style }>
                <div className="body-container">
                    {this.generateBeautyGrid(this.state.items)}
                </div>
            </div> 
      )
    }
}