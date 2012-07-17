TestCase("HTMLElementsWillValidate", {

	"test willValidate should be false for hidden input": function() {
		/*:DOC field1 = <input type="hidden" /> */
		formerly.initElement(this.field1);

		assertFalse(this.field1.willValidate);
	},

	"test willValidate should be true for text input": function() {
		/*:DOC field1 = <input type="text" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for search input": function() {
		/*:DOC field1 = <input type="search" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for tel input": function() {
		/*:DOC field1 = <input type="tel" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for url input": function() {
		/*:DOC field1 = <input type="url" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for email input": function() {
		/*:DOC field1 = <input type="email" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for password input": function() {
		/*:DOC field1 = <input type="password" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for datetime input": function() {
		/*:DOC field1 = <input type="datetime" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for date input": function() {
		/*:DOC field1 = <input type="date" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for month input": function() {
		/*:DOC field1 = <input type="month" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for week input": function() {
		/*:DOC field1 = <input type="week" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for time input": function() {
		/*:DOC field1 = <input type="time" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for datetime local input": function() {
		/*:DOC field1 = <input type="datetime-local" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for number input": function() {
		/*:DOC field1 = <input type="number" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for range input": function() {
		/*:DOC field1 = <input type="range" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for color input": function() {
		/*:DOC field1 = <input type="color" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for checkbox input": function() {
		/*:DOC field1 = <input type="checkbox" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for radio input": function() {
		/*:DOC field1 = <input type="radio" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for file input": function() {
		/*:DOC field1 = <input type="file" /> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for submit input": function() {
		/*:DOC field1 = <input type="submit" /> */
		formerly.initElement(this.field1);

		//assertTrue(this.field1.willValidate);
		// False in Firefox 12.0 Mac OS
	},

	"test willValidate should be false for image input": function() {
		/*:DOC field1 = <input type="image" /> */
		formerly.initElement(this.field1);

		//assertFalse(this.field1.willValidate);
		// True in Opera 12.00 Mac OS
	},

	"test willValidate should be false for reset input": function() {
		/*:DOC field1 = <input type="reset" /> */
		formerly.initElement(this.field1);

		assertFalse(this.field1.willValidate);
	},

	"test willValidate should be false for button input": function() {
		/*:DOC field1 = <input type="button" /> */
		formerly.initElement(this.field1);

		assertFalse(this.field1.willValidate);
	},

	"test willValidate should be true for submit button": function() {
		/*:DOC field1 = <button type="submit" /> */
		formerly.initElement(this.field1);

		//assertTrue(this.field1.willValidate);
		// False in Firefox 12.0 Mac OS
	},

	"test willValidate should be false for reset button": function() {
		/*:DOC field1 = <button type="reset" /> */
		formerly.initElement(this.field1);

		assertFalse(this.field1.willValidate);
	},

	"test willValidate should be false for button button": function() {
		/*:DOC field1 = <button type="button" /> */
		formerly.initElement(this.field1);

		assertFalse(this.field1.willValidate);
	},

	"test willValidate should be false for fieldset": function() {
		/*:DOC field1 = <fieldset></fieldset> */
		formerly.initElement(this.field1);

		assertFalse(this.field1.willValidate);
	},

	"test willValidate should be false for keygen": function() {
		/*:DOC field1 = <keygen /> */
		formerly.initElement(this.field1);

		//assertFalse(this.field1.willValidate);
		// True in Firefox 12.0 Mac OS
	},

	"test willValidate should be false for object": function() {
		/*:DOC field1 = <object type="application/x-shockwave-flash" /> */
		formerly.initElement(this.field1);

		assertFalse(this.field1.willValidate);
	},

	"test willValidate should be false for output": function() {
		/*:DOC field1 = <output /> */
		formerly.initElement(this.field1);

		//assertFalse(this.field1.willValidate);
		// True in Firefox 12.0 Mac OS
	},

	"test willValidate should be true for select": function() {
		/*:DOC field1 = <select></select> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for select multiple": function() {
		/*:DOC field1 = <select multiple="multiple"></select> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be true for textarea": function() {
		/*:DOC field1 = <textarea></textarea> */
		formerly.initElement(this.field1);

		assertTrue(this.field1.willValidate);
	},

	"test willValidate should be false for disabled element": function() {
		/*:DOC field1 = <input type="text" disabled="disabled" /> */
		formerly.initElement(this.field1);

		assertFalse(this.field1.willValidate);
	},

	"test willValidate should be false for readonly element": function() {
		/*:DOC field1 = <input type="text" readonly="readonly" /> */
		formerly.initElement(this.field1);

		assertFalse(this.field1.willValidate);
	}
});
	
