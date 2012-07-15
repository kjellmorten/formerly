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

TestCase("formpolyValidationTypeMismatch", {
	
	"test should set typeMismatch for invalid email": function () {
		var el = createElement("email", "noemail");
		
		var ret = el.checkValidity();
		
		assertFalse(ret);
		assertTrue(el.validity.typeMismatch);
		assertFalse(el.validity.valid);
	},
	
	"test should not set typeMismatch for valid email": function () {
		var el = createElement("email", "email@company.com");
		
		var ret = el.checkValidity();
		
		assertTrue(ret);
		assertFalse(el.validity.typeMismatch);
		assertTrue(el.validity.valid);
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
