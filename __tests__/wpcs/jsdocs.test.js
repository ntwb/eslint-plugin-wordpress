'use strict';

const eslint = require( 'eslint' );
const path = require( 'path' );
const stripAnsi = require( 'strip-ansi' );

const configFile = path.resolve( __dirname, '../../lib/configs/jsdoc.js' );
const linter = new eslint.CLIEngine({
	configFile,
	ignorePath: './.gitignore',
	useEslintrc: false,
});

describe( 'JSDoc config tests', () => {
	let formatter;
	let report;

	beforeEach(() => {
		report = linter.executeOnFiles(['__tests__/wpcs/fixtures/jsdocs.js']);
		formatter = stripAnsi( linter.getFormatter( 'codeframe' ) );
	});

	test( 'should have correct error and warning counts', () => {

		expect( report.results ).toHaveLength( 1 );
		expect( report.errored ).toBeFalsy();
		expect( report.errorCount ).toBe( 4 );
		expect( report.warningCount ).toBe( 3 );
		expect( report.fixableErrorCount ).toBe( 3 );
		expect( report.fixableWarningCount ).toBe( 0 );
	});

	test( 'lint results should match snapshot', () => {
		let output = formatter( report.results );
		let { results } = report;
		for (let result of results) {
			let relativeFilePath = path.relative( __dirname, result.filePath );
			expect( stripAnsi( output ) ).toMatchSnapshot( relativeFilePath );
		}
	});
});