TestCase("HTMLElementsType", {

	"test type should be hidden for hidden input": function() {
		/*:DOC field1 = <input type="hidden" /> */
		formerly.initElement(this.field1);

		assertEquals("hidden", this.field1.type);
	},

	"test type should be text for text input": function() {
		/*:DOC field1 = <input type="text" /> */
		formerly.initElement(this.field1);

		assertEquals("text", this.field1.type);
	},

	"test type should be search for search input": function() {
		/*:DOC field1 = <input type="search" /> */
		formerly.initElement(this.field1);

		assertEquals("search", this.field1.type);
	},

	"test type should be tel for tel input": function() {
		/*:DOC field1 = <input type="tel" /> */
		formerly.initElement(this.field1);

		assertEquals("tel", this.field1.type);
	},

	"test type should be url for url input": function() {
		/*:DOC field1 = <input type="url" /> */
		formerly.initElement(this.field1);

		assertEquals("url", this.field1.type);
	},

	"test type should be email for email input": function() {
		/*:DOC field1 = <input type="email" /> */
		formerly.initElement(this.field1);

		assertEquals("email", this.field1.type);
	},

	"test type should be password for password input": function() {
		/*:DOC field1 = <input type="password" /> */
		formerly.initElement(this.field1);

		assertEquals("password", this.field1.type);
	},

	"test type should be datetime for datetime input": function() {
		/*:DOC field1 = <input type="datetime" /> */
		formerly.initElement(this.field1);

		//assertEquals("datetime", this.field1.type);
		// 'text' in Firefox 12.0 Mac OS and Chrome 20.0.1132.57 Mac OS
	},

	"test type should be date for date input": function() {
		/*:DOC field1 = <input type="date" /> */
		formerly.initElement(this.field1);

		assertEquals("date", this.field1.type);
		// 'text' in Firefox 12.0 Mac OS
	},

	"test type should be month for month input": function() {
		/*:DOC field1 = <input type="month" /> */
		formerly.initElement(this.field1);

		//assertEquals("month", this.field1.type);
		// 'text' in Firefox 12.0 Mac OS and Chrome 20.0.1132.57 Mac OS
	},

	"test type should be week for week input": function() {
		/*:DOC field1 = <input type="week" /> */
		formerly.initElement(this.field1);

		//assertEquals("week", this.field1.type);
		// 'text' in Firefox 12.0 Mac OS and Chrome 20.0.1132.57 Mac OS
	},

	"test type should be time for time input": function() {
		/*:DOC field1 = <input type="time" /> */
		formerly.initElement(this.field1);

		//assertEquals("time", this.field1.type);
		// 'text' in Firefox 12.0 Mac OS and Chrome 20.0.1132.57 Mac OS
	},

	"test type should be datetime-local for datetime local input": function() {
		/*:DOC field1 = <input type="datetime-local" /> */
		formerly.initElement(this.field1);

		//assertEquals("datetime-local", this.field1.type);
		// 'text' in Firefox 12.0 Mac OS and Chrome 20.0.1132.57 Mac OS
	},

	"test type should be number for number input": function() {
		/*:DOC field1 = <input type="number" /> */
		formerly.initElement(this.field1);

		//assertEquals("number", this.field1.type);
		// 'text' in Firefox 12.0 Mac OS
	},

	"test type should be range for range input": function() {
		/*:DOC field1 = <input type="range" /> */
		formerly.initElement(this.field1);

		//assertEquals("range", this.field1.type);
		// 'text' in Firefox 12.0 Mac OS
	},

	"test type should be color for color input": function() {
		/*:DOC field1 = <input type="color" /> */
		formerly.initElement(this.field1);

		//assertEquals("color", this.field1.type);
		// 'text' in Firefox 12.0 Mac OS
	},

	"test type should be checkbox for checkbox input": function() {
		/*:DOC field1 = <input type="checkbox" /> */
		formerly.initElement(this.field1);

		assertEquals("checkbox", this.field1.type);
	},

	"test type should be radio for radio input": function() {
		/*:DOC field1 = <input type="radio" /> */
		formerly.initElement(this.field1);

		assertEquals("radio", this.field1.type);
	},

	"test type should be file for file input": function() {
		/*:DOC field1 = <input type="file" /> */
		formerly.initElement(this.field1);

		assertEquals("file", this.field1.type);
	},

	"test type should be submit for submit input": function() {
		/*:DOC field1 = <input type="submit" /> */
		formerly.initElement(this.field1);

		assertEquals("submit", this.field1.type);
	},

	"test type should be image for image input": function() {
		/*:DOC field1 = <input type="image" /> */
		formerly.initElement(this.field1);

		assertEquals("image", this.field1.type);
	},

	"test type should be reset for reset input": function() {
		/*:DOC field1 = <input type="reset" /> */
		formerly.initElement(this.field1);

		assertEquals("reset", this.field1.type);
	},

	"test type should be button for button input": function() {
		/*:DOC field1 = <input type="button" /> */
		formerly.initElement(this.field1);

		assertEquals("button", this.field1.type);
	},

	"test type should be submit for submit button": function() {
		/*:DOC field1 = <button type="submit" /> */
		formerly.initElement(this.field1);

		assertEquals("submit", this.field1.type);
	},

	"test type should be reset for reset button": function() {
		/*:DOC field1 = <button type="reset" /> */
		formerly.initElement(this.field1);

		assertEquals("reset", this.field1.type);
	},

	"test type should be button for button button": function() {
		/*:DOC field1 = <button type="button" /> */
		formerly.initElement(this.field1);

		assertEquals("button", this.field1.type);
	},

	"test type should be fieldset for fieldset": function() {
		/*:DOC field1 = <fieldset></fieldset> */
		formerly.initElement(this.field1);

		//assertEquals("fieldset", this.field1.type);
		// undefined in Safari 534.57.2 Mac OS and Opera 12.00 Mac OS
	},

	"test type should be keygen for keygen": function() {
		/*:DOC field1 = <keygen /> */
		formerly.initElement(this.field1);

		//assertEquals("keygen", this.field1.type);
		// 'select-one' in Firefox 12.0 Mac OS
	},

	"test type should be a mime-type for object": function() {
		/*:DOC field1 = <object type="application/x-shockwave-flash" /> */
		formerly.initElement(this.field1);

		assertEquals("application/x-shockwave-flash", this.field1.type);
	},

	"test type should be output for output": function() {
		/*:DOC field1 = <output /> */
		formerly.initElement(this.field1);

		//assertEquals("output", this.field1.type);
		// undefined in Opera 12.00 Mac OS
	},

	"test type should be select-one for select": function() {
		/*:DOC field1 = <select></select> */
		formerly.initElement(this.field1);

		assertEquals("select-one", this.field1.type);
	},

	"test type should be select-multiple for select multiple": function() {
		/*:DOC field1 = <select multiple="multiple"></select> */
		formerly.initElement(this.field1);

		assertEquals("select-multiple", this.field1.type);
	},

	"test type should be textarea for textarea": function() {
		/*:DOC field1 = <textarea></textarea> */
		formerly.initElement(this.field1);

		assertEquals("textarea", this.field1.type);
	}
	
});
	
TestCase("HTMLElementsMaxLength", {
	"test should have maxLength 20": function () {
		/*:DOC field1 = <input type="text" maxlength="20" /> */
		assertEquals(20, this.field1.maxLength);
	},

	"test should have no maxLength": function () {
		/*:DOC field1 = <input type="text" /> */
		//assertEquals(524288, this.field1.maxLength);
		// -1 in Firefox 12.0 Mac OS and Opera 12.00 Mac OS
	}

});

TestCase("HTMLElementsValidity", {
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
		this.field2.disabled = true;
		
		var ret = this.field2.checkValidity();
		
		assertValid(ret, this.field2, 'valueMissing');
	}

});


function listenForEvent (el, event, handler) {
	if (el.addEventListener) {
		el.addEventListener(event, handler, false);
	} else {
		el.attachEven('on' + event, handler);
	}
}
