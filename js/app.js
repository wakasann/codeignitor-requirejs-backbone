define(function(require, exports, module) {
    // require("templateCache"),
    require("angular-route"),
    require("underscore"),
    require("angular-animate"),
    require("angular-touch"),
    require("ui-bootstrap"),
    // require("jquery.spectrum"),
    // require("angular.spectrum"),
    window.D = _,
    window.A = angular;
    var angularDragula = require("angular-dragula");
    //require("angular-dndLists");
    console.log("app.js");
    var app = angular.module("ezdiyApp", ["ui.router","ngAnimate", "ui.bootstrap", "ui.sortable",angularDragula(angular)]);
    
    //app.value("duScrollOffset", 140).value("duScrollBottomSpy", !0),
    module.exports = app
});
