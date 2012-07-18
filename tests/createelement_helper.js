function createElement(type, value, attrs, className, init, ie) {
	var unknownTypes = "search tel url email datetime date month week time datetime-local number range color".split(" ");

	var el = {};
	el.type = (unknownTypes.indexOf(type) !== -1) ? 'text' : type;		// To show that type can't be trusted for certain types
	el.value = el.defaultValue = value || "";
	el.attributes = createAttributes(attrs);
	el.attributes['type'] = { name: 'type', value: el.type };
	el.className = className || '';
	el.disabled = (el.attributes['disabled'] !== undefined);
	el.readOnly = (el.attributes['readonly'] !== undefined);
	el.maxLength = (el.attributes['maxlength'] !== undefined) ? parseInt(el.attributes['maxlength'].value) : 524288;
	
	el.getAttribute = function (attr) {
		return (attr === 'type') ? type : (el.attributes[attr]) ? el.attributes[attr].value : null;
	}
	
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