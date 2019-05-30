import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import VueApollo from 'vue-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import router from './router';

import App from './App.vue';

import typeDefs from './graphql/typeDefs/index';
import resolvers from './graphql/resolvers/index';
import defaults from './graphql/defaults';

const cache = new InMemoryCache();

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' }); // BACKEND LINK

const stateLink = withClientState({
	cache,
	typeDefs,
	defaults,
}); // FRONTEND LOCAL STATE LINK

const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers
	operation.setContext({
		headers: {
			authorization: localStorage.getItem('auth-token') || '',
		},
	});
	return forward(operation);
});

const client = new ApolloClient({
	cache,
	link: ApolloLink.from([ authMiddleware, stateLink, httpLink ]),
	resolvers,
	connectToDevTools: true,
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
	defaultClient: client,
	errorHandler(error) {
		console.log('Global error handler');
		console.error(error);
	},
});

Vue.config.productionTip = false;

new Vue({
	router,
	apolloProvider,
	render: (h) => h(App),
}).$mount('#app');
