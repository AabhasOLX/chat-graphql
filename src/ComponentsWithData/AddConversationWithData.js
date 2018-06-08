import { graphql } from 'react-apollo';
import AddConversation from '../Components/AddConversation';
import AddConversationMutation from '../Queries/NewConversation';
//import AllConversationsQuery from '../Queries/AllConversations';
import uuid from 'uuid';

const AddConversationWithData = graphql(AddConversationMutation, {
    props: (props) => ({
        onAdd: conversation => {
            const variables = { ...conversation, conversationId: uuid.v4() };
            return props.mutate({
                variables,
                optimisticResponse: () => ({ addPost: { ...conversation, __typename: 'Conversation', version: 1 } }),
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
})(AddConversation);

export default AddConversationWithData;