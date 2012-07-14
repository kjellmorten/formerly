TestCase("BrowserDefaults", {
	"test should have expected willValidate values": function () {
		/*:DOC hiddenInput = <input type="hidden" /> */
		/*:DOC textInput = <input type="text" /> */
		/*:DOC searchInput = <input type="search" /> */
		/*:DOC telInput = <input type="tel" /> */
		/*:DOC urlInput = <input type="url" /> */
		/*:DOC emailInput = <input type="email" /> */
		/*:DOC passwordInput = <input type="password" /> */
		/*:DOC datetimeInput = <input type="datetime" /> */
		/*:DOC dateInput = <input type="date" /> */
		/*:DOC monthInput = <input type="month" /> */
		/*:DOC weekInput = <input type="week" /> */
		/*:DOC timeInput = <input type="time" /> */
		/*:DOC datetimeLocalInput = <input type="datetime-local" /> */
		/*:DOC numberInput = <input type="number" /> */
		/*:DOC rangeInput = <input type="range" /> */
		/*:DOC colorInput = <input type="color" /> */
		/*:DOC checkboxInput = <input type="checkbox" /> */
		/*:DOC radioInput = <input type="radio" /> */
		/*:DOC fileInput = <input type="file" /> */
		/*:DOC submitInput = <input type="submit" /> */
		/*:DOC imageInput = <input type="image" /> */
		/*:DOC resetInput = <input type="reset" /> */
		/*:DOC buttonInput = <input type="button" /> */
		/*:DOC submitButton = <button type="submit"></button> */
		/*:DOC resetButton = <button type="reset"></button> */
		/*:DOC buttonButton = <button type="button"></button> */
		/*:DOC fieldset = <fieldset></fieldset> */
		/*:DOC keygen = <keygen /> */
		/*:DOC object = <object /> */
		/*:DOC output = <output /> */
		/*:DOC select = <select></select> */
		/*:DOC selectMulti = <select multiple="multiple"></select> */
		/*:DOC textarea = <textarea></textarea> */

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
		assertTrue("Submit will validate", this.submitInput.willValidate);
		assertFalse("Image will validate", this.imageInput.willValidate);
		assertFalse("Reset will validate", this.resetInput.willValidate);
		assertFalse("ButtonInput will validate", this.buttonInput.willValidate);
		assertTrue("Submit button will validate", this.submitButton.willValidate);
		assertFalse("Reset button will validate", this.resetButton.willValidate);
		assertFalse("Button will validate", this.buttonButton.willValidate);
		assertFalse("Fieldset will validate", this.fieldset.willValidate);
		assertFalse("Keygen will validate", this.keygen.willValidate);
		assertFalse("Object will validate", this.object.willValidate);
		assertFalse("Output will validate", this.output.willValidate);
		assertTrue("Select will validate", this.select.willValidate);
		assertTrue("Select multiple will validate", this.selectMulti.willValidate);
		assertTrue("Textarea will validate", this.textarea.willValidate);
	}
});