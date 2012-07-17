TestCase("formerlyValidation", {
	
	"test should set valid": function () {
		var el = createElement("text", "");

		var ret = el.checkValidity();
		
		assertTrue(ret);
		assertTrue(el.validity.valid);
	}
	
});

TestCase("formerlyValidationValueMissing", {
	
	"test should set valueMissing": function () {
		var el = createElement("text", "", { required: "required" });
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'valueMissing');
	},
	
	"test should not set valueMissing": function () {
		var el = createElement("text", "A value", { required: "required" }, "valid");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'valueMissing');
	},
	
	"test should not validate an element where willValidate is false": function () {
		var el = createElement('image', "", { required: "required" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'valueMissing');
	}
	
});

TestCase("formerlyValidationTypeMismatchEmail", {
	
	"test should set typeMismatch for invalid email": function () {
		var el = createElement("email", "noemail");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},
	
	"test should not set typeMismatch for valid email": function () {
		var el = createElement("email", "email@company.com");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},
	
	"test should not set typeMismatch for empty string": function () {
		var el = createElement("email", "");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	}

	
	// TODO: More tests with different e-mail addresses
	// TODO: multiple e-mail addresses
		
});

TestCase("formerlyValidationTypeMismatchUrl", {
	
	"test should set typeMismatch for invalid url": function () {
		var el = createElement("url", "nourl");
		
		var ret = el.checkValidity();

		assertInvalid(ret, el, 'typeMismatch');
	},
	
	"test should set typeMismatch for a relative url": function () {
		var el = createElement("url", "//www.relative.com/");
		
		var ret = el.checkValidity();

		assertInvalid(ret, el, 'typeMismatch');
	},
	
	"test should not set typeMismatch for valid url": function () {
		var el = createElement("url", "http://www.valid.com/");
		
		var ret = el.checkValidity();

		assertValid(ret, el, 'typeMismatch');
	},

	"test should not set typeMismatch for valid url surrounded by spaces": function () {
		var el = createElement("url", " http://www.valid.com/ ");
		
		var ret = el.checkValidity();

		assertValid(ret, el, 'typeMismatch');
	},

	"test should not set typeMismatch for empty string": function () {
		var el = createElement("url", "");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	}
});

TestCase("formerlyValidationPatternMismatch", {

	"test should set patternMismatch": function () {
		var el = createElement("text", "letters", { pattern: '\\d*' });

		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'patternMismatch');
	},
	
	"test should not set patternMismatch on match": function () {
		var el = createElement("text", "123", { pattern: '\\d*' });

		var ret = el.checkValidity();
		
		assertValid(ret, el, 'patternMismatch');
	},

	"test should not set patternMismatch on invalid pattern": function () {
		var el = createElement("text", "123", { pattern: '[z-a]' });

		var ret;
		assertNoException(function () {
			ret = el.checkValidity();
		});
		
		assertValid(ret, el, 'patternMismatch');
	},

	"test should not set patternMismatch empty value": function () {
		var el = createElement("text", "", { pattern: '\\d+' });

		var ret = el.checkValidity();
		
		assertValid(ret, el, 'patternMismatch');
	}
	
	// TODO: Multiple
	
});

TestCase("formerlyValidationTooLong", {
	
	"test should set tooLong": function () {
		var el = createElement("text", "", { maxlength: "20" });
		el.value = "Longer than 20 characters";
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'tooLong');
	},
	
	"test should not set tooLong when value not dirty": function () {
		var el = createElement("text", "Longer than 20 characters", { maxlength: "20" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'tooLong');
	},

	"test should not set tooLong for shorter string": function () {
		var el = createElement("text", "", { maxlength: "20" });
		el.value = "Shorter than 20";
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'tooLong');
	},

	"test should not set tooLong for empty string": function () {
		var el = createElement("text", "Default", { maxlength: "20" });
		el.value = "";
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'tooLong');
	},

	"test should not set tooLong with illegal maxlength": function () {
		var el = createElement("text", "", { maxlength: "illegal" });
		el.value = "Longer than 20 characters";
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'tooLong');
	},

	"test should not set tooLong with maxLength -1": function () {
		// Note: This is the default maxLength in Firefox
		var el = createElement("text", "", { maxlength: "-1" });
		el.value = "Longer than 20 characters";
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'tooLong');
	}
	
});

