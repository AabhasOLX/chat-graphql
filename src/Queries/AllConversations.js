import gql from 'graphql-tag';

export default gql`
query AllConversations($userId: Int!) {
    allConversations(user_id: $userId) {
        conversation_id,
        buyer_id,
        seller_id,
        ad_id,
        category_id,
        timestamp
    }
}`;