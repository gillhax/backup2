(function() {
    'use strict';

    var jhiItemCount = {
        template: '<div class="info">' +
        'Отображены {{(($ctrl.page - 1) * $ctrl.itemsPerPage) == 0 ? 1 : (($ctrl.page - 1) * $ctrl.itemsPerPage + 1)}} - ' +
                    '{{($ctrl.page * $ctrl.itemsPerPage) < $ctrl.queryCount ? ($ctrl.page * $ctrl.itemsPerPage) : $ctrl.queryCount}} ' +
        'из {{$ctrl.queryCount}} элементов.' +
                '</div>',
        bindings: {
            page: '<',
            queryCount: '<total',
            itemsPerPage: '<'
        }
    };

    angular
        .module('quizApp')
        .component('jhiItemCount', jhiItemCount);
})();
