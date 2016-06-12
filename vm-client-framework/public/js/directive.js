app.directive("menuItem", function () {
    return {
        restrict: 'E',
        scope: {
            category: '='
        },
        template: '<a href="#/{{category.parent.parent._id}}/{{category._id}}">' +
                '        <img ng-src="{{category.imageUrl}}" class="img-responsive" alt=""/>' +
                '        <br/>{{category.name}}' +
                '</a>'
    };
});

app.directive('cardProduct', function () {
    return {
        restrict: 'E',
        scope: {
            product: '=',
            addToCart: '&addToCartAction'
        },
        templateUrl: 'parts/directiveTemplates/cardProduct.html'
    };
});

app.directive('myDialog', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            'close': '&onClose'
        },
        templateUrl: 'parts/directiveTemplates/my-dialog-close.html'
    };
});
app.directive('repeatDone', function ($timeout) {
    return function (scope, element, attrs) {
        if (scope.$last) { // all are rendered
            $timeout(function(){scope.$eval(attrs.repeatDone);}, 0);
        }
    };
});