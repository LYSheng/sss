
var Name=document.querySelector("#name");
var TzSex=document.querySelector("#TzSex");
var TzBelong=document.querySelector("#TzBelong");
var form=document.querySelector("#form");
var Tzmoney=document.querySelector("#Tzmoney");
var TzHead=document.querySelector("#TzHead");
function filter(fn) {
    var list = document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0].rows;
    var size = list.length;
    var tr;
    for(var i = 0; i < size; i++) {
        tr = list[i];
        tr.removeAttribute('class', 'hide')
        if(!fn(tr)) {
            tr.setAttribute('class', 'hide');
        }
    }
}
function search() {
    var TzName = document.getElementById('TzName').value;
    var sex= document.getElementById('sex').value;
    var belong = document.getElementById('belong').value;
    var laiYuan= document.getElementById('laiYuan').value;
    var money = document.getElementById('money').value;
    var head = document.getElementById('head').value;
    filter(function(tr) {

        if(TzName && tr.cells[Name.cellIndex].innerHTML.indexOf(TzName) < 0) {
            return false;
        }
        if(sex && tr.cells[3].innerHTML != sex) {
               return false;
        }
        if(belong && tr.cells[TzBelong.cellIndex].innerHTML.indexOf(belong) < 0) {
            return false;
        }
        if(laiYuan && tr.cells[form.cellIndex].innerHTML != laiYuan) {
            return false;
        }
        if(money && tr.cells[Tzmoney.cellIndex].innerHTML != money) {
            return false;
        }
        if(head && tr.cells[TzHead.cellIndex].innerHTML.indexOf(head) < 0) {
            return false;
        }
        return true;
    });
}