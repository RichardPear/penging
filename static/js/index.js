window.onload = function(){
    //banner渐隐切换
    (function(){
        var bannerPlayId = null;
        var curBanner = 0;
        var bannerArr = [
            new Fade("J_banner1"),
            new Fade("J_banner2"),
            new Fade("J_banner3")
        ];
        var circleArr = [
            getById("J_circle1"),
            getById("J_circle2"),
            getById("J_circle3")
        ];
        var bannerLength = circleArr.length;
        var bannerWrap = getById("J_banner-wrap");
        //var curTimeout = null;
        playBanner();
        function playBanner(){
            bannerPlayId = setInterval(function(){
                var i = 0;
                for( i = 0;i < bannerLength;i ++){
                    if(i == curBanner){
                        bannerArr[curBanner].fadeOut();
                        circleArr[curBanner].className = "circle";
                        break;
                    }
                }
                curBanner = (i+1 == bannerArr.length) ? 0 : i+1;
                circleArr[curBanner].className = "circle active";
                bannerArr[curBanner].fadeIn()

            },3000);
        }
        bannerWrap.onmouseover = function(){
            clearInterval(bannerPlayId);
        };
        bannerWrap.onmouseout = function(){
            playBanner();
        }
        for(var i = 0;i < circleArr.length;i++){
            (function(i){
                circleArr[i].onclick = function(){
                    if(Fade.prototype.isPlay){
                        return;
                    }
                    if(curBanner != i){
                        curBanner = i;
                        circleArr[curBanner].className = "circle active";
                        bannerArr[curBanner].fadeIn()
                        for(var j = 0;j < bannerLength;j++ ){
                            if(curBanner != j){
                                circleArr[j].className = "circle";
                                bannerArr[j].fadeOut();
                            }
                        }
                    }
                }
            })(i);
        }

    })();
    //滑动导航
    (function(){
        var navUl = getById("J_nav-ul");
        var slideBorder = getById("J_current");
        var lis = navUl.getElementsByTagName('li');
        var defaultWidth = 0;
        var defaultLeft = 0;
        for(var i = 0;i < lis.length;i++){
            if(lis[i].className=="current-li"){
                defaultWidth = lis[i].offsetWidth;//初始width
                defaultLeft = lis[i].offsetLeft;//初始left
                break;
            }
        }
        slideBorder.style.width = defaultWidth + "px";
        slideBorder.style.left = defaultLeft + "px";
        for(var i = 0;i < lis.length;i++){
            (function(i){
                lis[i].getElementsByTagName('a')[0].onmouseover = function(){
                    animate(slideBorder,lis[i].offsetWidth,lis[i].offsetLeft,300);
                };
                lis[i].getElementsByTagName('a')[0].onmouseout = function(){
                    animate(slideBorder,defaultWidth,defaultLeft,300);
                };
                lis[i].getElementsByTagName('a')[0].onclick = function(){
                    defaultWidth = lis[i].offsetWidth;
                    defaultLeft = lis[i].offsetLeft;
                };
            })(i);
        }
        function animate(obj, width, left, time) {
            clearInterval(obj.playId);
            var oldLeft = obj.offsetLeft;
            var oldWidth = obj.offsetWidth;
            var leftFlag = (left > oldLeft) ? 1 : -1;
            var widthFlag = (width > oldWidth) ? 1 : -1;
            var leftDistance = Math.abs(left - oldLeft); //left变化量
            var widthDistance = Math.abs(width - oldWidth)//width变化量
            var between = 16.7;//改变频率
            var count = time/between;//改变次数
            var perLeft = leftDistance == 0 ? 0 : Math.ceil(leftDistance/count);
            var perWidth = widthDistance == 0 ? 0 : Math.ceil(widthDistance/count);
            var leftTotal = 0;
            var widthTotal = 0;
            obj.playId = setInterval(function() {
                if(leftTotal >= leftDistance || leftTotal + perLeft > leftDistance){
                    obj.style.left = left + 'px';
                    perLeft = 0;
                }
                if(widthTotal >= widthDistance || widthTotal + perWidth > widthDistance){
                    obj.style.width = width + 'px';
                    perWidth = 0;
                }
                if(leftTotal >= leftDistance && widthDistance >= widthDistance){
                    clearInterval(obj.playId);
                    return;
                }
                obj.style.left = (obj.offsetLeft + leftFlag * perLeft) + 'px';
                obj.style.width = (obj.offsetWidth + widthFlag * perWidth) + 'px';
                leftTotal += perLeft;
                widthTotal += perWidth;
            }, between);
        }
    })();
    //固定右边导航
    (function(){
        window.onscroll = function(){
            fixed();
        }
        function fixed() {
            var fixedObj = getById("main-right-wrap");
            var mainObj = getById("J_main-wrap");
            var mainHeight = mainObj.offsetHeight;//主区域高度
            var rightHeight = fixedObj.offsetHeight;//固定内容的高度
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//滚动高度
            if (scrollTop >= 764) {
                fixedObj.style.top = scrollTop - 764 + 'px';
                if (parseInt(fixedObj.style.top) + rightHeight >= mainHeight) {
                    fixedObj.style.top = mainHeight - rightHeight + "px";
                }
            }
            else {
                fixedObj.style.top = 0;
            }
        }
        fixed();
    })();
    //各方向轮播切换
    (function(){
        var guarantors = new Carousel('J_guarantors','top','87px','1000ms','174px');
        var companies = new Carousel('J_companies','left','193px','500ms','960px');
        var cooperation = new Carousel('J_cooperation','right','965px','1000ms','0px');
        var ulArr = [
            new CreateMoveObj(guarantors),
            new CreateMoveObj(companies),
            new CreateMoveObj(cooperation)
        ];
        var tabArr = [getById('J_organize-tab'),getById('J_companies-tab'),getById('J_cooperation-tab')];
        var divArr = [getById('J_guarantors-wrap'),getById('J_companies-wrap'),getById('J_cooperation-wrap')];
        ulArr[0].play(2000);//默认加载动画
        var curTab = 0;//当前标签索引
        for(var i = 0;i < tabArr.length;i ++){
            (function(i){
                ulArr[i].obj.onmouseover = function(){
                    ulArr[i].clearPlayId();
                };
                ulArr[i].obj.onmouseout = function(){
                    ulArr[i].play();
                };
                tabArr[i].onclick = function(){
                    if(i != curTab){
                        curTab = i;
                        tabArr[curTab].className = "organize-title-active";
                        divArr[curTab].style.display = "block";
                        ulArr[curTab].play();
                        for(var j = 0;j < tabArr.length;j++){
                            if(i != j){
                                tabArr[j].className = '';
                                divArr[j].style.display = "none";
                                ulArr[j].clearPlayId();
                            }
                        }
                    }
                }
            })(i);
        }
    })();
}

