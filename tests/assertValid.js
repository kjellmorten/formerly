function assertInvalid (ret, el, validityState) {
	assertFalse("Return value", ret);
	assertTrue("validity." + validityState, el.validity[validityState]);
	assertFalse("validity.valid", el.validity.valid);
}

function assertValid (ret, el, validityState) {
	assertTrue("Return value", ret);
	assertFalse("validity." + validityState, el.validity[validityState]);
	assertTrue("validity.valid", el.validity.valid);
}
