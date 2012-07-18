/*global document, window */
/*jslint white: true, plusplus: false, onevar: true, nomen: false, undef: true, newcap: true, regexp: true, bitwise: true, maxerr: 50, indent: 4 */

/*
* formerly
*
* @package formerly
* @author $Author: kjellmorten $
* @version $Id: formerly.js, v 0.6.2 $
* @license BSD
* @copyright (c) Kjell-Morten Bratsberg Thorsen http://kjellmorten.no/
*/

var formerly = (function () {
	var _elsToValidate = 'text search tel url email password datetime date month week time datetime-local number ' +
						 'range color checkbox radio file submit select-one select-multiple textarea'.split(' '),
		_emailRegExp = /^[a-z][a-z0-9!#$%&'*+\-\/=?\^_`{|}~\.]*@[a-z0-9\-]+(\.[a-z0-9\-]+)*$/i,
		_urlRegExp = /^\s*[a-z][a-z0-9+\-\.]+:\/\//i,
		_config = {
			touchSupporting: true,
			validClass: 'valid',
			invalidClass: 'invalid'
		};

	/*
	 * Private help functions
	 */
	 
	function _getAttr(el, attr) {
		return el.getAttribute(attr);
	}
	 
	function _removeLeadingSpace(str) {
		return (str.charAt(0) === ' ') ? str.substr(1) : str;
	}

	function _addClass(el, className) {
		if (!(new RegExp("(^|\\s)" + className + "(\\s||$)")).test(el.className)) {
			el.className = _removeLeadingSpace(el.className + ' ' + className);
		}
	}
	
	function _removeClass(el, className) {
		el.className = _removeLeadingSpace(el.className.replace(new RegExp("(?:^|\\s)" + className + "(?!\\S)"), ''));
	}
	
	function _catchEvent(el, type, handler) {
		if (el.addEventListener !== undefined) {
			el.addEventListener(type, handler, true);		// Modern browsers
		} else if (el.attachEvent !== undefined) {
			el.attachEvent('on' + type, handler);			// Old IEs
		}
	}
	
	function _throwEvent(el, type) {
		var event;
		if (el.dispatchEvent !== undefined) {
			event = document.createEvent("HTMLEvents");		// Modern browsers
			event.initEvent(type, false, true);
			el.dispatchEvent(event);
		} else if (el.fireEvent !== undefined) {
		    event = document.createEventObject();			// Old IEs
		    event.eventType = type;
		    el.fireEvent("on" + type, event);
		}
	}

	function _getEvent(event) {
		return (event) ? event : window.event;
	}

	function _setConfig(config) {
		var prop;
		if (config) {
			for (prop in config) {
				if (_config[prop] !== undefined) {
					_config[prop] = config[prop];
				}
			}
		}
	}
	

	/*
	 * Validation methods
	 */
	
	function _checkValueMissing(el) {
		return ((el.attributes.required !== undefined) && (el.value === ''));
	}
	
	function _checkTypeMismatch(el) {
		var type = _getAttr(el, 'type');
		if (type) {
			switch (type) {
			case 'email':
				return !(_emailRegExp.test(el.value));
			case 'url':
				return !(_urlRegExp.test(el.value));
			}
		}
		
		return false;
	}
	
	function _checkPatternMismatch(el) {
		var pattern = _getAttr(el, 'pattern');
		if (pattern) {
			try {
				return !(new RegExp('^' + pattern + '$').test(el.value));
			} catch (err) {}
		}

		return false;
	}
	
	function _checkTooLong(el) {
		return ((el.maxLength !== -1) && (el.value !== el.defaultValue) && (el.value.length > el.maxLength));
	}
	
	function _checkRangeUnderflow(el) {
		var val, min = _getAttr(el, 'min');
		if (min) {
			val = parseFloat(el.value);
			min = parseFloat(min);
			return (min > val);
		}
		
		return false;
	}

	function _checkRangeOverflow(el) {
		var val, max = _getAttr(el, 'max');
		if (max) {
			val = parseFloat(el.value);
			max = parseFloat(max);
			return (val > max);
		}
	
		return false;
	}
	
	function _checkStepMismatch(el) {
		var val, step = _getAttr(el, 'step'), min = _getAttr(el, 'min');
		if (step) {
			val = parseFloat(el.value);
			step = parseFloat(step);
			if ((val) && (step)) {
				if ((min) && (min = parseFloat(min))) {
					val -= min;
				}
				return ((val % step) !== 0);
			}
		}
		
		return false;
	}

	function _getValidState(el) {
		var val = el.validity;
		return !(
			val.valueMissing || val.typeMismatch || val.patternMismatch || 
			val.tooLong || val.rangeUnderflow || val.rangeOverflow || 
			val.stepMismatch || val.customError
		);
	}

	function _setValidity(el, valueMissing, typeMismatch, patternMismatch, tooLong, rangeUnderflow, rangeOverflow, stepMismatch, customError) {
		var val = el.validity;
		val.valueMissing = valueMissing;
		val.typeMismatch = typeMismatch;
		val.patternMismatch = patternMismatch;
		val.tooLong = tooLong;
		val.rangeUnderflow = rangeUnderflow;
		val.rangeOverflow = rangeOverflow;
		val.stepMismatch = stepMismatch;
		val.customError = customError;
		val.valid = _getValidState(el);
	}

	function _setValidityClass(el) {
		var validClass = _config.validClass, invalidClass = _config.invalidClass;
		_addClass(el, (el.validity.valid) ? validClass : invalidClass);
		_removeClass(el, (el.validity.valid) ? invalidClass : validClass);
	}

	function _validate(el) {
		if (el.willValidate) {
			var hasval = (el.value !== '');
			_setValidity(el,
				_checkValueMissing(el),
				(hasval && _checkTypeMismatch(el)),
				(hasval && _checkPatternMismatch(el)),
				(hasval && _checkTooLong(el)),
				(hasval && _checkRangeUnderflow(el)),
				(hasval && _checkRangeOverflow(el)),
				(hasval && _checkStepMismatch(el)),
				el.validity.customError
			);
			
			_setValidityClass(el);
		}
	}


	/*
	 * Event handlers
	 */

	function _submitHandler(event) {
		event = _getEvent(event);
		if ((this.novalidate !== true) && !this.checkValidity()) {
			if (event.preventDefault !== undefined) {
				event.preventDefault();
			} else if (event.returnValue !== undefined) {
				event.returnValue = false;
			} else {
				return false;
			}
		}
	}

	
	/*
	 * Constraints interface
	 */
	 
	function _willValidate(el) {
		return ((!el.disabled) && (!el.readOnly) && (_elsToValidate.indexOf(el.type) !== -1));
	}
	
	function _setCustomValidity(message) {
		this.validationMessage = message;
		this.validity.customError = (message !== '');
		this.validity.valid = _getValidState(this);
	}
	
	function _checkValidity() {
		if (!this.willValidate) {
			return true;
		}

		_validate(this);
		
		if (!this.validity.valid) {
			_throwEvent(this, 'invalid');
		}

		return this.validity.valid;
	}

	function _checkValidityForm() {
		var valid = true, i, il;
		
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
	function initElement(el) {
		var handler, originalCheckValidity;

		if (el.checkValidity === undefined) {

			// Set up polyfills
			el.willValidate = _willValidate(el);
			el.setCustomValidity = _setCustomValidity;
			el.validity = {};
			_setValidity(el, false, false, false, false, false, false, false, false);
			el.checkValidity = _checkValidity;
			el.validationMessage = '';
			
			// Validate element on keyup, change and blur events
			handler = function () {
				_validate(el);
			};

		} else if (_config.touchSupporting) {

			// Wrap browsers checkValidity to update validity classes at validation
			originalCheckValidity = el.checkValidity;
			el.checkValidity = function () {
				var ret = originalCheckValidity.call(this);
				_setValidityClass(el);
				return ret;
			};

			// Update validity classes on keyup, change and blur events
			handler = function () {
				_setValidityClass(el);
			};

		}

		// Bind listeners to element
		if (handler) {
			_catchEvent(el, 'keyup', handler);
			_catchEvent(el, 'change', handler);
			_catchEvent(el, 'blur', handler);
		}
	}
	
	// Inits a form
	function _initForm(form) {
		var i, il, unsupp = (form.checkValidity === undefined);

		this.isPolyfilling = unsupp;

		if ((_config.touchSupporting) || (unsupp)) {
			for (i = 0, il = form.length; i < il; i++) {
				this.initElement(form.elements[i]);
			}
		}
		
		if (unsupp) {
			form.checkValidity = _checkValidityForm;
		
			// Listen for submit event and cancel if form not valid
			_catchEvent(form, 'submit', _submitHandler);
		}
	}

	// Inits the given form or, if none is given, all forms.
	function init(form, config) {
		var i, il, 
			forms = (form) ? [form] : this.getForms();
		
		_setConfig(config);
	
		for (i = 0, il = forms.length; i < il; i++) {
			_initForm.call(this, forms[i]);
		}
	}
	
	/*
	 * The formerly object.
	 */
	
	return {
		init: init,
		initElement: initElement,
		getForms: getForms,
		isPolyfilling: false
	};
	
}());
