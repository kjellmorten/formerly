# Formerly. A small and simple HTML5 Form Polyfill

_Formerly_ implements the basics of [the W3C HTML5 constraint validation API](http://www.w3.org/TR/2011/WD-html5-20110525/association-of-controls-and-forms.html#the-constraint-validation-api) in unsupporting browsers, and that's it. There's no custom validations, fancy error messages, or elaborate input field widgets. The goal of _Formerly_ is to provide a baseline for all browsers so we can let the past be done. ;)

There are already a lot of form validators and also quite a few [HTML5 form polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills) out there. My motivation for building this was that I needed a simpler solution for getting just the basics of HTML5 validation working in older browsers.

_Formerly_ is completely stand-alone and does not depend on any third-party libraries.

The project is in an early state, and I really appreciate feedback. Please [log issues on GitHub](https://github.com/kjellmorten/formerly/issues).

## What's supported

The following constraints are implemented:

* required
* min
* max
* step
* pattern
* maxLength
* email
* url

Form elements get the following attributes and methods:

* willValidate
* setCustomValidity(message)
* validity.valueMissing
* validity.typeMismatch
* validity.patternMismatch
* validity.tooLong
* validity.rangeUnderflow
* validity.rangeOverflow
* validity.stepMismatch
* validity.customError
* validity.valid
* checkValidity()
* validationMessage

Please see [the W3C specification](http://www.w3.org/TR/2011/WD-html5-20110525/association-of-controls-and-forms.html#the-constraint-validation-api) for further details.

> **Note:** _Formerly_ does not yet provide validation messages, except when it's set with `setCustomValidity`. Coming soon...

### Validity classes

Supporting browsers set the `:valid` and `:invalid` pseudo-classes on form elements to indicate their validity status. As this can't be done with JavaScript, _Formerly_ will set class names on the form elements to replicate this behavior, both in supporting and unsupporting browsers. (You may disabled this in supporting browsers by setting the `touchSupporting` config property to `false`.) The classes have no default styles.

The default validity class names are `valid` for valid elements and `invalid` for invalid elements, and may be overriden with the `validClass` and `invalidClass` config properties.

### Statical and interactive validation

_Formerly_ will only [statically validate the constraints](http://www.w3.org/TR/2011/WD-html5-20110525/association-of-controls-and-forms.html#statically-validate-the-constraints) of a form, as it runs the validations and sets the validity states, but nothing is displayed in the browser by default. The HTML5 Form spec loosly describes steps for [interactivly validating the constraints](http://www.w3.org/TR/2011/WD-html5-20110525/association-of-controls-and-forms.html#interactively-validate-the-constraints), that involves reporting validation errors to the user, but I've decided to not include this in _Formerly_. At least for now.

### Events

An event named `invalid` will be triggered for invalid elements on form submission or when `checkValidity` is called directly.

> Note: To catch this event in Internet Explorer 8 and older, make sure to use the `attachElement` method on the relevant form elements. Other ways of attaching event handlers will not catch the `invalid` event.

## Usage

Include the script:

	<script src="formerly.js" type="text/javascript"></script>

...and run _Formerly_'s `init` method when the page DOM is loaded, to polyfill all forms on the page:

	window.onload = function () {
		formerly.init();
	}

> Actually, you may rather want to run `formerly.init` in the document ready event when using [jQuery](http://www.jquery.com/), [MooTools](http://mootools.net/), etc.
	
To polyfill only a specific form:

	formerly.init(document.getElementById("theForm"));

When _Formerly_ is running in an unsupporting browser, `formerly.isPolyfilling` will be `true`.

## Configuration

The `formerly.init` method accepts a configuration object as its second parameter. The following config properties are available:

* `touchSupporting`: Set to `true` to apply some fixes even to browsers supporting the HTML5 Form constraint validation API. `false` will make _Formerly_ keep its hands off supporting browsers completely. Default is `true`.
* `validClass`: The class name to use for valid form elements. Default is `"valid"`.
* `invalidClass`: The class name to use for invalid form elements. Default is `"invalid"`.

### Configuration example

	formerly.init(null, {
		touchSupporting: false,
		validClass: "okay",
		invalidClass: "fail"
	});

## Demo

Open `demo/index.html` in your browser for a simple demo of the implemented constraints.
