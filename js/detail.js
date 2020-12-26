window.addEventListener('load', function() { //，因为这是js外部文件我们要等html和css全部加载完，再来加载js

    //1,鼠标经过，mask遮挡层和big盒子显示
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })

    //2,鼠标离开preview—img，mask遮挡层和big盒子隐藏
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })

    //3,移动鼠标，将鼠标在preview-img盒子内的坐标给mask遮挡层的left和top
    // (1)计算鼠标在盒子内的坐标：鼠标在页面中的坐标-preview-img在页面中的坐标
    // ！！！这里的offsetLeft获取值一定要看preview-img盒子的父盒子们有没有定位，如果有定位，offset只能得到它在父盒子里的坐标
    //       就不是它离浏览器的坐标，这里我们刚好previewimg盒子的父盒子们都没有定位
    preview_img.addEventListener('mousemove', function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // console.log(x, y);

        //(2),我们要让mask盒子在previewimg盒子里移动，不能超出previewimg盒子，所以我们要加一个if语句判断控制mask的left和top值
        //如果maskleft<=0,我们就让mask=0，
        //如果maskleft>=left的最大值，我们就让maskleft=最大值，就是previewimg的盒子的宽-mask遮挡盒子宽，top值同理
        var maskLeft = x - mask.offsetWidth / 2;
        var maskTop = y - mask.offsetHeight / 2;
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskLeft <= 0) {
            maskLeft = 0;
        } else if (maskLeft >= preview_img.offsetWidth - mask.offsetWidth) {
            maskLeft = maskMax;
        }
        if (maskTop <= 0) {
            maskTop = 0;
        } else if (maskTop >= maskMax) {
            maskTop = maskMax;
        }
        mask.style.left = maskLeft + 'px'; //为了美观我们要让鼠标在mask遮挡层中间显示，这里我们的定位再减去mask宽高的一半就可以了
        mask.style.top = maskTop + 'px';

        // 4. 让大图片跟着mask遮挡层移动,
        // (1),但是mask遮挡层的父盒子和放大图片的父盒子是不相等的，所以移动相同的坐标，就会不一样，
        //(2) 这里我们需要算出比例，移动相同的比例坐标就可以同步了
        //(3),比例为：mask的left值/mask可以移动的left最大值 = bigimg的left值/bigimg可以移动的left的最大值
        //    所以bigimg的left值=maskLeft * bigImgMax / maskMax; 而bigimgMax=图片的宽度-big盒子的宽度
        var bigImg = document.querySelector('.big_img');
        var bigImgMax = bigImg.offsetWidth - big.offsetWidth; //因为这里big是正方形所以可以不用求高
        // console.log(bigImgMax);
        var bigImgLeft = maskLeft * bigImgMax / maskMax;
        var bigImgTop = maskTop * bigImgMax / maskMax;
        //这里的放大图片移动的left和top与mask遮挡层移动的是相反的，所以需要加负号
        bigImg.style.left = -bigImgLeft + 'px';
        bigImg.style.top = -bigImgTop + 'px';


    })


})