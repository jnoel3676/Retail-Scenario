import React, {Component, Fragment} from 'react';
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
                <br/>
                <ExtraItemInfo show_item_info={props.show_item_info} supplier_id={props.supplier_id} section_id={props.section_id}/>
            </div>
        </div>
    );
};

const ExtraItemInfo = (props) => {

    if (props.show_item_info) {
        return (
            <Fragment>
                Supplier ID: {props.supplier_id}
                <br/>
                Section ID: {props.section_id}
            </Fragment>
        );
    } else {
        return (
            <Fragment></Fragment>
        );
    }
};

const ItemList = (props) => {
    return (
        <div>
            {props.items.map(item => <Item {...item} show_item_info={props.show_item_info}/>)}
        </div>
    );
};

class Catalog extends Component {

    render() {
        return (
            <React.Fragment>
                <ItemList items={this.props.items} show_item_info={this.props.show_item_info}/>
            </React.Fragment>
        );
    }

}

export default Catalog;