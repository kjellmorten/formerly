/*
* formpoly
*
* @package formpoly
* @author $Author: kjellmorten $
* @version $Id: formpoly.js, v 0.1 $
* @license GNU
* @copyright (c) Kjell-Morten Bratsberg Thorsen http://kjellmorten.no/
*/

var formpoly = (function () {
	var _elsToValidate = 'text search tel url email password datetime date month week ' +
						'time datetime-local number range color checkbox radio file ' +
						'submit select-one select-multiple textarea'.split(' '),
		_validity = {
						valueMissing: false,
						typeMismatch: false,
						patternMismatch: false,
						tooLong: false,
						rangeUnderflow: false,
						rangeOverflow: false,
						stepMismatch: false,
						customError: false,
						valid: true
					};

	/*
	 * Private help functions
	 */

	function _setValidity (el, trueProp) {
		for (var prop in el.validity) {
			el.validity[prop] = false;
		}
		el.validity[trueProp] = true;
	}
	
	function _checkRequired (el) {
		return ((el.attributes['required'] !== undefined) && !(el.value));
	}

	/*
	 * Constraints interface
	 */

	function _willValidate (el) {
		return (_elsToValidate.indexOf(el.type) !== -1);
	}
	
	function _setCustomValidity (message) {
		this.validationMessage = message;
		_setValidity(this, (message === '') ? 'valid' : 'customError');
	}
	
	function _checkValidity () {
		var valueMissing = _checkRequired(this);
		if (valueMissing) {
			_setValidity (this, 'valueMissing');
		}
		return !valueMissing;
	}


	/*
	 * Initialization
	 */

	function initElement (el) {
		if (el.willValidate === undefined) {
			el.willValidate = _willValidate(el);
		}
		if ((el.setCustomValidity === undefined) || (el.validity === undefined) 
				|| (el.checkValidity === undefined) || (el.validationMessage === undefined)) {
			el.setCustomValidity = _setCustomValidity;
			el.validity = _validity;
			el.checkValidity = _checkValidity;
			el.validationMessage = '';
		}
	}
	
	function init (form) {
		
	}
	
	/*
	 * The formpoly object.
	 */
	
	return {
		init: init,
		initElement: initElement
	};
	
})();
