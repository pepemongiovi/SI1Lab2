angular.module("toDoList",["ui.router"])

    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state("home",{
                url: "/",
                templateUrl: "Templates/home.html",
                controller: "toDoListCtrl"
            })
            .state("contact",{
                url: "/contact",
                templateUrl: "Templates/contact.html"
            })
            .state("createList",{
            	url: "/createList",
            	templateUrl: "Templates/createList.html",
            	controller: "toDoListCtrl"
            })
    }]);
