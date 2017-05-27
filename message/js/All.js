//点击跟进以及编辑
var followUp=document.querySelectorAll(".follow_up");
var mandatoryBox=document.querySelector(".mandatory_box");
for (var i=0;i<followUp.length;i++){
    followUp[i].index=i;
    followUp[i].addEventListener("touchstart",function () {
        mandatoryBox.style.display="block";
    })
}
var ContactTui=document.querySelector(".Contact_Tui");
ContactTui.addEventListener("touchstart",function () {
    mandatoryBox.style.display="none";
});



//即时搜索功能
function onSearch(obj){//js函数开始
    setTimeout(function(){//因为是即时查询，需要用setTimeout进行延迟，让值写入到input内，再读取
        var storeId = document.getElementById('tableSort');//获取table的id标识
        var rowsLength = storeId.rows.length;//表格总共有多少行
        var key = obj.value;//获取输入框的值
        var searchCol;
        if (obj.alt){
            searchCol =1;
        }else{
            searchCol =4;//要搜索的哪一列，这里是第一列，从0开始数起
        }
        for(var i=1;i<rowsLength;i++){//按表的行数进行循环，本例第一行是标题，所以i=1，从第二行开始筛选（从0数起）
            var searchText = storeId.rows[i].cells[searchCol].innerHTML;//取得table行，列的值

            if(searchText.match(key)){//用match函数进行筛选，如果input的值，即变量 key的值为空，返回的是ture，
                storeId.rows[i].style.display='';//显示行操作，
            }else{
                storeId.rows[i].style.display='none';//隐藏行操作
            }
        }
    },200);//200为延时时间
}

//列表点击颜色
var Tbody=document.getElementsByTagName("tbody");
var trs=document.querySelectorAll("Tbody>tr");
for (var i=0;i<trs.length;i++){
    trs[i].index=i;
    trs[i].addEventListener("touchstart",function () {
        for (var j=0;j<trs.length;j++){
            trs[j].classList.remove("Tr_bian")
        }
        trs[this.index].classList.add("Tr_bian");
    })
}
//项目全部留言跟进详情必填判断
var button=document.querySelector("#button");
var flag=false;
var dnf=document.querySelectorAll(".dnf");
var Aixuan=document.querySelectorAll(".ai_xuan");
button.addEventListener("touchstart",function () {
    for (var i=0;i<dnf.length;i++){
        if (dnf[i].value=="--请选择--"||dnf[i].value=="--未选择--"||dnf[i].value==0){
            Aixuan[i].style.opacity= 1;
            Aixuan[i].classList.add("bg");
            flag=false;
        }else{
            Aixuan[i].style.opacity= 0;
            Aixuan[i].classList.remove("bg");
            if (dnf[i].value!="--请选择--"&&dnf[i].value!="--未选择--"&&dnf[i].value!=0){
                flag=true;
            }
        }
    }
    if (flag==true){
        console.log(13)
    }

});

//分页
var pageSize=0;//每页显示行数
var currentPage_=1;//当前页全局变量，用于跳转时判断是否在相同页，在就不跳，否则跳转。
function goPage(pno,psize){
    var itable = document.getElementById("adminTbody");
    var num = itable.rows.length;//表格所有行数(所有记录数)

    pageSize = psize;//每页显示行数
    //总共分几页
    if(num/pageSize > parseInt(num/pageSize)){
        totalPage=parseInt(num/pageSize)+1;
    }else{
        totalPage=parseInt(num/pageSize);
    }
    var currentPage = pno;//当前页数
    currentPage_=currentPage;
    var startRow = (currentPage - 1) * pageSize+1;
    var endRow = currentPage * pageSize;
    endRow = (endRow > num)? num : endRow;
    //遍历显示数据实现分页
    for(var i=1;i<(num+1);i++){
        var irow = itable.rows[i-1];
        if(i>=startRow && i<=endRow){
            irow.style.display = "";
        }else{
            irow.style.display = "none";
        }
    }
//        var tempStr = "共"+num+"条记录 分"+totalPage+"页 当前第"+currentPage+"页";
//        document.getElementById("barcon1").innerHTML = tempStr;
    if(currentPage>1){
        $("#firstPage").on("click",function(){
            goPage(1,psize);
        });
        $("#prePage").on("click",function(){
            goPage(currentPage-1,psize);
        });
    }else{
        $("#firstPage").off("click");
        $("#prePage").off("click");
    }

    if(currentPage<totalPage){
        $("#nextPage").on("click",function(){
            goPage(currentPage+1,psize);
        })
        $("#lastPage").on("click",function(){
            goPage(totalPage,psize);
        })
    }else{
        $("#nextPage").off("click");
        $("#lastPage").off("click");
    }
    var tempOption="";
    for(var i=1;i<=totalPage;i++)
    {
        tempOption+='<option value='+i+'>'+i+'</option>'
    }
    $("#jumpWhere").html(tempOption);
    $("#jumpWhere").val(currentPage);
    var pageList=document.querySelectorAll(".page_list");
    for (var i=0;i<pageList.length;i++){
        pageList[i].index=i;
        pageList[i].addEventListener("touchstart",function () {
            for (var j=0;j<pageList.length;j++){
                pageList[j].classList.remove("Static_active");
            }
            pageList[this.index].classList.add("Static_active");
        })
    }

}
goPage(1,16)
function jumpPage()
{
    var num=parseInt($("#jumpWhere").val());
    if(num!=currentPage_)
    {
        goPage(num,pageSize);
    }
}

