$(function(){
    var imgL=$(".showtree img").length;
    var deg=360/imgL;/*每张图片应该旋转的角度*/
    var roY=0,roX=-10;/*初始化绕X轴旋转10度*/
    var xN=0,yN=0;/*鼠标移动的距离*/
    var play=null;

    initImgPos();
    dragImg();

    /*初始化每张图片的位置*/
    function initImgPos(){
        $(".showtree img").each(function (i) {
            $(this).css({
                //每张图片沿z轴平移300px,分别绕y轴旋转一定的角度，形成一圈；
                "transform":"rotateY("+i*deg+"deg) translateZ(300px)" });
                //防止图片被拖拽
                $(this).attr('ondragstart','return false');
        });
    }

    /*拖拽图片*/
    function dragImg(){
        $(document).mousedown(function(ev){
            //获取鼠标按下时的坐标；
            var x_=ev.clientX;
            var y_=ev.clientY;
            clearInterval(play);
            $(this).bind('mousemove',function(ev){
                /*获取鼠标的坐标*/
                var x=ev.clientX;
                var y=ev.clientY;
                /*两次坐标之间的距离*/
                xN=x-x_;
                yN=y-y_;
                roY+=xN*0.2;/*表示绕Y轴旋转的角度 0.2表示转动的幅度大小*/
                roX-=yN*0.1;/*表示绕X轴旋转的角度 0.1表示转动的幅度大小 注意：Y轴是以朝下为正方向。所以这里是-*/
                $('.showtree').css({
                    transform:'perspective(1000px) rotateX('+roX+'deg) rotateY('+roY+'deg)'
                });
                x_=ev.clientX;
                y_=ev.clientY;
            });
        }).mouseup(function(){
            $(this).unbind('mousemove');
            /*鼠标抬起来出现的缓动*/
            play=setInterval(function(){
                xN*=0.95;/*使之绕Y轴转动的速度越来越小 数越大缓动越久*/
                yN*=0.95;/*使之绕X轴转动的速度越来越小 数越大缓动越久*/
                if(Math.abs(xN)<1 && Math.abs(yN)<1){
                    clearInterval(play);
                }
                roY+=xN*0.2;
                roX-=yN*0.1;
                $('.showtree').css({
                    transform:'perspective(1000px) rotateX('+roX+'deg) rotateY('+roY+'deg)'
                });
            },30);
        });
    }
});