import { graphql } from 'react-apollo';
import AddMessage from '../Components/AddMessage';
import AddMessageMutation from '../Queries/NewMessage';
//import AllMessagesQuery from '../Queries/AllMessages';
import uuid from 'uuid';

const AddMessageWithData = graphql(AddMessageMutation, {
    props: (props) => ({
        onAdd: message => {
            const variables = { ...message, msgId: uuid.v4(), conversationId: props.ownProps.conversationId };
            return props.mutate({
                variables,
                optimisticResponse: () => ({ createMessage: { ...message, __typename: 'Message', version: 1 } }),
            });
        }
    }),
    options: {
        // refetchQueries: [{ query: AllConversationsQuery }],
        // update: (dataProxy, { data: { addPost } }) => {
        //     const query = AllConversationsQuery;
        //     const data = dataProxy.readQuery({ query });

        //     data.allPost.posts.push(addPost);

        //     dataProxy.writeQuery({ query, data });
        // }
    }
})(AddMessage);

export default AddMessageWithData;