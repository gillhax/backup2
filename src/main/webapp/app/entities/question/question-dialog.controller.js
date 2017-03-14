(function () {
    'use strict';

    angular
        .module('quizApp')
        .controller('QuestionDialogController', QuestionDialogController);

    QuestionDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Question', 'Category', 'Subcategory', 'AlertService'];

    function QuestionDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, Question, Category, Subcategory, AlertService) {
        var vm = this;
        var checkedImg = false;

        vm.question = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.categories = Category.query();
        vm.subcategories = Subcategory.query();
        vm.currentCat = null;
        vm.checkedImg = checkedImg;
        vm.tempFile = null;

        if (vm.question.rightAnswer === null) vm.question.rightAnswer = 1;

        if (vm.question.subcategory) {
            vm.currentCat = vm.question.subcategory.category;
        }

        if (vm.question.media && vm.question.media.media) {
            vm.checkedImg = true;
        }


        $timeout(function () {
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear() {
            $uibModalInstance.dismiss('cancel');
        }

        function save() {
            vm.question.removeMedia = false;
            if (vm.checkedImg) {
                if (!vm.tempFile && !vm.question.media) {
                    AlertService.error("Картинка не выбрана");
                    return;
                }
                if (vm.tempFile) {
                    vm.question.file = vm.tempFile.replace(/^data:image\/[a-z]+;base64,/, "");
                }
            }
            vm.isSaving = true;
            if (vm.question.id !== null) {
                if (!vm.checkedImg && vm.question.media && vm.question.media.media) {
                    vm.question.removeMedia = true;
                }
                Question.update(vm.question, onSaveSuccess, onSaveError);
            } else {
                Question.save(vm.question, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess(result) {
            $scope.$emit('quizApp:questionUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError() {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.version = false;

        function openCalendar(date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
