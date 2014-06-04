'use strict';

module.exports = {
	/*
	 * validate var
	 * @param string var - user input
	 */
	validateVar: function (inputVar) {
		if (inputVar === null || (inputVar && inputVar.length < 1) || typeof inputVar === 'undefined' || !inputVar) {
			return false;
		} else {
			return true;
		}
	},

	/**
	 * validate number
	 * @param number num - user input: num
	 */
	validateNumber: function (num) {
		//word characters such as 0-9
		if (this.validateVar(num)) {
			var regex = /^\d+$/;
			if (regex.test(num)) {
				return;
			} else {
				return 'Invalid Number';
			}
		} else {
			return 'Invalid Number';
		}
	},

	/**
	 * validate string
	 * @param string str - user input: string
	 */
	validateUsername: function (str) {
		//word characters such as 0-9, A-Z, a-z, _
		//literal period
		//literal @
		//must have at least one letter
		//between 6 and 40 characters long
		if (this.validateVar(str)) {
			var regex = /^(?=.*[a-zA-Z])([a-zA-Z0-9.@_]+){6,40}$/;
			if (regex.test(str)) {
				return;
			} else {
				return 'Invalid String';
			}
		} else {
			return 'Invalid String';
		}
	},

	/**
	 * validate id
	 * @param string id - user input: id
	 */
	validateId: function (id) {
		//word characters such as 0-9,
		//between 1 and 45 characters long
		if (this.validateVar(id)) {
			var regex = /^[0-9a-fA-F]{24}$/;
			if (regex.test(id)) {
				return;
			} else {
				return 'Invalid Id';
			}
		} else {
			return 'Invalid Id';
		}
	}
};