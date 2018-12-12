$(function(){
  //加载页面头部
  $(".header_box").load('header.html',function(){
    main();
    navText("首页");
  });
  carousel();
});


function carousel(){
  var timer=0;
  var cur=0;//当前显示的图片下标
  var number=$(".banner ul li").size()-1;//最大下标
  //下一个
  function slideNext(){
    if(cur<number){
      $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
      $(".banner ul li").eq(cur+1).css({'z-index':20}).stop().fadeIn();
      $(".indicator a").removeClass().eq(cur+1).addClass("cur");
      cur++;
    }else{
      $(".banner ul li").eq(number).css({'z-index':10}).stop().fadeOut();
      $(".banner ul li").eq(0).css({'z-index':20}).stop().fadeIn();
      $(".indicator a").removeClass().eq(0).addClass("cur");
      cur=0;
    }
  }
  //上一个
  function slidePrev(){
    if(cur>0){
      $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
      $(".banner ul li").eq(cur-1).css({'z-index':20}).stop().fadeIn();
      $(".indicator a").removeClass().eq(cur-1).addClass("cur");
      cur--;
    }else{
      $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
      $(".banner ul li").eq(number).css({'z-index':20}).stop().fadeIn();
      $(".indicator a").removeClass().eq(number).addClass("cur");
      cur=number;
    }
  }
  //绑定定时器
  timer=setInterval(slideNext,2000);
  //当鼠标移入banner区域时，停止自动运行
  $(".banner").mouseover(function(){
    clearInterval(timer);
  });
  $(".banner").mouseout(function(){
    timer=setInterval(slideNext,2000);
  });
  //左右箭头
  $(".banner .next").click(function(){
    slideNext();
  });
  $(".banner .prev").click(function(){
    slidePrev();
  });
  //小圆点指示器
  $(".indicator a").mouseover(function(){
    var now=$(this).index();//获得鼠标移入的小圆点的下标
    $(".indicator a").removeClass();
    $(this).addClass("cur");
    $(".banner ul li").eq(cur).css({'z-index':10}).stop().fadeOut();
    $(".banner ul li").eq(now).css({'z-index':20}).stop().fadeIn();
    cur=now;
  });
}
//优化：
//1、把jquery的DOM元素放到变量中
//2、上一个、下一个函数整合
//3、小圆点指示器的判断
//4、将图片轮播效果整合到对象中
//5、其他