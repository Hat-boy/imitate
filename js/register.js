window.addEventListener('load', function() {

    var regtel = /^1[3|4|5|7|8]\d{9}$/; //验证手机号码的正则表达式
    // console.log(regtel.test(15228446751)); //检验正则表达式是否创建正确
    var regqq = /^[1-9]\d{4,}$/; //qq正则表达式
    var regmes = /^\d{6}$/; //短信验证码表达式
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;
    // 获取表单元素
    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq');
    var mesage = document.querySelector('#message');
    var pwd = document.querySelector('#pwd');
    var surepwd = document.querySelector('#surepwd');
    regexp(tel, regtel); //手机号码
    regexp(qq, regqq); //QQ号码
    regexp(message, regmes); //短信验证码
    regexp(pwd, regpwd); //密码表达式
    // 绑定手机号input框失去焦点事件函数，
    function regexp(ele, reg) {
        ele.addEventListener('blur', function() {
            // 判断用户是表单值是否符合regtel正则表达式， 再对相应的元素类名进行修改
            if (reg.test(this.value)) {
                console.log('right');
                this.nextElementSibling.className = 'green'; //当前的兄弟（span）类名改为green
                this.nextElementSibling.innerHTML = '<i class="success"></i> 输入正确！';
            } else {
                console.log('wrong');
                this.nextElementSibling.className = 'red'; //当前的兄弟（span）类名改为red
                this.nextElementSibling.innerHTML = '<i class="error"></i> 格式错误！';
            }
        })
    }
    // 确认密码失去焦点事件
    // 判断登录密码框里的值和确认密码框的值是否相等
    surepwd.addEventListener('blur', function() {
        if (surepwd.value == pwd.value) {
            this.nextElementSibling.className = 'green'; //当前的兄弟（span）类名改为green
            this.nextElementSibling.innerHTML = '<i class="success"></i> 输入正确！';
        } else {
            this.nextElementSibling.className = 'red'; //当前的兄弟（span）类名改为red
            this.nextElementSibling.innerHTML = '<i class="error"></i> 两次密码输入不一致！';
        }
    })

})