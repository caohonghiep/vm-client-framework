/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var menuController = app.controller('menuController', function ($rootScope, $scope, $http) {
    $scope.menuData = [];
    $http.get('/categories').then(function (response) {
        $scope.menuData = response.data;
        $scope.menuData.init = function () {
            for (var i in this) {
                if (typeof this[i] === 'object') {
                    this[i].init = this.init;
                    this[i].init();
                    this[i].parent = this;
                    this[i].init = undefined;
                }
            }
        };
        $scope.menuData.init();
    });
});
var signinController= app.controller('signinController',function($rootScope, $scope, $http){
    //khoi tao
    $scope.email='';
    $scope.password='';
    //thuc thi actions
    $scope.submitLogin=function(){
        //kiem tra
        if(!$scope.email.trim()){//if(email==null || email = undefined || email=='')
            alert('email khong duoc bo trong');
            exit(); 
        }
        if(!$scope.password.trim()){
            alert('Password khong duoc bo trong');
            exit(); 
        }
                
        //chinh sua du lieu
        var data={};
        data.email=$scope.email;
        data.password=$scope.password;
        
        // gui du lieu
        var http = $http.post('/login',data);
        http.success(function(data){
            if(data.ok){
                $rootScope.loggedIn=true;
                $rootScope.userRole=data.role;
                localStorage.setItem('loggedInUser',JSON.stringify(data));
                alert('Đăng nhập thành công');
                location.hash="/";
            }else {
                 alert('Email hay Password khong dung.');
            }
        });
    };
    
    $scope.validateEmail = function (value)
    {
        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
        if (value.match(mailFormat))
        {
            return true;
        } else {
            return false;
        }
    };
    
    $scope.forgotPassword = function(){
        var email = prompt("Email của Bạn:","honghiepcao@gmail.com");
        if(!$scope.validateEmail(email)){
            alert("Email không hợp lệ");
        }else{
            var data = {email:email};
            
            var httpPost = $http.post('/forgotPassword',data) ;
            
            httpPost.success(function(data){
                if(data.ok){
                    alert("Mat khau moi da duoc gui toi email cua ban");
                }else{
                    alert("email chua duoc dang ky");
                }
            });            
            
            httpPost.error(function (data) {
                   
            });
        }
        
        
    };
});



var detailController = app.controller('detailController', function ($scope, $http, $stateParams) {
    $scope.detail = '';
    $http.get('/products/' + $stateParams.productId).then(function (response) {
        $scope.detail = response.data;
    });
    $scope.effectSlider = function () {
        //------------------
        //Image Zoom
        jQuery('.popup-with-zoom-anim').magnificPopup({
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in'
        });
        //--------------------
        jQuery('.flexslider').flexslider({
            animation: "slide",
            controlNav: "thumbnails"
        });
        //---------------
    }
});


var registerController = app.controller('registerController', function ($scope, $http)
{
    //khoi tao
    $scope.user = {};
    $scope.validatePhoneNumber = function (value)
    {
        var phoneNoFormat = /^\d{10,11}$/;
        if (value.match(phoneNoFormat))
        {
            return true;
        } else
        {
            return false;
        }
    };
    $scope.validateEmail = function (value)
    {
        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
        if (value.match(mailFormat))
        {
            return true;
        } else {
            return false;
        }
    };

    $scope.submitUserData = function () {
        //kiem tra data 
        if (!$scope.user.username) {
            alert("UserName khong duoc de trong");
            return;
        }
        if (!$scope.user.fullname) {
            alert("FullName khong duoc de trong");
            return;
        }
        if (!$scope.user.address) {
            alert("Address khong duoc de trong");
            return;
        }
        if (!$scope.user.password) {
            alert("PassWord khong duoc de trong");
            return;
        }
        if ($scope.user.password1 !== $scope.user.password) {
            alert("PassWord khong giong nhau");
            return;
        }
        if (!$scope.validatePhoneNumber($scope.user.phone)) {
            alert("So dien thoai khong dung")
            return;
        }
        if (!$scope.validateEmail($scope.user.email)) {
            alert("Email khong hop le");
            return;
        }
        
        //chinh sua data
        $scope.user.password1 = undefined;
        //gui di
        $http.post('/users', $scope.user).
                success(function (data) {
                    if (data.ok){
                        alert('dang ky thanh cong.');
                        location.hash="/";
                    }else {
                        if ("email" === data.error) {
                            alert('Email da duoc dang ky, vui long cho Email khac.');
                        } else if ('username' === data.error) {
                            alert('Username da duoc dang ky, vui long cho Username khac.');
                        } else {
                            console.log('dang ky khong thanh cong');
                        }
                    }
                }).
                error(function (data) {
                   alert('dang ky khong thanh cong');
                });


    };
});