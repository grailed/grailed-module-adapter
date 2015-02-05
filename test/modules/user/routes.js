module.exports = function ( _module ) {
	return [ {
		path: '/login',
		post: _module.controller.login
	}, {
		path: '/:id',
		get: _module.controller.getById
	} ];
};