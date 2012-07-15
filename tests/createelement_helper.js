function createElement(type, value, attrs, init) {
	var el = {};
	
	el.type = type;
	el.value = value || "";
	el.attributes = attrs || {};

	if (init === undefined || init) {
		formpoly.initElement(el);
	}

	return el;
}