import React, { Component } from "react";
import PropTypes from 'prop-types';
import MessageReceivedMutation from '../Queries/messageReceived';

export default class AllMessages extends Component {

    static contextTypes = {
        client: PropTypes.object
    };
    
    static defaultProps = {
        messages: []
    }

    renderOrEditPost = (post) => {
        return (
            <tr key={post.msg_id}>
                <td>
                    {post.sender_id}
                </td>
                <td>
                    {post.receiver_id}
                </td>
                <td>
                    {post.text}
                </td>
                <td>
                    {post.received}
                </td>
            </tr>
        );
    }

    componentWillMount() {
        this.props.subscribeToNewMessages();
        this.props.subscribeToMessagesStateChange();
    }

    componentWillReceiveProps(nextProps) {
        const { messages } = this.props;
        const newMessages = nextProps.messages.filter(x => !messages.filter((y => y.msg_id === x.msg_id)).length);

        if(newMessages.length && newMessages[0].received) {
            this.context.client.mutate({
                mutation: MessageReceivedMutation,
                variables: { ...newMessages[0] }
            }).then(console.log);
        }
    }

    render() {
        const { messages } = this.props;

        return (<table width="100%">
            <thead>
                <tr>
                    <th>sender_id</th>
                    <th>receiver_id</th>
                    <th>text</th>
                    <th>status</th>
                </tr>
            </thead>
            <tbody>
                {[].concat(messages).map(this.renderOrEditPost)}
            </tbody>
        </table>);
    }
}