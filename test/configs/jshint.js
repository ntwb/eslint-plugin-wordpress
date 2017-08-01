import isPlainObj from 'is-plain-obj';

test( 'jshint', () => {
	const conf = require( '../../lib/configs/jshint' );

	expect(isPlainObj( conf )).toBe(true);
	expect(isPlainObj( conf.env )).toBe(true);
	expect(isPlainObj( conf.rules )).toBe(true);
});
