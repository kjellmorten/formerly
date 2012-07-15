function createElement(type, value, attrs, className, init) {
	var el = {};
	
	el.type = type;
	el.value = value || "";
	el.attributes = attrs || {};
	el.className = className || '';

	if (init === undefined || init) {
		formpoly.initElement(el);
	}

	return el;
}