import React from 'react';

export class ItemDescription extends React.Component {
    constructor() {
      super();
      this.state = {
          selectedItem: {},
          selectedColor: 0,
          selectedMemory: 0, 
      };
    }

    componentDidMount() {
        fetch('https://front-test-api.herokuapp.com/api/product/' + this.props.selectedItem.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ selectedItem: data });
                console.log(data)
            });
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

   
    render() {
      const item = this.state.selectedItem
      const infoToList = [
        'battery',
        'brand',
        'cpu',
        'dimentions',
        'displayResolution',
        'model',
        'os',
        'price',
        'ram',
        'secondaryCmera',
        'weight',
      ]
      const dataList = infoToList.map((info)=>{
        return <li>{item[info]}</li>;
    });
      console.log(item, "EEEe",this.props.selectedItem);
      return (
        <div className="item-description-container">
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
                        {dataList}
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
      )
    }
}