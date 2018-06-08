import gql from 'graphql-tag';

export default gql`
mutation AddMessageMutation($msgId: ID!, $conversationId: ID!, $receiverId: Int!, $senderId: Int!, $text: String!, $type: String!) {
    createMessage(
        msg_id: $msgId
        conversation_id: $conversationId
        sender_id: $senderId
        receiver_id: $receiverId
        text: $text
        type: $type
    ) {
        msg_id
    }
}`;