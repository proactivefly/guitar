/**
 * Created by Administrator on 2016/12/1.
 */
angular.module('refreshAPP',['ng','ngRoute','ngAnimate'])
    .config(function($routeProvider) {
        $routeProvider
            .when('/main', {
                templateUrl: 'tpl/main.html',
                controller: 'mainCtrl'
            })
            .when('/list', {
                templateUrl: 'tpl/productlist.html',
                controller: 'listCtrl'
            })
            .when('/list/:pType', {
                templateUrl: 'tpl/productlist.html',
                controller: 'listCtrl'
            })
            .when('/detail/:did', {
                templateUrl: 'tpl/productdetail.html',
                controller: 'detailCtrl'
            })
            .when('/about', {
                templateUrl: 'tpl/about.html',
                controller: 'aboutCtrl'
            })
            .when('/news', {
                templateUrl: 'tpl/news.html',
                controller: 'newsCtrl'
            })
            .when('/contact', {
                templateUrl: 'tpl/contact.html',
                controller: 'contactCtrl'
            })
            .when('/login', {
                templateUrl: 'tpl/login.html',
                controller: 'loginCtrl'
            })
            .when('/cart', {
                templateUrl: 'tpl/cart.html',
                controller: 'cartCtrl'
            })
            .otherwise('main');
    })
    //定义公共方法，供各页面的控制器调用
    .controller('parentCtrl',['$scope','$http','$rootScope',
        function($scope,$http,$rootScope){
        //根据页数和类型获取产品数据
        $scope.getProductData = function(num,type){
            $http.get('data/product_select.php?type='+ type + '&pageNum=' + num).success(
                function(result){
                    $scope.productData = result;
                    $scope.pageArray = [];
                    for(var i=0;i<$scope.productData.pageCount;i++){
                        $scope.pageArray[i] = i+1;
                    }
                }
            );
        };

        //更新购物车的数量显示
        $scope.updateCart = function(){
            $scope.cartCount = 0;
            if($rootScope.uid) {
                $http.get('data/cart_detail_select.php?uid=' + $rootScope.uid)
                    .success(function (data) {
                        $scope.cart = data.products;
                        $scope.cartCount = data.products.length;
                        console.log($scope.cart);
                    });
            }
        };
    }])
    .controller('mainCtrl',['$scope','$http',function($scope,$http){
        //执行轮播
        $scope.imgList = ['images/banner_01.jpg','images/banner_02.jpg',
                          'images/banner_03.jpg','images/banner_04.jpg' ];
        $('.carousel').carousel();

        //获取新闻数据
        $http.get('data/news_select.php').success(function(result){
            $scope.newsList = result.data;
        });

        //更新购物车
        $scope.$parent.updateCart();
    }])
    .controller('listCtrl',['$scope','$routeParams',
        function($scope,$routeParams){
            $scope.$parent.getProductData(1,$routeParams.pType);
    }])
    .controller('detailCtrl',['$scope','$http','$routeParams','$rootScope','$location',
        function($scope,$http,$routeParams,$rootScope,$location){
            //获取产品详细数据
            $http.get('data/product_detail.php?pid=' + $routeParams.did).success(
                function(result){
                    $scope.product = result;
                }
            );

            //更新购物车数量
            $scope.$parent.updateCart();

            //添加到购物车
            $scope.addCart = function(){
                if(!$rootScope.uid){
                    $location.path('/login');
                }else{
                    $http.get('data/cart_detail_add.php?uid=' +
                    $rootScope.uid + '&pid=' + $routeParams.did).success(
                        function (result) {
                            if(result.code==1){
                                alert("添加成功！");
                                $scope.$parent.updateCart();
                            }
                        }
                    );
                }
            };
    }])
    .controller('loginCtrl',['$scope','$http','$rootScope','$location',
        function($scope,$http,$rootScope,$location){
            $scope.login = function() {
                $http.get('data/user_login.php?unameOrPhone=' +
                $scope.userName + '&upwd=' + $scope.pwd).success(
                    function (result) {
                        if(result.code!=1){
                            $scope.error = "用户名或密码不正确";
                        }else{
                            $rootScope.uid= result.uid;
                            $rootScope.uname= result.uname;
                            console.log($rootScope.uid);
                            history.go(-1);
                        }
                    }
                );
            }
        }])
    .controller('cartCtrl',['$scope','$http','$rootScope','$location',
        function($scope,$http,$rootScope,$location){
            //如果已经登录，则显示数据
            if(!$rootScope.uid){
                $location.path('/login');
            }
            else {
                $scope.$parent.updateCart();
                $scope.totalPrice = 0;
                $scope.selectedCount = 0;
            }

            //计算选中的数量和总计
            $scope.getSum = function(isSelect,index){
                console.log(isSelect);
                $scope.totalPrice=0;
                if(isSelect){
                    $scope.cart[index].isSelected = true;
                    $scope.selectedCount++;
                }
                else{
                    $scope.cart[index].isSelected = false;
                    $scope.selectedCount--;
                }

                for(var i=0;i<$scope.cart.length;i++){
                    if($scope.cart[i].isSelected) {
                        $scope.totalPrice += $scope.cart[i].price * $scope.cart[i].count;
                    }
                }
            };
        }])
    //自定义指令显示 html
    .directive('stringHtml' , function(){
        return function(scope , el , attr){
            if(attr.stringHtml){
                scope.$watch(attr.stringHtml , function(html){
                    el.html(html || '');//更新html内容
                });
            }
        };
    });





