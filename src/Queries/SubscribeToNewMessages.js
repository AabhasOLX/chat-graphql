import gql from 'graphql-tag';

export default gql`
subscription subscribeToNewMessage($userId: Int!) {
    subscribeToNewMessage(user_id: $userId) {
        user_id,
        msg_id,
        conversation_id,
        sender_id,
        receiver_id
    }
}`;