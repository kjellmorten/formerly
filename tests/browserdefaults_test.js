TestCase("BrowserDefaults", {
	setUp: function () {
		/*:DOC += 
			<form>
				<input type="hidden" id="hiddenInput" />
				<input type="text" id="textInput" />
				<input type="search" id="searchInput" />
				<input type="tel" id="telInput" />
				<input type="url" id="urlInput" />
				<input type="email" id="emailInput" />
				<input type="password" id="passwordInput" />
				<input type="datetime" id="datetimeInput" />
				<input type="date" id="dateInput" />
				<input type="month" id="monthInput" />
				<input type="week" id="weekInput" />
				<input type="time" id="timeInput" />
				<input type="datetime-local" id="datetimeLocalInput" />
				<input type="number" id="numberInput" />
				<input type="range" id="rangeInput" />
				<input type="color" id="colorInput" />
				<input type="checkbox" id="checkboxInput" />
				<input type="radio" id="radioInput" />
				<input type="file" id="fileInput" />
				<input type="submit" id="submitInput" />
				<input type="image" id="imageInput" />
				<input type="reset" id="resetInput" />
				<input type="button" id="buttonInput" />
				<button type="submit" id="submitButton"></button>
				<button type="reset" id="resetButton"></button>
				<button type="button" id="buttonButton"></button>
				<fieldset id="fieldset"></fieldset>
				<keygen id="keygen" />
				<object id="object" type="application/x-shockwave-flash" />
				<output id="output" />
				<select id="select"></select>
				<select id="selectMulti" multiple="multiple"></select>
				<textarea id="textarea"></textarea>
			</form>
		*/

		this.hiddenInput = document.getElementById('hiddenInput');
		this.textInput = document.getElementById('textInput');
		this.searchInput = document.getElementById('searchInput');
		this.telInput = document.getElementById('telInput');
		this.urlInput = document.getElementById('urlInput');
		this.emailInput = document.getElementById('emailInput');
		this.passwordInput = document.getElementById('passwordInput');
		this.datetimeInput = document.getElementById('datetimeInput');
		this.dateInput = document.getElementById('dateInput');
		this.monthInput = document.getElementById('monthInput');
		this.weekInput = document.getElementById('weekInput');
		this.timeInput = document.getElementById('timeInput');
		this.datetimeLocalInput = document.getElementById('datetimeLocalInput');
		this.numberInput = document.getElementById('numberInput');
		this.rangeInput = document.getElementById('rangeInput');
		this.colorInput = document.getElementById('colorInput');
		this.checkboxInput = document.getElementById('checkboxInput');
		this.radioInput = document.getElementById('radioInput');
		this.fileInput = document.getElementById('fileInput');
		this.submitInput = document.getElementById('submitInput');
		this.imageInput = document.getElementById('imageInput');
		this.resetInput = document.getElementById('resetInput');
		this.buttonInput = document.getElementById('buttonInput');
		this.submitButton = document.getElementById('submitButton');
		this.resetButton = document.getElementById('resetButton');
		this.buttonButton = document.getElementById('buttonButton');
		this.fieldset = document.getElementById('fieldset');
		this.keygen = document.getElementById('keygen');
		this.object = document.getElementById('object');
		this.output = document.getElementById('output');
		this.select = document.getElementById('select');
		this.selectMulti = document.getElementById('selectMulti');
		this.textarea = document.getElementById('textarea');
	},

	"test should have expected willValidate values": function () {
		assertFalse("Hidden will validate", this.hiddenInput.willValidate);
		assertTrue("Text will validate", this.textInput.willValidate);
		assertTrue("Search will validate", this.searchInput.willValidate);
		assertTrue("Tel will validate", this.telInput.willValidate);
		assertTrue("Url will validate", this.urlInput.willValidate);
		assertTrue("Email will validate", this.emailInput.willValidate);
		assertTrue("Password will validate", this.passwordInput.willValidate);
		assertTrue("DateTime will validate", this.datetimeInput.willValidate);
		assertTrue("Date will validate", this.dateInput.willValidate);
		assertTrue("Month will validate", this.monthInput.willValidate);
		assertTrue("Week will validate", this.weekInput.willValidate);
		assertTrue("Time will validate", this.timeInput.willValidate);
		assertTrue("DateTime Local will validate", this.datetimeLocalInput.willValidate);
		assertTrue("Number will validate", this.numberInput.willValidate);
		assertTrue("Range will validate", this.rangeInput.willValidate);
		assertTrue("Color will validate", this.colorInput.willValidate);
		assertTrue("Checkbox will validate", this.checkboxInput.willValidate);
		assertTrue("Radio will validate", this.radioInput.willValidate);
		assertTrue("File will validate", this.fileInput.willValidate);
		//assertTrue("Submit will validate", this.submitInput.willValidate);					// False in Firefox 12.0 Mac OS
		//assertFalse("Image will validate", this.imageInput.willValidate);						// False in Opera 12.00 Mac OS
		assertFalse("Reset will validate", this.resetInput.willValidate);
		assertFalse("ButtonInput will validate", this.buttonInput.willValidate);
		//assertTrue("Submit button will validate", this.submitButton.willValidate);			// False in Firefox 12.0 Mac OS
		assertFalse("Reset button will validate", this.resetButton.willValidate);
		assertFalse("Button will validate", this.buttonButton.willValidate);
		assertFalse("Fieldset will validate", this.fieldset.willValidate);
		//assertFalse("Keygen will validate", this.keygen.willValidate);						// True in Firefox 12.0 Mac OS
		assertFalse("Object will validate", this.object.willValidate);
		//assertFalse("Output will validate", this.output.willValidate);						// True in Firefox 12.0 Mac OS
		assertTrue("Select will validate", this.select.willValidate);
		assertTrue("Select multiple will validate", this.selectMulti.willValidate);
		assertTrue("Textarea will validate", this.textarea.willValidate);
	},

	"test should have expected types": function () {
		assertEquals("Hidden type", "hidden", this.hiddenInput.type);
		assertEquals("Text type", "text", this.textInput.type);
		assertEquals("Search type", "search", this.searchInput.type);
		assertEquals("Tel type", "tel", this.telInput.type);
		assertEquals("Url type", "url", this.urlInput.type);
		assertEquals("Email type", "email", this.emailInput.type);
		assertEquals("Password type", "password", this.passwordInput.type);
		//assertEquals("DateTime type", "datetime", this.datetimeInput.type);					// 'text' in Firefox 12.0 Mac OS 
																								//		and Chrome 20.0.1132.57 Mac OS
		//assertEquals("Date type", "date", this.dateInput.type);								// 'text' in Firefox 12.0 Mac OS
		//assertEquals("Month type", "month", this.monthInput.type);							// 'text' in Firefox 12.0 Mac OS
																								//		and Chrome 20.0.1132.57 Mac OS
		//assertEquals("Week type", "week", this.weekInput.type);								// 'text' in Firefox 12.0 Mac OS
																									//		and Chrome 20.0.1132.57 Mac OS
		//assertEquals("Time type", "time", this.timeInput.type);								// 'text' in Firefox 12.0 Mac OS
																								//		and Chrome 20.0.1132.57 Mac OS
		//assertEquals("DateTime Local type", "datetime-local", this.datetimeLocalInput.type);	// 'text' in Firefox 12.0 Mac OS
																								//		and Chrome 20.0.1132.57 Mac OS
		//assertEquals("Number type", "number", this.numberInput.type);							// 'text' in Firefox 12.0 Mac OS
		//assertEquals("Range type", "range", this.rangeInput.type);							// 'text' in Firefox 12.0 Mac OS
		//assertEquals("Color type", "color", this.colorInput.type);							// 'text' in Firefox 12.0 Mac OS
		assertEquals("Checkbox type", "checkbox", this.checkboxInput.type);
		assertEquals("Radio type", "radio", this.radioInput.type);
		assertEquals("File type", "file", this.fileInput.type);
		assertEquals("Submit type", "submit", this.submitInput.type);
		assertEquals("Image type", "image", this.imageInput.type);
		assertEquals("Reset type", "reset", this.resetInput.type);
		assertEquals("ButtonInput type", "button", this.buttonInput.type);
		assertEquals("Submit button type", "submit", this.submitButton.type);
		assertEquals("Reset button type", "reset", this.resetButton.type);
		assertEquals("Button type", "button", this.buttonButton.type);
		//assertEquals("Fieldset type", "fieldset", this.fieldset.type);						// undefined in Safari 534.57.2 Mac OS and Opera 12.00 Mac OS
		//assertEquals("Keygen type", "keygen", this.keygen.type);								// 'select-one' in Firefox 12.0 Mac OS
		assertEquals("Object type", "application/x-shockwave-flash", this.object.type);
		//assertEquals("Output type", "output", this.output.type);								// undefined in Opera 12.00 Mac OS
		assertEquals("Select type", "select-one", this.select.type);
		assertEquals("Select multiple type", "select-multiple", this.selectMulti.type);
		assertEquals("Textarea type", "textarea", this.textarea.type);
	}
});