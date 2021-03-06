TestCase("formerlyFormInit", sinon.testCase({

	setUp: function () {
		this.form1 = { addEventListener: sinon.stub() };
		this.textInput = createElement("text", "");
		this.numberInput = createElement("number", "");
		this.form1.elements = [ this.textInput, this.numberInput ];
		this.form1.length = this.form1.elements.length;
		this.form2 = { addEventListener: sinon.stub() };
		this.textInput2 = createElement("text", "");
		this.form2.elements = [ this.textInput2 ];
		this.form2.length = this.form2.elements.length;

		this.spy(formerly, "initElement");
	},
	
	"test should have getForms function": function () {
		assertFunction(formerly.getForms);
	},
	
	"test should return array of forms": function () {
		/*:DOC += 
			<div>
				<form id="form1"></form>
				<form id="form2"></form>
			</div>
		*/
		
		var forms = formerly.getForms();
		
		assertEquals(2, forms.length);
	},
	
	"test should init all elements in given form": function () {
		formerly.init(this.form1);
		
		assertCalledTwice(formerly.initElement);
		assertCalledWith(formerly.initElement, this.textInput);
		assertCalledWith(formerly.initElement, this.numberInput);
	},
	
	"test should init all elements in all forms": function () {
		this.stub(formerly, "getForms").returns([ this.form1, this.form2 ]);
	
		formerly.init();
		
		assertCalledThrice(formerly.initElement);
		assertCalledWith(formerly.initElement, this.textInput);
		assertCalledWith(formerly.initElement, this.numberInput);
		assertCalledWith(formerly.initElement, this.textInput2);
	}

}));

TestCase("formerlyFormConstraintInterface", sinon.testCase({

	setUp: function () {
		this.func = function () {};
		this.unsupForm = { addEventListener: sinon.stub(), attributes: {} };
		this.supForm = { checkValidity: this.func, addEventListener: sinon.stub(), attributes: {} };
	},
	
	makeFormValid: function (form) {
		form.elements = [
			createElement("text", ""),
			createElement("text", "")
		];
	},

	makeFormInvalid: function (form) {
		form.elements = [
			createElement("text", "", { required: "required" }),
			createElement("text", "")
		];
	},
	
	"test should set checkValidity function": function () {
		formerly.init(this.unsupForm);
		
		assertFunction(this.unsupForm.checkValidity);
	},
	
	"test should not set checkValidity function when existing": function () {
		formerly.init(this.supForm);
		
		assertSame(this.func, this.supForm.checkValidity);
	},
	
	"test should return true when all elements are valid": function () {
		this.makeFormValid(this.unsupForm);
		formerly.init(this.unsupForm);

		var ret = this.unsupForm.checkValidity();
		
		assertTrue(ret);
	},
	
	"test should return false when any element is invalid": function () {
		this.makeFormInvalid(this.unsupForm);
		formerly.init(this.unsupForm);

		var ret = this.unsupForm.checkValidity();
		
		assertFalse(ret);
	},
	
	"test should validate all elements": function () {
		this.makeFormInvalid(this.unsupForm);
		formerly.init(this.unsupForm);
		var spy1 = sinon.spy(this.unsupForm.elements[0], "checkValidity");
		var spy2 = sinon.spy(this.unsupForm.elements[1], "checkValidity");

		this.unsupForm.checkValidity();
		
		assertCalledOnce(spy1);
		assertCalledOnce(spy2);
	},
	
	"test should listen for submit event": function () {
		formerly.init(this.unsupForm);
		
		assertCalledOnce(this.unsupForm.addEventListener);
		assertEquals('submit', this.unsupForm.addEventListener.args[0][0]);
		assertFunction(this.unsupForm.addEventListener.args[0][1]);
		assertTrue(this.unsupForm.addEventListener.args[0][2]);
	},
	
	"test should not listen for submit event in supporting browsers": function () {
		formerly.init(this.supForm);
		
		assertNotCalled(this.supForm.addEventListener);
	},
	
	"test should prevent default on submit event for invalid form": function () {
		var event = { preventDefault: this.stub() };
		this.makeFormInvalid(this.unsupForm);
		formerly.init(this.unsupForm);
		
		var handler = this.unsupForm.addEventListener.args[0][1];
		handler.call(this.unsupForm, event);
		assertCalledOnce(event.preventDefault);
	},

	"test should set returnValue to false on submit event for invalid form": function () {
		var event = { returnValue: true };
		this.makeFormInvalid(this.unsupForm);
		formerly.init(this.unsupForm);
		
		var handler = this.unsupForm.addEventListener.args[0][1];
		handler.call(this.unsupForm, event);
		assertFalse(event.returnValue);
	},

	"test should return false from submit event for invalid form": function () {
		this.makeFormInvalid(this.unsupForm);
		formerly.init(this.unsupForm);
		
		var handler = this.unsupForm.addEventListener.args[0][1];
		var ret = handler.call(this.unsupForm, {});
		assertFalse(ret);
	},

	"test should not cancel submit event for valid form": function () {
		this.makeFormValid(this.unsupForm);
		formerly.init(this.unsupForm);
		
		var handler = this.unsupForm.addEventListener.args[0][1];
		var ret = handler.call(this.unsupForm, {});
		assertUndefined(ret);
	},

	"test should not cancel submit event for form with novalidate attribute": function () {
		this.makeFormInvalid(this.unsupForm);
		this.unsupForm.attributes.novalidate = "novalidate";
		formerly.init(this.unsupForm);
		
		var handler = this.unsupForm.addEventListener.args[0][1];
		var ret = handler.call(this.unsupForm, {});
		assertUndefined(ret);
	},

	"test should listen for submit event in older IE": function () {
		var ieForm = { attachEvent: sinon.stub() };

		formerly.init(ieForm);
		
		assertCalledOnce(ieForm.attachEvent);
		assertEquals('onsubmit', ieForm.attachEvent.args[0][0]);
		assertFunction(ieForm.attachEvent.args[0][1]);
	},

	"test should prevent default on submit event when not triggered on form": function () {
		var event = { preventDefault: this.stub() };
		this.makeFormInvalid(this.unsupForm);
		formerly.init(this.unsupForm);
		
		var handler = this.unsupForm.addEventListener.args[0][1];
		handler(event);
		assertCalledOnce(event.preventDefault);
	},

	"test should set isPolyfilling to true for unsupporting": function () {
		formerly.init(this.unsupForm);
		
		assertTrue(formerly.isPolyfilling);
	},
	
	"test should set isPolyfilling to false for supporting": function () {
		formerly.init(this.supForm);
		
		assertFalse(formerly.isPolyfilling);
	}


}));

// TODO: formnovalidate