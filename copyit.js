// ==UserScript==
// @name         CopyIt
// @namespace    https://github.com/shy1248/tampermk-js
// @version      1.0
// @icon
// @description  解除网页复制限制
// @author       shy
// @license      MIT
// @supportURL   https://github.com/shy1248/tampermk-js
// @updateURL    https://raw.githubusercontent.com/shy1248/tampermk-js/master/copyit.js
// @downloadURL  https://raw.githubusercontent.com/shy1248/tampermk-js/master/copyit.js
// @include      *
// @exclude      *.md
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    var $jscomp = $jscomp || {};
    $jscomp.scope = {};
    $jscomp.arrayIteratorImpl = function (a) {
        var c = 0;
        return function () {
            return c < a.length ? {
                done: !1,
                value: a[c++]
            } : {
                    done: !0
                }
        }
    };
    $jscomp.arrayIterator = function (a) {
        return {
            next: $jscomp.arrayIteratorImpl(a)
        }
    };
    $jscomp.ASSUME_ES5 = !1;
    $jscomp.ASSUME_NO_NATIVE_MAP = !1;
    $jscomp.ASSUME_NO_NATIVE_SET = !1;
    $jscomp.SIMPLE_FROUND_POLYFILL = !1;
    $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, c, e) {
        a != Array.prototype && a != Object.prototype && (a[c] = e.value)
    };
    $jscomp.getGlobal = function (a) {
        return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
    };
    $jscomp.global = $jscomp.getGlobal(this);
    $jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
    $jscomp.initSymbol = function () {
        $jscomp.initSymbol = function () { };
        $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
    };
    $jscomp.SymbolClass = function (a, c) {
        this.$jscomp$symbol$id_ = a;
        $jscomp.defineProperty(this, "description", {
            configurable: !0,
            writable: !0,
            value: c
        })
    };
    $jscomp.SymbolClass.prototype.toString = function () {
        return this.$jscomp$symbol$id_
    };
    $jscomp.Symbol = function () {
        function a(e) {
            if (this instanceof a) throw new TypeError("Symbol is not a constructor");
            return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (e || "") + "_" + c++, e)
        }
        var c = 0;
        return a
    }();
    $jscomp.initSymbolIterator = function () {
        $jscomp.initSymbol();
        var a = $jscomp.global.Symbol.iterator;
        a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
        "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
            configurable: !0,
            writable: !0,
            value: function () {
                return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
            }
        });
        $jscomp.initSymbolIterator = function () { }
    };
    $jscomp.initSymbolAsyncIterator = function () {
        $jscomp.initSymbol();
        var a = $jscomp.global.Symbol.asyncIterator;
        a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
        $jscomp.initSymbolAsyncIterator = function () { }
    };
    $jscomp.iteratorPrototype = function (a) {
        $jscomp.initSymbolIterator();
        a = {
            next: a
        };
        a[$jscomp.global.Symbol.iterator] = function () {
            return this
        };
        return a
    }; (function (a) {
        function c(f) {
            if (e[f]) return e[f].exports;
            var b = e[f] = {
                i: f,
                l: !1,
                exports: {}
            };
            a[f].call(b.exports, b, b.exports, c);
            b.l = !0;
            return b.exports
        }
        var e = {};
        c.m = a;
        c.c = e;
        c.d = function (a, b, d) {
            c.o(a, b) || Object.defineProperty(a, b, {
                enumerable: !0,
                get: d
            })
        };
        c.r = function (a) {
            $jscomp.initSymbol();
            $jscomp.initSymbol();
            "undefined" !== typeof Symbol && Symbol.toStringTag && ($jscomp.initSymbol(), Object.defineProperty(a, Symbol.toStringTag, {
                value: "Module"
            }));
            Object.defineProperty(a, "__esModule", {
                value: !0
            })
        };
        c.t = function (a, b) {
            b & 1 && (a = c(a));
            if (b & 8 || b & 4 && "object" === typeof a && a && a.__esModule) return a;
            var d = Object.create(null);
            c.r(d);
            Object.defineProperty(d, "default", {
                enumerable: !0,
                value: a
            });
            if (b & 2 && "string" != typeof a) for (var f in a) c.d(d, f,
                function (b) {
                    return a[b]
                }.bind(null, f));
            return d
        };
        c.n = function (a) {
            var b = a && a.__esModule ?
                function () {
                    return a["default"]
                } : function () {
                    return a
                };
            c.d(b, "a", b);
            return b
        };
        c.o = function (a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        };
        c.p = "";
        return c(c.s = 26)
    })({
        26: function (a, c) {
            (function () {
                function a(a) {
                    this.events = ["DOMAttrModified", "DOMNodeInserted", "DOMNodeRemoved", "DOMCharacterDataModified", "DOMSubtreeModified"];
                    this.bind()
                }
                function c(a) {
                    this.event = a;
                    this.contextmenuEvent = this.createEvent(this.event.type)
                }
                var b = document.createElement("style");
                document.head.appendChild(b);
                b.type = "text/css";
                b.innerText = "* {\n\t\t-webkit-user-select: text !important;\n\t\t-moz-user-select: text !important;\n\t\t-ms-user-select: text !important;\n\t\t user-select: text !important;\n\t}";
                b = document.querySelectorAll("*");
                for (var d = 0; d < b.length; d++)"none" == b[d].style.userSelect && (b[d].style.userSelect = "auto");
                b = document.createElement("script");
                b.type = "text/javascript";
                document.body.appendChild(b);
                b.innerHTML = "\n\t\tdocument.onselectstart = null;\n\t\tdocument.ondragstart = null;\n\t\tdocument.onmousedown = null;\n\t\tdocument.body.onselectstart = null;\n\t\tdocument.body.ondragstart = null;\n\t\tdocument.body.onmousedown = null;\n\t\tdocument.body.oncut = null;\n\t\tdocument.body.oncopy = null;\n\t\tdocument.body.onpaste = null;\n\t";
                b = document;
                d = document.body;
                // b.oncontextmenu = null;
                b.onselectstart = null;
                b.ondragstart = null;
                b.onmousedown = null;
                // d.oncontextmenu = null;
                d.onselectstart = null;
                d.ondragstart = null;
                d.onmousedown = null;
                d.oncut = null;
                d.oncopy = null;
                d.onpaste = null;
                setTimeout(function () {
                    // document.oncontextmenu = null
                },
                    2E3);[].forEach.call(["copy", "cut", "paste", "select", "selectstart"],
                        function (a) {
                            document.addEventListener(a,
                                function (a) {
                                    a.stopPropagation()
                                },
                                !0)
                        });
                // window.addEventListener("contextmenu",
                //     function g(b) {
                //         b.stopPropagation();
                //         b.stopImmediatePropagation();
                //         var d = new c(b);
                //         window.removeEventListener(b.type, g, !0);
                //         var e = new a(function () { });
                //         d.fire();
                //         window.addEventListener(b.type, g, !0);
                //         d.isCanceled && e.isCalled && b.preventDefault()
                //     },
                //     !0);
                a.prototype.bind = function () {
                    this.events.forEach(function (a) {
                        document.addEventListener(a, this, !0)
                    }.bind(this))
                };
                a.prototype.handleEvent = function () {
                    this.isCalled = !0
                };
                a.prototype.unbind = function () {
                    this.events.forEach(function (a) { }.bind(this))
                };
                c.prototype.createEvent = function (a) {
                    var b = this.event.target,
                        c = b.ownerDocument.createEvent("MouseEvents");
                    c.initMouseEvent(a, this.event.bubbles, this.event.cancelable, b.ownerDocument.defaultView, this.event.detail, this.event.screenX, this.event.screenY, this.event.clientX, this.event.clientY, this.event.ctrlKey, this.event.altKey, this.event.shiftKey, this.event.metaKey, this.event.button, this.event.relatedTarget);
                    return c
                };
                c.prototype.fire = function () {
                    var a = this.event.target; (function (a) {
                        a.preventDefault()
                    }).bind(this);
                    // a.dispatchEvent(this.contextmenuEvent);
                    // this.isCanceled = this.contextmenuEvent.defaultPrevented
                }
            })()
        }
    });
}).call(this || window)
