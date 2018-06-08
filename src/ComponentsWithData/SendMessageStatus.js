import React from "react";
//import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import MessageReceivedMutation from '../Queries/messageReceived';

const AddTodo = () => {
  return (
    <Mutation mutation={ MessageReceivedMutation }>
      {(addTodo, { data }) => (
          addTodo({ variables: { msgId: 1, receiverId: 2, senderId: 3 } })
      )}
    </Mutation>
  );
};

export default AddTodo;