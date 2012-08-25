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
		assertTrue(this.field1.validity.valid);
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

	"test should detach invalid handler in IE": function () {
		if (this.field2.detachEvent !== undefined) {
			this.field2.attachEvent('oninvalid', this.handler);
			this.field2.detachEvent('oninvalid', this.handler);
	
			this.field2.checkValidity();
	
			assertNotCalled(this.handler);
		}
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
		
		//assertValid(ret, this.field3, 'valueMissing');	// IE10 returns true, but also sets the valueMissing state to true
		assertTrue(ret);
	}
});

TestCase("formerlyHTMLValidations", {
	setUp: function () {
		/*:DOC += 
			<form>
				<input type="email" id="field1" value="noemail" />
				<input type="email" id="field2" value="email@company.com" />
				<input type="url" id="field3" value="nourl" />
				<input type="url" id="field4" value="http://www.valid.com/" />
				<input type="text" id="field5" value="letters" pattern="\d*" />
				<input type="text" id="field6" value="123" pattern="\d*" />
				<input type="text" id="field7" value="" maxlength="20" />
				<input type="number" id="field8" value="8" min="10" />
				<input type="number" id="field9" value="11" min="10" />
				<input type="number" id="field10" value="12" max="10" />
				<input type="number" id="field11" value="9" max="10" />
				<input type="number" id="field12" value="1.5" step="1" />
				<input type="number" id="field13" value="3.5" step="1" min="0.5" />
				<input type="date" id="field14" value="nodate" />
				<input type="date" id="field15" value="2012-08-07" />
			</form>
		*/
	},

	"test should set typeMismatch for invalid email": function () {
		var field = document.getElementById("field1");
		formerly.initElement(field);
		
		var ret = field.checkValidity();
		
		assertInvalid(ret, field, 'typeMismatch');
	},

	"test should not set typeMismatch for valid email": function () {
		var field = document.getElementById("field2");
		formerly.initElement(field);
		
		var ret = field.checkValidity();
		
		assertValid(ret, field, 'typeMismatch');
	},

	"test should set typeMismatch for invalid url": function () {
		var field = document.getElementById("field3");
		formerly.initElement(field);
		
		var ret = field.checkValidity();

		assertInvalid(ret, field, 'typeMismatch');
	},

	"test should not set typeMismatch for valid url": function () {
		var field = document.getElementById("field4");
		formerly.initElement(field);
		
		var ret = field.checkValidity();

		assertValid(ret, field, 'typeMismatch');
	},

	"test should set typeMismatch for invalid date": function () {
		var field = document.getElementById("field14");
		if (field.checkValidity === undefined) {
			formerly.initElement(field);
			
			var ret = field.checkValidity();
			
			assertInvalid(ret, field, 'typeMismatch');
		}
	},

	"test should not set typeMismatch for valid date": function () {
		var field = document.getElementById("field15");
		formerly.initElement(field);
		
		var ret = field.checkValidity();
		
		assertValid(ret, field, 'typeMismatch');
	},

	"test should set patternMismatch": function () {
		var field = document.getElementById("field5");
		formerly.initElement(field);

		var ret = field.checkValidity();
		
		assertInvalid(ret, field, 'patternMismatch');
	},

	"test should not set patternMismatch on match": function () {
		var field = document.getElementById("field6");
		formerly.initElement(field);

		var ret = field.checkValidity();
		
		assertValid(ret, field, 'patternMismatch');
	},

	"test should set tooLong": function () {
		var field = document.getElementById("field7");

		if (field.checkValidity === undefined) {
			// Not working properly in Firefox and Chrome, so test only formerly implementation....
			formerly.initElement(field);

			field.value = "Longer than 20 characters";
			
			var ret = field.checkValidity();
			
			assertInvalid(ret, field, 'tooLong');
		}
	},

	"test should set rangeUnderflow": function () {
		var field = document.getElementById("field8");
			
		if (field.checkValidity === undefined) {
			// Not working properly in Firefox, so test only formerly implementation....
			formerly.initElement(field);
			
			var ret = field.checkValidity();
			
			assertInvalid(ret, field, 'rangeUnderflow');
		}
	},

	"test should not set rangeUnderflow": function () {
		var field = document.getElementById("field9");
		formerly.initElement(field);
		
		var ret = field.checkValidity();
		
		assertValid(ret, field, 'rangeUnderflow');
	},

	"test should set rangeOverflow": function () {
		var field = document.getElementById("field10");
		
		if (field.checkValidity === undefined) {
			// Not working properly in Firefox, so test only formerly implementation....
			formerly.initElement(field);

			var ret = field.checkValidity();
			
			assertInvalid(ret, field, 'rangeOverflow');
		}
	},

	"test should not set rangeOverflow": function () {
		var field = document.getElementById("field11");
		formerly.initElement(field);
		
		var ret = field.checkValidity();
		
		assertValid(ret, field, 'rangeOverflow');
	},

	"test should set stepMismatch": function () {
		var field = document.getElementById("field12");
		
		if (field.checkValidity === undefined) {
			// Not working properly in Firefox, so test only formerly implementation....
			formerly.initElement(field);

			var ret = field.checkValidity();
			
			assertInvalid(ret, field, 'stepMismatch');
		}
	},

	"test should not set stepMismatch when valid steps from min": function () {
		var field = document.getElementById("field13");
		formerly.initElement(field);
		
		var ret = field.checkValidity();
		
		assertValid(ret, field, 'stepMismatch');
	}

});


function listenForEvent (el, event, handler) {
	if (el.addEventListener !== undefined) {
		el.addEventListener(event, handler, false);
	} else if (el.attachEvent !== undefined) {
		el.attachEvent('on' + event, handler);
	}
}

function throwEvent (el, type) {
	var event;
	if ((document.createEvent !== undefined) && (el.dispatchEvent !== undefined)) {
		event = document.createEvent("HTMLEvents");
		event.initEvent(type, false, true);
		el.dispatchEvent(event);
	} else if ((document.createEventObject !== undefined) && (el.fireEvent !== undefined)) {
	    event = document.createEventObject();
	    event.eventType = type;
	    el.fireEvent("on" + type, event);
	}
}
