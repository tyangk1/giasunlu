(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1
    });
    
})(jQuery);

function scrollTop(e) {
    $("html, body").animate({
        scrollTop: 0
    }, e)
}

function tutor_kind_change(e) {
    var t = e.value,
        e = $("#workplace_wrap");
    1 == t ? e.hide() : e.show(), $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "/myaccount/ajax/change_tutor_kind",
        method: "post",
        data: {
            id: t
        },
        success: function(e) {},
        error: function() {
            alert("Something went wrong!")
        }
    })
}

function apply_still_now() {
    $("#still_now").is(":checked") ? ($("#still_now_option_filed").hide(), $("#still_now_disabled_filed").show()) : ($("#still_now_option_filed").show(), $("#still_now_disabled_filed").hide())
}

function btn_need_confirm(e, t, n, r) {
    var i = $("#my_overlay"),
        r = {
            url: e,
            value: t,
            color: n,
            method: r
        };
    i.addClass("visible"), $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "/myaccount/ajax/action_ncf",
        method: "post",
        data: r,
        success: function(e) {
            i.append(e)
        },
        error: function() {
            alert("Something went wrong!")
        }
    })
}

function send_verify_email() {
    var t = $(".sending_email_notify"),
        e = $(".sending_email_countdown"),
        n = 10,
        r = setInterval(function() {
            n--, e.html(n), 0 == n && clearInterval(r)
        }, 1e3);
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "/myaccount/ajax/verify-email/send",
        method: "post",
        data: {},
        success: function(e) {
            setTimeout(function() {
                clearInterval(r), t.html(e)
            }, 3e3)
        },
        error: function() {
            t.html('<p class="text-danger">Đã xảy ra lỗi!</p>')
        }
    })
}

function resend_verify_email() {
    var e = $(".resend_active_first"),
        t = $(".resend_active_second");
    e.find(".need_remove").remove(), t.append('<p class="my-5">Đang gửi lại mã xác minh ... Vui lòng đợi.</p>'), $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "/myaccount/ajax/verify-email/resend",
        method: "post",
        data: {
            resend: 1
        },
        success: function(e) {
            t.html(e)
        },
        error: function() {
            alert("Something went wrong!")
        }
    })
}

function change_receive_sms() {
    var e = {
        receive_sms: $("#receive_sms").is(":checked") ? 1 : 0
    };
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "/myaccount/ajax/receive-sms",
        method: "post",
        data: e,
        success: function(e) {
            $("#receive_sms_result").html(e)
        },
        error: function() {
            alert("Something went wrong!")
        }
    })
}

function change_receive_email() {
    var e = {
        receive_email: $("#receive_email").is(":checked") ? 1 : 0
    };
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "/myaccount/ajax/receive-email",
        method: "post",
        data: e,
        success: function(e) {
            $("#receive_email_result").html(e)
        },
        error: function() {
            alert("Something went wrong!")
        }
    })
}

function upload_image(e) {
    $("#" + e).click()
}

function upload_image_action(e, t) {
    var n = new FormData,
        r = $("#" + t + "_notice"),
        i = $("#" + t + "_preview"),
        o = $("#" + t + "_btn");
    o.css("pointer-events", "none"), r.html("<span>Đang upload file ... Đợi 1-10 giây</span>"), o.addClass("uploading"), n.append("file", e.files[0]), n.append("_token", $('meta[name="csrf-token"]').attr("content")), n.append("type", t), $.ajax({
        url: "/myaccount/ajax/image/upload",
        data: n,
        type: "POST",
        contentType: !1,
        processData: !1,
        success: function(e) {
            e.fail ? r.html('<span class="text-danger">' + e.errors.file + "</span>") : (r.html(""), i.html(e)), o.removeClass("uploading"), o.css("pointer-events", "auto")
        },
        error: function() {
            r.html('<span class="text-danger">Đã xảy ra lỗi, vui lòng thử lại!</span>'), o.removeClass("uploading"), o.css("pointer-events", "auto")
        }
    })
}

function admin_upload_image(e) {
    $("#" + e).click()
}

function admin_upload_image_action(e, t, n) {
    var r = new FormData,
        i = $("#" + t + "_notice"),
        o = $("#" + t + "_preview"),
        a = $("#" + t + "_btn");
    a.css("pointer-events", "none"), i.html("<span>Đang upload file ... Đợi 1-10 giây</span>"), a.addClass("uploading"), r.append("file", e.files[0]), r.append("_token", $('meta[name="csrf-token"]').attr("content")), r.append("type", t), r.append("code", n), $.ajax({
        url: "/myaccount/ajax/admin-image/upload",
        data: r,
        type: "POST",
        contentType: !1,
        processData: !1,
        success: function(e) {
            e.fail ? i.html('<span class="text-danger">' + e.errors.file + "</span>") : (i.html(""), o.html(e)), a.removeClass("uploading"), a.css("pointer-events", "auto")
        },
        error: function() {
            i.html('<span class="text-danger">Đã xảy ra lỗi, vui lòng thử lại!</span>'), a.removeClass("uploading"), a.css("pointer-events", "auto")
        }
    })
}

function isElementInViewport(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : window,
        n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : document.documentElement,
        r = e.getBoundingClientRect();
    return 0 <= r.top && 0 <= r.left && r.bottom <= (t.innerHeight || n.clientHeight) && r.right <= (t.innerWidth || n.clientWidth)
}

function load_lazy_googlemap() {
    var e = $(".googlemap-lazy"),
        t = e.find(".loader-wrap"),
        n = e.find("iframe"),
        e = n.data("src");
    n.attr("src", e), setTimeout(function() {
        t.remove()
    }, 1e3)
}

function load_myclass_googlemap() {
    var e = $(".googlemap-myclass-wrap"),
        t = e.find(".loader-wrap"),
        n = e.find("iframe"),
        e = {
            address: n.data("address"),
            district: n.data("district"),
            province: n.data("province")
        };
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "/ajax/address-map",
        method: "post",
        data: e,
        success: function(e) {
            n.attr("src", e), setTimeout(function() {
                t.remove()
            }, 1e3)
        },
        error: function() {
            t.html("<span>Không load được bản đồ. Đã xảy ra lỗi!</span>")
        }
    })
}

function load_related_myclass(e, t) {
    var n = $(".related_myclass_field"),
        r = n.find(".related_myclass_btn"),
        t = {
            code: e,
            skip: t
        };
    r.find(".btn").remove(), r.find(".loader-wap").show(), $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "/ajax/related-myclass",
        method: "post",
        data: t,
        success: function(e) {
            r.remove(), n.append(e)
        },
        error: function() {
            r.html("<span>Đã xảy ra lỗi!</span>")
        }
    })
}

function load_multi_related(e, t) {
    var n = $(".multi_related_field"),
        r = n.find(".multi_related_btn"),
        t = {
            codes: e,
            skip: t
        };
    r.find(".btn").remove(), r.find(".loader-wap").show(), $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "/ajax/multi-related",
        method: "post",
        data: t,
        success: function(e) {
            r.remove(), n.append(e)
        },
        error: function() {
            r.html("<span>Đã xảy ra lỗi!</span>")
        }
    })
}

function toggle_tab(e, t) {
    $("." + e).hide(), $("." + e + "_" + t).show()
}

function toggle_input_typing(e, t) {
    e = $("input[name=" + e + "]").val().trim().length, t = $("." + t);
    0 < e ? t.show() : t.hide()
}

function toggle_textarea_typing(e, t) {
    e = $("textarea[name=" + e + "]").val().trim().length, t = $("." + t);
    0 < e ? t.show() : t.hide()
}

function toggle_input_checkbox(e, t) {
    e = $("input[name=" + e + "]"), t = $("#" + t);
    e.is(":checked") ? t.show() : t.hide()
}

function toggle_one_for_all(e) {
    $("." + e).show()
}

function test_update_answer(e, t) {
    var n = $("#test_wrap"),
        t = {
            item: e,
            id: t
        };
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "/ajax/test/answer",
        method: "post",
        data: t,
        success: function(e) {
            "" == e && n.html("<span>Đã xảy ra lỗi!</span>")
        },
        error: function() {
            n.html("<span>Đã xảy ra lỗi!</span>")
        }
    })
}

function test_countdown(t) {
    var n = $("#test_wrap"),
        r = n.find(".btn_test_next_step"),
        i = n.find("#test_showtime"),
        o = 180,
        a = setInterval(function() {
            var e = n.find('input[name="step"]').val();
            t != e && clearInterval(a), o--, i.html(o + "s"), o < 180 && r.removeClass("none-click"), o < 15 && (i.addClass("text-danger"), i.removeClass("text-success")), 0 == o && (clearInterval(a), n.find(".answers_field").addClass("none-click"))
        }, 1e3)
}

function test_next_step(e, t, n, r) {
    var i = $("#test_wrap"),
        e = {
            test: e,
            target: r
        };
    i.addClass("none-click"), $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "/ajax/test/next",
        method: "post",
        data: e,
        success: function(e) {
            if ("" == e) return i.html("<span>Đã xảy ra lỗi!</span>"), void i.removeClass("none-click");
            (-1 == e || n <= t) && "" != r ? $(location).attr("href", "/note/" + r + "?step=6") : (i.html(e), i.removeClass("none-click"), t < n && test_countdown(++t))
        },
        error: function() {
            i.html("<span>Đã xảy ra lỗi!</span>"), i.removeClass("none-click")
        }
    })
}

function victory_type_checked(e) {
    var t = $("input[name=victory_type][value=" + e + "]"),
        e = $("#choose_type_label").offset().top - 25;
    $("html, body").animate({
        scrollTop: e
    }, 200), t.trigger("click")
}

function score_typing_checker() {
    var e = 0,
        t = $("[name=check_score_int]"),
        n = t.val(),
        r = $("[name=check_score_length]"),
        i = r.val(),
        o = $("[name=check_score_max_length]"),
        a = o.val(),
        s = $("#score_checker_input").val().trim(),
        l = s.length;
    if (0 == l) return c.val(0), old_length.val(0), void o.val(0);
    a < l && o.val(l);
    var c, u = 0;
    score_N = s.replace(/\D/g, " "), score_N.split(" ").forEach(function(e) {
        e = e.replace(",", ".");
        e = parseInt(e);
        0 < e && (u += e)
    }), r.val(l), u != n && (t.val(u), 0 != i && i <= l && l <= a && 0 < u && (e = 1)), 0 != e && ((c = "") != (e = (a = $("[name=check_old_score]")).val()) && (c = e, a.val("")), c = {
        score: s,
        old_score: c
    }, $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "/myaccount/ajax/score/verify",
        method: "post",
        data: c,
        success: function(e) {},
        error: function() {}
    }))
}

