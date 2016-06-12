var app = angular.module('app', ['ui.router']);

app.run(function($rootScope) {
    var loggedInUser = localStorage.getItem('loggedInUser');
    if(loggedInUser){
        loggedInUser = JSON.parse(loggedInUser);
        $rootScope.loggedIn = true;
        $rootScope.userRole = loggedInUser.role;
        console.log("loggedInUser: "+loggedInUser);
    }
});

angular.element(document).ready(function () {
    if (location.hash === '') {
        location.hash = '/';
    }
});

app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'parts/view-home.html'
    });
    $stateProvider.state('contact', {
        url: '/contact',
        templateUrl: 'parts/view-contact.html'
    });
    $stateProvider.state('signin', {
        url: '/signin',
        templateUrl: 'parts/view-signin.html',
        controller:'signinController'
    });
    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'parts/view-register.html',
        controller:'registerController'
    });

    $stateProvider.state('account', {
        url: '/account',
        templateUrl: 'parts/view-account.html'
    });
    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'parts/view-checkout.html'
    });

    $stateProvider.state('product', {
        //abstract: true,
        url: '/{path:nam|nu|phukien}',// nam nu phu kien
        templateUrl: 'parts/view-product.html'
    });

    $stateProvider.state('product.list', {
        url: '/:categoryId',
        templateUrl: 'parts/view-product/product-list.html',
        resolve: {
            /*
             }
             productsInCategory: function($stateParams){
             alert($stateParams.categoryId);
             
             return $stateParams.categoryId;
             }
             */
        },
        controller: function ($scope, $http, $stateParams) {

            $http.get('/categories/' + $stateParams.categoryId).then(function (response) {
                $scope.productList = response.data;
                $scope.categoryId = $stateParams.categoryId;
                $scope.addToCart = function (productId) {
                    alert(productId);
                };
                // alert($scope.productList);
            });
        }


    });

    $stateProvider.state('product.detail', {
        url: '/:categoryId/:productId',
        templateUrl: 'parts/view-product/product-detail.html',
        controller: 'detailController'
    });
});
