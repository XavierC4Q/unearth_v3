import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import AuthForm from './views/AuthForm.vue';
import ProfilePage from './views/ProfilePage.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
		},
		{
			path: '/login',
			name: 'Login',
			component: AuthForm,
			props: { formType: 'Login' },
		},
		{
			path: '/register',
			name: 'Register',
			component: AuthForm,
			props: { formType: 'Register' },
		},
		{
			path: '/user/:id',
			name: 'ProfilePage',
			component: ProfilePage,
		},
	],
});
