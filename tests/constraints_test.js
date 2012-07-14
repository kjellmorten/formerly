TestCase("h5formPolyElementConstraintInterface", {

	setUp: function () {
		this.func = function () {};
		this.obj = {};
		
		this.unsupEl = {};
		this.supEl = {
			willValidate: this.obj,
			validity: this.obj,
			setCustomValidity: this.func,
			checkValidity: this.func,
			validationMessage: this.obj
		}
	},
	
	"test should set willValidate attribute": function () {
		h5formPoly.initElement(this.unsupEl);
		
		assertBoolean(this.unsupEl.willValidate);
	},
	
	"test should not set willValidate when existing": function () {
		h5formPoly.initElement(this.supEl);
		
		assertSame(this.obj, this.supEl.willValidate);
	},

	"test should set setCustomValidity function": function () {
		h5formPoly.initElement(this.unsupEl);
		
		assertFunction(this.unsupEl.setCustomValidity);
	},
		
	"test should not set setCustomValidity when existing": function () {
		h5formPoly.initElement(this.supEl);
		
		assertSame(this.func, this.supEl.setCustomValidity);
	},

	"test should set validity object": function () {
		h5formPoly.initElement(this.unsupEl);
		
		assertObject(this.unsupEl.validity);
	},
	
	"test should not set validity object when existing": function () {
		h5formPoly.initElement(this.supEl);
		
		assertSame(this.obj, this.supEl.validity);
	},

	"test should set checkValidity function": function () {
		h5formPoly.initElement(this.unsupEl);
		
		assertFunction(this.unsupEl.checkValidity);
	},

	"test should not set checkValidity when existing": function () {
		h5formPoly.initElement(this.supEl);
		
		assertSame(this.func, this.supEl.checkValidity);
	},

	"test should set validationMessage": function () {
		h5formPoly.initElement(this.unsupEl);
		
		assertString(this.unsupEl.validationMessage);
	},
	
	"test should not set validationMessage when existing": function () {
		h5formPoly.initElement(this.supEl);
		
		assertSame(this.obj, this.supEl.validationMessage);
	},

	"test should set one if any others are missing": function () {
		var partlySupEl = {
			willValidate: this.obj,
			setCustomValidity: this.func,
			validity: this.obj,
			validationMessage: this.obj
		}

		h5formPoly.initElement(partlySupEl);
		
		assertFunction(partlySupEl.checkValidity);
		assertNotSame(this.func, partlySupEl.setCustomValidity);
		assertNotSame(this.obj, partlySupEl.validity);
		assertNotSame(this.obj, partlySupEl.validationMessage);
		//willValidate is treated seperately, as the rest functions independent of it
	}

});


TestCase("h5formPolyElementWillValidate", {

	"test should return false for hidden input": function () {
		var el = getInitedElement('hidden');
		
		assertFalse(el.willValidate);
	},

	"test should return true for text input": function () {
		var el = getInitedElement('text');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for search input": function () {
		var el = getInitedElement('search');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for tel input": function () {
		var el = getInitedElement('tel');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for url input": function () {
		var el = getInitedElement('url');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for email input": function () {
		var el = getInitedElement('email');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for password input": function () {
		var el = getInitedElement('password');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for datetime input": function () {
		var el = getInitedElement('datetime');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for date input": function () {
		var el = getInitedElement('date');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for month input": function () {
		var el = getInitedElement('month');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for week input": function () {
		var el = getInitedElement('week');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for time input": function () {
		var el = getInitedElement('time');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for datetime-local input": function () {
		var el = getInitedElement('datetime-local');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for number input": function () {
		var el = getInitedElement('number');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for range input": function () {
		var el = getInitedElement('range');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for color input": function () {
		var el = getInitedElement('color');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for checkbox input": function () {
		var el = getInitedElement('checkbox');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for radio input": function () {
		var el = getInitedElement('radio');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for file input": function () {
		var el = getInitedElement('file');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for submit button": function () {
		var el = getInitedElement('submit');
		
		assertTrue(el.willValidate);
	},
	
	"test should return false for image input": function () {
		var el = getInitedElement('image');
		
		assertFalse(el.willValidate);
	},

	"test should return false for reset button": function () {
		var el = getInitedElement('reset');
		
		assertFalse(el.willValidate);
	},

	"test should return false for button": function () {
		var el = getInitedElement('button');
		
		assertFalse(el.willValidate);
	},

	"test should return false for fieldset": function () {
		var el = getInitedElement('fieldset');
		
		assertFalse(el.willValidate);
	},

	"test should return false for keygen": function () {
		var el = getInitedElement('keygen');
		
		assertFalse(el.willValidate);
	},

	"test should return false for output": function () {
		var el = getInitedElement('output');
		
		assertFalse(el.willValidate);
	},

	"test should return true for select": function () {
		var el = getInitedElement('select-one');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for select multiple": function () {
		var el = getInitedElement('select-multiple');
		
		assertTrue(el.willValidate);
	},
	
	"test should return true for textarea": function () {
		var el = getInitedElement('textarea');
		
		assertTrue(el.willValidate);
	},

	"test should return false for unknown type": function () {
		var el = getInitedElement('unknown');
		
		assertFalse(el.willValidate);
	},

	"test should return false for undefined type": function () {
		var el = getInitedElement(undefined);
		
		assertFalse(el.willValidate);
	}
	
});

TestCase("h5formPolyElementValidityInterface", {

	setUp: function () {
		this.unsupEl = {};
	},

	"test should set validity.valueMissing": function () {
		h5formPoly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.valueMissing);
	},
	
	"test should set validity.typeMismatch": function () {
		h5formPoly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.typeMismatch);
	},
	
	"test should set validity.patternMismatch": function () {
		h5formPoly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.patternMismatch);
	},
	
	"test should set validity.tooLong": function () {
		h5formPoly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.tooLong);
	},
	
	"test should set validity.rangeUnderflow": function () {
		h5formPoly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.rangeUnderflow);
	},
	
	"test should set validity.rangeOverflow": function () {
		h5formPoly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.rangeOverflow);
	},
	
	"test should set validity.stepMismatch": function () {
		h5formPoly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.stepMismatch);
	},

	"test should set validity.customError": function () {
		h5formPoly.initElement(this.unsupEl);
		
		assertFalse(this.unsupEl.validity.customError);
	},
	
	"test should set validity.valid": function () {
		h5formPoly.initElement(this.unsupEl);
		
		assertTrue(this.unsupEl.validity.valid);
	}
	
});

TestCase("h5formPolyElementCustomError", {
	setUp: function () {
		this.el = getInitedElement('text');
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
	}
	
});

function getInitedElement (type) {
	var el = {};
	el.type = type;

	h5formPoly.initElement(el);
	return el;
}

// form.elements and fieldset.elements
// button fieldset input keygen object output select textarea