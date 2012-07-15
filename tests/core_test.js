TestCase("formpoly", {
	
	"test object should exist": function () {
		assertObject(formpoly);
	},
	
	"test should have init function": function () {
		assertFunction(formpoly.init);
	},
	
	"test should have initElement function": function () {
		assertFunction(formpoly.initElement);
	}
	
});
