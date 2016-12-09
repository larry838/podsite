$(document).ready(function() {
    $("body").css("background","#16a08");
    /*
    //背景粒子效果
    $('.main-container').particleground({
        dotColor : '#5cbdaa',
        lineColor : '#5cbdaa'
    });
    $('.main-content').css({
        'margin-top' : -($('.main-content').height())
    });
    */
    //刷新验证码
    $('#kaptchaImage').click(function() {//生成验证码
        $(this).hide().attr('src', 'captcha.html?' + new Date().getTime()).fadeIn();
    });

    //登录、注册、找回密码切换
    $(document).on('click', '.toolbar a[data-target]', function(e) {
        e.preventDefault();
        var target = $(this).data('target');
        //隐藏其他dom
        $('.widget-box.visible').removeClass('visible');
        //显示目标dom
        $(target).addClass('visible');
    });
    
    //注册回车键事件
    document.onkeypress = function(e){
    var ev = document.all ? window.event : e;
        if(ev.keyCode==13) {
            login();
        }
    };
    
});


//登录
function login() {
    if($("#accountName").val() == "")
    {
        layer.alert('请输入账户', {icon : 5,shift : 6,time : 0});
        $("#accountName").focus();
        return false;
    }
    if($("#password").val() == "")
    {
        layer.alert('请输入密码', {icon : 5,shift : 6,time : 0});
        $("#password").focus();
         return false;
    }
    if($("#captcha").val() == "")
    {
        $("#captcha").focus();
        layer.alert('请输入验证码', {icon : 5,shift : 6,time : 0});
         return false;
    }
    if($("#rememberMeCheckBox").is(':checked'))
    {
        $("#rememberMe").val(true);
    }
    $("#loginform").submit();
}
     

//找回密码
function resetPassword()
{ 
    var accountName = $("#recoverAccoutName").val();
    if(accountName == "")
    {
        layer.alert('请输入账户邮箱', {icon : 5,shift : 6,time : 0});
        return;
    }
    var index = layer.load();
    $.ajax({
        type : "POST",
        url : sys.rootPath + '/user/withoutAuth/resetPassWithoutAuthc.html',
        data : {"accountName" : accountName},
        dataType : "json",
        success : function(resultdata) {
            layer.close(index);
            if (resultdata.success) {
                layer.msg('您好,' + resultdata.message + ',请登录您的邮箱查看', {
                    icon : 1
                });
                $('#recoverWidget').click();
            } else {
                layer.msg(resultdata.message, {
                    icon : 5
                });
            }
        },
        error : function(errorMsg) {
            layer.close(index);
            layer.msg('服务器未响应,请稍后再试', {
                icon : 2
            });
        }
    });
    
}
