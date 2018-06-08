import { graphql, compose } from 'react-apollo';
import AllMessages from '../Components/AllMessages';
import AllMessagesQuery from '../Queries/AllMessages';
import NewMessagesSubscription from '../Queries/SubscribeToNewMessages';
import MessageStateChangeSubscription from '../Queries/SubscribeToMessageStateChange';
//import AddTodo from '../ComponentsWithData/SendMessageStatus';

const AllMessagesWithData = compose(
    graphql(AllMessagesQuery, {
        options: (ownProps) => ({
            variables: {
                userId: ownProps.userId,
                conversationId: ownProps.conversationId
            }
        }),
        props: (props) => {
            console.log(props);
            return ({
                messages: props.data.messagesByConversation,
                subscribeToNewMessages: params => {
                    props.data.subscribeToMore({
                        variables: { userId: props.ownProps.userId },
                        document: NewMessagesSubscription,
                        updateQuery: (prev, { subscriptionData: { data : { subscribeToNewMessage } }, variables: { userId } }) => {
                            if(subscribeToNewMessage && subscribeToNewMessage.receiver_id == userId) {
                                subscribeToNewMessage.received = true;
                            }
                            return ({
                                ...prev,
                                messagesByConversation: [ subscribeToNewMessage, ...prev.messagesByConversation ]
                            });
                        }
                        // update: (proxy, { data: { subscribeToNewMessage } }) => {
                        //     const data = proxy.readQuery({
                        //         query: AllMessagesQuery,
                        //         // variables: {
                        //         //     userId: ownProps.userId,
                        //         //     conversationId: ownProps.conversationId
                        //         // },
                        //     });
        
                        //     data.messagesByConversation.push(subscribeToNewMessage);
                        //     proxy.writeQuery({
                        //         query: AllMessagesQuery,
                        //         // variables: {
                        //         //     userId: ownProps.userId,
                        //         //     conversationId: ownProps.conversationId
                        //         // },
                        //         data,
                        //     });
                        // },
                    });
                },
                subscribeToMessagesStateChange: params => {
                    props.data.subscribeToMore({
                        variables: { userId: props.ownProps.userId },
                        document: MessageStateChangeSubscription,
                        updateQuery: (prev, { subscriptionData: { data : { subscribeToMessageStateChange } } }) => {
                            return ({
                                ...prev,
                                messagesByConversation: [ ...prev.messagesByConversation.map((message) => {
                                    if (subscribeToMessageStateChange.msg_id === message.msg_id) {
                                        message.received = true;
                                    }
                                    return message;
                                }) ]
                            })
                    }
                    });
                },
            })
        }
    }),
)(AllMessages);

export default AllMessagesWithData;