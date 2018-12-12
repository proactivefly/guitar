$(function(){
  //加载页面头部
  $(".header_box").load('header.html',function(){
    main();
  });


  $("#uname").blur(unameCheck);
  $("#upwd").blur(upwdCheck);

  //点击登录按钮的时候
  $("#login").click(function(){
    if(unameCheck()&&upwdCheck()){
      var uname= $.trim($("#uname").val());
      var upwd= $.trim($("#upwd").val());
      $.ajax({
        type:"post",
        url:"data/user_login.php",
        data:{unameOrPhone:uname,upwd:upwd},
        success:function(d){
          //console.log(d);
          if(d.code==1){//表示登录成功
            sessionStorage.uid= d.uid;
            sessionStorage.uname= d.uname;
            history.go(-1);//跳转到登录前页面
          }else{//用户名或密码不正确
            $("#uname_prompt_text").show().text("用户名或密码不正确");
          }
        }
      });
    }
  });

});

function unameCheck(){
  var uname= $.trim($("#uname").val());
  if(!uname){//当用户名为空的时候
    $("#uname_prompt_text").show().text("用户名不能为空");
    $("#uname_prompt_icon").show();
    return false;
  }else{
    $("#uname_prompt_text").hide();
    $("#uname_prompt_icon").hide();
    return true;
  }
}
function upwdCheck(){
  var upwd= $.trim($("#upwd").val());
  if(!upwd){//当用户名为空的时候
    $("#upwd_prompt_text").show().text("密码不能为空");
    $("#upwd_prompt_icon").show();
    return false;
  }else{
    $("#upwd_prompt_text").hide();
    $("#upwd_prompt_icon").hide();
    return true;
  }
}


