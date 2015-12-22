function getById(name){
    return document.getElementById(name);
}
function stopPropogation(e){
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}
function hideAllSelect(){
    for(var i = 0;i < selectArr.length;i++){
        (function(i){
            selectArr[i].options.style.display = "none";
        })(i);
    }
}
document.onclick = function(){
    hideAllSelect();
}
function Select(name){
    this.obj = getById(name);
    var content = this.obj.getElementsByTagName('div')[0];
    var options = this.options = this.obj.getElementsByTagName("ul")[0];
    options.onclick = function(e){
        var e = e || window.event;
        this.style.display = "none";
        var selectNode = (e.srcElement.nodeName || e.target.nodeName);
        if(selectNode.toUpperCase() == "LI"){
            content.innerText = e.srcElement.innerHTML || e.target.innerText;
        }
        stopPropogation(e);
    };
    this.obj.onclick = function(e){

        if(options.style.display == "none"){
            hideAllSelect();
            options.style.display = "block";
        }else {
            options.style.display = "none";
        }
        var e = e || window.event;
        stopPropogation(e);

    };
}
//构造select
var selectArr = [new Select("J_select1"),new Select("J_select2"),new Select("J_select3"),new Select("J_select4")];

