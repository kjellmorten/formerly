sinon.assert.expose(this, { includeFail: false });

TestCase("formerly", {
	
	"test object should exist": function () {
		assertObject(formerly);
	},
	
	"test should have init function": function () {
		assertFunction(formerly.init);
	},
	
	"test should have initElement function": function () {
		assertFunction(formerly.initElement);
	}
	
});
