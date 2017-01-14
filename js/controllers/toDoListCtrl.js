var toDoList = angular.module('toDoList');

    toDoList.directive('childScope', function() {
        return { scope: true, restrict:'AE' }
    });
    toDoList.controller("toDoListCtrl", ['$scope','$window', function($scope, $window,listService){

        $scope.menuItems = {home:'Home',
                            createList: 'Create new list',
                            contact: 'Contact'};

        $scope.priorities = {high: "High",
                            medium: "Medium",
                            low: "Low"};

        $scope.categories = {other: "Other",
                            work: "Work",
                            university: "University",
                            home: "Home"};

        var initialTasks = [{description:"Finish SI1's Project", detailedDescription: "See how spring works and finish some design work.",
                             finished: false, priority: $scope.priorities.medium, category: $scope.categories.university, subtasks: []}, 
                            {description:"Clean the dishes", detailedDescription: "I better do it fast before my mom kills me.",
                            finished: true, priority: $scope.priorities.high, category: $scope.categories.home, subtasks: []}, 
                            {description:"Get tanned.", detailedDescription: "Need to be careful not to get burned.",
                            finished:false, priority: $scope.priorities.low, category: $scope.categories.other,subtasks: ["Buy a sunscreen"]}];

        $scope.lists = [{description: "Giuseppe's to do list", tasks: initialTasks},
                        {description: "Other to do list", tasks: []}];

        $scope.categoryStatus = {Home: true,
                                Work: true,
                                University: true,
                                Other: true}; 

        $scope.priorityStatus = {High: true,
                                Medium: true,
                                Low: true}; 

        $scope.activeMenu = $scope.menuItems.home;
        $scope.currentList = $scope.lists[0];
        $scope.progress = 0.00;

        $scope.selectCategory = function(category){
            $scope.categoryStatus[category] = true;
        };

        $scope.deselectCategory = function(category){
            $scope.categoryStatus[category] = false;
        };

        $scope.selectPriority = function(priority){
            $scope.priorityStatus[priority] = true;
        };

        $scope.deselectPriority = function(priority){
            $scope.priorityStatus[priority] = false;
        };

        function clearInput(){
            $scope.input.task.description = "";
            $scope.input.task.detailedDescription = "";
            $scope.input.task.category = "";
            $scope.input.task.otherCategory = "";
            $scope.input.task.priority = "";
            $scope.input.task.subtask = "";
        };

        function detectCategoryInput(){
            var category;
            if($scope.input.task.otherCategory=="" || !$scope.input.task.otherCategory){
                category = $scope.input.task.category;
            }
            else{
                category = $scope.input.task.otherCategory;
                $scope.categories[$scope.input.task.category] = category;
                $scope.categoryStatus[category] = true;
            }
            return category;
        }

        $scope.addNewTask = function(){
            var description = $scope.input.task.description;
            var detailedDescription = $scope.input.task.detailedDescription;
            var priority = $scope.input.task.priority;
            var category = detectCategoryInput();
            if (description && priority && category){
                if(containsTask(description))
                    $window.alert("A task with this description already exists.");
                else{
                    $scope.currentList.tasks.push({description: description, detailedDescription: detailedDescription,
                        finished: false, priority: priority, category: category, subtasks: []});
                    clearInput();
                }
            }
            else{
                $window.alert("Please write a description, select a priority and a category!");
            }
        };

        $scope.addNewSubtask = function(task){
            $scope.addingSubtask = false;
            if($scope.input.task.subtask){
                task.subtasks.push($scope.input.task.subtask);
                clearInput();  
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

        $scope.sortByDescription = function(){
            $scope.currentList.tasks.sort(function(task, taskToBeCompared){
                return task.description.toLowerCase() > taskToBeCompared.description.toLowerCase();
            });
        };

        $scope.sortByPriority = function(){
            $scope.currentList.tasks.sort(function(task, taskToBeCompared){
                var order = {High: 3, Medium:2, Low:1};
                return order[task.priority] < order[taskToBeCompared.priority];
            });
        };

        $scope.$watch('[currentList.tasks, categoryStatus, priorityStatus]',function(){
            var totalTasks = 0;
            var totalTasksCompleted = 0;
            
            $scope.currentList.tasks.forEach(function (task) {
                if($scope.categoryStatus[task.category] && $scope.priorityStatus[task.priority]){
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
