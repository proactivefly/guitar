$(function(){
    $(".header_box").load("header.html",function(){
        main();
    });
    $(".footer").load("footer.html");

    $("#uname").blur(emailCheck);
    $("#upwd").blur(pwdCheck);
    $("#upwd2").blur(pwdCheck2);
    $("#phone").blur(phoneCheck);
    $(".li_checkbox input").click(function(){
        $(".li_btn>button").prop("disabled",!$(this).prop("checked")).toggleClass("disabled");
    });

    $(".li_btn>button").click(function(){
        var remail=emailCheck();
        var rpwd=pwdCheck();
        var rpwd2=pwdCheck2();
        var rphone=phoneCheck();
        if(remail&&rpwd&&rpwd2&&rphone){
            var json={};
            $("#uname,#upwd,#phone").each(function(){
                json[$(this).attr("id")]=$(this).val();
            });
            $.ajax({
                type:"post",
                url:"data/user_register.php",
                data:json,
                success:function(d){
                    //console.log(d)
                    if(d.code==1){
                        sessionStorage.uid= d.uid;
                        sessionStorage.uname= d.uname;
                        alert("恭喜您，注册成功！即将为您跳转到刚才的页面。");
                        history.go(-1);
                    }
                }
            });
        }
    });
});
//验证邮箱
function emailCheck(){
    var uname= $.trim($("#uname").val());
    var regEmail= /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(!uname){//邮箱为空时
        $("#uname").siblings("em").show().attr("class","icon_error");
        $("#uname").siblings("i").show().text("请输入您的注册邮箱");
        return false;
    }else if(!regEmail.test(uname)){
        $("#uname").siblings("em").show().attr("class","icon_error");
        $("#uname").siblings("i").show().text("请输入正确的邮箱格式");
        return false;
    }else if(emailExist(uname)){
        $("#uname").siblings("em").show().attr("class","icon_error");
        $("#uname").siblings("i").show().text("此邮箱已被其他用户注册");
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
            if(d.code==1){//用户名已经存在
                back=true;
            }else{
                back=false;
            }
        }
    });
    return back;
}
//验证密码
function pwdCheck(){
    var pwdSize= $.trim($("#upwd").val()).length;
    if(!pwdSize){//邮箱为空时
        $("#upwd").siblings("em").show().attr("class","icon_error");
        $("#upwd").siblings("i").show().text("请输入您的密码");
        return false;
    }else if(pwdSize<6||pwdSize>12){
        $("#upwd").siblings("em").show().attr("class","icon_error");
        $("#upwd").siblings("i").show().text("密码长度应为6~12个字符之间");
        return false;
    }else{
        $("#upwd").siblings("em").show().attr("class","icon_ok");
        $("#upwd").siblings("i").hide();
        return true;
    }
}
//验证重复密码
function pwdCheck2(){
    var pwd= $.trim($("#upwd").val());
    var pwd2= $.trim($("#upwd2").val());
    if(pwdCheck()){
        if(pwd!=pwd2){
            $("#upwd2").siblings("em").show().attr("class","icon_error");
            $("#upwd2").siblings("i").show().text("两次输入的密码不一致");
            return false;
        }else{
            $("#upwd2").siblings("em").show().attr("class","icon_ok");
            $("#upwd2").siblings("i").hide();
            return true;
        }
    }
}
//验证手机号
function phoneCheck(){
    var phone= $.trim($("#phone").val());
    var regPhone= /^(13[0-9]|15[0-9]|18[0-9]])\d{8}$/;
    if(!phone){
        $("#phone").siblings("em").show().attr("class","icon_error");
        $("#phone").siblings("i").show().text("请填写您的手机号");
        return false;
    }else if(!regPhone.test(phone)){
        $("#phone").siblings("em").show().attr("class","icon_error");
        $("#phone").siblings("i").show().text("请输入正确的手机号码");
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
            if(d.code==1){//用户名已经存在
                back=true;
            }else{
                back=false;
            }
        }
    });
    return back;
}