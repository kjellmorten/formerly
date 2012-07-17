function createElement(type, value, attrs, className, init) {
	var el = {};
	
	el.type = type;
	el.value = value || "";
	el.attributes = createAttributes(attrs);
	el.className = className || '';
	el.dispatchEvent = sinon.stub();
	el.disabled = (el.attributes['disabled'] !== undefined);
	el.readOnly = (el.attributes['readonly'] !== undefined);
	el.maxLength = (el.attributes['maxlength'] !== undefined) ? parseInt(el.attributes['maxlength'].value) : 524288;


	if (init === undefined || init) {
		formerly.initElement(el);
	}

	return el;
}

function createAttributes (attrs) {
	var attr, value;
	
	if (attrs) {
		for (attr in attrs) {
			value = attrs[attr];
			attrs[attr] = { name: attr, value: value };
		}
	}
	
	return attrs || {};
}