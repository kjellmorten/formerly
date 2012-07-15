TestCase("formpolyValidation", {
	
	"test should set valid": function () {
		var el = createElement("text", "");

		var ret = el.checkValidity();
		
		assertTrue(ret);
		assertTrue(el.validity.valid);
	}

});

TestCase("formpolyValidationValueMissing", {
	
	"test should set valueMissing": function () {
		var el = createElement("text", "", { required: "required" });
		
		var ret = el.checkValidity();
		
		assertFalse(ret);
		assertTrue(el.validity.valueMissing);
		assertFalse(el.validity.valid);
	}
	
});

TestCase("formpolyValidationTypeMismatchEmail", {
	
	"test should set typeMismatch for invalid email": function () {
		var el = createElement("email", "noemail");
		
		var ret = el.checkValidity();
		
		assertTypeMismatch(ret, el);
	},
	
	"test should not set typeMismatch for valid email": function () {
		var el = createElement("email", "email@company.com");
		
		var ret = el.checkValidity();
		
		assertNoTypeMismatch(ret, el);
	},
	
	"test should not set typeMismatch for empty string": function () {
		var el = createElement("email", "");
		
		var ret = el.checkValidity();
		
		assertNoTypeMismatch(ret, el);
	}

	
	// TODO: More tests with different e-mail addresses
	// TODO: multiple e-mail addresses
		
});

TestCase("formpolyValidationTypeMismatchUrl", {
	
	"test should set typeMismatch for invalid url": function () {
		var el = createElement("url", "nourl");
		
		var ret = el.checkValidity();

		assertTypeMismatch(ret, el);
	},
	
	"test should set typeMismatch for a relative url": function () {
		var el = createElement("url", "//www.relative.com/");
		
		var ret = el.checkValidity();

		assertTypeMismatch(ret, el);
	},
	
	"test should not set typeMismatch for valid url": function () {
		var el = createElement("url", "http://www.valid.com/");
		
		var ret = el.checkValidity();

		assertNoTypeMismatch(ret, el);
	},

	"test should not set typeMismatch for valid url surrounded by spaces": function () {
		var el = createElement("url", " http://www.valid.com/ ");
		
		var ret = el.checkValidity();

		assertNoTypeMismatch(ret, el);
	}
});

TestCase("formpolyValidationTooLong", {
	
	"test should set tooLong": function () {
		var el = createElement("text", "Longer than 20 characters", { maxlength: 20 });
		
		var ret = el.checkValidity();
		
		assertFalse(ret);
		assertTrue(el.validity.tooLong);
		assertFalse(el.validity.valid);
	},
	
	"test should not set tooLong for shorter string": function () {
		var el = createElement("text", "Shorter than 20", { maxlength: 20 });
		
		var ret = el.checkValidity();
		
		assertTrue(ret);
		assertFalse(el.validity.tooLong);
		assertTrue(el.validity.valid);
	},

	"test should not set tooLong for empty string": function () {
		var el = createElement("text", "", { maxlength: 20 });
		
		var ret = el.checkValidity();
		
		assertTrue(ret);
		assertFalse(el.validity.tooLong);
	}
	
});

function assertTypeMismatch (ret, el) {
	assertFalse(ret);
	assertTrue(el.validity.typeMismatch);
	assertFalse(el.validity.valid);
}

function assertNoTypeMismatch (ret, el) {
	assertTrue(ret);
	assertFalse(el.validity.typeMismatch);
	assertTrue(el.validity.valid);
}