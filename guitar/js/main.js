$(function(){
  //加载页面底部
  $(".footer").load("footer.html");
});
//当点击某个二级页的时候，所在导航项高亮显示
function navText(text){
  $(".nav ul li").each(function(){
    var thisText=$(this).children("a").text();
    if(text==thisText){
      $(this).addClass("cur");
    }
  });
}

function main(){
  //购物车下拉菜单
  $(".s_cart").mouseover(function(){
    $(".cart_dropdown").stop().slideDown(100);
  });
  $(".s_cart").mouseout(function(){
    $(".cart_dropdown").stop().slideUp(100);
  });

  //判断用户是否登录
  if(sessionStorage.uid){//如果存在
    var text='<li class="top_user"><a href="">'+sessionStorage.uname+'</a></li><li class="top_quit"><a href="">退出</a></li>';
    $(".h_con>ul").append(text);
    $(".top_quit").click(function(){
      sessionStorage.clear();
    });
    h_cartList();//显示购物车数据
  }else{//如果不存在
    var text='<li><a href="login.html" class="h_login">登录</a></li><li><em>|</em></li><li><a href="register.html" class="h_register">注册</a></li>';
    $(".h_con>ul").append(text);
  }


}
//时间转换函数
function dateFormat(time,sign){
  var t=new Date(time);
  //如果月份和日期是0~9，前面补“0”
  var tf=function(i){return i>9?i:"0"+i};
  var year= t.getFullYear();
  var month= tf(t.getMonth()+1);
  var day= tf(t.getDate());
  return year+sign+month+sign+day;
}

//购物车下拉菜单列表更新
function h_cartList(){
  $.ajax({
    type:"post",
    url:"data/cart_detail_select.php",
    data:{uid:sessionStorage.uid},
    success:function(d){
      if(d.products.length==0){
        $(".cart_dropdown").html('<h3>您的购物车为空~</h3>');
      }else{
        var data= d.products;
        var htmlText='<ul>';
        var count=0;//商品总件数
        var priceSum=0.00;//商品总金额
        for(var i=0;i<data.length;i++){
          var priceS=data[i].price*data[i].count;
          htmlText+='<li data-did="'
          +data[i].did
          +'" data-pid="'
          +data[i].pid
          +'"><a href=""><img src="'
          +data[i].pic
          +'" alt=""/></a><div><span>-</span><input type="text" value="'
          +data[i].count
          +'"/><span>+</span></div><strong>¥'
          +priceS.toFixed(2)
          +'</strong><em class="remove"></em></li>';
          count+=parseInt(data[i].count);
          priceSum+=priceS;
        }
        htmlText+='</ul>';
        $(".cart_dropdown").html(htmlText);
        var htmlJs='<div class="cd_js clearfloat"><span>共计：<strong>'+priceSum.toFixed(2)+'</strong></span><a href="cart.html">结算</a></div>';
        $(".cart_dropdown").append(htmlJs);
        $("#cart_sum").text(count);
      }
    }
  });
}






