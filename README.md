# formerly - a small and simple HTML5 Form Polyfill

_formerly_ implements the basics of [the W3C HTML5 constraint validation API](http://www.w3.org/TR/2011/WD-html5-20110525/association-of-controls-and-forms.html#the-constraint-validation-api) in unsupporting browsers, and that's it. There's no custom validations, fancy error messages, or elaborate input field widgets. The goal of _formerly_ is to provide a baseline for all browsers, so we can let the past be done. ;)

There are already a lot of form validators and also quite a few [HTML5 form polyfills](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills) out there. My motivation for building this was that I needed a simpler solution for getting just the basics of HTML5 validation working in older browsers.

_formerly_ is completely stand-alone and does not depend on any third-party libraries.

The project is in an early state, and I really appreciate feedback. Please [log issues on GitHub](https://github.com/kjellmorten/formerly/issues).

## What's supported

The following constraints are implemented:

* required
* min
* max
* step
* pattern
* maxLength
* email validation
* url validation

Form elements have the following attributes and methods:

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

> **Note:** _formerly_ does not provide validation messages yet, except when it's set with `setCustomValidity`. Coming soon...

Supporting browser set the pseudo-classes `:valid` and `:invalid` on form elements to indicate their validity status. As this can't be done with JavaScript, _formerly_ will set class names on the form elements to replicate this behavior. The classes are set in supporting browsers as well, but this feature may be disabled by setting the `touchSupporting` config property to `false`.

The default validity class names are `valid` for valid elements and `invalid` for invalid elements, and may be overriden with the `validClass` and `invalidClass` config properties.

At least for now, _formerly_ will only [statically validate the constraints](http://www.w3.org/TR/2011/WD-html5-20110525/association-of-controls-and-forms.html#statically-validate-the-constraints) of a form, by running the validations and setting the validity states. I've decided not to go into [the interactive validation](http://www.w3.org/TR/2011/WD-html5-20110525/association-of-controls-and-forms.html#interactively-validate-the-constraints) part, where validation problems are reported to the user. (Maybe I'll get back to it later.)

According to the W3C spec, an event named `invalid` should be fired for all invalid elements on constraint validation. _formerly_ currently does this in browser supporting the W3C event model. In other words, the `invalid` event is not fired in Internet Explorer as of now.

See the [W3C specification](http://www.w3.org/TR/2011/WD-html5-20110525/association-of-controls-and-forms.html#the-constraint-validation-api) for further details.

## Usage

Include the script:

	<script src="formerly.js" type="text/javascript"></script>

...and run _formerly_'s `init` method when the page DOM is loaded to polyfill all forms on the page:

	window.onload = function () {
		formerly.init();
	}

(Actually, you may rather want to run `formerly.init` in the document ready event when using [jQuery](http://www.jquery.com/), [MooTools](http://mootools.net/), etc.)
	
To polyfill only a specific form:

	formerly.init(document.getElementById("theForm"));

## Configuration

The `formerly.init` method accepts a configuration object as its second parameter. The following config properties are available:

* `touchSupporting`. Set to `true` (default) to apply some fixes even to browsers supporting the HTML5 Form constraint validation API. `false` will make _formerly_ keep its hands off supporting browsers completely.
* `validClass`. The class name to use for valid form elements. Default is `"valid"`.
* `invalidClass`. The class name to use for invalid form elements. Default is `"invalid"`.

### Configuration example

	formerly.init(null, {
		touchSupporting: false,
		validClass: "okay",
		invalidClass: "fail"
	});

## Demo

See `demo/index.html` for a simple demo of the implemented constraints.
