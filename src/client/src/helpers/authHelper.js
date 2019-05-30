export default (formType, authData) => {
	if (formType === 'Login') {
		return {
			user: authData.data.login.user,
			token: authData.data.login.token,
		};
	}
	return {
		user: authData.data.register.user,
		token: authData.data.register.token,
	};
};
