import React, { Component } from "react";

export default class AddMessage extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    static defaultProps = {
        onAdd: () => null
    }

    getInitialState = () => ({
        senderId: '',
        receiverId: '',
        text: '',
    });

    handleChange = (field, event) => {
        const { target: { value } } = event;

        this.setState({
            [field]: value
        });
    }

    handleAdd = () => {
        const { senderId, receiverId, text } = this.state;

        this.setState(this.getInitialState(), () => {
            this.props.onAdd({ senderId, receiverId, text, type: 'text' });
        });
    }

    handleCancel = () => {
        this.setState(this.getInitialState());
    }

    render() {
        return (
            <fieldset >
                <legend>Add new Message</legend>
                <div>
                    <label>Sender ID<input type="text" placeholder="Sender ID" value={this.state.senderId} onChange={this.handleChange.bind(this, 'senderId')} /></label>
                </div>
                <div>
                    <label>Receiver ID<input type="text" placeholder="Receiver ID" value={this.state.receiverId} onChange={this.handleChange.bind(this, 'receiverId')} /></label>
                </div>
                <div>
                    <label>Text<input type="text" placeholder="Text" value={this.state.text} onChange={this.handleChange.bind(this, 'text')} /></label>
                </div>
                <div>
                    <button onClick={this.handleAdd}>Add new Message</button>
                    <button onClick={this.handleCancel}>Cancel</button>
                </div>
            </fieldset>
        );
    }
}