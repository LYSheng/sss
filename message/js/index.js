//首页主页背景色切换
var indexList=document.querySelectorAll(".index_list");
for (var i=0;i<indexList.length;i++){
    indexList[i].index=i;
    indexList[i].addEventListener("touchstart",myFunction);
    function myFunction() {
        for (var j=0;j<indexList.length;j++){
            indexList[j].classList.remove("index_Active")
        }
        indexList[this.index].classList.add("index_Active")
    }
};





