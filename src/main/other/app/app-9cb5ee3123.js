!function () {
    "use strict";
    function t(t, e) {
        t.initialize(), e.initialize()
    }

    angular.module("quizApp", ["ngStorage", "tmh.dynamicLocale", "pascalprecht.translate", "ngResource", "ngCookies", "ngAria", "ngCacheBuster", "ngFileUpload", "ui.bootstrap", "ui.bootstrap.datetimepicker", "ui.router", "infinite-scroll", "lr.upload", "angular-loading-bar"]).run(t), t.$inject = ["stateHandler", "translationHandler"]
}(), function () {
    "use strict";
    function t(t) {
        var e = t("api/users/:login", {}, {
            query: {method: "GET", isArray: !0},
            get: {
                method: "GET", transformResponse: function (t) {
                    return t = angular.fromJson(t)
                }
            },
            save: {method: "POST"},
            update: {method: "PUT"},
            delete: {method: "DELETE"}
        });
        return e
    }

    angular.module("quizApp").factory("User", t), t.$inject = ["$resource"]
}(), function () {
    "use strict";
    function t(t) {
        function e() {
            return angular.isUndefined(a) && (a = t.get("api/profile-info").then(function (t) {
                if (t.data.activeProfiles) {
                    var e = {};
                    return e.activeProfiles = t.data.activeProfiles, e.ribbonEnv = t.data.ribbonEnv, e.inProduction = t.data.activeProfiles.indexOf("prod") !== -1, e.swaggerEnabled = t.data.activeProfiles.indexOf("swagger") !== -1, e
                }
            })), a
        }

        var a, n = {getProfileInfo: e};
        return n
    }

    angular.module("quizApp").factory("ProfileService", t), t.$inject = ["$http"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n(e, a, n) {
            t.getProfileInfo().then(function (t) {
                t.ribbonEnv && (e.ribbonEnv = t.ribbonEnv, a.addClass(t.ribbonEnv), a.removeClass("hidden"))
            })
        }

        var r = {
            replace: !0,
            restrict: "AE",
            template: '<div class="ribbon hidden"><a href="" translate="global.ribbon.{{ribbonEnv}}">{{ribbonEnv}}</a></div>',
            link: n
        };
        return r
    }

    angular.module("quizApp").directive("pageRibbon", t), t.$inject = ["ProfileService", "$rootScope", "$translate"]
}(), function () {
    "use strict";
    function t(t) {
        return t("api/register", {}, {})
    }

    angular.module("quizApp").factory("Register", t), t.$inject = ["$resource"]
}(), function () {
    "use strict";
    function t(t, e) {
        function a(t) {
            o = t, c = null !== t
        }

        function n(t) {
            if (!c || !o || !o.authorities)return !1;
            for (var e = 0; e < t.length; e++)if (o.authorities.indexOf(t[e]) !== -1)return !0;
            return !1
        }

        function r(e) {
            return c ? this.identity().then(function (t) {
                    return t.authorities && t.authorities.indexOf(e) !== -1
                }, function () {
                    return !1
                }) : t.when(!1)
        }

        function s(a) {
            function n(t) {
                o = t.data, c = !0, s.resolve(o)
            }

            function r() {
                o = null, c = !1, s.resolve(o)
            }

            var s = t.defer();
            return a === !0 && (o = void 0), angular.isDefined(o) ? (s.resolve(o), s.promise) : (e.get().$promise.then(n).catch(r), s.promise)
        }

        function i() {
            return c
        }

        function l() {
            return angular.isDefined(o)
        }

        var o, c = !1, d = {
            authenticate: a,
            hasAnyAuthority: n,
            hasAuthority: r,
            identity: s,
            isAuthenticated: i,
            isIdentityResolved: l
        };
        return d
    }

    angular.module("quizApp").factory("Principal", t), t.$inject = ["$q", "Account"]
}(), function () {
    "use strict";
    function t(t) {
        var e = t("api/account/reset_password/init", {}, {});
        return e
    }

    angular.module("quizApp").factory("PasswordResetInit", t), t.$inject = ["$resource"]
}(), function () {
    "use strict";
    function t(t) {
        var e = t("api/account/reset_password/finish", {}, {});
        return e
    }

    angular.module("quizApp").factory("PasswordResetFinish", t), t.$inject = ["$resource"]
}(), function () {
    "use strict";
    function t(t) {
        var e = t("api/account/change_password", {}, {});
        return e
    }

    angular.module("quizApp").factory("Password", t), t.$inject = ["$resource"]
}(), function () {
    "use strict";
    function t(t) {
        function e(e, a, n) {
            var r = n.hasAuthority.replace(/\s+/g, ""), s = function () {
                a.removeClass("hidden")
            }, i = function () {
                a.addClass("hidden")
            }, l = function (e) {
                e && s(), t.hasAuthority(r).then(function (t) {
                    t ? s() : i()
                })
            };
            r.length > 0 && (l(!0), e.$watch(function () {
                return t.isAuthenticated()
            }, function () {
                l(!0)
            }))
        }

        var a = {restrict: "A", link: e};
        return a
    }

    angular.module("quizApp").directive("hasAuthority", t), t.$inject = ["Principal"]
}(), function () {
    "use strict";
    function t(t) {
        function e(e, a, n) {
            var r = n.hasAnyAuthority.replace(/\s+/g, "").split(","), s = function () {
                a.removeClass("hidden")
            }, i = function () {
                a.addClass("hidden")
            }, l = function (e) {
                var a;
                e && s(), a = t.hasAnyAuthority(r), a ? s() : i()
            };
            r.length > 0 && (l(!0), e.$watch(function () {
                return t.isAuthenticated()
            }, function () {
                l(!0)
            }))
        }

        var a = {restrict: "A", link: e};
        return a
    }

    angular.module("quizApp").directive("hasAnyAuthority", t), t.$inject = ["Principal"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s, i, l, o, c, d, u, p, m) {
        function g(t, e) {
            var a = e || angular.noop;
            return d.get(t, function (t) {
                return a(t)
            }, function (t) {
                return a(t)
            }.bind(this)).$promise
        }

        function h(a) {
            function n() {
                var a = s.isAuthenticated();
                if (!a || "account" !== t.toState.parent || "login" !== t.toState.name && "register" !== t.toState.name && "social-auth" !== t.toState.name || e.go("home"), a && !t.fromState.name && x()) {
                    var n = x();
                    P(), e.go(n.name, n.params)
                }
                t.toState.data.authorities && t.toState.data.authorities.length > 0 && !s.hasAnyAuthority(t.toState.data.authorities) && (a ? e.go("accessdenied") : (k(t.toState.name, t.toStateParams), e.go("accessdenied").then(function () {
                        o.open()
                    })))
            }

            var r = s.identity(a).then(n);
            return r
        }

        function v(t, e) {
            var a = e || angular.noop;
            return u.save(t, function () {
                return a()
            }, function (t) {
                return a(t)
            }).$promise
        }

        function f(t, e) {
            var a = e || angular.noop;
            return c.save(t, function () {
                return a(t)
            }, function (t) {
                return this.logout(), a(t)
            }.bind(this)).$promise
        }

        function b(t, e) {
            function a(t) {
                return s.identity(!0).then(function (e) {
                    null !== e && r.use(e.langKey).then(function () {
                        r.refresh()
                    }), o.resolve(t)
                }), l()
            }

            var l = e || angular.noop, o = n.defer();
            return i.login(t).then(a).catch(function (t) {
                return this.logout(), o.reject(t), l(t)
            }.bind(this)), o.promise
        }

        function y(t, e) {
            return i.loginWithToken(t, e)
        }

        function w() {
            i.logout(), s.authenticate(null)
        }

        function $(t, e) {
            var a = e || angular.noop;
            return m.save(t, function () {
                return a()
            }, function (t) {
                return a(t)
            }).$promise
        }

        function q(t, e) {
            var a = e || angular.noop;
            return p.save(t, function () {
                return a()
            }, function (t) {
                return a(t)
            }).$promise
        }

        function A(t, e) {
            var a = e || angular.noop;
            return l.save(t, function () {
                return a(t)
            }, function (t) {
                return a(t)
            }.bind(this)).$promise
        }

        function x() {
            var t = a.previousState;
            return t
        }

        function P() {
            delete a.previousState
        }

        function k(t, e) {
            var n = {name: t, params: e};
            a.previousState = n
        }

        var j = {
            activateAccount: g,
            authorize: h,
            changePassword: v,
            createAccount: f,
            getPreviousState: x,
            login: b,
            logout: w,
            loginWithToken: y,
            resetPasswordFinish: $,
            resetPasswordInit: q,
            resetPreviousState: P,
            storePreviousState: k,
            updateAccount: A
        };
        return j
    }

    angular.module("quizApp").factory("Auth", t), t.$inject = ["$rootScope", "$state", "$sessionStorage", "$q", "$translate", "Principal", "AuthServerProvider", "Account", "LoginService", "Register", "Activate", "Password", "PasswordResetInit", "PasswordResetFinish"]
}(), function () {
    "use strict";
    function t(t, e, a, n) {
        function r() {
            return e.authenticationToken || a.authenticationToken
        }

        function s(e) {
            function a(t, a, n) {
                var r = n("Authorization");
                if (angular.isDefined(r) && "Bearer " === r.slice(0, 7)) {
                    var s = r.slice(7, r.length);
                    return c.storeAuthenticationToken(s, e.rememberMe), s
                }
            }

            var n = {username: e.username, password: e.password, rememberMe: e.rememberMe};
            return t.post("api/authenticate", n).success(a)
        }

        function i(t, e) {
            var a = n.defer();
            return angular.isDefined(t) ? (this.storeAuthenticationToken(t, e), a.resolve(t)) : a.reject(), a.promise
        }

        function l(t, n) {
            n ? e.authenticationToken = t : a.authenticationToken = t
        }

        function o() {
            delete e.authenticationToken, delete a.authenticationToken
        }

        var c = {getToken: r, login: s, loginWithToken: i, storeAuthenticationToken: l, logout: o};
        return c
    }

    angular.module("quizApp").factory("AuthServerProvider", t), t.$inject = ["$http", "$localStorage", "$sessionStorage", "$q"]
}(), function () {
    "use strict";
    function t(t) {
        var e = t("api/activate", {}, {get: {method: "GET", params: {}, isArray: !1}});
        return e
    }

    angular.module("quizApp").factory("Activate", t), t.$inject = ["$resource"]
}(), function () {
    "use strict";
    function t(t) {
        var e = t("api/account", {}, {
            get: {
                method: "GET",
                params: {},
                isArray: !1,
                interceptor: {
                    response: function (t) {
                        return t
                    }
                }
            }
        });
        return e
    }

    angular.module("quizApp").factory("Account", t), t.$inject = ["$resource"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r) {
        function s() {
            o(), r.open()
        }

        function i() {
            o(), e.logout(), t.go("home")
        }

        function l() {
            c.isNavbarCollapsed = !c.isNavbarCollapsed
        }

        function o() {
            c.isNavbarCollapsed = !0
        }

        var c = this;
        c.isNavbarCollapsed = !0, c.isAuthenticated = a.isAuthenticated, n.getProfileInfo().then(function (t) {
            c.inProduction = t.inProduction, c.swaggerEnabled = t.swaggerEnabled
        }), c.login = s, c.logout = i, c.toggleNavbar = l, c.collapseNavbar = o, c.$state = t
    }

    angular.module("quizApp").controller("NavbarController", t), t.$inject = ["$state", "Auth", "Principal", "ProfileService", "LoginService"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n(e, n, r) {
            var s = r.activeMenu;
            e.$watch(function () {
                return t.use()
            }, function (t) {
                s === t ? (a.set(s), n.addClass("active")) : n.removeClass("active")
            })
        }

        var r = {restrict: "A", link: n};
        return r
    }

    angular.module("quizApp").directive("activeMenu", t), t.$inject = ["$translate", "$locale", "tmhDynamicLocale"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("error", {
            parent: "app",
            url: "/error",
            data: {authorities: [], pageTitle: "error.title"},
            views: {"content@": {templateUrl: "app/layouts/error/error.html"}},
            resolve: {
                mainTranslatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("error"), t.refresh()
                }]
            }
        }).state("accessdenied", {
            parent: "app",
            url: "/accessdenied",
            data: {authorities: []},
            views: {"content@": {templateUrl: "app/layouts/error/accessdenied.html"}},
            resolve: {
                mainTranslatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("error"), t.refresh()
                }]
            }
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("home", {
            parent: "app",
            url: "/",
            data: {authorities: []},
            views: {"content@": {templateUrl: "app/home/home.html", controller: "HomeController", controllerAs: "vm"}},
            resolve: {
                mainTranslatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("home"), t.refresh()
                }]
            }
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t, e, a, n) {
        function r() {
            e.identity().then(function (t) {
                i.account = t, i.isAuthenticated = e.isAuthenticated
            })
        }

        function s() {
            n.go("register")
        }

        var i = this;
        i.account = null, i.isAuthenticated = null, i.login = a.open, i.register = s, t.$on("authenticationSuccess", function () {
            r()
        }), r()
    }

    angular.module("quizApp").controller("HomeController", t), t.$inject = ["$scope", "Principal", "LoginService", "$state"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s, i) {
        function l() {
            n.dismiss("cancel")
        }

        function o() {
            u.isSaving = !0, null !== u.subcategory.id ? s.update(u.subcategory, c, d) : s.save(u.subcategory, c, d)
        }

        function c(t) {
            e.$emit("quizApp:subcategoryUpdate", t), n.close(t), u.isSaving = !1
        }

        function d() {
            u.isSaving = !1
        }

        var u = this;
        u.subcategory = r, u.clear = l, u.save = o, u.categories = i.query(), t(function () {
            angular.element(".form-group:eq(1)>input").focus()
        })
    }

    angular.module("quizApp").controller("SubcategoryDialogController", t), t.$inject = ["$timeout", "$scope", "$stateParams", "$uibModalInstance", "entity", "Subcategory", "Category"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s, i) {
        var l = this;
        l.subcategory = r, l.previousState = n.name;
        var o = e.$on("quizApp:subcategoryUpdate", function (t, e) {
            l.subcategory = e
        });
        t.$on("$destroy", o)
    }

    angular.module("quizApp").controller("SubcategoryDetailController", t), t.$inject = ["$scope", "$rootScope", "$stateParams", "previousState", "entity", "Subcategory", "Category"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n() {
            t.dismiss("cancel")
        }

        function r(e) {
            a.delete({id: e}, function () {
                t.close(!0)
            })
        }

        var s = this;
        s.subcategory = e, s.clear = n, s.confirmDelete = r
    }

    angular.module("quizApp").controller("SubcategoryDeleteController", t), t.$inject = ["$uibModalInstance", "entity", "Subcategory"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("subcategory", {
            parent: "entity",
            url: "/subcategory?page&sort&search",
            data: {authorities: ["ROLE_USER"], pageTitle: "quizApp.subcategory.home.title"},
            views: {
                "content@": {
                    templateUrl: "app/entities/subcategory/subcategories.html",
                    controller: "SubcategoryController",
                    controllerAs: "vm"
                }
            },
            params: {page: {value: "1", squash: !0}, sort: {value: "id,asc", squash: !0}, search: null},
            resolve: {
                pagingParams: ["$stateParams", "PaginationUtil", function (t, e) {
                    return {
                        page: e.parsePage(t.page),
                        sort: t.sort,
                        predicate: e.parsePredicate(t.sort),
                        ascending: e.parseAscending(t.sort),
                        search: t.search
                    }
                }], translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("subcategory"), e.addPart("global"), t.refresh()
                }]
            }
        }).state("subcategory-detail", {
            parent: "entity",
            url: "/subcategory/{id}",
            data: {authorities: ["ROLE_USER"], pageTitle: "quizApp.subcategory.detail.title"},
            views: {
                "content@": {
                    templateUrl: "app/entities/subcategory/subcategory-detail.html",
                    controller: "SubcategoryDetailController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("subcategory"), t.refresh()
                }], entity: ["$stateParams", "Subcategory", function (t, e) {
                    return e.get({id: t.id}).$promise
                }], previousState: ["$state", function (t) {
                    var e = {
                        name: t.current.name || "subcategory",
                        params: t.params,
                        url: t.href(t.current.name, t.params)
                    };
                    return e
                }]
            }
        }).state("subcategory-detail.edit", {
            parent: "subcategory-detail",
            url: "/detail/edit",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/subcategory/subcategory-dialog.html",
                    controller: "SubcategoryDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: ["Subcategory", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("^", {}, {reload: !1})
                }, function () {
                    e.go("^")
                })
            }]
        }).state("subcategory.new", {
            parent: "subcategory",
            url: "/new",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/subcategory/subcategory-dialog.html",
                    controller: "SubcategoryDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: function () {
                            return {name: null, id: null}
                        }
                    }
                }).result.then(function () {
                    e.go("subcategory", null, {reload: "subcategory"})
                }, function () {
                    e.go("subcategory")
                })
            }]
        }).state("subcategory.edit", {
            parent: "subcategory",
            url: "/{id}/edit",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/subcategory/subcategory-dialog.html",
                    controller: "SubcategoryDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: ["Subcategory", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("subcategory", null, {reload: "subcategory"})
                }, function () {
                    e.go("^")
                })
            }]
        }).state("subcategory.delete", {
            parent: "subcategory",
            url: "/{id}/delete",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/subcategory/subcategory-delete-dialog.html",
                    controller: "SubcategoryDeleteController",
                    controllerAs: "vm",
                    size: "md",
                    resolve: {
                        entity: ["Subcategory", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("subcategory", null, {reload: "subcategory"})
                }, function () {
                    e.go("^")
                })
            }]
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t) {
        var e = "api/subcategories/:id";
        return t(e, {}, {
            query: {method: "GET", isArray: !0}, get: {
                method: "GET", transformResponse: function (t) {
                    return t && (t = angular.fromJson(t)), t
                }
            }, update: {method: "PUT"}
        })
    }

    angular.module("quizApp").factory("Subcategory", t), t.$inject = ["$resource"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s, i) {
        function l() {
            function t() {
                var t = [d.predicate + "," + (d.reverse ? "asc" : "desc")];
                return "id" !== d.predicate && t.push("id"), t
            }

            function e(t, e) {
                d.links = n.parse(e("link")), d.totalItems = e("X-Total-Count"), d.queryCount = d.totalItems, d.subcategories = t, d.page = i.page
            }

            function s(t) {
                r.error(t.data.message)
            }

            a.query({page: i.page - 1, size: d.itemsPerPage, sort: t()}, e, s)
        }

        function o(t) {
            d.page = t, d.transition()
        }

        function c() {
            e.transitionTo(e.$current, {
                page: d.page,
                sort: d.predicate + "," + (d.reverse ? "asc" : "desc"),
                search: d.currentSearch
            })
        }

        var d = this;
        d.loadPage = o, d.predicate = i.predicate, d.reverse = i.ascending, d.transition = c, d.itemsPerPage = s.itemsPerPage, l()
    }

    angular.module("quizApp").controller("SubcategoryController", t), t.$inject = ["$scope", "$state", "Subcategory", "ParseLinks", "AlertService", "paginationConstants", "pagingParams"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s, i, l) {
        function o() {
            n.dismiss("cancel")
        }

        function c(t) {
            g.subcategories = i.get(t).subcategories
        }

        function d() {
            g.isSaving = !0, null !== g.question.id ? s.update(g.question, u, p) : s.save(g.question, u, p)
        }

        function u(t) {
            e.$emit("quizApp:questionUpdate", t), n.close(t), g.isSaving = !1
        }

        function p() {
            g.isSaving = !1
        }

        function m(t) {
            g.datePickerOpenStatus[t] = !0
        }

        var g = this, h = null;
        g.question = r, null == g.question.rightAnswer && (g.question.rightAnswer = 1), g.clear = o, g.datePickerOpenStatus = {}, g.openCalendar = m, g.save = d, g.selectSubcat = c, g.cat = h, g.categories = i.query(), g.subcategories = l.query(), t(function () {
            angular.element(".form-group:eq(1)>input").focus()
        }), g.datePickerOpenStatus.version = !1
    }

    angular.module("quizApp").controller("QuestionDialogController", t), t.$inject = ["$timeout", "$scope", "$stateParams", "$uibModalInstance", "entity", "Question", "Category", "Subcategory"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s, i) {
        var l = this;
        l.question = r, l.previousState = n.name;
        var o = e.$on("quizApp:questionUpdate", function (t, e) {
            l.question = e
        });
        t.$on("$destroy", o)
    }

    angular.module("quizApp").controller("QuestionDetailController", t), t.$inject = ["$scope", "$rootScope", "$stateParams", "previousState", "entity", "Question", "Category"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n() {
            t.dismiss("cancel")
        }

        function r(e) {
            a.delete({id: e}, function () {
                t.close(!0)
            })
        }

        var s = this;
        s.question = e, s.clear = n, s.confirmDelete = r
    }

    angular.module("quizApp").controller("QuestionDeleteController", t), t.$inject = ["$uibModalInstance", "entity", "Question"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("question", {
            parent: "entity",
            url: "/question?page&sort&search",
            data: {authorities: ["ROLE_USER"], pageTitle: "quizApp.question.home.title"},
            views: {
                "content@": {
                    templateUrl: "app/entities/question/questions.html",
                    controller: "QuestionController",
                    controllerAs: "vm"
                }
            },
            params: {page: {value: "1", squash: !0}, sort: {value: "id,asc", squash: !0}, search: null},
            resolve: {
                pagingParams: ["$stateParams", "PaginationUtil", function (t, e) {
                    return {
                        page: e.parsePage(t.page),
                        sort: t.sort,
                        predicate: e.parsePredicate(t.sort),
                        ascending: e.parseAscending(t.sort),
                        search: t.search
                    }
                }], translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("question"), e.addPart("global"), t.refresh()
                }]
            }
        }).state("question-detail", {
            parent: "entity",
            url: "/question/{id}",
            data: {authorities: ["ROLE_USER"], pageTitle: "quizApp.question.detail.title"},
            views: {
                "content@": {
                    templateUrl: "app/entities/question/question-detail.html",
                    controller: "QuestionDetailController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("question"), t.refresh()
                }], entity: ["$stateParams", "Question", function (t, e) {
                    return e.get({id: t.id}).$promise
                }], previousState: ["$state", function (t) {
                    var e = {
                        name: t.current.name || "question",
                        params: t.params,
                        url: t.href(t.current.name, t.params)
                    };
                    return e
                }]
            }
        }).state("question-detail.edit", {
            parent: "question-detail",
            url: "/detail/edit",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/question/question-dialog.html",
                    controller: "QuestionDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: ["Question", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("^", {}, {reload: !1})
                }, function () {
                    e.go("^")
                })
            }]
        }).state("question.new", {
            parent: "question",
            url: "/new",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/question/question-dialog.html",
                    controller: "QuestionDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: function () {
                            return {
                                version: null,
                                title: null,
                                mediaType: null,
                                media: null,
                                answer1: null,
                                answer2: null,
                                answer3: null,
                                answer4: null,
                                rightAnswer: null,
                                id: null
                            }
                        }
                    }
                }).result.then(function () {
                    e.go("question", null, {reload: "question"})
                }, function () {
                    e.go("question")
                })
            }]
        }).state("question.edit", {
            parent: "question",
            url: "/{id}/edit",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/question/question-dialog.html",
                    controller: "QuestionDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: ["Question", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("question", null, {reload: "question"})
                }, function () {
                    e.go("^")
                })
            }]
        }).state("question.delete", {
            parent: "question",
            url: "/{id}/delete",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/question/question-delete-dialog.html",
                    controller: "QuestionDeleteController",
                    controllerAs: "vm",
                    size: "md",
                    resolve: {
                        entity: ["Question", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("question", null, {reload: "question"})
                }, function () {
                    e.go("^")
                })
            }]
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t, e) {
        var a = "api/questions/:id";
        return t(a, {}, {
            query: {method: "GET", isArray: !0}, get: {
                method: "GET", transformResponse: function (t) {
                    return t && (t = angular.fromJson(t), t.version = e.convertLocalDateFromServer(t.version)), t
                }
            }, update: {
                method: "PUT", transformRequest: function (t) {
                    var a = angular.copy(t);
                    return a.version = e.convertLocalDateToServer(a.version), angular.toJson(a)
                }
            }, save: {
                method: "POST", transformRequest: function (t) {
                    var a = angular.copy(t);
                    return a.version = e.convertLocalDateToServer(a.version), angular.toJson(a)
                }
            }
        })
    }

    angular.module("quizApp").factory("Question", t), t.$inject = ["$resource", "DateUtils"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s, i) {
        function l() {
            function t() {
                var t = [d.predicate + "," + (d.reverse ? "asc" : "desc")];
                return "id" !== d.predicate && t.push("id"), t
            }

            function e(t, e) {
                d.links = n.parse(e("link")), d.totalItems = e("X-Total-Count"), d.queryCount = d.totalItems, d.questions = t, d.page = i.page
            }

            function s(t) {
                r.error(t.data.message)
            }

            a.query({page: i.page - 1, size: d.itemsPerPage, sort: t()}, e, s)
        }

        function o(t) {
            d.page = t, d.transition()
        }

        function c() {
            e.transitionTo(e.$current, {
                page: d.page,
                sort: d.predicate + "," + (d.reverse ? "asc" : "desc"),
                search: d.currentSearch
            })
        }

        var d = this;
        d.loadPage = o, d.predicate = i.predicate, d.reverse = i.ascending, d.transition = c, d.itemsPerPage = s.itemsPerPage, l()
    }

    angular.module("quizApp").controller("QuestionController", t), t.$inject = ["$scope", "$state", "Question", "ParseLinks", "AlertService", "paginationConstants", "pagingParams"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s, i) {
        function l() {
            n.dismiss("cancel")
        }

        function o() {
            u.isSaving = !0, null !== u.player.id ? s.update(u.player, c, d) : s.save(u.player, c, d)
        }

        function c(t) {
            e.$emit("quizApp:playerUpdate", t), n.close(t), u.isSaving = !1
        }

        function d() {
            u.isSaving = !1
        }

        var u = this;
        u.player = r, u.clear = l, u.save = o, u.avatars = i.query(), t(function () {
            angular.element(".form-group:eq(1)>input").focus()
        })
    }

    angular.module("quizApp").controller("PlayerDialogController", t), t.$inject = ["$timeout", "$scope", "$stateParams", "$uibModalInstance", "entity", "Player", "Avatar"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s, i) {
        var l = this;
        l.player = r, l.previousState = n.name;
        var o = e.$on("quizApp:playerUpdate", function (t, e) {
            l.player = e
        });
        t.$on("$destroy", o)
    }

    angular.module("quizApp").controller("PlayerDetailController", t), t.$inject = ["$scope", "$rootScope", "$stateParams", "previousState", "entity", "Player", "Avatar"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n() {
            t.dismiss("cancel")
        }

        function r(e) {
            a.delete({id: e}, function () {
                t.close(!0)
            })
        }

        var s = this;
        s.player = e, s.clear = n, s.confirmDelete = r
    }

    angular.module("quizApp").controller("PlayerDeleteController", t), t.$inject = ["$uibModalInstance", "entity", "Player"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("player", {
            parent: "entity",
            url: "/player?page&sort&search",
            data: {authorities: ["ROLE_USER"], pageTitle: "quizApp.player.home.title"},
            views: {
                "content@": {
                    templateUrl: "app/entities/player/players.html",
                    controller: "PlayerController",
                    controllerAs: "vm"
                }
            },
            params: {page: {value: "1", squash: !0}, sort: {value: "id,asc", squash: !0}, search: null},
            resolve: {
                pagingParams: ["$stateParams", "PaginationUtil", function (t, e) {
                    return {
                        page: e.parsePage(t.page),
                        sort: t.sort,
                        predicate: e.parsePredicate(t.sort),
                        ascending: e.parseAscending(t.sort),
                        search: t.search
                    }
                }], translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("player"), e.addPart("global"), t.refresh()
                }]
            }
        }).state("player-detail", {
            parent: "entity",
            url: "/player/{id}",
            data: {authorities: ["ROLE_USER"], pageTitle: "quizApp.player.detail.title"},
            views: {
                "content@": {
                    templateUrl: "app/entities/player/player-detail.html",
                    controller: "PlayerDetailController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("player"), t.refresh()
                }], entity: ["$stateParams", "Player", function (t, e) {
                    return e.get({id: t.id}).$promise
                }], previousState: ["$state", function (t) {
                    var e = {name: t.current.name || "player", params: t.params, url: t.href(t.current.name, t.params)};
                    return e
                }]
            }
        }).state("player-detail.edit", {
            parent: "player-detail",
            url: "/detail/edit",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/player/player-dialog.html",
                    controller: "PlayerDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: ["Player", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("^", {}, {reload: !1})
                }, function () {
                    e.go("^")
                })
            }]
        }).state("player.new", {
            parent: "player",
            url: "/new",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/player/player-dialog.html",
                    controller: "PlayerDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: function () {
                            return {name: null, score: null, id: null}
                        }
                    }
                }).result.then(function () {
                    e.go("player", null, {reload: "player"})
                }, function () {
                    e.go("player")
                })
            }]
        }).state("player.edit", {
            parent: "player",
            url: "/{id}/edit",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/player/player-dialog.html",
                    controller: "PlayerDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: ["Player", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("player", null, {reload: "player"})
                }, function () {
                    e.go("^")
                })
            }]
        }).state("player.delete", {
            parent: "player",
            url: "/{id}/delete",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/player/player-delete-dialog.html",
                    controller: "PlayerDeleteController",
                    controllerAs: "vm",
                    size: "md",
                    resolve: {
                        entity: ["Player", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("player", null, {reload: "player"})
                }, function () {
                    e.go("^")
                })
            }]
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t) {
        var e = "api/players/:id";
        return t(e, {}, {
            query: {method: "GET", isArray: !0}, get: {
                method: "GET", transformResponse: function (t) {
                    return t && (t = angular.fromJson(t)), t
                }
            }, update: {method: "PUT"}
        })
    }

    angular.module("quizApp").factory("Player", t), t.$inject = ["$resource"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s, i) {
        function l() {
            function t() {
                var t = [d.predicate + "," + (d.reverse ? "asc" : "desc")];
                return "id" !== d.predicate && t.push("id"), t
            }

            function e(t, e) {
                d.links = n.parse(e("link")), d.totalItems = e("X-Total-Count"), d.queryCount = d.totalItems, d.players = t, d.page = i.page
            }

            function s(t) {
                r.error(t.data.message)
            }

            a.query({page: i.page - 1, size: d.itemsPerPage, sort: t()}, e, s)
        }

        function o(t) {
            d.page = t, d.transition()
        }

        function c() {
            e.transitionTo(e.$current, {
                page: d.page,
                sort: d.predicate + "," + (d.reverse ? "asc" : "desc"),
                search: d.currentSearch
            })
        }

        var d = this;
        d.loadPage = o, d.predicate = i.predicate, d.reverse = i.ascending, d.transition = c, d.itemsPerPage = s.itemsPerPage, l()
    }

    angular.module("quizApp").controller("PlayerController", t), t.$inject = ["$scope", "$state", "Player", "ParseLinks", "AlertService", "paginationConstants", "pagingParams"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s, i) {
        var l = this;
        l.offer = r, l.imageId = i
    }

    angular.module("quizApp").controller("OfferImageDialogController", t), t.$inject = ["$timeout", "$scope", "$stateParams", "$uibModalInstance", "entity", "Offer", "imageId"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s) {
        var i = this;
        i.offer = r, i.previousState = n.name
    }

    angular.module("quizApp").controller("OfferDetailController", t), t.$inject = ["$scope", "$rootScope", "$stateParams", "previousState", "entity", "Offer"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n() {
            t.dismiss("cancel")
        }

        function r(e) {
            a.delete({id: e}, function () {
                t.close(!0)
            })
        }

        var s = this;
        s.offer = e, s.clear = n, s.confirmDelete = r
    }

    angular.module("quizApp").controller("OfferDeleteController", t), t.$inject = ["$uibModalInstance", "entity", "Offer"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("offer", {
            parent: "entity",
            url: "/offer?page&sort&search",
            data: {authorities: ["ROLE_USER"], pageTitle: "quizApp.offer.home.title"},
            views: {
                "content@": {
                    templateUrl: "app/entities/offer/offers.html",
                    controller: "OfferController",
                    controllerAs: "vm"
                }
            },
            params: {page: {value: "1", squash: !0}, sort: {value: "date,desc", squash: !0}, search: null},
            resolve: {
                pagingParams: ["$stateParams", "PaginationUtil", function (t, e) {
                    return {
                        page: e.parsePage(t.page),
                        sort: t.sort,
                        predicate: e.parsePredicate(t.sort),
                        ascending: e.parseAscending(t.sort),
                        search: t.search
                    }
                }], translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("offer"), e.addPart("global"), t.refresh()
                }]
            }
        }).state("offer-detail", {
            parent: "entity",
            url: "/offer/{id}",
            data: {authorities: ["ROLE_USER"], pageTitle: "quizApp.offer.detail.title"},
            views: {
                "content@": {
                    templateUrl: "app/entities/offer/offer-detail.html",
                    controller: "OfferDetailController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("offer"), t.refresh()
                }], entity: ["$stateParams", "Offer", function (t, e) {
                    return e.get({id: t.id}).$promise
                }], previousState: ["$state", function (t) {
                    var e = {name: t.current.name || "offer", params: t.params, url: t.href(t.current.name, t.params)};
                    return e
                }]
            }
        }).state("offer.delete", {
            parent: "offer",
            url: "/{id}/delete",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/offer/offer-delete-dialog.html",
                    controller: "OfferDeleteController",
                    controllerAs: "vm",
                    size: "md",
                    resolve: {
                        entity: ["Offer", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("offer", null, {reload: "offer"})
                }, function () {
                    e.go("^")
                })
            }]
        }).state("offer-detail.image", {
            parent: "offer-detail",
            url: "/image/",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/offer/offer-image-dialog.html",
                    controller: "OfferImageDialogController",
                    controllerAs: "vm",
                    size: "lg",
                    resolve: {
                        entity: ["Offer", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("offer", null, {reload: "offer"})
                }, function () {
                    e.go("^")
                })
            }]
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t) {
        var e = "api/offers/:id";
        return t(e, {}, {
            query: {method: "GET", isArray: !0}, get: {
                method: "GET", transformResponse: function (t) {
                    return t && (t = angular.fromJson(t)), t
                }
            }
        })
    }

    angular.module("quizApp").factory("Offer", t), t.$inject = ["$resource"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s, i) {
        function l() {
            function t() {
                var t = [d.predicate + "," + (d.reverse ? "asc" : "desc")];
                return "id" !== d.predicate && t.push("id"), t
            }

            function e(t, e) {
                d.links = n.parse(e("link")), d.totalItems = e("X-Total-Count"), d.queryCount = d.totalItems, d.offers = t, d.page = i.page
            }

            function s(t) {
                r.error(t.data.message)
            }

            a.query({page: i.page - 1, size: d.itemsPerPage, sort: t()}, e, s)
        }

        function o(t) {
            d.page = t, d.transition()
        }

        function c() {
            e.transitionTo(e.$current, {
                page: d.page,
                sort: d.predicate + "," + (d.reverse ? "asc" : "desc"),
                search: d.currentSearch
            })
        }

        var d = this;
        t.trim = function (t) {
            return t.substring(0, 100)
        }, d.loadPage = o, d.predicate = i.predicate, d.reverse = i.ascending, d.transition = c, d.itemsPerPage = s.itemsPerPage, l()
    }

    angular.module("quizApp").controller("OfferController", t), t.$inject = ["$scope", "$state", "Offer", "ParseLinks", "AlertService", "paginationConstants", "pagingParams"];
}(), angular.module("quizApp").controller("ImagesCtrl", ["$scope", "Lightbox", function (t, e) {
    t.openLightboxModal = function (t, a) {
        e.openModal(t, a)
    }
}]), angular.module("bootstrapLightbox", ["ui.bootstrap"]);
try {
    angular.module("angular-loading-bar"), angular.module("bootstrapLightbox").requires.push("angular-loading-bar")
} catch (t) {
}
try {
    angular.module("ngTouch"), angular.module("bootstrapLightbox").requires.push("ngTouch")
} catch (t) {
}
try {
    angular.module("videosharing-embed"), angular.module("bootstrapLightbox").requires.push("videosharing-embed")
} catch (t) {
}
angular.module("bootstrapLightbox").run(["$templateCache", function (t) {
    "use strict";
    t.put("lightbox.html", '<div class=modal-body ng-swipe-left=Lightbox.nextImage() ng-swipe-right=Lightbox.prevImage()><div class=lightbox-nav><button class=close aria-hidden=true ng-click=$dismiss()>×</button><div class=btn-group ng-if="Lightbox.images.length > 1"><a class="btn btn-xs btn-default" ng-click=Lightbox.prevImage()>‹ Previous</a> <a ng-href={{Lightbox.imageUrl}} target=_blank class="btn btn-xs btn-default" title="Open in new tab">Open image in new tab</a> <a class="btn btn-xs btn-default" ng-click=Lightbox.nextImage()>Next ›</a></div></div><div class=lightbox-image-container><div class=lightbox-image-caption><span>{{Lightbox.imageCaption}}</span></div><img ng-if=!Lightbox.isVideo(Lightbox.image) lightbox-src={{Lightbox.imageUrl}}><div ng-if=Lightbox.isVideo(Lightbox.image) class="embed-responsive embed-responsive-16by9"><video ng-if=!Lightbox.isSharedVideo(Lightbox.image) lightbox-src={{Lightbox.imageUrl}} controls autoplay></video><embed-video ng-if=Lightbox.isSharedVideo(Lightbox.image) lightbox-src={{Lightbox.imageUrl}} ng-href={{Lightbox.imageUrl}} iframe-id=lightbox-video class=embed-responsive-item><a ng-href={{Lightbox.imageUrl}}>Watch video</a></embed-video></div></div></div>')
}]), angular.module("bootstrapLightbox").service("ImageLoader", ["$q", function (t) {
    this.load = function (e) {
        var a = t.defer(), n = new Image;
        return n.onload = function () {
            ("boolean" == typeof this.complete && this.complete === !1 || "number" == typeof this.naturalWidth && 0 === this.naturalWidth) && a.reject(), a.resolve(n)
        }, n.onerror = function () {
            a.reject()
        }, n.src = e, a.promise
    }
}]), angular.module("bootstrapLightbox").provider("Lightbox", function () {
    this.templateUrl = "lightbox.html", this.fullScreenMode = !1, this.getImageUrl = function (t) {
        return "string" == typeof t ? t : t.url
    }, this.getImageCaption = function (t) {
        return t.caption
    }, this.calculateImageDimensionLimits = function (t) {
        return t.windowWidth >= 768 ? {
                maxWidth: t.windowWidth - 92,
                maxHeight: t.windowHeight - 126
            } : {maxWidth: t.windowWidth - 52, maxHeight: t.windowHeight - 86}
    }, this.calculateModalDimensions = function (t) {
        var e = Math.max(400, t.imageDisplayWidth + 32), a = Math.max(200, t.imageDisplayHeight + 66);
        return (e >= t.windowWidth - 20 || t.windowWidth < 768) && (e = "auto"), a >= t.windowHeight && (a = "auto"), {
            width: e,
            height: a
        }
    }, this.isVideo = function (t) {
        return !("object" != typeof t || !t || !t.type) && "video" === t.type
    }, this.isSharedVideo = function (t) {
        return this.isVideo(t) && !this.getImageUrl(t).match(/\.(mp4|ogg|webm)$/)
    }, this.$get = ["$document", "$injector", "$uibModal", "$timeout", "ImageLoader", function (t, e, a, n, r) {
        var s = e.has("cfpLoadingBar") ? e.get("cfpLoadingBar") : null, i = {};
        return i.images = [], i.index = -1, i.templateUrl = this.templateUrl, i.fullScreenMode = this.fullScreenMode, i.getImageUrl = this.getImageUrl, i.getImageCaption = this.getImageCaption, i.calculateImageDimensionLimits = this.calculateImageDimensionLimits, i.calculateModalDimensions = this.calculateModalDimensions, i.isVideo = this.isVideo, i.isSharedVideo = this.isSharedVideo, i.keyboardNavEnabled = !1, i.image = {}, i.modalInstance = null, i.loading = !1, i.openModal = function (t, e, n) {
            return i.images = t, i.setImage(e), i.modalInstance = a.open(angular.extend({
                templateUrl: i.templateUrl,
                controller: ["$scope", function (t) {
                    t.Lightbox = i, i.keyboardNavEnabled = !0
                }],
                windowClass: "lightbox-modal"
            }, n || {})), i.modalInstance.result.finally(function () {
                i.images = [], i.index = 1, i.image = {}, i.imageUrl = null, i.imageCaption = null, i.keyboardNavEnabled = !1, s && s.complete()
            }), i.modalInstance
        }, i.closeModal = function (t) {
            return i.modalInstance.close(t)
        }, i.setImage = function (t) {
            if (!(t in i.images))throw"Invalid image.";
            i.loading = !0, s && s.start();
            var e = i.images[t], a = i.getImageUrl(e), n = function (n) {
                n = n || {}, i.index = n.index || t, i.image = n.image || e, i.imageUrl = n.imageUrl || a, i.imageCaption = n.imageCaption || i.getImageCaption(e), i.loading = !1, s && s.complete()
            };
            i.isVideo(e) ? n() : r.load(a).then(function () {
                    n()
                }, function () {
                    n({imageUrl: "#", imageCaption: "Failed to load image"})
                })
        }, i.firstImage = function () {
            i.setImage(0)
        }, i.prevImage = function () {
            i.setImage((i.index - 1 + i.images.length) % i.images.length)
        }, i.nextImage = function () {
            i.setImage((i.index + 1) % i.images.length)
        }, i.lastImage = function () {
            i.setImage(i.images.length - 1)
        }, i.setImages = function (t) {
            i.images = t, i.setImage(i.index)
        }, t.bind("keydown", function (t) {
            if (i.keyboardNavEnabled) {
                var e = null;
                switch (t.which) {
                    case 39:
                        e = "nextImage";
                        break;
                    case 37:
                        e = "prevImage"
                }
                null !== e && -1 === ["input", "textarea"].indexOf(t.target.tagName.toLowerCase()) && (n(function () {
                    i[e]()
                }), t.preventDefault())
            }
        }), i
    }]
}), angular.module("bootstrapLightbox").directive("lightboxSrc", ["$window", "ImageLoader", "Lightbox", function (t, e, a) {
    var n = function (t, e) {
        var a = t.width, n = t.height, r = t.minWidth, s = t.minHeight, i = t.maxWidth, l = t.maxHeight, o = a, c = n;
        if (e) {
            var d = Math.min(i / a, l / n), u = Math.round(a * d), p = Math.round(n * d);
            o = Math.max(r, u), c = Math.max(s, p)
        } else r > a && s > n ? a / n > i / l ? (c = s, o = Math.round(a * s / n)) : (o = r, c = Math.round(n * r / a)) : r > a ? (o = r, c = Math.round(n * r / a)) : s > n && (c = s, o = Math.round(a * s / n)), a > i && n > l ? a / n > i / l ? (o = i, c = Math.round(n * i / a)) : (c = l, o = Math.round(a * l / n)) : a > i ? (o = i, c = Math.round(n * i / a)) : n > l && (c = l, o = Math.round(a * l / n));
        return {width: o || 0, height: c || 0}
    }, r = function (t) {
        return "number" == typeof t ? t + "px" : t
    }, s = 0, i = 0;
    return {
        link: function (l, o, c) {
            var d = function () {
                var e = t.innerWidth, l = t.innerHeight, c = a.calculateImageDimensionLimits({
                    windowWidth: e,
                    windowHeight: l,
                    imageWidth: s,
                    imageHeight: i
                }), d = n(angular.extend({
                    width: s,
                    height: i,
                    minWidth: 1,
                    minHeight: 1,
                    maxWidth: 3e3,
                    maxHeight: 3e3
                }, c), a.fullScreenMode), u = a.calculateModalDimensions({
                    windowWidth: e,
                    windowHeight: l,
                    imageDisplayWidth: d.width,
                    imageDisplayHeight: d.height
                });
                o.css({
                    width: d.width + "px",
                    height: d.height + "px"
                }), angular.element(document.querySelector(".lightbox-modal .modal-dialog")).css({width: r(u.width)}), angular.element(document.querySelector(".lightbox-modal .modal-content")).css({height: r(u.height)})
            };
            l.$watch(function () {
                return c.lightboxSrc
            }, function (t) {
                if (a.image)if (a.isVideo(a.image)) s = 1280, i = 720, d(), o[0].src = t; else {
                    o[0].src = "#";
                    var n = function () {
                        s = 0, i = 0, d()
                    };
                    t ? e.load(t).then(function (e) {
                            s = e.naturalWidth, i = e.naturalHeight, d(), o[0].src = t
                        }, n) : n()
                }
            }), angular.element(t).on("resize", d)
        }
    }
}]), angular.module("bootstrapLightbox", ["ui.bootstrap"]);
try {
    angular.module("angular-loading-bar"), angular.module("bootstrapLightbox").requires.push("angular-loading-bar")
} catch (t) {
}
angular.module("bootstrapLightbox").run(["$templateCache", function (t) {
    "use strict";
    t.put("lightbox.html", '<div class=modal-body ng-swipe-left=Lightbox.nextImage() ng-swipe-right=Lightbox.prevImage()><div class=lightbox-nav><button class=close aria-hidden=true ng-click=$dismiss()>×</button><div class=btn-group ng-if="Lightbox.images.length > 1"><a class="btn btn-xs btn-default" ng-click=Lightbox.prevImage()>‹ Previous</a> <a ng-href={{Lightbox.imageUrl}} target=_blank class="btn btn-xs btn-default" title="Open in new tab">Open image in new tab</a> <a class="btn btn-xs btn-default" ng-click=Lightbox.nextImage()>Next ›</a></div></div><div class=lightbox-image-container><div class=lightbox-image-caption><span>{{Lightbox.imageCaption}}</span></div><img ng-if=!Lightbox.isVideo(Lightbox.image) lightbox-src={{Lightbox.imageUrl}}><div ng-if=Lightbox.isVideo(Lightbox.image) class="embed-responsive embed-responsive-16by9"><video ng-if=!Lightbox.isSharedVideo(Lightbox.image) lightbox-src={{Lightbox.imageUrl}} controls autoplay></video><embed-video ng-if=Lightbox.isSharedVideo(Lightbox.image) lightbox-src={{Lightbox.imageUrl}} ng-href={{Lightbox.imageUrl}} iframe-id=lightbox-video class=embed-responsive-item><a ng-href={{Lightbox.imageUrl}}>Watch video</a></embed-video></div></div></div>')
}]), angular.module("bootstrapLightbox").service("ImageLoader", ["$q", function (t) {
    this.load = function (e) {
        var a = t.defer(), n = new Image;
        return n.onload = function () {
            ("boolean" == typeof this.complete && this.complete === !1 || "number" == typeof this.naturalWidth && 0 === this.naturalWidth) && a.reject(), a.resolve(n)
        }, n.onerror = function () {
            a.reject()
        }, n.src = e, a.promise
    }
}]), angular.module("bootstrapLightbox").provider("Lightbox", function () {
    this.templateUrl = "lightbox.html", this.fullScreenMode = !1, this.getImageUrl = function (t) {
        return "string" == typeof t ? t : t.url
    }, this.getImageCaption = function (t) {
        return t.caption
    }, this.calculateImageDimensionLimits = function (t) {
        return t.windowWidth >= 768 ? {
                maxWidth: t.windowWidth - 92,
                maxHeight: t.windowHeight - 126
            } : {maxWidth: t.windowWidth - 52, maxHeight: t.windowHeight - 86}
    }, this.calculateModalDimensions = function (t) {
        var e = Math.max(400, t.imageDisplayWidth + 32), a = Math.max(200, t.imageDisplayHeight + 66);
        return (e >= t.windowWidth - 20 || t.windowWidth < 768) && (e = "auto"), a >= t.windowHeight && (a = "auto"), {
            width: e,
            height: a
        }
    }, this.isVideo = function (t) {
        return !("object" != typeof t || !t || !t.type) && "video" === t.type
    }, this.isSharedVideo = function (t) {
        return this.isVideo(t) && !this.getImageUrl(t).match(/\.(mp4|ogg|webm)$/)
    }, this.$get = ["$document", "$injector", "$uibModal", "$timeout", "ImageLoader", function (t, e, a, n, r) {
        var s = e.has("cfpLoadingBar") ? e.get("cfpLoadingBar") : null, i = {};
        return i.images = [], i.index = -1, i.templateUrl = this.templateUrl, i.fullScreenMode = this.fullScreenMode, i.getImageUrl = this.getImageUrl, i.getImageCaption = this.getImageCaption, i.calculateImageDimensionLimits = this.calculateImageDimensionLimits, i.calculateModalDimensions = this.calculateModalDimensions, i.isVideo = this.isVideo, i.isSharedVideo = this.isSharedVideo, i.keyboardNavEnabled = !1, i.image = {}, i.modalInstance = null, i.loading = !1, i.openModal = function (t, e, n) {
            return i.images = t, i.setImage(e), i.modalInstance = a.open(angular.extend({
                templateUrl: i.templateUrl,
                controller: ["$scope", function (t) {
                    t.Lightbox = i, i.keyboardNavEnabled = !0
                }],
                windowClass: "lightbox-modal"
            }, n || {})), i.modalInstance.result.finally(function () {
                i.images = [], i.index = 1, i.image = {}, i.imageUrl = null, i.imageCaption = null, i.keyboardNavEnabled = !1, s && s.complete()
            }), i.modalInstance
        }, i.closeModal = function (t) {
            return i.modalInstance.close(t)
        }, i.setImage = function (t) {
            if (!(t in i.images))throw"Invalid image.";
            i.loading = !0, s && s.start();
            var e = i.images[t], a = i.getImageUrl(e), n = function (n) {
                n = n || {}, i.index = n.index || t, i.image = n.image || e, i.imageUrl = n.imageUrl || a, i.imageCaption = n.imageCaption || i.getImageCaption(e), i.loading = !1, s && s.complete()
            };
            i.isVideo(e) ? n() : r.load(a).then(function () {
                    n()
                }, function () {
                    n({imageUrl: "#", imageCaption: "Failed to load image"})
                })
        }, i.firstImage = function () {
            i.setImage(0)
        }, i.prevImage = function () {
            i.setImage((i.index - 1 + i.images.length) % i.images.length)
        }, i.nextImage = function () {
            i.setImage((i.index + 1) % i.images.length)
        }, i.lastImage = function () {
            i.setImage(i.images.length - 1)
        }, i.setImages = function (t) {
            i.images = t, i.setImage(i.index)
        }, t.bind("keydown", function (t) {
            if (i.keyboardNavEnabled) {
                var e = null;
                switch (t.which) {
                    case 39:
                        e = "nextImage";
                        break;
                    case 37:
                        e = "prevImage"
                }
                null !== e && ["input", "textarea"].indexOf(t.target.tagName.toLowerCase()) === -1 && (n(function () {
                    i[e]()
                }), t.preventDefault())
            }
        }), i
    }]
}), angular.module("bootstrapLightbox").directive("lightboxSrc", ["$window", "ImageLoader", "Lightbox", function (t, e, a) {
    var n = function (t, e) {
        var a = t.width, n = t.height, r = t.minWidth, s = t.minHeight, i = t.maxWidth, l = t.maxHeight, o = a, c = n;
        if (e) {
            var d = Math.min(i / a, l / n), u = Math.round(a * d), p = Math.round(n * d);
            o = Math.max(r, u), c = Math.max(s, p)
        } else a < r && n < s ? a / n > i / l ? (c = s, o = Math.round(a * s / n)) : (o = r, c = Math.round(n * r / a)) : a < r ? (o = r, c = Math.round(n * r / a)) : n < s && (c = s, o = Math.round(a * s / n)), a > i && n > l ? a / n > i / l ? (o = i, c = Math.round(n * i / a)) : (c = l, o = Math.round(a * l / n)) : a > i ? (o = i, c = Math.round(n * i / a)) : n > l && (c = l, o = Math.round(a * l / n));
        return {width: o || 0, height: c || 0}
    }, r = function (t) {
        return "number" == typeof t ? t + "px" : t
    }, s = 0, i = 0;
    return {
        link: function (l, o, c) {
            var d = function () {
                var e = t.innerWidth, l = t.innerHeight, c = a.calculateImageDimensionLimits({
                    windowWidth: e,
                    windowHeight: l,
                    imageWidth: s,
                    imageHeight: i
                }), d = n(angular.extend({
                    width: s,
                    height: i,
                    minWidth: 1,
                    minHeight: 1,
                    maxWidth: 3e3,
                    maxHeight: 3e3
                }, c), a.fullScreenMode), u = a.calculateModalDimensions({
                    windowWidth: e,
                    windowHeight: l,
                    imageDisplayWidth: d.width,
                    imageDisplayHeight: d.height
                });
                o.css({
                    width: d.width + "px",
                    height: d.height + "px"
                }), angular.element(document.querySelector(".lightbox-modal .modal-dialog")).css({width: r(u.width)}), angular.element(document.querySelector(".lightbox-modal .modal-content")).css({height: r(u.height)})
            };
            l.$watch(function () {
                return c.lightboxSrc
            }, function (t) {
                if (a.image)if (a.isVideo(a.image)) s = 1280, i = 720, d(), o[0].src = t; else {
                    o[0].src = "#";
                    var n = function () {
                        s = 0, i = 0, d()
                    };
                    t ? e.load(t).then(function (e) {
                            s = e.naturalWidth, i = e.naturalHeight, d(), o[0].src = t
                        }, n) : n()
                }
            }), angular.element(t).on("resize", d)
        }
    }
}]), function () {
    "use strict";
    function t(t, e, a, n, r, s) {
        function i() {
            n.dismiss("cancel")
        }

        function l() {
            d.isSaving = !0, d.tempFile && (d.help.file = d.tempFile.replace(/^data:image\/[a-z]+;base64,/, "")), null !== d.help.id ? s.update(d.help, o, c) : s.save(d.help, o, c)
        }

        function o(t) {
            e.$emit("quizApp:helpUpdate", t), n.close(t), d.isSaving = !1
        }

        function c() {
            d.isSaving = !1
        }

        var d = this, u = "";
        d.help = r, d.clear = i, d.save = l, d.tempFile = u, t(function () {
            angular.element(".form-group:eq(1)>input").focus()
        })
    }

    angular.module("quizApp").controller("HelpDialogController", t), t.$inject = ["$timeout", "$scope", "$stateParams", "$uibModalInstance", "entity", "Help"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s) {
        var i = this;
        i.help = r, i.previousState = n.name;
        var l = e.$on("quizApp:helpUpdate", function (t, e) {
            i.help = e
        });
        t.$on("$destroy", l)
    }

    angular.module("quizApp").controller("HelpDetailController", t), t.$inject = ["$scope", "$rootScope", "$stateParams", "previousState", "entity", "Help"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n() {
            t.dismiss("cancel")
        }

        function r(e) {
            a.delete({id: e}, function () {
                t.close(!0)
            })
        }

        var s = this;
        s.help = e, s.clear = n, s.confirmDelete = r
    }

    angular.module("quizApp").controller("HelpDeleteController", t), t.$inject = ["$uibModalInstance", "entity", "Help"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("help", {
            parent: "entity",
            url: "/help",
            data: {authorities: ["ROLE_USER"], pageTitle: "quizApp.help.home.title"},
            views: {
                "content@": {
                    templateUrl: "app/entities/help/helps.html",
                    controller: "HelpController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("help"), e.addPart("global"), t.refresh()
                }]
            }
        }).state("help-detail", {
            parent: "entity",
            url: "/help/{id}",
            data: {authorities: ["ROLE_USER"], pageTitle: "quizApp.help.detail.title"},
            views: {
                "content@": {
                    templateUrl: "app/entities/help/help-detail.html",
                    controller: "HelpDetailController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("help"), t.refresh()
                }], entity: ["$stateParams", "Help", function (t, e) {
                    return e.get({id: t.id}).$promise
                }], previousState: ["$state", function (t) {
                    var e = {name: t.current.name || "help", params: t.params, url: t.href(t.current.name, t.params)};
                    return e
                }]
            }
        }).state("help-detail.edit", {
            parent: "help-detail",
            url: "/detail/edit",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/help/help-dialog.html",
                    controller: "HelpDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: ["Help", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("^", {}, {reload: !1})
                }, function () {
                    e.go("^")
                })
            }]
        }).state("help.new", {
            parent: "help",
            url: "/new",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/help/help-dialog.html",
                    controller: "HelpDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: function () {
                            return {title: null, description: null, image: null, id: null}
                        }
                    }
                }).result.then(function () {
                    e.go("help", null, {reload: "help"})
                }, function () {
                    e.go("help")
                })
            }]
        }).state("help.edit", {
            parent: "help",
            url: "/{id}/edit",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/help/help-dialog.html",
                    controller: "HelpDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: ["Help", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("help", null, {reload: "help"})
                }, function () {
                    e.go("^")
                })
            }]
        }).state("help.delete", {
            parent: "help",
            url: "/{id}/delete",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/help/help-delete-dialog.html",
                    controller: "HelpDeleteController",
                    controllerAs: "vm",
                    size: "md",
                    resolve: {
                        entity: ["Help", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("help", null, {reload: "help"})
                }, function () {
                    e.go("^")
                })
            }]
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t) {
        var e = "api/help/:id";
        return t(e, {}, {
            query: {method: "GET", isArray: !0}, get: {
                method: "GET", transformResponse: function (t) {
                    return t && (t = angular.fromJson(t)), t
                }
            }, update: {method: "PUT"}
        })
    }

    angular.module("quizApp").factory("Help", t), t.$inject = ["$resource"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n() {
            a.query(function (t) {
                r.helps = t, r.searchQuery = null
            })
        }

        var r = this;
        r.helps = [], n()
    }

    angular.module("quizApp").controller("HelpController", t), t.$inject = ["$scope", "$state", "Help"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("entity", {abstract: !0, parent: "app"})
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s) {
        function i() {
            n.dismiss("cancel")
        }

        function l() {
            d.isSaving = !0, null !== d.category.id ? s.update(d.category, o, c) : s.save(d.category, o, c)
        }

        function o(t) {
            e.$emit("quizApp:categoryUpdate", t), n.close(t), d.isSaving = !1
        }

        function c() {
            d.isSaving = !1
        }

        var d = this;
        d.category = r, d.clear = i, d.save = l, t(function () {
            angular.element(".form-group:eq(1)>input").focus()
        })
    }

    angular.module("quizApp").controller("CategoryDialogController", t), t.$inject = ["$timeout", "$scope", "$stateParams", "$uibModalInstance", "entity", "Category"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s) {
        var i = this;
        i.category = r, i.previousState = n.name;
        var l = e.$on("quizApp:categoryUpdate", function (t, e) {
            i.category = e
        });
        t.$on("$destroy", l)
    }

    angular.module("quizApp").controller("CategoryDetailController", t), t.$inject = ["$scope", "$rootScope", "$stateParams", "previousState", "entity", "Category"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n() {
            t.dismiss("cancel")
        }

        function r(e) {
            a.delete({id: e}, function () {
                t.close(!0)
            })
        }

        var s = this;
        s.category = e, s.clear = n, s.confirmDelete = r
    }

    angular.module("quizApp").controller("CategoryDeleteController", t), t.$inject = ["$uibModalInstance", "entity", "Category"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("category", {
            parent: "entity",
            url: "/category?page&sort&search",
            data: {authorities: ["ROLE_USER"], pageTitle: "quizApp.category.home.title"},
            views: {
                "content@": {
                    templateUrl: "app/entities/category/categories.html",
                    controller: "CategoryController",
                    controllerAs: "vm"
                }
            },
            params: {page: {value: "1", squash: !0}, sort: {value: "id,asc", squash: !0}, search: null},
            resolve: {
                pagingParams: ["$stateParams", "PaginationUtil", function (t, e) {
                    return {
                        page: e.parsePage(t.page),
                        sort: t.sort,
                        predicate: e.parsePredicate(t.sort),
                        ascending: e.parseAscending(t.sort),
                        search: t.search
                    }
                }], translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("category"), e.addPart("global"), t.refresh()
                }]
            }
        }).state("category-detail", {
            parent: "entity",
            url: "/category/{id}",
            data: {authorities: ["ROLE_USER"], pageTitle: "quizApp.category.detail.title"},
            views: {
                "content@": {
                    templateUrl: "app/entities/category/category-detail.html",
                    controller: "CategoryDetailController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("category"), t.refresh()
                }], entity: ["$stateParams", "Category", function (t, e) {
                    return e.get({id: t.id}).$promise
                }], previousState: ["$state", function (t) {
                    var e = {
                        name: t.current.name || "category",
                        params: t.params,
                        url: t.href(t.current.name, t.params)
                    };
                    return e
                }]
            }
        }).state("category-detail.edit", {
            parent: "category-detail",
            url: "/detail/edit",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/category/category-dialog.html",
                    controller: "CategoryDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: ["Category", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("^", {}, {reload: !1})
                }, function () {
                    e.go("^")
                })
            }]
        }).state("category.new", {
            parent: "category",
            url: "/new",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/category/category-dialog.html",
                    controller: "CategoryDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: function () {
                            return {name: null, id: null}
                        }
                    }
                }).result.then(function () {
                    e.go("category", null, {reload: "category"})
                }, function () {
                    e.go("category")
                })
            }]
        }).state("category.edit", {
            parent: "category",
            url: "/{id}/edit",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/category/category-dialog.html",
                    controller: "CategoryDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: ["Category", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("category", null, {reload: "category"})
                }, function () {
                    e.go("^")
                })
            }]
        }).state("category.delete", {
            parent: "category",
            url: "/{id}/delete",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/category/category-delete-dialog.html",
                    controller: "CategoryDeleteController",
                    controllerAs: "vm",
                    size: "md",
                    resolve: {
                        entity: ["Category", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("category", null, {reload: "category"})
                }, function () {
                    e.go("^")
                })
            }]
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t) {
        var e = "api/categories/:id";
        return t(e, {}, {
            query: {method: "GET", isArray: !0}, get: {
                method: "GET", transformResponse: function (t) {
                    return t && (t = angular.fromJson(t)), t
                }
            }, update: {method: "PUT"}
        })
    }

    angular.module("quizApp").factory("Category", t), t.$inject = ["$resource"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s, i) {
        function l() {
            function t() {
                var t = [d.predicate + "," + (d.reverse ? "asc" : "desc")];
                return "id" !== d.predicate && t.push("id"), t
            }

            function e(t, e) {
                d.links = n.parse(e("link")), d.totalItems = e("X-Total-Count"), d.queryCount = d.totalItems, d.categories = t, d.page = i.page
            }

            function s(t) {
                r.error(t.data.message)
            }

            a.query({page: i.page - 1, size: d.itemsPerPage, sort: t()}, e, s)
        }

        function o(t) {
            d.page = t, d.transition()
        }

        function c() {
            e.transitionTo(e.$current, {
                page: d.page,
                sort: d.predicate + "," + (d.reverse ? "asc" : "desc"),
                search: d.currentSearch
            })
        }

        var d = this;
        d.loadPage = o, d.predicate = i.predicate, d.reverse = i.ascending, d.transition = c, d.itemsPerPage = s.itemsPerPage, l()
    }

    angular.module("quizApp").controller("CategoryController", t), t.$inject = ["$scope", "$state", "Category", "ParseLinks", "AlertService", "paginationConstants", "pagingParams"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s) {
        function i() {
            n.dismiss("cancel")
        }

        function l() {
            d.isSaving = !0, null !== d.avatar.id ? s.update(d.avatar, o, c) : s.save(d.avatar, o, c)
        }

        function o(t) {
            e.$emit("quizApp:avatarUpdate", t), n.close(t), d.isSaving = !1
        }

        function c() {
            d.isSaving = !1
        }

        var d = this;
        d.avatar = r, d.clear = i, d.save = l, t(function () {
            angular.element(".form-group:eq(1)>input").focus()
        })
    }

    angular.module("quizApp").controller("AvatarDialogController", t), t.$inject = ["$timeout", "$scope", "$stateParams", "$uibModalInstance", "entity", "Avatar"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s) {
        var i = this;
        i.avatar = r, i.previousState = n.name;
        var l = e.$on("quizApp:avatarUpdate", function (t, e) {
            i.avatar = e
        });
        t.$on("$destroy", l)
    }

    angular.module("quizApp").controller("AvatarDetailController", t), t.$inject = ["$scope", "$rootScope", "$stateParams", "previousState", "entity", "Avatar"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n() {
            t.dismiss("cancel")
        }

        function r(e) {
            a.delete({id: e}, function () {
                t.close(!0)
            })
        }

        var s = this;
        s.avatar = e, s.clear = n, s.confirmDelete = r
    }

    angular.module("quizApp").controller("AvatarDeleteController", t), t.$inject = ["$uibModalInstance", "entity", "Avatar"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("avatar", {
            parent: "entity",
            url: "/avatar",
            data: {authorities: ["ROLE_USER"], pageTitle: "quizApp.avatar.home.title"},
            views: {
                "content@": {
                    templateUrl: "app/entities/avatar/avatars.html",
                    controller: "AvatarController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("avatar"), e.addPart("global"), t.refresh()
                }]
            }
        }).state("avatar-detail", {
            parent: "entity",
            url: "/avatar/{id}",
            data: {authorities: ["ROLE_USER"], pageTitle: "quizApp.avatar.detail.title"},
            views: {
                "content@": {
                    templateUrl: "app/entities/avatar/avatar-detail.html",
                    controller: "AvatarDetailController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("avatar"), t.refresh()
                }], entity: ["$stateParams", "Avatar", function (t, e) {
                    return e.get({id: t.id}).$promise
                }], previousState: ["$state", function (t) {
                    var e = {name: t.current.name || "avatar", params: t.params, url: t.href(t.current.name, t.params)};
                    return e
                }]
            }
        }).state("avatar-detail.edit", {
            parent: "avatar-detail",
            url: "/detail/edit",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/avatar/avatar-dialog.html",
                    controller: "AvatarDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: ["Avatar", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("^", {}, {reload: !1})
                }, function () {
                    e.go("^")
                })
            }]
        }).state("avatar.new", {
            parent: "avatar",
            url: "/new",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/avatar/avatar-dialog.html",
                    controller: "AvatarDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: function () {
                            return {path: null, id: null}
                        }
                    }
                }).result.then(function () {
                    e.go("avatar", null, {reload: "avatar"})
                }, function () {
                    e.go("avatar")
                })
            }]
        }).state("avatar.edit", {
            parent: "avatar",
            url: "/{id}/edit",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/avatar/avatar-dialog.html",
                    controller: "AvatarDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: ["Avatar", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("avatar", null, {reload: "avatar"})
                }, function () {
                    e.go("^")
                })
            }]
        }).state("avatar.delete", {
            parent: "avatar",
            url: "/{id}/delete",
            data: {authorities: ["ROLE_USER"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/entities/avatar/avatar-delete-dialog.html",
                    controller: "AvatarDeleteController",
                    controllerAs: "vm",
                    size: "md",
                    resolve: {
                        entity: ["Avatar", function (e) {
                            return e.get({id: t.id}).$promise
                        }]
                    }
                }).result.then(function () {
                    e.go("avatar", null, {reload: "avatar"})
                }, function () {
                    e.go("^")
                })
            }]
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t) {
        var e = "api/avatars/:id";
        return t(e, {}, {
            query: {method: "GET", isArray: !0}, get: {
                method: "GET", transformResponse: function (t) {
                    return t && (t = angular.fromJson(t)), t
                }
            }, update: {method: "PUT"}
        })
    }

    angular.module("quizApp").factory("Avatar", t), t.$inject = ["$resource"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n() {
            a.query(function (t) {
                r.avatars = t, r.searchQuery = null
            })
        }

        var r = this;
        r.avatars = [], n()
    }

    angular.module("quizApp").controller("AvatarController", t), t.$inject = ["$scope", "$state", "Avatar"]
}(), function () {
    "use strict";
    function t() {
        function t(t, e) {
            if (isNaN(e))return t;
            if (e <= 0)return "";
            if (t) {
                var a = t.split(/\s+/);
                a.length > e && (t = a.slice(0, e).join(" ") + "...")
            }
            return t
        }

        return t
    }

    angular.module("quizApp").filter("words", t)
}(), function () {
    "use strict";
    function t() {
        function t(t, e, a) {
            if (isNaN(e))return t;
            if (e <= 0)return "";
            if (t && t.length > e) {
                if (t = t.substring(0, e), a)for (; " " === t.charAt(t.length - 1);)t = t.substr(0, t.length - 1); else {
                    var n = t.lastIndexOf(" ");
                    n !== -1 && (t = t.substr(0, n))
                }
                return t + "..."
            }
            return t
        }

        return t
    }

    angular.module("quizApp").filter("characters", t)
}(), function () {
    "use strict";
    function t() {
        function t(t, e, a, n) {
            e.bind("click", function () {
                n.sort(a.jhSortBy)
            })
        }

        var e = {restrict: "A", scope: !1, require: "^jhSort", link: t};
        return e
    }

    angular.module("quizApp").directive("jhSortBy", t)
}(), function () {
    "use strict";
    function t() {
        var t = {
            restrict: "A",
            scope: {predicate: "=jhSort", ascending: "=", callback: "&"},
            controller: e,
            controllerAs: "vm",
            bindToController: !0
        };
        return t
    }

    function e(t, e) {
        function a(t) {
            var e = t.find("span.glyphicon"), a = "glyphicon-sort", n = "glyphicon-sort-by-attributes", r = "glyphicon-sort-by-attributes-alt", s = a + " " + r, l = n;
            i.ascending || (s = a + " " + n, l = r), i.resetClasses(), e.removeClass(s), e.addClass(l)
        }

        function n() {
            var t = e.find("span.glyphicon"), a = "glyphicon-sort", n = "glyphicon-sort-by-attributes", r = "glyphicon-sort-by-attributes-alt";
            t.removeClass(n + " " + r), t.addClass(a)
        }

        function r(e) {
            e !== i.predicate ? i.ascending = !0 : i.ascending = !i.ascending, i.predicate = e, t.$apply(), i.callback()
        }

        function s(t) {
            i.resetClasses(), t && "_score" !== t[0] && i.applyClass(e.find("th[jh-sort-by='" + t[0] + "']"))
        }

        var i = this;
        i.applyClass = a, i.resetClasses = n, i.sort = r, i.triggerApply = s, t.$watchGroup(["vm.predicate", "vm.ascending"], i.triggerApply), i.triggerApply()
    }

    angular.module("quizApp").directive("jhSort", t), e.$inject = ["$scope", "$element"]
}(), function () {
    "use strict";
    function t() {
        function t(t) {
            if (0 === t.length)throw new Error("input must not be of zero length");
            var e = t.split(","), a = {};
            return angular.forEach(e, function (t) {
                var e = t.split(">;");
                if (2 !== e.length)throw new Error('section could not be split on ">;"');
                var n = e[0].replace(/<(.*)/, "$1").trim(), r = {};
                n.replace(new RegExp("([^?=&]+)(=([^&]*))?", "g"), function (t, e, a, n) {
                    r[e] = n
                });
                var s = r.page;
                angular.isString(s) && (s = parseInt(s));
                var i = e[1].replace(/rel="(.*)"/, "$1").trim();
                a[i] = s
            }), a
        }

        var e = {parse: t};
        return e
    }

    angular.module("quizApp").factory("ParseLinks", t)
}(), function () {
    "use strict";
    function t() {
        function t(t) {
            var e = t.split(",");
            return !(e.length > 1) || "asc" === t.split(",").slice(-1)[0]
        }

        function e(t) {
            return parseInt(t)
        }

        function a(t) {
            var e = t.split(",");
            return e.length > 1 && e.pop(), e.join(",")
        }

        var n = {parseAscending: t, parsePage: e, parsePredicate: a};
        return n
    }

    angular.module("quizApp").factory("PaginationUtil", t)
}(), function () {
    "use strict";
    var t = {
        template: '<div class="info">Showing {{(($ctrl.page - 1) * $ctrl.itemsPerPage) == 0 ? 1 : (($ctrl.page - 1) * $ctrl.itemsPerPage + 1)}} - {{($ctrl.page * $ctrl.itemsPerPage) < $ctrl.queryCount ? ($ctrl.page * $ctrl.itemsPerPage) : $ctrl.queryCount}} of {{$ctrl.queryCount}} items.</div>',
        bindings: {page: "<", queryCount: "<total", itemsPerPage: "<"}
    };
    angular.module("quizApp").component("jhiItemCount", t)
}(), function () {
    "use strict";
    function t(t) {
        function e(t) {
            return t ? new Date(t) : null
        }

        function a(t) {
            if (t) {
                var e = t.split("-");
                return new Date(e[0], e[1] - 1, e[2])
            }
            return null
        }

        function n(e) {
            return e ? t("date")(e, "yyyy-MM-dd") : null
        }

        function r() {
            return "yyyy-MM-dd"
        }

        var s = {
            convertDateTimeFromServer: e,
            convertLocalDateFromServer: a,
            convertLocalDateToServer: n,
            dateformat: r
        };
        return s
    }

    angular.module("quizApp").factory("DateUtils", t), t.$inject = ["$filter"]
}(), function () {
    "use strict";
    function t(t) {
        function e(t) {
            return angular.isString(t) ? t.length < 30 ? t : t ? t.substring(0, 15) + "..." + t.slice(-10) : "" : ""
        }

        function a(t) {
            function e(t, e) {
                return e.indexOf(t, e.length - t.length) !== -1
            }

            function a(t) {
                return e("==", t) ? 2 : e("=", t) ? 1 : 0
            }

            function n(t) {
                return t.length / 4 * 3 - a(t)
            }

            function r(t) {
                return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " bytes"
            }

            return angular.isString(t) ? r(n(t)) : ""
        }

        function n(e, a) {
            t.open("data:" + e + ";base64," + a, "_blank", "height=300,width=400")
        }

        function r(t, e) {
            var a = new FileReader;
            a.readAsDataURL(t), a.onload = function (t) {
                var a = t.target.result.substr(t.target.result.indexOf("base64,") + "base64,".length);
                e(a)
            }
        }

        var s = {abbreviate: e, byteSize: a, openFile: n, toBase64: r};
        return s
    }

    angular.module("quizApp").factory("DataUtils", t), t.$inject = ["$window"]
}(), function () {
    "use strict";
    function t() {
        function t(t) {
            return null !== t && (t = t.toLowerCase(), t = t.substring(0, 1).toUpperCase() + t.substring(1)), t
        }

        return t
    }

    angular.module("quizApp").filter("capitalize", t)
}(), function () {
    "use strict";
    function t() {
        function t(t) {
            for (var e, n, r, s, i, l, o, c = "", d = 0; d < t.length;)e = t.charCodeAt(d++), n = t.charCodeAt(d++), r = t.charCodeAt(d++), s = e >> 2, i = (3 & e) << 4 | n >> 4, l = (15 & n) << 2 | r >> 6, o = 63 & r, isNaN(n) ? l = o = 64 : isNaN(r) && (o = 64), c = c + a.charAt(s) + a.charAt(i) + a.charAt(l) + a.charAt(o);
            return c
        }

        function e(t) {
            var e, n, r, s, i, l, o, c = "", d = 0;
            for (t = t.replace(/[^A-Za-z0-9\+\/\=]/g, ""); d < t.length;)s = a.indexOf(t.charAt(d++)), i = a.indexOf(t.charAt(d++)), l = a.indexOf(t.charAt(d++)), o = a.indexOf(t.charAt(d++)), e = s << 2 | i >> 4, n = (15 & i) << 4 | l >> 2, r = (3 & l) << 6 | o, c += String.fromCharCode(e), 64 !== l && (c += String.fromCharCode(n)), 64 !== o && (c += String.fromCharCode(r));
            return c
        }

        var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", n = {decode: e, encode: t};
        return n
    }

    angular.module("quizApp").factory("Base64", t)
}(), function () {
    "use strict";
    function t(t) {
        function e() {
            null === n && (n = t.open({
                animation: !0,
                templateUrl: "app/components/login/login.html",
                controller: "LoginController",
                controllerAs: "vm",
                resolve: {
                    translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                        return e.addPart("login"), t.refresh()
                    }]
                }
            }), n.result.then(r, r))
        }

        var a = {open: e}, n = null, r = function () {
            n = null
        };
        return a
    }

    angular.module("quizApp").factory("LoginService", t), t.$inject = ["$uibModal"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r) {
        function s() {
            c.credentials = {
                username: null,
                password: null,
                rememberMe: !0
            }, c.authenticationError = !1, r.dismiss("cancel")
        }

        function i(a) {
            a.preventDefault(), n.login({
                username: c.username,
                password: c.password,
                rememberMe: c.rememberMe
            }).then(function () {
                if (c.authenticationError = !1, r.close(), "register" !== e.current.name && "activate" !== e.current.name && "finishReset" !== e.current.name && "requestReset" !== e.current.name || e.go("home"), t.$broadcast("authenticationSuccess"), n.getPreviousState()) {
                    var a = n.getPreviousState();
                    n.resetPreviousState(), e.go(a.name, a.params)
                }
            }).catch(function () {
                c.authenticationError = !0
            })
        }

        function l() {
            r.dismiss("cancel"), e.go("register")
        }

        function o() {
            r.dismiss("cancel"), e.go("requestReset")
        }

        var c = this;
        c.authenticationError = !1, c.cancel = s, c.credentials = {}, c.login = i, c.password = null, c.register = l, c.rememberMe = !0, c.requestResetPassword = o, c.username = null, a(function () {
            angular.element("#username").focus()
        })
    }

    angular.module("quizApp").controller("LoginController", t), t.$inject = ["$rootScope", "$state", "$timeout", "Auth", "$uibModalInstance"]
}(), function () {
    "use strict";
    function t(t, e, a, n) {
        function r() {
            var e = t.defer();
            return e.resolve(n), e.promise
        }

        function s() {
            var e = t.defer(), n = a.storage().get("NG_TRANSLATE_LANG_KEY");
            return e.resolve(n), e.promise
        }

        var i = {getAll: r, getCurrent: s};
        return i
    }

    angular.module("quizApp").factory("JhiLanguageService", t), t.$inject = ["$q", "$http", "$translate", "LANGUAGES"]
}(), function () {
    "use strict";
    function t() {
        function t(t) {
            return {
                ca: "Català",
                cs: "Český",
                da: "Dansk",
                de: "Deutsch",
                el: "Ελληνικά",
                en: "English",
                es: "Español",
                et: "Eesti",
                fr: "Français",
                gl: "Galego",
                hu: "Magyar",
                hi: "हिंदी",
                it: "Italiano",
                ja: "日本語",
                ko: "한국어",
                mr: "मराठी",
                nl: "Nederlands",
                pl: "Polski",
                "pt-br": "Português (Brasil)",
                "pt-pt": "Português",
                ro: "Română",
                ru: "Русский",
                sk: "Slovenský",
                sr: "Srpski",
                sv: "Svenska",
                ta: "தமிழ்",
                tr: "Türkçe",
                vi: "Tiếng Việt",
                "zh-cn": "中文（简体）",
                "zh-tw": "繁體中文"
            }[t]
        }

        return t
    }

    angular.module("quizApp").filter("findLanguageFromKey", t)
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n(e) {
            t.use(e), a.set(e)
        }

        var r = this;
        r.changeLanguage = n, r.languages = null, e.getAll().then(function (t) {
            r.languages = t
        })
    }

    angular.module("quizApp").controller("JhiLanguageController", t), t.$inject = ["$translate", "JhiLanguageService", "tmhDynamicLocale"]
}(), function () {
    "use strict";
    angular.module("quizApp").constant("LANGUAGES", ["ru"])
}(), function () {
    "use strict";
    function t() {
        function t(t, e, a, n) {
            e.find(".form-group").each(function () {
                var e = angular.element(this), a = e.find("input[ng-model],textarea[ng-model],select[ng-model]");
                a.length > 0 && a.each(function () {
                    var a = angular.element(this), r = a.attr("name");
                    t.$watch(function () {
                        return n[r].$invalid && n[r].$dirty
                    }, function (t) {
                        e.toggleClass("has-error", t)
                    })
                })
            })
        }

        var e = {restrict: "A", require: "form", link: t};
        return e
    }

    angular.module("quizApp").directive("showValidation", t)
}(), function () {
    "use strict";
    angular.module("quizApp").constant("paginationConstants", {itemsPerPage: 20})
}(), function () {
    "use strict";
    function t() {
        function t(t, e, a, r) {
            r && (r.$validators.minbytes = function (t) {
                return r.$isEmpty(t) || n(t) >= a.minbytes
            })
        }

        function e(t, e) {
            return e.indexOf(t, e.length - t.length) !== -1
        }

        function a(t) {
            return e("==", t) ? 2 : e("=", t) ? 1 : 0
        }

        function n(t) {
            return t.length / 4 * 3 - a(t)
        }

        var r = {restrict: "A", require: "?ngModel", link: t};
        return r
    }

    angular.module("quizApp").directive("minbytes", t)
}(), function () {
    "use strict";
    function t() {
        function t(t, e, a, r) {
            r && (r.$validators.maxbytes = function (t) {
                return r.$isEmpty(t) || n(t) <= a.maxbytes
            })
        }

        function e(t, e) {
            return e.indexOf(t, e.length - t.length) !== -1
        }

        function a(t) {
            return e("==", t) ? 2 : e("=", t) ? 1 : 0
        }

        function n(t) {
            return t.length / 4 * 3 - a(t)
        }

        var r = {restrict: "A", require: "?ngModel", link: t};
        return r
    }

    angular.module("quizApp").directive("maxbytes", t)
}(), function () {
    "use strict";
    angular.module("quizApp").directive("fileread", [function () {
        return {
            scope: {fileread: "="}, link: function (t, e, a) {
                e.bind("change", function (e) {
                    var a = new FileReader;
                    a.onload = function (e) {
                        t.$apply(function () {
                            t.fileread = e.target.result
                        })
                    }, a.readAsDataURL(e.target.files[0])
                })
            }
        }
    }])
}(), function () {
    "use strict";
    angular.module("quizApp").directive("validFile", function () {
        return {
            require: "ngModel", link: function (t, e, a, n) {
                e.bind("change", function () {
                    t.$apply(function () {
                        n.$setViewValue(e.val()), n.$render()
                    })
                })
            }
        }
    })
}(), function () {
    "use strict";
    function t(t, e, a, n) {
        function r(t, a, n) {
            a = a ? a : t, s.alerts.push(e.add({
                type: "danger",
                msg: a,
                params: n,
                timeout: 5e3,
                toast: e.isToast(),
                scoped: !0
            }, s.alerts))
        }

        var s = this;
        s.alerts = [];
        var i = a.$on("quizApp.httpError", function (t, e) {
            var a;
            switch (t.stopPropagation(), e.status) {
                case 0:
                    r("Server not reachable", "error.server.not.reachable");
                    break;
                case 400:
                    var s = Object.keys(e.headers()).filter(function (t) {
                        return t.indexOf("app-error", t.length - "app-error".length) !== -1 || t.indexOf("app-params", t.length - "app-params".length) !== -1
                    }).sort(), i = e.headers(s[0]), l = e.headers(s[1]);
                    if (i) {
                        var o = n.instant("global.menu.entities." + l);
                        r(i, i, {entityName: o})
                    } else if (e.data && e.data.fieldErrors)for (a = 0; a < e.data.fieldErrors.length; a++) {
                        var c = e.data.fieldErrors[a], d = c.field.replace(/\[\d*\]/g, "[]"), u = n.instant("quizApp." + c.objectName + "." + d);
                        r("Field " + u + " cannot be empty", "error." + c.message, {fieldName: u})
                    } else e.data && e.data.message ? r(e.data.message, e.data.message, e.data) : r(e.data);
                    break;
                case 404:
                    r("Not found", "error.url.not.found");
                    break;
                default:
                    r(e.data && e.data.message ? e.data.message : angular.toJson(e))
            }
        });
        t.$on("$destroy", function () {
            angular.isDefined(i) && null !== i && (i(), s.alerts = [])
        })
    }

    var e = {
        template: '<div class="alerts" ng-cloak=""><div ng-repeat="alert in $ctrl.alerts" ng-class="[alert.position, {\'toast\': alert.toast}]"><uib-alert ng-cloak="" type="{{alert.type}}" close="alert.close($ctrl.alerts)"><pre>{{ alert.msg }}</pre></uib-alert></div></div>',
        controller: t
    };
    angular.module("quizApp").component("jhiAlertError", e), t.$inject = ["$scope", "AlertService", "$rootScope", "$translate"]
}(), function () {
    "use strict";
    function t() {
        function t(t, e, a) {
            function n() {
                return g
            }

            function r() {
                v = []
            }

            function s() {
                return v
            }

            function i(t, e, a) {
                return this.add({type: "success", msg: t, params: e, timeout: f, toast: g, position: a})
            }

            function l(t, e, a) {
                return this.add({type: "danger", msg: t, params: e, timeout: f, toast: g, position: a})
            }

            function o(t, e, a) {
                return this.add({type: "warning", msg: t, params: e, timeout: f, toast: g, position: a})
            }

            function c(t, e, a) {
                return this.add({type: "info", msg: t, params: e, timeout: f, toast: g, position: a})
            }

            function d(t) {
                var a = {
                    type: t.type,
                    msg: e.trustAsHtml(t.msg),
                    id: t.alertId,
                    timeout: t.timeout,
                    toast: t.toast,
                    position: t.position ? t.position : "top right",
                    scoped: t.scoped,
                    close: function (t) {
                        return p(this.id, t)
                    }
                };
                return a.scoped || v.push(a), a
            }

            function u(e, n) {
                e.alertId = h++, e.msg = a.instant(e.msg, e.params);
                var r = this, s = this.factory(e);
                return e.timeout && e.timeout > 0 && t(function () {
                    r.closeAlert(e.alertId, n)
                }, e.timeout), s
            }

            function p(t, e) {
                var a = e ? e : v;
                return m(a.map(function (t) {
                    return t.id
                }).indexOf(t), a)
            }

            function m(t, e) {
                return e.splice(t, 1)
            }

            var g = this.toast, h = 0, v = [], f = 5e3;
            return {
                factory: d,
                isToast: n,
                add: u,
                closeAlert: p,
                closeAlertByIndex: m,
                clear: r,
                get: s,
                success: i,
                error: l,
                info: c,
                warning: o
            }
        }

        this.toast = !1, this.$get = t, this.showAsToast = function (t) {
            this.toast = t
        }, t.$inject = ["$timeout", "$sce", "$translate"]
    }

    angular.module("quizApp").provider("AlertService", t)
}(), function () {
    "use strict";
    function t(t, e) {
        var a = this;
        a.alerts = e.get(), t.$on("$destroy", function () {
            a.alerts = []
        })
    }

    var e = {
        template: '<div class="alerts" ng-cloak=""><div ng-repeat="alert in $ctrl.alerts" ng-class="[alert.position, {\'toast\': alert.toast}]"><uib-alert ng-cloak="" type="{{alert.type}}" close="alert.close($ctrl.alerts)"><pre ng-bind-html="alert.msg"></pre></uib-alert></div></div>',
        controller: t
    };
    angular.module("quizApp").component("jhiAlert", e), t.$inject = ["$scope", "AlertService"]
}(), function () {
    "use strict";
    function t(t, e) {
        function a(t) {
            var a = Object.keys(t.headers()).filter(function (t) {
                return t.indexOf("app-alert", t.length - "app-alert".length) !== -1 || t.indexOf("app-params", t.length - "app-params".length) !== -1
            }).sort(), n = t.headers(a[0]);
            return angular.isString(n) && e.success(n, {param: t.headers(a[1])}), t
        }

        var n = {response: a};
        return n
    }

    angular.module("quizApp").factory("notificationInterceptor", t), t.$inject = ["$q", "AlertService"]
}(), function () {
    "use strict";
    function t(t, e) {
        function a(a) {
            return 401 === a.status && ("" === a.data || a.data.path && 0 === a.data.path.indexOf("/api/account")) || e.$emit("quizApp.httpError", a), t.reject(a)
        }

        var n = {responseError: a};
        return n
    }

    angular.module("quizApp").factory("errorHandlerInterceptor", t), t.$inject = ["$q", "$rootScope"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r) {
        function s(t) {
            if (401 === t.status) {
                delete n.authenticationToken, delete r.authenticationToken;
                var s = a.get("Principal");
                if (s.isAuthenticated()) {
                    var i = a.get("Auth");
                    i.authorize(!0)
                }
            }
            return e.reject(t)
        }

        var i = {responseError: s};
        return i
    }

    angular.module("quizApp").factory("authExpiredInterceptor", t), t.$inject = ["$rootScope", "$q", "$injector", "$localStorage", "$sessionStorage"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r) {
        function s(t) {
            t.headers = t.headers || {};
            var e = n.authenticationToken || r.authenticationToken;
            return e && (t.headers.Authorization = "Bearer " + e), t
        }

        var i = {request: s};
        return i
    }

    angular.module("quizApp").factory("authInterceptor", t), t.$inject = ["$rootScope", "$q", "$location", "$localStorage", "$sessionStorage"]
}(), function () {
    "use strict";
    function t(t, e, a, n) {
        function r() {
            var e = t.$on("$translateChangeSuccess", function () {
                s()
            });
            t.$on("$destroy", function () {
                angular.isDefined(e) && null !== e && e()
            })
        }

        function s(t) {
            !t && a.$current.data && a.$current.data.pageTitle && (t = a.$current.data.pageTitle), n(t || "global.title").then(function (t) {
                e.document.title = t
            })
        }

        return {initialize: r, updateTitle: s}
    }

    angular.module("quizApp").factory("translationHandler", t), t.$inject = ["$rootScope", "$window", "$state", "$translate"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s, i, l, o, c) {
        function d() {
            t.VERSION = c;
            var e = t.$on("$stateChangeStart", function (e, a, s, c) {
                t.toState = a, t.toStateParams = s, t.fromState = c, a.external && (e.preventDefault(), i.open(a.url, "_self")), o.isIdentityResolved() && l.authorize(), r.getCurrent().then(function (t) {
                    n.use(t)
                })
            }), a = t.$on("$stateChangeSuccess", function (t, e, a, n, r) {
                var i = "global.title";
                e.data.pageTitle && (i = e.data.pageTitle), s.updateTitle(i)
            });
            t.$on("$destroy", function () {
                angular.isDefined(e) && null !== e && e(), angular.isDefined(a) && null !== a && a()
            })
        }

        return {initialize: d}
    }

    angular.module("quizApp").factory("stateHandler", t), t.$inject = ["$rootScope", "$state", "$sessionStorage", "$translate", "JhiLanguageService", "translationHandler", "$window", "Auth", "Principal", "VERSION"]
}(), function () {
    "use strict";
    function t(t, e) {
        t.itemsPerPage = e.itemsPerPage, t.maxSize = 5, t.boundaryLinks = !0, t.firstText = "«", t.previousText = "‹", t.nextText = "›", t.lastText = "»"
    }

    angular.module("quizApp").config(t), t.$inject = ["uibPaginationConfig", "paginationConstants"]
}(), function () {
    "use strict";
    function t(t, e) {
        t.itemsPerPage = e.itemsPerPage, t.previousText = "«", t.nextText = "»"
    }

    angular.module("quizApp").config(t), t.$inject = ["uibPagerConfig", "paginationConstants"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n(n) {
            return a.indexOf(t.getObject(n)) === -1 && (e.info('Resetting invalid cookie language "' + t.getObject(n) + '" to preferred language "ru"'), t.putObject(n, "ru")), t.getObject(n)
        }

        function r(e, a) {
            t.putObject(e, a)
        }

        return {get: n, put: r}
    }

    angular.module("quizApp").factory("translationStorageProvider", t), t.$inject = ["$cookies", "$log", "LANGUAGES"]
}(), function () {
    "use strict";
    function t(t, e) {
        t.useLoader("$translatePartialLoader", {urlTemplate: "i18n/{lang}/{part}.json"}), t.preferredLanguage("ru"), t.useStorage("translationStorageProvider"), t.useSanitizeValueStrategy("escaped"), t.addInterpolation("$translateMessageFormatInterpolation"), e.localeLocationPattern("i18n/angular-locale_{{locale}}.js"), e.useCookieStorage(), e.storageKey("NG_TRANSLATE_LANG_KEY")
    }

    angular.module("quizApp").config(t), t.$inject = ["$translateProvider", "tmhDynamicLocaleProvider"]
}(), function () {
    "use strict";
    function t(t, e) {
        t.setKeyPrefix("jhi-"), e.setKeyPrefix("jhi-")
    }

    angular.module("quizApp").config(t), t.$inject = ["$localStorageProvider", "$sessionStorageProvider"]
}(), function () {
    "use strict";
    function t(t, e, a, n) {
        a.setMatchlist([/.*api.*/, /.*protected.*/], !0), t.otherwise("/"), e.interceptors.push("errorHandlerInterceptor"), e.interceptors.push("authExpiredInterceptor"), e.interceptors.push("authInterceptor"), e.interceptors.push("notificationInterceptor"), n.type("boolean", {
            name: "boolean",
            decode: function (t) {
                return t === !0 || "true" === t
            },
            encode: function (t) {
                return t ? 1 : 0
            },
            equals: function (t, e) {
                return this.is(t) && t === e
            },
            is: function (t) {
                return [!0, !1, 0, 1].indexOf(t) >= 0
            },
            pattern: /bool|true|0|1/
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$urlRouterProvider", "$httpProvider", "httpRequestInterceptorCacheBusterProvider", "$urlMatcherFactoryProvider"]
}(), function () {
    "use strict";
    function t(t, e) {
        t.debugInfoEnabled(e)
    }

    angular.module("quizApp").config(t), t.$inject = ["$compileProvider", "DEBUG_INFO_ENABLED"]
}(), function () {
    "use strict";
    function t(t) {
        t.showAsToast(!1)
    }

    angular.module("quizApp").config(t), t.$inject = ["AlertServiceProvider"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("app", {
            abstract: !0,
            views: {
                "navbar@": {
                    templateUrl: "app/layouts/navbar/navbar.html",
                    controller: "NavbarController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                authorize: ["Auth", function (t) {
                    return t.authorize()
                }], translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    e.addPart("global")
                }]
            }
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    angular.module("quizApp").constant("VERSION", "0.0.1-SNAPSHOT").constant("DEBUG_INFO_ENABLED", !1)
}(), function () {
    "use strict";
    function t(t, e, a, n, r) {
        function s() {
            e.dismiss("cancel")
        }

        function i(t) {
            c.isSaving = !1, e.close(t)
        }

        function l() {
            c.isSaving = !1
        }

        function o() {
            c.isSaving = !0, null !== c.user.id ? n.update(c.user, i, l) : n.save(c.user, i, l)
        }

        var c = this;
        c.authorities = ["ROLE_USER", "ROLE_ADMIN"], c.clear = s, c.languages = null, c.save = o, c.user = a, r.getAll().then(function (t) {
            c.languages = t
        })
    }

    angular.module("quizApp").controller("UserManagementDialogController", t), t.$inject = ["$stateParams", "$uibModalInstance", "entity", "User", "JhiLanguageService"]
}(), function () {
    "use strict";
    function t(t, e) {
        function a(t) {
            e.get({login: t}, function (t) {
                n.user = t
            })
        }

        var n = this;
        n.load = a, n.user = {}, n.load(t.login)
    }

    angular.module("quizApp").controller("UserManagementDetailController", t), t.$inject = ["$stateParams", "User"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n() {
            t.dismiss("cancel")
        }

        function r(e) {
            a.delete({login: e}, function () {
                t.close(!0)
            })
        }

        var s = this;
        s.user = e, s.clear = n, s.confirmDelete = r
    }

    angular.module("quizApp").controller("UserManagementDeleteController", t), t.$inject = ["$uibModalInstance", "entity", "User"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("user-management", {
            parent: "admin",
            url: "/user-management?page&sort",
            data: {authorities: ["ROLE_ADMIN"], pageTitle: "userManagement.home.title"},
            views: {
                "content@": {
                    templateUrl: "app/admin/user-management/user-management.html",
                    controller: "UserManagementController",
                    controllerAs: "vm"
                }
            },
            params: {page: {value: "1", squash: !0}, sort: {value: "id,asc", squash: !0}},
            resolve: {
                pagingParams: ["$stateParams", "PaginationUtil", function (t, e) {
                    return {
                        page: e.parsePage(t.page),
                        sort: t.sort,
                        predicate: e.parsePredicate(t.sort),
                        ascending: e.parseAscending(t.sort)
                    }
                }], translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("user-management"), t.refresh()
                }]
            }
        }).state("user-management-detail", {
            parent: "admin",
            url: "/user/:login",
            data: {authorities: ["ROLE_ADMIN"], pageTitle: "user-management.detail.title"},
            views: {
                "content@": {
                    templateUrl: "app/admin/user-management/user-management-detail.html",
                    controller: "UserManagementDetailController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("user-management"), t.refresh()
                }]
            }
        }).state("user-management.new", {
            parent: "user-management",
            url: "/new",
            data: {authorities: ["ROLE_ADMIN"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/admin/user-management/user-management-dialog.html",
                    controller: "UserManagementDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: function () {
                            return {
                                id: null,
                                login: null,
                                firstName: null,
                                lastName: null,
                                email: null,
                                activated: !0,
                                langKey: null,
                                createdBy: null,
                                createdDate: null,
                                lastModifiedBy: null,
                                lastModifiedDate: null,
                                resetDate: null,
                                resetKey: null,
                                authorities: null
                            }
                        }
                    }
                }).result.then(function () {
                    e.go("user-management", null, {reload: !0})
                }, function () {
                    e.go("user-management")
                })
            }]
        }).state("user-management.edit", {
            parent: "user-management",
            url: "/{login}/edit",
            data: {authorities: ["ROLE_ADMIN"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/admin/user-management/user-management-dialog.html",
                    controller: "UserManagementDialogController",
                    controllerAs: "vm",
                    backdrop: "static",
                    size: "lg",
                    resolve: {
                        entity: ["User", function (e) {
                            return e.get({login: t.login})
                        }]
                    }
                }).result.then(function () {
                    e.go("user-management", null, {reload: !0})
                }, function () {
                    e.go("^")
                })
            }]
        }).state("user-management.delete", {
            parent: "user-management",
            url: "/{login}/delete",
            data: {authorities: ["ROLE_ADMIN"]},
            onEnter: ["$stateParams", "$state", "$uibModal", function (t, e, a) {
                a.open({
                    templateUrl: "app/admin/user-management/user-management-delete-dialog.html",
                    controller: "UserManagementDeleteController",
                    controllerAs: "vm",
                    size: "md",
                    resolve: {
                        entity: ["User", function (e) {
                            return e.get({login: t.login})
                        }]
                    }
                }).result.then(function () {
                    e.go("user-management", null, {reload: !0})
                }, function () {
                    e.go("^")
                })
            }]
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t, e, a, n, r, s, i, l) {
        function o(t, a) {
            t.activated = a, e.update(t, function () {
                v.loadAll(), v.clear()
            })
        }

        function c() {
            e.query({page: s.page - 1, size: v.itemsPerPage, sort: m()}, d, u)
        }

        function d(t, e) {
            var n = 0;
            for (var r in t)"anonymoususer" === t[r].login && (t.splice(r, 1), n++);
            v.links = a.parse(e("link")), v.totalItems = e("X-Total-Count") - n, v.queryCount = v.totalItems, v.page = s.page, v.users = t
        }

        function u(t) {
            n.error(t.data.message)
        }

        function p() {
            v.user = {
                id: null,
                login: null,
                firstName: null,
                lastName: null,
                email: null,
                activated: null,
                langKey: null,
                createdBy: null,
                createdDate: null,
                lastModifiedBy: null,
                lastModifiedDate: null,
                resetDate: null,
                resetKey: null,
                authorities: null
            }
        }

        function m() {
            var t = [v.predicate + "," + (v.reverse ? "asc" : "desc")];
            return "id" !== v.predicate && t.push("id"), t
        }

        function g(t) {
            v.page = t, v.transition()
        }

        function h() {
            r.transitionTo(r.$current, {
                page: v.page,
                sort: v.predicate + "," + (v.reverse ? "asc" : "desc"),
                search: v.currentSearch
            })
        }

        var v = this;
        v.authorities = ["ROLE_USER", "ROLE_ADMIN"], v.currentAccount = null, v.languages = null, v.loadAll = c, v.setActive = o, v.users = [], v.page = 1, v.totalItems = null, v.clear = p, v.links = null, v.loadPage = g, v.predicate = s.predicate, v.reverse = s.ascending, v.itemsPerPage = i.itemsPerPage, v.transition = h, v.loadAll(), l.getAll().then(function (t) {
            v.languages = t
        }), t.identity().then(function (t) {
            v.currentAccount = t
        })
    }

    angular.module("quizApp").controller("UserManagementController", t), t.$inject = ["Principal", "User", "ParseLinks", "AlertService", "$state", "pagingParams", "paginationConstants", "JhiLanguageService"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("jhi-metrics", {
            parent: "admin",
            url: "/metrics",
            data: {authorities: ["ROLE_ADMIN"], pageTitle: "metrics.title"},
            views: {
                "content@": {
                    templateUrl: "app/admin/metrics/metrics.html",
                    controller: "JhiMetricsMonitoringController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("metrics"), t.refresh()
                }]
            }
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t, e) {
        function a() {
            return e.get("management/metrics").then(function (t) {
                return t.data
            })
        }

        function n() {
            return e.get("management/dump").then(function (t) {
                return t.data
            })
        }

        var r = {getMetrics: a, threadDump: n};
        return r
    }

    angular.module("quizApp").factory("JhiMetricsService", t), t.$inject = ["$rootScope", "$http"]
}(), function () {
    "use strict";
    function t(t, e) {
        function a() {
            t.dismiss("cancel")
        }

        function n(t) {
            return "RUNNABLE" === t ? "label-success" : "WAITING" === t ? "label-info" : "TIMED_WAITING" === t ? "label-warning" : "BLOCKED" === t ? "label-danger" : void 0
        }

        var r = this;
        r.cancel = a, r.getLabelClass = n, r.threadDump = e, r.threadDumpAll = 0, r.threadDumpBlocked = 0, r.threadDumpRunnable = 0, r.threadDumpTimedWaiting = 0, r.threadDumpWaiting = 0, angular.forEach(e, function (t) {
            "RUNNABLE" === t.threadState ? r.threadDumpRunnable += 1 : "WAITING" === t.threadState ? r.threadDumpWaiting += 1 : "TIMED_WAITING" === t.threadState ? r.threadDumpTimedWaiting += 1 : "BLOCKED" === t.threadState && (r.threadDumpBlocked += 1)
        }), r.threadDumpAll = r.threadDumpRunnable + r.threadDumpWaiting + r.threadDumpTimedWaiting + r.threadDumpBlocked
    }

    angular.module("quizApp").controller("JhiMetricsMonitoringModalController", t), t.$inject = ["$uibModalInstance", "threadDump"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n() {
            s.updatingMetrics = !0, e.getMetrics().then(function (t) {
                s.metrics = t, s.updatingMetrics = !1
            }, function (t) {
                s.metrics = t.data, s.updatingMetrics = !1
            })
        }

        function r() {
            e.threadDump().then(function (t) {
                a.open({
                    templateUrl: "app/admin/metrics/metrics.modal.html",
                    controller: "JhiMetricsMonitoringModalController",
                    controllerAs: "vm",
                    size: "lg",
                    resolve: {
                        threadDump: function () {
                            return t
                        }
                    }
                })
            })
        }

        var s = this;
        s.cachesStats = {}, s.metrics = {}, s.refresh = n, s.refreshThreadDumpData = r, s.servicesStats = {}, s.updatingMetrics = !0, s.refresh(), t.$watch("vm.metrics", function (t) {
            s.servicesStats = {}, angular.forEach(t.timers, function (t, e) {
                e.indexOf("web.rest") === -1 && e.indexOf("service") === -1 || (s.servicesStats[e] = t)
            }), s.cachesStats = {}, angular.forEach(t.gauges, function (t, e) {
                if (e.indexOf("jcache.statistics") !== -1) {
                    var a = e.lastIndexOf("."), n = e.substr(0, a);
                    s.cachesStats[n] = {name: n.substr(18), value: t}
                }
            })
        })
    }

    angular.module("quizApp").controller("JhiMetricsMonitoringController", t), t.$inject = ["$scope", "JhiMetricsService", "$uibModal"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("logs", {
            parent: "admin",
            url: "/logs",
            data: {authorities: ["ROLE_ADMIN"], pageTitle: "logs.title"},
            views: {
                "content@": {
                    templateUrl: "app/admin/logs/logs.html",
                    controller: "LogsController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("logs"), t.refresh()
                }]
            }
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t) {
        var e = t("management/logs", {}, {findAll: {method: "GET", isArray: !0}, changeLevel: {method: "PUT"}});
        return e
    }

    angular.module("quizApp").factory("LogsService", t), t.$inject = ["$resource"]
}(), function () {
    "use strict";
    function t(t) {
        function e(e, n) {
            t.changeLevel({name: e, level: n}, function () {
                a.loggers = t.findAll()
            })
        }

        var a = this;
        a.changeLevel = e, a.loggers = t.findAll()
    }

    angular.module("quizApp").controller("LogsController", t), t.$inject = ["LogsService"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("jhi-health", {
            parent: "admin",
            url: "/health",
            data: {authorities: ["ROLE_ADMIN"], pageTitle: "health.title"},
            views: {
                "content@": {
                    templateUrl: "app/admin/health/health.html",
                    controller: "JhiHealthCheckController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("health"), t.refresh()
                }]
            }
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t, e) {
        function a() {
            return e.get("management/health").then(function (t) {
                return t.data
            })
        }

        function n(t) {
            var e = [];
            return i(e, null, t), e
        }

        function r(t) {
            if (t) {
                var e = t.split(".");
                return e[0]
            }
        }

        function s(t) {
            if (t) {
                var e = t.split(".");
                e.splice(0, 1);
                var a = e.join(".");
                return a ? " - " + a : ""
            }
        }

        function i(t, e, a) {
            return angular.forEach(a, function (a, n) {
                d(a) && (c(a) ? (l(t, !1, a, o(e, n)), i(t, o(e, n), a)) : l(t, !0, a, o(e, n)))
            }), t
        }

        function l(t, e, a, n) {
            var r = {name: n}, s = {}, i = !1;
            return angular.forEach(a, function (t, e) {
                "status" === e || "error" === e ? r[e] = t : d(t) || (s[e] = t, i = !0)
            }), i && angular.extend(r, {details: s}), (e || i || r.error) && t.push(r), r
        }

        function o(t, e) {
            var a;
            return a = t && e ? t + u + e : t ? t : e ? e : ""
        }

        function c(t) {
            var e = !1;
            return angular.forEach(t, function (t) {
                t && t.status && (e = !0)
            }), e
        }

        function d(t) {
            var e = !1;
            return angular.forEach(t, function (t, a) {
                "status" === a && (e = !0)
            }), e
        }

        var u = ".", p = {checkHealth: a, transformHealthData: n, getBaseName: r, getSubSystemName: s};
        return p
    }

    angular.module("quizApp").factory("JhiHealthService", t), t.$inject = ["$rootScope", "$http"]
}(), function () {
    "use strict";
    function t(t, e, a, n) {
        function r() {
            t.dismiss("cancel")
        }

        var s = this;
        s.cancel = r, s.currentHealth = e, s.baseName = a, s.subSystemName = n
    }

    angular.module("quizApp").controller("HealthModalController", t), t.$inject = ["$uibModalInstance", "currentHealth", "baseName", "subSystemName"]
}(), function () {
    "use strict";
    function t(t, e) {
        function a(t) {
            return "UP" === t ? "label-success" : "label-danger"
        }

        function n() {
            s.updatingHealth = !0, t.checkHealth().then(function (e) {
                s.healthData = t.transformHealthData(e), s.updatingHealth = !1
            }, function (e) {
                s.healthData = t.transformHealthData(e.data), s.updatingHealth = !1
            })
        }

        function r(t) {
            e.open({
                templateUrl: "app/admin/health/health.modal.html",
                controller: "HealthModalController",
                controllerAs: "vm",
                size: "lg",
                resolve: {
                    currentHealth: function () {
                        return t
                    }, baseName: function () {
                        return s.baseName
                    }, subSystemName: function () {
                        return s.subSystemName
                    }
                }
            })
        }

        var s = this;
        s.updatingHealth = !0, s.getLabelClass = a, s.refresh = n, s.showHealth = r, s.baseName = t.getBaseName, s.subSystemName = t.getSubSystemName, s.refresh()
    }

    angular.module("quizApp").controller("JhiHealthCheckController", t), t.$inject = ["JhiHealthService", "$uibModal"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("docs", {
            parent: "admin",
            url: "/docs",
            data: {authorities: ["ROLE_ADMIN"], pageTitle: "global.menu.admin.apidocs"},
            views: {"content@": {templateUrl: "app/admin/docs/docs.html"}},
            resolve: {
                translatePartialLoader: ["$translate", function (t) {
                    return t.refresh()
                }]
            }
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("jhi-configuration", {
            parent: "admin",
            url: "/configuration",
            data: {authorities: ["ROLE_ADMIN"], pageTitle: "configuration.title"},
            views: {
                "content@": {
                    templateUrl: "app/admin/configuration/configuration.html",
                    controller: "JhiConfigurationController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("configuration"), t.refresh()
                }]
            }
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t, e) {
        function a() {
            function a(e) {
                var a = [];
                angular.forEach(e.data, function (t) {
                    a.push(t)
                });
                var n = t("orderBy");
                return n(a, "prefix")
            }

            return e.get("management/configprops").then(a)
        }

        function n() {
            function t(t) {
                var e = {};
                return angular.forEach(t.data, function (t, a) {
                    var n = [];
                    angular.forEach(t, function (t, e) {
                        n.push({key: e, val: t})
                    }), e[a] = n
                }), e
            }

            return e.get("management/env").then(t)
        }

        var r = {get: a, getEnv: n};
        return r
    }

    angular.module("quizApp").factory("JhiConfigurationService", t), t.$inject = ["$filter", "$http"]
}(), function () {
    "use strict";
    function t(t, e) {
        var a = this;
        a.allConfiguration = null, a.configuration = null, e.get().then(function (t) {
            a.configuration = t
        }), e.getEnv().then(function (t) {
            a.allConfiguration = t
        })
    }

    angular.module("quizApp").controller("JhiConfigurationController", t), t.$inject = ["$filter", "JhiConfigurationService"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("audits", {
            parent: "admin",
            url: "/audits",
            data: {authorities: ["ROLE_ADMIN"], pageTitle: "audits.title"},
            views: {
                "content@": {
                    templateUrl: "app/admin/audits/audits.html",
                    controller: "AuditsController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("audits"), t.refresh()
                }]
            }
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t) {
        var e = t("management/audits/:id", {}, {
            get: {method: "GET", isArray: !0},
            query: {method: "GET", isArray: !0, params: {fromDate: null, toDate: null}}
        });
        return e
    }

    angular.module("quizApp").factory("AuditsService", t), t.$inject = ["$resource"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        function n() {
            var n = "yyyy-MM-dd", r = t("date")(l.fromDate, n), s = t("date")(l.toDate, n);
            e.query({page: l.page - 1, size: 20, fromDate: r, toDate: s}, function (t, e) {
                l.audits = t, l.links = a.parse(e("link")), l.totalItems = e("X-Total-Count")
            })
        }

        function r() {
            var t = new Date;
            l.toDate = new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1)
        }

        function s() {
            var t = new Date;
            t = 0 === t.getMonth() ? new Date(t.getFullYear() - 1, 11, t.getDate()) : new Date(t.getFullYear(), t.getMonth() - 1, t.getDate()), l.fromDate = t
        }

        function i(t) {
            l.page = t, l.onChangeDate()
        }

        var l = this;
        l.audits = null, l.fromDate = null, l.links = null, l.loadPage = i, l.onChangeDate = n, l.page = 1, l.previousMonth = s, l.toDate = null, l.today = r, l.totalItems = null, l.today(), l.previousMonth(), l.onChangeDate()
    }

    angular.module("quizApp").controller("AuditsController", t), t.$inject = ["$filter", "AuditsService", "ParseLinks"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("admin", {abstract: !0, parent: "app"})
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t, e) {
        var a = this;
        a.success = e.success, a.error = !a.success, a.provider = e.provider, a.providerLabel = t("capitalize")(a.provider), a.success = e.success
    }

    angular.module("quizApp").controller("SocialRegisterController", t), t.$inject = ["$filter", "$stateParams"]
}(), function () {
    "use strict";
    function t(t, e, a) {
        var n = e.get("social-authentication");
        a.loginWithToken(n, !1).then(function () {
            e.remove("social-authentication"), a.authorize(!0)
        }, function () {
            t.go("social-register", {success: "false"})
        })
    }

    angular.module("quizApp").controller("SocialAuthController", t), t.$inject = ["$state", "$cookies", "Auth"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("social-register", {
            parent: "account",
            url: "/social-register/:provider?{success:boolean}",
            data: {authorities: [], pageTitle: "social.register.title"},
            views: {
                "content@": {
                    templateUrl: "app/account/social/social-register.html",
                    controller: "SocialRegisterController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("social"), t.refresh()
                }]
            }
        }).state("social-auth", {
            parent: "account",
            url: "/social-auth",
            data: {authorities: []},
            views: {"content@": {controller: "SocialAuthController"}}
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t, e) {
        function a(t) {
            switch (t) {
                case"google":
                    return "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
                case"facebook":
                    return "public_profile,email";
                case"twitter":
                    return "";
                default:
                    return "Provider setting not defined"
            }
        }

        function n(t) {
            return "signin/" + t
        }

        function r() {
            return e.get(t.defaults.xsrfCookieName)
        }

        var s = {
            getProviderSetting: a, getProviderURL: n,
            getCSRF: r
        };
        return s
    }

    angular.module("quizApp").factory("SocialService", t), t.$inject = ["$http", "$cookies"]
}(), function () {
    "use strict";
    function t(t, e, a, n) {
        function r(r) {
            t.addPart("social"), e.refresh(), r.label = a("capitalize")(r.provider), r.providerSetting = n.getProviderSetting(r.provider), r.providerURL = n.getProviderURL(r.provider), r.csrf = n.getCSRF()
        }

        var s = {
            restrict: "E",
            scope: {provider: "@ngProvider"},
            templateUrl: "app/account/social/directive/social.html",
            link: r
        };
        return s
    }

    angular.module("quizApp").directive("jhSocial", t), t.$inject = ["$translatePartialLoader", "$translate", "$filter", "SocialService"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("settings", {
            parent: "account",
            url: "/settings",
            data: {authorities: ["ROLE_USER"], pageTitle: "global.menu.account.settings"},
            views: {
                "content@": {
                    templateUrl: "app/account/settings/settings.html",
                    controller: "SettingsController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("settings"), t.refresh()
                }]
            }
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t, e, a, n) {
        function r(t) {
            return $http({
                url: "/api/v1/fileUpload",
                method: "POST",
                withCredentials: !0,
                data: t
            }).success(function (t) {
                i.success = "OK"
            })
        }

        function s() {
            e.updateAccount(i.settingsAccount).then(function () {
                i.error = null, i.success = "OK", t.identity(!0).then(function (t) {
                    i.settingsAccount = l(t)
                }), a.getCurrent().then(function (t) {
                    i.settingsAccount.langKey !== t && n.use(i.settingsAccount.langKey)
                })
            }).catch(function () {
                i.success = null, i.error = "ERROR"
            })
        }

        var i = this;
        i.error = null, i.save = s, i.saveElement = r, i.settingsAccount = null, i.success = null;
        var l = function (t) {
            return {
                activated: t.activated,
                email: t.email,
                firstName: t.firstName,
                langKey: t.langKey,
                lastName: t.lastName,
                login: t.login
            }
        };
        t.identity().then(function (t) {
            i.settingsAccount = l(t)
        })
    }

    angular.module("quizApp").controller("SettingsController", t), t.$inject = ["Principal", "Auth", "JhiLanguageService", "$translate"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("requestReset", {
            parent: "account",
            url: "/reset/request",
            data: {authorities: []},
            views: {
                "content@": {
                    templateUrl: "app/account/reset/request/reset.request.html",
                    controller: "RequestResetController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("reset"), t.refresh()
                }]
            }
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t, e) {
        function a() {
            n.error = null, n.errorEmailNotExists = null, e.resetPasswordInit(n.resetAccount.email).then(function () {
                n.success = "OK"
            }).catch(function (t) {
                n.success = null, 400 === t.status && "e-mail address not registered" === t.data ? n.errorEmailNotExists = "ERROR" : n.error = "ERROR"
            })
        }

        var n = this;
        n.error = null, n.errorEmailNotExists = null, n.requestReset = a, n.resetAccount = {}, n.success = null, t(function () {
            angular.element("#email").focus()
        })
    }

    angular.module("quizApp").controller("RequestResetController", t), t.$inject = ["$timeout", "Auth"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("finishReset", {
            parent: "account",
            url: "/reset/finish?key",
            data: {authorities: []},
            views: {
                "content@": {
                    templateUrl: "app/account/reset/finish/reset.finish.html",
                    controller: "ResetFinishController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("reset"), t.refresh()
                }]
            }
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(), function () {
    "use strict";
    function t(t, e, a, n) {
        function r() {
            s.doNotMatch = null, s.error = null, s.resetAccount.password !== s.confirmPassword ? s.doNotMatch = "ERROR" : a.resetPasswordFinish({
                    key: t.key,
                    newPassword: s.resetAccount.password
                }).then(function () {
                    s.success = "OK"
                }).catch(function () {
                    s.success = null, s.error = "ERROR"
                })
        }

        var s = this;
        s.keyMissing = angular.isUndefined(t.key), s.confirmPassword = null, s.doNotMatch = null, s.error = null, s.finishReset = r, s.login = n.open, s.resetAccount = {}, s.success = null, e(function () {
            angular.element("#password").focus()
        })
    }

    angular.module("quizApp").controller("ResetFinishController", t), t.$inject = ["$stateParams", "$timeout", "Auth", "LoginService"]
}(), function () {
    "use strict";
    function t(t) {
        t.state("register", {
            parent: "account",
            url: "/register",
            data: {authorities: [], pageTitle: "register.title"},
            views: {
                "content@": {
                    templateUrl: "app/account/register/register.html",
                    controller: "RegisterController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("register"), t.refresh()
                }]
            }
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(),function () {
    "use strict";
    function t(t, e, a, n) {
        function r() {
            s.registerAccount.password !== s.confirmPassword ? s.doNotMatch = "ERROR" : (s.registerAccount.langKey = t.use(), s.doNotMatch = null, s.error = null, s.errorUserExists = null, s.errorEmailExists = null, a.createAccount(s.registerAccount).then(function () {
                    s.success = "OK"
                }).catch(function (t) {
                    s.success = null, 400 === t.status && "login already in use" === t.data ? s.errorUserExists = "ERROR" : 400 === t.status && "e-mail address already in use" === t.data ? s.errorEmailExists = "ERROR" : s.error = "ERROR"
                }))
        }

        var s = this;
        s.doNotMatch = null, s.error = null, s.errorUserExists = null, s.login = n.open, s.register = r, s.registerAccount = {}, s.success = null, e(function () {
            angular.element("#login").focus()
        })
    }

    angular.module("quizApp").controller("RegisterController", t), t.$inject = ["$translate", "$timeout", "Auth", "LoginService"]
}(),function () {
    "use strict";
    function t() {
        function t(t, e) {
            var a = {
                colors: ["#F00", "#F90", "#FF0", "#9F0", "#0F0"], mesureStrength: function (t) {
                    var e = 0, a = /[$-\/:-?{-~!"^_`\[\]]/g, n = /[a-z]+/.test(t), r = /[A-Z]+/.test(t), s = /[0-9]+/.test(t), i = a.test(t), l = [n, r, s, i], o = $.grep(l, function (t) {
                        return t === !0
                    }).length;
                    return e += 2 * t.length + (t.length >= 10 ? 1 : 0), e += 10 * o, e = t.length <= 6 ? Math.min(e, 10) : e, e = 1 === o ? Math.min(e, 10) : e, e = 2 === o ? Math.min(e, 20) : e, e = 3 === o ? Math.min(e, 40) : e
                }, getColor: function (t) {
                    var e;
                    return e = t <= 10 ? 0 : t <= 20 ? 1 : t <= 30 ? 2 : t <= 40 ? 3 : 4, {
                        idx: e + 1,
                        col: this.colors[e]
                    }
                }
            };
            t.$watch("passwordToCheck", function (t) {
                if (t) {
                    var n = a.getColor(a.mesureStrength(t));
                    e.removeClass("ng-hide"), e.find("ul").children("li").css({"background-color": "#DDD"}).slice(0, n.idx).css({"background-color": n.col})
                }
            })
        }

        var e = {
            replace: !0,
            restrict: "E",
            template: '<div id="strength"><small data-translate="global.messages.validate.newpassword.strength">Password strength:</small><ul id="strengthBar"><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li></ul></div>',
            scope: {passwordToCheck: "="},
            link: t
        };
        return e
    }

    angular.module("quizApp").directive("passwordStrengthBar", t)
}(),function () {
    "use strict";
    function t(t) {
        t.state("password", {
            parent: "account",
            url: "/password",
            data: {authorities: ["ROLE_USER"], pageTitle: "global.menu.account.password"},
            views: {
                "content@": {
                    templateUrl: "app/account/password/password.html",
                    controller: "PasswordController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("password"), t.refresh()
                }]
            }
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(),function () {
    "use strict";
    function t(t, e) {
        function a() {
            n.password !== n.confirmPassword ? (n.error = null, n.success = null, n.doNotMatch = "ERROR") : (n.doNotMatch = null, t.changePassword(n.password).then(function () {
                    n.error = null, n.success = "OK"
                }).catch(function () {
                    n.success = null, n.error = "ERROR"
                }))
        }

        var n = this;
        n.changePassword = a, n.doNotMatch = null, n.error = null, n.success = null, e.identity().then(function (t) {
            n.account = t
        })
    }

    angular.module("quizApp").controller("PasswordController", t), t.$inject = ["Auth", "Principal"]
}(),function () {
    "use strict";
    function t(t) {
        t.state("activate", {
            parent: "account",
            url: "/activate?key",
            data: {authorities: [], pageTitle: "activate.title"},
            views: {
                "content@": {
                    templateUrl: "app/account/activate/activate.html",
                    controller: "ActivationController",
                    controllerAs: "vm"
                }
            },
            resolve: {
                translatePartialLoader: ["$translate", "$translatePartialLoader", function (t, e) {
                    return e.addPart("activate"), t.refresh()
                }]
            }
        })
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(),function () {
    "use strict";
    function t(t, e, a) {
        var n = this;
        e.activateAccount({key: t.key}).then(function () {
            n.error = null, n.success = "OK"
        }).catch(function () {
            n.success = null, n.error = "ERROR"
        }), n.login = a.open
    }

    angular.module("quizApp").controller("ActivationController", t), t.$inject = ["$stateParams", "Auth", "LoginService"]
}(),function () {
    "use strict";
    function t(t) {
        t.state("account", {abstract: !0, parent: "app"})
    }

    angular.module("quizApp").config(t), t.$inject = ["$stateProvider"]
}(),function () {
    angular.module("quizApp").run(["$templateCache", function (t) {
        t.put("app/home/home.html", '<div ng-cloak><div class="row"><div class="col-md-4"><!--<span class="hipster img-responsive img-rounded"></span>--></div><div class="col-md-8"><!--<h1 data-translate="home.title">Welcome, Java Hipster!</h1>--><!--<p class="lead" data-translate="home.subtitle">This is your homepage</p>--><!--<div ng-switch="vm.isAuthenticated()">--><!--<div class="alert alert-success" ng-switch-when="true" data-translate="home.logged.message" translate-values="{username: \'{{vm.account.login}}\'}">--><!--You are logged in as user "{{vm.account.login}}".--><!--</div>--><!--<div class="alert alert-warning" ng-switch-when="false" data-translate="global.messages.info.authenticated" translate-compile>--><!--If you want to <a class="alert-link" href="" ng-click="vm.login()">sign in</a>, you can try the default accounts:<br/>- Administrator (login="admin" and password="admin") <br/>- User (login="user" and password="user").--><!--</div>--><!--<div class="alert alert-warning" ng-switch-when="false" data-translate="global.messages.info.register" translate-compile>--><!--You don\'t have an account yet? <a class="alert-link" ui-sref="register">Register a new account</a>--><!--</div>--><!--</div>--><!--<p data-translate="home.question">--><!--If you have any question on JHipster:--><!--</p>--><!--<ul>--><!--<li><a href="http://jhipster.github.io/" target="_blank" data-translate="home.link.homepage">JHipster homepage</a></li>--><!--<li><a href="http://stackoverflow.com/tags/jhipster/info" target="_blank" data-translate="home.link.stackoverflow">JHipster on Stack Overflow</a></li>--><!--<li><a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" data-translate="home.link.bugtracker">JHipster bug tracker</a></li>--><!--<li><a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" data-translate="home.link.chat">JHipster public chat room</a></li>--><!--<li><a href="https://twitter.com/java_hipster" target="_blank"  data-translate="home.link.follow">follow @java_hipster on Twitter</a></li>--><!--</ul>--><!--<p>--><!--<span data-translate="home.like">If you like JHipster, don\'t forget to give us a star on </span>&nbsp;<a href="https://github.com/jhipster/generator-jhipster" target="_blank" data-translate="home.github">Github</a>!--><!--sourceMappingURL</p>--></div></div></div>'), t.put("app/account/activate/activate.html", '<div><div class="row"><div class="col-md-8 col-md-offset-2"><h1 data-translate="activate.title">Activation</h1><div class="alert alert-success" ng-show="vm.success" data-translate="activate.messages.success" translate-compile><strong>Your user has been activated.</strong> Please <a class="alert-link" href="" ng-click="vm.login()">sign in</a>.</div><div class="alert alert-danger" ng-show="vm.error" data-translate="activate.messages.error"><strong>Your user could not be activated.</strong> Please use the registration form to sign up.</div></div></div></div>'), t.put("app/account/password/password.html", '<div><div class="row"><div class="col-md-8 col-md-offset-2"><h2 data-translate="password.title" translate-values="{username: \'{{vm.account.login}}\'}">Password for [<b>{{vm.account.login}}</b>]</h2><div class="alert alert-success" ng-show="vm.success" data-translate="password.messages.success"><strong>Password changed!</strong></div><div class="alert alert-danger" ng-show="vm.error" data-translate="password.messages.error"><strong>An error has occurred!</strong> The password could not be changed.</div><div class="alert alert-danger" ng-show="vm.doNotMatch" data-translate="global.messages.error.dontmatch">The password and its confirmation do not match!</div><form name="form" role="form" novalidate ng-submit="vm.changePassword()" show-validation><div class="form-group"><label class="control-label" for="password" data-translate="global.form.newpassword">New password</label><input type="password" class="form-control" id="password" name="password" placeholder="{{\'global.form.newpassword.placeholder\' | translate}}" ng-model="vm.password" ng-minlength="4" ng-maxlength="50" required><div ng-show="form.password.$dirty && form.password.$invalid"><p class="help-block" ng-show="form.password.$error.required" data-translate="global.messages.validate.newpassword.required">Your password is required.</p><p class="help-block" ng-show="form.password.$error.minlength" data-translate="global.messages.validate.newpassword.minlength">Your password is required to be at least 4 characters.</p><p class="help-block" ng-show="form.password.$error.maxlength" data-translate="global.messages.validate.newpassword.maxlength">Your password cannot be longer than 50 characters.</p></div><password-strength-bar password-to-check="vm.password"></password-strength-bar></div><div class="form-group"><label class="control-label" for="confirmPassword" data-translate="global.form.confirmpassword">New password confirmation</label><input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="{{\'global.form.confirmpassword.placeholder\' | translate}}" ng-model="vm.confirmPassword" ng-minlength="4" ng-maxlength="50" required><div ng-show="form.confirmPassword.$dirty && form.confirmPassword.$invalid"><p class="help-block" ng-show="form.confirmPassword.$error.required" data-translate="global.messages.validate.confirmpassword.required">Your confirmation password is required.</p><p class="help-block" ng-show="form.confirmPassword.$error.minlength" data-translate="global.messages.validate.confirmpassword.minlength">Your confirmation password is required to be at least 4 characters.</p><p class="help-block" ng-show="form.confirmPassword.$error.maxlength" data-translate="global.messages.validate.confirmpassword.maxlength">Your confirmation password cannot be longer than 50 characters.</p></div></div><button type="submit" ng-disabled="form.$invalid" class="btn btn-primary" data-translate="password.form.button">Save</button></form></div></div></div>'), t.put("app/account/register/register.html", '<div><div class="row"><div class="col-md-8 col-md-offset-2"><h1 data-translate="register.title">Registration</h1><div class="alert alert-success" ng-show="vm.success" data-translate="register.messages.success"><strong>Registration saved!</strong> Please check your email for confirmation.</div><div class="alert alert-danger" ng-show="vm.error" data-translate="register.messages.error.fail"><strong>Registration failed!</strong> Please try again later.</div><div class="alert alert-danger" ng-show="vm.errorUserExists" data-translate="register.messages.error.userexists"><strong>Login name already registered!</strong> Please choose another one.</div><div class="alert alert-danger" ng-show="vm.errorEmailExists" data-translate="register.messages.error.emailexists"><strong>E-mail is already in use!</strong> Please choose another one.</div><div class="alert alert-danger" ng-show="vm.doNotMatch" data-translate="global.messages.error.dontmatch">The password and its confirmation do not match!</div></div><div class="col-md-4 col-md-offset-2"><form ng-show="!vm.success" name="form" role="form" novalidate ng-submit="vm.register()" show-validation><div class="form-group"><label class="control-label" for="login" data-translate="global.form.username">Username</label><input type="text" class="form-control" id="login" name="login" placeholder="{{\'global.form.username.placeholder\' | translate}}" ng-model="vm.registerAccount.login" ng-minlength="1" ng-maxlength="50" ng-pattern="/^[_\'.@A-Za-z0-9-]*$/" required><div ng-show="form.login.$dirty && form.login.$invalid"><p class="help-block" ng-show="form.login.$error.required" data-translate="register.messages.validate.login.required">Your username is required.</p><p class="help-block" ng-show="form.login.$error.minlength" data-translate="register.messages.validate.login.minlength">Your username is required to be at least 1 character.</p><p class="help-block" ng-show="form.login.$error.maxlength" data-translate="register.messages.validate.login.maxlength">Your username cannot be longer than 50 characters.</p><p class="help-block" ng-show="form.login.$error.pattern" data-translate="register.messages.validate.login.pattern">Your username can only contain lower-case letters and digits.</p></div></div><div class="form-group"><label class="control-label" for="email" data-translate="global.form.email">E-mail</label><input type="email" class="form-control" id="email" name="email" placeholder="{{\'global.form.email.placeholder\' | translate}}" ng-model="vm.registerAccount.email" ng-minlength="5" ng-maxlength="100" required><div ng-show="form.email.$dirty && form.email.$invalid"><p class="help-block" ng-show="form.email.$error.required" data-translate="global.messages.validate.email.required">Your e-mail is required.</p><p class="help-block" ng-show="form.email.$error.email" data-translate="global.messages.validate.email.invalid">Your e-mail is invalid.</p><p class="help-block" ng-show="form.email.$error.minlength" data-translate="global.messages.validate.email.minlength">Your e-mail is required to be at least 5 characters.</p><p class="help-block" ng-show="form.email.$error.maxlength" data-translate="global.messages.validate.email.maxlength">Your e-mail cannot be longer than 100 characters.</p></div></div><div class="form-group"><label class="control-label" for="password" data-translate="global.form.newpassword">New password</label><input type="password" class="form-control" id="password" name="password" placeholder="{{\'global.form.newpassword.placeholder\' | translate}}" ng-model="vm.registerAccount.password" ng-minlength="4" ng-maxlength="50" required><div ng-show="form.password.$dirty && form.password.$invalid"><p class="help-block" ng-show="form.password.$error.required" data-translate="global.messages.validate.newpassword.required">Your password is required.</p><p class="help-block" ng-show="form.password.$error.minlength" data-translate="global.messages.validate.newpassword.minlength">Your password is required to be at least 4 characters.</p><p class="help-block" ng-show="form.password.$error.maxlength" data-translate="global.messages.validate.newpassword.maxlength">Your password cannot be longer than 50 characters.</p></div><password-strength-bar password-to-check="vm.registerAccount.password"></password-strength-bar></div><div class="form-group"><label class="control-label" for="confirmPassword" data-translate="global.form.confirmpassword">New password confirmation</label><input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="{{\'global.form.confirmpassword.placeholder\' | translate}}" ng-model="vm.confirmPassword" ng-minlength="4" ng-maxlength="50" required><div ng-show="form.confirmPassword.$dirty && form.confirmPassword.$invalid"><p class="help-block" ng-show="form.confirmPassword.$error.required" data-translate="global.messages.validate.confirmpassword.required">Your confirmation password is required.</p><p class="help-block" ng-show="form.confirmPassword.$error.minlength" data-translate="global.messages.validate.confirmpassword.minlength">Your confirmation password is required to be at least 4 characters.</p><p class="help-block" ng-show="form.confirmPassword.$error.maxlength" data-translate="global.messages.validate.confirmpassword.maxlength">Your confirmation password cannot be longer than 50 characters.</p></div></div><button type="submit" ng-disabled="form.$invalid" class="btn btn-primary" data-translate="register.form.button">Register</button></form><p></p><div class="alert alert-warning" data-translate="global.messages.info.authenticated" translate-compile>If you want to <a class="alert-link" href="" ng-click="vm.login()">sign in</a>, you can try the default accounts:<br>- Administrator (login="admin" and password="admin")<br>- User (login="user" and password="user").</div></div><div class="col-md-4"><br><jh-social ng-provider="google"></jh-social><jh-social ng-provider="facebook"></jh-social><jh-social ng-provider="twitter"></jh-social><!-- jhipster-needle-add-social-button --></div></div></div>'), t.put("app/account/settings/settings.html", '<div xmlns:th="http://www.w3.org/1999/xhtml"><div class="row"><div class="col-md-8 col-md-offset-2"><h2>Загрузка вопросов</h2><div class="alert alert-success" ng-show="vm.success"><strong>Вопросы загружены!</strong></div><jhi-alert-error></jhi-alert-error><form name="form" role="form" accept-charset="UTF-8" enctype="multipart/form-data" action="/api/v1/parser/upload" method="post"><div class="form-group"><label class="control-label" for="files">Выберите файлы:</label><input class="form-control" name="files" id="files" type="file" multiple="multiple"></div><button type="submit" class="btn btn-primary">Загрузить</button></form></div></div></div>'), t.put("app/account/social/social-register.html", '<div><div class="row"><div class="col-md-8 col-md-offset-2"><h1 ng-show="success" data-translate="social.register.title" translate-values="{ label: vm.providerLabel }">Registration with</h1><h1 ng-show="error" data-translate="social.register.errorTitle">Registration</h1><div class="alert alert-success" ng-show="vm.success" data-translate="social.register.messages.success"><strong>Registration saved!</strong> Please check your email for confirmation.</div><div class="alert alert-danger" ng-show="vm.error" data-translate="social.register.messages.error.fail"><strong>Registration failed!</strong> Please try again later.</div><jh-social ng-if="vm.success" ng-provider="{{ vm.provider }}"></jh-social><br><div class="alert alert-warning" data-translate="global.messages.info.authenticated">If you want to <a class="alert-link" href="#/login">sign in</a>, you can try the default accounts:<br>- Administrator (login="admin" and password="admin")<br>- User (login="user" and password="user").</div></div></div></div>'), t.put("app/admin/audits/audits.html", '<div><h2 data-translate="audits.title">Audits</h2><div class="row"><div class="col-md-5"><h4 data-translate="audits.filter.title">Filter by date</h4><p class="input-group"><span class="input-group-addon" data-translate="audits.filter.from">from</span> <input type="date" class="input-sm form-control" name="start" ng-model="vm.fromDate" ng-change="vm.onChangeDate()" required> <span class="input-group-addon" data-translate="audits.filter.to">to</span> <input type="date" class="input-sm form-control" name="end" ng-model="vm.toDate" ng-change="vm.onChangeDate()" required></p></div></div><table class="table table-condensed table-striped table-bordered table-responsive"><thead><tr><th ng-click="predicate = \'timestamp\'; reverse=!reverse"><span data-translate="audits.table.header.date">Date</span></th><th ng-click="predicate = \'principal\'; reverse=!reverse"><span data-translate="audits.table.header.principal">User</span></th><th ng-click="predicate = \'type\'; reverse=!reverse"><span data-translate="audits.table.header.status">State</span></th><th ng-click="predicate = \'data.message\'; reverse=!reverse"><span data-translate="audits.table.header.data">Extra data</span></th></tr></thead><tr ng-repeat="audit in vm.audits | filter:filter | orderBy:predicate:reverse" ng-hide="audit.filtered"><td><span>{{audit.timestamp| date:\'medium\'}}</span></td><td><small>{{audit.principal}}</small></td><td>{{audit.type}}</td><td><span ng-show="audit.data.message">{{audit.data.message}}</span> <span ng-show="audit.data.remoteAddress"><span data-translate="audits.table.data.remoteAddress">Remote Address</span> {{audit.data.remoteAddress}}</span></td></tr></table><div class="text-center"><uib-pagination class="pagination-sm" total-items="vm.totalItems" ng-model="vm.page" ng-change="vm.loadPage(vm.page)"></uib-pagination></div></div>'), t.put("app/admin/configuration/configuration.html", '<div><h2 data-translate="configuration.title">Configuration</h2><span data-translate="configuration.filter">Filter (by prefix)</span> <input type="text" ng-model="filter" class="form-control"><label ng-hide="filteredConfig.length == 0">Spring configuration</label><table class="table table-condensed table-striped table-bordered table-responsive" style="table-layout:fixed" ng-hide="filteredConfig.length == 0"><thead><tr><th ng-click="predicate = \'prefix\'; reverse=!reverse" class="col-sm-4"><span data-translate="configuration.table.prefix">Prefix</span></th><th data-translate="configuration.table.properties" class="col-sm-8">Properties</th></tr></thead><tr ng-repeat="entry in filtered = (vm.configuration | filter:filter | orderBy:predicate:reverse)"><td><span>{{entry.prefix}}</span></td><td><div class="row" ng-repeat="(key, value) in entry.properties"><div class="col-md-4">{{key}}</div><div class="col-md-8"><span class="pull-right label label-default break">{{value}}</span></div></div></td></tr></table><div ng-repeat="(key, value) in vm.allConfiguration"><label ng-hide="filtered.length == 0"><span>{{key}}</span></label><table class="table table-condensed table-striped table-bordered table-responsive" style="table-layout:fixed" ng-hide="filtered.length == 0"><thead><tr><th class="col-sm-4">Property</th><th class="col-sm-8">Value</th></tr></thead><tbody><tr ng-repeat="item in filtered = (value | filter:filter)"><td class="break">{{item.key}}</td><td class="break"><span class="pull-right label label-default break">{{item.val}}</span></td></tr></tbody></table></div></div>'), t.put("app/admin/docs/docs.html", '<iframe src="swagger-ui/index.html" frameborder="0" marginheight="0" marginwidth="0" width="100%" height="900" scrolling="auto" target="_top" title="Swagger UI"></iframe>Это ваша домашняя страница Вы вошли как пользователь "admin@a".'), t.put("app/admin/health/health.html", '<div><h2 data-translate="health.title">Health Checks</h2><p><button type="button" class="btn btn-primary" ng-click="vm.refresh()"><span class="glyphicon glyphicon-refresh"></span>&nbsp;<span data-translate="health.refresh.button">Refresh</span></button></p><table id="healthCheck" class="table table-striped"><thead><tr><th class="col-md-7" data-translate="health.table.service">Service Name</th><th class="col-md-2 text-center" data-translate="health.table.status">Status</th><th class="col-md-2 text-center" data-translate="health.details.details">Details</th></tr></thead><tbody><tr ng-repeat="health in vm.healthData"><td>{{\'health.indicator.\' + vm.baseName(health.name) | translate}} {{vm.subSystemName(health.name)}}</td><td class="text-center"><span class="label" ng-class="vm.getLabelClass(health.status)">{{\'health.status.\' + health.status | translate}}</span></td><td class="text-center"><a class="hand" ng-click="vm.showHealth(health)" ng-show="health.details || health.error"><i class="glyphicon glyphicon-eye-open"></i></a></td></tr></tbody></table></div>'), t.put("app/admin/health/health.modal.html", '<div class="modal-header"><button aria-label="Close" data-dismiss="modal" class="close" type="button" ng-click="vm.cancel()"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="showHealthLabel">{{\'health.indicator.\' + vm.baseName(vm.currentHealth.name) | translate}} {{vm.subSystemName(vm.currentHealth.name)}}</h4></div><div class="modal-body pad"><div ng-show="vm.currentHealth.details"><h4 data-translate="health.details.properties">Properties</h4><table class="table table-striped"><thead><tr><th class="col-md-6 text-left" data-translate="health.details.name">Name</th><th class="col-md-6 text-left" data-translate="health.details.value">Value</th></tr></thead><tbody><tr ng-repeat="(k,v) in vm.currentHealth.details"><td class="col-md-6 text-left">{{k}}</td><td class="col-md-6 text-left">{{v}}</td></tr></tbody></table></div><div ng-show="vm.currentHealth.error"><h4 data-translate="health.details.error">Error</h4><pre>{{vm.currentHealth.error}}</pre></div></div><div class="modal-footer"><button data-dismiss="modal" class="btn btn-default pull-left" type="button" ng-click="vm.cancel()">Done</button></div>'), t.put("app/admin/logs/logs.html", '<div class="table-responsive"><h2 data-translate="logs.title">Logs</h2><p data-translate="logs.nbloggers" translate-values="{total: \'{{ vm.loggers.length }}\'}">There are {{ vm.loggers.length }} loggers.</p><span data-translate="logs.filter">Filter</span> <input type="text" ng-model="filter" class="form-control"><table class="table table-condensed table-striped table-bordered"><thead><tr title="click to order"><th ng-click="predicate = \'name\'; reverse=!reverse"><span data-translate="logs.table.name">Name</span></th><th ng-click="predicate = \'level\'; reverse=!reverse"><span data-translate="logs.table.level">Level</span></th></tr></thead><tr ng-repeat="logger in vm.loggers | filter:filter | orderBy:predicate:reverse"><td><small>{{logger.name | characters:140}}</small></td><td><button ng-click="vm.changeLevel(logger.name, \'TRACE\')" ng-class="(logger.level==\'TRACE\') ? \'btn-danger\' : \'btn-default\'" class="btn btn-default btn-xs">TRACE</button> <button ng-click="vm.changeLevel(logger.name, \'DEBUG\')" ng-class="(logger.level==\'DEBUG\') ? \'btn-warning\' : \'btn-default\'" class="btn btn-default btn-xs">DEBUG</button> <button ng-click="vm.changeLevel(logger.name, \'INFO\')" ng-class="(logger.level==\'INFO\') ? \'btn-info\' : \'btn-default\'" class="btn btn-default btn-xs">INFO</button> <button ng-click="vm.changeLevel(logger.name, \'WARN\')" ng-class="(logger.level==\'WARN\') ? \'btn-success\' : \'btn-default\'" class="btn btn-default btn-xs">WARN</button> <button ng-click="vm.changeLevel(logger.name, \'ERROR\')" ng-class="(logger.level==\'ERROR\') ? \'btn-primary\' : \'btn-default\'" class="btn btn-default btn-xs">ERROR</button></td></tr></table></div>'), t.put("app/admin/metrics/metrics.html", '<div><h2 data-translate="metrics.title">Application Metrics</h2><p><button type="button" class="btn btn-primary" ng-click="vm.refresh()"><span class="glyphicon glyphicon-refresh"></span>&nbsp;<span data-translate="metrics.refresh.button">Refresh</span></button></p><h3 data-translate="metrics.jvm.title">JVM Metrics</h3><div class="row" ng-hide="vm.updatingMetrics"><div class="col-md-4"><b data-translate="metrics.jvm.memory.title">Memory</b><p><span data-translate="metrics.jvm.memory.total">Total Memory</span> ({{vm.metrics.gauges[\'jvm.memory.total.used\'].value / 1000000 | number:0}}M / {{vm.metrics.gauges[\'jvm.memory.total.max\'].value / 1000000 | number:0}}M)</p><uib-progressbar min="0" max="vm.metrics.gauges[\'jvm.memory.total.max\'].value" value="vm.metrics.gauges[\'jvm.memory.total.used\'].value" class="progress-striped active" type="success"><span>{{vm.metrics.gauges[\'jvm.memory.total.used\'].value * 100 / vm.metrics.gauges[\'jvm.memory.total.max\'].value | number:0}}%</span></uib-progressbar><p><span data-translate="metrics.jvm.memory.heap">Heap Memory</span> ({{vm.metrics.gauges[\'jvm.memory.heap.used\'].value / 1000000 | number:0}}M / {{vm.metrics.gauges[\'jvm.memory.heap.max\'].value / 1000000 | number:0}}M)</p><uib-progressbar min="0" max="vm.metrics.gauges[\'jvm.memory.heap.max\'].value" value="vm.metrics.gauges[\'jvm.memory.heap.used\'].value" class="progress-striped active" type="success"><span>{{vm.metrics.gauges[\'jvm.memory.heap.used\'].value * 100 / vm.metrics.gauges[\'jvm.memory.heap.max\'].value | number:0}}%</span></uib-progressbar><p><span data-translate="metrics.jvm.memory.nonheap">Non-Heap Memory</span> ({{vm.metrics.gauges[\'jvm.memory.non-heap.used\'].value / 1000000 | number:0}}M / {{vm.metrics.gauges[\'jvm.memory.non-heap.committed\'].value / 1000000 | number:0}}M)</p><uib-progressbar min="0" max="vm.metrics.gauges[\'jvm.memory.non-heap.committed\'].value" value="vm.metrics.gauges[\'jvm.memory.non-heap.used\'].value" class="progress-striped active" type="success"><span>{{vm.metrics.gauges[\'jvm.memory.non-heap.used\'].value * 100 / vm.metrics.gauges[\'jvm.memory.non-heap.committed\'].value | number:0}}%</span></uib-progressbar></div><div class="col-md-4"><b data-translate="metrics.jvm.threads.title">Threads</b> (Total: {{vm.metrics.gauges[\'jvm.threads.count\'].value}}) <a class="hand" ng-click="vm.refreshThreadDumpData()" data-toggle="modal" data-target="#threadDump"><i class="glyphicon glyphicon-eye-open"></i></a><p><span data-translate="metrics.jvm.threads.runnable">Runnable</span> {{vm.metrics.gauges[\'jvm.threads.runnable.count\'].value}}</p><uib-progressbar min="0" value="vm.metrics.gauges[\'jvm.threads.runnable.count\'].value" max="vm.metrics.gauges[\'jvm.threads.count\'].value" class="progress-striped active" type="success"><span>{{vm.metrics.gauges[\'jvm.threads.runnable.count\'].value * 100 / vm.metrics.gauges[\'jvm.threads.count\'].value | number:0}}%</span></uib-progressbar><p><span data-translate="metrics.jvm.threads.timedwaiting">Timed Waiting</span> ({{vm.metrics.gauges[\'jvm.threads.timed_waiting.count\'].value}})</p><uib-progressbar min="0" value="vm.metrics.gauges[\'jvm.threads.timed_waiting.count\'].value" max="vm.metrics.gauges[\'jvm.threads.count\'].value" class="progress-striped active" type="warning"><span>{{vm.metrics.gauges[\'jvm.threads.timed_waiting.count\'].value * 100 / vm.metrics.gauges[\'jvm.threads.count\'].value | number:0}}%</span></uib-progressbar><p><span data-translate="metrics.jvm.threads.waiting">Waiting</span> ({{vm.metrics.gauges[\'jvm.threads.waiting.count\'].value}})</p><uib-progressbar min="0" value="vm.metrics.gauges[\'jvm.threads.waiting.count\'].value" max="vm.metrics.gauges[\'jvm.threads.count\'].value" class="progress-striped active" type="warning"><span>{{vm.metrics.gauges[\'jvm.threads.waiting.count\'].value * 100 / vm.metrics.gauges[\'jvm.threads.count\'].value | number:0}}%</span></uib-progressbar><p><span data-translate="metrics.jvm.threads.blocked">Blocked</span> ({{vm.metrics.gauges[\'jvm.threads.blocked.count\'].value}})</p><uib-progressbar min="0" value="vm.metrics.gauges[\'jvm.threads.blocked.count\'].value" max="vm.metrics.gauges[\'jvm.threads.count\'].value" class="progress-striped active" type="success"><span>{{vm.metrics.gauges[\'jvm.threads.blocked.count\'].value * 100 / vm.metrics.gauges[\'jvm.threads.count\'].value | number:0}}%</span></uib-progressbar></div><div class="col-md-4"><b data-translate="metrics.jvm.gc.title">Garbage collections</b><div class="row"><div class="col-md-9" data-translate="metrics.jvm.gc.marksweepcount">Mark Sweep count</div><div class="col-md-3 text-right">{{vm.metrics.gauges[\'jvm.garbage.PS-MarkSweep.count\'].value}}</div></div><div class="row"><div class="col-md-9" data-translate="metrics.jvm.gc.marksweeptime">Mark Sweep time</div><div class="col-md-3 text-right">{{vm.metrics.gauges[\'jvm.garbage.PS-MarkSweep.time\'].value}}ms</div></div><div class="row"><div class="col-md-9" data-translate="metrics.jvm.gc.scavengecount">Scavenge count</div><div class="col-md-3 text-right">{{vm.metrics.gauges[\'jvm.garbage.PS-Scavenge.count\'].value}}</div></div><div class="row"><div class="col-md-9" data-translate="metrics.jvm.gc.scavengetime">Scavenge time</div><div class="col-md-3 text-right">{{vm.metrics.gauges[\'jvm.garbage.PS-Scavenge.time\'].value}}ms</div></div></div></div><div class="well well-lg" ng-show="vm.updatingMetrics" data-translate="metrics.updating">Updating...</div><h3 data-translate="metrics.jvm.http.title">HTTP requests (events per second)</h3><p><span data-translate="metrics.jvm.http.active">Active requests</span> <b>{{vm.metrics.counters[\'com.codahale.metrics.servlet.InstrumentedFilter.activeRequests\'].count | number:0}}</b> - <span data-translate="metrics.jvm.http.total">Total requests</span> <b>{{vm.metrics.timers[\'com.codahale.metrics.servlet.InstrumentedFilter.requests\'].count | number:0}}</b></p><div class="table-responsive"><table class="table table-striped"><thead><tr><th data-translate="metrics.jvm.http.table.code">Code</th><th data-translate="metrics.jvm.http.table.count">Count</th><th class="text-right" data-translate="metrics.jvm.http.table.mean">Mean</th><th class="text-right"><span data-translate="metrics.jvm.http.table.average">Average</span> (1 min)</th><th class="text-right"><span data-translate="metrics.jvm.http.table.average">Average</span> (5 min)</th><th class="text-right"><span data-translate="metrics.jvm.http.table.average">Average</span> (15 min)</th></tr></thead><tbody><tr><td data-translate="metrics.jvm.http.code.ok">OK</td><td><uib-progressbar min="0" max="vm.metrics.timers[\'com.codahale.metrics.servlet.InstrumentedFilter.requests\'].count" value="vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok\'].count" class="progress-striped active" type="success"><span>{{vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok\'].count}}</span></uib-progressbar></td><td class="text-right">{{vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok\'].mean_rate | number:2}}</td><td class="text-right">{{vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok\'].m1_rate | number:2}}</td><td class="text-right">{{vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok\'].m5_rate | number:2}}</td><td class="text-right">{{vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.ok\'].m15_rate | number:2}}</td></tr><tr><td data-translate="metrics.jvm.http.code.notfound">Not Found</td><td><uib-progressbar min="0" max="vm.metrics.timers[\'com.codahale.metrics.servlet.InstrumentedFilter.requests\'].count" value="vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound\'].count" class="progress-striped active" type="success"><span>{{vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound\'].count}}</span></uib-progressbar></td><td class="text-right">{{vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound\'].mean_rate | number:2}}</td><td class="text-right">{{vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound\'].m1_rate | number:2}}</td><td class="text-right">{{vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound\'].m5_rate | number:2}}</td><td class="text-right">{{vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.notFound\'].m15_rate | number:2}}</td></tr><tr><td data-translate="metrics.jvm.http.code.servererror">Server error</td><td><uib-progressbar min="0" max="vm.metrics.timers[\'com.codahale.metrics.servlet.InstrumentedFilter.requests\'].count" value="vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError\'].count" class="progress-striped active" type="success"><span>{{vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError\'].count}}</span></uib-progressbar></td><td class="text-right">{{vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError\'].mean_rate | number:2}}</td><td class="text-right">{{vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError\'].m1_rate | number:2}}</td><td class="text-right">{{vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError\'].m5_rate | number:2}}</td><td class="text-right">{{vm.metrics.meters[\'com.codahale.metrics.servlet.InstrumentedFilter.responseCodes.serverError\'].m15_rate | number:2}}</td></tr></tbody></table></div><h3 data-translate="metrics.servicesstats.title">Services statistics (time in millisecond)</h3><div class="table-responsive"><table class="table table-striped"><thead><tr><th data-translate="metrics.servicesstats.table.name">Service name</th><th class="text-right" data-translate="metrics.servicesstats.table.count">Count</th><th class="text-right" data-translate="metrics.servicesstats.table.mean">Mean</th><th class="text-right" data-translate="metrics.servicesstats.table.min">Min</th><th class="text-right" data-translate="metrics.servicesstats.table.p50">p50</th><th class="text-right" data-translate="metrics.servicesstats.table.p75">p75</th><th class="text-right" data-translate="metrics.servicesstats.table.p95">p95</th><th class="text-right" data-translate="metrics.servicesstats.table.p99">p99</th><th class="text-right" data-translate="metrics.servicesstats.table.max">Max</th></tr></thead><tbody><tr ng-repeat="(k, v) in vm.servicesStats"><td>{{k}}</td><td class="text-right">{{v.count}}</td><td class="text-right">{{v.mean * 1000 | number:0}}</td><td class="text-right">{{v.min * 1000 | number:0}}</td><td class="text-right">{{v.p50 * 1000 | number:0}}</td><td class="text-right">{{v.p75 * 1000 | number:0}}</td><td class="text-right">{{v.p95 * 1000 | number:0}}</td><td class="text-right">{{v.p99 * 1000 | number:0}}</td><td class="text-right">{{v.max * 1000 | number:0}}</td></tr></tbody></table></div><h3 data-translate="metrics.cache.title">Cache statistics</h3><div class="table-responsive"><table class="table table-striped"><thead><tr><th data-translate="metrics.cache.cachename">Cache name</th><th class="text-right" data-translate="metrics.cache.hits">Cache Hits</th><th class="text-right" data-translate="metrics.cache.misses">Cache Misses</th><th class="text-right" data-translate="metrics.cache.gets">Cache Gets</th><th class="text-right" data-translate="metrics.cache.puts">Cache Puts</th><th class="text-right" data-translate="metrics.cache.removals">Cache Removals</th><th class="text-right" data-translate="metrics.cache.evictions">Cache Evictions</th><th class="text-right" data-translate="metrics.cache.hitPercent">Cache Hit %</th><th class="text-right" data-translate="metrics.cache.missPercent">Cache Miss %</th><th class="text-right" data-translate="metrics.cache.averageGetTime">Average get time (µs)</th><th class="text-right" data-translate="metrics.cache.averagePutTime">Average put time (µs)</th><th class="text-right" data-translate="metrics.cache.averageRemoveTime">Average remove time (µs)</th></tr></thead><tbody><tr ng-repeat="(k, v) in vm.cachesStats" ng-once><td>{{v.name}}</td><td class="text-right">{{vm.metrics.gauges[k + \'.cache-hits\'].value}}</td><td class="text-right">{{vm.metrics.gauges[k + \'.cache-misses\'].value}}</td><td class="text-right">{{vm.metrics.gauges[k + \'.cache-gets\'].value}}</td><td class="text-right">{{vm.metrics.gauges[k + \'.cache-puts\'].value}}</td><td class="text-right">{{vm.metrics.gauges[k + \'.cache-removals\'].value}}</td><td class="text-right">{{vm.metrics.gauges[k + \'.cache-evictions\'].value}}</td><td class="text-right">{{vm.metrics.gauges[k + \'.cache-hit-percentage\'].value}}</td><td class="text-right">{{vm.metrics.gauges[k + \'.cache-miss-percentage\'].value}}</td><td class="text-right">{{vm.metrics.gauges[k + \'.average-get-time\'].value | number:2}}</td><td class="text-right">{{vm.metrics.gauges[k + \'.average-put-time\'].value | number:2}}</td><td class="text-right">{{vm.metrics.gauges[k + \'.average-remove-time\'].value | number:2}}</td></tr></tbody></table></div><h3 data-translate="metrics.datasource.title" ng-show="vm.metrics.gauges[\'HikariPool-1.pool.TotalConnections\'].value > 0">DataSource statistics (time in millisecond)</h3><div class="table-responsive" ng-show="vm.metrics.gauges[\'HikariPool-1.pool.TotalConnections\'].value > 0"><table class="table table-striped"><thead><tr><th><span data-translate="metrics.datasource.usage">Usage</span> ({{vm.metrics.gauges[\'HikariPool-1.pool.ActiveConnections\'].value}} / {{vm.metrics.gauges[\'HikariPool-1.pool.TotalConnections\'].value}})</th><th class="text-right" data-translate="metrics.datasource.count">Count</th><th class="text-right" data-translate="metrics.datasource.mean">Mean</th><th class="text-right" data-translate="metrics.datasource.min">Min</th><th class="text-right" data-translate="metrics.datasource.p50">p50</th><th class="text-right" data-translate="metrics.datasource.p75">p75</th><th class="text-right" data-translate="metrics.datasource.p95">p95</th><th class="text-right" data-translate="metrics.datasource.p99">p99</th><th class="text-right" data-translate="metrics.datasource.max">Max</th></tr></thead><tbody><tr><td><div class="progress progress-striped"><uib-progressbar min="0" max="vm.metrics.gauges[\'HikariPool-1.pool.TotalConnections\'].value" value="vm.metrics.gauges[\'HikariPool-1.pool.ActiveConnections\'].value" class="progress-striped active" type="success"><span>{{vm.metrics.gauges[\'HikariPool-1.pool.ActiveConnections\'].value * 100 / vm.metrics.gauges[\'HikariPool-1.pool.TotalConnections\'].value | number:0}}%</span></uib-progressbar></div></td><td class="text-right">{{vm.metrics.histograms[\'HikariPool-1.pool.Usage\'].count}}</td><td class="text-right">{{vm.metrics.histograms[\'HikariPool-1.pool.Usage\'].mean | number:2}}</td><td class="text-right">{{vm.metrics.histograms[\'HikariPool-1.pool.Usage\'].min | number:2}}</td><td class="text-right">{{vm.metrics.histograms[\'HikariPool-1.pool.Usage\'].p50 | number:2}}</td><td class="text-right">{{vm.metrics.histograms[\'HikariPool-1.pool.Usage\'].p75 | number:2}}</td><td class="text-right">{{vm.metrics.histograms[\'HikariPool-1.pool.Usage\'].p95 | number:2}}</td><td class="text-right">{{vm.metrics.histograms[\'HikariPool-1.pool.Usage\'].p99 | number:2}}</td><td class="text-right">{{vm.metrics.histograms[\'HikariPool-1.pool.Usage\'].max | number:2}}</td></tr></tbody></table></div></div>'),
            t.put("app/admin/metrics/metrics.modal.html", '<!-- Modal used to display the threads dump --><div class="modal-header"><button type="button" class="close" ng-click="vm.cancel()">&times;</button><h4 class="modal-title" data-translate="metrics.jvm.threads.dump.title">Threads dump</h4></div><div class="modal-body pad"><span class="label label-primary" ng-click="threadDumpFilter = {}">All&nbsp;<span class="badge">{{vm.threadDumpAll}}</span></span>&nbsp; <span class="label label-success" ng-click="threadDumpFilter = {threadState: \'RUNNABLE\'}">Runnable&nbsp;<span class="badge">{{vm.threadDumpRunnable}}</span></span>&nbsp; <span class="label label-info" ng-click="threadDumpFilter = {threadState: \'WAITING\'}">Waiting&nbsp;<span class="badge">{{vm.threadDumpWaiting}}</span></span>&nbsp; <span class="label label-warning" ng-click="threadDumpFilter = {threadState: \'TIMED_WAITING\'}">Timed Waiting&nbsp;<span class="badge">{{vm.threadDumpTimedWaiting}}</span></span>&nbsp; <span class="label label-danger" ng-click="threadDumpFilter = {threadState: \'BLOCKED\'}">Blocked&nbsp;<span class="badge">{{vm.threadDumpBlocked}}</span></span>&nbsp;<div class="voffset2">&nbsp;</div>Filter <input type="text" ng-model="threadDumpFilter" class="form-control"><div class="row pad" ng-repeat="(k, v) in vm.threadDump | filter:threadDumpFilter"><h5><span class="label" ng-class="vm.getLabelClass(v.threadState)">{{v.threadState}}</span>&nbsp;{{v.threadName}} (ID {{v.threadId}}) <a ng-click="show = !show"><span ng-show="!show" data-translate="metrics.jvm.threads.dump.show">Show StackTrace</span> <span ng-show="show" data-translate="metrics.jvm.threads.dump.hide">Hide StackTrace</span></a></h5><div class="well" ng-show="show"><div ng-repeat="(stK, stV) in v.stackTrace">{{stV.className}}.{{stV.methodName}}({{stV.fileName}}:{{stV.lineNumber}}) <span class="voffset1"></span></div></div><table class="table table-condensed"><thead><tr><th class="text-right" data-translate="metrics.jvm.threads.dump.blockedtime">Blocked Time</th><th class="text-right" data-translate="metrics.jvm.threads.dump.blockedcount">Blocked Count</th><th class="text-right" data-translate="metrics.jvm.threads.dump.waitedtime">Waited Time</th><th class="text-right" data-translate="metrics.jvm.threads.dump.waitedcount">Waited Count</th><th data-translate="metrics.jvm.threads.dump.lockname">Lock Name</th></tr></thead><tbody><tr><td>{{v.blockedTime}}</td><td>{{v.blockedCount}}</td><td>{{v.waitedTime}}</td><td>{{v.waitedCount}}</td><td>{{v.lockName}}</td></tr></tbody></table></div></div><div class="modal-footer"><button type="button" class="btn btn-default pull-left" data-dismiss="modal" ng-click="vm.cancel()">Done</button></div>'), t.put("app/admin/user-management/user-management-delete-dialog.html", '<form name="deleteForm" ng-submit="vm.confirmDelete(vm.user.login)"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" data-translate="entity.delete.title">Confirm delete operation</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><p data-translate="userManagement.delete.question" translate-values="{login: \'{{vm.user.login}}\'}">Are you sure you want to delete this User?</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span data-translate="entity.action.cancel">Cancel</span></button> <button type="submit" class="btn btn-danger"><span class="glyphicon glyphicon-remove-circle"></span>&nbsp;<span data-translate="entity.action.delete">Delete</span></button></div></form>'), t.put("app/admin/user-management/user-management-detail.html", '<div><h2><span data-translate="userManagement.detail.title">User</span> "{{vm.user.login}}"</h2><dl class="dl-horizontal"><dt><span data-translate="userManagement.login">Login</span></dt><dd><span>{{vm.user.login}}</span></dd><dt><span data-translate="userManagement.firstName">First Name</span></dt><dd>{{vm.user.firstName}}</dd><dt><span data-translate="userManagement.lastName">Last Name</span></dt><dd>{{vm.user.lastName}}</dd><dt><span data-translate="userManagement.email">Email</span></dt><dd>{{vm.user.email}}</dd><dt><span data-translate="userManagement.activated">Activated</span></dt><dd>{{vm.user.activated}}</dd><dt><span data-translate="userManagement.langKey">Lang Key</span></dt><dd>{{vm.user.langKey}}</dd><dt><span data-translate="userManagement.createdBy">Created By</span></dt><dd>{{vm.user.createdBy}}</dd><dt><span data-translate="userManagement.createdDate">Created Date</span></dt><dd>{{vm.user.createdDate | date:\'dd/MM/yy HH:mm\' }}</dd><dt><span data-translate="userManagement.lastModifiedBy">Last Modified By</span></dt><dd>{{vm.user.lastModifiedBy}}</dd><dt><span data-translate="userManagement.lastModifiedDate">Last Modified Date</span></dt><dd>{{vm.user.lastModifiedDate | date:\'dd/MM/yy HH:mm\'}}</dd><dt><span data-translate="userManagement.profiles">Profiles</span></dt><dd><ul class="list-unstyled"><li ng-repeat="authority in vm.user.authorities"><span>{{authority}}</span></li></ul></dd></dl><button type="submit" ui-sref="user-management" class="btn btn-info"><span class="glyphicon glyphicon-arrow-left"></span>&nbsp;<span data-translate="entity.action.back"> Back</span></button></div>'), t.put("app/admin/user-management/user-management-dialog.html", '<form name="editForm" role="form" novalidate ng-submit="vm.save()" show-validation><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myUserLabel" data-translate="userManagement.home.createOrEditLabel">Create or edit a User</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><div class="form-group"><label data-translate="global.field.id">ID</label><input type="text" class="form-control" name="id" ng-model="vm.user.id" readonly="readonly"></div><div class="form-group"><label class="control-label" data-translate="userManagement.login">Login</label><input type="text" class="form-control" name="login" ng-model="vm.user.login" ng-required="vm.user.id == null" ng-minlength="1" ng-maxlength="50" ng-pattern="/^[_\'.@A-Za-z0-9-]*$/"><div ng-show="editForm.login.$invalid"><p class="help-block" ng-show="editForm.login.$error.required" data-translate="entity.validation.required">This field is required.</p><p class="help-block" ng-show="editForm.login.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="50">This field cannot be longer than 50 characters.</p></div></div><div class="form-group"><label class="control-label" data-translate="userManagement.firstName">First Name</label><input type="text" class="form-control" name="firstName" ng-model="vm.user.firstName" ng-maxlength="50"><div ng-show="editForm.firstName.$invalid"><p class="help-block" ng-show="editForm.firstName.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="50">This field cannot be longer than 50 characters.</p></div></div><div class="form-group"><label data-translate="userManagement.lastName">Last Name</label><input type="text" class="form-control" name="lastName" ng-model="vm.user.lastName" ng-maxlength="50"><div ng-show="editForm.lastName.$invalid"><p class="help-block" ng-show="editForm.lastName.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="50">This field cannot be longer than 50 characters.</p></div></div><div class="form-group"><label class="control-label" data-translate="userManagement.email">Email</label><input type="email" class="form-control" name="email" ng-model="vm.user.email" required ng-maxlength="100"><div ng-show="editForm.email.$invalid"><p class="help-block" ng-show="editForm.email.$error.required" data-translate="entity.validation.required">This field is required.</p><p class="help-block" ng-show="editForm.email.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="100">This field cannot be longer than 100 characters.</p><p class="help-block" ng-show="editForm.email.$error.email" data-translate="global.messages.validate.email.invalid">Your e-mail is invalid.</p></div></div><div class="form-group"><label for="activated"><input ng-disabled="vm.user.id === null" type="checkbox" id="activated" name="activated" ng-model="vm.user.activated"> <span data-translate="userManagement.activated">Activated</span></label></div><div class="form-group"><label data-translate="userManagement.langKey">Lang Key</label><select class="form-control" name="langKey" ng-model="vm.user.langKey" ng-options="language as language for language in vm.languages track by language"></select></div><div class="form-group"><label data-translate="userManagement.profiles">Profiles</label><select class="form-control" multiple="multiple" name="authority" ng-model="vm.user.authorities" ng-options="authority for authority in vm.authorities"></select></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span data-translate="entity.action.cancel">Cancel</span></button> <button type="submit" ng-disabled="editForm.$invalid || vm.isSaving" class="btn btn-primary"><span class="glyphicon glyphicon-save"></span>&nbsp;<span data-translate="entity.action.save">Save</span></button></div></form>'), t.put("app/admin/user-management/user-management.html", '<div><h2 data-translate="userManagement.home.title">Users</h2><jhi-alert></jhi-alert><div class="row"><div class="col-md-4"><button class="btn btn-primary" ui-sref="user-management.new"><span class="glyphicon glyphicon-flash"></span> <span data-translate="userManagement.home.createLabel">Create a new User</span></button></div></div><div class="table-responsive"><table class="table table-striped"><thead><tr jh-sort="vm.predicate" ascending="vm.reverse" callback="vm.transition()"><th jh-sort-by="id"><span data-translate="global.field.id">ID</span><span class="glyphicon glyphicon-sort"></span></th><th jh-sort-by="login"><span data-translate="userManagement.login">Login</span> <span class="glyphicon glyphicon-sort"></span></th><th jh-sort-by="email"><span data-translate="userManagement.email">Email</span> <span class="glyphicon glyphicon-sort"></span></th><th></th><th jh-sort-by="langKey"><span data-translate="userManagement.langKey">Lang Key</span> <span class="glyphicon glyphicon-sort"></span></th><th><span data-translate="userManagement.profiles">Profiles</span></th><th jh-sort-by="createdDate"><span data-translate="userManagement.createdDate">Created Date</span> <span class="glyphicon glyphicon-sort"></span></th><th jh-sort-by="lastModifiedBy"><span data-translate="userManagement.lastModifiedBy">Last Modified By</span> <span class="glyphicon glyphicon-sort"></span></th><th jh-sort-by="lastModifiedDate"><span data-translate="userManagement.lastModifiedDate">Last Modified Date</span> <span class="glyphicon glyphicon-sort"></span></th><th></th></tr></thead><tbody><tr ng-repeat="user in vm.users track by user.id"><td><a ui-sref="user-management-detail({login:user.login})">{{user.id}}</a></td><td>{{user.login}}</td><td>{{user.email}}</td><td><span class="label label-danger" ng-click="vm.setActive(user, true)" ng-show="!user.activated" data-translate="userManagement.deactivated" style="cursor: pointer">Deactivated</span> <span class="label label-success" ng-click="vm.setActive(user, false)" ng-show="user.activated" data-translate="userManagement.activated" style="cursor: pointer">Activated</span></td><td>{{user.langKey}}</td><td><div ng-repeat="authority in user.authorities"><span class="label label-info">{{ authority }}</span></div></td><td>{{user.createdDate | date:\'dd/MM/yy HH:mm\'}}</td><td>{{user.lastModifiedBy}}</td><td>{{user.lastModifiedDate | date:\'dd/MM/yy HH:mm\'}}</td><td class="text-right"><div class="btn-group flex-btn-group-container"><button type="submit" ui-sref="user-management-detail({login:user.login})" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-eye-open"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.view"></span></button> <button type="submit" ui-sref="user-management.edit({login:user.login})" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-pencil"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.edit"></span></button> <button type="submit" ui-sref="user-management.delete({login:user.login})" class="btn btn-danger btn-sm" ng-disabled="vm.currentAccount.login==user.login"><span class="glyphicon glyphicon-remove-circle"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.delete"></span></button></div></td></tr></tbody></table></div><div class="text-center"><jhi-item-count page="vm.page" total="vm.queryCount" items-per-page="vm.itemsPerPage"></jhi-item-count><uib-pagination class="pagination-sm" total-items="vm.totalItems" ng-model="vm.page" ng-change="vm.transition()"></uib-pagination></div></div>'), t.put("app/components/login/login.html", '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.cancel()">&times;</button><h4 class="modal-title" data-translate="login.title">Sign in</h4></div><div class="modal-body"><div class="row"><div class="col-md-4 col-md-offset-4"><h1 data-translate="login.title">Sign in</h1></div><div class="col-md-8 col-md-offset-2"><div class="alert alert-danger" ng-show="vm.authenticationError" data-translate="login.messages.error.authentication"><strong>Failed to sign in!</strong> Please check your credentials and try again.</div></div><div class="col-md-6"><form class="form" role="form" ng-submit="vm.login($event)"><div class="form-group"><label for="username" data-translate="global.form.username">Login</label><input type="text" class="form-control" id="username" placeholder="{{\'global.form.username.placeholder\' | translate}}" ng-model="vm.username"></div><div class="form-group"><label for="password" data-translate="login.form.password">Password</label><input type="password" class="form-control" id="password" placeholder="{{\'login.form.password.placeholder\' | translate}}" ng-model="vm.password"></div><div class="form-group"><label for="rememberMe"><input type="checkbox" id="rememberMe" ng-model="vm.rememberMe" checked="checked"> <span data-translate="login.form.rememberme">Remember me</span></label></div><button type="submit" class="btn btn-primary" data-translate="login.form.button">Sign in</button></form><p></p><div class="alert alert-warning"><a class="alert-link" href="" ng-click="vm.requestResetPassword()" data-translate="login.password.forgot">Did you forget your password?</a></div><div class="alert alert-warning" data-translate="global.messages.info.register" translate-compile>You don\'t have an account yet? <a class="alert-link" href="" ng-click="vm.register()">Register a new account</a></div></div><div class="col-md-6"><br><jh-social ng-provider="google"></jh-social><jh-social ng-provider="facebook"></jh-social><jh-social ng-provider="twitter"></jh-social><!-- jhipster-needle-add-social-button --></div></div></div>'), t.put("app/entities/avatar/avatar-delete-dialog.html", '<form name="deleteForm" ng-submit="vm.confirmDelete(vm.avatar.id)"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" data-translate="entity.delete.title">Confirm delete operation</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><p data-translate="quizApp.avatar.delete.question" translate-values="{id: \'{{vm.avatar.id}}\'}">Are you sure you want to delete this Avatar?</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span data-translate="entity.action.cancel">Cancel</span></button> <button type="submit" ng-disabled="deleteForm.$invalid" class="btn btn-danger"><span class="glyphicon glyphicon-remove-circle"></span>&nbsp;<span data-translate="entity.action.delete">Delete</span></button></div></form>'), t.put("app/entities/avatar/avatar-detail.html", '<div><h2><span data-translate="quizApp.avatar.detail.title">Avatar</span> {{vm.avatar.id}}</h2><hr><jhi-alert-error></jhi-alert-error><dl class="dl-horizontal jh-entity-details"><dt><span data-translate="quizApp.avatar.path">Path</span></dt><dd><span>{{vm.avatar.path}}</span></dd></dl><button type="submit" ui-sref="{{ vm.previousState }}" class="btn btn-info"><span class="glyphicon glyphicon-arrow-left"></span>&nbsp;<span data-translate="entity.action.back"> Back</span></button> <button type="button" ui-sref="avatar-detail.edit({id:vm.avatar.id})" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.edit">Edit</span></button></div>'), t.put("app/entities/avatar/avatar-dialog.html", '<form name="editForm" role="form" novalidate ng-submit="vm.save()" show-validation><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myAvatarLabel" data-translate="quizApp.avatar.home.createOrEditLabel">Create or edit a Avatar</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><div class="form-group" ng-show="vm.avatar.id"><label for="id" data-translate="global.field.id">ID</label><input type="text" class="form-control" id="id" name="id" ng-model="vm.avatar.id" readonly="readonly"></div><div class="form-group"><label class="control-label" data-translate="quizApp.avatar.path" for="field_path">Path</label><input type="text" class="form-control" name="path" id="field_path" ng-model="vm.avatar.path" ng-minlength="1" ng-maxlength="512"><div ng-show="editForm.path.$invalid"><p class="help-block" ng-show="editForm.path.$error.minlength" data-translate="entity.validation.minlength" translate-value-min="1">This field is required to be at least 1 characters.</p><p class="help-block" ng-show="editForm.path.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="512">This field cannot be longer than 512 characters.</p></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span data-translate="entity.action.cancel">Cancel</span></button> <button type="submit" ng-disabled="editForm.$invalid || vm.isSaving" class="btn btn-primary"><span class="glyphicon glyphicon-save"></span>&nbsp;<span data-translate="entity.action.save">Save</span></button></div></form>'), t.put("app/entities/avatar/avatars.html", '<div><h2 data-translate="quizApp.avatar.home.title">Avatars</h2><jhi-alert></jhi-alert><div class="container-fluid"><div class="row"><div class="col-xs-4 no-padding-left"><button class="btn btn-primary" ui-sref="avatar.new"><span class="glyphicon glyphicon-plus"></span> <span data-translate="quizApp.avatar.home.createLabel">Create new Avatar</span></button></div></div></div><br><div class="table-responsive"><table class="jh-table table table-striped"><thead><tr><th><span data-translate="global.field.id">ID</span></th><th><span data-translate="quizApp.avatar.path">Path</span></th><th></th></tr></thead><tbody><tr ng-repeat="avatar in vm.avatars track by avatar.id"><td><a ui-sref="avatar-detail({id:avatar.id})">{{avatar.id}}</a></td><td>{{avatar.path}}</td><td class="text-right"><div class="btn-group flex-btn-group-container"><button type="submit" ui-sref="avatar-detail({id:avatar.id})" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-eye-open"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.view"></span></button> <button type="submit" ui-sref="avatar.edit({id:avatar.id})" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-pencil"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.edit"></span></button> <button type="submit" ui-sref="avatar.delete({id:avatar.id})" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove-circle"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.delete"></span></button></div></td></tr></tbody></table></div></div>'), t.put("app/entities/category/categories.html", '<div><h2 data-translate="quizApp.category.home.title">Categories</h2><jhi-alert></jhi-alert><div class="container-fluid"><div class="row"><div class="col-xs-4 no-padding-left"><button class="btn btn-primary" ui-sref="category.new"><span class="glyphicon glyphicon-plus"></span> <span data-translate="quizApp.category.home.createLabel">Create new Category</span></button></div></div></div><br><div class="table-responsive"><table class="jh-table table table-striped"><thead><tr jh-sort="vm.predicate" ascending="vm.reverse" callback="vm.transition()"><th jh-sort-by="id"><span data-translate="global.field.id">ID</span> <span class="glyphicon glyphicon-sort"></span></th><th jh-sort-by="name"><span data-translate="quizApp.category.name">Name</span> <span class="glyphicon glyphicon-sort"></span></th><th></th></tr></thead><tbody><tr ng-repeat="category in vm.categories track by category.id"><td><a ui-sref="category-detail({id:category.id})">{{category.id}}</a></td><td>{{category.name}}</td><td class="text-right"><div class="btn-group flex-btn-group-container"><button type="submit" ui-sref="category-detail({id:category.id})" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-eye-open"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.view"></span></button> <button type="submit" ui-sref="category.edit({id:category.id})" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-pencil"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.edit"></span></button> <button type="submit" ui-sref="category.delete({id:category.id})" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove-circle"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.delete"></span></button></div></td></tr></tbody></table></div><div class="text-center"><jhi-item-count page="vm.page" total="vm.queryCount" items-per-page="vm.itemsPerPage"></jhi-item-count><uib-pagination class="pagination-sm" total-items="vm.totalItems" items-per-page="vm.itemsPerPage" ng-model="vm.page" ng-change="vm.transition()"></uib-pagination></div></div>'), t.put("app/entities/category/category-delete-dialog.html", '<form name="deleteForm" ng-submit="vm.confirmDelete(vm.category.id)"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" data-translate="entity.delete.title">Confirm delete operation</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><p data-translate="quizApp.category.delete.question" translate-values="{id: \'{{vm.category.id}}\'}">Are you sure you want to delete this Category?</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span data-translate="entity.action.cancel">Cancel</span></button> <button type="submit" ng-disabled="deleteForm.$invalid" class="btn btn-danger"><span class="glyphicon glyphicon-remove-circle"></span>&nbsp;<span data-translate="entity.action.delete">Delete</span></button></div></form>'), t.put("app/entities/category/category-detail.html", '<div><h2><span data-translate="quizApp.category.detail.title">Category</span> {{vm.category.id}}</h2><hr><jhi-alert-error></jhi-alert-error><dl class="dl-horizontal jh-entity-details"><dt><span data-translate="quizApp.category.name">Name</span></dt><dd><span>{{vm.category.name}}</span></dd></dl><button type="submit" ui-sref="{{ vm.previousState }}" class="btn btn-info"><span class="glyphicon glyphicon-arrow-left"></span>&nbsp;<span data-translate="entity.action.back"> Back</span></button> <button type="button" ui-sref="category-detail.edit({id:vm.category.id})" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.edit">Edit</span></button></div>'), t.put("app/entities/category/category-dialog.html", '<form name="editForm" role="form" novalidate ng-submit="vm.save()" show-validation><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myCategoryLabel" data-translate="quizApp.category.home.createOrEditLabel">Create or edit a Category</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><div class="form-group" ng-show="vm.category.id"><label for="id" data-translate="global.field.id">ID</label><input type="text" class="form-control" id="id" name="id" ng-model="vm.category.id" readonly="readonly"></div><div class="form-group"><label class="control-label" data-translate="quizApp.category.name" for="field_name">Name</label><input type="text" class="form-control" name="name" id="field_name" ng-model="vm.category.name" required ng-minlength="1" ng-maxlength="64"><div ng-show="editForm.name.$invalid"><p class="help-block" ng-show="editForm.name.$error.required" data-translate="entity.validation.required">This field is required.</p><p class="help-block" ng-show="editForm.name.$error.minlength" data-translate="entity.validation.minlength" translate-value-min="1">This field is required to be at least 1 characters.</p><p class="help-block" ng-show="editForm.name.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="64">This field cannot be longer than 64 characters.</p></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span data-translate="entity.action.cancel">Cancel</span></button> <button type="submit" ng-disabled="editForm.$invalid || vm.isSaving" class="btn btn-primary"><span class="glyphicon glyphicon-save"></span>&nbsp;<span data-translate="entity.action.save">Save</span></button></div></form>'), t.put("app/entities/help/help-delete-dialog.html", '<form name="deleteForm" ng-submit="vm.confirmDelete(vm.help.id)"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" data-translate="entity.delete.title">Confirm delete operation</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><p data-translate="quizApp.help.delete.question" translate-values="{id: \'{{vm.help.id}}\'}">Are you sure you want to delete this Help?</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span data-translate="entity.action.cancel">Cancel</span></button> <button type="submit" ng-disabled="deleteForm.$invalid" class="btn btn-danger"><span class="glyphicon glyphicon-remove-circle"></span>&nbsp;<span data-translate="entity.action.delete">Delete</span></button></div></form>'), t.put("app/entities/help/help-detail.html", '<div><h2><span data-translate="quizApp.help.detail.title">Help</span> {{vm.help.id}}</h2><hr><jhi-alert-error></jhi-alert-error><dl class="dl-horizontal jh-entity-details"><dt><span data-translate="quizApp.help.title">Title</span></dt><dd><span>{{vm.help.title}}</span></dd><dt><span data-translate="quizApp.help.description">Description</span></dt><dd><span>{{vm.help.description}}</span></dd><dt><span data-translate="quizApp.help.image">Image</span></dt><dd><span><img src="{{vm.help.image}}" style="max-width:100%"></span></dd></dl><button type="submit" ui-sref="{{ vm.previousState }}" class="btn btn-info"><span class="glyphicon glyphicon-arrow-left"></span>&nbsp;<span data-translate="entity.action.back"> Back</span></button> <button type="button" ui-sref="help-detail.edit({id:vm.help.id})" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.edit">Edit</span></button></div>'), t.put("app/entities/help/help-dialog.html", '<form name="editForm" enctype="multipart/form-data" role="form" novalidate ng-submit="vm.save()" show-validation xmlns="http://www.w3.org/1999/html"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myHelpLabel" data-translate="quizApp.help.home.createOrEditLabel">Create or edit a Help</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><div class="form-group" ng-show="vm.help.id"><label for="id" data-translate="global.field.id">ID</label><input type="text" class="form-control" id="id" name="id" ng-model="vm.help.id" readonly="readonly"></div><div class="form-group"><label class="control-label" data-translate="quizApp.help.title" for="field_title">Title</label><input type="text" class="form-control" name="title" id="field_title" ng-model="vm.help.title" required ng-minlength="1" ng-maxlength="128"><div ng-show="editForm.title.$invalid"><p class="help-block" ng-show="editForm.title.$error.required" data-translate="entity.validation.required">This field is required.</p><p class="help-block" ng-show="editForm.title.$error.minlength" data-translate="entity.validation.minlength" translate-value-min="1">This field is required to be at least 1 characters.</p><p class="help-block" ng-show="editForm.title.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="128">This field cannot be longer than 128 characters.</p></div></div><div class="form-group"><label class="control-label" data-translate="quizApp.help.description" for="field_description">Описание</label><textarea style="max-width:868px; min-height: 100px" class="form-control" name="description" id="field_description" ng-model="vm.help.description" required ng-minlength="1" ng-maxlength="2560"></textarea><div ng-show="editForm.description.$invalid"><p class="help-block" ng-show="editForm.description.$error.required" data-translate="entity.validation.required">This field is required.</p><p class="help-block" ng-show="editForm.description.$error.minlength" data-translate="entity.validation.minlength" translate-value-min="1">This field is required to be at least 1 characters.</p><p class="help-block" ng-show="editForm.description.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="2560">This field cannot be longer than 2560 characters.</p></div></div><div class="form-group"><label class="control-label" data-translate="quizApp.help.image" for="field_file">Картинка</label><input type="file" accept="image/*" class="form-control" name="file" id="field_file" fileread="vm.tempFile"> <img src="{{vm.tempFile}}" style="padding-top:10px; max-width: 100%"> <img ng-if="vm.help.image && vm.tempFile ==\'\'" src="{{vm.help.image}}" style="padding-top:10px; max-width: 100%"><div ng-show="editForm.file.$invalid"><p class="help-block" ng-show="editForm.description.$error.required" data-translate="entity.validation.required">This field is required.</p></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span data-translate="entity.action.cancel">Cancel</span></button> <button type="submit" ng-disabled="editForm.$invalid || vm.isSaving" class="btn btn-primary"><span class="glyphicon glyphicon-save"></span>&nbsp;<span data-translate="entity.action.save">Save</span></button></div></form>'),
            t.put("app/entities/help/helps.html", '<div><h2 data-translate="quizApp.help.home.title">Helps</h2><jhi-alert></jhi-alert><div class="container-fluid"><div class="row"><div class="col-xs-4 no-padding-left"><button class="btn btn-primary" ui-sref="help.new"><span class="glyphicon glyphicon-plus"></span> <span data-translate="quizApp.help.home.createLabel">Create new Help</span></button></div></div></div><br><div class="table-responsive"><table class="jh-table table table-striped"><thead><tr><th><span data-translate="global.field.id">ID</span></th><th><span data-translate="quizApp.help.title">Title</span></th><th><span data-translate="quizApp.help.description">Description</span></th><th><span data-translate="quizApp.help.image">Image</span></th><th></th></tr></thead><tbody><tr ng-repeat="help in vm.helps track by help.id"><td><a ui-sref="help-detail({id:help.id})">{{help.id}}</a></td><td>{{help.title}}</td><td>{{help.description}}</td><td><img src="{{help.image}}" width="200" height="100"></td><td class="text-right"><div class="btn-group flex-btn-group-container"><button type="submit" ui-sref="help-detail({id:help.id})" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-eye-open"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.view"></span></button> <button type="submit" ui-sref="help.edit({id:help.id})" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-pencil"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.edit"></span></button> <button type="submit" ui-sref="help.delete({id:help.id})" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove-circle"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.delete"></span></button></div></td></tr></tbody></table></div></div>'), t.put("app/entities/offer/offer-delete-dialog.html", '<form name="deleteForm" ng-submit="vm.confirmDelete(vm.offer.id)"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" data-translate="entity.delete.title">Потверждение удаления</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><p data-translate="quizApp.offer.delete.question" translate-values="{id: \'{{vm.offer.id}}\'}">Вы действительно хотите удалить это предложение?</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span data-translate="entity.action.cancel">Отменить</span></button> <button type="submit" ng-disabled="deleteForm.$invalid" class="btn btn-danger"><span class="glyphicon glyphicon-remove-circle"></span>&nbsp;<span data-translate="entity.action.delete">Удалить</span></button></div></form>'), t.put("app/entities/offer/offer-detail.html", '<div><h2><span data-translate="quizApp.offer.detail.title">Предложение этнических традиций</span></h2><hr><jhi-alert-error></jhi-alert-error><dl class="dl-horizontal jh-entity-details"><dt><span>ID</span></dt><dd><span>{{vm.offer.id}}</span></dd><dt><span data-translate="quizApp.offer.date">Дата</span></dt><dd><span>{{vm.offer.date | date:\'medium\'}}</span></dd><dt><span data-translate="quizApp.offer.user">Пользователь</span></dt><dd><span><a ui-sref="player-detail({id:vm.offer.user.id})">{{vm.offer.user.login}}</a></span></dd><dt><span data-translate="quizApp.offer.text">Описание</span></dt><dd><span>{{vm.offer.text}}</span></dd><span ng-if="vm.offer.withAttaches"><dt><span data-translate="quizApp.offer.attaches">Вложения</span></dt><dd ng-repeat="attach in vm.offer.attaches"><span><a target="_blank" href="{{attach.path}}"><img src="{{attach.path}}" style="max-width:100%"></a></span><br><br></dd></span></dl><button type="submit" ui-sref="{{ vm.previousState }}" class="btn btn-info"><span class="glyphicon glyphicon-arrow-left"></span>&nbsp;<span data-translate="entity.action.back"> Back</span></button></div>'), t.put("app/entities/offer/offer-image-dialog.html", '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button></div><div class="modal-body"><a target="_blank" href="{{vm.offer.attaches[vm.imageId].path;}}"><img style="width:100%" class="center-block" src="{{vm.offer.attaches[vm.imageId].path;}}"></a></div>'), t.put("app/entities/offer/offers.html", '<div><h2 data-translate="quizApp.offer.home.title">Предложения этнических традиций</h2><jhi-alert></jhi-alert><div class="container-fluid"><div class="row"><div class="col-xs-4 no-padding-left"></div></div></div><br><div class="table-responsive"><table class="jh-table table table-striped"><thead><tr jh-sort="vm.predicate" ascending="vm.reverse" callback="vm.transition()"><th jh-sort-by="id"><span data-translate="global.field.id">ID</span> <span class="glyphicon glyphicon-sort"></span></th><th jh-sort-by="date"><span data-translate="quizApp.offer.date">Дата</span> <span class="glyphicon glyphicon-sort"></span></th><th jh-sort-by="text"><span data-translate="quizApp.offer.text">Описание</span> <span class="glyphicon glyphicon-sort"></span></th><th></th></tr></thead><tbody><tr ng-repeat="offer in vm.offers track by offer.id"><td style="width: 60px"><a ui-sref="offer-detail({id:offer.id})">{{offer.id}}</a></td><td style="width: 140px">{{offer.date | date:\'medium\'}}</td><td style="width:60%">{{offer.text.length > 100 ? offer.text.substring(0,100)+\'...\': offer.text}}</td><td><span ng-if="offer.withAttaches" class="glyphicon glyphicon-file"></span></td><td class="text-right"><div class="btn-group flex-btn-group-container"><button type="submit" ui-sref="offer-detail({id:offer.id})" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-eye-open"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.view"></span></button> <button type="submit" ui-sref="offer.delete({id:offer.id})" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove-circle"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.delete"></span></button></div></td></tr></tbody></table></div><div class="text-center"><jhi-item-count page="vm.page" total="vm.queryCount" items-per-page="vm.itemsPerPage"></jhi-item-count><uib-pagination class="pagination-sm" total-items="vm.totalItems" items-per-page="vm.itemsPerPage" ng-model="vm.page" ng-change="vm.transition()"></uib-pagination></div></div>'), t.put("app/entities/player/player-delete-dialog.html", '<form name="deleteForm" ng-submit="vm.confirmDelete(vm.player.id)"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" data-translate="entity.delete.title">Confirm delete operation</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><p data-translate="quizApp.player.delete.question" translate-values="{id: \'{{vm.player.id}}\'}">Are you sure you want to delete this Player?</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span data-translate="entity.action.cancel">Cancel</span></button> <button type="submit" ng-disabled="deleteForm.$invalid" class="btn btn-danger"><span class="glyphicon glyphicon-remove-circle"></span>&nbsp;<span data-translate="entity.action.delete">Delete</span></button></div></form>'), t.put("app/entities/player/player-detail.html", '<div><h2><span data-translate="quizApp.player.detail.title">Player</span> {{vm.player.id}}</h2><hr><jhi-alert-error></jhi-alert-error><dl class="dl-horizontal jh-entity-details"><dt><span data-translate="quizApp.player.name">Name</span></dt><dd><span>{{vm.player.name}}</span></dd><dt><span data-translate="quizApp.player.score">Score</span></dt><dd><span>{{vm.player.score}}</span></dd><dt><span data-translate="quizApp.player.avatar">Avatar</span></dt><dd><a ui-sref="avatar-detail({id:vm.player.avatar.id})">{{vm.player.avatar.path}}</a></dd></dl><button type="submit" ui-sref="{{ vm.previousState }}" class="btn btn-info"><span class="glyphicon glyphicon-arrow-left"></span>&nbsp;<span data-translate="entity.action.back"> Back</span></button> <button type="button" ui-sref="player-detail.edit({id:vm.player.id})" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.edit">Edit</span></button></div>'), t.put("app/entities/player/player-dialog.html", '<form name="editForm" role="form" novalidate ng-submit="vm.save()" show-validation><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myPlayerLabel" data-translate="quizApp.player.home.createOrEditLabel">Create or edit a Player</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><div class="form-group" ng-show="vm.player.id"><label for="id" data-translate="global.field.id">ID</label><input type="text" class="form-control" id="id" name="id" ng-model="vm.player.id" readonly="readonly"></div><div class="form-group"><label class="control-label" data-translate="quizApp.player.name" for="field_name">Name</label><input type="text" class="form-control" name="name" id="field_name" ng-model="vm.player.name" ng-minlength="1" ng-maxlength="64"><div ng-show="editForm.name.$invalid"><p class="help-block" ng-show="editForm.name.$error.minlength" data-translate="entity.validation.minlength" translate-value-min="1">This field is required to be at least 1 characters.</p><p class="help-block" ng-show="editForm.name.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="64">This field cannot be longer than 64 characters.</p></div></div><div class="form-group"><label class="control-label" data-translate="quizApp.player.score" for="field_score">Score</label><input type="number" class="form-control" name="score" id="field_score" ng-model="vm.player.score"></div><div class="form-group"><label data-translate="quizApp.player.avatar" for="field_avatar">Avatar</label><select class="form-control" id="field_avatar" name="avatar" ng-model="vm.player.avatar" ng-options="avatar as avatar.path for avatar in vm.avatars track by avatar.id"><option value=""></option></select></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span data-translate="entity.action.cancel">Cancel</span></button> <button type="submit" ng-disabled="editForm.$invalid || vm.isSaving" class="btn btn-primary"><span class="glyphicon glyphicon-save"></span>&nbsp;<span data-translate="entity.action.save">Save</span></button></div></form>'), t.put("app/entities/player/players.html", '<div><h2 data-translate="quizApp.player.home.title">Players</h2><jhi-alert></jhi-alert><div class="container-fluid"><div class="row"><div class="col-xs-4 no-padding-left"><button class="btn btn-primary" ui-sref="player.new"><span class="glyphicon glyphicon-plus"></span> <span data-translate="quizApp.player.home.createLabel">Create new Player</span></button></div></div></div><br><div class="table-responsive"><table class="jh-table table table-striped"><thead><tr jh-sort="vm.predicate" ascending="vm.reverse" callback="vm.transition()"><th jh-sort-by="id"><span data-translate="global.field.id">ID</span> <span class="glyphicon glyphicon-sort"></span></th><th jh-sort-by="name"><span data-translate="quizApp.player.name">Name</span> <span class="glyphicon glyphicon-sort"></span></th><th jh-sort-by="score"><span data-translate="quizApp.player.score">Score</span> <span class="glyphicon glyphicon-sort"></span></th><th jh-sort-by="avatar.path"><span data-translate="quizApp.player.avatar">Avatar</span> <span class="glyphicon glyphicon-sort"></span></th><th></th></tr></thead><tbody><tr ng-repeat="player in vm.players track by player.id"><td><a ui-sref="player-detail({id:player.id})">{{player.id}}</a></td><td>{{player.name}}</td><td>{{player.score}}</td><td><a ui-sref="avatar-detail({id:player.avatar.id})">{{player.avatar.path}}</a></td><td class="text-right"><div class="btn-group flex-btn-group-container"><button type="submit" ui-sref="player-detail({id:player.id})" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-eye-open"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.view"></span></button> <button type="submit" ui-sref="player.edit({id:player.id})" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-pencil"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.edit"></span></button> <button type="submit" ui-sref="player.delete({id:player.id})" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove-circle"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.delete"></span></button></div></td></tr></tbody></table></div><div class="text-center"><jhi-item-count page="vm.page" total="vm.queryCount" items-per-page="vm.itemsPerPage"></jhi-item-count><uib-pagination class="pagination-sm" total-items="vm.totalItems" items-per-page="vm.itemsPerPage" ng-model="vm.page" ng-change="vm.transition()"></uib-pagination></div></div>'), t.put("app/entities/question/question-delete-dialog.html", '<form name="deleteForm" ng-submit="vm.confirmDelete(vm.question.id)"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" data-translate="entity.delete.title">Потверждение удаления</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><p data-translate="quizApp.question.delete.question" translate-values="{id: \'{{vm.question.id}}\'}">Вы действительно хотите удалить этот вопрос?</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span data-translate="entity.action.cancel">Отменить</span></button> <button type="submit" ng-disabled="deleteForm.$invalid" class="btn btn-danger"><span class="glyphicon glyphicon-remove-circle"></span>&nbsp;<span data-translate="entity.action.delete">Удалить</span></button></div></form>'), t.put("app/entities/question/question-detail.html", '<div><h2><span data-translate="quizApp.question.detail.title">Вопрос</span> {{vm.question.id}}</h2><hr><jhi-alert-error></jhi-alert-error><dl class="dl-horizontal jh-entity-details"><dt><span data-translate="quizApp.question.title">Title</span></dt><dd><span>{{vm.question.title}}</span></dd><dt ng-if="vm.question.media.media"><span data-translate="quizApp.question.media">Картинка</span></dt><dd ng-if="vm.question.media.media"><img src="{{vm.question.media.media}}" style="max-width:100%"></dd><dt style="{{(vm.question.rightAnswer === 1) ? \'color:green;\' : \'color:darkred\'}}"><span data-translate="quizApp.question.answer1">Ответ 1</span></dt><dd style="{{(vm.question.rightAnswer === 1) ? \'color:green\' :  \'color:darkred\'}}"><span>{{vm.question.answer1}}</span></dd><dt style="{{(vm.question.rightAnswer === 2) ? \'color:green;\' : \'color:darkred\'}}"><span data-translate="quizApp.question.answer2">Ответ 2</span></dt><dd style="{{(vm.question.rightAnswer === 2) ? \'color:green;\' : \'color:darkred\'}}"><span>{{vm.question.answer2}}</span></dd><dt style="{{(vm.question.rightAnswer === 3) ? \'color:green;\' : \'color:darkred\'}}"><span data-translate="quizApp.question.answer3">Ответ 3</span></dt><dd style="{{(vm.question.rightAnswer === 3) ? \'color:green;\' : \'color:darkred\'}}"><span>{{vm.question.answer3}}</span></dd><dt style="{{(vm.question.rightAnswer === 4) ? \'color:green;\' : \'color:darkred\'}}"><span data-translate="quizApp.question.answer4">Ответ 4</span></dt><dd style="{{(vm.question.rightAnswer === 4) ? \'color:green;\' : \'color:darkred\'}}"><span>{{vm.question.answer4}}</span></dd><dt><span data-translate="quizApp.question.category">Ветвь</span></dt><dd><a ui-sref="category-detail({id:vm.question.category.id})">{{vm.question.subcategory.name}}</a></dd></dl><button type="submit" ui-sref="{{ vm.previousState }}" class="btn btn-info"><span class="glyphicon glyphicon-arrow-left"></span>&nbsp;<span data-translate="entity.action.back"> Back</span></button> <button type="button" ui-sref="question-detail.edit({id:vm.question.id})" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.edit">Edit</span></button></div>'), t.put("app/entities/question/question-dialog.html", '<form name="editForm" role="form" novalidate ng-submit="vm.save()" show-validation><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="myQuestionLabel" data-translate="quizApp.question.home.createOrEditLabel">Create or edit a Question</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><div class="form-group" ng-show="vm.question.id"><label for="id" data-translate="global.field.id">ID</label><input type="text" class="form-control" id="id" name="id" ng-model="vm.question.id" readonly="readonly"></div><div class="form-group"><label class="control-label" data-translate="quizApp.question.title" for="field_title">Вопрос</label><input type="text" class="form-control" name="title" id="field_title" ng-model="vm.question.title" required ng-minlength="1" ng-maxlength="512"><div ng-show="editForm.title.$invalid"><p class="help-block" ng-show="editForm.title.$error.required" data-translate="entity.validation.required">This field is required.</p><p class="help-block" ng-show="editForm.title.$error.minlength" data-translate="entity.validation.minlength" translate-value-min="1">This field is required to be at least 1 characters.</p><p class="help-block" ng-show="editForm.title.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="512">This field cannot be longer than 512 characters.</p></div></div><!--<div class="form-group">--><!--<label class="control-label" data-translate="quizApp.question.media" for="field_media">Данные</label>--><!--<input type="text" class="form-control" name="media" id="field_media"--><!--ng-model="vm.question.media"--><!--ng-minlength="0" ng-maxlength="512" />--><!--<div ng-show="editForm.media.$invalid">--><!--<p class="help-block"--><!--ng-show="editForm.media.$error.minlength" data-translate="entity.validation.minlength" translate-value-min="0">--><!--This field is required to be at least 0 characters.--><!--</p>--><!--<p class="help-block"--><!--ng-show="editForm.media.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="512">--><!--This field cannot be longer than 512 characters.--><!--</p>--><!--</div>--><!--</div>--><div class="form-group"><label class="control-label"><input type="radio" ng-model="vm.question.rightAnswer" value="1"> Ответ 1</label><input type="text" class="form-control" name="answer1" id="field_answer1" ng-model="vm.question.answer1" required ng-minlength="1" ng-maxlength="64"><div ng-show="editForm.answer1.$invalid"><p class="help-block" ng-show="editForm.answer1.$error.required" data-translate="entity.validation.required">This field is required.</p><p class="help-block" ng-show="editForm.answer1.$error.minlength" data-translate="entity.validation.minlength" translate-value-min="1">This field is required to be at least 1 characters.</p><p class="help-block" ng-show="editForm.answer1.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="64">This field cannot be longer than 64 characters.</p></div></div><div class="form-group"><label class="control-label"><input type="radio" ng-model="vm.question.rightAnswer" value="2"> Ответ 2</label><input type="text" class="form-control" name="answer2" id="field_answer2" ng-model="vm.question.answer2" required ng-minlength="1" ng-maxlength="64"><div ng-show="editForm.answer2.$invalid"><p class="help-block" ng-show="editForm.answer2.$error.required" data-translate="entity.validation.required">This field is required.</p><p class="help-block" ng-show="editForm.answer2.$error.minlength" data-translate="entity.validation.minlength" translate-value-min="1">This field is required to be at least 1 characters.</p><p class="help-block" ng-show="editForm.answer2.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="64">This field cannot be longer than 64 characters.</p></div></div><div class="form-group"><label class="control-label"><input type="radio" ng-model="vm.question.rightAnswer" value="3"> Ответ 3</label><input type="text" class="form-control" name="answer3" id="field_answer3" ng-model="vm.question.answer3" required ng-minlength="1" ng-maxlength="64"><div ng-show="editForm.answer3.$invalid"><p class="help-block" ng-show="editForm.answer3.$error.required" data-translate="entity.validation.required">This field is required.</p><p class="help-block" ng-show="editForm.answer3.$error.minlength" data-translate="entity.validation.minlength" translate-value-min="1">This field is required to be at least 1 characters.</p><p class="help-block" ng-show="editForm.answer3.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="64">This field cannot be longer than 64 characters.</p></div></div><div class="form-group"><label class="control-label"><input type="radio" ng-model="vm.question.rightAnswer" value="4"> Ответ 4</label><input type="text" class="form-control" name="answer4" id="field_answer4" ng-model="vm.question.answer4" required ng-minlength="1" ng-maxlength="64"><div ng-show="editForm.answer4.$invalid"><p class="help-block" ng-show="editForm.answer4.$error.required" data-translate="entity.validation.required">This field is required.</p><p class="help-block" ng-show="editForm.answer4.$error.minlength" data-translate="entity.validation.minlength" translate-value-min="1">This field is required to be at least 1 characters.</p><p class="help-block" ng-show="editForm.answer4.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="64">This field cannot be longer than 64 characters.</p></div></div><!--<div class="form-group">--><!--<label class="control-label" data-translate="quizApp.question.rightAnswer" for="field_rightAnswer">Правильный--><!--ответ</label>--><!--<input type="number" class="form-control" name="rightAnswer" id="field_rightAnswer"--><!--ng-model="vm.question.rightAnswer"--><!--required/>--><!--<div ng-show="editForm.rightAnswer.$invalid">--><!--<p class="help-block"--><!--ng-show="editForm.rightAnswer.$error.required" data-translate="entity.validation.required">--><!--This field is required.--><!--</p>--><!--<p class="help-block"--><!--ng-show="editForm.rightAnswer.$error.number" data-translate="entity.validation.number">--><!--This field should be a number.--><!--</p>--><!--</div>--><!--</div>--><div class="form-group"><label data-translate="quizApp.question.category" for="field_category">Категория</label><select class="form-control" id="field_category" name="category" ng-model="vm.cat" ng-options="category as category.name for category in vm.categories track by category.id" required><option value=""></option></select></div><div ng-show="editForm.category.$invalid"><p class="help-block" ng-show="editForm.category.$error.required" data-translate="entity.validation.required">This field is required.</p></div><div class="form-group"><label data-translate="quizApp.question.category" for="field_subcategory">Ветвь</label><select class="form-control" id="field_subcategory" name="subcategory" ng-options="subcategory as subcategory.name for subcategory in vm.cat.subcategories track by subcategory.id" required><option value=""></option></select></div><div ng-show="editForm.subcategory.$invalid"><p class="help-block" ng-show="editForm.subcategory.$error.required" data-translate="entity.validation.required">This field is required.</p></div></div></form>'), t.put("app/entities/question/questions.html", '<div><h2 data-translate="quizApp.question.home.title">Вопросы</h2><jhi-alert></jhi-alert><jhi-alert-error></jhi-alert-error><style type="text/css">.btn-upload {\n            position: relative;\n            overflow: hidden;\n        }\n\n        .btn-upload input {\n            position: absolute;\n            top: 0;\n            right: 0;\n            margin: 0;\n            opacity: 0;\n            filter: alpha(opacity=0);\n            transform: translate(-300px, 0) scale(4);\n            -webkit-transform: translate(-300px, 0) scale(4);\n            -ms-transform: translate(-300px, 0) scale(4);\n            -o-transform: translate(-300px, 0) scale(4);\n            font-size: 23px;\n            direction: ltr;\n            cursor: pointer;\n        }\n\n        * html .btn-upload {\n            line-height: 24px;\n            margin: 1px -3px 0 0;\n        }\n\n        * + html .btn-upload {\n            padding: 2px 15px;\n            margin: 1px 0 0 0;\n        }\n\n        .show-image div {\n            visibility: hidden;\n            position: absolute;\n            background: #fff;\n            box-shadow: -2px 2px 10px -1px #111;\n            border-radius: 2px;\n            z-index: 5;\n        }\n\n        .show-image a {\n            color: black;\n        }\n\n        .show-image span {\n            color: black;\n        }\n\n        .show-image:link div {\n            color: inherit;\n        }\n\n        .show-image:visited {\n            color: inherit;\n        }\n\n        .show-image:active div {\n            color: inherit;\n        }\n\n        .show-image:hover div {\n            color: inherit;\n            visibility: visible;\n        }</style><div class="container-fluid"><div class="row"><div class="no-padding-left"><button class="btn btn-primary" ui-sref="question.new"><span class="glyphicon glyphicon-plus"></span> <span data-translate="quizApp.question.home.createLabel">Создать новый вопрос</span></button><div style="float: right"><upload-button class="btn btn-primary btn-upload" url="/api/v1/parser/upload" data="files" param="files" multiple="true">Загрузить список вопросов</upload-button></div></div></div></div><br><div class="table-responsive"><table class="jh-table table table-striped"><thead><tr jh-sort="vm.predicate" ascending="vm.reverse" callback="vm.transition()"><th jh-sort-by="id"><span data-translate="global.field.id">ID</span> <span class="glyphicon glyphicon-sort"></span></th><th><div class="glyphicon glyphicon-picture"></div></th><th jh-sort-by="title"><span data-translate="quizApp.question.title">Вопрос</span> <span class="glyphicon glyphicon-sort"></span></th><!--<th jh-sort-by="answer1"><span data-translate="quizApp.question.answer1">Ответ 1</span> <span--><!--class="glyphicon glyphicon-sort"></span></th>--><!--<th jh-sort-by="answer2"><span data-translate="quizApp.question.answer2">Ответ 2</span> <span--><!--class="glyphicon glyphicon-sort"></span></th>--><!--<th jh-sort-by="answer3"><span data-translate="quizApp.question.answer3">Ответ 3</span> <span--><!--class="glyphicon glyphicon-sort"></span></th>--><!--<th jh-sort-by="answer4"><span data-translate="quizApp.question.answer4">Ответ 4</span> <span--><!--class="glyphicon glyphicon-sort"></span></th>--><!--<th jh-sort-by="rightAnswer"><span--><!--data-translate="quizApp.question.rightAnswer">Правильный ответ</span> <span--><!--class="glyphicon glyphicon-sort"></span></th>--><th jh-sort-by="subcategory.name"><span data-translate="quizApp.question.category">Ветвь</span> <span class="glyphicon glyphicon-sort"></span></th><th></th></tr></thead><tbody><tr style="width: 100%" ng-repeat="question in vm.questions track by question.id"><td style="min-width: 55px"><a ui-sref="question-detail({id:question.id})">{{question.id}}</a></td><td><a ng-if="question.media.media" class="show-image"><span class="glyphicon glyphicon-picture"></span><div><img height="400" width="680" src="{{question.media.media}}"></div></a></td><td style="width: 60%">{{question.title}}</td><!--<td>{{question.answer1}}</td>--><!--<td>{{question.answer2}}</td>--><!--<td>{{question.answer3}}</td>--><!--<td>{{question.answer4}}</td>--><!--<td>{{question.rightAnswer}}</td>--><td><a>{{question.subcategory.name}}</a></td><td class="text-right"><div class="btn-group flex-btn-group-container"><button type="submit" ui-sref="question-detail({id:question.id})" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-eye-open"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.view"></span></button> <button type="submit" ui-sref="question.edit({id:question.id})" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-pencil"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.edit"></span></button> <button type="submit" ui-sref="question.delete({id:question.id})" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove-circle"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.delete"></span></button></div></td></tr></tbody></table></div><div class="text-center"><jhi-item-count page="vm.page" total="vm.queryCount" items-per-page="vm.itemsPerPage"></jhi-item-count><uib-pagination class="pagination-sm" total-items="vm.totalItems" items-per-page="vm.itemsPerPage" ng-model="vm.page" ng-change="vm.transition()"></uib-pagination></div></div>'), t.put("app/entities/subcategory/subcategories.html", '<div><h2 data-translate="quizApp.subcategory.home.title">Subcategories</h2><jhi-alert></jhi-alert><div class="container-fluid"><div class="row"><div class="col-xs-4 no-padding-left"><button class="btn btn-primary" ui-sref="subcategory.new"><span class="glyphicon glyphicon-plus"></span> <span data-translate="quizApp.subcategory.home.createLabel">Create new Subcategory</span></button></div></div></div><br><div class="table-responsive"><table class="jh-table table table-striped"><thead><tr jh-sort="vm.predicate" ascending="vm.reverse" callback="vm.transition()"><th jh-sort-by="id"><span data-translate="global.field.id">ID</span> <span class="glyphicon glyphicon-sort"></span></th><th jh-sort-by="name"><span data-translate="quizApp.subcategory.name">Name</span> <span class="glyphicon glyphicon-sort"></span></th><th jh-sort-by="category.name"><span data-translate="quizApp.subcategory.category">Category</span> <span class="glyphicon glyphicon-sort"></span></th><th></th></tr></thead><tbody><tr ng-repeat="subcategory in vm.subcategories track by subcategory.id"><td><a ui-sref="subcategory-detail({id:subcategory.id})">{{subcategory.id}}</a></td><td>{{subcategory.name}}</td><td><a ui-sref="category-detail({id:subcategory.category.id})">{{subcategory.category.name}}</a></td><td class="text-right"><div class="btn-group flex-btn-group-container"><button type="submit" ui-sref="subcategory-detail({id:subcategory.id})" class="btn btn-info btn-sm"><span class="glyphicon glyphicon-eye-open"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.view"></span></button> <button type="submit" ui-sref="subcategory.edit({id:subcategory.id})" class="btn btn-primary btn-sm"><span class="glyphicon glyphicon-pencil"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.edit"></span></button> <button type="submit" ui-sref="subcategory.delete({id:subcategory.id})" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-remove-circle"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.delete"></span></button></div></td></tr></tbody></table></div><div class="text-center"><jhi-item-count page="vm.page" total="vm.queryCount" items-per-page="vm.itemsPerPage"></jhi-item-count><uib-pagination class="pagination-sm" total-items="vm.totalItems" items-per-page="vm.itemsPerPage" ng-model="vm.page" ng-change="vm.transition()"></uib-pagination></div></div>'),
            t.put("app/entities/subcategory/subcategory-delete-dialog.html", '<form name="deleteForm" ng-submit="vm.confirmDelete(vm.subcategory.id)"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" data-translate="entity.delete.title">Confirm delete operation</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><p data-translate="quizApp.subcategory.delete.question" translate-values="{id: \'{{vm.subcategory.id}}\'}">Are you sure you want to delete this Subcategory?</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span data-translate="entity.action.cancel">Cancel</span></button> <button type="submit" ng-disabled="deleteForm.$invalid" class="btn btn-danger"><span class="glyphicon glyphicon-remove-circle"></span>&nbsp;<span data-translate="entity.action.delete">Delete</span></button></div></form>'), t.put("app/entities/subcategory/subcategory-detail.html", '<div><h2><span data-translate="quizApp.subcategory.detail.title">Subcategory</span> {{vm.subcategory.id}}</h2><hr><jhi-alert-error></jhi-alert-error><dl class="dl-horizontal jh-entity-details"><dt><span data-translate="quizApp.subcategory.name">Name</span></dt><dd><span>{{vm.subcategory.name}}</span></dd><dt><span data-translate="quizApp.subcategory.category">Category</span></dt><dd><a ui-sref="category-detail({id:vm.subcategory.category.id})">{{vm.subcategory.category.name}}</a></dd></dl><button type="submit" ui-sref="{{ vm.previousState }}" class="btn btn-info"><span class="glyphicon glyphicon-arrow-left"></span>&nbsp;<span data-translate="entity.action.back"> Back</span></button> <button type="button" ui-sref="subcategory-detail.edit({id:vm.subcategory.id})" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span> <span class="hidden-xs hidden-sm" data-translate="entity.action.edit">Edit</span></button></div>'), t.put("app/entities/subcategory/subcategory-dialog.html", '<form name="editForm" role="form" novalidate ng-submit="vm.save()" show-validation><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="vm.clear()">&times;</button><h4 class="modal-title" id="mySubcategoryLabel" data-translate="quizApp.subcategory.home.createOrEditLabel">Create or edit a Subcategory</h4></div><div class="modal-body"><jhi-alert-error></jhi-alert-error><div class="form-group" ng-show="vm.subcategory.id"><label for="id" data-translate="global.field.id">ID</label><input type="text" class="form-control" id="id" name="id" ng-model="vm.subcategory.id" readonly="readonly"></div><div class="form-group"><label class="control-label" data-translate="quizApp.subcategory.name" for="field_name">Name</label><input type="text" class="form-control" name="name" id="field_name" ng-model="vm.subcategory.name" required ng-minlength="1" ng-maxlength="64"><div ng-show="editForm.name.$invalid"><p class="help-block" ng-show="editForm.name.$error.required" data-translate="entity.validation.required">This field is required.</p><p class="help-block" ng-show="editForm.name.$error.minlength" data-translate="entity.validation.minlength" translate-value-min="1">This field is required to be at least 1 characters.</p><p class="help-block" ng-show="editForm.name.$error.maxlength" data-translate="entity.validation.maxlength" translate-value-max="64">This field cannot be longer than 64 characters.</p></div></div><div class="form-group"><label data-translate="quizApp.subcategory.category" for="field_category">Category</label><select class="form-control" id="field_category" name="category" ng-model="vm.subcategory.category" ng-options="category as category.name for category in vm.categories track by category.id" required><option value=""></option></select></div><div ng-show="editForm.category.$invalid"><p class="help-block" ng-show="editForm.category.$error.required" data-translate="entity.validation.required">This field is required.</p></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal" ng-click="vm.clear()"><span class="glyphicon glyphicon-ban-circle"></span>&nbsp;<span data-translate="entity.action.cancel">Cancel</span></button> <button type="submit" ng-disabled="editForm.$invalid || vm.isSaving" class="btn btn-primary"><span class="glyphicon glyphicon-save"></span>&nbsp;<span data-translate="entity.action.save">Save</span></button></div></form>'), t.put("app/layouts/error/accessdenied.html", '<div ng-cloak><div class="row"><div class="col-md-4"><span class="hipster img-responsive img-rounded"></span></div><div class="col-md-8"><h1 data-translate="error.title">Error Page!</h1><div class="alert alert-danger" data-translate="error.403">You are not authorized to access the page.</div></div></div></div>'), t.put("app/layouts/error/error.html", '<div ng-cloak><div class="row"><div class="col-md-4"><span class="hipster img-responsive img-rounded"></span></div><div class="col-md-8"><h1 data-translate="error.title">Error Page!</h1><div ng-show="errorMessage"><div class="alert alert-danger">{{errorMessage}}</div></div></div></div></div>'), t.put("app/layouts/navbar/navbar.html", '<nav class="navbar navbar-default" role="navigation"><div class="container"><div class="navbar-header"><button type="button" class="navbar-toggle" ng-click="vm.toggleNavbar()"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> <a class="navbar-brand logo" href="#/" ng-click="vm.collapseNavbar()"><img class="logo-img" src="content/images/logo-a61f8c8ea1.png" alt="logo"> <span>Викторина народы России</span></a></div><div class="navbar-collapse" uib-collapse="vm.isNavbarCollapsed" ng-switch="vm.isAuthenticated()"><ul class="nav navbar-nav navbar-right"><li ui-sref-active="active"><a ui-sref="home" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-home"></span> <span class="hidden-sm" data-translate="global.menu.home">Home</span></a></li><!-- jhipster-needle-add-element-to-menu - JHipster will add new menu items here --><li ng-class="{active: vm.$state.includes(\'entity\')}" ng-switch-when="true" uib-dropdown class="dropdown pointer"><a class="dropdown-toggle" uib-dropdown-toggle href="" id="entity-menu"><span><span class="glyphicon glyphicon-th-list"></span> <span class="hidden-sm" data-translate="global.menu.entities.main">Entities </span><b class="caret"></b></span></a><ul class="dropdown-menu" uib-dropdown-menu><li ui-sref-active="active"><a ui-sref="offer" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-asterisk"></span>&nbsp; <span data-translate="global.menu.entities.offer">Offer</span></a></li><li ui-sref-active="active"><a ui-sref="avatar" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-asterisk"></span>&nbsp; <span data-translate="global.menu.entities.avatar">Avatar</span></a></li><li ui-sref-active="active"><a ui-sref="player" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-asterisk"></span>&nbsp; <span data-translate="global.menu.entities.player">Player</span></a></li><li ui-sref-active="active"><a ui-sref="help" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-asterisk"></span>&nbsp; <span data-translate="global.menu.entities.help">Help</span></a></li><li ui-sref-active="active"><a ui-sref="category" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-asterisk"></span>&nbsp; <span data-translate="global.menu.entities.category">Category</span></a></li><li ui-sref-active="active"><a ui-sref="question" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-asterisk"></span>&nbsp; <span data-translate="global.menu.entities.question">Question</span></a></li><li ui-sref-active="active"><a ui-sref="subcategory" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-asterisk"></span>&nbsp; <span data-translate="global.menu.entities.subcategory">Subcategory</span></a></li><!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here --></ul></li><li ng-class="{active: vm.$state.includes(\'account\')}" uib-dropdown class="dropdown pointer"><a class="dropdown-toggle" uib-dropdown-toggle href="" id="account-menu"><span><span class="glyphicon glyphicon-user"></span> <span class="hidden-sm" data-translate="global.menu.account.main">Account </span><b class="caret"></b></span></a><ul class="dropdown-menu" uib-dropdown-menu><li ui-sref-active="active" ng-switch-when="true"><a ui-sref="settings" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-wrench"></span>&nbsp; <span data-translate="global.menu.account.settings">Settings</span></a></li><li ui-sref-active="active" ng-switch-when="true"><a ui-sref="password" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-lock"></span>&nbsp; <span data-translate="global.menu.account.password">Password</span></a></li><li ui-sref-active="active" ng-switch-when="true"><a href="" ng-click="vm.logout()" id="logout"><span class="glyphicon glyphicon-log-out"></span>&nbsp; <span data-translate="global.menu.account.logout">Sign out</span></a></li><li ui-sref-active="active" ng-switch-when="false"><a href="" ng-click="vm.login()" id="login"><span class="glyphicon glyphicon-log-in"></span>&nbsp; <span data-translate="global.menu.account.login">Sign in</span></a></li><li ui-sref-active="active" ng-switch-when="false"><a ui-sref="register" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-plus-sign"></span>&nbsp; <span data-translate="global.menu.account.register">Register</span></a></li></ul></li><li ng-class="{active: vm.$state.includes(\'admin\')}" ng-switch-when="true" has-authority="ROLE_ADMIN" uib-dropdown class="dropdown pointer"><a class="dropdown-toggle" uib-dropdown-toggle href="" id="admin-menu"><span><span class="glyphicon glyphicon-tower"></span> <span class="hidden-sm" data-translate="global.menu.admin.main">Administration</span> <b class="caret"></b></span></a><ul class="dropdown-menu" uib-dropdown-menu><li ui-sref-active="active"><a ui-sref="user-management" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-user"></span>&nbsp; <span data-translate="global.menu.admin.userManagement">User management</span></a></li><li ui-sref-active="active"><a ui-sref="jhi-metrics" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-dashboard"></span>&nbsp; <span data-translate="global.menu.admin.metrics">Metrics</span></a></li><li ui-sref-active="active"><a ui-sref="jhi-health" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-heart"></span>&nbsp; <span data-translate="global.menu.admin.health">Health</span></a></li><li ui-sref-active="active"><a ui-sref="jhi-configuration" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-list-alt"></span>&nbsp; <span data-translate="global.menu.admin.configuration">Configuration</span></a></li><li ui-sref-active="active"><a ui-sref="audits" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-bell"></span>&nbsp; <span data-translate="global.menu.admin.audits">Audits</span></a></li><li ui-sref-active="active"><a ui-sref="logs" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-tasks"></span>&nbsp; <span data-translate="global.menu.admin.logs">Logs</span></a></li><li ng-show="vm.swaggerEnabled" ui-sref-active="active"><a ui-sref="docs" ng-click="vm.collapseNavbar()"><span class="glyphicon glyphicon-book"></span>&nbsp; <span data-translate="global.menu.admin.apidocs">API</span></a></li><!-- jhipster-needle-add-element-to-admin-menu - JHipster will add entities to the admin menu here --></ul></li><li ui-sref-active="active" uib-dropdown class="dropdown pointer" ng-controller="JhiLanguageController as languageVm"><a class="dropdown-toggle" uib-dropdown-toggle href="" ng-if="languageVm.languages.length > 1"><span><span class="glyphicon glyphicon-flag"></span> <span class="hidden-sm" data-translate="global.menu.language">Language</span> <b class="caret"></b></span></a><ul class="dropdown-menu" uib-dropdown-menu ng-if="languageVm.languages.length > 1"><li active-menu="{{language}}" ng-repeat="language in languageVm.languages"><a href="" ng-click="languageVm.changeLanguage(language);vm.collapseNavbar();">{{language | findLanguageFromKey}}</a></li></ul></li></ul></div></div></nav>'), t.put("app/account/reset/finish/reset.finish.html", '<div><div class="row"><div class="col-md-4 col-md-offset-4"><h1 data-translate="reset.finish.title">Reset password</h1><div class="alert alert-danger" data-translate="reset.finish.messages.keymissing" ng-show="vm.keyMissing"><strong>The password reset key is missing.</strong></div><div class="alert alert-warning" ng-hide="vm.success || vm.keyMissing"><p data-translate="reset.finish.messages.info">Choose a new password</p></div><div class="alert alert-danger" ng-show="vm.error"><p data-translate="reset.finish.messages.error">Your password couldn\'t be reset. Remember a password request is only valid for 24 hours.</p></div><div class="alert alert-success" ng-show="vm.success"><p data-translate="reset.finish.messages.success" translate-compile><strong>Your password has been reset.</strong> Please <a class="alert-link" href="" ng-click="vm.login()">sign in</a>.</p></div><div class="alert alert-danger" ng-show="vm.doNotMatch" data-translate="global.messages.error.dontmatch">The password and its confirmation do not match!</div><div ng-hide="vm.keyMissing"><form ng-show="!vm.success" name="form" role="form" novalidate ng-submit="vm.finishReset()" show-validation><div class="form-group"><label class="control-label" for="password" data-translate="global.form.newpassword">New password</label><input type="password" class="form-control" id="password" name="password" placeholder="{{\'global.form.newpassword.placeholder\' | translate}}" ng-model="vm.resetAccount.password" ng-minlength="4" ng-maxlength="50" required><div ng-show="form.password.$dirty && form.password.$invalid"><p class="help-block" ng-show="form.password.$error.required" data-translate="global.messages.validate.newpassword.required">Your password is required.</p><p class="help-block" ng-show="form.password.$error.minlength" data-translate="global.messages.validate.newpassword.minlength">Your password is required to be at least 4 characters.</p><p class="help-block" ng-show="form.password.$error.maxlength" data-translate="global.messages.validate.newpassword.maxlength">Your password cannot be longer than 50 characters.</p></div><password-strength-bar password-to-check="vm.resetAccount.password"></password-strength-bar></div><div class="form-group"><label class="control-label" for="confirmPassword" data-translate="global.form.confirmpassword">New password confirmation</label><input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="{{\'global.form.confirmpassword.placeholder\' | translate}}" ng-model="vm.confirmPassword" ng-minlength="4" ng-maxlength="50" required><div ng-show="form.confirmPassword.$dirty && form.confirmPassword.$invalid"><p class="help-block" ng-show="form.confirmPassword.$error.required" data-translate="global.messages.validate.confirmpassword.required">Your password confirmation is required.</p><p class="help-block" ng-show="form.confirmPassword.$error.minlength" data-translate="global.messages.validate.confirmpassword.minlength">Your password confirmation is required to be at least 4 characters.</p><p class="help-block" ng-show="form.confirmPassword.$error.maxlength" data-translate="global.messages.validate.confirmpassword.maxlength">Your password confirmation cannot be longer than 50 characters.</p></div></div><button type="submit" ng-disabled="form.$invalid" class="btn btn-primary" data-translate="reset.finish.form.button">Reset Password</button></form></div></div></div></div>'), t.put("app/account/reset/request/reset.request.html", '<div><div class="row"><div class="col-md-8 col-md-offset-2"><h1 data-translate="reset.request.title">Reset your password</h1><div class="alert alert-danger" data-translate="reset.request.messages.notfound" ng-show="vm.errorEmailNotExists"><strong>E-Mail address isn\'t registered!</strong> Please check and try again.</div><div class="alert alert-warning" ng-hide="vm.success"><p data-translate="reset.request.messages.info">Enter the e-mail address you used to register.</p></div><div class="alert alert-success" ng-show="vm.success == \'OK\'"><p data-translate="reset.request.messages.success">Check your e-mails for details on how to reset your password.</p></div><form ng-show="!vm.success" name="form" role="form" novalidate ng-submit="vm.requestReset()" show-validation><div class="form-group"><label class="control-label" for="email" data-translate="global.form.email">E-mail</label><input type="email" class="form-control" id="email" name="email" placeholder="{{\'global.form.email.placeholder\' | translate}}" ng-model="vm.resetAccount.email" ng-minlength="5" ng-maxlength="100" required><div ng-show="form.email.$dirty && form.email.$invalid"><p class="help-block" ng-show="form.email.$error.required" data-translate="global.messages.validate.email.required">Your e-mail is required.</p><p class="help-block" ng-show="form.email.$error.email" data-translate="global.messages.validate.email.invalid">Your e-mail is invalid.</p><p class="help-block" ng-show="form.email.$error.minlength" data-translate="global.messages.validate.email.minlength">Your e-mail is required to be at least 5 characters.</p><p class="help-block" ng-show="form.email.$error.maxlength" data-translate="global.messages.validate.email.maxlength">Your e-mail cannot be longer than 100 characters.</p></div></div><button type="submit" ng-disabled="form.$invalid" class="btn btn-primary" data-translate="reset.request.form.button">Reset</button></form></div></div></div>'), t.put("app/account/social/directive/social.html", '<form action="{{ providerURL }}" method="POST"><button type="submit" class="btn btn-block jh-btn-social jh-btn-{{ provider }}"><span data-translate="social.btnLabel" translate-values="{ label: label }">Sign in with {{ label }}</span></button> <input name="scope" type="hidden" value="{{ providerSetting }}"> <input name="_csrf" type="hidden" value="{{ csrf }}"></form>')
    }])
}();
//# sourceMappingURL=app-9cb5ee3123.js.map
