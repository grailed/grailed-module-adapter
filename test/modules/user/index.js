module.exports = function ( _name, _options ) {
	return require( process.cwd() + '/src' )( _name, _options );
};