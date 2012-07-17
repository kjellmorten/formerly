/*
* formerly
*
* @package formerly
* @author $Author: kjellmorten $
* @version $Id: formerly.js, v 0.1 $
* @license BSD
* @copyright (c) Kjell-Morten Bratsberg Thorsen http://kjellmorten.no/
*/

var formerly = (function () {
	var _elsToValidate = 'text search tel url email password datetime date month week ' +
						'time datetime-local number range color checkbox radio file ' +
						'submit select-one select-multiple textarea'.split(' '),
		_emailRegExp = /^[a-z][a-z0-9!#$%&'*+\-\/=?^_`{|}~\.]*@[a-z0-9\-]+(\.[a-z0-9\-]+)*$/i,
		_urlRegExp = /^\s*[a-z][a-z0-9+\-\.]+:\/\//i;

	/*
	 * Private help functions
	 */

	 function _updateValidState (el) {
		var val = el.validity;
		el.validity.valid = !(
			val.valueMissing || val.typeMismatch || val.patternMismatch || 
			val.tooLong || val.rangeUnderflow || val.rangeOverflow || 
			val.stepMismatch || val.customError
		);
	 }

	function _addClass(el, className) {
		if (el.className === '') {
			el.className = className;
		} else if (!(new RegExp("(^|\\s)" + className + "(\\s||$)")).test(el.className)) {
			el.className += ' ' + className;
		}
	}
	
	function _removeClass(el, className) {
		el.className = el.className.replace(new RegExp("(?:^|\\s)" + className + "(?!\\S)"), '');
		if (el.className.charAt(0) === ' ') {
			el.className = el.className.substr(1);
		}
	}
	
	function _submitHandler (event) {
		if ((this.novalidate !== true) && !this.checkValidity()) {
			if (event.preventDefault !== undefined) {
				event.preventDefault();
			} else if (event.returnValue !== undefined) {
				event.returnValue = false;
			} else {
				return false;
			}
		};
	}
	
	function _throwEvent (el, type) {
		var event;
		if (el.dispatchEvent) {
			event = document.createEvent("HTMLEvents");
			event.initEvent(type, false, true);
			el.dispatchEvent(event);
		} else {
		    event = document.createEventObject();
		    event.eventType = type;
		    el.fireEvent("on" + type, event);
		}
	}
	
	/*
	 * Validation methods
	 */
	
	function _checkValueMissing (el) {
		return ((el.attributes['required'] !== undefined) && (el.value === ''));
	}
	
	function _checkTypeMismatch (el) {
		if (el.value !== '') {
			switch (el.type) {
				case 'email':
					return !(_emailRegExp.test(el.value));
				case 'url':
					return !(_urlRegExp.test(el.value));
				default:
			}
		}
		
		return false;
	}
	
	function _checkPatternMismatch (el) {
		var pattern;
		if ((el.value !== '') && (el.attributes['pattern'] !== undefined) && (pattern = el.attributes['pattern'].value)) {
			try {
				return !(new RegExp('^' + pattern + '$').test(el.value));
			} catch (err) {}
		}

		return false;
	}
	
	function _checkTooLong (el) {
		return ((el.maxLength !== -1) && (el.value.length > el.maxLength));
	}
	
	function _checkRangeUnderflow (el) {
		var val, min;
		if ((el.value !== '') && (el.attributes['min'] !== undefined)) {
			val = parseFloat(el.value);
			min = parseFloat(el.attributes['min'].value);
			return (min > val);
		}
		
		return false;
	}

	function _checkRangeOverflow (el) {
		var val, max;
		if ((el.value !== '') && (el.attributes['max'] !== undefined)) {
			val = parseFloat(el.value);
			max = parseFloat(el.attributes['max'].value);
			return (val > max);
		}
	
		return false;
	}
	
	function _checkStepMismatch (el) {
		var val, step, min;
		if ((el.value !== '') && (el.attributes['step'] !== undefined)) {
			val = parseFloat(el.value);
			step = parseFloat(el.attributes['step'].value);
			if ((val) && (step)) {
				if ((el.attributes['min'] !== undefined) && (min = parseFloat(el.attributes['min'].value))) {
					val -= min;
				}
				return ((val % step) !== 0);
			}
		}
		
		return false;
	}


	/*
	 * Constraints interface
	 */
	 
	function _willValidate (el) {
		return ((!el.disabled) && (!el.readOnly) && (_elsToValidate.indexOf(el.type) !== -1));
	}
	
	function _setCustomValidity (message) {
		this.validationMessage = message;
		this.validity.customError = (message !== '');
		_updateValidState(this);
	}
	
	function _checkValidity () {
		if (!this.willValidate) {
			return true;
		}
	
		this.validity.valueMissing = _checkValueMissing(this);
		this.validity.typeMismatch = _checkTypeMismatch(this);
		this.validity.patternMismatch = _checkPatternMismatch(this);
		this.validity.tooLong = _checkTooLong(this);
		this.validity.rangeUnderflow = _checkRangeUnderflow(this);
		this.validity.rangeOverflow = _checkRangeOverflow(this);
		this.validity.stepMismatch = _checkStepMismatch(this);
		_updateValidState(this);
		
		_addClass(this, (this.validity.valid) ? 'valid' : 'invalid');
		_removeClass(this, (this.validity.valid) ? 'invalid' : 'valid');
		
		if (!this.validity.valid) {
			_throwEvent(this, 'invalid');
		}

		return this.validity.valid;
	}

	function _checkValidityForm () {
		var valid = true;
		
		for (i = 0, il = this.elements.length; i < il; i++) {
			valid = valid && this.elements[i].checkValidity();
		}
		
		return valid;
	}
	
	/*
	 * Initialization
	 */

	// Returns an array of all forms in the document.
	// Abstracted for testing purposes.
	function getForms() {
		return document.forms;
	}

	// Inits an element
	function initElement (el) {
		if (el.checkValidity === undefined) {
			el.willValidate = _willValidate(el);
			el.setCustomValidity = _setCustomValidity;
			el.validity = {
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
			el.checkValidity = _checkValidity;
			el.validationMessage = '';
		}
	}
	
	// Inits a form
	function _initForm (form) {
		var i, il;

		if (form.checkValidity === undefined) {
			form.checkValidity = _checkValidityForm;
		
			for (i = 0, il = form.length; i < il; i++) {
				this.initElement(form.elements[i]);
			}
		
			// Listen for submit event and cancel if form not valid
			if (form.addEventListener) {
				form.addEventListener('submit', _submitHandler, true);		// Modern browsers
			} else {
				form.attachEvent('onsubmit', _submitHandler);				// Old IEs
			}
		}
	}

	// Inits the given form or, if none is given, all forms.
	function init (form) {
		var i, il, forms;
	
		if (form) {
			// Init the given form
			_initForm.call(this, form);
		} else {
			// Init all forms in document
			forms = this.getForms();
			for (i = 0, il = forms.length; i < il; i++) {
				_initForm.call(this, forms[i]);
			}
		}
	}
	
	/*
	 * The formerly object.
	 */
	
	return {
		init: init,
		initElement: initElement,
		getForms: getForms
	};
	
})();
