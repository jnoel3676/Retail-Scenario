import React, {Component, Fragment} from 'react';
import './additem.css';

class AddItem extends Component {

    constructor() {
        super();
        this.state ={
            name: '',
            price: '',
            stock: '',
            supplier: '',
            section: ''
        };
        this.showForm = this.showForm.bind(this);
    }

    addItem = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/new-item", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                item_name: this.state.name,
                price: this.state.price,
                stock: this.state.stock,
                section_name: this.state.section,
                supplier_name: this.state.supplier
            })
        }).then(res => res.json());
        this.props.getAllItems();
        return false;
    };

    showForm() {
        return (this.props.addItemFormToggled ? 'block' : 'none');
    }

    render() {
        return (
            <div className="form-popup" style={{display:this.showForm()}}>
                <form className="form-container">
                    <h1>Add Item</h1>

                    <label htmlFor="item-name"><b>Item Name</b></label>
                    <input type="text" placeholder="Enter item name" name="name" onChange={evt1=>this.setState({name: evt1.target.value})} required/>
                    <label htmlFor="stock"><b>Price</b></label>
                    <input type="text" placeholder="Enter price" name="price" onChange={evt2=>this.setState({price: evt2.target.value})} required/>
                    <label htmlFor="stock"><b>Stock</b></label>
                    <input type="text" placeholder="Enter amount in stock" name="stock" onChange={evt3=>this.setState({stock: evt3.target.value})} required/>
                    <label htmlFor="supplier"><b>Supplier Name</b></label>
                    <input type="text" placeholder="Enter supplier name" name="supplier" onChange={evt4=>this.setState({supplier: evt4.target.value})} required/>
                    <label htmlFor="section"><b>Section Name</b></label>
                    <input type="text" placeholder="Enter section name" name="section" onChange={evt5=>this.setState({section: evt5.target.value})} required/>

                    <button className="submit"
                            onClick={this.addItem.bind(this)}>Submit</button>
                </form>
            </div>
        )
    }
}

export default AddItem;