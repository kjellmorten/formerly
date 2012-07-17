function createElement(type, value, attrs, className, init) {
	var el = {};
	
	el.type = type;
	el.value = value || "";
	el.attributes = attrs || {};
	el.className = className || '';
	el.dispatchEvent = sinon.stub();
	el.disabled = (el.attributes['disabled'] !== undefined);
	el.readOnly = (el.attributes['readonly'] !== undefined);
	el.maxLength = (el.attributes['maxlength'] !== undefined) ? parseInt(el.attributes['maxlength']) : 524288;


	if (init === undefined || init) {
		formerly.initElement(el);
	}

	return el;
}