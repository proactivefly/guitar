/**
 * Created by Administrator on 2016/11/28.
 */
angular.module('refreshApp',['ionic','ngAnimate'])
    .config(function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
        $ionicConfigProvider.tabs.position("bottom");

        $stateProvider
            .state('start', {
                url: '/start',
                templateUrl: 'tpl/start.html',
                controller:'startCtrl'
            })
            .state('index', {
                url: '/index',
                templateUrl: 'tpl/index.html',
                controller:'indexCtrl'
            })
            .state('user', {
                url:'/user',
                templateUrl: 'tpl/user.html',
                controller:'userCtrl'
            })
            .state('cart', {
                url:'/cart',
                templateUrl: 'tpl/cart.html'

            })
            .state('about', {
                url:'/about',
                templateUrl: 'tpl/about.html'

            })
            .state('list', {
                url:'/list/:typeNum',
                templateUrl: 'tpl/list.html',
                controller:'listCtrl'
            })
            .state('detail', {
                url:'/detail',
                templateUrl: 'tpl/detail.html'


            });
        $urlRouterProvider.otherwise('start');
    })
    .controller('parentCtrl',
    ['$scope','$state','$ionicSideMenuDelegate','$ionicSlideBoxDelegate','$ionicModal',
        function ($scope,$state,$ionicSideMenuDelegate,$ionicSlideBoxDelegate,$ionicModal) {
            //跳转方法
            $scope.jump = function (arg) {
                $state.go(arg);
            }
            //页面轮播的单击切换
            $scope.pageClick = function(index) {
                console.log(index);
                $ionicSlideBoxDelegate.slide(index);
            }
            //弹出搜索框
            $ionicModal.fromTemplateUrl('modal.html', {
                scope: $scope,
                animation: 'slide-in-right'
            }).then(function(modal) {
                $scope.modal = modal;
            });
            $scope.search = function() {
                $scope.modal.show();
            };

        }
    ])
    .controller('startCtrl',['$scope','$timeout','$interval','$state',
        function($scope,$timeout,$interval,$state){
            $scope.secondNumber = 5;
            $timeout(function(){
                $state.go('index');
            },5000);
            $interval(function(){
                if($scope.secondNumber>0)
                    $scope.secondNumber--;
            },1000);
            console.log(111);
        }])
    .controller('indexCtrl',['$scope','$http','$timeout',
        function($scope,$http,$timeout){
            $scope.hasMore = true;
            $scope.pageNum = 1;
            //获取初始的新闻数据
            $http.get('data/news_select.php?pageNum='+$scope.pageNum)
                .success(function (newsData) {
                    $scope.newsList = newsData.data;
                    $scope.pageNum++;
                });
            //加载更多
            $scope.loadMore = function () {
                $timeout(function () {//并非马上加载，而是2s后再加载
                    console.log($scope.pageNum);
                    console.log($scope.hasMore);
                    $http.get('data/news_select.php?pageNum='+$scope.pageNum)
                        .success(function (newsData) {
                            if(newsData.data.length <7)
                            {
                                $scope.hasMore = false;
                            }
                            $scope.newsList = $scope.newsList.concat(newsData.data);
                            $scope.pageNum++;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        })
                },2000);
            };

            //搜索
            $scope.inputTxt = {kw:''};
            $scope.$watch('inputTxt.kw', function () {
                console.log($scope.inputTxt.kw);
                if($scope.inputTxt.kw)
                {
                    $http
                        .get('data/product_search.php?kw='+$scope.inputTxt.kw)
                        .success(function (result) {
                            $scope.searchList = result.data;
                        })
                }

            })

        }
    ])
    .controller('listCtrl',['$scope','$http','$stateParams','$timeout',
        function($scope,$http,$stateParams,$timeout){
            $scope.hasMore = true;
            $scope.pageNum = 1;
            $http.get('data/product_select.php?pageNum=' + $scope.pageNum + '&type=' + $stateParams.typeNum)
                .success(function(result){
                    $scope.productData  = result.data;
                });

            //加载更多
            $scope.loadMore = function () {
                $timeout(function () {
                    $http.get('data/product_select.php?pageNum='+$scope.pageNum + '&type' + $stateParams.typeNum)
                        .success(function (newsData) {
                            if(newsData.data.length <3)
                            {
                                $scope.hasMore = false;
                            }
                            $scope.productData = $scope.productData.concat(newsData.data);
                            $scope.pageNum++;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        })
                },2000);
            };
        }])
    .controller('userCtrl',['$scope',
        function($scope){
            $scope.data='456';
        }
    ])
