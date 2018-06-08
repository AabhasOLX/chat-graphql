import gql from 'graphql-tag';

export default gql`
subscription subscribeToMessageStateChange($userId: Int!) {
    subscribeToMessageStateChange(user_id: $userId) {
        user_id,
        msg_id
    }
}`;