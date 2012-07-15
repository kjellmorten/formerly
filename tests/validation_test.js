TestCase("formpolyValidationRequired", {
	
	"test should set valid": function () {
		var el = createElement("text", "");

		var ret = el.checkValidity();
		
		assertTrue(ret);
		assertTrue(el.validity.valid);
	},
	
	"test should set valueMissing": function () {
		var el = createElement("text", "", { required: "required" });
		
		var ret = el.checkValidity();
		
		assertFalse(ret);
		assertTrue(el.validity.valueMissing);
		assertFalse(el.validity.valid);
	}
	
});
