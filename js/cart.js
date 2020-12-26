// jquery入口函数
$(function() {
    // 全选。全不选功能模块
    // 1,就是把全选按钮(checkall)的状态赋值给三个小按钮(j-checkbox)就可以了
    // 事件可以使用change
    $('.checkall').change(function() {
        console.log($(this).prop('checked'));
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'))
            // 如果全选复选框被选中，就给每个商品添加类为“check-cart-item”的背景颜色
        if ($(this).prop('checked')) {
            // 添加类
            $('.cart-item').addClass('check-cart-item');
        } else {
            // 删除类
            $('.cart-item').removeClass('check-cart-item');
        }
    })


    // 2，如果小复选框选中的个数等于3，就把全选按钮选上，否则全选按钮不选。
    $('.j-checkbox').change(function() {
        // if（被选中的小的复选框的个数===3）{
        //     就要选中全选按钮
        // }else{
        //     不要选中全选按钮
        // }
        // :checked 查看当前选中的按钮有多少
        // console.log($('.j-checkbox:checked').length);
        if ($('.j-checkbox:checked').length === 3) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }

        // 如果单个小复选框被选中，就给每个商品添加类为“check-cart-item”的背景颜色
        if ($(this).prop('checked')) {
            // 添加类
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            // 删除类
            $('.cart-item').removeClass('check-cart-item');
        }

    })

    // 3.增减商品数量模块 首先声明一个变量，当我们点击+号(increment),就让这个值++，然后赋值给文本框。
    $('.increment').click(function() {
            //先得到当前兄弟文本框的值，赋值给n
            var n = $(this).siblings('.itxt').val();
            // console.log(n);
            n++;
            $(this).siblings('.itxt').val(n);
            // 计算小计。修改当前商品数量下的金额
            // var p = $(this).parent().parent().siblings('.p-price').html();
            // parents()获取祖先级元素,如果要获取爷爷直接parents(爷爷的名字)就可以了
            // parent()只能获取亲爸爸这一个元素，所以如果要获取爷爷就得parent().parent()一层一层的找
            var p = $(this).parents('.p-num').siblings('.p-price').html();
            // console.log(p);//由于获取的是￥12.6，这个字符串，所以我们要用substr()方法截取字符串
            p = p.substr(1);
            // console.log(p);返回12.6
            var total = (n * p).toFixed(2); //保留两位小数
            // console.log(total);
            // 将total赋值给小计(p-sum),即改变p-sum的文本值
            $(this).parents('.p-num').siblings('.p-sum').html('￥' + total);
            getsum();

        })
        // 减商品数量
    $('.decrement').click(function() {
        //先得到当前兄弟文本框的值，赋值给n
        var n = $(this).siblings('.itxt').val();
        // 如果商品数量为1， 我们就不能再减， 跳出函数，
        if (n == 1) { //因为n是通过js代码获取的，log输出为黑色的数字，所以数据类型为字符串类型，句不能用n===1；
            return false;
        }
        n--;
        $(this).siblings('.itxt').val(n);
        // 计算小计。修改当前商品数量下的金额
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        // console.log(p);//由于获取的是￥12.6，这个字符串，所以我们要用substr()方法截取字符串，去掉￥
        p = p.substr(1);
        // console.log(p);返回12.6
        var total = (n * p).toFixed(2); //保留两位小数；.toFixed()
        // console.log(total);
        // 将total赋值给小计(p-sum),即改变p-sum的文本值
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + total);
        getsum();
    })

    // ！如果用户手动修改商品数量(itxt文本框的值)，我们就用change事件，文本框发生改变就执行计算
    $('.itxt').change(function() {
        //    获取用户输入的数字
        var n = $(this).val();
        // 获取单价
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        // 计算小计
        p = p.substr(1);
        var total = (n * p).toFixed(2);
        // 改变小计金额(p-sum)的值，html()
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + total);
        // 调用计算总计和总额函数
        getsum();
    })

    // 计算总计和总额，我们这里用封装函数的方法去调用
    getsum(); //当用户没有改变数量，都为一的时候先调用一遍，
    function getsum() {
        var count = 0;
        var money = 0;
        $('.itxt').each(function(i, ele) {
            count = count + parseInt($(ele).val());
        })
        $('.amount-sum em').text(count);
        // 总额模块
        $('.p-sum').each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
            // console.log(money);

        })
        $('.price-sum em').text('￥' + money.toFixed(2));
    }

    //删除商品模块
    // 1, 点击删除
    $('.p-action a').click(function() {
            $(this).parents('.cart-item').remove();
            getsum();
        })
        // 2.删除选中的商品
    $('.remove-batch').click(function() {
            //    删除复选框选中的商品
            $('.j-checkbox:checked').parents('.cart-item').remove();
            getsum();
        })
        //3删除所有商品
    $('.clear-all').click(function() {
        $('.cart-item').remove();
        getsum();
    })
})