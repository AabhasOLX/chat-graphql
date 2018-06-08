import gql from 'graphql-tag';

export default gql`
mutation AddConversationMutation($conversationId: ID!, $buyerId: Int!, $sellerId: Int!, $adId: Int!, $categoryId: Int!) {
    createConversation(
        conversation_id: $conversationId
        buyer_id: $buyerId
        seller_id: $sellerId
        ad_id: $adId
        category_id: $categoryId
    ) {
        conversation_id
        buyer_id
        seller_id
        ad_id
        category_id
        timestamp
    }
}`;