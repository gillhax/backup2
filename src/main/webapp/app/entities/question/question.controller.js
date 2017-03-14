(function () {
    'use strict';

    angular
        .module('quizApp')
        .controller('QuestionController', QuestionController);

    QuestionController.$inject = ['$scope', '$state', 'Question', 'ParseLinks', 'AlertService', 'paginationConstants', 'pagingParams', 'categories', 'subcategories'];

    function QuestionController($scope, $state, Question, ParseLinks, AlertService, paginationConstants, pagingParams, categories, subcategories) {
        var vm = this;

        vm.loadPage = loadPage;
        vm.loadAllWithSearch = loadAllWithSearch;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.categories = categories;
        vm.subcategories = subcategories;

        if (pagingParams.title) vm.title = pagingParams.title;

        if (pagingParams.currentCat) {
            vm.currentCat = categories[pagingParams.currentCat];
        }
        else {
            vm.currentCat = null;
        }

        if (pagingParams.currentSubcat) {
            vm.currentSubcat = subcategories[pagingParams.currentSubcat];
        }

        loadAllWithSearch();


        function loadAllWithSearch() {
            Question.query({
                page: pagingParams.page - 1,
                size: vm.itemsPerPage,
                sort: sort(),
                title: vm.title,
                category: (vm.currentCat !== undefined && vm.currentCat !== null) ? vm.currentCat.id : null,
                subcategory: (vm.currentSubcat !== undefined && vm.currentSubcat !== null) ? vm.currentSubcat.id : null
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }

            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.questions = data;
                vm.page = pagingParams.page;
            }

            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadPage(page) {
            vm.page = page;
            vm.transition();
        }

        function arrayObjectIndexOf(myArray, searchTerm, property) {
            for (var i = 0, len = myArray.length; i < len; i++) {
                if (myArray[i][property] === searchTerm) return i;
            }
            return undefined;
        }

        function transition() {
            var cat = (vm.currentCat !== undefined && vm.currentCat !== null) ? arrayObjectIndexOf(categories, vm.currentCat.id, "id") : null;
            var subcat = (vm.currentSubcat !== undefined && vm.currentSubcat !== null) ? arrayObjectIndexOf(subcategories, vm.currentSubcat.id, "id") : null;
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                title: vm.title,
                currentCat: cat,
                currentSubcat: subcat
            });
        }
    }
})();
