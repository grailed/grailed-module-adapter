module.exports = function ( _module ) {
	var _ = require( 'underscore' ),
		is = require( 'sc-is' ),
		module = _module,
		express = require( 'express' ),
		routes = module.options.routes,
		router = express.Router();

	if ( !Array.isArray( routes ) ) throw new Error( 'The routes for the module ' + module.name + ' is not a valid Array.' );

	routes.forEach( function ( _route ) {
		Object.keys( _route ).forEach( function ( _verb ) {
			var route = _route[ _verb ],
				errorString = 'The route `' + _verb.toUpperCase() + ' ' + _route.path + '` for the module `' + module.name + '` was not an Array or Function';

			if ( _verb === 'path' ) return;

			if ( is.not.an.array( route ) && is.not.a.func( route ) )
				throw new Error( errorString );

			if ( is.an.array( route ) ) {
				_.each( route, function ( _middleware ) {
					if ( is.not.a.func( _middleware ) ) throw new Error( errorString );
				} );
			}

			router[ _verb ]( _route.path, route );
		} );
	} );

	return router;
};