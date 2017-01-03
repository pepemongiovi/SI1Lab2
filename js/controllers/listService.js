var app = angular.module('toDoList');
app.service('listService', function () {
	var lists = [];
    var service = {
    	getLists: function(){
    		return lists;
    	},
    	setLists: function(newLists){
    		lists = newLists;
    	}
    };

    return service;
});