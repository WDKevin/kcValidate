# kcValidate
---
## About
kcValidate is designed to be the ultimate drop-in validation plugin for both new projects and existing ones. It is built on class-based identification methods and can be implemented into an existing project with hardly any changes to the code.

kcValidate came to existence while looking for a validation plugin to use on another project. Of all the possible solutions I found, none were perfect. Some were overly complicated, some too simple, and some just didn't work at all. So I built kcValidate.

kcValidate doesn't require you to add any additional elements to your page or modify your form in any way. It works by assigning data attributes to your existing input fields. In order to avoid collisions, all classes are prefixed with kcv.

In addition to performing validation on several types of data, kcValidate also perform auto-formatting on fields such as phone number and tax ID. For more information on this, please read over the usage section below.

kcValidate is currently under development and new validation methods are being added regularly. If you have a suggestion I would love to hear it. Drop me a line at root@kevinacrider.com and please check back regularly for updates!

## Examples
http://wdkevin.github.io/kcValidate/

## Usage
After including the .js file, you initialize kcValidate like so:

    $(document).ready(function() {
      $('form').kcValidate();
    });

In the example above we are going to validate every form on the page. You may replace 'form' with an ID or class to target different elements.

When a form is validated, any input that does not pass validation will be assigned the class 'kcv-failed' unless a class is passed in the settings object. This class is also applied to the parenting label of the input that failed to allow for additional styling.

If a form passes all the validation that's been assigned to it, it will process as it normally would.

# Validation Methods

+ **kcv-instant**

Any field that contains the data-kcv-instant attribute will be validated instantly when that field loses focus. All fields are stil validated when the form us submitted but this allows you tp specify specific fields to also be validated instantly.
    
    <input type="text" data-kcv-instant="true" />

+ **kcv-required**

These elements are required fields and cannot be left empty.

    <input type="text" data-kcv-required="true" />

+ **kcv-email**

The provided input must meet the email validation regular expression. An expression is provided by default but an alternative one may be supplied in the settings.

    <input type="text" data-kcv-email="true" />

+ **kcv-number**

This validation occurs as you type. Only numbers may be entered.

    <input type="text" data-kcv-number="true" />

+ **kcv-phone**

This field is auto-formatted as you type and only numbers may be entered. A country code is passed to determine the formatting.

    <input type="text" data-kcv-phone="US" />

Supported country codes: US, UK

+ **kcv-phone-ext**

This is the same as above except an extension may be entered as well.
    
    <input type="text" data-kcv-phone-ext="US" />

Supported country codes: US, UK

+ **kcv-min-value**


    <input type="text" data-kcv-min-value="25" />

+ **kcv-max-value**


    <input type="text" data-kcv-max-value="25" />

+ **kcv-min-length**


    <input type="text" data-kcv-min-length="5" />

+ **kcv-max-length**


    <input type="text" data-kcv-max-length="40" />

+ **kcv-password** and **kcv-password-confirm**


    <input type="password" data-kcv-password="true" />
    <input type="password" data-kcv-password-confirm="true" />

+ **kcv-credit-card**


    <input type="text" data-kcv-credit-card="true" />

+ **kcv-ssn** and **kcv-tax-id**


    <input type="text" data-kcv-ssn="true" />
    <input type="text" data-kcv-tax-id="true" />

+ **kcv-zip-code**


    <input type="text" data-kcv-zip-code="US" />

Supported country codes: US, UK, DE, CA, FR, IT, AU, NL, ES, DK, SE, BE

# Options

+ **class**

You may override the default failure class of 'kcv-failed' by passing in your own here. This class is assigned to both the input and the cooresponding label when a validation method fails.

    $('form').kcValidate({
      'class': 'failed-class'
    });
    
+ **email_pattern**

kcValidate provides a standard email regular expression with which to validate against. If you find that this is not suitable for you, an alternative pattern may be provided through this option.

    $('form').kcValidate({
      'email_pattern': 'new_pattern_here'
    });

In order to increase compatibility and maintain the universal usage of the plugin, additional options are constantly being added. If you have a suggestion, I would love to hear it! Just drop me a line at root@kevinacrider.com.