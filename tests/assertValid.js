function assertInvalid (ret, el, validityState) {
	assertTrue("validity." + validityState, el.validity[validityState]);
	assertFalse("validity.valid", el.validity.valid);
	assertFalse("Return value", ret);
}

function assertValid (ret, el, validityState) {
	assertFalse("validity." + validityState, el.validity[validityState]);
	assertTrue("validity.valid", el.validity.valid);
	assertTrue("Return value", ret);
}
