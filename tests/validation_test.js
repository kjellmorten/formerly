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

	"test should not clear customError on checkValidity": function () {
		var el = createElement("text", "");

		el.setCustomValidity('A message');
		el.checkValidity();
		
		assertTrue(el.validity.customError);
		assertEquals('A message', el.validationMessage);
		assertFalse(el.validity.valid);
	},

	"test should not clear customError on checkValidity with other invalidity": function () {
		var el = createElement("text", "", { required: "required" });

		el.setCustomValidity('A message');
		el.checkValidity();
		
		assertTrue(el.validity.customError);
		assertEquals('A message', el.validationMessage);
		assertFalse(el.validity.valid);
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
		var el = createElement("text", "Longer than 20 characters", { maxlength: "20" });
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'tooLong');
	},
	
	"test should not set tooLong for shorter string": function () {
		var el = createElement("text", "Shorter than 20", { maxlength: "20" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'tooLong');
	},

	"test should not set tooLong for empty string": function () {
		var el = createElement("text", "", { maxlength: "20" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'tooLong');
	},

	"test should not set tooLong with illegal maxlength": function () {
		var el = createElement("text", "", { maxlength: "illegal" });
		
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
	assertFalse(ret);
	assertTrue(el.validity[validityState]);
	assertFalse(el.validity.valid);
}

function assertValid (ret, el, validityState) {
	assertTrue(ret);
	assertFalse(el.validity[validityState]);
	assertTrue(el.validity.valid);
}
