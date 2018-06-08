import React, { Component } from "react";

export default class AddConversation extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    static defaultProps = {
        onAdd: () => null
    }

    getInitialState = () => ({
        buyerId: '',
        sellerId: '',
        adId: '',
        categoryId: '',
    });

    handleChange = (field, event) => {
        const { target: { value } } = event;

        this.setState({
            [field]: value
        });
    }

    handleAdd = () => {
        const { buyerId, sellerId, adId, categoryId } = this.state;

        this.setState(this.getInitialState(), () => {
            this.props.onAdd({ buyerId, sellerId, adId, categoryId });
        });
    }

    handleCancel = () => {
        this.setState(this.getInitialState());
    }

    render() {
        return (
            <fieldset >
                <legend>Add new Post</legend>
                <div>
                    <label>Buyer ID<input type="text" placeholder="Buyer ID" value={this.state.buyerId} onChange={this.handleChange.bind(this, 'buyerId')} /></label>
                </div>
                <div>
                    <label>Seller ID<input type="text" placeholder="Seller ID" value={this.state.sellerId} onChange={this.handleChange.bind(this, 'sellerId')} /></label>
                </div>
                <div>
                    <label>Ad ID<input type="text" placeholder="Ad ID" value={this.state.adId} onChange={this.handleChange.bind(this, 'adId')} /></label>
                </div>
                <div>
                    <label>Category ID<input type="text" placeholder="Category ID" value={this.state.categoryId} onChange={this.handleChange.bind(this, 'categoryId')} /></label>
                </div>
                <div>
                    <button onClick={this.handleAdd}>Add new post</button>
                    <button onClick={this.handleCancel}>Cancel</button>
                </div>
            </fieldset>
        );
    }
}