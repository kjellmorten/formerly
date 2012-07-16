TestCase("formerlyElementConstraintInterface", {

	setUp: function () {
		this.func = function () {};
		this.obj = {};
		
		this.unsupEl = { attributes: {} };
		this.supEl = {
			willValidate: this.obj,
			validity: this.obj,
			setCustomValidity: this.func,
			checkValidity: this.func,
			validationMessage: this.obj,
			attributes: {}
		}
	},
	
	"test should set willValidate attribute": function () {
		formerly.initElement(this.unsupEl);
		
		assertBoolean(this.unsupEl.willValidate);
	},
	
	"test should not set willValidate when existing": function () {
		formerly.initElement(this.supEl);
		
		assertSame(this.obj, this.supEl.willValidate);
	},

	"test should set setCustomValidity function": function () {
		formerly.initElement(this.unsupEl);
		
		assertFunction(this.unsupEl.setCustomValidity);
	},
		
	"test should not set setCustomValidity when existing": function () {
		formerly.initElement(this.supEl);
		
		assertSame(this.func, this.supEl.setCustomValidity);
	},

	"test should set validity object": function () {
		formerly.initElement(this.unsupEl);
		
		assertObject(this.unsupEl.validity);
	},
	
	"test should not set validity object when existing": function () {
		formerly.initElement(this.supEl);
		
		assertSame(this.obj, this.supEl.validity);
	},

	"test should set checkValidity function": function () {
		formerly.initElement(this.unsupEl);
		
		assertFunction(this.unsupEl.checkValidity);
	},

	"test should not set checkValidity when existing": function () {
		formerly.initElement(this.supEl);
		
		assertSame(this.func, this.supEl.checkValidity);
	},

	"test should set validationMessage": function () {
		formerly.initElement(this.unsupEl);
		
		assertString(this.unsupEl.validationMessage);
	},
	
	"test should not set validationMessage when existing": function () {
		formerly.initElement(this.supEl);
		
		assertSame(this.obj, this.supEl.validationMessage);
	},

	"test should set one if any others are missing": function () {
		var partlySupEl = {
			willValidate: this.obj,
			setCustomValidity: this.func,
			validity: this.obj,
			validationMessage: this.obj
		}

		formerly.initElement(partlySupEl);
		
		assertFunction(partlySupEl.checkValidity);
		assertNotSame(this.func, partlySupEl.setCustomValidity);
		assertNotSame(this.obj, partlySupEl.validity);
		assertNotSame(this.obj, partlySupEl.validationMessage);
		//willValidate is treated seperately, as the rest function independent of it
	}

});


TestCase("formerlyElementWillValidate", {

	"test should return false for hidden input": function () {
		var el = createElement('hidden');
		
		assertFalse(el.willValidate);
	},

	"test should return true for text input": function () {
		var el = createElement('text');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for search input": function () {
		var el = createElement('search');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for tel input": function () {
		var el = createElement('tel');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for url input": function () {
		var el = createElement('url');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for email input": function () {
		var el = createElement('email');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for password input": function () {
		var el = createElement('password');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for datetime input": function () {
		var el = createElement('datetime');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for date input": function () {
		var el = createElement('date');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for month input": function () {
		var el = createElement('month');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for week input": function () {
		var el = createElement('week');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for time input": function () {
		var el = createElement('time');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for datetime-local input": function () {
		var el = createElement('datetime-local');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for number input": function () {
		var el = createElement('number');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for range input": function () {
		var el = createElement('range');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for color input": function () {
		var el = createElement('color');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for checkbox input": function () {
		var el = createElement('checkbox');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for radio input": function () {
		var el = createElement('radio');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for file input": function () {
		var el = createElement('file');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for submit button": function () {
		var el = createElement('submit');
		
		assertTrue(el.willValidate);
	},
	
	"test should return false for image input": function () {
		var el = createElement('image');
		
		assertFalse(el.willValidate);
	},

	"test should return false for reset button": function () {
		var el = createElement('reset');
		
		assertFalse(el.willValidate);
	},

	"test should return false for button": function () {
		var el = createElement('button');
		
		assertFalse(el.willValidate);
	},

	"test should return false for fieldset": function () {
		var el = createElement('fieldset');
		
		assertFalse(el.willValidate);
	},

	"test should return false for keygen": function () {
		var el = createElement('keygen');
		
		assertFalse(el.willValidate);
	},

	"test should return false for object": function () {
		var el = createElement('application/x-shockwave-flash');
		
		assertFalse(el.willValidate);
	},

	"test should return false for output": function () {
		var el = createElement('output');
		
		assertFalse(el.willValidate);
	},

	"test should return true for select": function () {
		var el = createElement('select-one');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for select multiple": function () {
		var el = createElement('select-multiple');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for textarea": function () {
		var el = createElement('textarea');
		
		assertTrue(el.willValidate);
	},

	"test should return false for unknown type": function () {
		var el = createElement('unknown');
		
		assertFalse(el.willValidate);
	},

	"test should return false for undefined type": function () {
		var el = createElement(undefined);
		
		assertFalse(el.willValidate);
	},
	
	"test should return false for disabled element": function () {
		var el = createElement('text', '', { disabled: 'disabled' });
		
		assertFalse(el.willValidate);
	}
	
});

TestCase("formerlyElementValidityInterface", {

	setUp: function () {
		this.unsupEl = { attributes: {} };
	},

	"test should set validity.valueMissing": function () {
		formerly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.valueMissing);
	},
	
	"test should set validity.typeMismatch": function () {
		formerly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.typeMismatch);
	},
	
	"test should set validity.patternMismatch": function () {
		formerly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.patternMismatch);
	},
	
	"test should set validity.tooLong": function () {
		formerly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.tooLong);
	},
	
	"test should set validity.rangeUnderflow": function () {
		formerly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.rangeUnderflow);
	},
	
	"test should set validity.rangeOverflow": function () {
		formerly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.rangeOverflow);
	},
	
	"test should set validity.stepMismatch": function () {
		formerly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.stepMismatch);
	},

	"test should set validity.customError": function () {
		formerly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.customError);
	},
	
	"test should set validity.valid": function () {
		formerly.initElement(this.unsupEl);
		
		assertTrue(this.unsupEl.validity.valid);
	}
	
});

TestCase("formerlyElementCustomError", {
	setUp: function () {
		this.el = createElement('text');
	},
	
	"test should return any custom message": function () {
		this.el.setCustomValidity('A message');
		
		assertEquals('A message', this.el.validationMessage);
	},
	
	"test should set customError": function () {
		this.el.setCustomValidity('A message');
		
		assertTrue(this.el.validity.customError);
		assertFalse(this.el.validity.valid);
	},
	
	"test should clear customError when message empty": function () {
		this.el.setCustomValidity('');
		
		assertFalse(this.el.validity.customError);
		assertTrue(this.el.validity.valid);
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
