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

TestCase("formerlyValidationTypeMismatchDateTime", {
	
	"test should set typeMismatch for invalid datetime": function () {
		var el = createElement("datetime", "nodatetime");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not set typeMismatch for valid datetime": function () {
		var el = createElement("datetime", "2012-08-07T18:45Z");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},
	
	"test should accept empty string": function () {
		var el = createElement("datetime", "");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should not accept invalid date": function () {
		var el = createElement("datetime", "2012-08-32T18:45Z");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not accept invalid time": function () {
		var el = createElement("datetime", "2012-08-07T18:60Z");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should accept positive time zone": function () {
		var el = createElement("datetime", "2012-08-07T18:45+01:00");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should accept negative time zone": function () {
		var el = createElement("datetime", "2012-08-07T18:45-01:00");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should not accept invalid time zone": function () {
		var el = createElement("datetime", "2012-08-07T18:45-01:60");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not accept missing time zone": function () {
		var el = createElement("datetime", "2012-08-07T18:45");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	}

});

TestCase("formerlyValidationTypeMismatchDateTimeLocal", {
	
	"test should set typeMismatch for invalid datetime-local": function () {
		var el = createElement("datetime-local", "nodatetime");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not set typeMismatch for valid datetime-local": function () {
		var el = createElement("datetime-local", "2012-08-07T18:45");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should accept empty string": function () {
		var el = createElement("datetime-local", "");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should not accept invalid date": function () {
		var el = createElement("datetime-local", "2012-08-32T18:45");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not accept invalid time": function () {
		var el = createElement("datetime-local", "2012-08-07T18:60");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not accept time zone": function () {
		var el = createElement("datetime-local", "2012-08-07T18:45Z");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	}
	
});

TestCase("formerlyValidationTypeMismatchDate", {
	
	"test should set typeMismatch for invalid date": function () {
		var el = createElement("date", "nodate");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not set typeMismatch for valid date": function () {
		var el = createElement("date", "2012-08-07");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},
	
	"test should accept empty string": function () {
		var el = createElement("date", "");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should accept years with more than five digits": function () {
		var el = createElement("date", "12012-08-07");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should not accept less than four digit year": function () {
		var el = createElement("date", "12-08-02");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not accept year zero": function () {
		var el = createElement("date", "0000-08-07");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not accept single digits in month and day": function () {
		var el = createElement("date", "2012-8-2");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not accept missing day": function () {
		var el = createElement("date", "2012-08");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should set typeMismatch when day's to high": function () {
		var el = createElement("date", "2012-08-32");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should set typeMismatch when day's to low": function () {
		var el = createElement("date", "2012-08-00");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should set typeMismatch when month's to high": function () {
		var el = createElement("date", "2012-13-07");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should set typeMismatch when month's to low": function () {
		var el = createElement("date", "2012-00-07");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	}

});

TestCase("formerlyValidationTypeMismatchTime", {
	
	"test should set typeMismatch for invalid time": function () {
		var el = createElement("time", "notime");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not set typeMismatch for valid time": function () {
		var el = createElement("time", "18:45");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should accept empty string": function () {
		var el = createElement("time", "");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should set typeMismatch when hour's too high": function () {
		var el = createElement("time", "24:45");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should set typeMismatch when hour's too low": function () {
		var el = createElement("time", "-1:45");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should set typeMismatch when minut's too high": function () {
		var el = createElement("time", "18:60");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should set typeMismatch when minute's too low": function () {
		var el = createElement("time", "18:-1");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not set typeMismatch for valid time with seconds": function () {
		var el = createElement("time", "18:45:37");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should set typeMismatch when second's too high": function () {
		var el = createElement("time", "18:45:60");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should set typeMismatch when second's too low": function () {
		var el = createElement("time", "18:45:-1");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not set typeMismatch for valid time with fractions of a second": function () {
		var el = createElement("time", "18:45:37.174");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	}

});

TestCase("formerlyValidationTypeMismatchMonth", {
	
	"test should set typeMismatch for invalid month": function () {
		var el = createElement("month", "nomonth");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not set typeMismatch for valid month": function () {
		var el = createElement("month", "2012-08");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should accept empty string": function () {
		var el = createElement("month", "");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should accept years with more than five digits": function () {
		var el = createElement("month", "12012-08");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should not accept less than four digit year": function () {
		var el = createElement("month", "12-08");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not accept year zero": function () {
		var el = createElement("month", "0000-08");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not accept single digits in month": function () {
		var el = createElement("month", "2012-8");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should set typeMismatch when month's to high": function () {
		var el = createElement("month", "2012-13");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should set typeMismatch when month's to low": function () {
		var el = createElement("month", "2012-00");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not accept day": function () {
		var el = createElement("month", "2012-08-07");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	}

});

