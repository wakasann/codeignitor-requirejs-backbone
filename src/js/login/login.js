var Login = function() {
    var e = function() {
        $(".login-form").validate({
            errorElement: "span",
            errorClass: "help-block",
            focusInvalid: !1,
            rules: {
                username: {
                    required: !0
                },
                password: {
                    required: !0
                },
                remember: {
                    required: !1
                }
            },
            messages: {
                username: {
                    required: "Username is required."
                },
                password: {
                    required: "Password is required."
                }
            },
            invalidHandler: function(e, r) {
                $(".alert-danger", $(".login-form")).show()
            },
            highlight: function(e) {
                $(e).closest(".form-group").addClass("has-error")
            },
            success: function(e) {
                e.closest(".form-group").removeClass("has-error"),
                e.remove()
            },
            errorPlacement: function(e, r) {
                e.insertAfter(r.closest(".input-icon"))
            },
            submitHandler: function(e) {
                e.submit()
            }
        }),
        $(".login-form input").keypress(function(e) {
            return 13 == e.which ? ($(".login-form").validate().form() && $(".login-form").submit(),
            !1) : void 0
        })
    }
      , r = function() {
        $(".forget-form").validate({
            errorElement: "span",
            errorClass: "help-block",
            focusInvalid: !1,
            ignore: "",
            rules: {
                email: {
                    required: !0,
                    email: !0
                }
            },
            messages: {
                email: {
                    required: "Email is required."
                }
            },
            invalidHandler: function(e, r) {},
            highlight: function(e) {
                $(e).closest(".form-group").addClass("has-error")
            },
            success: function(e) {
                e.closest(".form-group").removeClass("has-error"),
                e.remove()
            },
            errorPlacement: function(e, r) {
                e.insertAfter(r.closest(".input-icon"))
            },
            submitHandler: function(e) {
                e.submit()
            }
        }),
        $(".forget-form input").keypress(function(e) {
            return 13 == e.which ? ($(".forget-form").validate().form() && $(".forget-form").submit(),
            !1) : void 0
        }),
        jQuery("#forget-password").click(function() {
            jQuery(".login-form").hide(),
            jQuery(".forget-form").show()
        }),
        jQuery("#back-btn").click(function() {
            jQuery(".login-form").show(),
            jQuery(".forget-form").hide()
        })
    }
      , i = function() {
        function e(e) {
            if (!e.id)
                return e.text;
            var r = $('<span><img src="../assets/global/img/flags/' + e.element.value.toLowerCase() + '.png" class="img-flag" /> ' + e.text + "</span>");
            return r
        }
        jQuery().select2 && $("#country_list").size() > 0 && ($("#country_list").select2({
            placeholder: '<i class="fa fa-map-marker"></i>&nbsp;Select a Country',
            templateResult: e,
            templateSelection: e,
            width: "auto",
            escapeMarkup: function(e) {
                return e
            }
        }),
        $("#country_list").change(function() {
            $(".register-form").validate().element($(this))
        })),
        $(".register-form").validate({
            errorElement: "span",
            errorClass: "help-block",
            focusInvalid: !1,
            ignore: "",
            rules: {
                fullname: {
                    required: !0
                },
                email: {
                    required: !0,
                    email: !0
                },
                address: {
                    required: !0
                },
                city: {
                    required: !0
                },
                country: {
                    required: !0
                },
                username: {
                    required: !0
                },
                password: {
                    required: !0
                },
                rpassword: {
                    equalTo: "#register_password"
                },
                tnc: {
                    required: !0
                }
            },
            messages: {
                tnc: {
                    required: "Please accept TNC first."
                }
            },
            invalidHandler: function(e, r) {},
            highlight: function(e) {
                $(e).closest(".form-group").addClass("has-error")
            },
            success: function(e) {
                e.closest(".form-group").removeClass("has-error"),
                e.remove()
            },
            errorPlacement: function(e, r) {
                "tnc" == r.attr("name") ? e.insertAfter($("#register_tnc_error")) : 1 === r.closest(".input-icon").size() ? e.insertAfter(r.closest(".input-icon")) : e.insertAfter(r)
            },
            submitHandler: function(e) {
                e[0].submit()
            }
        }),
        $(".register-form input").keypress(function(e) {
            return 13 == e.which ? ($(".register-form").validate().form() && $(".register-form").submit(),
            !1) : void 0
        }),
        jQuery("#register-btn").click(function() {
            jQuery(".login-form").hide(),
            jQuery(".register-form").show()
        }),
        jQuery("#register-back-btn").click(function() {
            jQuery(".login-form").show(),
            jQuery(".register-form").hide()
        })
    }
    ;
    return {
        init: function() {
            e(),
            r(),
            i()
        }
    }
}();
jQuery(document).ready(function() {
    Login.init()
});
