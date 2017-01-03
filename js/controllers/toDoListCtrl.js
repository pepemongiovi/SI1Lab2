var toDoList = angular.module('toDoList')
    .controller("toDoListCtrl", ['$scope','$window', function($scope, $window,listService){

        $scope.menuItems = {home:'Home',
                            createList: 'Create new list',
                            contact: 'Contact'};

        $scope.priorities = {high: "High",
                            medium: "Medium",
                            low: "Low"};

        $scope.categories = {work: "Work",
                            university: "University",
                            home: "Home",
                            other: "Other"};

        var initialTasks = [{description:"Finish SI1's Project", finished: false, priority: $scope.priorities.high, 
                                category: $scope.categories.university}, 
                            {description:"Sleep at least 10 hours", finished: true, priority: $scope.priorities.low, 
                                category: $scope.categories.other}, 
                            {description:"Grow a full beard",finished:false, priority: $scope.priorities.medium, 
                                category: $scope.categories.other}];

        $scope.lists = [{description: "Giuseppe's to do list", tasks: initialTasks},
                        {description: "Other to do list", tasks: []}];

        $scope.categoryStatus = {Home: true,
                                Work: true,
                                University: true,
                                Other: true}; 

        $scope.activeMenu = $scope.menuItems.home;
        $scope.progress = 0.00;
        $scope.currentList = $scope.lists[0];

        $scope.selectCategory = function(category){
            $scope.categoryStatus[category] = true;
        };

        $scope.deselectCategory = function(category){
            $scope.categoryStatus[category] = false;
        };

        $scope.addNewTask = function(){
            var description = $scope.input.task.description;
            var priority = $scope.input.task.priority;
            var category = $scope.input.task.category;
            if (description && priority && category){
                if(containsTask(description))
                    $window.alert("A task with this description already exists.");
                else
                    $scope.currentList.tasks.push({description: description, finished: false, 
                        priority: priority, category: category});
                    $scope.input.task.description = "";
                    $scope.input.task.category = "";
                    $scope.input.task.priority = "";
            }
            else{
                $window.alert("Please write a description, select a priority and a category!");
            }
        };

        $scope.addNewList = function(){
            var description = $scope.input.list.description;
            var tasks = [];
            if (description){
                $scope.lists.push({description: description, tasks: tasks});
                $scope.currentList = $scope.lists[$scope.lists.length-1];
            }
            else{
                $window.alert("Please give the list a name.");
            }
        };

        $scope.setActive = function(menuItem){
            $scope.activeMenu = menuItem;
        }

        function containsTask(description){
            var contains = false;
            $scope.currentList.tasks.forEach(function(task) {
                if (task.description==description){
                    contains = true;
                }
            });
            return contains;
        };

        $scope.removeTask = function (taskToBeRemoved) {
            var counter = 0
            $scope.currentList.tasks.forEach(function(task) {
                if (task.description==taskToBeRemoved.description){
                    $scope.currentList.tasks.splice(counter,1);
                }
                counter +=1
            });
        };

        $scope.clearTasks = function(){
            $scope.currentList.tasks = [];
        };

        $scope.removeList = function (listToBeRemoved) {
            var counter = 0
            $scope.lists.forEach(function(list) {
                if (list.description==listToBeRemoved.description){
                    $scope.lists.splice(counter,1);
                }
                counter +=1
            });
            $scope.currentList = $scope.lists[0];
        };

        $scope.clearLists = function(){
            $scope.lists = [];
        };

        $scope.$watch('[currentList.tasks, categoryStatus]',function(){
            var totalTasks = 0;
            var totalTasksCompleted = 0;
            
            $scope.currentList.tasks.forEach(function (task) {
                if($scope.categoryStatus[task.category]){
                    if(task.finished){
                        totalTasksCompleted+=1;
                    }
                    totalTasks+=1;
                }
            });
            if (totalTasks==0){
                $scope.progress = parseFloat(Math.round(0  * 100) / 100).toFixed(2);
            }else{
                $scope.progress = parseFloat(Math.round(((totalTasksCompleted/totalTasks)*100) * 100) / 100).toFixed(2);
            }
        }, true);
    }]);
