var config = require( '../config' );

describe( 'grailed module adapter', function () {

	it( 'should work', function () {
		var userModule = require( path.join( process.cwd(), 'test/modules/user' ) );

		userModule.name.should.eql( 'user' );
		userModule.router.should.be.a.Function;
		userModule.controller.login.should.be.a.Function;
		userModule.service.login.should.be.a.Function;
	} );

} );