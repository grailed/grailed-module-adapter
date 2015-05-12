var modules = {};

module.exports = function ( _dirname, _name ) {

	// If the module has already been parsed stop and return it
	if ( modules[ _name ] ) {
		console.warn( 'Attempted to add the `' + _name + '` module more than once. Maybe you want to rename it?' )
		return modules[ _name ];
	}

	var is = require( 'sc-is' ),
		path = require( 'path' ),
		merge = require( 'sc-merge' ),
		include = require( 'include-all' ),
		options = {
			dirname: path.join( _dirname, 'module' ),
			filter: /(.+)\.js$/
		};

	if ( is.empty( _name ) || is.not.a.string( _name ) ) throw new Error( 'An invalid name was given' );

	var theModule = include( options );

	theModule.name = _name;
	theModule.options = options;
	theModule.initRouter = function () {
		theModule.router = require( './router' )( theModule );
	}

	modules[ theModule.name ] = theModule;
	return theModule;
};
