import { graphql, compose } from 'react-apollo';
import AllConversations from '../Components/AllConversations';
import AllConversationsQuery from '../Queries/AllConversations';
import NewConversationSubscription from '../Queries/SubscribeToNewConversation';

const AllConversationsWithData = compose(
    graphql(AllConversationsQuery, {
        options: (ownProps) => ({
            variables: {
                userId: ownProps.userId
            }
        }),
        props: (props) => {
            console.log(props);
            return ({
                conversations: props.data.allConversations,
                userId: props.ownProps.userId,
                subscribeToNewConversation: params => {
                    props.data.subscribeToMore({
                        variables: { userId: props.ownProps.userId },
                        document: NewConversationSubscription,
                        updateQuery: (prev, { subscriptionData: { data : { subscribeToNewConversation } } }) => {
                            return ({
                                ...prev,
                                allConversations: [ subscribeToNewConversation, ...prev.allConversations ]
                            })
                    }
                    });
                },
            })
        }
    }),
)(AllConversations);

export default AllConversationsWithData;