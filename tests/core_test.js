TestCase("h5formPoly", {
	
	"test object should exist": function () {
		assertObject(h5formPoly);
	},
	
	"test should have init function": function () {
		assertFunction(h5formPoly.init);
	},
	
	"test should have initElement function": function () {
		assertFunction(h5formPoly.initElement);
	}
	
});
