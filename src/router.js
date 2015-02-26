module.exports = function ( _module ) {
	var _ = require( 'underscore' ),
		is = require( 'sc-is' ),
		module = _module,
		express = require( 'express' ),
		path = require( 'path' ),
		fs = require( 'fs' ),
		routes,
		router = express.Router();

	var dir = path.join( module.options.dirname, '../routes.js' );
	if ( fs.existsSync( dir ) ) {
		routes = require( dir )( module );
	}

	if ( routes && !Array.isArray( routes ) ) throw new Error( 'The routes for the module ' + module.name + ' is not a valid Array.' );

	if ( routes ) {
		routes.forEach( function ( _route ) {
			Object.keys( _route ).forEach( function ( _verb ) {
				var route = _route[ _verb ];

				if ( _verb === 'path' ) return;

				if ( is.not.an.array( route ) && is.not.a.func( route ) ) {
					throw new Error( 'The route `' + _verb.toUpperCase() + ' ' + _route.path + '` for the module `' + module.name + '` was not an Array or Function' );
				}

				if ( is.an.array( route ) ) {
					var middleware;
					for ( var i = 0; i < route.length; i++ ) {
						middleware = route[ i ];
						if ( is.not.an.array( middleware ) && is.not.a.func( middleware ) ) {
							throw new Error( 'The middleware in route `' + _verb.toUpperCase() + ' ' + _route.path + '` for the module `' + module.name + '` was not an Array or Function with index ' + i );
						}
					}

				}

				router[ _verb ]( _route.path, route );
			} );
		} );
	}

	return router;
};