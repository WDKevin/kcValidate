/*!
 * kcValidate .04a
 *
 * http://www.kevinacrider.com/code/kcvalidate/
 *
 * Copyright 2013 Kevin A Crider
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

 (function($){
  $(document).ready(function() {
    // Numeric formatting - Do not allow characters other than 0-9 and navigational keys to be used
    $('[data-kcv-number], [data-kcv-phone], [data-kcv-phone-ext], [data-kcv-credit-card], [data-kcv-ssn], [data-kcv-tax-id], [data-kcv-min-value], [data-kcv-max-value], [data-kcv-ssn]').on('keydown', function(e) {
      key = e.charCode || e.keyCode || 0; 
      // Numbers 0-9 (including NumLock) 
      numbers = new Array(57,56,55,54,53,52,51,50,49,48,96,97,98,99,100,101,102,103,104,105); 
      // Navigation keys: Left Arrow, Right Arrow, Home, End, Delete, Backspace, Tab 
      navigation = new Array(37,39,36,35,46,8,9); 
      if (jQuery.inArray(key, numbers) > -1 || jQuery.inArray(key, navigation) > -1) {
        return true; 
      }
      return false;
    });

    $('[data-kcv-phone]').on('keyup', function(e) {
      if (e.which != 8 && e.which != 46) {
        // US Format
        if ($(this).data('kcv-phone') == 'US') {
          if ($(this).val().length == 4) {
            $(this).val('(' + $(this).val().substr(0,3) + ') ' + $(this).val().substr(3,1));
          } else if (this.value.length == 10) {
            $(this).val($(this).val().substr(0,9) + '-' + $(this).val().substr(9,1));
          }
          /*
          if ($(this).val().length == 3) {
            $(this).val('(' + $(this).val() + ') ');
          } else if (this.value.length == 9) {
            $(this).val($(this).val() + '-');
          }
          */
        } else if ($(this).data('kcv-phone') == 'UK') {
          if ($(this).val().length == 1) {
            $(this).val('+' + $(this).val());
          } else if (this.value.length == 3) {
            $(this).val($(this).val() + ' ');
          }
        }
      }
    });
    
    $('[data-kcv-phone-ext]').on('keyup', function(e) {
      if (e.which != 8 && e.which != 46) {
        if ($(this).data('kcv-phone-ext') == 'US') {
          if ($(this).val().length == 4) {
            $(this).val('(' + $(this).val().substr(0,3) + ') ' + $(this).val().substr(3,1));
          } else if (this.value.length == 10) {
            $(this).val($(this).val().substr(0,9) + '-' + $(this).val().substr(9,1));
          } else if (this.value.length == 14) {
            $(this).val($(this).val() + ' x');
          }
        }
      }
    });  
    
    $('[data-kcv-ssn]').on('keyup', function(e) {
      if (e.which != 8 && e.which != 46) {
        if ($(this).val().length == 3) {
          $(this).val($(this).val() + '-');
        } else if (this.value.length == 6) {
          $(this).val($(this).val() + '-');
        }
      }
    });  
    
    $('[data-kcv-tax-id]').on('keyup', function(e) {
      if (e.which != 8 && e.which != 46) {
        if ($(this).val().length == 2) {
          $(this).val($(this).val() + '-');
        }
      }
    });
  });
  
  // Validation function
  $.fn.kcValidate = function(options) {
    var settings = $.extend( {
      'class': 'kcv-failed',
      'email_pattern': /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i
      //'url_pattern': /_^(?:(?:https?|ftp)://)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}-\x{ffff}0-9]+-?)*[a-z\x{00a1}-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$_iuS/
    }, options);
    
    return this.each(function() {

      
      /*!
       * Insant Validation Methods
       */
      $('*[data-kcv-instant=true]').blur(function() {
        e = this;

        // Required Fields
        if ($(e).data('kcv-required') && $(e).val().length == 0) {
          trigger_fail(settings, e);
        } else if ($(e).data('kcv-required') && $(e).hasClass(settings.class)) {
          trigger_pass(settings, e);
        }
      
        // Minimum Value
        if ($(e).data('kcv-min-value') > 0 && $(e).val() < parseInt($(e).data('kcv-min-value')) && $(e).val().length > 0) {
          trigger_fail(settings, e);
        } else if ($(e).data('kcv-min-value') && $(e).hasClass(settings.class)) {
          trigger_pass(settings, e);
        }
        
        // Maximum Value
        if ($(e).data('kcv-max-value') > 0 && $(e).val() > parseInt($(e).data('kcv-max-value')) && $(e).val().length > 0) {
          trigger_fail(settings, e);
        } else if ($(e).data('kcv-max-value') && $(e).hasClass(settings.class)) {
          trigger_pass(settings, e);
        }

        // Minimum Length
        if ($(e).data('kcv-min-length') > 0 && $(e).val().length < $(e).data('kcv-min-length') && $(e).val().length > 0) {
          trigger_fail(settings, e);
        } else if ($(e).data('kcv-min-length') && $(e).hasClass(settings.class)) {
          trigger_pass(settings, e);
        }

        // Maximum Length
        if ($(e).data('kcv-max-length') > 0 && $(e).val().length > $(e).data('kcv-max-length')) {
          trigger_fail(settings, e);
        } else if ($(e).data('kcv-max-length') && $(e).hasClass(settings.class)) {
          trigger_pass(settings, e);
        }

        // Password Confirm
        if ($(e).data('kcv-password-confirm') && $(e).val() != $(e).parents().find('[data-kcv-password]').val()) {
          $(e).parents().find('[data-kcv-password-confirm]').addClass(settings.class).parents().find('label[for='+$(e).attr('id')+']').addClass(settings.class);
        } else if ($(e).data('kcv-password-confirm') && $(e).hasClass(settings.class)) {
          trigger_pass(settings, e);
        }

        // Email Address
        if ($(e).data('kcv-email') && !settings.email_pattern.test($(e).val()) && $(e).val().length > 0) {
          trigger_fail(settings, e);
        } else if ($(e).data('kcv-email') && $(e).hasClass(settings.class)) {
          trigger_pass(settings, e);
        }

        // Website URL - INCOMPLETE
        if ($(e).data('kcv-url') && $(e).val().length > 0 && !url_pattern.test($(e).val())) {
          trigger_fail(settings, e);
        } else if ($(e).data('kcv-url') && $(e).hasClass(settings.class)) {
          trigger_pass(settings, e);
        }

        // Credit Card - LUHN Algorithm
        if ($(e).data('kcv-credit-card') && $(e).val().length > 0) {
          switch($(e).val().substr(0,1)) {
            case '3':
              pattern = /^3\d{3}[ \-]?\d{6}[ \-]?\d{5}$/;
              break;
            case '4':
              pattern = /^4\d{3}[ \-]?\d{4}[ \-]?\d{4}[ \-]?\d{4}$/;
              break;
            case '5':
              pattern = /^5\d{3}[ \-]?\d{4}[ \-]?\d{4}[ \-]?\d{4}$/;
              break;
            case '6':
              pattern = /^6011[ \-]?\d{4}[ \-]?\d{4}[ \-]?\d{4}$/;
              break;
            default:
              pattern = 0;
              trigger_fail(settings, e);
          }
          if (pattern != 0) {
            if (!pattern.test($(e).val())) {
              trigger_fail(settings, e);
            }
            card_number = $(e).val().replace(/-/g, '').replace(/ /g, '');
            for (var i = card_number.length - 1, sum = 0, digit; i >= 0; i -= 1) {
              digit = parseInt(card_number[i], 10);
              sum += (i % 2 === 0) ? eval(String(digit * 2).split('').join('+')) : digit;
            }
            if (!((sum % 10) === 0)) {
              trigger_fail(settings, e);
            } else if ($(e).data('kcv-credit-card') && $(e).hasClass(settings.class)) {
              trigger_pass(settings, e);
            }
          }
        }

        // Zip Code
        if ($(e).data('kcv-zip-code') != null && $(e).val().length > 0) {
          switch($(e).data('kcv-zip-code')) {
            case 'US':
              zip_pattern = /^\d{5}([\-]?\d{4})?$/;
              break;
            case 'UK':
              zip_pattern = /^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$/;
              break;
            case 'DE':
              zip_pattern = /\b((?:0[1-46-9]\d{3})|(?:[1-357-9]\d{4})|(?:[4][0-24-9]\d{3})|(?:[6][013-9]\d{3}))\b/;
              break;
            case 'CA':
              zip_pattern = /^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ])\ {0,1}(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$/;
              break;
            case 'FR':
              zip_pattern = /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/;
              break;
            case 'IT':
              zip_pattern = /^(V-|I-)?[0-9]{5}$/;
              break;
            case 'AU':
              zip_pattern = /^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/;
              break;
            case 'NL':
              zip_pattern = /^[1-9][0-9]{3}\s?([a-zA-Z]{2})?$/;
              break;
            case 'ES':
              zip_pattern = /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/;
              break;
            case 'DK':
              zip_pattern = /^([D-d][K-k])?( |-)?[1-9]{1}[0-9]{3}$/;
              break;
            case 'SE':
              zip_pattern = /^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/;
              break;
            case 'BE':
              zip_pattern = /^[1-9]{1}[0-9]{3}$/;
              break;
            default:
              trigger_fail(settings, e);
          }
          if (!zip_pattern.test($(e).val())) {
            trigger_fail(settings, e);
          } else if ($(e).data('kcv-zip-code') && $(e).hasClass(settings.class)) {
            trigger_pass(settings, e);
          }
        }
      });
      
      
      /*!
       * Form Submission Validation Methods
       */
      $(this).submit(function(form) {
        first_failed_element = '';
        
        // Remove left over failed classes when revalidating a form
        $('body').find('*').removeClass(settings.class);
        
        $(this).find('input,textarea,select').each(function(counter, e) {
          // Required Fields
          if ($(e).data('kcv-required') && $(e).val().length == 0) {
            if (first_failed_element == '') {first_failed_element = $(e);}
            trigger_fail(settings, e, form);
          } else if ($(e).data('kcv-required')) {
            // Radio Buttons - No instant validation for radio buttons yet. Only needed to remove classes when clicked if it already failed.
            name = $(e).attr('name');
            checked = false;
            $.each($('input[name="'+name+'"]'), function() {
              if ($(this).attr('checked') == 'checked') {
                checked = true;
              }
            })
            if (!checked) {
              trigger_fail(settings, e, form);
            }
          }
          
          // Minimum Value
          if ($(e).data('kcv-min-value') > 0 && $(e).val() < parseInt($(e).data('kcv-min-value')) && $(e).val().length > 0) {
            if (first_failed_element == '') {first_failed_element = $(e);}
            trigger_fail(settings, e, form);
          }
          
          // Maximum Value
          if ($(e).data('kcv-max-value') > 0 && $(e).val() > parseInt($(e).data('kcv-max-value')) && $(e).val().length > 0) {
            if (first_failed_element == '') {first_failed_element = $(e);}
            trigger_fail(settings, e, form);
          }

          // Minimum Length
          if ($(e).data('kcv-min-length') > 0 && $(e).val().length < $(e).data('kcv-min-length') && $(e).val().length > 0) {
            if (first_failed_element == '') {first_failed_element = $(e);}
            trigger_fail(settings, e, form);
          }

          // Maximum Length
          if ($(e).data('kcv-max-length') > 0 && $(e).val().length > $(e).data('kcv-max-length')) {
            if (first_failed_element == '') {first_failed_element = $(e);}
            trigger_fail(settings, e, form);
          }

          // Password Confirm
          if ($(e).data('kcv-password-confirm') && $(e).val() != $(e).parents().find('[data-kcv-password]').val()) {
            if (first_failed_element == '') {first_failed_element = $(e);}
            $(e).parents().find('[data-kcv-password-confirm]').addClass(settings.class).parents().find('label[for='+$(e).attr('id')+']').addClass(settings.class);
          }
          
          // Email Address
          if ($(e).data('kcv-email') && !settings.email_pattern.test($(e).val()) && $(e).val().length > 0) {
            if (first_failed_element == '') {first_failed_element = $(e);}
            trigger_fail(settings, e, form);
          }
          
          // Website URL - INCOMPLETE
          if ($(e).data('kcv-url') && $(e).val().length > 0 && !url_pattern.test($(e).val())) {
            if (first_failed_element == '') {first_failed_element = $(e);}
            trigger_fail(settings, e, form);
          }

          // Credit Card - LUHN Algorithm
          if ($(e).data('kcv-credit-card') && $(e).val().length > 0) {
            switch($(e).val().substr(0,1)) {
              case '3':
                pattern = /^3\d{3}[ \-]?\d{6}[ \-]?\d{5}$/;
                break;
              case '4':
                pattern = /^4\d{3}[ \-]?\d{4}[ \-]?\d{4}[ \-]?\d{4}$/;
                break;
              case '5':
                pattern = /^5\d{3}[ \-]?\d{4}[ \-]?\d{4}[ \-]?\d{4}$/;
                break;
              case '6':
                pattern = /^6011[ \-]?\d{4}[ \-]?\d{4}[ \-]?\d{4}$/;
                break;
              default:
                pattern = 0;
                if (first_failed_element == '') {first_failed_element = $(e);}
                trigger_fail(settings, e, form);
            }
            if (pattern != 0) {
              if (!pattern.test($(e).val())) {
                if (first_failed_element == '') {first_failed_element = $(e);}
                trigger_fail(settings, e, form);
              }
              card_number = $(e).val().replace(/-/g, '').replace(/ /g, '');
              for (var i = card_number.length - 1, sum = 0, digit; i >= 0; i -= 1) {
                digit = parseInt(card_number[i], 10);
                sum += (i % 2 === 0) ? eval(String(digit * 2).split('').join('+')) : digit;
              }
              if (!((sum % 10) === 0)) {
                if (first_failed_element == '') {first_failed_element = $(e);}
                trigger_fail(settings, e, form);
              }
            }
          }
          
          // Zip Code
          if ($(e).data('kcv-zip-code') != null && $(e).val().length > 0) {
            switch($(e).data('kcv-zip-code')) {
              case 'US':
                zip_pattern = /^\d{5}([\-]?\d{4})?$/;
                break;
              case 'UK':
                zip_pattern = /^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$/;
                break;
              case 'DE':
                zip_pattern = /\b((?:0[1-46-9]\d{3})|(?:[1-357-9]\d{4})|(?:[4][0-24-9]\d{3})|(?:[6][013-9]\d{3}))\b/;
                break;
              case 'CA':
                zip_pattern = /^([ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ])\ {0,1}(\d[ABCEGHJKLMNPRSTVWXYZ]\d)$/;
                break;
              case 'FR':
                zip_pattern = /^(F-)?((2[A|B])|[0-9]{2})[0-9]{3}$/;
                break;
              case 'IT':
                zip_pattern = /^(V-|I-)?[0-9]{5}$/;
                break;
              case 'AU':
                zip_pattern = /^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/;
                break;
              case 'NL':
                zip_pattern = /^[1-9][0-9]{3}\s?([a-zA-Z]{2})?$/;
                break;
              case 'ES':
                zip_pattern = /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/;
                break;
              case 'DK':
                zip_pattern = /^([D-d][K-k])?( |-)?[1-9]{1}[0-9]{3}$/;
                break;
              case 'SE':
                zip_pattern = /^(s-|S-){0,1}[0-9]{3}\s?[0-9]{2}$/;
                break;
              case 'BE':
                zip_pattern = /^[1-9]{1}[0-9]{3}$/;
                break;
              default:
                if (first_failed_element == '') {first_failed_element = $(e);}
                trigger_fail(settings, e, form);
            }
            if (!zip_pattern.test($(e).val())) {
              if (first_failed_element == '') {first_failed_element = $(e);}
              trigger_fail(settings, e, form);
            }
          }
          
        });
        if (first_failed_element != '') {first_failed_element.focus();}
      });
      return true;
    });
    
  }
})(jQuery);



/*!
 * Function:  trigger_fail
 * Params:    settings (required)
 *            e (required)
 *            form (optional)
 *
 * This function is called when an element fails validation
 */
function trigger_fail(settings, e, form) {
  $(e).addClass(settings.class).parents().find('label[for='+$(e).attr('id')+']').addClass(settings.class);
  if (form) {
    form.preventDefault();
  }
}



/*!
 * Function:  trigger_pass
 * Params:    settings (required)
 *            e (required)
 *
 * This function gets called when an element passes validation
 */
function trigger_pass(settings, e) {
  $(e).removeClass(settings.class).parents().find('label[for='+$(e).attr('id')+']').removeClass(settings.class);
}