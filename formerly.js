/*global document, window */
/*jslint white: true, plusplus: false, onevar: true, nomen: false, undef: true, newcap: true, regexp: true, bitwise: true, maxerr: 50, indent: 4 */

/*
* formerly
*
* @package formerly
* @author kjellmorten
* @version formerly.js, v 0.8.0
* @license BSD
* @copyright (c) Kjell-Morten Bratsberg Thorsen http://kjellmorten.no/
*/

var formerly = (function (window, undef) {
	var document = window.document,
		_elsToValidateRegExp = /^(text|search|tel|url|email|password|datetime|date|month|week|time|datetime-local|number|range|color|checkbox|radio|file|submit|select-one|select-multiple|textarea)$/i,
		_emailRegExp = /^[a-z][a-z0-9!#$%&'*+\-\/=?\^_`{|}~\.]*@[a-z0-9\-]+(\.[a-z0-9\-]+)*$/i,
		_urlRegExp = /^\s*[a-z][a-z0-9+\-\.]+:\/\//i,
		_dateRegExp = /^(\d{4,})-(\d{2})(-(\d{2}))?(T(\d{2})\:(\d{2})(\:(\d{2})(\.(\d+))?)?)?(Z|[\-\+](\d{2}\:\d{2}))?$/i,
		_weekRegExp = /^(\d{4,})-W(\d{2})$/i,
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

	function _numericOrDefault(value, defaultValue) {
		return (isNaN(value)) ? defaultValue : value;
	}

	function _intOrNull(value) {
		return _numericOrDefault(parseInt(value, 10), null);
	}

	/* 
	 * Parses the given value as a date.
	 * Returns the date as the number of milliseconds since 1970-01-01.
	 *
	 * If the value is not a date, or the date doesn't pass the required
	 * validation, null is returned.
	 *
	 * Format: yyyy-mm-ddThh:mm:ss.sssZ
	 *   Z can also be set with +hh:mm or -hh:mm
	 * 
	 * If no validation is requested, only yyyy-mm is required to pass as 
	 * a date.
	 * 
	 * Validation parameter:
	 * 0 = no validation
	 * 1 = require no day, time or time zone
	 * 2 = require day, but no time or time zone
	 * 3 = require day & time, but no time zone
	 * 4 = require day, time and time zone
	 */
	function _parseDate(value, validation) {
		var match = _dateRegExp.exec(value), date = new Date(0), year, month, day, hour, minute, second, millisec;

		if (match === null) {
			return null;
		}

		year = _intOrNull(match[1]);
		month = _intOrNull(match[2]) - 1;
		day = _intOrNull(match[4]);
		hour = _intOrNull(match[6]);
		minute = _intOrNull(match[7]);
		second = _intOrNull(match[9]);
		millisec = _intOrNull(match[11]);
		
		date.setUTCFullYear(year, month, day || 1);
		date.setUTCHours(hour || 0, minute || 0, second || 0, millisec || 0);

		if ((validation) && (
			(date.getUTCFullYear() !== year) || (year <= 0) || (date.getUTCMonth() !== month) ||						/* Year and month */
			((validation > 1) ? (date.getUTCDate() !== day) : !!match[3]) ||											/* Day */
			((validation > 2) ? ((date.getUTCHours() !== hour) || (date.getUTCMinutes() !== minute) ||					/* Hour and minute */
				((second !== null) && (date.getUTCSeconds() !== second)) ||												/* Second */
				((millisec !== null) && (date.getUTCMilliseconds() !== millisec))) : !!match[5]) ||						/* Milliseconds */
			((validation > 3) ? (!match[12] ||
				(!!(match[13]) && (_parseDate("1970-01-01T" + match[13], 3) === null))) : !!match[12])					/* Time zone */
		)) {
			return null;
		}

		return date.getTime();
	}
	// TODO: parse time zone into return value
	
	/*
	 * Parses the given value as a time.
	 * Returns the date as the number of milliseconds since midnight.
	 *
	 * If the value is not a time, or the time doesn't pass the required
	 * validation, null is returned.
	 *
	 * Format: hh:mm:ss.sss
	 *   ss and .sss are optional
	 * 
	 * Validation parameter:
	 * false = no validation
	 * true  = validate time
	 *
	 */
	function _parseTime(value, validation) {
		return _parseDate("1970-01-01T" + value, (validation) ? 3 : 0);
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
		if (el.addEventListener !== undef) {
			el.addEventListener(type, handler, true);		// Modern browsers
		} else if (el.attachEvent !== undef) {
			el.attachEvent('on' + type, handler);			// Old IEs
		}
	}
	
	function _throwInvalidEvent(el) {
		var event, i, il;
		if (el.dispatchEvent !== undef) {
			event = document.createEvent("HTMLEvents");		// Modern browsers
			event.initEvent("invalid", false, true);
			el.dispatchEvent(event);
		} else if (el._invalidHandlers) {
			event = document.createEventObject();			// Workaround for IE
			event.eventType = "invalid";
			for (i = 0, il = el._invalidHandlers.length; i < il; i++) {
				if (el._invalidHandlers[i]) {
					el._invalidHandlers[i](event);
				}
			}
		}
	}

	function _attachInvalidEvent(el, eventName, fn) {
		el._invalidHandlers.push(fn);
		return true;
	}
	
	function _detachInvalidEvent(el, eventName, fn) {
		var i, il, handlers = el._invalidHandlers;
		if (handlers) {
			for (i = 0, il = handlers.length; i < il; i++) {
				if (handlers[i] === fn) {
					handlers[i] = null;
				}
			}
		}
		return 0;
	}

	function _setConfig(config) {
		var prop;
		if (config) {
			for (prop in config) {
				if (_config[prop] !== undef) {
					_config[prop] = config[prop];
				}
			}
		}
	}
	
	/*
	 * Validation methods
	 */
	 
	function _checkTypeMismatchWeek(value) {
		var match = _weekRegExp.exec(value);
		return ((match === null) || 
				(match[1] <= 0) ||																	/* Don't allow year zero */
				(match[2] < 1) || (match[2] > 53));													/* Validate week number. */
				// Note: Does not check whether the year have 52 or 53 weeks according to the Gregorian calendar, for now. Is it worth it?
	}

	function _checkTypeMismatch(el, type) {
		if (type) {
			switch (type) {
			case 'email':
				return !(_emailRegExp.test(el.value));
			case 'url':
				return !(_urlRegExp.test(el.value));
			case 'datetime':
				return (_parseDate(el.value, 4) === null);
			case 'date':
				return (_parseDate(el.value, 2) === null);
			case 'time':
				return (_parseTime(el.value, true) === null);
			case 'month':
				return (_parseDate(el.value, 1) === null);
			case 'week':
				return _checkTypeMismatchWeek(el.value);
			case 'datetime-local':
				return (_parseDate(el.value, 3) === null);
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
			var val = el.value,
				maxLength = el.maxLength,
				type = _getAttr(el, 'type'), 
				step = _getAttr(el, 'step'),
				numVal = null,
				numMin = null,
				numMax = null,
				numStep = 1,
				numScale = 1,
				getVal = function () {
					return null;
				};

			// Set defaults
			if (type === "number") {
				getVal = parseFloat;
			} else if (type === "range") {
				numMin = 0.0;
				numMax = 100.0;
				getVal = parseFloat;
			} else if ((/^(datetime|time)/i).test(type)) {
				numScale = 1000;
				numStep = 60;
				getVal = (type === "time") ? _parseTime : _parseDate;
			} else if (type === "date") {
				numScale = 86400000;
				getVal = _parseDate;
			}

			// Type values or use defaults
			numVal = _numericOrDefault(getVal(val), numVal);
			numMin = _numericOrDefault(getVal(_getAttr(el, 'min')), numMin);
			numMax = _numericOrDefault(getVal(_getAttr(el, 'max')), numMax);
			numStep = (step === "any") ? null : _numericOrDefault(parseFloat(step), numStep) || null;

			// Set validity states
			_setValidity(el,
				((el.attributes.required !== undef) && val === ""),															/* valueMissing */
				(val !== "" && _checkTypeMismatch(el, type)),																/* typeMismatch */
				(val !== "" && _checkPatternMismatch(el)),																	/* patternMismatch */
				(val !== "" && (maxLength !== -1) && (val !== el.defaultValue) && (val.length > maxLength)),				/* tooLong */
				(numVal !== null && numMin !== null && (numMin > numVal)),													/* rangeUnderflow */
				(numVal !== null && numMax !== null && (numVal > numMax)),													/* rangeOverflow */
				(numVal !== null && numStep !== null && (((numVal - (numMin || 0.0)) % (numStep * numScale)) !== 0)),		/* stepMismatch */
				el.validity.customError																						/* customError */
			);
			
			// Update validity classes on element
			_setValidityClass(el);
		}
	}


	/*
	 * Event handlers
	 */

	function _submitHandler(event) {
		event = (event || window.event);
		if ((this.attributes.novalidate === undef) && (!this.checkValidity())) {
			if (event.preventDefault !== undef) {
				event.preventDefault();
			} else if (event.returnValue !== undef) {
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
		var type = _getAttr(el, 'type');
		return ((!el.disabled) && (!el.readOnly) && (_elsToValidateRegExp.test(type)));
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
			_throwInvalidEvent(this);
		}

		return this.validity.valid;
	}

	function _checkValidityForm() {
		var valid = true, i, il;
		
		for (i = 0, il = this.elements.length; i < il; i++) {
			valid = this.elements[i].checkValidity() && valid;
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
	
	/**
	 * Initializes the given HTML form element. Will polyfill if HTML5 Constraint interface is not present.
	 *
	 * The function is primarily intended for use by the `init`function, but may be called directly 
	 * when needed. E.g. to init an element that is created after the form is initialized.
	 *
	 * @param {Object} The HTML form element to init
	 */
	function initElement(el) {
		var handler, originalCheckValidity, attachEvent, detachEvent;

		if (el.checkValidity === undef) {

			// Set up polyfills
			el.willValidate = _willValidate(el);
			el.setCustomValidity = _setCustomValidity;
			el.validity = {};
			_setValidity(el, false, false, false, false, false, false, false, false);
			el.checkValidity = _checkValidity;
			el.validationMessage = "";
			
			// Validate element on keyup, change and blur events
			handler = function () {
				_validate(el);
			};
			
			// Override native attachEvent and detachEvent if present, to allow attacing to the invalid event.
			attachEvent = el.attachEvent;
			detachEvent = el.detachEvent;
			if ((attachEvent !== undef) && (detachEvent !== undef)) {
				el._invalidHandlers = [];
				el.attachEvent = function (eventName, fn) {
					return (eventName === "oninvalid") ? _attachInvalidEvent(el, eventName, fn) : attachEvent(eventName, fn);
				};
				el.detachEvent = function (eventName, fn) {
					return (eventName === "oninvalid") ? _detachInvalidEvent(el, eventName, fn) : detachEvent(eventName, fn);
				};
			}

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
		var i, il, unsupp = (form.checkValidity === undef);

		this.isPolyfilling = unsupp;

		if ((_config.touchSupporting) || (unsupp)) {
			for (i = 0, il = form.length; i < il; i++) {
				this.initElement(form.elements[i]);
			}
		}
		
		if (unsupp) {
			form.checkValidity = _checkValidityForm;
		
			// Listen for submit event and cancel if form not valid
			_catchEvent(form, 'submit', function (event) {
				return _submitHandler.call(form, event);
			});
		}
	}

	/**
	 * Form initialization. Will polyfill if HTML5 Constraint interface is not present.
	 * 
	 * @param {Object} The HTML form to polyfill. If not provided, all forms in the document will be initialized.
	 * @param {Object} An optional config object. Will be used for all forms in the document.
	 */
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
	
}(window));