/*******************排序开始*********************/
function getElementsByClassName(className, node, tag){
    node = node || document;//如果省略了参数node，就从document中搜索，否则从node节点开始搜索
    if(node.getElementsByClassName)
        return node.getElementsByClassName(className);
    else{
        tag = tag || "*";
        var searchElems = [];
        var elems = node.getElementsByTagName(tag);
        for(i=0; i<elems.length; i++){
            var elem = elems[i];
            if(elem.className.indexOf(className) != -1)
                searchElems.push(elem);
        }
        return searchElems;
    }
}

function sortTable(tableId, colIdx, sortType){
    var oTbody =document.getElementById(tableId).tBodies[0];//得到指定id的表格对象下的tbody
    var dataRows = oTbody.rows;

    var sortRows = [];
    for(i=0; i<dataRows.length; i++){
        sortRows.push(dataRows[i]);
    }

    //if(oTbody.sortColIdx == colIdx){
    //sortRows.reverse();
    //}else{
    sortRows.sort(function(oTr1, oTr2){
        var cellVal1 = oTr1.cells[colIdx].textContent;//firstChild.nodeValue
        var cellVal2 = oTr2.cells[colIdx].textContent;
        return sortType=="asc"?compare(cellVal1, cellVal2):compare(cellVal2, cellVal1);
    });
    //}

    for(i=0; i<sortRows.length; i++){
        oTbody.appendChild(sortRows[i]);
    }
    //oTbody.sortColIdx = colIdx;
};

function compare(val1, val2){
    if(!isNaN(val1) && !isNaN(val2)){
        return parseInt(val1) - parseInt(val2);
    }

    return val1.localeCompare(val2);
}

window.onload = function(){
    var sortType = "asc";
    var sortCols = getElementsByClassName("sort_able");
    for(i=0; i<sortCols.length; i++){
        var sortCol = sortCols[i];
        sortCol.onclick = function(){
            sortType = (sortType == "asc")?"desc":"asc";
            this.className = "sort_" + sortType;
            sortTable("tableSort", this.parentNode.cellIndex, sortType);
        };
    }
};


function next(elem){
    do{
        elem = elem.nextSibling;
    }while( elem && elem.nodeType != 1);

    return elem;
}

function getByClass(className, context, tag){
    context = context || document;
    tag = tag || "*";
    var result = [];
    //能力检测
    if(document.getElementsByClassName){
        return document.getElementsByClassName(className);
    }
    //自己封装的代码
    var arr = context.getElementsByTagName(tag);
    for(var i=0; i<arr.length; i++){
        if(arr[i].className == className){
            result.push(arr[i]);
        }
    }
    return result;
}
/*******************排序结束*********************/
//搜索多条件显示隐藏
var menuSou=document.querySelector(".menu_sou");
var menuListBox=document.querySelector(".menu_list_box");
var menuList=document.querySelectorAll(".menu_list");
var menussNow=document.querySelector(".menu_ssNow");
var flag=true;
menuSou.addEventListener("touchstart",function () {
    if (flag){
        menuListBox.style.display="block";
        menuSou.innerHTML="&#xe607;";
        flag=false;
    }else{
        menuListBox.style.display="none";
        menuSou.innerHTML="&#xe605;";
        flag=true;
    }
});

//列表中电话号码加密
var tdTell=document.querySelectorAll(".td_tell");
var tdTellCha=document.querySelectorAll(".td_tell_cha");
var ko=document.querySelector(".ko");
var str1,str2;
var arr=[];
for (var i=0;i<tdTell.length;i++){
    str1=tdTell[i].innerHTML;
    str2 = str1.substr(0,3)+"****"+str1.substr(7);
    tdTell[i].innerHTML=str2;
    arr.push(str1);
};
for (var i=0;i<tdTellCha.length;i++){
    tdTellCha[i].index=i;
    tdTellCha[i].addEventListener("touchend",function () {
        tdTell[this.index].innerHTML=arr[this.index];
        this.innerHTML="";
    });
}

//跟进详情打电话功能
var mandatoryIphone=document.querySelector(".mandatory_iphone");
var Tziphone=document.querySelector("#Tziphone");
// console.log(Tziphone);
Tziphone.value=18535284194;
TziphoneVal=Tziphone.value;
mandatoryIphone.href="tel:"+TziphoneVal;

//*的出现
var AllShow=document.getElementById("All_show");
var mandatory=document.querySelectorAll(".mandatory");
var mandatoryP=document.getElementsByClassName("mandatory_p",AllShow);
for (var i=0;i<mandatoryP.length;i++){
    if (mandatoryP[i].hidden){
        mandatory[i].style.opacity= "1";
    }
}