TestCase("formerlyValidationTypeMismatchWeek", {
	
	"test should set typeMismatch for invalid week": function () {
		var el = createElement("week", "noweek");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not set typeMismatch for valid week": function () {
		var el = createElement("week", "2012-W32");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should accept empty string": function () {
		var el = createElement("week", "");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should accept years with more than five digits": function () {
		var el = createElement("week", "12012-W32");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'typeMismatch');
	},

	"test should not accept less than four digit year": function () {
		var el = createElement("week", "12-W32");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not accept year zero": function () {
		var el = createElement("week", "0000-W32");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not accept too low week": function () {
		var el = createElement("week", "2012-W00");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
	},

	"test should not accept too high week": function () {
		var el = createElement("week", "2012-W54");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'typeMismatch');
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
	},
	
	"test should have no default min for number field": function () {
		var el = createElement("number", "-1");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'rangeUnderflow');
	},

	"test should have default min = 0 for range field": function () {
		var el = createElement("range", "-1");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'rangeUnderflow');
	},

	"test should set rangeUnderflow for datetime field": function () {
		var el = createElement("datetime", "2012-08-07T18:45Z", { min: "2012-08-07T18:46Z" });
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'rangeUnderflow');
	},

	"test should set rangeUnderflow for date field": function () {
		var el = createElement("date", "2012-08-07", { min: "2012-08-08" });
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'rangeUnderflow');
	},

	"test should set rangeUnderflow for time field": function () {
		var el = createElement("time", "18:45", { min: "18:46" });
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'rangeUnderflow');
	},

	"test should set rangeUnderflow for datetime-local field": function () {
		var el = createElement("datetime-local", "2012-08-07T18:45", { min: "2012-08-07T18:46" });
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'rangeUnderflow');
	},

	"test should not set rangeUnderflow for text field": function () {
		var el = createElement("text", "8", { min: "10" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'rangeUnderflow');
	}
	
	// TODO: Write for month, week

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
	},

	"test should have no default max for number": function () {
		var el = createElement("number", "99999999");
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'rangeOverflow');
	},

	"test should have default max = 100 for range": function () {
		var el = createElement("range", "101");
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'rangeOverflow');
	},

	"test should set rangeOverflow for datetime field": function () {
		var el = createElement("datetime", "2012-08-07T18:45Z", { max: "2012-08-07T18:44Z" });
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'rangeOverflow');
	},

	"test should set rangeOverflow for date field": function () {
		var el = createElement("date", "2012-08-07", { max: "2012-08-06" });
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'rangeOverflow');
	},

	"test should set rangeOverflow for time field": function () {
		var el = createElement("time", "18:45", { max: "18:44" });
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'rangeOverflow');
	},

	"test should set rangeOverflow for datetime-local field": function () {
		var el = createElement("datetime-local", "2012-08-07T18:45", { max: "2012-08-07T18:44" });
		
		var ret = el.checkValidity();
		
		assertInvalid(ret, el, 'rangeOverflow');
	},

	"test should not set rangeOverflow for text field": function () {
		var el = createElement("text", "12", { max: "10" });
		
		var ret = el.checkValidity();
		
		assertValid(ret, el, 'rangeOverflow');
	}

	// TODO: Write for month, week

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

TestCase("formerlyValidationInvalidEvent", sinon.testCase({
	
	"test should throw invalid event on checkValidity": function () {
		if (document.createEvent !== undefined) {		// Skip this for old IEs for now
			var el = createElement("text", "", { required: 'required' }, "", true, false);
			
			el.checkValidity();
			
			assertCalledOnce(el.dispatchEvent);
			var event = el.dispatchEvent.args[0][0];
			assertObject(event);
			assertEquals('invalid', event.type);
			assertFalse('Bubbles', event.bubbles);
			assertTrue('Cancelable', event.cancelable);
		}
	},
	
	"test should not throw invalid event when element valid": function () {
		var el = createElement("text", "");
		
		el.checkValidity();
		
		assertNotCalled(el.dispatchEvent);
	}

}));
	
