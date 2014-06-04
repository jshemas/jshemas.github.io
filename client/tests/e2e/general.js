'use strict';

describe('general site e2e - ', function() {
	var ptor = protractor.getInstance();
	describe('direct url hit - ', function() {
		it('should be able to get to the homepage by / ', function() {
			browser.get('/');
			expect(browser.getLocationAbsUrl()).toMatch("/");
		});
	});
});