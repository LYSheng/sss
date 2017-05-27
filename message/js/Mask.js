//菜单栏内部js
var MaskUls=document.querySelectorAll("#Mask_uls");
var indexMaskList=document.querySelectorAll(".index_mask_list");
var MaskButton=document.querySelectorAll(".Mask_Button");
for (var i=0;i<indexMaskList.length;i++){
    indexMaskList[i].index=i;
    indexMaskList[i].addEventListener("touchstart",function () {
        for (var j=0;j<indexMaskList.length;j++){
            indexMaskList[j].classList.remove("aa");
        }
        indexMaskList[this.index].classList.add("aa");
        MaskUls[this.index].className==="Mask_active"?MaskUls[this.index].classList.remove("Mask_active"):MaskUls[this.index].classList.add("Mask_active");
        MaskButton[this.index].innerHTML==="+"?MaskButton[this.index].innerHTML="-":MaskButton[this.index].innerHTML="+";
    },false)
}
var MaskList=document.querySelectorAll(".Mask_list");
for (var i=0;i<MaskList.length;i++){
    MaskList[i].index=i;
    MaskList[i].addEventListener("touchstart",function () {
        for (var j=0;j<MaskList.length;j++){
            MaskList[j].style.background="transparent"
            // MaskList[j].classList.remove="Mask_list_active"
        }
        MaskList[this.index].style.background="#1B1B1B"
        // MaskList[this.index].classList.add="Mask_list_active"
    },false)
}
//菜单栏侧滑
var indexNav=document.querySelector(".index_nav");
var indexMask=document.querySelector(".index_mask");
var indexMaskRight=document.querySelector(".index_mask_right");
var flag=true;
var bodys=document.body;
indexNav.addEventListener("touchstart",function () {
    if (flag){
        indexMask.style.left=0;
        indexNav.innerHTML="&#xe607;";
        // bodys.style.height=100+"%";
        flag=false;
    }else{
        indexMask.style.left=-100+"%";
        indexNav.innerHTML="&#xe666;";
        // bodys.style.height=0+"px";
        flag=true;
    }
},false);
indexMaskRight.addEventListener("touchstart",function () {
    indexMask.style.left=-100+"%";
    indexNav.innerHTML="&#xe666;"
    flag=true;
},false);