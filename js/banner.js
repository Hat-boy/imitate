// window的load事件
window.addEventListener('load', function() {
    // 获取元素：
    var arrow_l = document.querySelector('.arrow_l');
    var arrow_r = document.querySelector('.arrow_r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;

    // 1,鼠标经过轮播图，让左右按钮显示，离开隐藏，
    focus.addEventListener('mouseover', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer); //停止定时器，
        timer = null; //清空里面的变量
    })
    focus.addEventListener('mouseout', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 鼠标离开开启定时器
        timer = setInterval(function() {
            // 自动调用右侧的点击事件：点击事件源.click();
            arrow_r.click();
        }, 2000)

    })

    //2,动态生成小圆圈，有几张图片就生成几个小圆圈
    // (1)，这里为了严谨，我们只需要获取focus里的ul和ol，不要获取documen整个文档的ul，
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.cricle');
    // console.log(ul.children.length); //查看ul里有几个li，也就是有几张图片
    for (var i = 0; i < ul.children.length; i++) {
        // 创建li节点
        var li = document.createElement('li');
        // 将节点插入ol
        ol.appendChild(li);

        // 添加自定义属性，创建索引号
        li.setAttribute('date-index', i)
            // 3.点击小圆圈，让当前小圆圈变色，排他思想,我们在生成小圆圈的同时绑定点击事件
        li.addEventListener('click', function() {
            // 先清除所有小圆圈的背景色
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //再给当前的小圆圈添加current类
            this.className = 'current';

            // 4，点击小圆圈，移动图片，注意这里需要移动的是ul，且需要移动必须加定位，因为我们移动的是left值

            // (1),ul（图片）移动的距离就是父盒子focus宽度*小圆圈的索引号。
            // （2）获取父盒子focus的宽度
            // 如果我们在这里获取宽度，focusWidth就成了局部变量，只能在这一作用域被定义，由于下面还会用到focusWidth，所以我们要写到上面改为全局变量
            // var focusWidth = focus.offsetWidth; 

            // console.log(focusWidth);
            // (3),创建小圆圈的索引号，通过自定义属性创建,在上面↑
            var index = this.getAttribute('date-index') //获取当前属性值，也就是索引号
                //    ！！！当我们点击了某个小圆圈，就把当前小圆圈的索引号分别给num和cricleNum
            num = cricleNum = index;
            // console.log(index);
            // (4),引入动画
            animate(ul, -index * focusWidth);
        })
    }
    // ！一打开页面什么都没点击，默认第一个小圆圈有背景色
    ol.children[0].className = 'current';
    //克隆第一张图片（li）插入到ul的最后一个
    var first = ul.children[0].cloneNode('true'); //true为深克隆
    ul.appendChild(first);

    //6，点击右侧按钮，向左移动，
    // (1), 这里我们需要设置一个num的全局变量， 作为点击次数， ul移动的距离就等于点击次数 * focusWidth
    var num = 0;
    var cricleNum = 0;
    flag = true;
    arrow_r.addEventListener('click', function() {
        // 节流阀写在动画函数外面
        if (flag) {
            flag = false; //关闭节流阀
            //(2)if我们点击走到复制的（第一张）最后一张图片，我们ul要快速的复原 即left=0，这就是无缝滚动原理，需要将第一张图片复制添加到最后一张
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; //动画执行完打开节流阀
            })

            // 7，点击右侧按钮，让当前的小圆圈对应着当前图片改变背景色
            cricleNum++;
            if (cricleNum == ol.children.length) {
                cricleNum = 0;
            }
            cricleChange();
        }

    })

    //8，点击左侧按钮,复制右侧代码,
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            //（1）改参数：当前点击在第一张的时候（num=0）我们让num等于非克隆的最后一张(num=5)，然后再把left值手动改为第（5）非克隆最后一张的left值
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                    flag = true;
                })
                // 9，点击左侧按钮，让当前的小圆圈对应着当前图片改变背景色
            cricleNum--;
            // 当我们页面在在第一张的时候（未点击 此时criclenum=0）由于一点击，执行criclenum--，就criclenum=-1<0;
            if (cricleNum < 0) {
                cricleNum = ol.children.length - 1;
            }
            //调用函数：
            cricleChange();
        }
    })

    // 由于右侧按钮和左侧按钮的排他思想给当前小圆圈添加类的部分一样，我们可以把这段代码封装为一个函数，让他们调用就可以了
    function cricleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            // 先干掉所有小圆圈的背景色
            ol.children[i].className = '';
        }
        ol.children[cricleNum].className = 'current';
    }

    // 9.自动播放轮播图，重点！也就等于每隔一段时间按一次右侧按钮
    var timer = setInterval(function() {
        // 自动调用右侧的点击事件：点击事件源.click();
        arrow_r.click();
    }, 2000)

    //10。 鼠标经过停止定时器，上面已经写过鼠标经过事件，写在上面↑
})