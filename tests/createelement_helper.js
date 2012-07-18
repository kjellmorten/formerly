function createElement(type, value, attrs, className, init, ie) {
	var el = {};
	
	el.type = type;
	el.value = el.defaultValue = value || "";
	el.attributes = createAttributes(attrs);
	el.attributes['type'] = { name: 'type', value: type };
	el.className = className || '';
	el.disabled = (el.attributes['disabled'] !== undefined);
	el.readOnly = (el.attributes['readonly'] !== undefined);
	el.maxLength = (el.attributes['maxlength'] !== undefined) ? parseInt(el.attributes['maxlength'].value) : 524288;
	
	if (ie !== true) {
		el.addEventListener = sinon.stub();
		el.dispatchEvent = sinon.stub();
	} else {
		el.attachEvent = sinon.stub();
		el.fireEvent = sinon.stub();
	}


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