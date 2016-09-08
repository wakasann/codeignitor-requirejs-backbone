define(function(require) {
    var app = require("app")
    //   , server = require("common/services/server");
     require("angular-loader").configure(app)
     console.log(app);
    // require("common/services/config"),
    // require("common/services/navconfig"),
    // require("common/services/utils"),
    // require("common/services/http"),
    // require("common/services/noticeServic"),
    // require("common/directives/loading"),
    // require("common/directives/breadcrumb"),
    // require("common/directives/form-select"),
    // require("common/directives/empty-data"),
    // require("common/directives/dingdone-footer"),
    // require("./appmake/services/appMakeService"),
    console.log("app.router.js");
    app.config(function($httpProvider, $stateProvider) {
        //$urlRouterProvider.when("/", "app/design").when("/index.html", "app/design"),
        $stateProvider.state("mainLayout", {
            url: "",
            "abstract": !0,
            views: {
                "": {
                    templateUrl: "common/layout/leftrightLayout.html"
                },
                "nav@mainLayout": {
                    templateUrl: "common/nav/nav.html",
                    controller: "NavCtrl",
                    controllerUrl: "common/controllers/nav"
                },
                "userheader@mainLayout": {
                    templateUrl: "common/nav/userheader.html"
                }
            }
        }).state("mainLayout.appbase", {
            url: "/app/baseinfo",
            templateUrl: "appmake/baseinfo/index.html",
            controller: "AppBaseCtrl",
            controllerUrl: "appmake/baseinfo/index"
        });
        //$locationProvider.html5Mode(!0)
    }),
    app.run(function($rootScope, $window, $state) {
        //$rootScope.timer = {};
    })
});
