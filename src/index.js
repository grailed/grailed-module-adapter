var modules = {};

module.exports = function ( _dirname, _name, _options ) {

	// If the module has already been parsed stop and return it
	if ( modules[ _name ] ) return modules[ _name ];

	var is = require( 'sc-is' ),
		path = require( 'path' ),
		merge = require( 'sc-merge' ),
		include = require( 'include-all' ),
		options = merge( {
			dirname: path.join( _dirname, 'module' ),
			filter: /(.+)\.js$/
		}, _options );

	if ( is.empty( _name ) || is.not.a.string( _name ) ) throw new Error( 'An invalid name was given' );

	var theModule = include( options );

	theModule.name = _name;
	theModule.options = options;

	if ( is.not.an.array( theModule.options.routes ) && is.empty( theModule.options.routes ) ) {
		try {
			theModule.options.routes = require( path.join( _dirname, 'routes' ) )( theModule );
		} catch ( e ) {
		}
	} else if ( is.not.an.array( theModule.options.routes ) && is.not.empty( theModule.options.routes ) ) {
		throw new Error( 'The module `' + theModule.name + '` has routes defined but it is not an Array.' );
	}

	// Initiate the routes
	if ( theModule.options.routes ) theModule.router = require( './router' )( theModule );

	modules[ theModule.name ] = theModule;

	return theModule;
};