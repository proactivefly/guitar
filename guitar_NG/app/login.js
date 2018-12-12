$(function(){
    $(".header_box").load("header.html",function(){
        main();
    });
    $(".footer").load("footer.html");

    $("#uname").blur(unameCheck);
    $("#pwd").blur(pwdCheck);

    $("#login").click(function(){
        if(unameCheck()&&pwdCheck()){
            var uname=$.trim($("#uname").val());
            var pwd=$.trim($("#pwd").val());
            $.ajax({
                type:"post",
                url:"data/user_login.php",
                data:{unameOrPhone:uname,upwd:pwd},
                success:function(d){
                    //console.log(d);
                    if(d.code!=1){
                        $("#uname_prompt_text").show().text("用户名或密码不正确");
                    }else{
                        sessionStorage.uid= d.uid;
                        sessionStorage.uname= d.uname;
                        history.go(-1);
                    }
                }
            });
        }
    });
})

function unameCheck(){
    var uname= $.trim($("#uname").val());
    if(!uname){//用户名为空的时候
        $("#uname_prompt_text").show().text("用户名不能为空");
        $("#uname_prompt_icon").show();
        return false;
    }else{
        $("#uname_prompt_text").hide();
        $("#uname_prompt_icon").hide();
        return true;
    }
}
function pwdCheck(){
    var pwd= $.trim($("#pwd").val());
    if(!pwd){//密码为空的时候
        $("#pwd_prompt_text").show().text("用户名不能为空");
        $("#pwd_prompt_icon").show();
        return false;
    }else{
        $("#pwd_prompt_text").hide();
        $("#pwd_prompt_icon").hide();
        return true;
    }
}