TestCase("formerlyValidationInvalidEventIE", sinon.testCase({

	setUp: function () {
		this.el = createElement("text", "", { required: 'required' }, "", false, true); // Imitate IE
		this.nativeAttachEvent = this.el.attachEvent;
		this.nativeDetachEvent = this.el.detachEvent;
		formerly.initElement(this.el);
	},

	"test should override attachEvent when present": function () {
		//formerly.initElement(this.el); -- Done in setUp
		
		assertNotEquals(this.nativeAttachEvent, this.el.attachEvent);
	},

	"test attachEvent should return true for native event": function () {
		var ret = this.el.attachEvent('onclick', function () {});
		
		assertTrue(ret);
	},

	"test attachEvent should return true for invalid event": function () {
		var ret = this.el.attachEvent('oninvalid', function () {});
		
		assertTrue(ret);
	},
	
	"test should call browser attachEvent when not invalid event": function () {
		this.el.attachEvent('onclick', function () {});
		
		assertCalledWith(this.nativeAttachEvent, 'onclick');
	},
	
	"test should trigger invalid event on checkValidity in IE": function () {
		var handler = sinon.stub();
		this.el.attachEvent("oninvalid", handler);
		
		this.el.checkValidity();
		
		assertCalledOnce(handler);
	},

	"test should call back with event object": function () {
		var handler = sinon.stub();
		this.el.attachEvent("oninvalid", handler);
		this.el.checkValidity();
		
		var event = handler.args[0][0];
		
		assertObject(event);
		assertEquals("invalid", event.eventType);
	},

	"test should call several handlers on checkValidity in IE": function () {
		var handler1 = sinon.stub();
		var handler2 = sinon.stub();
		this.el.attachEvent("oninvalid", handler1);
		this.el.attachEvent("oninvalid", handler2);
		
		this.el.checkValidity();
		
		assertCalledOnce(handler1);
		assertCalledOnce(handler2);
	},
	
	"test should call handler for checked element only": function () {
		var el2 = createElement("text", "", { required: 'required' }, "", true, true); // Imitate IE
		var handler1 = sinon.stub();
		var handler2 = sinon.stub();
		this.el.attachEvent("oninvalid", handler1);
		el2.attachEvent("oninvalid", handler2);

		el2.checkValidity();

		assertNotCalled(handler1);
		assertCalledOnce(handler2);
	},
	
	"test should override detachEvent when present": function () {
		//formerly.initElement(this.el); -- Done in setUp
		
		assertNotEquals(this.nativeDetachEvent, this.el.detachEvent);
	},

	"test should call browser detachEvent when not invalid event": function () {
		this.el.detachEvent('onclick', function () {});
		
		assertCalledWith(this.nativeDetachEvent, 'onclick');
	},
	
	"test detachEvent should return 0 for invalid": function () {
		var handler = sinon.stub();
		this.el.attachEvent("oninvalid", handler);
		
		var ret = this.el.detachEvent("oninvalid", handler);
		
		assertEquals(0, ret);
	},

	"test detachEvent should return 0 for native events": function () {
		var handler = sinon.stub();
		this.el.attachEvent("onclick", handler);
		
		var ret = this.el.detachEvent("onclick", handler);
		
		assertEquals(0, ret);
	},

	"test should detach from invalid event": function () {
		var handler = sinon.stub();
		this.el.attachEvent("oninvalid", handler);
		this.el.detachEvent("oninvalid", handler);
		
		this.el.checkValidity();
		
		assertNotCalled(handler);
	},

	"test should detach correct event": function () {
		var handler1 = sinon.stub();
		var handler2 = sinon.stub();
		this.el.attachEvent("oninvalid", handler1);
		this.el.attachEvent("oninvalid", handler2);
		this.el.detachEvent("oninvalid", handler2);
		
		this.el.checkValidity();
		
		assertCalledOnce(handler1);
		assertNotCalled(handler2);
	}
}));


TestCase("formerlyValidationClassNames", {
	setUp: function () {
		this.form1 = { addEventListener: sinon.stub() };
	},
	
	tearDown: function () {
		formerly.init(this.form1, { validClass: 'valid' });		// Reset to default class name
	},

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
		
		assertEquals("other class names valid", el.className);
	},

	"test should not add valid class if exists": function () {
		var el = createElement("text", "", null, "already valid");

		var ret = el.checkValidity();
		
		assertEquals("already valid", el.className);
	},

	"test should not be fooled by 'valid' in other class names": function () {
		var el = createElement("text", "", null, "not reallyvalid");

		var ret = el.checkValidity();
		
		assertEquals("not reallyvalid valid", el.className);
	},
	
	"test should remove invalid class": function () {
		var el = createElement("text", "", null, "invalid");

		var ret = el.checkValidity();
		
		assertEquals("valid", el.className);
	},

	"test should remove invalid class among other classes": function () {
		var el = createElement("text", "", null, "is invalid");

		var ret = el.checkValidity();
		
		assertEquals("is valid", el.className);
	},

	"test should not be fooled by 'invalid' in other class names": function () {
		var el = createElement("text", "", null, "is notinvalid");

		var ret = el.checkValidity();
		
		assertEquals("is notinvalid valid", el.className);
	},

	"test should not be fooled by 'invalid' at the beginning of other class names": function () {
		var el = createElement("text", "", null, "is invalidlike");

		var ret = el.checkValidity();
		
		assertEquals("is invalidlike valid", el.className);
	},
	
	"test should use custom valid class name when set": function () {
		var el = createElement("text", "", null, "", false);
		this.form1.elements = [ el ];
		this.form1.length = this.form1.elements.length;
		formerly.init(this.form1, { validClass: 'okay' });

		var ret = el.checkValidity();
		
		assertEquals('okay', el.className);
	},

	"test should use custom invalid class name when set": function () {
		var el = createElement("text", "", { required: "required" }, "", false);
		this.form1.elements = [ el ];
		this.form1.length = this.form1.elements.length;
		formerly.init(this.form1, { invalidClass: 'fail' });

		var ret = el.checkValidity();
		
		assertEquals('fail', el.className);
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