(function() {
    'use strict';

    angular
        .module('quizApp')
        .controller('HelpDialogController', HelpDialogController);

    HelpDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Help', 'AlertService'];

    function HelpDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, Help, AlertService) {
        var vm = this;
        vm.help = entity;
        vm.clear = clear;
        vm.save = save;
        vm.tempFile = null;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            if (!vm.tempFile && !vm.help.image) {
                AlertService.error("Картинка не выбрана");
                return;
            }
            vm.isSaving = true;
            if (vm.tempFile) {
                vm.help.file = vm.tempFile.replace(/^data:image\/[a-z]+;base64,/, "");
            }
            if (vm.help.id !== null) {
                Help.update(vm.help, onSaveSuccess, onSaveError);
            } else {
                Help.save(vm.help, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('quizApp:helpUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
