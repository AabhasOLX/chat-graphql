import gql from 'graphql-tag';

export default gql`
query AllMessages($userId: Int!, $conversationId: ID!) {
    messagesByConversation(user_id: $userId, conversation_id: $conversationId) {
        msg_id,
        conversation_id,
        sender_id,
        receiver_id,
        received,
        displayed,
        text
    }
}`;