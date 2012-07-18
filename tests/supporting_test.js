TestCase("formerlySupportingClasses", sinon.testCase({
	tearDown: function () {
		formerly.init(null, { touchSupporting: true });
	},

	createSupportingForm: function () {
		var form1 = { addEventListener: sinon.stub() };
		form1.elements = [ createElement("text", ""), createElement("number", "") ];
		form1.length = form1.elements.length;
		form1.checkValidity = function () {};
		this.spy(formerly, "initElement");
		return form1;
	},

	"test should init elements in supporting browser": function () {
		var form1 = this.createSupportingForm();
		
		formerly.init(form1);
		
		assertCalledTwice(formerly.initElement);
	},
	
	"test should not init elements when touchSupporting is false": function () {
		var form1 = this.createSupportingForm();
		
		formerly.init(form1, { touchSupporting: false });
		
		assertNotCalled(formerly.initElement);
	},

	"test should init elements when touchSupporting is not set": function () {
		var form1 = this.createSupportingForm();
		
		formerly.init(form1, {});
		
		assertCalledTwice(formerly.initElement);
	},

	"test should listen for keyup and change event on element": function () {
		var el = createElement("text", "", null, "", false, false);
		el.checkValidity = this.stub(); // Imitate supporting browser

		formerly.initElement(el);
		
		assertCalledThrice(el.addEventListener);
		assertCalledWith(el.addEventListener, "keyup");
		assertCalledWith(el.addEventListener, "change");
		assertCalledWith(el.addEventListener, "blur");
		assertFunction(el.addEventListener.args[0][1]);
		assertFunction(el.addEventListener.args[1][1]);
		assertFunction(el.addEventListener.args[2][1]);
		assertTrue(el.addEventListener.args[0][2]);
		assertTrue(el.addEventListener.args[1][2]);
		assertTrue(el.addEventListener.args[2][2]);
	},

	"test should not listen for keyup and change event when touchSupporting is false": function () {
		var form1 = this.createSupportingForm();
		var el = form1.elements[0];
		el.addEventListener = this.stub();
		formerly.init(form1, { touchSupporting: false });
		
		formerly.initElement(el);

		assertNotCalled(el.addEventListener);
	},
	
	"test should set valid class when element valid": function () {
		var el = createElement("text", "", null, "", false, false);
		el.checkValidity = this.stub(); // Imitate supporting browser
		el.validity = { valid: true };
		formerly.initElement(el);
		var event = { target: el };
		
		var handler = el.addEventListener.args[0][1];
		handler(event);
		
		assertEquals('valid', el.className);
	},

	"test should set invalid class when element invalid": function () {
		var el = createElement("text", "", { required: "required" }, "", false, false);
		el.checkValidity = this.stub(); // Imitate supporting browser
		el.validity = { valid: false };
		formerly.initElement(el);
		var event = { target: el };
		
		var handler = el.addEventListener.args[0][1];
		handler(event);
		
		assertEquals('invalid', el.className);
	}
	
}));