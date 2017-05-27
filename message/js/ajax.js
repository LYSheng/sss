

// -------------------------------------------------------
// 封装Ajax函数  ajax(option)
	// type     打开方式 post get
	// url      数据地址 url
	// data     发送数据 name=zhangsan&age=18/name={}
	// asynch   是否异步 true
	// dataType 数据类型 text json xml
	// success  回调函数 处理数据
	// ajax({
	// 	type:"get",
	// 	url:"newarr.php",
	// 	data:{name:"zhangsan",age="18"},
	// 	success:function(data){
	// 		console.log(data)
	// }})
	function ajax(option){
		if(!option.url){
			return;
		}
		var type=option.type?option.type:"get";
		var asynch=option.asynch===undefined?true:option.asynch;
		var dataType=option.dataType?option.dataType:"text";
		var data="";
		if(typeof(option.data)=="string"){
			data=option.data;
		}else if(typeof(option.data)=="object"){
			for(var i in option.data){
				data+=i+"="+option.data[i]+"&";
			}
			data=data.slice(0,-1);
		}
		var xml=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");
		if(type=="get"){
			if(data){
				xml.open("get",option.url+"?"+data,asynch);
			}else{
				xml.open("get",option.url,asynch);
			}
			xml.send(null);
		}else if(type=="post"){
				xml.open("post",option.url,asynch);
				xml.setRequestHeader("Content-Type","application/xwww-form-urlencoded");
			if(data){
				xml.send(data);
			}else{
				xml.send(null);
			}

		}
		xml.onreadystatechange=function(){
			if(xml.readyState==4&&xml.status==200){
				if(dataType=="text"){
					option.success(xml.responseText);
				}else if(dataType=="json"){
					var data=JSON.parse(xml.responseText)
					option.success(data);
				}else if(dataType=="xml"){
					option.success(xml.responseXML)
				}
				
			}	
		}
	}
// -------------------------------------------------------







