(function() {
    'use strict';

    angular
        .module('quizApp')
        .controller('AvatarDialogController', AvatarDialogController);

    AvatarDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Avatar', 'AlertService'];

    function AvatarDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, Avatar, AlertService) {
        var vm = this;

        vm.avatar = entity;
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
            if (!vm.tempFile && !vm.avatar.path) {
                AlertService.error("Картинка не выбрана");
                return;
            }
            vm.isSaving = true;
            if (vm.tempFile) {
                vm.avatar.file = vm.tempFile.replace(/^data:image\/[a-z]+;base64,/, "");
            }
            if (vm.avatar.id !== null) {
                Avatar.update(vm.avatar, onSaveSuccess, onSaveError);
            } else {
                Avatar.save(vm.avatar, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('quizApp:avatarUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
