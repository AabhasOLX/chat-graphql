import gql from 'graphql-tag';

export default gql`
mutation messageReceived($msg_id: ID!, $receiver_id: Int!, $sender_id: Int!) {
    messageReceived(
        msg_id: $msg_id
        sender_id: $sender_id
        receiver_id: $receiver_id
    ) {
        msg_id
    }
}`;