TestCase("formerlySupportingClases", sinon.testCase({

	"test should init elements in supporting browser": function () {
		var form1 = { addEventListener: sinon.stub() };
		form1.elements = [ createElement("text", ""), createElement("number", "") ];
		form1.length = form1.elements.length;
		form1.checkValidity = function () {};
		this.spy(formerly, "initElement");
		
		formerly.init(form1);
		
		assertCalledTwice(formerly.initElement);
	},
		
	
	"test should listen for keyup and change event on element": function () {
		var el = createElement("text", "", null, "", false, false);
		el.checkValidity = sinon.stub(); // Imitate supporting browser

		formerly.initElement(el);
		
		assertCalledTwice(el.addEventListener);
		assertCalledWith(el.addEventListener, "keyup");
		assertCalledWith(el.addEventListener, "change");
		assertFunction(el.addEventListener.args[0][1]);
		assertFunction(el.addEventListener.args[1][1]);
		assertTrue(el.addEventListener.args[0][2]);
		assertTrue(el.addEventListener.args[1][2]);
	},
	
	"test should set valid class when element valid": function () {
		var el = createElement("text", "", null, "", false, false);
		el.checkValidity = sinon.stub(); // Imitate supporting browser
		el.validity = { valid: true };
		formerly.initElement(el);
		
		var handler = el.addEventListener.args[0][1];
		handler.call(el);
		
		assertEquals('valid', el.className);
	},

	"test should set invalid class when element invalid": function () {
		var el = createElement("text", "", { required: "required" }, "", false, false);
		el.checkValidity = sinon.stub(); // Imitate supporting browser
		el.validity = { valid: false };
		formerly.initElement(el);
		
		var handler = el.addEventListener.args[0][1];
		handler.call(el);
		
		assertEquals('invalid', el.className);
	}
	
}));