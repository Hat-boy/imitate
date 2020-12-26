$(function() {
    // 当我们点击了电梯导航li。就会触发滚动屏幕滚动，而屏幕一滚动又会触发屏幕滚动到指定区域添加fixedtool类名这代码，所以就会点击跳来跳去。
    // 需要设置节流阀 互斥锁
    flag = false;
    // alert(1);
    var toolTop = $('.recommend').offset().top;
    // console.log(toolTop);
    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $('.fixedtool').fadeIn();
        } else {
            $('.fixedtool').fadeOut();
        }
    };

    toggleTool(); // 调用toggleTool函数 在用户不滚动屏幕的时候，刷新页面也能让fliexTool淡入显示，
    $(window).scroll(function() {
        toggleTool(); //用户滚动屏幕再次调用
        // 当页面滚动到某个内容区域，我们就让电梯导航里相应的li和添加和删除fixedtool1和fixedtoola类名
        if (flag) {
            $('.floor .w').each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top - 10) {
                    console.log(i);
                    $('.fixedtool li').eq(i).addClass('fixedtool1').siblings().removeClass('fixedtool1');
                    $('.fixedtool li').eq(i).find('a').addClass('fixedtoola').parent().siblings().find('a').removeClass('fixedtoola');
                }
            })
        }


    });

    // 点击电梯导航的li，让页面滚动到相应内容区域
    $('.fixedtool li').on('click', function() {
        flag = false;
        console.log($(this).index());
        // 计算出当前索引号内容区的offset值
        var current = $('.floor .w').eq($(this).index()).offset().top;
        // 让整个页面的scrollTop改为当前点击li索引号对应的内容区域的offset().top值， 也就是current
        // 且！由于只有元素才能做动画，所以不能用$(document)给整个页面做动画
        $('html,body').stop().animate({
                scrollTop: current
            }, function() {
                flag = true;
            })
            // 点击之后让当前的li添加fiexdtool1这个类名，且让其余的兄弟移除这个类名
        $(this).addClass('fixedtool1').siblings().removeClass('fixedtool1');
        // 给li的子元素a添加fixedtoola类名， 其余的a移除类名
        $(this).find('a').addClass('fixedtoola').parent().siblings().find('a').removeClass('fixedtoola');
    })

})