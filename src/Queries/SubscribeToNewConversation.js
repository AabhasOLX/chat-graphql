import gql from 'graphql-tag';

export default gql`
subscription subscribeToNewConversation($userId: Int!) {
    subscribeToNewConversation(user_id: $userId) {
        user_id,
        conversation_id,
        buyer_id,
        seller_id,
        ad_id
    }
}`;