TestCase("formerlyValidationRangeUnderflow", {
	
	"test should set rangeUnderflow": function () {
		var el = createElement("number", "8", { min: "10" });
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'rangeUnderflow');
	},

	"test should not set rangeUnderflow": function () {
		var el = createElement("number", "11", { min: "10" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'rangeUnderflow');
	},

	"test should not set rangeUnderflow when equal": function () {
		var el = createElement("number", "10", { min: "10" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'rangeUnderflow');
	},

	"test should not set rangeUnderflow for empty string": function () {
		var el = createElement("number", "", { min: "10" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'rangeUnderflow');
	},

	"test should not set rangeUnderflow with illegal min": function () {
		var el = createElement("number", "8", { min: "illegal" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'rangeUnderflow');
	},

	"test should not set rangeUnderflow with illegal value": function () {
		var el = createElement("number", "illegal", { min: "10" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'rangeUnderflow');
	}
	
	// TODO: Write for range and the dates and times
	// TODO: Honour default min
	// TODO: Skip check for types this does not apply to

});

TestCase("formerlyValidationRangeOverflow", {
	
	"test should set rangeOverflow": function () {
		var el = createElement("number", "12", { max: "10" });
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'rangeOverflow');
	},

	"test should not set rangeOverflow": function () {
		var el = createElement("number", "9", { max: "10" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'rangeOverflow');
	},

	"test should not set rangeOverflow when equal": function () {
		var el = createElement("number", "10", { max: "10" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'rangeOverflow');
	},

	"test should not set rangeOverflow when empty string": function () {
		var el = createElement("number", "", { max: "10" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'rangeOverflow');
	},

	"test should not set rangeOverflow with illegal max": function () {
		var el = createElement("number", "12", { max: "illegal" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'rangeOverflow');
	},

	"test should not set rangeOverflow with illegal value": function () {
		var el = createElement("number", "illegal", { max: "10" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'rangeOverflow');
	}

	// TODO: Write for range and the dates and times
	// TODO: Honour default max
	// TODO: Skip check for types this does not apply to

});

TestCase("formerlyValidationStepMismatch", {

	"test should set stepMismatch": function () {
		var el = createElement("number", "1.5", { step: "1" });
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'stepMismatch');
	},

	"test should not set stepMismatch": function () {
		var el = createElement("number", "2", { step: "1" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'stepMismatch');
	},

	"test should not set stepMismatch when valid steps from min": function () {
		var el = createElement("number", "3.5", { step: "1", min: "0.5" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'stepMismatch');
	},

	"test should not set stepMismatch with empty string": function () {
		var el = createElement("number", "", { step: "1" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'stepMismatch');
	},

	"test should not set stepMismatch with illegal step": function () {
		var el = createElement("number", "3.5", { step: "illegal" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'stepMismatch');
	},

	"test should not set stepMismatch with step 'any'": function () {
		var el = createElement("number", "3.5", { step: "any" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'stepMismatch');
	},

	"test should not set stepMismatch with illegal value": function () {
		var el = createElement("number", "illegal", { step: "1" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'stepMismatch');
	}
	
	// TODO: Implement step for range and dates/times
	// TODO: Honour default min, max, step
	// TODO: Skip check for types this does not apply to

});

TestCase("formerlyValidationInvalidEvent", {
	
	"test should throw invalid event on checkValidity": function () {
		var el = createElement("text", "", { required: 'required' });
		formerly.initElement(el);
		
		el.checkValidity();
		
		assertCalledOnce(el.dispatchEvent);
		var event = el.dispatchEvent.args[0][0];
		assertObject(event);
		assertEquals('invalid', event.type);
		assertFalse('Bubbles', event.bubbles);
		assertTrue('Cancelable', event.cancelable);
	},
	
	"test should not throw invalid event when element valid": function () {
		var el = createElement("text", "");
		formerly.initElement(el);
		
		el.checkValidity();
		
		assertNotCalled(el.dispatchEvent);
	},
	
	"test should throw invalid event in older IE": function () {
		var el = { type: "text", value: "", attributes: { required: 'required' } };
		el.fireEvent = sinon.stub();
		formerly.initElement(el);
		document.createEventObject = function () { return { eventType: null } };
		
		el.checkValidity();
		
		assertCalledOnce(el.fireEvent);
		assertEquals('oninvalid', el.fireEvent.args[0][0]);
		var event = el.fireEvent.args[0][1];
		assertObject(event);
		assertEquals('invalid', event.eventType);
	}
	
});


TestCase("formerlyValidationClassNames", {	
	"test should set valid class": function () {
		var el = createElement("text", "");

		var ret = el.checkValidity();
		
		assertEquals('valid', el.className);
	},

	"test should set valid class and remove invalid class": function () {
		var el = createElement("text", "invalid");

		var ret = el.checkValidity();
		
		assertEquals('valid', el.className);
	},

	"test should set invalid and remove valid class": function () {
		var el = createElement("text", "", { required: "required" }, "valid");
		
		var ret = el.checkValidity();
		
		assertEquals("invalid", el.className);
	},

	"test should preserve other class names": function () {
		var el = createElement("text", "", null, "other class names");

		var ret = el.checkValidity();
		
		var classNames = el.className.split(' ');
		
		assertEquals(4, classNames.length);
		assertNotEquals(-1, classNames.indexOf('other'));
		assertNotEquals(-1, classNames.indexOf('valid'));
	},

	"test should not add valid class if exists": function () {
		var el = createElement("text", "", null, "already valid");

		var ret = el.checkValidity();
		
		var classNames = el.className.split(' ');
		
		assertEquals(2, classNames.length);
		assertNotEquals(-1, classNames.indexOf('already'));
		assertNotEquals(-1, classNames.indexOf('valid'));
	},

	"test should not be fooled by 'valid' in other class names": function () {
		var el = createElement("text", "", null, "not reallyvalid");

		var ret = el.checkValidity();
		
		var classNames = el.className.split(' ');
		
		assertEquals(3, classNames.length);
		assertNotEquals(-1, classNames.indexOf('reallyvalid'));
		assertNotEquals(-1, classNames.indexOf('valid'));
	},
	
	"test should remove invalid class": function () {
		var el = createElement("text", "", null, "invalid");

		var ret = el.checkValidity();
		
		assertEquals("valid", el.className);
	},

	"test should remove invalid class among other classes": function () {
		var el = createElement("text", "", null, "is invalid");

		var ret = el.checkValidity();
		
		var classNames = el.className.split(' ');
		
		assertEquals(2, classNames.length);
		assertTrue("Has class 'is'", classNames.indexOf('is') > -1);
		assertTrue("Has class 'valid'", classNames.indexOf('valid') > -1);
	},

	"test should not be fooled by 'invalid' in other class names": function () {
		var el = createElement("text", "", null, "is notinvalid");

		var ret = el.checkValidity();
		
		var classNames = el.className.split(' ');
		
		assertEquals(3, classNames.length);
		assertTrue("Has class 'is'", classNames.indexOf('is') > -1);
		assertTrue("Has class 'valid'", classNames.indexOf('valid') > -1);
		assertTrue("Has class 'notinvalid'", classNames.indexOf('notinvalid') > -1);
	},

	"test should not be fooled by 'invalid' at the beginning of other class names": function () {
		var el = createElement("text", "", null, "is invalidlike");

		var ret = el.checkValidity();
		
		var classNames = el.className.split(' ');
		
		assertEquals(3, classNames.length);
		assertTrue("Has class 'is'", classNames.indexOf('is') > -1);
		assertTrue("Has class 'valid'", classNames.indexOf('valid') > -1);
		assertTrue("Has class 'notinvalid'", classNames.indexOf('invalidlike') > -1);
	}

});

function assertInvalid (ret, el, validityState) {
	assertFalse("Return value", ret);
	assertTrue("validity." + validityState, el.validity[validityState]);
	assertFalse("validity.valid", el.validity.valid);
}

function assertValid (ret, el, validityState) {
	assertTrue("Return value", ret);
	assertFalse("validity." + validityState, el.validity[validityState]);
	assertTrue("validity.valid", el.validity.valid);
}

// TODO: Validation messages