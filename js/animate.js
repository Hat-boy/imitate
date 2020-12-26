// (function(message) {
//     while (message !== '爸爸') {
//         message = prompt('叫爸爸 ! ');
//     }
//     alert('诶！乖儿子！')
// })();

function animate(obj, target, callback) //obj：对象元素，target：靶子，目标位置
{
    clearInterval(obj.timer); //仿止用户再次点击加快元素移动速度
    obj.timer = setInterval(function() { //我们用给obj添加属性的方法给定时器命名，这样就不用声明变量占空间了
            var step = (target - obj.offsetLeft) / 10 //添加缓动效果，写到定时器里面
            step = step < 0 ? Math.floor(step) : Math.ceil(step); //对step取整，如果step<0往下取整，step>0往上取整
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                //如果用户写了回调函数的参数，我们就调用,
                // 且回调函数写在定时器结束里
                callback && callback(); //高级写法
                /*  if (callback) {
                     callback();
                 } */
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15) //定时器一般写15ms

}