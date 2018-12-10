import React, { Component } from 'react';
import './catalog.css'

const Item = (props) => {
    return (
        <div className="item">
            <div style={{display: 'inline-block', verticalAlign: 'text-bottom', paddingLeft: 20}}>
                <span className="item_name">{props.item_name}</span>
                <span>${props.price}</span>
            </div>
            <div style={{fontSize:10, display:'inline-block', float: 'right', padding: 20}}>
                Item #: {props.item_id}
                <br/>
                Stock: {props.amount_in_stock}
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