import React from 'react';
import { animations, AnimateOnChange, } from 'react-animation'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { HideUntilLoaded } from 'react-animation'





const style = {
    animation: animations.popIn
  }

export class ItemDescription extends React.Component {
    constructor() {
      super();
      this.state = {
          selectedItem: {},
          selectedColor: 0,
          selectedMemory: 0, 
          word: 'display',
          infoToList: {
            'battery': {
                text: 'Batery',
                subText:''
            },
            'brand': {
                text: 'Brand',
                subText:''
            },
            'cpu': {
                text: 'CPU',
                subText:''
            },
            'dimentions': {
                text: 'Dimensions',
                subText:''
            },
            'displayResolution': {
                text: 'Display',
                subText:''
            },
            'model': {
                text: 'Model',
                subText:''
            },
            'os': {
                text: 'OS',
                subText:''
            },
            'price': {
                text: 'Price',
                subText:' €'
            },
            'ram': {
                text: 'RAM',
                subText:''
            },
            'primaryCamera': {
                text: 'Camera',
                subText:''
            },
            'weight': {
                text: 'Weight',
                subText:''
            },
        }
      };
      this.generateRandomWord();
    }

    componentDidMount() {
        fetch('https://front-test-api.herokuapp.com/api/product/' + this.props.selectedItem.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ selectedItem: data });
            });
    }

    generateRandomWord (world){
        setTimeout(() => {
            let world = Object.keys(this.state.infoToList)[Math.floor(Math.random() * Object.keys(this.state.infoToList).length)]
            while(!world || world.length < 1){
                world = Object.keys(this.state.infoToList)[Math.floor(Math.random() * Object.keys(this.state.infoToList).length)]
            }
            this.setState({world})
            this.generateRandomWord();
        }, 2000);
    }

    generate(element) {
        return [0, 1, 2].map((value) =>
          React.cloneElement(element, {
            key: value,
          }),
        );
      }
    

    addItem = () => {
        //The response always return 1
        const response = fetch('https://front-test-api.herokuapp.com/api/cart', {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache',
            credentials: 'same-origin', 
            headers: {
            'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer', 
            body: JSON.stringify({
                id: this.props.selectedItem.id,
                colorCode: this.state.selectedColor + 1,
                storageCode: this.state.selectedMemory + 1,
   
            }) 
        }).then(response => response.json());
        response.then((data) => {
            this.props.setCart(data.count)
        })
          
    }

    onClickcolor = (colorIndex) => {
        this.setState({selectedColor: colorIndex})
    }

    onClickMemory = (memoryIndex) => {
        this.setState({selectedMemory: memoryIndex})
    }

    generatePrettyData = (item) => {
        return Object.keys(this.state.infoToList).map((info)=>{
            return item[info]?.length > 1 && <ListItem>
                <ListItemText
                    primary={this.state.infoToList[info].text}
                    secondary={item[info]}
                />
                </ListItem>
            });
    }

    generateData = (item) => {
        return Object.keys(this.state.infoToList).map((info)=>{
            return  item[info]?.length > 1 && <li>{item[info]?.length > 1 ? item[info] : "No disponible" }</li>;
      });      
    }

   
    render() {
      const item = this.state.selectedItem
      return (
        ! this.props.beautify 
            ? <div className="item-description-container">
                <div className="item-column">
                    <div className="item-img-container">
                        <img 
                            src={item.imgUrl}
                            alt="product-img"
                        />
                    </div>
                </div>           
                <div className="data-container">
                    <div className={"description-container"}>
                        <ul>
                            {this.generateData(item)}
                        </ul>
                    </div>
                    <div className={"actions-container"}>
                        <div className='selectors-row'>
                            {item.internalMemory?.map((memory, index) => {
                            return <div 
                                className={index === this.state.selectedMemory 
                                    ? "memory-button selected-button"
                                    : "memory-button"
                                } 
                                onClick={() => this.onClickMemory(index)}
                                >
                                    {memory}
                                </div>  
                            })}
                        </div>
                        <div className='selectors-row'>
                        {item.colors?.map((color, index) => {
                            return <div 
                                    className={index === this.state.selectedColor 
                                        ? "color-button selected-button"
                                        : "color-button"
                                    } 
                                    onClick={() => this.onClickcolor(index)}
                                    style={{backgroundColor: color}}
                            />      
                            })}
                        </div>
                        <div className='custom-button' onClick={() => { this.addItem()}}>
                            Add to cart
                        </div>
                    </div>
                </div>
            </div> 
            : <div className="item-description-container-beauty" style={ style }>
                <div className="item-column">          
                    <div className="item-img-container-beauty">
                    <HideUntilLoaded   
                         imageToLoad={item.imgUrl}
                         Spinner={() => <div>Loading...</div>} 
                         animationIn="bounceIn"
                         style={{width: '100%'}}>

                        <img 
                            src={item.imgUrl}
                            alt="product-img"
                        />     
                        </HideUntilLoaded>                     
                    </div>
                    <div className="words-container">
                    {this.state.infoToList[this.state.world] && <AnimateOnChange
                            animationOut="bounceOut"
                            animationIn="bounceIn"
                            className="animated-words"
                        >
                            {this.state.infoToList[this.state.world]?.text + ": " + item[this.state.world]}
                        </AnimateOnChange>}
                    </div>          
                </div>           
                <div className="data-container">
                    <div className={"description-container-beauty"}>
                    <List >
                        {this.generatePrettyData(item)}
                    </List>
                    </div>
                    <div className={"actions-container-beauty"}>
                        <div className='selectors-row'>
                            {item.internalMemory?.map((memory, index) => {
                            return <div 
                                className={index === this.state.selectedMemory 
                                    ? "memory-button beauty selected-button"
                                    : "memory-button beauty"
                                } 
                                onClick={() => this.onClickMemory(index)}
                                >
                                    {memory}
                                </div>  
                            })}
                        </div>
                        <div className='selectors-row'>
                        {item.colors?.map((color, index) => {
                            return <div 
                                    className={index === this.state.selectedColor 
                                        ? "color-button-beauty selected-button"
                                        : "color-button-beauty"
                                    } 
                                    onClick={() => this.onClickcolor(index)}
                                    style={{backgroundColor: color}}
                            />      
                            })}
                        </div>
                        <Button variant="contained" onClick={() => { this.addItem()} }> 
                        Add to cart
                        </Button>
                        {/* // <div className='custom-button' onClick={() => { this.addItem()}}>
                        //     Add to cart
                        // </div> */}
                    </div>
                </div>
            </div> 
      )
    }
}