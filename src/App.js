import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AllConversationsWithData from './ComponentsWithData/AllConversationsWithData';
import AddConversationWithData from './ComponentsWithData/AddConversationWithData';
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import AWSAppSyncClient from "aws-appsync";
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import AppSync from './AppSync.js';
import PropTypes from 'prop-types';

const client = new AWSAppSyncClient({
    url: AppSync.graphqlEndpoint,
    region: AppSync.region,
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: AppSync.apiKey,

        // type: AUTH_TYPE.AWS_IAM,
        // Note - Testing purposes only
        /*credentials: new AWS.Credentials({
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        })*/

        // Amazon Cognito Federated Identities using AWS Amplify
        //credentials: () => Auth.currentCredentials(),

        // Amazon Cognito user pools using AWS Amplify
        // type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        // jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
    },
    disableOffline: true
});

class App extends Component {
    
    static childContextTypes = {
        client: PropTypes.object,
    };
    
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        userId: '',
    });

    getChildContext() {
        return {
            client,
        };
    }

    handleChange = (event) => {
        const { target: { value } } = event;

        this.setState({
            userId: value
        });
    }
    
    render() {
        return (
        <div className="App">
            <div>
                <label>User ID<input type="text" placeholder="User ID" value={this.state.userId} onChange={this.handleChange.bind(this)} /></label>
            </div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
            { this.state.userId && <AddConversationWithData userId={ this.state.userId } /> }
            { this.state.userId && <AllConversationsWithData userId={ this.state.userId } /> }
        </div>
        );
    }
}

const WithProvider = () => (
    <ApolloProvider client={client}>
        <Rehydrated>
            <App />
        </Rehydrated>
    </ApolloProvider>
);

export default WithProvider;