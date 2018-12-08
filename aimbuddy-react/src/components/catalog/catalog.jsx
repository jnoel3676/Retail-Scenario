import React, { Component } from 'react';
import './catalog.css'

const Item = (props) => {
    return (
        <div style={{display:'inline-block', padding:20}}>
            <div style={{display: 'inline-block', verticalAlign: 'text-bottom', paddingLeft: 20}}>
                <span className="item_name">{props.item_name}</span>
                <span>${props.price} each</span>
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
        item_name: "Banana",
        price: 1.52
    },
    {
        item_name: "Apple",
        price: 1.99
    },
    {
        item_name: "Watermelon",
        price: 4.99
    }
];

class Catalog extends Component {

    render() {
        return (
            <React.Fragment>
                <ItemList items={data}/>
            </React.Fragment>
        );
    }

}

export default Catalog;