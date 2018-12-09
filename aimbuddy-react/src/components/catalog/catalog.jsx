import React, { Component } from 'react';
import './catalog.css'

const Item = (props) => {
    return (
        <div style={{display:'inline-block', padding:20}}>
            <div style={{display: 'inline-block', verticalAlign: 'text-bottom', paddingLeft: 20}}>
                <span className="item_name">{props.item_name}</span>
                <span>${props.price}</span>
                <div style={{fontSize:10}}>
                    Item #: {props.item_id}
                    <br/>
                    Stock: {props.amount_in_stock}
                </div>
            </div>
        </div>
    );
};

const ItemList = (props) => {
    return (
        <div>
            {props.items.map(item => <Item {...item}/>)}
        </div>
    );
};


let data = [
    {
        item_id: 1,
        item_name: "Banana",
        price: 1.52,
        amount_in_stock: 30
    },
    {
        item_id: 2,
        item_name: "Apple",
        price: 1.99,
        amount_in_stock: 30
    },
    {
        item_id: 3,
        item_name: "Watermelon",
        price: 4.99,
        amount_in_stock: 30
    }
];



class Catalog extends Component {

    render() {
        return (
            <React.Fragment>
                <ItemList items={this.props.items}/>
            </React.Fragment>
        );
    }

}

export default Catalog;