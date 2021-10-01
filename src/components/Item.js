import React from 'react';

export class Item extends React.Component {
    constructor() {
      super();
      this.state = {color: "red"};
    }
    render() {
        const item = this.props.item
        return (
        <div className={item ? "App-item": "App-item-void"}>
            {item && 
                <>
                    <div className="item-title">
                        {item.brand  + " " + item.model}
                    </div>
                    <div className="img-container">
                        <img 
                            src={item.imgUrl}
                            alt="product-img"
                        />
                    </div>
                    <div>
                        {item.price ? item.price + "€" : 'No disponible' }
                    </div>
                </>
            }
        </div> 
        )
    }
}