function getById(name){
    return document.getElementById(name);
}
function Carousel(id,direction,distance,animateTime,recoverLength){
    this.id = id;
    this.direction = direction;
    this.distance = distance;
    this.animateTime = animateTime;
    this.recoverLength = recoverLength;
}

function CreateMoveObj(o){
    this.obj = getById(o.id);
    this.obj.style.position = "absolute";
    this.distance = parseInt(o.distance) || 0;//默认不移动
    this.recoverLength = parseInt(o.recoverLength) || 0;
    this.animateTime = parseInt(o.animateTime) || 500;//500ms动画时间
    if(o.direction == 'top'){
        this.direction = 'top';
        this.flag = -1;
    }else if(o.direction == 'bottom'){
        this.direction = 'top';
        this.flag = 1;
    }else if(o.direction == 'left'){
        this.direction = 'left';
        this.flag = -1;
    }else{
        this.direction = 'left';
        this.flag = 1;
    }
    this.playId = null;
    //保存现场
    this.oldTop = parseInt(this.obj.style['top']+0);
    this.oldRight = parseInt(this.obj.style['right']+0);
    this.oldBottom = parseInt(this.obj.style['bottom']+0);
    this.oldLeft = parseInt(this.obj.style['left']+0);
}
CreateMoveObj.prototype.play = function(afterTime){
    var that = this;
    this.playId = setInterval(function(){
        if(Math.abs(parseInt(that.obj.style[that.direction]+0)) >= that.recoverLength){
            //恢复现场
            that.obj.style['top'] = that.oldTop + 'px';
            that.obj.style['right'] = that.oldRight + 'px';
            that.obj.style['bottom'] = that.oldBottom + 'px';
            that.obj.style['left'] = that.oldLeft + 'px';
        }
        CreateMoveObj.prototype.animate.call(that);
    },afterTime || 2000);
}
CreateMoveObj.prototype.animate = function(){
    var count = this.distance;
    var between = this.animateTime / count;
    var direction = this.direction;
    var that = this;
    for(var i = 0;i < count;i ++){
        (function(i){
            setTimeout(function(){
                var oldPosition = parseInt(that.obj.style[direction]+0);
                that.obj.style[direction] = (oldPosition+that.flag) + 'px';
            },i*between);
        })(i);
    }
}
CreateMoveObj.prototype.clearPlayId = function(){
    clearInterval(this.playId);
    this.playId = null;
}
function Fade(name){
    this.obj = getById(name);
    Fade.prototype.isPlay = false;
}
Fade.prototype.fadeIn = function(){
    var between =  10;//每10ms改变一次,动画时间1000ms
    var that = this;
    that.obj.style.display = "block";
    that.obj.style.opacity  = 0;
    that.obj.style.filter = 'alpha(opacity=0)';
    for(var i = 1;i <= 100;i++){
        (function(i){
            setTimeout(function(){
                that.obj.style.opacity  = parseFloat(that.obj.style.opacity+0) + 0.01;
                that.obj.style.filter = 'alpha(opacity=' + i + ")";
                Fade.prototype.isPlay = (i == 100) ? false : true;
            },i*between);
        })(i);
    }
}
Fade.prototype.fadeOut = function(){
    var between = 10;//每10ms改变一次
    this.obj.style.opacity = 1;
    var that = this;
    that.obj.style.display = "block";
    that.obj.style.opacity = 1;
    that.obj.style.filter = "alpha(opacity=100)";
    for(var i = 1;i <= 100;i++){
        if(i == 100){
            that.obj.style.display = "none";
        }
        (function(i){
            setTimeout(function(){
                if(!that.obj.filters && parseFloat(that.obj.style.opacity+0) > 0){
                    that.obj.style.opacity  = parseFloat(that.obj.style.opacity) - 0.01;
                }else{
                    that.obj.style.filter = 'alpha(opacity=' + (100-i) + ")";
                }
                //that.isPlay = i == 100 ? false : true;
                Fade.prototype.isPlay = (i == 100) ? false : true;
            },i*between);
        })(i);
    }
}