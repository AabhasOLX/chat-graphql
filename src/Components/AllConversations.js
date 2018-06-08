import React, { Component } from "react";

import AllMessagesWithData from '../ComponentsWithData/AllMessagesWithData';
import AddMessageWithData from '../ComponentsWithData/AddMessageWithData';

export default class AllConversations extends Component {

    static defaultProps = {
        conversations: []
    }

    constructor(props) {
        super(props);
        this.state = {
            currentConversation: ''
        };
    }

    renderOrEditPost = (post) => {
        return (
            <tr key={post.conversation_id}>
                <td>
                    {post.conversation_id}
                </td>
                <td>
                    {post.buyer_id}
                </td>
                <td>
                    {post.seller_id}
                </td>
                <td>
                    {post.ad_id}
                </td>
                <td>
                    {post.category_id}
                </td>
                <td>
                    <button onClick={this.updateConversation(post.conversation_id)}>Load Message</button>
                </td>
            </tr>
        );
    }

    updateConversation = (conversationId) => () => {
        this.setState({
            currentConversation: conversationId
        });
    }

    componentWillMount() {
        this.props.subscribeToNewConversation();
    }

    render() {
        const { conversations, userId } = this.props;

        return (<div>
            <table width="100%">
            <thead>
                <tr>
                    <th>conversation_id</th>
                    <th>buyer_id</th>
                    <th>seller_id</th>
                    <th>ad_id</th>
                    <th>category_id</th>
                    <th>Load message</th>
                </tr>
            </thead>
            <tbody>
                {[].concat(conversations).map(this.renderOrEditPost)}
            </tbody>
        </table>
        {
            this.state.currentConversation && <AllMessagesWithData userId={ userId } conversationId={ this.state.currentConversation } />
        }
        {
            this.state.currentConversation && <AddMessageWithData conversationId={ this.state.currentConversation } />
        }
        </div>);
    }
}