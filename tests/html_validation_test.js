TestCase("formerlyHTMLConstraints", {
	setUp: function () {
		/*:DOC +=
			<form id="form1">
				<input type="text" value="" id="field1" />
				<input type="text" value="" id="field2" required="required" />
			</form>
		*/
		this.form1 = document.getElementById('form1');
		this.field1 = document.getElementById('field1');
		this.field2 = document.getElementById('field2');
		
		formerly.init(this.form1);
		
		this.handler = sinon.stub();
	},
	
	"test form should have checkValidity function": function () {
		assertFunction(this.form1.checkValidity);
	},
	
	"test element should have checkValidity function": function () {
		assertFunction(this.field1.checkValidity);
	},
	
	"test element should have validity object": function () {
		assertObject(this.field1.validity);
	},

	"test should be valid": function () {
		var ret = this.field1.checkValidity();
		
		assertTrue(ret);
		assertTrue(this.field1.validity.valid)
	},

	"test should be invalid": function () {
		var ret = this.field2.checkValidity();
		
		assertInvalid(ret, this.field2, 'valueMissing');
	},

	"test should fire invalid event": function () {
		listenForEvent(this.field2, 'invalid', this.handler);
		
		this.field2.checkValidity();
		
		assertCalledOnce(this.handler);
	},

	"test should not fire invalid event": function () {
		listenForEvent(this.field1, 'invalid', this.handler);
		
		this.field1.checkValidity();
		
		assertNotCalled(this.handler);
	},

	"test should find form invalid and fire one invalid event": function () {
		listenForEvent(this.field1, 'invalid', this.handler);
		listenForEvent(this.field2, 'invalid', this.handler);
		
		this.form1.checkValidity();
		
		assertCalledOnce(this.handler);
	},

	"test element should have setCustomValidity function": function () {
		assertFunction(this.field1.setCustomValidity);
	},

	"test should set custom validity": function () {
		this.field1.setCustomValidity('A message');
		
		var ret = this.field1.checkValidity();
		
		assertInvalid(ret, this.field1, 'customError');
		assertEquals('A message', this.field1.validationMessage);
	},

	"test should clear custom validity": function () {
		this.field1.setCustomValidity('');
		
		var ret = this.field1.checkValidity();
		
		assertValid(ret, this.field1, 'customError');
		assertEquals('', this.field1.validationMessage);
	},

	"test should not fire invalid event on setCustomValidity": function () {
		listenForEvent(this.field1, 'invalid', this.handler);
		
		this.field1.setCustomValidity('A message');
		
		assertNotCalled(this.handler);
	},

	"test should not validate disabled element": function () {
		/*:DOC field3 = <input type="text" value="" required="required" disabled="disabled" /> */
		//this.field2.disabled = true;
		formerly.initElement(this.field3);
		
		var ret = this.field3.checkValidity();
		
		assertValid(ret, this.field3, 'valueMissing');
	}
});

TestCase("formerlyHTMLValidations", {

	"test should set typeMismatch for invalid email": function () {
		/*:DOC field1 = <input type="email" value="noemail" /> */
		formerly.initElement(this.field1);
		
		var ret = this.field1.checkValidity();
		
		assertInvalid(ret, this.field1, 'typeMismatch');
	},

	"test should not set typeMismatch for valid email": function () {
		/*:DOC field1 = <input type="email" value="email@company.com" /> */
		formerly.initElement(this.field1);
		
		var ret = this.field1.checkValidity();
		
		assertValid(ret, this.field1, 'typeMismatch');
	},

	"test should set typeMismatch for invalid url": function () {
		/*:DOC field1 = <input type="url" value="nourl" /> */
		formerly.initElement(this.field1);
		
		var ret = this.field1.checkValidity();

		assertInvalid(ret, this.field1, 'typeMismatch');
	},

	"test should not set typeMismatch for valid url": function () {
		/*:DOC field1 = <input type="url" value="http://www.valid.com/" /> */
		formerly.initElement(this.field1);
		
		var ret = this.field1.checkValidity();

		assertValid(ret, this.field1, 'typeMismatch');
	},

	"test should set patternMismatch": function () {
		/*:DOC field1 = <input type="text" value="letters" pattern="\d*" /> */
		formerly.initElement(this.field1);

		var ret = this.field1.checkValidity();
		
		assertInvalid(ret, this.field1, 'patternMismatch');
	},

	"test should not set patternMismatch on match": function () {
		/*:DOC field1 = <input type="text" value="123" pattern="\d*" /> */
		formerly.initElement(this.field1);

		var ret = this.field1.checkValidity();
		
		assertValid(ret, this.field1, 'patternMismatch');
	},

	"test should set tooLong": function () {
		/*:DOC field1 = <input type="text" value="" maxlength="20" /> */

		if (this.field1.checkValidity === undefined) {
			// Not working properly in Firefox, so test only formerly implementation....
			
			formerly.initElement(this.field1);
			this.field1.value = "Longer than 20 characters";
			
			var ret = this.field1.checkValidity();
			
			assertInvalid(ret, this.field1, 'tooLong');
		}
	},

	"test should set rangeUnderflow": function () {
		/*:DOC field1 = <input type="number" value="8" min="10" /> */

		if (this.field1.checkValidity === undefined) {
			// Not working properly in Firefox, so test only formerly implementation....
			
			var ret = this.field1.checkValidity();
			
			assertInvalid(ret, this.field1, 'rangeUnderflow');
		}
	},

	"test should not set rangeUnderflow": function () {
		/*:DOC field1 = <input type="number" value="11" min="10" /> */
		
		var ret = this.field1.checkValidity();
		
		assertValid(ret, this.field1, 'rangeUnderflow');
	},

	"test should set rangeOverflow": function () {
		/*:DOC field1 = <input type="number" value="12" max="10" /> */
		
		if (this.field1.checkValidity === undefined) {
			// Not working properly in Firefox, so test only formerly implementation....

			var ret = this.field1.checkValidity();
			
			assertInvalid(ret, this.field1, 'rangeOverflow');
		}
	},

	"test should not set rangeOverflow": function () {
		/*:DOC field1 = <input type="number" value="9" max="10" /> */
		
		var ret = this.field1.checkValidity();
		
		assertValid(ret, this.field1, 'rangeOverflow');
	},

	"test should set stepMismatch": function () {
		/*:DOC field1 = <input type="number" value="1.5" step="1" /> */
		
		if (this.field1.checkValidity === undefined) {
			// Not working properly in Firefox, so test only formerly implementation....

			var ret = this.field1.checkValidity();
			
			assertInvalid(ret, this.field1, 'stepMismatch');
		}
	},

	"test should not set stepMismatch when valid steps from min": function () {
		/*:DOC field1 = <input type="number" value="3.5" step="1" min="0.5" /> */
		
		var ret = this.field1.checkValidity();
		
		assertValid(ret, this.field1, 'stepMismatch');
	}

});


function listenForEvent (el, event, handler) {
	if (el.addEventListener) {
		el.addEventListener(event, handler, false);
	} else {
		el.attachEven('on' + event, handler);
	}
}