function single_bean(e) {
    e = {
        code: e
    };
    $.ajax({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
        },
        url: "/ajax/single-bean",
        method: "post",
        data: e,
        success: function(e) {
            console.log(e)
        },
        error: function() {
            console.log("error")
        }
    })
}! function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document) throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(C, e) {
    "use strict";
    var t = [],
        T = C.document,
        n = Object.getPrototypeOf,
        s = t.slice,
        m = t.concat,
        l = t.push,
        i = t.indexOf,
        r = {},
        o = r.toString,
        h = r.hasOwnProperty,
        a = h.toString,
        c = a.call(Object),
        g = {};

    function v(e, t) {
        var n = (t = t || T).createElement("script");
        n.text = e, t.head.appendChild(n).parentNode.removeChild(n)
    }

    function u(e, t) {
        return t.toUpperCase()
    }
    var f = "3.2.1",
        k = function(e, t) {
            return new k.fn.init(e, t)
        },
        d = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        p = /^-ms-/,
        y = /-([a-z])/g;

    function x(e) {
        var t = !!e && "length" in e && e.length,
            n = k.type(e);
        return "function" !== n && !k.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }
    k.fn = k.prototype = {
        jquery: f,
        constructor: k,
        length: 0,
        toArray: function() {
            return s.call(this)
        },
        get: function(e) {
            return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            e = k.merge(this.constructor(), e);
            return e.prevObject = this, e
        },
        each: function(e) {
            return k.each(this, e)
        },
        map: function(n) {
            return this.pushStack(k.map(this, function(e, t) {
                return n.call(e, t, e)
            }))
        },
        slice: function() {
            return this.pushStack(s.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                e = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= e && e < t ? [this[e]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: l,
        sort: t.sort,
        splice: t.splice
    }, k.extend = k.fn.extend = function() {
        var e, t, n, r, i, o = arguments[0] || {},
            a = 1,
            s = arguments.length,
            l = !1;
        for ("boolean" == typeof o && (l = o, o = arguments[a] || {}, a++), "object" == typeof o || k.isFunction(o) || (o = {}), a === s && (o = this, a--); a < s; a++)
            if (null != (e = arguments[a]))
                for (t in e) i = o[t], n = e[t], o !== n && (l && n && (k.isPlainObject(n) || (r = Array.isArray(n))) ? (i = r ? (r = !1, i && Array.isArray(i) ? i : []) : i && k.isPlainObject(i) ? i : {}, o[t] = k.extend(l, i, n)) : void 0 !== n && (o[t] = n));
        return o
    }, k.extend({
        expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === k.type(e)
        },
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            var t = k.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
        },
        isPlainObject: function(e) {
            return !(!e || "[object Object]" !== o.call(e) || (e = n(e)) && ("function" != typeof(e = h.call(e, "constructor") && e.constructor) || a.call(e) !== c))
        },
        isEmptyObject: function(e) {
            for (var t in e) return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? r[o.call(e)] || "object" : typeof e
        },
        globalEval: function(e) {
            v(e)
        },
        camelCase: function(e) {
            return e.replace(p, "ms-").replace(y, u)
        },
        each: function(e, t) {
            var n, r = 0;
            if (x(e))
                for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++);
            else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r])) break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(d, "")
        },
        makeArray: function(e, t) {
            t = t || [];
            return null != e && (x(Object(e)) ? k.merge(t, "string" == typeof e ? [e] : e) : l.call(t, e)), t
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : i.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++) e[i++] = t[r];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) != a && r.push(e[i]);
            return r
        },
        map: function(e, t, n) {
            var r, i, o = 0,
                a = [];
            if (x(e))
                for (r = e.length; o < r; o++) null != (i = t(e[o], o, n)) && a.push(i);
            else
                for (o in e) i = t(e[o], o, n), null != i && a.push(i);
            return m.apply([], a)
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r;
            if ("string" == typeof t && (r = e[t], t = e, e = r), k.isFunction(e)) return n = s.call(arguments, 2), (r = function() {
                return e.apply(t || this, n.concat(s.call(arguments)))
            }).guid = e.guid = e.guid || k.guid++, r
        },
        now: Date.now,
        support: g
    }), "function" == typeof Symbol && (k.fn[Symbol.iterator] = t[Symbol.iterator]), k.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        r["[object " + t + "]"] = t.toLowerCase()
    });
    var b = function(n) {
        function f(e, t, n) {
            var r = "0x" + t - 65536;
            return r != r || n ? t : r < 0 ? String.fromCharCode(65536 + r) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
        }

        function r() {
            C()
        }
        var e, p, b, o, i, h, d, m, w, l, c, C, T, a, k, g, s, u, v, _ = "sizzle" + +new Date,
            y = n.document,
            $ = 0,
            x = 0,
            E = ae(),
            S = ae(),
            j = ae(),
            N = function(e, t) {
                return e === t && (c = !0), 0
            },
            D = {}.hasOwnProperty,
            t = [],
            A = t.pop,
            q = t.push,
            L = t.push,
            F = t.slice,
            O = function(e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t) return n;
                return -1
            },
            H = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            R = "[\\x20\\t\\r\\n\\f]",
            P = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            I = "\\[" + R + "*(" + P + ")(?:" + R + "*([*^$|!~]?=)" + R + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + P + "))|)" + R + "*\\]",
            M = ":(" + P + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + I + ")*)|.*)\\)|)",
            W = new RegExp(R + "+", "g"),
            B = new RegExp("^" + R + "+|((?:^|[^\\\\])(?:\\\\.)*)" + R + "+$", "g"),
            X = new RegExp("^" + R + "*," + R + "*"),
            z = new RegExp("^" + R + "*([>+~]|" + R + ")" + R + "*"),
            U = new RegExp("=" + R + "*([^\\]'\"]*?)" + R + "*\\]", "g"),
            K = new RegExp(M),
            V = new RegExp("^" + P + "$"),
            G = {
                ID: new RegExp("^#(" + P + ")"),
                CLASS: new RegExp("^\\.(" + P + ")"),
                TAG: new RegExp("^(" + P + "|[*])"),
                ATTR: new RegExp("^" + I),
                PSEUDO: new RegExp("^" + M),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + R + "*(even|odd|(([+-]|)(\\d*)n|)" + R + "*(?:([+-]|)" + R + "*(\\d+)|))" + R + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + H + ")$", "i"),
                needsContext: new RegExp("^" + R + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + R + "*((?:-\\d)?\\d*)" + R + "*\\)|)(?=[^-]|$)", "i")
            },
            Y = /^(?:input|select|textarea|button)$/i,
            Q = /^h\d$/i,
            J = /^[^{]+\{\s*\[native \w/,
            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ee = /[+~]/,
            te = new RegExp("\\\\([\\da-f]{1,6}" + R + "?|(" + R + ")|.)", "ig"),
            ne = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            re = function(e, t) {
                return t ? "\0" === e ? "�" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            },
            ie = ge(function(e) {
                return !0 === e.disabled && ("form" in e || "label" in e)
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            L.apply(t = F.call(y.childNodes), y.childNodes), t[y.childNodes.length].nodeType
        } catch (e) {
            L = {
                apply: t.length ? function(e, t) {
                    q.apply(e, F.call(t))
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];);
                    e.length = n - 1
                }
            }
        }

        function oe(e, t, n, r) {
            var i, o, a, s, l, c, u, f = t && t.ownerDocument,
                d = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== d && 9 !== d && 11 !== d) return n;
            if (!r && ((t ? t.ownerDocument || t : y) !== T && C(t), t = t || T, k)) {
                if (11 !== d && (l = Z.exec(e)))
                    if (i = l[1]) {
                        if (9 === d) {
                            if (!(a = t.getElementById(i))) return n;
                            if (a.id === i) return n.push(a), n
                        } else if (f && (a = f.getElementById(i)) && v(t, a) && a.id === i) return n.push(a), n
                    } else {
                        if (l[2]) return L.apply(n, t.getElementsByTagName(e)), n;
                        if ((i = l[3]) && p.getElementsByClassName && t.getElementsByClassName) return L.apply(n, t.getElementsByClassName(i)), n
                    } if (p.qsa && !j[e + " "] && (!g || !g.test(e))) {
                    if (1 !== d) f = t, u = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(ne, re) : t.setAttribute("id", s = _), o = (c = h(e)).length; o--;) c[o] = "#" + s + " " + me(c[o]);
                        u = c.join(","), f = ee.test(e) && pe(t.parentNode) || t
                    }
                    if (u) try {
                        return L.apply(n, f.querySelectorAll(u)), n
                    } catch (e) {} finally {
                        s === _ && t.removeAttribute("id")
                    }
                }
            }
            return m(e.replace(B, "$1"), t, n, r)
        }

        function ae() {
            var n = [];

            function r(e, t) {
                return n.push(e + " ") > b.cacheLength && delete r[n.shift()], r[e + " "] = t
            }
            return r
        }

        function se(e) {
            return e[_] = !0, e
        }

        function le(e) {
            var t = T.createElement("fieldset");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function ce(e, t) {
            for (var n = e.split("|"), r = n.length; r--;) b.attrHandle[n[r]] = t
        }

        function ue(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r) return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t) return -1;
            return e ? 1 : -1
        }

        function fe(t) {
            return function(e) {
                return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ie(e) === t : e.disabled === t : "label" in e && e.disabled === t
            }
        }

        function de(a) {
            return se(function(o) {
                return o = +o, se(function(e, t) {
                    for (var n, r = a([], e.length, o), i = r.length; i--;) e[n = r[i]] && (e[n] = !(t[n] = e[n]))
                })
            })
        }

        function pe(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }
        for (e in p = oe.support = {}, i = oe.isXML = function(e) {
            e = e && (e.ownerDocument || e).documentElement;
            return !!e && "HTML" !== e.nodeName
        }, C = oe.setDocument = function(e) {
            var t, e = e ? e.ownerDocument || e : y;
            return e !== T && 9 === e.nodeType && e.documentElement && (a = (T = e).documentElement, k = !i(T), y !== T && (t = T.defaultView) && t.top !== t && (t.addEventListener ? t.addEventListener("unload", r, !1) : t.attachEvent && t.attachEvent("onunload", r)), p.attributes = le(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), p.getElementsByTagName = le(function(e) {
                return e.appendChild(T.createComment("")), !e.getElementsByTagName("*").length
            }), p.getElementsByClassName = J.test(T.getElementsByClassName), p.getById = le(function(e) {
                return a.appendChild(e).id = _, !T.getElementsByName || !T.getElementsByName(_).length
            }), p.getById ? (b.filter.ID = function(e) {
                var t = e.replace(te, f);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }, b.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && k) {
                    e = t.getElementById(e);
                    return e ? [e] : []
                }
            }) : (b.filter.ID = function(e) {
                var t = e.replace(te, f);
                return function(e) {
                    e = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                    return e && e.value === t
                }
            }, b.find.ID = function(e, t) {
                if (void 0 !== t.getElementById && k) {
                    var n, r, i, o = t.getElementById(e);
                    if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e) return [o];
                        for (i = t.getElementsByName(e), r = 0; o = i[r++];)
                            if ((n = o.getAttributeNode("id")) && n.value === e) return [o]
                    }
                    return []
                }
            }), b.find.TAG = p.getElementsByTagName ? function(e, t) {
                return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : p.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n, r = [],
                    i = 0,
                    o = t.getElementsByTagName(e);
                if ("*" !== e) return o;
                for (; n = o[i++];) 1 === n.nodeType && r.push(n);
                return r
            }, b.find.CLASS = p.getElementsByClassName && function(e, t) {
                if (void 0 !== t.getElementsByClassName && k) return t.getElementsByClassName(e)
            }, s = [], g = [], (p.qsa = J.test(T.querySelectorAll)) && (le(function(e) {
                a.appendChild(e).innerHTML = "<a id='" + _ + "'></a><select id='" + _ + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && g.push("[*^$]=" + R + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || g.push("\\[" + R + "*(?:value|" + H + ")"), e.querySelectorAll("[id~=" + _ + "-]").length || g.push("~="), e.querySelectorAll(":checked").length || g.push(":checked"), e.querySelectorAll("a#" + _ + "+*").length || g.push(".#.+[+~]")
            }), le(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = T.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && g.push("name" + R + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && g.push(":enabled", ":disabled"), a.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && g.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), g.push(",.*:")
            })), (p.matchesSelector = J.test(u = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && le(function(e) {
                p.disconnectedMatch = u.call(e, "*"), u.call(e, "[s!='']:x"), s.push("!=", M)
            }), g = g.length && new RegExp(g.join("|")), s = s.length && new RegExp(s.join("|")), t = J.test(a.compareDocumentPosition), v = t || J.test(a.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    t = t && t.parentNode;
                return e === t || !(!t || 1 !== t.nodeType || !(n.contains ? n.contains(t) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(t)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e) return !0;
                return !1
            }, N = t ? function(e, t) {
                if (e === t) return c = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !p.sortDetached && t.compareDocumentPosition(e) === n ? e === T || e.ownerDocument === y && v(y, e) ? -1 : t === T || t.ownerDocument === y && v(y, t) ? 1 : l ? O(l, e) - O(l, t) : 0 : 4 & n ? -1 : 1)
            } : function(e, t) {
                if (e === t) return c = !0, 0;
                var n, r = 0,
                    i = e.parentNode,
                    o = t.parentNode,
                    a = [e],
                    s = [t];
                if (!i || !o) return e === T ? -1 : t === T ? 1 : i ? -1 : o ? 1 : l ? O(l, e) - O(l, t) : 0;
                if (i === o) return ue(e, t);
                for (n = e; n = n.parentNode;) a.unshift(n);
                for (n = t; n = n.parentNode;) s.unshift(n);
                for (; a[r] === s[r];) r++;
                return r ? ue(a[r], s[r]) : a[r] === y ? -1 : s[r] === y ? 1 : 0
            }), T
        }, oe.matches = function(e, t) {
            return oe(e, null, null, t)
        }, oe.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== T && C(e), t = t.replace(U, "='$1']"), p.matchesSelector && k && !j[t + " "] && (!s || !s.test(t)) && (!g || !g.test(t))) try {
                var n = u.call(e, t);
                if (n || p.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
            } catch (e) {}
            return 0 < oe(t, T, null, [e]).length
        }, oe.contains = function(e, t) {
            return (e.ownerDocument || e) !== T && C(e), v(e, t)
        }, oe.attr = function(e, t) {
            (e.ownerDocument || e) !== T && C(e);
            var n = b.attrHandle[t.toLowerCase()],
                n = n && D.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !k) : void 0;
            return void 0 !== n ? n : p.attributes || !k ? e.getAttribute(t) : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
        }, oe.escape = function(e) {
            return (e + "").replace(ne, re)
        }, oe.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, oe.uniqueSort = function(e) {
            var t, n = [],
                r = 0,
                i = 0;
            if (c = !p.detectDuplicates, l = !p.sortStable && e.slice(0), e.sort(N), c) {
                for (; t = e[i++];) t === e[i] && (r = n.push(i));
                for (; r--;) e.splice(n[r], 1)
            }
            return l = null, e
        }, o = oe.getText = function(e) {
            var t, n = "",
                r = 0,
                i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
                } else if (3 === i || 4 === i) return e.nodeValue
            } else
                for (; t = e[r++];) n += o(t);
            return n
        }, (b = oe.selectors = {
            cacheLength: 50,
            createPseudo: se,
            match: G,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(te, f), e[3] = (e[3] || e[4] || e[5] || "").replace(te, f), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || oe.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && oe.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && K.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(te, f).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = E[e + " "];
                    return t || (t = new RegExp("(^|" + R + ")" + e + "(" + R + "|$)")) && E(e, function(e) {
                        return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(t, n, r) {
                    return function(e) {
                        e = oe.attr(e, t);
                        return null == e ? "!=" === n : !n || (e += "", "=" === n ? e === r : "!=" === n ? e !== r : "^=" === n ? r && 0 === e.indexOf(r) : "*=" === n ? r && -1 < e.indexOf(r) : "$=" === n ? r && e.slice(-r.length) === r : "~=" === n ? -1 < (" " + e.replace(W, " ") + " ").indexOf(r) : "|=" === n && (e === r || e.slice(0, r.length + 1) === r + "-"))
                    }
                },
                CHILD: function(h, e, t, m, g) {
                    var v = "nth" !== h.slice(0, 3),
                        y = "last" !== h.slice(-4),
                        x = "of-type" === e;
                    return 1 === m && 0 === g ? function(e) {
                        return !!e.parentNode
                    } : function(e, t, n) {
                        var r, i, o, a, s, l, c = v != y ? "nextSibling" : "previousSibling",
                            u = e.parentNode,
                            f = x && e.nodeName.toLowerCase(),
                            d = !n && !x,
                            p = !1;
                        if (u) {
                            if (v) {
                                for (; c;) {
                                    for (a = e; a = a[c];)
                                        if (x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) return !1;
                                    l = c = "only" === h && !l && "nextSibling"
                                }
                                return !0
                            }
                            if (l = [y ? u.firstChild : u.lastChild], y && d) {
                                for (p = (s = (r = (i = (o = (a = u)[_] || (a[_] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === $ && r[1]) && r[2], a = s && u.childNodes[s]; a = ++s && a && a[c] || (p = s = 0) || l.pop();)
                                    if (1 === a.nodeType && ++p && a === e) {
                                        i[h] = [$, s, p];
                                        break
                                    }
                            } else if (d && (p = s = (r = (i = (o = (a = e)[_] || (a[_] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === $ && r[1]), !1 === p)
                                for (;
                                    (a = ++s && a && a[c] || (p = s = 0) || l.pop()) && ((x ? a.nodeName.toLowerCase() !== f : 1 !== a.nodeType) || !++p || (d && ((i = (o = a[_] || (a[_] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [$, p]), a !== e)););
                            return (p -= g) === m || p % m == 0 && 0 <= p / m
                        }
                    }
                },
                PSEUDO: function(e, o) {
                    var t, a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);
                    return a[_] ? a(o) : 1 < a.length ? (t = [e, e, "", o], b.setFilters.hasOwnProperty(e.toLowerCase()) ? se(function(e, t) {
                        for (var n, r = a(e, o), i = r.length; i--;) e[n = O(e, r[i])] = !(t[n] = r[i])
                    }) : function(e) {
                        return a(e, 0, t)
                    }) : a
                }
            },
            pseudos: {
                not: se(function(e) {
                    var r = [],
                        i = [],
                        s = d(e.replace(B, "$1"));
                    return s[_] ? se(function(e, t, n, r) {
                        for (var i, o = s(e, null, r, []), a = e.length; a--;)(i = o[a]) && (e[a] = !(t[a] = i))
                    }) : function(e, t, n) {
                        return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop()
                    }
                }),
                has: se(function(t) {
                    return function(e) {
                        return 0 < oe(t, e).length
                    }
                }),
                contains: se(function(t) {
                    return t = t.replace(te, f),
                        function(e) {
                            return -1 < (e.textContent || e.innerText || o(e)).indexOf(t)
                        }
                }),
                lang: se(function(n) {
                    return V.test(n || "") || oe.error("unsupported lang: " + n), n = n.replace(te, f).toLowerCase(),
                        function(e) {
                            var t;
                            do {
                                if (t = k ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                            } while ((e = e.parentNode) && 1 === e.nodeType);
                            return !1
                        }
                }),
                target: function(e) {
                    var t = n.location && n.location.hash;
                    return t && t.slice(1) === e.id
                },
                root: function(e) {
                    return e === a
                },
                focus: function(e) {
                    return e === T.activeElement && (!T.hasFocus || T.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: fe(!1),
                disabled: fe(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6) return !1;
                    return !0
                },
                parent: function(e) {
                    return !b.pseudos.empty(e)
                },
                header: function(e) {
                    return Q.test(e.nodeName)
                },
                input: function(e) {
                    return Y.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (e = e.getAttribute("type")) || "text" === e.toLowerCase())
                },
                first: de(function() {
                    return [0]
                }),
                last: de(function(e, t) {
                    return [t - 1]
                }),
                eq: de(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: de(function(e, t) {
                    for (var n = 0; n < t; n += 2) e.push(n);
                    return e
                }),
                odd: de(function(e, t) {
                    for (var n = 1; n < t; n += 2) e.push(n);
                    return e
                }),
                lt: de(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; 0 <= --r;) e.push(r);
                    return e
                }),
                gt: de(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r);
                    return e
                })
            }
        }).pseudos.nth = b.pseudos.eq, {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) b.pseudos[e] = function(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }(e);
        for (e in {
            submit: !0,
            reset: !0
        }) b.pseudos[e] = function(n) {
            return function(e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === n
            }
        }(e);

        function he() {}

        function me(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r
        }

        function ge(a, e, t) {
            var s = e.dir,
                l = e.next,
                c = l || s,
                u = t && "parentNode" === c,
                f = x++;
            return e.first ? function(e, t, n) {
                for (; e = e[s];)
                    if (1 === e.nodeType || u) return a(e, t, n);
                return !1
            } : function(e, t, n) {
                var r, i, o = [$, f];
                if (n) {
                    for (; e = e[s];)
                        if ((1 === e.nodeType || u) && a(e, t, n)) return !0
                } else
                    for (; e = e[s];)
                        if (1 === e.nodeType || u)
                            if (r = (i = e[_] || (e[_] = {}))[e.uniqueID] || (i[e.uniqueID] = {}), l && l === e.nodeName.toLowerCase()) e = e[s] || e;
                            else {
                                if ((i = r[c]) && i[0] === $ && i[1] === f) return o[2] = i[2];
                                if ((r[c] = o)[2] = a(e, t, n)) return !0
                            } return !1
            }
        }

        function ve(i) {
            return 1 < i.length ? function(e, t, n) {
                for (var r = i.length; r--;)
                    if (!i[r](e, t, n)) return !1;
                return !0
            } : i[0]
        }

        function ye(e, t, n, r, i) {
            for (var o, a = [], s = 0, l = e.length, c = null != t; s < l; s++)(o = e[s]) && (n && !n(o, r, i) || (a.push(o), c && t.push(s)));
            return a
        }

        function xe(p, h, m, g, v, e) {
            return g && !g[_] && (g = xe(g)), v && !v[_] && (v = xe(v, e)), se(function(e, t, n, r) {
                var i, o, a, s = [],
                    l = [],
                    c = t.length,
                    u = e || function(e, t, n) {
                        for (var r = 0, i = t.length; r < i; r++) oe(e, t[r], n);
                        return n
                    }(h || "*", n.nodeType ? [n] : n, []),
                    f = !p || !e && h ? u : ye(u, s, p, n, r),
                    d = m ? v || (e ? p : c || g) ? [] : t : f;
                if (m && m(f, d, n, r), g)
                    for (i = ye(d, l), g(i, [], n, r), o = i.length; o--;)(a = i[o]) && (d[l[o]] = !(f[l[o]] = a));
                if (e) {
                    if (v || p) {
                        if (v) {
                            for (i = [], o = d.length; o--;)(a = d[o]) && i.push(f[o] = a);
                            v(null, d = [], i, r)
                        }
                        for (o = d.length; o--;)(a = d[o]) && -1 < (i = v ? O(e, a) : s[o]) && (e[i] = !(t[i] = a))
                    }
                } else d = ye(d === t ? d.splice(c, d.length) : d), v ? v(null, t, d, r) : L.apply(t, d)
            })
        }

        function be(g, v) {
            function e(e, t, n, r, i) {
                var o, a, s, l = 0,
                    c = "0",
                    u = e && [],
                    f = [],
                    d = w,
                    p = e || x && b.find.TAG("*", i),
                    h = $ += null == d ? 1 : Math.random() || .1,
                    m = p.length;
                for (i && (w = t === T || t || i); c !== m && null != (o = p[c]); c++) {
                    if (x && o) {
                        for (a = 0, t || o.ownerDocument === T || (C(o), n = !k); s = g[a++];)
                            if (s(o, t || T, n)) {
                                r.push(o);
                                break
                            } i && ($ = h)
                    }
                    y && ((o = !s && o) && l--, e && u.push(o))
                }
                if (l += c, y && c !== l) {
                    for (a = 0; s = v[a++];) s(u, f, t, n);
                    if (e) {
                        if (0 < l)
                            for (; c--;) u[c] || f[c] || (f[c] = A.call(r));
                        f = ye(f)
                    }
                    L.apply(r, f), i && !e && 0 < f.length && 1 < l + v.length && oe.uniqueSort(r)
                }
                return i && ($ = h, w = d), u
            }
            var y = 0 < v.length,
                x = 0 < g.length;
            return y ? se(e) : e
        }
        return he.prototype = b.filters = b.pseudos, b.setFilters = new he, h = oe.tokenize = function(e, t) {
            var n, r, i, o, a, s, l, c = S[e + " "];
            if (c) return t ? 0 : c.slice(0);
            for (a = e, s = [], l = b.preFilter; a;) {
                for (o in n && !(r = X.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = z.exec(a)) && (n = r.shift(), i.push({
                    value: n,
                    type: r[0].replace(B, " ")
                }), a = a.slice(n.length)), b.filter) !(r = G[o].exec(a)) || l[o] && !(r = l[o](r)) || (n = r.shift(), i.push({
                    value: n,
                    type: o,
                    matches: r
                }), a = a.slice(n.length));
                if (!n) break
            }
            return t ? a.length : a ? oe.error(e) : S(e, s).slice(0)
        }, d = oe.compile = function(e, t) {
            var n, r = [],
                i = [],
                o = j[e + " "];
            if (!o) {
                for (n = (t = t || h(e)).length; n--;)((o = function e(t) {
                    for (var r, n, i, o = t.length, a = b.relative[t[0].type], s = a || b.relative[" "], l = a ? 1 : 0, c = ge(function(e) {
                        return e === r
                    }, s, !0), u = ge(function(e) {
                        return -1 < O(r, e)
                    }, s, !0), f = [function(e, t, n) {
                        return n = !a && (n || t !== w) || ((r = t).nodeType ? c : u)(e, t, n), r = null, n
                    }]; l < o; l++)
                        if (n = b.relative[t[l].type]) f = [ge(ve(f), n)];
                        else {
                            if ((n = b.filter[t[l].type].apply(null, t[l].matches))[_]) {
                                for (i = ++l; i < o && !b.relative[t[i].type]; i++);
                                return xe(1 < l && ve(f), 1 < l && me(t.slice(0, l - 1).concat({
                                    value: " " === t[l - 2].type ? "*" : ""
                                })).replace(B, "$1"), n, l < i && e(t.slice(l, i)), i < o && e(t = t.slice(i)), i < o && me(t))
                            }
                            f.push(n)
                        } return ve(f)
                }(t[n]))[_] ? r : i).push(o);
                (o = j(e, be(i, r))).selector = e
            }
            return o
        }, m = oe.select = function(e, t, n, r) {
            var i, o, a, s, l, c = "function" == typeof e && e,
                u = !r && h(e = c.selector || e);
            if (n = n || [], 1 === u.length) {
                if (2 < (o = u[0] = u[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && k && b.relative[o[1].type]) {
                    if (!(t = (b.find.ID(a.matches[0].replace(te, f), t) || [])[0])) return n;
                    c && (t = t.parentNode), e = e.slice(o.shift().value.length)
                }
                for (i = G.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !b.relative[s = a.type]);)
                    if ((l = b.find[s]) && (r = l(a.matches[0].replace(te, f), ee.test(o[0].type) && pe(t.parentNode) || t))) {
                        if (o.splice(i, 1), !(e = r.length && me(o))) return L.apply(n, r), n;
                        break
                    }
            }
            return (c || d(e, u))(r, t, !k, n, !t || ee.test(e) && pe(t.parentNode) || t), n
        }, p.sortStable = _.split("").sort(N).join("") === _, p.detectDuplicates = !!c, C(), p.sortDetached = le(function(e) {
            return 1 & e.compareDocumentPosition(T.createElement("fieldset"))
        }), le(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || ce("type|href|height|width", function(e, t, n) {
            if (!n) return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), p.attributes && le(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || ce("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase()) return e.defaultValue
        }), le(function(e) {
            return null == e.getAttribute("disabled")
        }) || ce(H, function(e, t, n) {
            if (!n) return !0 === e[t] ? t.toLowerCase() : (t = e.getAttributeNode(t)) && t.specified ? t.value : null
        }), oe
    }(C);
    k.find = b, k.expr = b.selectors, k.expr[":"] = k.expr.pseudos, k.uniqueSort = k.unique = b.uniqueSort, k.text = b.getText, k.isXMLDoc = b.isXML, k.contains = b.contains, k.escapeSelector = b.escape;

    function w(e, t, n) {
        for (var r = [], i = void 0 !== n;
             (e = e[t]) && 9 !== e.nodeType;)
            if (1 === e.nodeType) {
                if (i && k(e).is(n)) break;
                r.push(e)
            } return r
    }

    function _(e, t) {
        for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
        return n
    }
    var $ = k.expr.match.needsContext;

    function E(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var S = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
        j = /^.[^:#\[\.,]*$/;

    function N(e, n, r) {
        return k.isFunction(n) ? k.grep(e, function(e, t) {
            return !!n.call(e, t, e) !== r
        }) : n.nodeType ? k.grep(e, function(e) {
            return e === n !== r
        }) : "string" != typeof n ? k.grep(e, function(e) {
            return -1 < i.call(n, e) !== r
        }) : j.test(n) ? k.filter(n, e, r) : (n = k.filter(n, e), k.grep(e, function(e) {
            return -1 < i.call(n, e) !== r && 1 === e.nodeType
        }))
    }
    k.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? k.find.matchesSelector(r, e) ? [r] : [] : k.find.matches(e, k.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, k.fn.extend({
        find: function(e) {
            var t, n, r = this.length,
                i = this;
            if ("string" != typeof e) return this.pushStack(k(e).filter(function() {
                for (t = 0; t < r; t++)
                    if (k.contains(i[t], this)) return !0
            }));
            for (n = this.pushStack([]), t = 0; t < r; t++) k.find(e, i[t], n);
            return 1 < r ? k.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(N(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(N(this, e || [], !0))
        },
        is: function(e) {
            return !!N(this, "string" == typeof e && $.test(e) ? k(e) : e || [], !1).length
        }
    });
    var D, A = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (k.fn.init = function(e, t, n) {
        if (!e) return this;
        if (n = n || D, "string" != typeof e) return e.nodeType ? (this[0] = e, this.length = 1, this) : k.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(k) : k.makeArray(e, this);
        if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : A.exec(e)) || !r[1] && t) return (!t || t.jquery ? t || n : this.constructor(t)).find(e);
        if (r[1]) {
            if (t = t instanceof k ? t[0] : t, k.merge(this, k.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : T, !0)), S.test(r[1]) && k.isPlainObject(t))
                for (var r in t) k.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
            return this
        }
        return (e = T.getElementById(r[2])) && (this[0] = e, this.length = 1), this
    }).prototype = k.fn, D = k(T);
    var q = /^(?:parents|prev(?:Until|All))/,
        L = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };

    function F(e, t) {
        for (;
            (e = e[t]) && 1 !== e.nodeType;);
        return e
    }
    k.fn.extend({
        has: function(e) {
            var t = k(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (k.contains(this, t[e])) return !0
            })
        },
        closest: function(e, t) {
            var n, r = 0,
                i = this.length,
                o = [],
                a = "string" != typeof e && k(e);
            if (!$.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && k.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        } return this.pushStack(1 < o.length ? k.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? i.call(k(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(k.uniqueSort(k.merge(this.get(), k(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), k.each({
        parent: function(e) {
            e = e.parentNode;
            return e && 11 !== e.nodeType ? e : null
        },
        parents: function(e) {
            return w(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return w(e, "parentNode", n)
        },
        next: function(e) {
            return F(e, "nextSibling")
        },
        prev: function(e) {
            return F(e, "previousSibling")
        },
        nextAll: function(e) {
            return w(e, "nextSibling")
        },
        prevAll: function(e) {
            return w(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return w(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return w(e, "previousSibling", n)
        },
        siblings: function(e) {
            return _((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return _(e.firstChild)
        },
        contents: function(e) {
            return E(e, "iframe") ? e.contentDocument : (E(e, "template") && (e = e.content || e), k.merge([], e.childNodes))
        }
    }, function(r, i) {
        k.fn[r] = function(e, t) {
            var n = k.map(this, i, e);
            return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = k.filter(t, n)), 1 < this.length && (L[r] || k.uniqueSort(n), q.test(r) && n.reverse()), this.pushStack(n)
        }
    });
    var O = /[^\x20\t\r\n\f]+/g;

    function H(e) {
        return e
    }

    function R(e) {
        throw e
    }

    function P(e, t, n, r) {
        var i;
        try {
            e && k.isFunction(i = e.promise) ? i.call(e).done(t).fail(n) : e && k.isFunction(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
        } catch (e) {
            n.apply(void 0, [e])
        }
    }
    k.Callbacks = function(r) {
        var e, n;
        r = "string" == typeof r ? (e = r, n = {}, k.each(e.match(O) || [], function(e, t) {
            n[t] = !0
        }), n) : k.extend({}, r);

        function i() {
            for (s = s || r.once, a = o = !0; c.length; u = -1)
                for (t = c.shift(); ++u < l.length;) !1 === l[u].apply(t[0], t[1]) && r.stopOnFalse && (u = l.length, t = !1);
            r.memory || (t = !1), o = !1, s && (l = t ? [] : "")
        }
        var o, t, a, s, l = [],
            c = [],
            u = -1,
            f = {
                add: function() {
                    return l && (t && !o && (u = l.length - 1, c.push(t)), function n(e) {
                        k.each(e, function(e, t) {
                            k.isFunction(t) ? r.unique && f.has(t) || l.push(t) : t && t.length && "string" !== k.type(t) && n(t)
                        })
                    }(arguments), t && !o && i()), this
                },
                remove: function() {
                    return k.each(arguments, function(e, t) {
                        for (var n; - 1 < (n = k.inArray(t, l, n));) l.splice(n, 1), n <= u && u--
                    }), this
                },
                has: function(e) {
                    return e ? -1 < k.inArray(e, l) : 0 < l.length
                },
                empty: function() {
                    return l = l && [], this
                },
                disable: function() {
                    return s = c = [], l = t = "", this
                },
                disabled: function() {
                    return !l
                },
                lock: function() {
                    return s = c = [], t || o || (l = t = ""), this
                },
                locked: function() {
                    return !!s
                },
                fireWith: function(e, t) {
                    return s || (t = [e, (t = t || []).slice ? t.slice() : t], c.push(t), o || i()), this
                },
                fire: function() {
                    return f.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!a
                }
            };
        return f
    }, k.extend({
        Deferred: function(e) {
            var o = [
                    ["notify", "progress", k.Callbacks("memory"), k.Callbacks("memory"), 2],
                    ["resolve", "done", k.Callbacks("once memory"), k.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", k.Callbacks("once memory"), k.Callbacks("once memory"), 1, "rejected"]
                ],
                i = "pending",
                a = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return s.done(arguments).fail(arguments), this
                    },
                    catch: function(e) {
                        return a.then(null, e)
                    },
                    pipe: function() {
                        var i = arguments;
                        return k.Deferred(function(r) {
                            k.each(o, function(e, t) {
                                var n = k.isFunction(i[t[4]]) && i[t[4]];
                                s[t[1]](function() {
                                    var e = n && n.apply(this, arguments);
                                    e && k.isFunction(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments)
                                })
                            }), i = null
                        }).promise()
                    },
                    then: function(t, n, r) {
                        var l = 0;

                        function c(i, o, a, s) {
                            return function() {
                                function e() {
                                    var e, t;
                                    if (!(i < l)) {
                                        if ((e = a.apply(n, r)) === o.promise()) throw new TypeError("Thenable self-resolution");
                                        t = e && ("object" == typeof e || "function" == typeof e) && e.then, k.isFunction(t) ? s ? t.call(e, c(l, o, H, s), c(l, o, R, s)) : (l++, t.call(e, c(l, o, H, s), c(l, o, R, s), c(l, o, H, o.notifyWith))) : (a !== H && (n = void 0, r = [e]), (s || o.resolveWith)(n, r))
                                    }
                                }
                                var n = this,
                                    r = arguments,
                                    t = s ? e : function() {
                                        try {
                                            e()
                                        } catch (e) {
                                            k.Deferred.exceptionHook && k.Deferred.exceptionHook(e, t.stackTrace), l <= i + 1 && (a !== R && (n = void 0, r = [e]), o.rejectWith(n, r))
                                        }
                                    };
                                i ? t() : (k.Deferred.getStackHook && (t.stackTrace = k.Deferred.getStackHook()), C.setTimeout(t))
                            }
                        }
                        return k.Deferred(function(e) {
                            o[0][3].add(c(0, e, k.isFunction(r) ? r : H, e.notifyWith)), o[1][3].add(c(0, e, k.isFunction(t) ? t : H)), o[2][3].add(c(0, e, k.isFunction(n) ? n : R))
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? k.extend(e, a) : a
                    }
                },
                s = {};
            return k.each(o, function(e, t) {
                var n = t[2],
                    r = t[5];
                a[t[1]] = n.add, r && n.add(function() {
                    i = r
                }, o[3 - e][2].disable, o[0][2].lock), n.add(t[3].fire), s[t[0]] = function() {
                    return s[t[0] + "With"](this === s ? void 0 : this, arguments), this
                }, s[t[0] + "With"] = n.fireWith
            }), a.promise(s), e && e.call(s, s), s
        },
        when: function(e) {
            function t(t) {
                return function(e) {
                    i[t] = this, o[t] = 1 < arguments.length ? s.call(arguments) : e, --n || a.resolveWith(i, o)
                }
            }
            var n = arguments.length,
                r = n,
                i = Array(r),
                o = s.call(arguments),
                a = k.Deferred();
            if (n <= 1 && (P(e, a.done(t(r)).resolve, a.reject, !n), "pending" === a.state() || k.isFunction(o[r] && o[r].then))) return a.then();
            for (; r--;) P(o[r], t(r), a.reject);
            return a.promise()
        }
    });
    var I = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    k.Deferred.exceptionHook = function(e, t) {
        C.console && C.console.warn && e && I.test(e.name) && C.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
    }, k.readyException = function(e) {
        C.setTimeout(function() {
            throw e
        })
    };
    var M = k.Deferred();

    function W() {
        T.removeEventListener("DOMContentLoaded", W), C.removeEventListener("load", W), k.ready()
    }
    k.fn.ready = function(e) {
        return M.then(e).catch(function(e) {
            k.readyException(e)
        }), this
    }, k.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --k.readyWait : k.isReady) || ((k.isReady = !0) !== e && 0 < --k.readyWait || M.resolveWith(T, [k]))
        }
    }), k.ready.then = M.then, "complete" === T.readyState || "loading" !== T.readyState && !T.documentElement.doScroll ? C.setTimeout(k.ready) : (T.addEventListener("DOMContentLoaded", W), C.addEventListener("load", W));

    function B(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    }
    var X = function(e, t, n, r, i, o, a) {
        var s = 0,
            l = e.length,
            c = null == n;
        if ("object" === k.type(n))
            for (s in i = !0, n) X(e, t, s, n[s], !0, o, a);
        else if (void 0 !== r && (i = !0, k.isFunction(r) || (a = !0), c && (t = a ? (t.call(e, r), null) : (c = t, function(e, t, n) {
            return c.call(k(e), n)
        })), t))
            for (; s < l; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
        return i ? e : c ? t.call(e) : l ? t(e[0], n) : o
    };

    function z() {
        this.expando = k.expando + z.uid++
    }
    z.uid = 1, z.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, B(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var r, i = this.cache(e);
            if ("string" == typeof t) i[k.camelCase(t)] = n;
            else
                for (r in t) i[k.camelCase(r)] = t[r];
            return i
        },
        get: function(e, t) {
            return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][k.camelCase(t)]
        },
        access: function(e, t, n) {
            return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n), void 0 !== n ? n : t)
        },
        remove: function(e, t) {
            var n, r = e[this.expando];
            if (void 0 !== r) {
                if (void 0 !== t) {
                    n = (t = Array.isArray(t) ? t.map(k.camelCase) : (t = k.camelCase(t)) in r ? [t] : t.match(O) || []).length;
                    for (; n--;) delete r[t[n]]
                }
                void 0 !== t && !k.isEmptyObject(r) || (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
            }
        },
        hasData: function(e) {
            e = e[this.expando];
            return void 0 !== e && !k.isEmptyObject(e)
        }
    };
    var U = new z,
        K = new z,
        V = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        G = /[A-Z]/g;

    function Y(e, t, n) {
        var r, i;
        if (void 0 === n && 1 === e.nodeType)
            if (r = "data-" + t.replace(G, "-$&").toLowerCase(), "string" == typeof(n = e.getAttribute(r))) {
                try {
                    n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : V.test(i) ? JSON.parse(i) : i)
                } catch (e) {}
                K.set(e, t, n)
            } else n = void 0;
        return n
    }
    k.extend({
        hasData: function(e) {
            return K.hasData(e) || U.hasData(e)
        },
        data: function(e, t, n) {
            return K.access(e, t, n)
        },
        removeData: function(e, t) {
            K.remove(e, t)
        },
        _data: function(e, t, n) {
            return U.access(e, t, n)
        },
        _removeData: function(e, t) {
            U.remove(e, t)
        }
    }), k.fn.extend({
        data: function(n, e) {
            var t, r, i, o = this[0],
                a = o && o.attributes;
            if (void 0 !== n) return "object" == typeof n ? this.each(function() {
                K.set(this, n)
            }) : X(this, function(e) {
                var t;
                return o && void 0 === e ? void 0 !== (t = K.get(o, n)) || void 0 !== (t = Y(o, n)) ? t : void 0 : void this.each(function() {
                    K.set(this, n, e)
                })
            }, null, e, 1 < arguments.length, null, !0);
            if (this.length && (i = K.get(o), 1 === o.nodeType && !U.get(o, "hasDataAttrs"))) {
                for (t = a.length; t--;) a[t] && (0 === (r = a[t].name).indexOf("data-") && (r = k.camelCase(r.slice(5)), Y(o, r, i[r])));
                U.set(o, "hasDataAttrs", !0)
            }
            return i
        },
        removeData: function(e) {
            return this.each(function() {
                K.remove(this, e)
            })
        }
    }), k.extend({
        queue: function(e, t, n) {
            var r;
            if (e) return t = (t || "fx") + "queue", r = U.get(e, t), n && (!r || Array.isArray(n) ? r = U.access(e, t, k.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = k.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = k._queueHooks(e, t);
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function() {
                k.dequeue(e, t)
            }, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return U.get(e, n) || U.access(e, n, {
                empty: k.Callbacks("once memory").add(function() {
                    U.remove(e, [t + "queue", n])
                })
            })
        }
    }), k.fn.extend({
        queue: function(t, n) {
            var e = 2;
            return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? k.queue(this[0], t) : void 0 === n ? this : this.each(function() {
                var e = k.queue(this, t, n);
                k._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && k.dequeue(this, t)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                k.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            function n() {
                --i || o.resolveWith(a, [a])
            }
            var r, i = 1,
                o = k.Deferred(),
                a = this,
                s = this.length;
            for ("string" != typeof e && (t = e, e = void 0), e = e || "fx"; s--;)(r = U.get(a[s], e + "queueHooks")) && r.empty && (i++, r.empty.add(n));
            return n(), o.promise(t)
        }
    });

    function Q(e, t, n, r) {
        var i, o = {};
        for (i in t) o[i] = e.style[i], e.style[i] = t[i];
        for (i in r = n.apply(e, r || []), t) e.style[i] = o[i];
        return r
    }
    var f = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        J = new RegExp("^(?:([+-])=|)(" + f + ")([a-z%]*)$", "i"),
        Z = ["Top", "Right", "Bottom", "Left"],
        ee = function(e, t) {
            return "none" === (e = t || e).style.display || "" === e.style.display && k.contains(e.ownerDocument, e) && "none" === k.css(e, "display")
        };

    function te(e, t, n, r) {
        var i, o = 1,
            a = 20,
            s = r ? function() {
                return r.cur()
            } : function() {
                return k.css(e, t, "")
            },
            l = s(),
            c = n && n[3] || (k.cssNumber[t] ? "" : "px"),
            u = (k.cssNumber[t] || "px" !== c && +l) && J.exec(k.css(e, t));
        if (u && u[3] !== c)
            for (c = c || u[3], n = n || [], u = +l || 1; o = o || ".5", u /= o, k.style(e, t, u + c), o !== (o = s() / l) && 1 !== o && --a;);
        return n && (u = +u || +l || 0, i = n[1] ? u + (n[1] + 1) * n[2] : +n[2], r && (r.unit = c, r.start = u, r.end = i)), i
    }
    var ne = {};

    function re(e, t) {
        for (var n, r, i, o, a, s = [], l = 0, c = e.length; l < c; l++)(r = e[l]).style && (n = r.style.display, t ? ("none" === n && (s[l] = U.get(r, "display") || null, s[l] || (r.style.display = "")), "" === r.style.display && ee(r) && (s[l] = (a = o = void 0, o = (i = r).ownerDocument, a = i.nodeName, (i = ne[a]) || (o = o.body.appendChild(o.createElement(a)), i = k.css(o, "display"), o.parentNode.removeChild(o), "none" === i && (i = "block"), ne[a] = i)))) : "none" !== n && (s[l] = "none", U.set(r, "display", n)));
        for (l = 0; l < c; l++) null != s[l] && (e[l].style.display = s[l]);
        return e
    }
    k.fn.extend({
        show: function() {
            return re(this, !0)
        },
        hide: function() {
            return re(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                ee(this) ? k(this).show() : k(this).hide()
            })
        }
    });
    var ie = /^(?:checkbox|radio)$/i,
        oe = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        ae = /^$|\/(?:java|ecma)script/i,
        se = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };

    function le(e, t) {
        var n = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && E(e, t) ? k.merge([e], n) : n
    }

    function ce(e, t) {
        for (var n = 0, r = e.length; n < r; n++) U.set(e[n], "globalEval", !t || U.get(t[n], "globalEval"))
    }
    se.optgroup = se.option, se.tbody = se.tfoot = se.colgroup = se.caption = se.thead, se.th = se.td;
    var ue = /<|&#?\w+;/;

    function fe(e, t, n, r, i) {
        for (var o, a, s, l, c, u = t.createDocumentFragment(), f = [], d = 0, p = e.length; d < p; d++)
            if ((o = e[d]) || 0 === o)
                if ("object" === k.type(o)) k.merge(f, o.nodeType ? [o] : o);
                else if (ue.test(o)) {
                    for (a = a || u.appendChild(t.createElement("div")), s = (oe.exec(o) || ["", ""])[1].toLowerCase(), s = se[s] || se._default, a.innerHTML = s[1] + k.htmlPrefilter(o) + s[2], c = s[0]; c--;) a = a.lastChild;
                    k.merge(f, a.childNodes), (a = u.firstChild).textContent = ""
                } else f.push(t.createTextNode(o));
        for (u.textContent = "", d = 0; o = f[d++];)
            if (r && -1 < k.inArray(o, r)) i && i.push(o);
            else if (l = k.contains(o.ownerDocument, o), a = le(u.appendChild(o), "script"), l && ce(a), n)
                for (c = 0; o = a[c++];) ae.test(o.type || "") && n.push(o);
        return u
    }
    t = T.createDocumentFragment().appendChild(T.createElement("div")), (b = T.createElement("input")).setAttribute("type", "radio"), b.setAttribute("checked", "checked"), b.setAttribute("name", "t"), t.appendChild(b), g.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", g.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue;
    var de = T.documentElement,
        pe = /^key/,
        he = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        me = /^([^.]*)(?:\.(.+)|)/;

    function ge() {
        return !0
    }

    function ve() {
        return !1
    }

    function ye() {
        try {
            return T.activeElement
        } catch (e) {}
    }

    function xe(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            for (s in "string" != typeof n && (r = r || n, n = void 0), t) xe(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n, r = n = void 0) : null == i && ("string" == typeof n ? (i = r, r = void 0) : (i = r, r = n, n = void 0)), !1 === i) i = ve;
        else if (!i) return e;
        return 1 === o && (a = i, (i = function(e) {
            return k().off(e), a.apply(this, arguments)
        }).guid = a.guid || (a.guid = k.guid++)), e.each(function() {
            k.event.add(this, t, i, r, n)
        })
    }
    k.event = {
        global: {},
        add: function(t, e, n, r, i) {
            var o, a, s, l, c, u, f, d, p, h = U.get(t);
            if (h)
                for (n.handler && (n = (o = n).handler, i = o.selector), i && k.find.matchesSelector(de, i), n.guid || (n.guid = k.guid++), (s = h.events) || (s = h.events = {}), (a = h.handle) || (a = h.handle = function(e) {
                    return void 0 !== k && k.event.triggered !== e.type ? k.event.dispatch.apply(t, arguments) : void 0
                }), l = (e = (e || "").match(O) || [""]).length; l--;) f = p = (c = me.exec(e[l]) || [])[1], d = (c[2] || "").split(".").sort(), f && (u = k.event.special[f] || {}, f = (i ? u.delegateType : u.bindType) || f, u = k.event.special[f] || {}, c = k.extend({
                    type: f,
                    origType: p,
                    data: r,
                    handler: n,
                    guid: n.guid,
                    selector: i,
                    needsContext: i && k.expr.match.needsContext.test(i),
                    namespace: d.join(".")
                }, o), (p = s[f]) || ((p = s[f] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(t, r, d, a) || t.addEventListener && t.addEventListener(f, a)), u.add && (u.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? p.splice(p.delegateCount++, 0, c) : p.push(c), k.event.global[f] = !0)
        },
        remove: function(e, t, n, r, i) {
            var o, a, s, l, c, u, f, d, p, h, m, g = U.hasData(e) && U.get(e);
            if (g && (l = g.events)) {
                for (c = (t = (t || "").match(O) || [""]).length; c--;)
                    if (p = m = (s = me.exec(t[c]) || [])[1], h = (s[2] || "").split(".").sort(), p) {
                        for (f = k.event.special[p] || {}, d = l[p = (r ? f.delegateType : f.bindType) || p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = d.length; o--;) u = d[o], !i && m !== u.origType || n && n.guid !== u.guid || s && !s.test(u.namespace) || r && r !== u.selector && ("**" !== r || !u.selector) || (d.splice(o, 1), u.selector && d.delegateCount--, f.remove && f.remove.call(e, u));
                        a && !d.length && (f.teardown && !1 !== f.teardown.call(e, h, g.handle) || k.removeEvent(e, p, g.handle), delete l[p])
                    } else
                        for (p in l) k.event.remove(e, p + t[c], n, r, !0);
                k.isEmptyObject(l) && U.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t, n, r, i, o, a = k.event.fix(e),
                s = new Array(arguments.length),
                l = (U.get(this, "events") || {})[a.type] || [],
                e = k.event.special[a.type] || {};
            for (s[0] = a, t = 1; t < arguments.length; t++) s[t] = arguments[t];
            if (a.delegateTarget = this, !e.preDispatch || !1 !== e.preDispatch.call(this, a)) {
                for (o = k.event.handlers.call(this, a, l), t = 0;
                     (r = o[t++]) && !a.isPropagationStopped();)
                    for (a.currentTarget = r.elem, n = 0;
                         (i = r.handlers[n++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !a.rnamespace.test(i.namespace) || (a.handleObj = i, a.data = i.data, void 0 !== (i = ((k.event.special[i.origType] || {}).handle || i.handler).apply(r.elem, s)) && !1 === (a.result = i) && (a.preventDefault(), a.stopPropagation()));
                return e.postDispatch && e.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(e, t) {
            var n, r, i, o, a, s = [],
                l = t.delegateCount,
                c = e.target;
            if (l && c.nodeType && !("click" === e.type && 1 <= e.button))
                for (; c !== this; c = c.parentNode || this)
                    if (1 === c.nodeType && ("click" !== e.type || !0 !== c.disabled)) {
                        for (o = [], a = {}, n = 0; n < l; n++) void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < k(i, this).index(c) : k.find(i, this, null, [c]).length), a[i] && o.push(r);
                        o.length && s.push({
                            elem: c,
                            handlers: o
                        })
                    } return c = this, l < t.length && s.push({
                elem: c,
                handlers: t.slice(l)
            }), s
        },
        addProp: function(t, e) {
            Object.defineProperty(k.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: k.isFunction(e) ? function() {
                    if (this.originalEvent) return e(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[t]
                },
                set: function(e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    })
                }
            })
        },
        fix: function(e) {
            return e[k.expando] ? e : new k.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== ye() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === ye() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && E(this, "input")) return this.click(), !1
                },
                _default: function(e) {
                    return E(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, k.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, k.Event = function(e, t) {
        return this instanceof k.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? ge : ve, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && k.extend(this, t), this.timeStamp = e && e.timeStamp || k.now(), void(this[k.expando] = !0)) : new k.Event(e, t)
    }, k.Event.prototype = {
        constructor: k.Event,
        isDefaultPrevented: ve,
        isPropagationStopped: ve,
        isImmediatePropagationStopped: ve,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = ge, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = ge, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = ge, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, k.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        char: !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && pe.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && he.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, k.event.addProp), k.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, i) {
        k.event.special[e] = {
            delegateType: i,
            bindType: i,
            handle: function(e) {
                var t, n = e.relatedTarget,
                    r = e.handleObj;
                return n && (n === this || k.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = i), t
            }
        }
    }), k.fn.extend({
        on: function(e, t, n, r) {
            return xe(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return xe(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r, i;
            if (e && e.preventDefault && e.handleObj) return r = e.handleObj, k(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" != typeof e) return !1 !== t && "function" != typeof t || (n = t, t = void 0), !1 === n && (n = ve), this.each(function() {
                k.event.remove(this, e, n, t)
            });
            for (i in e) this.off(i, t, e[i]);
            return this
        }
    });
    var be = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        we = /<script|<style|<link/i,
        Ce = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Te = /^true\/(.*)/,
        ke = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

    function _e(e, t) {
        return E(e, "table") && E(11 !== t.nodeType ? t : t.firstChild, "tr") && k(">tbody", e)[0] || e
    }

    function $e(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function Ee(e) {
        var t = Te.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function Se(e, t) {
        var n, r, i, o, a, s;
        if (1 === t.nodeType) {
            if (U.hasData(e) && (o = U.access(e), a = U.set(t, o), s = o.events))
                for (i in delete a.handle, a.events = {}, s)
                    for (n = 0, r = s[i].length; n < r; n++) k.event.add(t, i, s[i][n]);
            K.hasData(e) && (e = K.access(e), e = k.extend({}, e), K.set(t, e))
        }
    }

    function je(n, r, i, o) {
        r = m.apply([], r);
        var e, t, a, s, l, c, u = 0,
            f = n.length,
            d = f - 1,
            p = r[0],
            h = k.isFunction(p);
        if (h || 1 < f && "string" == typeof p && !g.checkClone && Ce.test(p)) return n.each(function(e) {
            var t = n.eq(e);
            h && (r[0] = p.call(this, e, t.html())), je(t, r, i, o)
        });
        if (f && (t = (e = fe(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) {
            for (s = (a = k.map(le(e, "script"), $e)).length; u < f; u++) l = e, u !== d && (l = k.clone(l, !0, !0), s && k.merge(a, le(l, "script"))), i.call(n[u], l, u);
            if (s)
                for (c = a[a.length - 1].ownerDocument, k.map(a, Ee), u = 0; u < s; u++) l = a[u], ae.test(l.type || "") && !U.access(l, "globalEval") && k.contains(c, l) && (l.src ? k._evalUrl && k._evalUrl(l.src) : v(l.textContent.replace(ke, ""), c))
        }
        return n
    }

    function Ne(e, t, n) {
        for (var r, i = t ? k.filter(t, e) : e, o = 0; null != (r = i[o]); o++) n || 1 !== r.nodeType || k.cleanData(le(r)), r.parentNode && (n && k.contains(r.ownerDocument, r) && ce(le(r, "script")), r.parentNode.removeChild(r));
        return e
    }
    k.extend({
        htmlPrefilter: function(e) {
            return e.replace(be, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var r, i, o, a, s, l, c, u = e.cloneNode(!0),
                f = k.contains(e.ownerDocument, e);
            if (!(g.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || k.isXMLDoc(e)))
                for (a = le(u), r = 0, i = (o = le(e)).length; r < i; r++) s = o[r], l = a[r], c = void 0, "input" === (c = l.nodeName.toLowerCase()) && ie.test(s.type) ? l.checked = s.checked : "input" !== c && "textarea" !== c || (l.defaultValue = s.defaultValue);
            if (t)
                if (n)
                    for (o = o || le(e), a = a || le(u), r = 0, i = o.length; r < i; r++) Se(o[r], a[r]);
                else Se(e, u);
            return 0 < (a = le(u, "script")).length && ce(a, !f && le(e, "script")), u
        },
        cleanData: function(e) {
            for (var t, n, r, i = k.event.special, o = 0; void 0 !== (n = e[o]); o++)
                if (B(n)) {
                    if (t = n[U.expando]) {
                        if (t.events)
                            for (r in t.events) i[r] ? k.event.remove(n, r) : k.removeEvent(n, r, t.handle);
                        n[U.expando] = void 0
                    }
                    n[K.expando] && (n[K.expando] = void 0)
                }
        }
    }), k.fn.extend({
        detach: function(e) {
            return Ne(this, e, !0)
        },
        remove: function(e) {
            return Ne(this, e)
        },
        text: function(e) {
            return X(this, function(e) {
                return void 0 === e ? k.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return je(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || _e(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return je(this, arguments, function(e) {
                var t;
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (t = _e(this, e)).insertBefore(e, t.firstChild)
            })
        },
        before: function() {
            return je(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return je(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (k.cleanData(le(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return k.clone(this, e, t)
            })
        },
        html: function(e) {
            return X(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                if ("string" == typeof e && !we.test(e) && !se[(oe.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = k.htmlPrefilter(e);
                    try {
                        for (; n < r; n++) 1 === (t = this[n] || {}).nodeType && (k.cleanData(le(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (e) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var n = [];
            return je(this, arguments, function(e) {
                var t = this.parentNode;
                k.inArray(this, n) < 0 && (k.cleanData(le(this)), t && t.replaceChild(e, this))
            }, n)
        }
    }), k.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, a) {
        k.fn[e] = function(e) {
            for (var t, n = [], r = k(e), i = r.length - 1, o = 0; o <= i; o++) t = o === i ? this : this.clone(!0), k(r[o])[a](t), l.apply(n, t.get());
            return this.pushStack(n)
        }
    });
    var De, Ae, qe, Le, Fe, Oe, He = /^margin/,
        Re = new RegExp("^(" + f + ")(?!px)[a-z%]+$", "i"),
        Pe = function(e) {
            var t = e.ownerDocument.defaultView;
            return t && t.opener || (t = C), t.getComputedStyle(e)
        };

    function Ie() {
        var e;
        Oe && (Oe.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", Oe.innerHTML = "", de.appendChild(Fe), e = C.getComputedStyle(Oe), De = "1%" !== e.top, Le = "2px" === e.marginLeft, Ae = "4px" === e.width, Oe.style.marginRight = "50%", qe = "4px" === e.marginRight, de.removeChild(Fe), Oe = null)
    }

    function Me(e, t, n) {
        var r, i, o = e.style;
        return (n = n || Pe(e)) && ("" !== (i = n.getPropertyValue(t) || n[t]) || k.contains(e.ownerDocument, e) || (i = k.style(e, t)), !g.pixelMarginRight() && Re.test(i) && He.test(t) && (r = o.width, e = o.minWidth, t = o.maxWidth, o.minWidth = o.maxWidth = o.width = i, i = n.width, o.width = r, o.minWidth = e, o.maxWidth = t)), void 0 !== i ? i + "" : i
    }

    function We(e, t) {
        return {
            get: function() {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }
    Fe = T.createElement("div"), (Oe = T.createElement("div")).style && (Oe.style.backgroundClip = "content-box", Oe.cloneNode(!0).style.backgroundClip = "", g.clearCloneStyle = "content-box" === Oe.style.backgroundClip, Fe.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", Fe.appendChild(Oe), k.extend(g, {
        pixelPosition: function() {
            return Ie(), De
        },
        boxSizingReliable: function() {
            return Ie(), Ae
        },
        pixelMarginRight: function() {
            return Ie(), qe
        },
        reliableMarginLeft: function() {
            return Ie(), Le
        }
    }));
    var Be = /^(none|table(?!-c[ea]).+)/,
        Xe = /^--/,
        ze = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Ue = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Ke = ["Webkit", "Moz", "ms"],
        Ve = T.createElement("div").style;

    function Ge(e) {
        return k.cssProps[e] || (k.cssProps[e] = function(e) {
            if (e in Ve) return e;
            for (var t = e[0].toUpperCase() + e.slice(1), n = Ke.length; n--;)
                if ((e = Ke[n] + t) in Ve) return e
        }(e) || e)
    }

    function Ye(e, t, n) {
        var r = J.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }

    function Qe(e, t, n, r, i) {
        for (var o = 0, a = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0; a < 4; a += 2) "margin" === n && (o += k.css(e, n + Z[a], !0, i)), r ? ("content" === n && (o -= k.css(e, "padding" + Z[a], !0, i)), "margin" !== n && (o -= k.css(e, "border" + Z[a] + "Width", !0, i))) : (o += k.css(e, "padding" + Z[a], !0, i), "padding" !== n && (o += k.css(e, "border" + Z[a] + "Width", !0, i)));
        return o
    }

    function Je(e, t, n) {
        var r, i = Pe(e),
            o = Me(e, t, i),
            a = "border-box" === k.css(e, "boxSizing", !1, i);
        return Re.test(o) ? o : (r = a && (g.boxSizingReliable() || o === e.style[t]), "auto" === o && (o = e["offset" + t[0].toUpperCase() + t.slice(1)]), (o = parseFloat(o) || 0) + Qe(e, t, n || (a ? "border" : "content"), r, i) + "px")
    }

    function Ze(e, t, n, r, i) {
        return new Ze.prototype.init(e, t, n, r, i)
    }
    k.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        e = Me(e, "opacity");
                        return "" === e ? "1" : e
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: "cssFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = k.camelCase(t),
                    l = Xe.test(t),
                    c = e.style;
                return l || (t = Ge(s)), a = k.cssHooks[t] || k.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : c[t] : ("string" === (o = typeof n) && (i = J.exec(n)) && i[1] && (n = te(e, t, i), o = "number"), void(null != n && n == n && ("number" === o && (n += i && i[3] || (k.cssNumber[s] ? "" : "px")), g.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (c[t] = "inherit"), a && "set" in a && void 0 === (n = a.set(e, n, r)) || (l ? c.setProperty(t, n) : c[t] = n))))
            }
        },
        css: function(e, t, n, r) {
            var i, o = k.camelCase(t);
            return Xe.test(t) || (t = Ge(o)), (o = k.cssHooks[t] || k.cssHooks[o]) && "get" in o && (i = o.get(e, !0, n)), void 0 === i && (i = Me(e, t, r)), "normal" === i && t in Ue && (i = Ue[t]), "" === n || n ? (t = parseFloat(i), !0 === n || isFinite(t) ? t || 0 : i) : i
        }
    }), k.each(["height", "width"], function(e, o) {
        k.cssHooks[o] = {
            get: function(e, t, n) {
                if (t) return !Be.test(k.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Je(e, o, n) : Q(e, ze, function() {
                    return Je(e, o, n)
                })
            },
            set: function(e, t, n) {
                var r, i = n && Pe(e),
                    i = n && Qe(e, o, n, "border-box" === k.css(e, "boxSizing", !1, i), i);
                return i && (r = J.exec(t)) && "px" !== (r[3] || "px") && (e.style[o] = t, t = k.css(e, o)), Ye(0, t, i)
            }
        }
    }), k.cssHooks.marginLeft = We(g.reliableMarginLeft, function(e, t) {
        if (t) return (parseFloat(Me(e, "marginLeft")) || e.getBoundingClientRect().left - Q(e, {
            marginLeft: 0
        }, function() {
            return e.getBoundingClientRect().left
        })) + "px"
    }), k.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(i, o) {
        k.cssHooks[i + o] = {
            expand: function(e) {
                for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++) n[i + Z[t] + o] = r[t] || r[t - 2] || r[0];
                return n
            }
        }, He.test(i) || (k.cssHooks[i + o].set = Ye)
    }), k.fn.extend({
        css: function(e, t) {
            return X(this, function(e, t, n) {
                var r, i, o = {},
                    a = 0;
                if (Array.isArray(t)) {
                    for (r = Pe(e), i = t.length; a < i; a++) o[t[a]] = k.css(e, t[a], !1, r);
                    return o
                }
                return void 0 !== n ? k.style(e, t, n) : k.css(e, t)
            }, e, t, 1 < arguments.length)
        }
    }), (k.Tween = Ze).prototype = {
        constructor: Ze,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || k.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (k.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = Ze.propHooks[this.prop];
            return (e && e.get ? e : Ze.propHooks._default).get(this)
        },
        run: function(e) {
            var t, n = Ze.propHooks[this.prop];
            return this.options.duration ? this.pos = t = k.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), (n && n.set ? n : Ze.propHooks._default).set(this), this
        }
    }, Ze.prototype.init.prototype = Ze.prototype, Ze.propHooks = {
        _default: {
            get: function(e) {
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (e = k.css(e.elem, e.prop, "")) && "auto" !== e ? e : 0
            },
            set: function(e) {
                k.fx.step[e.prop] ? k.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[k.cssProps[e.prop]] && !k.cssHooks[e.prop] ? e.elem[e.prop] = e.now : k.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }, Ze.propHooks.scrollTop = Ze.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, k.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, k.fx = Ze.prototype.init, k.fx.step = {};
    var et, tt, nt = /^(?:toggle|show|hide)$/,
        rt = /queueHooks$/;

    function it() {
        tt && (!1 === T.hidden && C.requestAnimationFrame ? C.requestAnimationFrame(it) : C.setTimeout(it, k.fx.interval), k.fx.tick())
    }

    function ot() {
        return C.setTimeout(function() {
            et = void 0
        }), et = k.now()
    }

    function at(e, t) {
        var n, r = 0,
            i = {
                height: e
            };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) i["margin" + (n = Z[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function st(e, t, n) {
        for (var r, i = (lt.tweeners[t] || []).concat(lt.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e)) return r
    }

    function lt(i, e, t) {
        var n, o, r = 0,
            a = lt.prefilters.length,
            s = k.Deferred().always(function() {
                delete l.elem
            }),
            l = function() {
                if (o) return !1;
                for (var e = et || ot(), e = Math.max(0, c.startTime + c.duration - e), t = 1 - (e / c.duration || 0), n = 0, r = c.tweens.length; n < r; n++) c.tweens[n].run(t);
                return s.notifyWith(i, [c, t, e]), t < 1 && r ? e : (r || s.notifyWith(i, [c, 1, 0]), s.resolveWith(i, [c]), !1)
            },
            c = s.promise({
                elem: i,
                props: k.extend({}, e),
                opts: k.extend(!0, {
                    specialEasing: {},
                    easing: k.easing._default
                }, t),
                originalProperties: e,
                originalOptions: t,
                startTime: et || ot(),
                duration: t.duration,
                tweens: [],
                createTween: function(e, t) {
                    e = k.Tween(i, c.opts, e, t, c.opts.specialEasing[e] || c.opts.easing);
                    return c.tweens.push(e), e
                },
                stop: function(e) {
                    var t = 0,
                        n = e ? c.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; t < n; t++) c.tweens[t].run(1);
                    return e ? (s.notifyWith(i, [c, 1, 0]), s.resolveWith(i, [c, e])) : s.rejectWith(i, [c, e]), this
                }
            }),
            u = c.props;
        for (function(e, t) {
            var n, r, i, o, a;
            for (n in e)
                if (r = k.camelCase(n), i = t[r], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), a = k.cssHooks[r], a && "expand" in a)
                    for (n in o = a.expand(o), delete e[r], o) n in e || (e[n] = o[n], t[n] = i);
                else t[r] = i
        }(u, c.opts.specialEasing); r < a; r++)
            if (n = lt.prefilters[r].call(c, i, u, c.opts)) return k.isFunction(n.stop) && (k._queueHooks(c.elem, c.opts.queue).stop = k.proxy(n.stop, n)), n;
        return k.map(u, st, c), k.isFunction(c.opts.start) && c.opts.start.call(i, c), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always), k.fx.timer(k.extend(l, {
            elem: i,
            anim: c,
            queue: c.opts.queue
        })), c
    }
    k.Animation = k.extend(lt, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return te(n.elem, e, J.exec(t), n), n
            }]
        },
        tweener: function(e, t) {
            for (var n, r = 0, i = (e = k.isFunction(e) ? (t = e, ["*"]) : e.match(O)).length; r < i; r++) n = e[r], lt.tweeners[n] = lt.tweeners[n] || [], lt.tweeners[n].unshift(t)
        },
        prefilters: [function(e, t, n) {
            var r, i, o, a, s, l, c, u = "width" in t || "height" in t,
                f = this,
                d = {},
                p = e.style,
                h = e.nodeType && ee(e),
                m = U.get(e, "fxshow");
            for (r in n.queue || (null == (a = k._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
                a.unqueued || s()
            }), a.unqueued++, f.always(function() {
                f.always(function() {
                    a.unqueued--, k.queue(e, "fx").length || a.empty.fire()
                })
            })), t)
                if (i = t[r], nt.test(i)) {
                    if (delete t[r], o = o || "toggle" === i, i === (h ? "hide" : "show")) {
                        if ("show" !== i || !m || void 0 === m[r]) continue;
                        h = !0
                    }
                    d[r] = m && m[r] || k.style(e, r)
                } if ((l = !k.isEmptyObject(t)) || !k.isEmptyObject(d))
                for (r in u && 1 === e.nodeType && (n.overflow = [p.overflow, p.overflowX, p.overflowY], null == (c = m && m.display) && (c = U.get(e, "display")), "none" === (u = k.css(e, "display")) && (c ? u = c : (re([e], !0), c = e.style.display || c, u = k.css(e, "display"), re([e]))), ("inline" === u || "inline-block" === u && null != c) && "none" === k.css(e, "float") && (l || (f.done(function() {
                    p.display = c
                }), null == c && (u = p.display, c = "none" === u ? "" : u)), p.display = "inline-block")), n.overflow && (p.overflow = "hidden", f.always(function() {
                    p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2]
                })), l = !1, d) l || (m ? "hidden" in m && (h = m.hidden) : m = U.access(e, "fxshow", {
                    display: c
                }), o && (m.hidden = !h), h && re([e], !0), f.done(function() {
                    for (r in h || re([e]), U.remove(e, "fxshow"), d) k.style(e, r, d[r])
                })), l = st(h ? m[r] : 0, r, f), r in m || (m[r] = l.start, h && (l.end = l.start, l.start = 0))
        }],
        prefilter: function(e, t) {
            t ? lt.prefilters.unshift(e) : lt.prefilters.push(e)
        }
    }), k.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? k.extend({}, e) : {
            complete: n || !n && t || k.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !k.isFunction(t) && t
        };
        return k.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in k.fx.speeds ? r.duration = k.fx.speeds[r.duration] : r.duration = k.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            k.isFunction(r.old) && r.old.call(this), r.queue && k.dequeue(this, r.queue)
        }, r
    }, k.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(ee).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(t, e, n, r) {
            var i = k.isEmptyObject(t),
                o = k.speed(e, n, r),
                r = function() {
                    var e = lt(this, k.extend({}, t), o);
                    (i || U.get(this, "finish")) && e.stop(!0)
                };
            return r.finish = r, i || !1 === o.queue ? this.each(r) : this.queue(o.queue, r)
        },
        stop: function(i, e, o) {
            function a(e) {
                var t = e.stop;
                delete e.stop, t(o)
            }
            return "string" != typeof i && (o = e, e = i, i = void 0), e && !1 !== i && this.queue(i || "fx", []), this.each(function() {
                var e = !0,
                    t = null != i && i + "queueHooks",
                    n = k.timers,
                    r = U.get(this);
                if (t) r[t] && r[t].stop && a(r[t]);
                else
                    for (t in r) r[t] && r[t].stop && rt.test(t) && a(r[t]);
                for (t = n.length; t--;) n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
                !e && o || k.dequeue(this, i)
            })
        },
        finish: function(a) {
            return !1 !== a && (a = a || "fx"), this.each(function() {
                var e, t = U.get(this),
                    n = t[a + "queue"],
                    r = t[a + "queueHooks"],
                    i = k.timers,
                    o = n ? n.length : 0;
                for (t.finish = !0, k.queue(this, a, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--;) i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), i.splice(e, 1));
                for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this);
                delete t.finish
            })
        }
    }), k.each(["toggle", "show", "hide"], function(e, r) {
        var i = k.fn[r];
        k.fn[r] = function(e, t, n) {
            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(at(r, !0), e, t, n)
        }
    }), k.each({
        slideDown: at("show"),
        slideUp: at("hide"),
        slideToggle: at("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, r) {
        k.fn[e] = function(e, t, n) {
            return this.animate(r, e, t, n)
        }
    }), k.timers = [], k.fx.tick = function() {
        var e, t = 0,
            n = k.timers;
        for (et = k.now(); t < n.length; t++)(e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || k.fx.stop(), et = void 0
    }, k.fx.timer = function(e) {
        k.timers.push(e), k.fx.start()
    }, k.fx.interval = 13, k.fx.start = function() {
        tt || (tt = !0, it())
    }, k.fx.stop = function() {
        tt = null
    }, k.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, k.fn.delay = function(r, e) {
        return r = k.fx && k.fx.speeds[r] || r, e = e || "fx", this.queue(e, function(e, t) {
            var n = C.setTimeout(e, r);
            t.stop = function() {
                C.clearTimeout(n)
            }
        })
    }, t = T.createElement("input"), f = T.createElement("select").appendChild(T.createElement("option")), t.type = "checkbox", g.checkOn = "" !== t.value, g.optSelected = f.selected, (t = T.createElement("input")).value = "t", t.type = "radio", g.radioValue = "t" === t.value;
    var ct, ut = k.expr.attrHandle;
    k.fn.extend({
        attr: function(e, t) {
            return X(this, k.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each(function() {
                k.removeAttr(this, e)
            })
        }
    }), k.extend({
        attr: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return void 0 === e.getAttribute ? k.prop(e, t, n) : (1 === o && k.isXMLDoc(e) || (i = k.attrHooks[t.toLowerCase()] || (k.expr.match.bool.test(t) ? ct : void 0)), void 0 !== n ? null === n ? void k.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = k.find.attr(e, t)) ? void 0 : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!g.radioValue && "radio" === t && E(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n, r = 0,
                i = t && t.match(O);
            if (i && 1 === e.nodeType)
                for (; n = i[r++];) e.removeAttribute(n)
        }
    }), ct = {
        set: function(e, t, n) {
            return !1 === t ? k.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, k.each(k.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var a = ut[t] || k.find.attr;
        ut[t] = function(e, t, n) {
            var r, i, o = t.toLowerCase();
            return n || (i = ut[o], ut[o] = r, r = null != a(e, t, n) ? o : null, ut[o] = i), r
        }
    });
    var ft = /^(?:input|select|textarea|button)$/i,
        dt = /^(?:a|area)$/i;

    function pt(e) {
        return (e.match(O) || []).join(" ")
    }

    function ht(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }
    k.fn.extend({
        prop: function(e, t) {
            return X(this, k.prop, e, t, 1 < arguments.length)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[k.propFix[e] || e]
            })
        }
    }), k.extend({
        prop: function(e, t, n) {
            var r, i, o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o) return 1 === o && k.isXMLDoc(e) || (t = k.propFix[t] || t, i = k.propHooks[t]), void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = k.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : ft.test(e.nodeName) || dt.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            for: "htmlFor",
            class: "className"
        }
    }), g.optSelected || (k.propHooks.selected = {
        get: function(e) {
            e = e.parentNode;
            return e && e.parentNode && e.parentNode.selectedIndex, null
        },
        set: function(e) {
            e = e.parentNode;
            e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
        }
    }), k.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        k.propFix[this.toLowerCase()] = this
    }), k.fn.extend({
        addClass: function(t) {
            var e, n, r, i, o, a, s = 0;
            if (k.isFunction(t)) return this.each(function(e) {
                k(this).addClass(t.call(this, e, ht(this)))
            });
            if ("string" == typeof t && t)
                for (e = t.match(O) || []; n = this[s++];)
                    if (a = ht(n), r = 1 === n.nodeType && " " + pt(a) + " ") {
                        for (o = 0; i = e[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                        a !== (a = pt(r)) && n.setAttribute("class", a)
                    } return this
        },
        removeClass: function(t) {
            var e, n, r, i, o, a, s = 0;
            if (k.isFunction(t)) return this.each(function(e) {
                k(this).removeClass(t.call(this, e, ht(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof t && t)
                for (e = t.match(O) || []; n = this[s++];)
                    if (a = ht(n), r = 1 === n.nodeType && " " + pt(a) + " ") {
                        for (o = 0; i = e[o++];)
                            for (; - 1 < r.indexOf(" " + i + " ");) r = r.replace(" " + i + " ", " ");
                        a !== (a = pt(r)) && n.setAttribute("class", a)
                    } return this
        },
        toggleClass: function(i, t) {
            var o = typeof i;
            return "boolean" == typeof t && "string" == o ? t ? this.addClass(i) : this.removeClass(i) : k.isFunction(i) ? this.each(function(e) {
                k(this).toggleClass(i.call(this, e, ht(this), t), t)
            }) : this.each(function() {
                var e, t, n, r;
                if ("string" == o)
                    for (t = 0, n = k(this), r = i.match(O) || []; e = r[t++];) n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                else void 0 !== i && "boolean" != o || ((e = ht(this)) && U.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", !e && !1 !== i && U.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            for (var t, n = 0, r = " " + e + " "; t = this[n++];)
                if (1 === t.nodeType && -1 < (" " + pt(ht(t)) + " ").indexOf(r)) return !0;
            return !1
        }
    });
    var mt = /\r/g;
    k.fn.extend({
        val: function(t) {
            var n, e, r, i = this[0];
            return arguments.length ? (r = k.isFunction(t), this.each(function(e) {
                1 === this.nodeType && (null == (e = r ? t.call(this, e, k(this).val()) : t) ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = k.map(e, function(e) {
                    return null == e ? "" : e + ""
                })), (n = k.valHooks[this.type] || k.valHooks[this.nodeName.toLowerCase()]) && "set" in n && void 0 !== n.set(this, e, "value") || (this.value = e))
            })) : i ? (n = k.valHooks[i.type] || k.valHooks[i.nodeName.toLowerCase()]) && "get" in n && void 0 !== (e = n.get(i, "value")) ? e : "string" == typeof(e = i.value) ? e.replace(mt, "") : null == e ? "" : e : void 0
        }
    }), k.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = k.find.attr(e, "value");
                    return null != t ? t : pt(k.text(e))
                }
            },
            select: {
                get: function(e) {
                    for (var t, n = e.options, r = e.selectedIndex, i = "select-one" === e.type, o = i ? null : [], a = i ? r + 1 : n.length, s = r < 0 ? a : i ? r : 0; s < a; s++)
                        if (((t = n[s]).selected || s === r) && !t.disabled && (!t.parentNode.disabled || !E(t.parentNode, "optgroup"))) {
                            if (t = k(t).val(), i) return t;
                            o.push(t)
                        } return o
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = k.makeArray(t), a = i.length; a--;)((r = i[a]).selected = -1 < k.inArray(k.valHooks.option.get(r), o)) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), k.each(["radio", "checkbox"], function() {
        k.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t)) return e.checked = -1 < k.inArray(k(e).val(), t)
            }
        }, g.checkOn || (k.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var gt = /^(?:focusinfocus|focusoutblur)$/;
    k.extend(k.event, {
        trigger: function(e, t, n, r) {
            var i, o, a, s, l, c, u = [n || T],
                f = h.call(e, "type") ? e.type : e,
                d = h.call(e, "namespace") ? e.namespace.split(".") : [],
                p = o = n = n || T;
            if (3 !== n.nodeType && 8 !== n.nodeType && !gt.test(f + k.event.triggered) && (-1 < f.indexOf(".") && (f = (d = f.split(".")).shift(), d.sort()), s = f.indexOf(":") < 0 && "on" + f, (e = e[k.expando] ? e : new k.Event(f, "object" == typeof e && e)).isTrigger = r ? 2 : 3, e.namespace = d.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = n), t = null == t ? [e] : k.makeArray(t, [e]), c = k.event.special[f] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
                if (!r && !c.noBubble && !k.isWindow(n)) {
                    for (a = c.delegateType || f, gt.test(a + f) || (p = p.parentNode); p; p = p.parentNode) u.push(p), o = p;
                    o === (n.ownerDocument || T) && u.push(o.defaultView || o.parentWindow || C)
                }
                for (i = 0;
                     (p = u[i++]) && !e.isPropagationStopped();) e.type = 1 < i ? a : c.bindType || f, (l = (U.get(p, "events") || {})[e.type] && U.get(p, "handle")) && l.apply(p, t), (l = s && p[s]) && l.apply && B(p) && (e.result = l.apply(p, t), !1 === e.result && e.preventDefault());
                return e.type = f, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(u.pop(), t) || !B(n) || s && k.isFunction(n[f]) && !k.isWindow(n) && ((o = n[s]) && (n[s] = null), n[k.event.triggered = f](), k.event.triggered = void 0, o && (n[s] = o)), e.result
            }
        },
        simulate: function(e, t, n) {
            e = k.extend(new k.Event, n, {
                type: e,
                isSimulated: !0
            });
            k.event.trigger(e, null, t)
        }
    }), k.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                k.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) return k.event.trigger(e, t, n, !0)
        }
    }), k.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
        k.fn[n] = function(e, t) {
            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
        }
    }), k.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), g.focusin = "onfocusin" in C, g.focusin || k.each({
        focus: "focusin",
        blur: "focusout"
    }, function(n, r) {
        function i(e) {
            k.event.simulate(r, e.target, k.event.fix(e))
        }
        k.event.special[r] = {
            setup: function() {
                var e = this.ownerDocument || this,
                    t = U.access(e, r);
                t || e.addEventListener(n, i, !0), U.access(e, r, (t || 0) + 1)
            },
            teardown: function() {
                var e = this.ownerDocument || this,
                    t = U.access(e, r) - 1;
                t ? U.access(e, r, t) : (e.removeEventListener(n, i, !0), U.remove(e, r))
            }
        }
    });
    var vt = C.location,
        yt = k.now(),
        xt = /\?/;
    k.parseXML = function(e) {
        var t;
        if (!e || "string" != typeof e) return null;
        try {
            t = (new C.DOMParser).parseFromString(e, "text/xml")
        } catch (e) {
            t = void 0
        }
        return t && !t.getElementsByTagName("parsererror").length || k.error("Invalid XML: " + e), t
    };
    var bt = /\[\]$/,
        wt = /\r?\n/g,
        Ct = /^(?:submit|button|image|reset|file)$/i,
        Tt = /^(?:input|select|textarea|keygen)/i;
    k.param = function(e, t) {
        function n(e, t) {
            t = k.isFunction(t) ? t() : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == t ? "" : t)
        }
        var r, i = [];
        if (Array.isArray(e) || e.jquery && !k.isPlainObject(e)) k.each(e, function() {
            n(this.name, this.value)
        });
        else
            for (r in e) ! function n(r, e, i, o) {
                if (Array.isArray(e)) k.each(e, function(e, t) {
                    i || bt.test(r) ? o(r, t) : n(r + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, i, o)
                });
                else if (i || "object" !== k.type(e)) o(r, e);
                else
                    for (var t in e) n(r + "[" + t + "]", e[t], i, o)
            }(r, e[r], t, n);
        return i.join("&")
    }, k.fn.extend({
        serialize: function() {
            return k.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = k.prop(this, "elements");
                return e ? k.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !k(this).is(":disabled") && Tt.test(this.nodeName) && !Ct.test(e) && (this.checked || !ie.test(e))
            }).map(function(e, t) {
                var n = k(this).val();
                return null == n ? null : Array.isArray(n) ? k.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(wt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(wt, "\r\n")
                }
            }).get()
        }
    });
    var kt = /%20/g,
        _t = /#.*$/,
        $t = /([?&])_=[^&]*/,
        Et = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        St = /^(?:GET|HEAD)$/,
        jt = /^\/\//,
        Nt = {},
        Dt = {},
        At = "*/".concat("*"),
        qt = T.createElement("a");

    function Lt(o) {
        return function(e, t) {
            "string" != typeof e && (t = e, e = "*");
            var n, r = 0,
                i = e.toLowerCase().match(O) || [];
            if (k.isFunction(t))
                for (; n = i[r++];) "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
        }
    }

    function Ft(t, r, i, o) {
        var a = {},
            s = t === Dt;

        function l(e) {
            var n;
            return a[e] = !0, k.each(t[e] || [], function(e, t) {
                t = t(r, i, o);
                return "string" != typeof t || s || a[t] ? s ? !(n = t) : void 0 : (r.dataTypes.unshift(t), l(t), !1)
            }), n
        }
        return l(r.dataTypes[0]) || !a["*"] && l("*")
    }

    function Ot(e, t) {
        var n, r, i = k.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e : r = r || {})[n] = t[n]);
        return r && k.extend(!0, e, r), e
    }
    qt.href = vt.href, k.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: vt.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(vt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": At,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": k.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Ot(Ot(e, k.ajaxSettings), t) : Ot(k.ajaxSettings, e)
        },
        ajaxPrefilter: Lt(Nt),
        ajaxTransport: Lt(Dt),
        ajax: function(e, t) {
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var l, c, u, n, f, r, d, p, i, h = k.ajaxSetup({}, t),
                m = h.context || h,
                g = h.context && (m.nodeType || m.jquery) ? k(m) : k.event,
                v = k.Deferred(),
                y = k.Callbacks("once memory"),
                x = h.statusCode || {},
                o = {},
                a = {},
                s = "canceled",
                b = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (d) {
                            if (!n)
                                for (n = {}; t = Et.exec(u);) n[t[1].toLowerCase()] = t[2];
                            t = n[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return d ? u : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == d && (e = a[e.toLowerCase()] = a[e.toLowerCase()] || e, o[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return null == d && (h.mimeType = e), this
                    },
                    statusCode: function(e) {
                        if (e)
                            if (d) b.always(e[b.status]);
                            else
                                for (var t in e) x[t] = [x[t], e[t]];
                        return this
                    },
                    abort: function(e) {
                        e = e || s;
                        return l && l.abort(e), w(0, e), this
                    }
                };
            if (v.promise(b), h.url = ((e || h.url || vt.href) + "").replace(jt, vt.protocol + "//"), h.type = t.method || t.type || h.method || h.type, h.dataTypes = (h.dataType || "*").toLowerCase().match(O) || [""], null == h.crossDomain) {
                r = T.createElement("a");
                try {
                    r.href = h.url, r.href = r.href, h.crossDomain = qt.protocol + "//" + qt.host != r.protocol + "//" + r.host
                } catch (e) {
                    h.crossDomain = !0
                }
            }
            if (h.data && h.processData && "string" != typeof h.data && (h.data = k.param(h.data, h.traditional)), Ft(Nt, h, t, b), d) return b;
            for (i in (p = k.event && h.global) && 0 == k.active++ && k.event.trigger("ajaxStart"), h.type = h.type.toUpperCase(), h.hasContent = !St.test(h.type), c = h.url.replace(_t, ""), h.hasContent ? h.data && h.processData && 0 === (h.contentType || "").indexOf("application/x-www-form-urlencoded") && (h.data = h.data.replace(kt, "+")) : (e = h.url.slice(c.length), h.data && (c += (xt.test(c) ? "&" : "?") + h.data, delete h.data), !1 === h.cache && (c = c.replace($t, "$1"), e = (xt.test(c) ? "&" : "?") + "_=" + yt++ + e), h.url = c + e), h.ifModified && (k.lastModified[c] && b.setRequestHeader("If-Modified-Since", k.lastModified[c]), k.etag[c] && b.setRequestHeader("If-None-Match", k.etag[c])), (h.data && h.hasContent && !1 !== h.contentType || t.contentType) && b.setRequestHeader("Content-Type", h.contentType), b.setRequestHeader("Accept", h.dataTypes[0] && h.accepts[h.dataTypes[0]] ? h.accepts[h.dataTypes[0]] + ("*" !== h.dataTypes[0] ? ", " + At + "; q=0.01" : "") : h.accepts["*"]), h.headers) b.setRequestHeader(i, h.headers[i]);
            if (h.beforeSend && (!1 === h.beforeSend.call(m, b, h) || d)) return b.abort();
            if (s = "abort", y.add(h.complete), b.done(h.success), b.fail(h.error), l = Ft(Dt, h, t, b)) {
                if (b.readyState = 1, p && g.trigger("ajaxSend", [b, h]), d) return b;
                h.async && 0 < h.timeout && (f = C.setTimeout(function() {
                    b.abort("timeout")
                }, h.timeout));
                try {
                    d = !1, l.send(o, w)
                } catch (e) {
                    if (d) throw e;
                    w(-1, e)
                }
            } else w(-1, "No Transport");

            function w(e, t, n, r) {
                var i, o, a, s = t;
                d || (d = !0, f && C.clearTimeout(f), l = void 0, u = r || "", b.readyState = 0 < e ? 4 : 0, r = 200 <= e && e < 300 || 304 === e, n && (a = function(e, t, n) {
                    for (var r, i, o, a, s = e.contents, l = e.dataTypes;
                         "*" === l[0];) l.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (r)
                        for (i in s)
                            if (s[i] && s[i].test(r)) {
                                l.unshift(i);
                                break
                            } if (l[0] in n) o = l[0];
                    else {
                        for (i in n) {
                            if (!l[0] || e.converters[i + " " + l[0]]) {
                                o = i;
                                break
                            }
                            a = a || i
                        }
                        o = o || a
                    }
                    if (o) return o !== l[0] && l.unshift(o), n[o]
                }(h, b, n)), a = function(e, t, n, r) {
                    var i, o, a, s, l, c = {},
                        u = e.dataTypes.slice();
                    if (u[1])
                        for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
                    for (o = u.shift(); o;)
                        if (e.responseFields[o] && (n[e.responseFields[o]] = t), !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), l = o, o = u.shift())
                            if ("*" === o) o = l;
                            else if ("*" !== l && l !== o) {
                                if (!(a = c[l + " " + o] || c["* " + o]))
                                    for (i in c)
                                        if (s = i.split(" "), s[1] === o && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
                                            !0 === a ? a = c[i] : !0 !== c[i] && (o = s[0], u.unshift(s[1]));
                                            break
                                        } if (!0 !== a)
                                    if (a && e.throws) t = a(t);
                                    else try {
                                        t = a(t)
                                    } catch (e) {
                                        return {
                                            state: "parsererror",
                                            error: a ? e : "No conversion from " + l + " to " + o
                                        }
                                    }
                            }
                    return {
                        state: "success",
                        data: t
                    }
                }(h, a, b, r), r ? (h.ifModified && ((n = b.getResponseHeader("Last-Modified")) && (k.lastModified[c] = n), (n = b.getResponseHeader("etag")) && (k.etag[c] = n)), 204 === e || "HEAD" === h.type ? s = "nocontent" : 304 === e ? s = "notmodified" : (s = a.state, i = a.data, r = !(o = a.error))) : (o = s, !e && s || (s = "error", e < 0 && (e = 0))), b.status = e, b.statusText = (t || s) + "", r ? v.resolveWith(m, [i, s, b]) : v.rejectWith(m, [b, s, o]), b.statusCode(x), x = void 0, p && g.trigger(r ? "ajaxSuccess" : "ajaxError", [b, h, r ? i : o]), y.fireWith(m, [b, s]), p && (g.trigger("ajaxComplete", [b, h]), --k.active || k.event.trigger("ajaxStop")))
            }
            return b
        },
        getJSON: function(e, t, n) {
            return k.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return k.get(e, void 0, t, "script")
        }
    }), k.each(["get", "post"], function(e, i) {
        k[i] = function(e, t, n, r) {
            return k.isFunction(t) && (r = r || n, n = t, t = void 0), k.ajax(k.extend({
                url: e,
                type: i,
                dataType: r,
                data: t,
                success: n
            }, k.isPlainObject(e) && e))
        }
    }), k._evalUrl = function(e) {
        return k.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            throws: !0
        })
    }, k.fn.extend({
        wrapAll: function(e) {
            return this[0] && (k.isFunction(e) && (e = e.call(this[0])), e = k(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function(n) {
            return k.isFunction(n) ? this.each(function(e) {
                k(this).wrapInner(n.call(this, e))
            }) : this.each(function() {
                var e = k(this),
                    t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n)
            })
        },
        wrap: function(t) {
            var n = k.isFunction(t);
            return this.each(function(e) {
                k(this).wrapAll(n ? t.call(this, e) : t)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                k(this).replaceWith(this.childNodes)
            }), this
        }
    }), k.expr.pseudos.hidden = function(e) {
        return !k.expr.pseudos.visible(e)
    }, k.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, k.ajaxSettings.xhr = function() {
        try {
            return new C.XMLHttpRequest
        } catch (e) {}
    };
    var Ht = {
            0: 200,
            1223: 204
        },
        Rt = k.ajaxSettings.xhr();
    g.cors = !!Rt && "withCredentials" in Rt, g.ajax = Rt = !!Rt, k.ajaxTransport(function(i) {
        var o, a;
        if (g.cors || Rt && !i.crossDomain) return {
            send: function(e, t) {
                var n, r = i.xhr();
                if (r.open(i.type, i.url, i.async, i.username, i.password), i.xhrFields)
                    for (n in i.xhrFields) r[n] = i.xhrFields[n];
                for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType), i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e) r.setRequestHeader(n, e[n]);
                o = function(e) {
                    return function() {
                        o && (o = a = r.onload = r.onerror = r.onabort = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Ht[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
                            binary: r.response
                        } : {
                            text: r.responseText
                        }, r.getAllResponseHeaders()))
                    }
                }, r.onload = o(), a = r.onerror = o("error"), void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function() {
                    4 === r.readyState && C.setTimeout(function() {
                        o && a()
                    })
                }, o = o("abort");
                try {
                    r.send(i.hasContent && i.data || null)
                } catch (e) {
                    if (o) throw e
                }
            },
            abort: function() {
                o && o()
            }
        }
    }), k.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }), k.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return k.globalEval(e), e
            }
        }
    }), k.ajaxPrefilter("script", function(e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), k.ajaxTransport("script", function(n) {
        var r, i;
        if (n.crossDomain) return {
            send: function(e, t) {
                r = k("<script>").prop({
                    charset: n.scriptCharset,
                    src: n.url
                }).on("load error", i = function(e) {
                    r.remove(), i = null, e && t("error" === e.type ? 404 : 200, e.type)
                }), T.head.appendChild(r[0])
            },
            abort: function() {
                i && i()
            }
        }
    });
    var Pt = [],
        It = /(=)\?(?=&|$)|\?\?/;
    k.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Pt.pop() || k.expando + "_" + yt++;
            return this[e] = !0, e
        }
    }), k.ajaxPrefilter("json jsonp", function(e, t, n) {
        var r, i, o, a = !1 !== e.jsonp && (It.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && It.test(e.data) && "data");
        if (a || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = k.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(It, "$1" + r) : !1 !== e.jsonp && (e.url += (xt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
            return o || k.error(r + " was not called"), o[0]
        }, e.dataTypes[0] = "json", i = C[r], C[r] = function() {
            o = arguments
        }, n.always(function() {
            void 0 === i ? k(C).removeProp(r) : C[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, Pt.push(r)), o && k.isFunction(i) && i(o[0]), o = i = void 0
        }), "script"
    }), g.createHTMLDocument = ((t = T.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === t.childNodes.length), k.parseHTML = function(e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (g.createHTMLDocument ? ((r = (t = T.implementation.createHTMLDocument("")).createElement("base")).href = T.location.href, t.head.appendChild(r)) : t = T), r = !n && [], (n = S.exec(e)) ? [t.createElement(n[1])] : (n = fe([e], t, r), r && r.length && k(r).remove(), k.merge([], n.childNodes)));
        var r
    }, k.fn.load = function(e, t, n) {
        var r, i, o, a = this,
            s = e.indexOf(" ");
        return -1 < s && (r = pt(e.slice(s)), e = e.slice(0, s)), k.isFunction(t) ? (n = t, t = void 0) : t && "object" == typeof t && (i = "POST"), 0 < a.length && k.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, a.html(r ? k("<div>").append(k.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }), this
    }, k.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        k.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), k.expr.pseudos.animated = function(t) {
        return k.grep(k.timers, function(e) {
            return t === e.elem
        }).length
    }, k.offset = {
        setOffset: function(e, t, n) {
            var r, i, o, a, s = k.css(e, "position"),
                l = k(e),
                c = {};
            "static" === s && (e.style.position = "relative"), o = l.offset(), r = k.css(e, "top"), a = k.css(e, "left"), a = ("absolute" === s || "fixed" === s) && -1 < (r + a).indexOf("auto") ? (i = (s = l.position()).top, s.left) : (i = parseFloat(r) || 0, parseFloat(a) || 0), k.isFunction(t) && (t = t.call(e, n, k.extend({}, o))), null != t.top && (c.top = t.top - o.top + i), null != t.left && (c.left = t.left - o.left + a), "using" in t ? t.using.call(e, c) : l.css(c)
        }
    }, k.fn.extend({
        offset: function(t) {
            if (arguments.length) return void 0 === t ? this : this.each(function(e) {
                k.offset.setOffset(this, t, e)
            });
            var e, n, r = this[0];
            return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(), r = (n = r.ownerDocument).documentElement, n = n.defaultView, {
                top: e.top + n.pageYOffset - r.clientTop,
                left: e.left + n.pageXOffset - r.clientLeft
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e, t, n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === k.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), E(e[0], "html") || (r = e.offset()), r = {
                    top: r.top + k.css(e[0], "borderTopWidth", !0),
                    left: r.left + k.css(e[0], "borderLeftWidth", !0)
                }), {
                    top: t.top - r.top - k.css(n, "marginTop", !0),
                    left: t.left - r.left - k.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === k.css(e, "position");) e = e.offsetParent;
                return e || de
            })
        }
    }), k.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, i) {
        var o = "pageYOffset" === i;
        k.fn[t] = function(e) {
            return X(this, function(e, t, n) {
                var r;
                return k.isWindow(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), void 0 === n ? r ? r[i] : e[t] : void(r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n)
            }, t, e, arguments.length)
        }
    }), k.each(["top", "left"], function(e, n) {
        k.cssHooks[n] = We(g.pixelPosition, function(e, t) {
            if (t) return t = Me(e, n), Re.test(t) ? k(e).position()[n] + "px" : t
        })
    }), k.each({
        Height: "height",
        Width: "width"
    }, function(a, s) {
        k.each({
            padding: "inner" + a,
            content: s,
            "": "outer" + a
        }, function(r, o) {
            k.fn[o] = function(e, t) {
                var n = arguments.length && (r || "boolean" != typeof e),
                    i = r || (!0 === e || !0 === t ? "margin" : "border");
                return X(this, function(e, t, n) {
                    var r;
                    return k.isWindow(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? k.css(e, t, i) : k.style(e, t, n, i)
                }, s, n ? e : void 0, n)
            }
        })
    }), k.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), k.holdReady = function(e) {
        e ? k.readyWait++ : k.ready(!0)
    }, k.isArray = Array.isArray, k.parseJSON = JSON.parse, k.nodeName = E, "function" == typeof define && define.amd && define("jquery", [], function() {
        return k
    });
    var Mt = C.jQuery,
        Wt = C.$;
    return k.noConflict = function(e) {
        return C.$ === k && (C.$ = Wt), e && C.jQuery === k && (C.jQuery = Mt), k
    }, e || (C.jQuery = C.$ = k), k
}), $("#menu_btn").click(function(e) {
    e.preventDefault();
    var t = $("#menu_nav"),
        e = $("body");
    $(this).toggleClass("active"), t.slideToggle("fast"), e.toggleClass("body-menu_nav_opending")
}), $("#menu_nav_close").click(function(e) {
    e.preventDefault(), $("#menu_btn").removeClass("active"), $("#menu_nav").hide("fast"), $("body").removeClass("body-menu_nav_opending")
}), $(".my-profile-title").click(function(e) {
    e.preventDefault();
    e = $(".my-profile-detail");
    $(this).toggleClass("active"), e.slideToggle("fast")
}), $(".navbar-toggler").on("click", function(e) {
    e.preventDefault(), $(this).next(".navbar-collapse").slideToggle().toggleClass("show")
}), $(".dropdown").on("click", ".dropdown-toggle", function(e) {
    e.preventDefault(), $(this).next(".dropdown-menu").slideToggle("fast").toggleClass("show"), $(this).parent(".dropdown").toggleClass("show")
}), $("form.form_verify :submit").click(function(e) {
    e.preventDefault();
    var t = $(this).parents("form"),
        e = t.find("input[name=verify_code]").val();
    "" === e || e.length < 6 ? t.addClass("was-validated") : (t.submit(), t.find("input, button, textarea").attr("disabled", "disabled"))
}), $("form.check_validation :submit").click(function(e) {
    e.preventDefault();
    var e = $(this).parents("form"),
        t = !0;
    e.find("input,textarea,select").filter("[required]:visible").each(function() {
        "" === $(this).val() && (t = !1)
    }), t ? (e.submit(), e.find("input, button, select, textarea").attr("disabled", "disabled")) : e.addClass("was-validated")
}), $(".btn_oneclick").click(function() {
    $(this).css("pointer-events", "none"), $(this).css("opacity", ".5")
}), $("#tutor_kind_choice input[name=tutor_kind]").on("change", function() {
    var e = $(this).val();
    $(".tutor-kind-field").hide(), $("#tutor_kind_field_" + e).show()
}), $("#experience_choice_group input[name=experience_choice]").on("change", function() {
    var e = $(this).val();
    $(".experience-field").hide(), $("#experience_field_" + e).show()
}), $("#family_choice_group input[name=family_choice]").on("change", function() {
    var e = $(this).val(),
        t = $(".family-field");
    1 == e ? t.show() : t.hide()
}), $(".btn_action_ncf").click(function(e) {
    e.preventDefault(), btn_need_confirm($(this).data("url"), $(this).data("value"), $(this).data("color"), $(this).data("method"))
}), $("#my_overlay").on("click", ".btn-cancel", function(e) {
    e.preventDefault();
    var t = $(this).parents(".modal"),
        e = $("#my_overlay");
    t.remove(), e.removeClass("visible")
}), $("#how_verify_choice input[name=how_verify]").on("change", function() {
    var e = $(this).val(),
        t = $("#upload_image_field");
    1 == e ? t.slideUp() : t.slideDown()
}), $(".upload_file").change(function() {
    var e = $(this).prop("id");
    "" != $(this).val() && upload_image_action(this, e)
}), $(".admin_upload_file").change(function() {
    var e = $(this).prop("id"),
        t = $(this).data("code");
    "" != $(this).val() && admin_upload_image_action(this, e, t)
}), $(".copy_text").click(function(e) {
    e.preventDefault();
    var t, n, r = $(this).data("copyid"),
        i = document.getElementById(r);
    navigator.userAgent.match(/ipad|iphone/i) ? (t = i.contentEditable, n = i.readOnly, i.contentEditable = !0, i.readOnly = !1, (e = document.createRange()).selectNodeContents(i), (r = window.getSelection()).removeAllRanges(), r.addRange(e), i.setSelectionRange(0, 999999), i.contentEditable = t, i.readOnly = n) : i.select(), document.execCommand("copy"), $(this).html('Copied <icon class="icon-check text-small"></icon>')
}), $(".alert-dismissible .close").click(function(e) {
    e.preventDefault(), $(this).parents(".alert-dismissible").remove()
}), $(".filter-title").click(function() {
    var t = $(this),
        n = t.parent(".filter-parent"),
        e = n.find(".filter-menu"),
        r = n.parents(".filter-group");
    e.slideToggle(100), t.toggleClass("active"), t.hasClass("active") && (r.find(".filter-title").not(t).removeClass("active"), r.find(".filter-menu").not(e).slideUp("fast"), setTimeout(function() {
        var e;
        isElementInViewport(n[0]) || (e = t.offset().top, $("html,body").animate({
            scrollTop: e - 40
        }, 100))
    }, 300))
}), $(".filter-shortened").click(function() {
    var e = $(this).parents(".filter-parent"),
        t = e.find(".filter-menu"),
        e = e.find(".filter-title");
    t.slideUp("fast"), e.removeClass("active")
}), $(".filter-clear").click(function() {
    var e = $(this).parents(".filter-parent"),
        t = e.find(".filter-menu"),
        n = e.find(".filter-title"),
        e = e.find(".filter-notice");
    t.find("input[type=checkbox]").prop("checked", !1), n.removeClass("chosen"), e.html("Chọn")
}), $(".filter-menu input[type=checkbox]").change(function() {
    var e = $(this).parents(".filter-parent"),
        t = e.find(".filter-menu"),
        n = e.find(".filter-title"),
        e = e.find(".filter-notice"),
        t = t.find("input:checkbox:checked").length;
    0 == t ? (n.removeClass("chosen"), e.html("Chọn")) : (n.addClass("chosen"), e.html("Đã chọn " + t))
}),
    function(i) {
        i.fn.niceSelect = function(e) {
            if ("string" == typeof e) return "update" == e ? this.each(function() {
                var e = i(this),
                    t = i(this).next(".nice-select"),
                    n = t.hasClass("open");
                t.length && (t.remove(), r(e), n && e.next().trigger("click"))
            }) : "destroy" == e ? (this.each(function() {
                var e = i(this),
                    t = i(this).next(".nice-select");
                t.length && (t.remove(), e.css("display", ""))
            }), 0 == i(".nice-select").length && i(document).off(".nice_select")) : console.log('Method "' + e + '" does not exist.'), this;

            function r(e) {
                e.after(i("<div></div>").addClass("nice-select").addClass(e.attr("class") || "").addClass(e.attr("disabled") ? "disabled" : "").attr("tabindex", e.attr("disabled") ? null : "0").html('<span class="current"></span><ul class="list"></ul>'));
                var r = e.next(),
                    t = e.find("option"),
                    e = e.find("option:selected");
                r.find(".current").html(e.data("display") || e.text()), t.each(function(e) {
                    var t = i(this),
                        n = t.data("display");
                    r.find("ul").append(i("<li></li>").attr("data-value", t.val()).attr("data-display", n || null).addClass("option" + (t.is(":selected") ? " selected" : "") + (t.is(":disabled") ? " disabled" : "")).html(t.text()))
                })
            }
            this.hide(), this.each(function() {
                var e = i(this);
                e.next().hasClass("nice-select") || r(e)
            }), i(document).off(".nice_select"), i(document).on("click.nice_select", ".nice-select", function(e) {
                var t = i(this);
                i(".nice-select").not(t).removeClass("open"), t.toggleClass("open"), t.hasClass("open") ? (t.find(".option"), t.find(".focus").removeClass("focus"), t.find(".selected").addClass("focus")) : t.focus()
            }), i(document).on("click.nice_select", function(e) {
                0 === i(e.target).closest(".nice-select").length && i(".nice-select").removeClass("open").find(".option")
            }), i(document).on("click.nice_select", ".nice-select .option:not(.disabled)", function(e) {
                var t = i(this),
                    n = t.closest(".nice-select");
                n.find(".selected").removeClass("selected"), t.addClass("selected");
                var r = t.data("display") || t.text();
                n.find(".current").text(r), n.prev("select").val(t.data("value")).trigger("change")
            }), i(document).on("keydown.nice_select", ".nice-select", function(e) {
                var t, n = i(this),
                    r = i(n.find(".focus") || n.find(".list .option.selected"));
                if (32 == e.keyCode || 13 == e.keyCode) return (n.hasClass("open") ? r : n).trigger("click"), !1;
                if (40 == e.keyCode) return n.hasClass("open") ? 0 < (t = r.nextAll(".option:not(.disabled)").first()).length && (n.find(".focus").removeClass("focus"), t.addClass("focus")) : n.trigger("click"), !1;
                if (38 == e.keyCode) return n.hasClass("open") ? 0 < (r = r.prevAll(".option:not(.disabled)").first()).length && (n.find(".focus").removeClass("focus"), r.addClass("focus")) : n.trigger("click"), !1;
                if (27 == e.keyCode) n.hasClass("open") && n.trigger("click");
                else if (9 == e.keyCode && n.hasClass("open")) return !1
            });
            e = document.createElement("a").style;
            return e.cssText = "pointer-events:auto", "auto" !== e.pointerEvents && i("html").addClass("no-csspointerevents"), this
        }
    }(jQuery), $("select.nice").niceSelect();