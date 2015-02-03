module.exports = function ( _module ) {
	return [ {
		path: '/user/login',
		post: _module.controller.login
	}, {
		path: '/user/:id',
		get: _module.controller.getById
	} ];
};