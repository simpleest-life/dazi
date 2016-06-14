$(function(){
	var box=document.querySelector('.box');
	var data={}
	var shuliang=5;
	var createZimu=function(){
		do{var zimu=String.fromCharCode(Math.floor(Math.random()*26+97));}while(data[zimu])
		var el=document.createElement('div')
		var r=Math.floor(Math.random()*255)
		var b=Math.floor(Math.random()*255)
		var g=Math.floor(Math.random()*255)
		 // el.style.backgroundColor='rgb('+r+','+g+','+b+')'
        el.classList.add('zi')
        // 在div中添加一个类
        el.innerHTML=zimu;
        // 将随机的字母放到el中
        box.appendChild(el)	
        // 将el放到box中
        el.style.left=Math.random()*(box.offsetWidth-el.offsetWidth)+"px";
        // 获得在box宽度下的随机left值
        var ran=Math.ceil(Math.random()*5);
        // 获取一个1-5的随机数
        data[zimu]={top:0,yuansu:el,off:ran};
	}
	for(var i=0; i<shuliang;i++){
		createZimu();
		// 当小于数量时调用函数
	}
	var removeZimu=function(shan){
       
       var el=data[shan].yuansu;
        // 将date中的对象给了el
        el.parentElement.removeChild(el);
        // 将el从父元素中删除，界面删除
        delete data[shan];
        // 将他从对象中删除
	}
	document.onkeyup=function(e){
		if(e.keyCode==32){
			toggleGame();
			return false;
		};
    var key=String.fromCharCode(e.keyCode).toLowerCase();
    // 将大写的字母转化为unicode并转化为字符
    if(data[key]){
    	removeZimu(key)
    	createZimu();
    }
	}
	var diao=function(){
		var zimu=[];
		// 定义一个空数组
		for(var i in data){
         var zijihe=data[i];
         var el=zijihe.yuansu;
       zijihe.top+=zijihe.off;
       // 字母下落的高度
       el.style.top=zijihe.top+"px"
       // el下落的top值
       if(zijihe.top>box.offsetHeight){
       	zimu.push(i);
       	// 将下到底部的字母放到空数组中
       }
		}
		if(zimu.length){
			for(var i=0;i<zimu.length;i++){
				removeZimu(zimu[i])
				createZimu()
			}
		}
	}
	var timerId=setInterval(diao,20)
	// 时间函数
	var toggleGame=function(){
		if(timerId){
			clearInterval(timerId);
			timerId=null;
		}else{
			timerId=setInterval(diao,40)
		}
	}

	var startGame=function(){
		clearInterval(timerId)
		timerId=setInterval(diao,20)
		$('.start').css('display','none')
		$('.stop').css('display','block')
	}
	var stopGame=function(){
		clearInterval(timerId)
		$('.start').css('display','block')
		$('.stop').css('display','none')
		return;
	}
	$('.start').bind('click',startGame)
	    $('.stop').bind('click',stopGame)
	    var restart=function(){
	    	stopGame()
	    	she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
            timerId=null;
            fangxiang=39;
            $('.she').removeClass('she');
            $('.shiwu').removeClass('shiwu');
            $('li.active').removeClass('active')
			$(this).addClass('active')
            she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
            createZimu();
			diao();
			startGame();
	    }
})