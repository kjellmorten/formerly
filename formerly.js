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
		_elsToValidateRegExp = /^(text(area)?|search|tel|url|email|password|date(time(-local)?)?|month|week|time|number|range|color|checkbox|radio|file|submit|select-(one|multiple))$/i,
		_validityStates = "valueMissing typeMismatch patternMismatch tooLong rangeUnderflow rangeOverflow stepMismatch customError".split(" "),
		_emailRegExp = /^[a-z][a-z0-9!#$%&'*+\-\/=?\^_`{|}~\.]*@[a-z0-9\-]+(\.[a-z0-9\-]+)*$/i,
		_urlRegExp = /^\s*([a-z][a-z0-9+\-\.]+:\S*)\/\//i,
		_dateRegExp = /^(\d{4,})-(\d{2})(-(\d{2}))?(T(\d{2})\:(\d{2})(\:(\d{2})(\.(\d+))?)?)?(Z|[\-\+](\d{2}\:\d{2}))?$/i,
		_weekRegExp = /^(\d{4,})-W(\d{2})$/i,
		_millsInDay = 86400000,
		_millsInWeek = 604800000,
		_millsForFirstWeek = -259200000,
		_firstDateString = "1970-01-01T",
		_typeDefaults,
		_config = {
			touchSupporting: true,
			validClass: "valid",
			invalidClass: "invalid"
		};

	/*
	 * Private help functions
	 */
	 
	function _getAttr(el, attr) {
		return el.getAttribute(attr);
	}

	function _valueOrDefault(value, defaultValue) {
		return (value === null) ? defaultValue : value;
	}
	
	function _parseString(value) {
		return value;
	}

	function _parseInt(value) {
		var ret = parseInt(value, 10);
		return (isNaN(ret)) ? null : ret;
	}
	
	function _parseFloat(value) {
		var ret = parseFloat(value);
		return (isNaN(ret)) ? null : ret;
	}

	function _parseEmail(value) {
		return (_emailRegExp.test(value)) ? value : null;
	}

	function _parseUrl(value) {
		var match = _urlRegExp.test(value);
		return (match) ? match[1] : null;
	}
	
	/* 
	 * Parses the given value as a date.
	 * Returns the date as the number of milliseconds since midnight 1970-01-01.
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
	 * 0 = require date, but no time or time zone
	 * 1 = require date and time, but no time zone
	 * 2 = require date, time and time zone
	 */
	function _parseDateAll(value, validation) {
		var match = _dateRegExp.exec(value), date = new Date(0), year, month, day, hour, minute, second, millisec;

		if (!match) {
			return null;
		}

		year = _parseInt(match[1]);
		month = _parseInt(match[2]) - 1;
		day = _parseInt(match[4]);
		hour = _parseInt(match[6]);
		minute = _parseInt(match[7]);
		second = _parseInt(match[9]);
		millisec = _parseInt(match[11]);
		
		date.setUTCFullYear(year, month, day || 1);
		date.setUTCHours(hour || 0, minute || 0, second || 0, millisec || 0);

		if (
			date.getUTCFullYear() !== year || year <= 0 ||															/* Year */
			date.getUTCMonth() !== month || date.getUTCDate() !== day ||											/* Month and day */
			((validation > 0) ? (date.getUTCHours() !== hour || date.getUTCMinutes() !== minute ||					/* Hour and minute */
				(second !== null && date.getUTCSeconds() !== second) ||												/* Second */
				(millisec !== null && date.getUTCMilliseconds() !== millisec)) : !!match[5]) ||						/* Milliseconds */
			((validation > 1) ? (!match[12] ||
				(!!match[13] && _parseDateAll(_firstDateString + match[13], 1) === null)) : !!match[12])			/* Time zone */
		) {
			return null;
		}

		return date.getTime();
		// TODO: parse time zone into return value
	}
	
	function _parseDate(value) {
		return _parseDateAll(value, 0);
	}

	function _parseDateTimeLocal(value) {
		return _parseDateAll(value, 1);
	}

	function _parseDateTime(value) {
		return _parseDateAll(value, 2);
	}
	
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
	function _parseTime(value) {
		return _parseDateAll(_firstDateString + value, 1);
	}

	/*
	 * Parses the given value as a month.
	 * Returns the month as the number of months since January 1970.
	 *
	 * If the value is not a month or the month does not pass validation,
	 * null is returned.
	 *
	 * Format: yyyy-mm
	 */
	function _parseMonth(value) {
		var match = _dateRegExp.exec(value), year, month;

		if (match === null || match[3]) {										/* Validate format match (no day, etc) */
			return null;
		}

		year = _parseInt(match[1]);
		month = _parseInt(match[2]) - 1;
		
		if (year <= 0 || month < 0 || month > 11) {								/* Validate year and month */
			return null;
		}

		return ((year - 1970) * 12) + month;
	}

	/*
	 * Parses the given value as a week.
	 * Returns the week as the number of milliseconds from midnight 1970-01-01 
	 * to midnight of the Monday of the given week.
	 *
	 * If the value is not a week or the week does not pass validation,
	 * null is returned.
	 *
	 * Format: yyyy-Www
	 */
	function _parseWeek(value) {
		var match = _weekRegExp.exec(value), year, week, firstDate = new Date(0), firstDay, dateInWeek, maxWeeks = 52;
		if (match === null) {
			return null;
		}
		
		year = _parseInt(match[1]);
		week = _parseInt(match[2]);
		firstDate.setUTCFullYear(year, 0, 1);
		firstDay = firstDate.getUTCDay();
		if (firstDay === 4 || (firstDay === 3 && (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)))) {
			maxWeeks = 53;
		}
		
		if (year <= 0 || week < 1 || week > maxWeeks) {									// Validate year and week number
			return null;
		}
		
		dateInWeek = new Date(firstDate.getTime() + (week * _millsInWeek));				// Get a day in the given week
		return dateInWeek.getTime() - ((dateInWeek.getUTCDay() - 1) * _millsInDay);		// Return milliseconds for the Monday in that week
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
		var event, i, il, invalidHandlers = el._invalidHandlers;
		if (el.dispatchEvent !== undef) {
			event = document.createEvent("HTMLEvents");		// Modern browsers
			event.initEvent("invalid", false, true);
			el.dispatchEvent(event);
		} else if (invalidHandlers) {
			event = document.createEventObject();			// Workaround for IE
			event.eventType = "invalid";
			for (i = 0, il = invalidHandlers.length; i < il; i++) {
				if (invalidHandlers[i]) {
					invalidHandlers[i](event);
				}
			}
		}
	}

	/*
	 * Validation methods
	 */

	function _checkPatternMismatch(el) {
		var pattern = _getAttr(el, "pattern");
		if (pattern) {
			try {
				return !(new RegExp("^" + pattern + "$").test(el.value));
			} catch (err) {}
		}

		return false;
	}
	
	function _getValidState(el) {
		var val = el.validity, valid = true, i, il = _validityStates.length;

		for (i = 0; i < il; i++) {
			valid = !val[_validityStates[i]] && valid;
		}
		
		return valid;
	}

	function _setValidity(el) {
		var val = el.validity, i, il = _validityStates.length;
		
		for (i = 0; i < il; i++) {
			val[_validityStates[i]] = arguments[i + 1] || false;
		}

		val.valid = _getValidState(el);
	}

	function _setValidityClass(el) {
		var validClass = _config.validClass, 
			invalidClass = _config.invalidClass,
			valid = el.validity.valid;

		_addClass(el, (valid) ? validClass : invalidClass);
		_removeClass(el, (valid) ? invalidClass : validClass);
	}

	function _validate(el) {
		if (el.willValidate) {
			var val = el.value,
				parsedVal,
				maxLength = el.maxLength,
				type = _getAttr(el, "type"),
				step = _getAttr(el, "step"),
				defs = _typeDefaults[type] || _typeDefaults.def,
				getVal = defs[0],
				isNum = defs[1],
				numScale = defs[2] || 1,
				numStep = defs[3] || 1,
				numStepBase = defs[4],
				numMin = (defs[5] === undef) ? null : defs[5],
				numMax = (defs[6] === undef) ? null : defs[6];

			// Type values or use defaults
			parsedVal = getVal(val);
			numMin = _valueOrDefault(getVal(_getAttr(el, "min")), numMin);
			numMax = _valueOrDefault(getVal(_getAttr(el, "max")), numMax);
			numStep = (step === "any") ? null : _valueOrDefault(_parseFloat(step), numStep) || null;

			// Set validity states
			_setValidity(el,
				(el.attributes.required !== undef && val === ""),																					/* valueMissing */
				((val !== "" || type === "range") && parsedVal === null),																			/* typeMismatch */
				(val !== "" && _checkPatternMismatch(el)),																							/* patternMismatch */
				(val !== "" && maxLength !== -1 && val !== el.defaultValue && val.length > maxLength),												/* tooLong */
				(parsedVal !== null && isNum && numMin !== null && numMin > parsedVal),																/* rangeUnderflow */
				(parsedVal !== null && isNum && numMax !== null && parsedVal > numMax),																/* rangeOverflow */
				(parsedVal !== null && isNum && numStep !== null && ((parsedVal - (numMin || numStepBase || 0.0)) % (numStep * numScale)) !== 0),	/* stepMismatch */
				el.validity.customError																												/* customError */
			);
			
			// Update validity classes on element
			_setValidityClass(el);
		}
	}


	/*
	 * Event handlers
	 */

	function _submitHandler(event) {
		event = event || window.event;
		if (this.attributes.novalidate === undef && !this.checkValidity()) {
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
		var type = _getAttr(el, "type");
		return (!el.disabled && !el.readOnly && _elsToValidateRegExp.test(type));
	}
	
	function _setCustomValidity(message) {
		this.validationMessage = message;
		this.validity.customError = (message !== "");
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
		var handler, i, il, handlers,
			originalCheckValidity = el.checkValidity,
			attachEvent = el.attachEvent,
			detachEvent = el.detachEvent;

		if (el.checkValidity === undef) {

			// Set up polyfills
			el.willValidate = _willValidate(el);
			el.setCustomValidity = _setCustomValidity;
			el.validity = {};
			_setValidity(el);
			el.checkValidity = _checkValidity;
			el.validationMessage = "";
			
			// Validate element on keyup, change and blur events
			handler = function () {
				_validate(el);
			};
			
			// Override native attachEvent and detachEvent if present, to allow attacing to the invalid event.
			if (attachEvent !== undef && detachEvent !== undef) {
				el._invalidHandlers = [];
				el.attachEvent = function (eventName, fn) {
					if (eventName === "oninvalid") {
						el._invalidHandlers.push(fn);
						return true;
					} else {
						return attachEvent(eventName, fn);
					}
				};
				el.detachEvent = function (eventName, fn) {
					if (eventName === "oninvalid") {
						handlers = el._invalidHandlers;
						if (handlers) {
							for (i = 0, il = handlers.length; i < il; i++) {
								if (handlers[i] === fn) {
									handlers[i] = null;
								}
							}
						}
						return 0;
					} else {
						return detachEvent(eventName, fn);
					}
				};
			}

		} else if (_config.touchSupporting) {

			// Wrap browsers checkValidity to update validity classes at validation
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
			_catchEvent(el, "keyup", handler);
			_catchEvent(el, "change", handler);
			_catchEvent(el, "blur", handler);
		}
	}
	
	// Inits a form
	function _initForm(form) {
		var i, il, unsupp = (form.checkValidity === undef);

		this.isPolyfilling = unsupp;

		if (_config.touchSupporting || unsupp) {
			for (i = 0, il = form.length; i < il; i++) {
				this.initElement(form.elements[i]);
			}
		}
		
		if (unsupp) {
			form.checkValidity = _checkValidityForm;
		
			// Listen for submit event and cancel if form not valid
			_catchEvent(form, "submit", function (event) {
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
		var i, il, prop, 
			forms = (form) ? [form] : this.getForms();
		
		if (config) {
			for (prop in config) {
				if (_config[prop] !== undef) {
					_config[prop] = config[prop];
				}
			}
		}
	
		for (i = 0, il = forms.length; i < il; i++) {
			_initForm.call(this, forms[i]);
		}
	}
	
	/*
	 * Arrays of defaults for field types
	 *						getValFunction,			isNum,	scale,			step,	stepBase,	min,	max
	 */

	_typeDefaults = {
		number:				[_parseFloat,			true],
		range:				[_parseFloat,			true,	1,				1,		null,		0.0,	100.0],
		email:				[_parseEmail,			false],
		url:				[_parseUrl,				false],
		date:				[_parseDate,			true,	_millsInDay],
		"datetime-local":	[_parseDateTimeLocal,	true,	1000,			60],
		datetime:			[_parseDateTime,		true,	1000,			60],
		time:				[_parseTime,			true,	1000,			60],
		month:				[_parseMonth,			true],
		week:				[_parseWeek,			true,	_millsInWeek,	1,		_millsForFirstWeek],
		def:				[_parseString,			false]
	};
	
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
