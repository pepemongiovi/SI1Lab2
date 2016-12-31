var toDoList = angular.module('toDoList')
    .controller("toDoListCtrl", ['$scope','$window', function($scope, $window){
        $scope.tasks = [{description:"Finish SI1's Project", finished: false}, 
                        {description:"Conquer the world", finished: false}, 
                        {description:"Grow a full beard",finished:false}];
        $scope.progress = 0.00;

        $scope.addNewTask = function(){
            var description = $scope.input;
            if (description && !containsTask(description)){
                $scope.tasks.push({description: description, finished: false});
            }
            else{
                $window.alert("The task description must not already exist or be empty. Please try again!")
            }
        };

        function containsTask(description){
            var contains = false;
            $scope.tasks.forEach(function(task) {
                if (task.description==description){
                    contains = true;
                }
            });
            return contains;
        };

        $scope.removeTask = function (taskToBeRemoved) {
            var counter = 0
            $scope.tasks.forEach(function(task) {
                if (task.description==taskToBeRemoved.description){
                    $scope.tasks.splice(counter,1);
                }
                counter +=1
            });
        };

        $scope.clearTasks = function(){
            $scope.tasks = [];
        };

        $scope.$watch('tasks',function(){
            var totalTasks = $scope.tasks.length;
            var totalTasksCompleted = 0;
            $scope.tasks.forEach(function (task) {
                if(task.finished){
                    totalTasksCompleted+=1
                }
            });
            if (totalTasks==0){
                $scope.progress = parseFloat(Math.round(0  * 100) / 100).toFixed(2);
            }else{
                $scope.progress = parseFloat(Math.round(((totalTasksCompleted/totalTasks)*100) * 100) / 100).toFixed(2);
            }
        }, true);
    }]);
