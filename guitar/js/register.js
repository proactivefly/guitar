$(function(){
  //加载页面头部
  $(".header_box").load('header.html',function(){
    main();
  });


  $("#uname").blur(emailCheck);
  $("#upwd").blur(pwdCheck);
  $("#upwd2").blur(pwd2Check);
  $("#phone").blur(phoneCheck);

  //当用户点击复选框的时候，改变按钮的可用性
  $(".li_checkbox input").click(function(){
      console.log($(this).is(":checked"));
      console.log($(this).prop("checked"));
      //if($(this).is("checked")){
      //  $(".li_btn button").removeAttr("disabled");
      //}else{
      //  $(".li_btn button").attr("disabled","disabled");
      //}
      //等同于
    //if($(this).prop("checked")){
    //  $(".li_btn button").prop("disabled",false);
    //  $(".li_btn button").removeClass("class","disabled");
    //}else{
    //  $(".li_btn button").prop("disabled",true);
    //  $(".li_btn button").attr("class","disabled");
    //}
    $(".li_btn button").prop("disabled",!$(this).prop("checked")).toggleClass("disabled");
  });


  //当点击提交注册按钮的时候
  $(".li_btn button").click(function(){
    var remail=emailCheck();
    var rpwd=pwdCheck();
    var rpwd2=pwd2Check();
    var rphpne=phoneCheck();
    if(remail&&rpwd&&rpwd2&&rphpne){
      //var uname= $.trim($("#uname").val());
      //var upwd= $.trim($("#upwd").val());
      //var phone= $.trim($("#phone").val());
      //var json={
      //  uname:uname,
      //  upwd:upwd,
      //  phone:phone
      //};
      var json={};
      $("#uname,#upwd,#phone").each(function(){
        json[$(this).attr("id")]=$(this).val();
      });
      $.ajax({
        type:"post",
        url:"data/user_register.php",
        data:json,
        success:function(d){
          if(d.code==1){//注册成功
            sessionStorage.uid= d.uid;
            sessionStorage.uname= d.uname;
            alert("恭喜您！注册成功！即将为您跳转到刚才的页面");
            history.go(-1);
          }
        }
      });
    }
  });

  //邮箱验证函数
  function emailCheck(){
    var uname= $.trim($("#uname").val());
    var regEmail=/^\w+([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(!uname){//用户名为空
      $("#uname").siblings("em").show().attr("class","icon_error");
      $("#uname").siblings("i").show().text("邮箱不能为空");
      return false;
    }else if(!regEmail.test(uname)){//格式不正确时
      $("#uname").siblings("em").show().attr("class","icon_error");
      $("#uname").siblings("i").show().text("邮箱格式不正确");
      return false;
    }else if(emailExist(uname)){
      $("#uname").siblings("em").show().attr("class","icon_error");
      $("#uname").siblings("i").show().text("此邮箱已被注册");
      return false;
    }else{
      $("#uname").siblings("em").show().attr("class","icon_ok");
      $("#uname").siblings("i").hide();
      return true;
    }
  }

  //验证邮箱是否被注册
  function emailExist(uname){
    var back=false;
    $.ajax({
      type:"post",
      url:"data/user_check_uname.php",
      data:{uname:uname},
      async:false,
      success:function(d){
        if(d.code==1){
          back=true;
        }else{
          back=false;
        }
      }
    });
    return back;
  }
});

//密码验证
function pwdCheck(){
  var pwd= $.trim($("#upwd").val());
  var pwdSize=pwd.length;
  if(!pwd){//密码为空
    $("#upwd").siblings("em").show().attr("class","icon_error");
    $("#upwd").siblings("i").show().text("密码不能为空");
    return false;
  }else if(pwdSize<6||pwdSize>12){//长度不正确
    $("#upwd").siblings("em").show().attr("class","icon_error");
    $("#upwd").siblings("i").show().text("密码应为6~12个字符");
    return false;
  }else{
    $("#upwd").siblings("em").show().attr("class","icon_ok");
    $("#upwd").siblings("i").hide();
    return true;
  }
}

//重复密码验证
function pwd2Check(){
  var pwd1= $.trim($("#upwd").val());
  var pwd2= $.trim($("#upwd2").val());
  var pwd2Size=pwd2.length;
  if(!pwd2){//密码为空
    $("#upwd2").siblings("em").show().attr("class","icon_error");
    $("#upwd2").siblings("i").show().text("密码不能为空");
    return false;
  }else if(pwd2Size<6||pwd2Size>12){//长度不正确
    $("#upwd2").siblings("em").show().attr("class","icon_error");
    $("#upwd2").siblings("i").show().text("密码应为6~12个字符");
    return false;
  }else if(pwd1!=pwd2){//两次密码是否相同
    $("#upwd2").siblings("em").show().attr("class","icon_error");
    $("#upwd2").siblings("i").show().text("两次密码不一致");
    return false;
  }else{
    $("#upwd2").siblings("em").show().attr("class","icon_ok");
    $("#upwd2").siblings("i").hide();
    return true;
  }
}

//手机号验证函数
function phoneCheck(){
  var phone= $.trim($("#phone").val());
  var regPhone=/^(13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/;
  if(!phone){//用户名为空
    $("#phone").siblings("em").show().attr("class","icon_error");
    $("#phone").siblings("i").show().text("手机号不能为空");
    return false;
  }else if(!regPhone.test(phone)){//格式不正确时
    $("#phone").siblings("em").show().attr("class","icon_error");
    $("#phone").siblings("i").show().text("手机号格式不正确");
    return false;
  }else if(phoneExist(phone)){
    $("#phone").siblings("em").show().attr("class","icon_error");
    $("#phone").siblings("i").show().text("此手机号已被其他用户绑定");
    return false;
  }else{
    $("#phone").siblings("em").show().attr("class","icon_ok");
    $("#phone").siblings("i").hide();
    return true;
  }
}

//验证手机号是否被绑定
function phoneExist(phone){
  var back=false;
  $.ajax({
    type:"post",
    url:"data/user_check_phone.php",
    data:{phone:phone},
    async:false,
    success:function(d){
      if(d.code==1){
        back=true;
      }else{
        back=false;
      }
    }
  });
  return back;
}




