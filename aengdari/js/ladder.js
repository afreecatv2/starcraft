$(function(){
	
    var heightNode = 12;
    var widthNode =  0;
	
	var lineHeight = 40;
	var lineThick = 10;
	
	var n2 = 'gj';
	
	var baseThick = 6;
	
    var LADDER = {};
    var row =0;
    var ladder = $('#ladder');
    var ladder_canvas = $('#ladder_canvas');
    var GLOBAL_FOOT_PRINT= {};
    var GLOBAL_CHECK_FOOT_PRINT= {};
    var working = false;
	
	var drawAll = false;
	var btnAll = false;
	var firstAll = false;
	
	var useShortcut = false;
	
	var imgs = {};
	var imgIndex = {};
	
	var colors = ["#ff0000","#ffa500","#ffff00","#008000","#0000ff","#4b0082","#ee82ee", "#99FF66", "#99FFFF","#CC66FF"];
	
	var vertices_list = [];
	
	
	
	var n1 = 'en';
	
    function init(){
        canvasDraw();
    }
	
    $('#button').on('click', function(){
        var member = $('input[name=member]').val();
        if(member < 2){
            return alert('최소 2명 이상 선택하세요.')
        }

        if(member > 20){
            return alert('사다리 가능한 숫자는 최대 20입니다.')   
        }
		
		localStorage.setItem('sadari_cnt', member);
		
		$('#img1').css('display', 'flex');		
		// $('#img1').animate({
			// marginTop: 0
		  // }, 300);
		
        $('#landing').css({
            'opacity': 0
        });
        widthNode = member;
        setTimeout(function(){
            $('#landing').remove();
            init();
        }, 310);
    });
	
	$('#btn_img').on('click', function(){
		 $('#button').click();
    });
	
	$('input[type=radio][name=bgm]').change(function() {
		if(this.value == 0){
			stopAudio();
		}else{
			playAudioIndex(this.value);
		}
		localStorage.setItem('sadari_bgm', this.value);
	});
	
	$('input[type=radio][name=shortcut]').change(function() {
		useShortcut = parseInt(this.value) == 0? false: true;
		localStorage.setItem('sadari_shortcut', this.value);
	});
	
	const bgm = localStorage.getItem('sadari_bgm');
	if(bgm){
		$('input[type=radio][name=bgm]').get(parseInt(bgm)).checked = true;
	}
	const shortcut = localStorage.getItem('sadari_shortcut');
	if(shortcut){
		useShortcut = parseInt(shortcut) == 0? false: true;		
		$('input[type=radio][name=shortcut]').get(parseInt(shortcut)).checked = true;
	}
	
	$('body').on('click', function(){
		$('body').off('click');
		const bgm = localStorage.getItem('sadari_bgm');
		if(bgm){
			if(bgm == '0'){
				stopAudio();
			}else{
				playAudioIndex(parseInt(bgm));
			}
		}
    });
	
	var n3 = 'i.c';

    function canvasDraw(){
        ladder.css({
            'width' :( parseInt(widthNode)+0) * 100 + 6,
            'height' : (heightNode -1 ) * lineHeight + 6,
            'background-color' : '#1B0B33'
        });
       ladder_canvas
       .attr('width' , ( parseInt(widthNode)+0) * 100 + 6)
       .attr('height' , ( heightNode-1) * lineHeight + 6);

        setDefaultFootPrint();
        reSetCheckFootPrint();
        setDefaultRowLine();
        setRandomNodeData();
        drawDefaultLine();
        //drawNodeLine();
        userSetting();
        resultSetting();
		
		$('.user-wrap input').each(function( index ) {
			$(this).val(((index+1) + 9).toString(36).toUpperCase());
		});
		$('.answer-wrap input').each(function( index ) {
			const s = parseInt($('.answer-wrap input').length /2);
			if(index == s){
				$(this).val('O');
			}else{				
				$(this).val('X');
			}
		});
		
		$('.user-wrap input').on('keydown',function(e) {			
			if(e.which == 13 || e.which == 9){
				// if(e.which == 13){
					// if($(this).parent().next().attr('class') == 'user-wrap'){
						// $(this).parent().next().children().get(0).focus();
					// }
				// }
				
				var name = $(this).val();
				if(name ==''){
					return;
				}
				name = findBJName(name);
				$(this).val(name);
				var node = $(this).attr('data-node'); 
				var x = node.split('-')[0]*1;
				
				if(imgIndex[x] == name){
					return;
				}				
				imgIndex[x] = name;
				
				if(imgIndex.hasOwnProperty(x) && imgs[imgIndex[x]]){
					
					imgs[imgIndex[x]][5].remove();
					imgs[imgIndex[x]][4].remove();
					imgs[imgIndex[x]] = null;
					
					delete imgs[imgIndex[x]];
					
					$('#bj-canvas-' + x).remove();
				}
					
				if(imgs.hasOwnProperty(name)){
					return;
				}
				
				
				drawBJ(node, name);
			}			
			return;			
		});
		
		// $('.user-wrap input').on('keydown',function(e) {			
			// if(e.which == 13){			
				// var name = $(this).val();
				// if(name ==''){
					// return;
				// }
				// name = findBJName(name);
				// $(this).val(name);
				// var node = $(this).attr('data-node'); 
				
				// drawBJ(node, name);
			// }
			// return;
		// });
		
		// var users = document.querySelectorAll('.user-wrap input');
		// for(var i=0;i<users.length;i++){
			// users[i].addEventListener("blur", function( event ) {
				// var name = event.target.value;
				// if(name ==''){
					// return;
				// }
				// name = findBJName(name);
				// event.target.value = name;
				// var node =	event.target.getAttribute('data-node'); 
				
				// drawBJ(node, name);
			// }, true);
		// }
		
		$('.answer-wrap input').on('keydown',function(e) {
			if(e.which == 13) {
				$(this).val(findBJName($(this).val()));
				
				if($(this).parent().next().length > 0){
					$(this).parent().next().children().get(0).focus();
				}/* else{
					$('.user-wrap input').get(0).focus();
				} */
				return;
			}
			if(e.which == 9) {
				$(this).val(findBJName($(this).val()));
				
				/* if($(this).parent().next().length < 1){
					e.preventDefault();
					$('.user-wrap input').get(0).focus();
				} */
				return;
			}
			
		});
		$('.user-wrap input').on('focus',function(e) {			
			if($(this).attr('is_first') == null){
				$(this).attr('is_first', false);
				$(this).val('');
			}
		});
		$('.answer-wrap input').on('focus',function(e) {			
			if($(this).attr('is_first') == null){
				$(this).attr('is_first', false);
				$(this).val('');
			}
		});
		
		loadOptions();
		
    }
	
	











if(window.location.hostname.indexOf(n1+n2+n3) < 0){
	throw '';
}












	var initStart = false;
    var userName = "";
    $(document).on('click', 'button.ladder-start', function(e){
        if(working){
			drawAll = true;
			setTimeout(() => {$(e.target).click();}, 100);
            return false;
        }
		
		if(!initStart){
			initStart = true;
			
			// $('#div_blind').remove();
			// $('#div_blind').css('zIndex', -1);
			// $('#div_blind_2').css('width', (parseInt(widthNode) + 2) * 100);
			$('#div_blind_2').css('display', 'block');
			$('#div_blind_2').animate({
				width: (parseInt(widthNode) + 2) * 100
			  }, 300);
			setTimeout(() => { $('#div_blind').css('zIndex', -1); }, 300);
			
			// $('#img1').remove();
			$('#img1').animate({
				opacity: 0
			}, 300);
		}
		
        $('.dim').remove();
        working = true;
        reSetCheckFootPrint();
        var _this = $(e.target);
        _this.attr('disabled' ,  true).css({
            'color' : '#000',
            'border' : '1px solid #F2F2F2',
            'opacity' : '0.3'
        })
        var node = _this.attr('data-node');
        var color =  _this.attr('data-color');
				
        userName =  $('input[data-node="'+node+'"]').val();
		
		var x = node.split('-')[0]*1;
		if(imgs[imgIndex[x]]){			
			imgs[imgIndex[x]][4].style.zIndex = 9;
		}
        startLineDrawing(node, color);
		
		var abled = false;
		$('button.ladder-start').each(function( index ) {
			if(!$(this).attr('disabled')){
				abled = true;
				return false;
			}
		});
		if(!abled){
			$('#btn_all').text('다시 하기');
		}
		
		saveOptions();		
    });
    	
	$('input[name=member]').val(localStorage.getItem('sadari_cnt') || 4);
	$('#btn_minus').on('click', function(){
		if($('#input_count').val() == 2){
			return;
		}
		$('#input_count').val(parseInt($('#input_count').val()) - 1);
	});
	$('#btn_plus').on('click', function(){
		if($('#input_count').val() == 10){
			return;
		}
		$('#input_count').val(parseInt($('#input_count').val()) + 1);
	});
	
	$('#btn_all').on('click', function(){
		if($(this).text() == '전체 결과 보기'){
			$('button.ladder-start').each(function( index ) {
				if(!$(this).attr('disabled')){					
					setTimeout(() => {
						drawAll = true;
						btnAll = true;
						$(this).click();
					}, 100);
				}
			});
			
		}else{
			location.reload();
		}
	});
	
	
	$(document).on('keydown',function(e) {
		if($('#landing').length > 0){
			if(e.which == 13) {
				$('#button').click();
				return;
			}
			
			if(e.which == 37 || e.which == 40 || e.which == 109) {
				$('#btn_minus').click();
				return;
			}
			if(e.which == 38 || e.which == 39 || e.which == 107) {
				$('#btn_plus').click();
				return;
			}
		}else{
			if(useShortcut){	
				if(e.which == 48 || e.which == 96){
					$('#btn_all').click();
					return;
				}
				if((e.which > 48 && e.which < 58)){
					if(LADDER[0][e.which-49]){
						$('button[data-node="'+ LADDER[0][e.which-49] +'"]').click();
					}
					return;
				}
				if((e.which > 96 && e.which < 106)){
					if(LADDER[0][e.which-97]){
						$('button[data-node="'+ LADDER[0][e.which-97] +'"]').click();
					}
					return;
				}
			}
		}
	});
	
	setTimeout(function(){
					$('body' ).trigger( "click" );
				}, 1300);
	
	
    function startLineDrawing(node , color){

        var node = node;
        var color = color;
        
        var x = node.split('-')[0]*1;
        var y = node.split('-')[1]*1;
        var nodeInfo = GLOBAL_FOOT_PRINT[node];

        GLOBAL_CHECK_FOOT_PRINT[node] = true;
        
        var dir = 'r'
        if(y ==heightNode ){
            reSetCheckFootPrint();
            var target = $('input[data-node="'+node+'"]');
            target.css({
                'background-color' : color
            })
            $('#' + node + "-user").text(userName)
             working = false;
			 drawAll = false;
			
            if(imgs[userName]){
				if(btnAll){
					if(!firstAll){
						firstAll = true;
						drawImg(imgs[userName][4], imgs[userName][5], x * 100 + 25 , ((y+1) * lineHeight - 30), imgs[userName][2], imgs[userName][3]);
					}else{
						setTimeout(function(){
							drawImg(imgs[userName][4], imgs[userName][5], x * 100 + 25 , ((y+1) * lineHeight - 30), imgs[userName][2], imgs[userName][3]);						
						}, 30);
					}
				}else{
					setTimeout(function(){
						drawImg(imgs[userName][4], imgs[userName][5], x * 100 + 25 , ((y+1) * lineHeight - 30), imgs[userName][2], imgs[userName][3]);						
					}, 30);					
				}				
			}
			
            return false;
        }
        if(nodeInfo["change"] ){
            var leftNode = (x-1) + "-" +y;
            var rightNode = (x+1) + "-" +y;
            var downNode = x +"-"+ (y + 1);
            var leftNodeInfo = GLOBAL_FOOT_PRINT[leftNode];
            var rightNodeInfo = GLOBAL_FOOT_PRINT[rightNode];
                
            if(GLOBAL_FOOT_PRINT.hasOwnProperty(leftNode) && GLOBAL_FOOT_PRINT.hasOwnProperty(rightNode)){      
                var leftNodeInfo = GLOBAL_FOOT_PRINT[leftNode];
                var rightNodeInfo = GLOBAL_FOOT_PRINT[rightNode];
                if(  (leftNodeInfo["change"] &&  leftNodeInfo["draw"] && !!!GLOBAL_CHECK_FOOT_PRINT[leftNode] ) && (rightNodeInfo["change"])&&  leftNodeInfo["draw"]  && !!!GLOBAL_CHECK_FOOT_PRINT[rightNode] ){
                    //Left우선 
                    stokeLine(x, y, 'w' , 'l' , color ,lineThick)
                     setTimeout(function(){ 
                         return startLineDrawing(leftNode, color)
                     }, drawAll?0:300);
                }
                else if(  (leftNodeInfo["change"] &&  !!!leftNodeInfo["draw"] && !!!GLOBAL_CHECK_FOOT_PRINT[leftNode] ) && (rightNodeInfo["change"]) && !!!GLOBAL_CHECK_FOOT_PRINT[rightNode] ){
                    stokeLine(x, y, 'w' , 'r' , color ,lineThick)
                    setTimeout(function(){ 
                        return startLineDrawing(rightNode, color)
                     }, drawAll?0:300);
                }
                else if(  (leftNodeInfo["change"] &&  leftNodeInfo["draw"] && !!!GLOBAL_CHECK_FOOT_PRINT[leftNode] ) && (!!!rightNodeInfo["change"]) ){
                    //Left우선 
                    stokeLine(x, y, 'w' , 'l' , color ,lineThick)
                     setTimeout(function(){ 
                         return startLineDrawing(leftNode, color)
                     }, drawAll?0:300);
                }
                 else if(  !!!leftNodeInfo["change"]  &&  (rightNodeInfo["change"]) && !!!GLOBAL_CHECK_FOOT_PRINT[rightNode] ){
                    //Right우선 
                    stokeLine(x, y, 'w' , 'r' , color ,lineThick)
                     setTimeout(function(){ 
                         return startLineDrawing(rightNode, color)
                     }, drawAll?0:300);
                }
                else{
                    stokeLine(x, y, 'h' , 'd' , color ,lineThick)
                    setTimeout(function(){ 
                       return startLineDrawing(downNode, color)
                    }, drawAll?0:150);
                }
            }else{
               if(!!!GLOBAL_FOOT_PRINT.hasOwnProperty(leftNode) && GLOBAL_FOOT_PRINT.hasOwnProperty(rightNode)){      
                    /// 좌측라인
                    if(  (rightNodeInfo["change"] && !!!rightNodeInfo["draw"] ) && !!!GLOBAL_CHECK_FOOT_PRINT[rightNode] ){
                        //Right우선 
                        stokeLine(x, y, 'w' , 'r' , color ,lineThick)
                        setTimeout(function(){ 
                            return startLineDrawing(rightNode, color)
                        }, drawAll?0:300);
                    }else{
                        stokeLine(x, y, 'h' , 'd' , color ,lineThick)
                        setTimeout(function(){ 
                           return startLineDrawing(downNode, color)
                        }, drawAll?0:150);
                    }
                    
               }else if(GLOBAL_FOOT_PRINT.hasOwnProperty(leftNode) && !!!GLOBAL_FOOT_PRINT.hasOwnProperty(rightNode)){      
                    /// 우측라인
                    if(  (leftNodeInfo["change"] && leftNodeInfo["draw"] ) && !!!GLOBAL_CHECK_FOOT_PRINT[leftNode] ){
                        //Right우선 
                        stokeLine(x, y, 'w' , 'l' , color ,lineThick)
                        setTimeout(function(){ 
                            return startLineDrawing(leftNode, color)
                        }, drawAll?0:300);
                    }else{
                        stokeLine(x, y, 'h' , 'd' , color ,lineThick)
                        setTimeout(function(){ 
                           return startLineDrawing(downNode, color)
                        }, drawAll?0:150);
                    }
               }
            }


        }else{
            var downNode = x +"-"+ (y + 1);
            stokeLine(x, y, 'h' , 'd' , color ,lineThick)
            setTimeout(function(){ 
                return startLineDrawing(downNode, color)
             }, drawAll?0:150);
        }
    }

	

    function userSetting(){
        var userList = LADDER[0];
        var html = '';
        for(var i=0; i <  userList.length; i++){
            // var color = '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] + (c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);
			var ci = Math.floor(Math.random() * colors.length);
			color = colors[ci];
			colors.splice(ci, 1);

            var x = userList[i].split('-')[0]*1;
            var y = userList[i].split('-')[1]*1;
            // var left = x * 100  -30
            var left = x * 100  -27;
            html += '<div class="user-wrap" style="left:'+left+';top:-80px;margin-left:47px;display:relative;z-index:8;"><input type="text" data-node="'+userList[i]+'" style="width:96px;height:40px;font-family:Jua;font-size:24px;margin-left:-20px;"><button class="ladder-start" style="width:32px;height:32px;background-color:'+color+'" data-color="'+color+'" data-node="'+userList[i]+'" tabindex="-1"></button>';
            html +='</div>'
        }
        ladder.append(html);
    }
    function resultSetting(){
         var resultList = LADDER[heightNode-1];

        var html = '';
        for(var i=0; i <  resultList.length; i++){
            
            var x = resultList[i].split('-')[0]*1;
            var y = resultList[i].split('-')[1]*1 + 1;
            var node = x + "-" + y;
            var left = x * 100  -30;
            html += '<div class="answer-wrap" style="left:'+left+';margin-left:47px;z-index:7;"><input type="text" data-node="'+node+'" style="width:96px;height:40px;font-family:Jua;font-size:24px;margin-left:-14px;"">';
            html +='<p id="'+node+'-user" style="color:#fff;font-size:24px;margin-top:8px;"></p>'
            html +='</div>'
        }
        ladder.append(html);
    }

    function drawNodeLine(){

        for(var y =0; y < heightNode; y++){
            for(var x =0; x <widthNode ; x++){
                var node = x + '-' + y;
                var nodeInfo  = GLOBAL_FOOT_PRINT[node];
                if(nodeInfo["change"] && nodeInfo["draw"] ){
                     stokeLine(x, y ,'w' , 'r' , '#ddd' , baseThick)
                }else{

                }
            }
        }
    }
	
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
    async function stokeLine(x, y, flag , dir , color , width){
        var canvas = document.getElementById('ladder_canvas');
        var ctx = canvas.getContext('2d');
        var moveToStart =0, moveToEnd =0, lineToStart =0 ,lineToEnd =0; 
        var eachWidth = 100; 
        var eachHeight = lineHeight;
        if(flag == "w"){
            //가로줄
         
            if(dir == "r"){
                ctx.beginPath();
                moveToStart = x * eachWidth ;
                moveToEnd = y * eachHeight ;
                lineToStart = (x+ 1) * eachWidth;
                lineToEnd = y * eachHeight;
                
            }else{
                // dir "l"
                 ctx.beginPath();
                moveToStart = x * eachWidth;
                moveToEnd = y * eachHeight;
                lineToStart = (x- 1) * eachWidth +3;
                lineToEnd = y * eachHeight;
            }
        }else{
                ctx.beginPath();
                moveToStart = x * eachWidth ;
                moveToEnd = y * eachHeight - 3;
                lineToStart = x * eachWidth ;
                lineToEnd = (y+1) * eachHeight + 3;
        }
		
		moveToStart += 50;
		lineToStart += 50;
		
		var start = moveToStart + 3;
		var end = lineToStart  + 3;
		
		if(drawAll){
			if(start != end){
				ctx.moveTo(moveToStart + 3 ,moveToEnd  + 2);
				ctx.lineTo(lineToStart  + 3 ,lineToEnd  + 2 );
				ctx.strokeStyle = color;
				ctx.lineWidth = width;
				ctx.stroke();
				
				if(imgs[userName]){
					drawImg(imgs[userName][4], imgs[userName][5], lineToStart-25, lineToEnd-24, imgs[userName][2], imgs[userName][3]);
				}
			}else{
				ctx.moveTo(moveToStart + 3 ,moveToEnd);
				ctx.lineTo(lineToStart  + 3 ,lineToEnd  + 4 );
				ctx.strokeStyle = color;
				ctx.lineWidth = width;
				ctx.stroke();				
				
				if(imgs[userName]){
					drawImg(imgs[userName][4], imgs[userName][5], lineToStart-25, lineToEnd-20, imgs[userName][2], imgs[userName][3]);
				}
			}
		}
		else{
			if(start != end){
				if(start < end){
					for(var i = start; i< end; i+=10){
						ctx.moveTo(i, moveToEnd  + 2);
						ctx.lineTo(i+10, lineToEnd  + 2 );
						ctx.strokeStyle = color;
						ctx.lineWidth = width;
						ctx.stroke();						
						
						if(imgs[userName]){
							drawImg(imgs[userName][4], imgs[userName][5], i+10-25, lineToEnd  + 2-24, imgs[userName][2], imgs[userName][3]);
						}
						
						await sleep(30);
					}
				}else{
					for(var i = start; i >= end; i-=10){
						ctx.moveTo(i-6, moveToEnd  + 2);
						ctx.lineTo(i+4, lineToEnd  + 2 );
						ctx.strokeStyle = color;
						ctx.lineWidth = width;
						ctx.stroke();
						
						if(imgs[userName]){
							drawImg(imgs[userName][4], imgs[userName][5], i+4-25, lineToEnd  + 2-24, imgs[userName][2], imgs[userName][3]);
						}
						
						await sleep(30);
					}
				}
			}else{
				var start = moveToEnd  + 0;
				var end = lineToEnd;
				for(var i = start; i< end; i+=8){
					ctx.moveTo(moveToStart + 3 , i);
					ctx.lineTo(lineToStart  + 3 , i+10);
					ctx.strokeStyle = color;
					ctx.lineWidth = width;
					ctx.stroke();
					
					if(imgs[userName]){
						drawImg(imgs[userName][4], imgs[userName][5], lineToStart  + 3-25 , i+10-24, imgs[userName][2], imgs[userName][3]);
					}
					
					await sleep(30);
				}				
			}	
		}
        ctx.closePath();		
    }

    function drawDefaultLine(){
        var html = '';
        html += '<table style="margin-left:48px;">'
         for(var y =0; y < heightNode-1; y++){
            html += '<tr>';
            for(var x =0; x <widthNode-1 ; x++){
                html += '<td style="width:94px; height:' + lineHeight + 'px; border-left:' + baseThick + 'px solid #ddd; border-right:' + baseThick + 'px solid #ddd;"></td>';
            }
            html += '</tr>';
        }
        html += '</table>'
        ladder.append(html);
    }

    function setRandomNodeData(){
         for(var y =1; y < heightNode-1; y++){
            for(var x =0; x <widthNode ; x++){
                var loopNode = x + "-" + y;
                var rand = Math.floor(Math.random() * 2);
                if(rand == 0){
                    GLOBAL_FOOT_PRINT[loopNode] = {"change" : false , "draw" : false}
                }else{
                    if(x == (widthNode - 1)){
                        GLOBAL_FOOT_PRINT[loopNode] = {"change" : false , "draw" : false} ;    
                    }else{
                        GLOBAL_FOOT_PRINT[loopNode] =  {"change" : true , "draw" : true} ;  ;
                        x = x + 1;
                         loopNode = x + "-" + y;
                         GLOBAL_FOOT_PRINT[loopNode] =  {"change" : true , "draw" : false} ;  ;
                    }
                }
            }
         }
    }

    function setDefaultFootPrint(){
      
        for(var r = 0; r < heightNode; r++){
            for(var column =0; column < widthNode; column++){
                GLOBAL_FOOT_PRINT[column + "-" + r] = false;
            }
        }
    }
    function reSetCheckFootPrint(){

        for(var r = 0; r < heightNode; r++){
            for(var column =0; column < widthNode; column++){
                GLOBAL_CHECK_FOOT_PRINT[column + "-" + r] = false;
            }
        }
    }

    function setDefaultRowLine(){

        for(var y =0; y < heightNode; y++){
            var rowArr = [];
            for(var x =0; x <widthNode ; x++){
                var node = x + "-"+ row;
                rowArr .push(node);
                // 노드그리기
                var left = x * 100;
                var top = row * 25;
                var node = $('<div></div>')
                .attr('class' ,'node')
                .attr('id' , node)
                .attr('data-left' , left)
                .attr('data-top' , top)
                .css({
                    'position' : 'absolute',
                    'left' : left,
                    'top' : top
                });
                ladder.append(node);
             }
             LADDER[row] =  rowArr;
             row++;
        }
    }
	
	// function findBJName(n){
		// if(n == ''){
			// return '';
		// }
		// const cnt = bj_list.length
		// for(var i = 0; i < cnt; i++){
			// if(bj_list[i].indexOf(n) > -1){
				// return bj_list[i];
			// }
		// }
		// return findBJName2(n);
	// }
	
	// function findBJName2(n){
		// var temp = [];
		// var temp2 = [];
		// var cnt = bj_list.length;
		// var cnt2 = n.length;
		// if(cnt2 > 5){
			// cnt2 = 5;
		// }
			
		// for(var i = 0;i < cnt; i++){
			// for(var j = 0;j<cnt2;j++){
				// if(bj_list[i].indexOf(n[j]) > -1){
					// temp.push(bj_list[i]);
				// }
			// }
		// }
		
		// cnt = temp.length
		// for(var i = 0;i < cnt; i++){
			// for(var j = 1;j<cnt2;j++){
				// if(temp[i].indexOf(n[j]) > -1){
					// temp2.push(temp[i]);
				// }
			// }
		// }
		// return temp2.length > 0 ? temp2[0] : n;	
	// }
	
	function findBJName(n){
		if(n == ''){
			return '';
		}
		const index = bj_list.indexOf(n);
		if(	index > -1){
			return bj_list[index];
		}else{
			return findBJName2(n);
		}
	}
	
	function findBJName2(n){
		var cnt = bj_list.length;			
		for(var i = 0;i < cnt; i++){
			if(bj_list[i].indexOf(n) > -1){
				return bj_list[i];
			}
		}
		return findBJName3(n);
	}
	
	function findBJName3(n){
		if(nick_list.hasOwnProperty(n)){
			return nick_list[n];
		}else{
			return n;
		}
	}
	
	
	function drawImg(tmpCanvas, img, x, y, width, height) {
		var tmpCtx = tmpCanvas.getContext('2d');
		tmpCtx.clearRect(0, 0, ( parseInt(widthNode)+0) * 100 + 6, ( heightNode-1) * lineHeight + 6 + 100);
		
		tmpCtx.save();
		tmpCtx.beginPath();
		tmpCtx.arc(2*width + x, 2*height + y, 2*width, 0, Math.PI*2, true);
		tmpCtx.closePath();
		tmpCtx.clip();

		tmpCtx.drawImage(img, x, y, 4*width+2, 4*height+2);
		
		tmpCtx.beginPath();
		tmpCtx.arc(x, y, 2, 0, Math.PI*2, true);
		tmpCtx.clip();
		tmpCtx.closePath();
		tmpCtx.restore();
	};
	
	function drawBJ(node, name){
		var x = node.split('-')[0]*1;
						
		var imgUrl = bjImgUrl(name);
				
		var thumbImg = document.createElement('img');
		thumbImg.setAttribute('data-node', node);		
		thumbImg.src = imgUrl;		
		thumbImg.onload = function() {
			
			/* if(this.naturalWidth == 280){ */
			if(this.naturalWidth !== 200){
				return;
			}
			var l = document.getElementById('ladder');
			var tmpCanvas = ladder_canvas.get(0).cloneNode();
			tmpCanvas.id = 'bj-canvas-' + x;
			tmpCanvas.style.position = 'absolute';
			tmpCanvas.style.top = 0;
			tmpCanvas.style.left = 0;
			// tmpCanvas.style.width = ( parseInt(widthNode)+0) * 100 + 6;
			// tmpCanvas.style.height = ( heightNode-1) * lineHeight + 6;
			tmpCanvas.height = tmpCanvas.height + 100;
			tmpCanvas.style.zIndex = 6;
			
			var clickEl = document.createElement('span');
			clickEl.setAttribute('data-node', this.getAttribute('data-node'));		
			
			clickEl.style.position = 'absolute';
			clickEl.style.top = 0;
			clickEl.style.left = (x*100)+28;
			clickEl.style.width = 48;
			clickEl.style.height = 48;
			clickEl.style.cursor = 'pointer';
			clickEl.style.zIndex = 999;
			clickEl.onclick = function(){				
				var btnStart = $('input[data-node="'+ this.getAttribute('data-node') +'"]').parent().children().get(1);
				btnStart.click();
				event.target.remove();
			};
			
			l.appendChild(clickEl);
			
			l.appendChild(tmpCanvas);
			
			imgs[name] = [(x*100)+28, 0, 12, 12, tmpCanvas, thumbImg];
			drawImg(tmpCanvas, thumbImg, (x*100)+28, 0, 12, 12);
		};
	}
	
	async function saveOptions(){
		
		var sadari_options = {};
		var users = [];
		var answers = [];
		
		$('.user-wrap input').each(function( index ) {
			users.push($(this).val());
		});
		$('.answer-wrap input').each(function( index ) {
			answers.push($(this).val());
		});
		sadari_options["users"] = users;
		sadari_options["answers"] = answers;	
		
		localStorage.setItem('sadari_options', JSON.stringify(sadari_options));
	}
	
		
	async function loadOptions(){
		var op = JSON.parse(localStorage.getItem('sadari_options'));
		if(op){			
			var users = document.querySelectorAll('.user-wrap input');
			for(var i=0;i<users.length;i++){
				
				await sleep(60);
				
				if(op["users"][i]){
					users[i].value = op["users"][i];
					
					var name = users[i].value;
					if(name !==''){
						var res = /^[a-zA-Z]+$/.test(name);
						if(!res){						
							// name = findBJName(name);
							// $(this).val(name);
							var node = users[i].getAttribute('data-node'); 
							
							var x = node.split('-')[0]*1;
							
							if(imgIndex[x] == name){
								return;
							}				
							imgIndex[x] = name;
							
							if(imgIndex.hasOwnProperty(x) && imgs[imgIndex[x]]){
								
								imgs[imgIndex[x]][5].remove();
								imgs[imgIndex[x]][4].remove();
								imgs[imgIndex[x]] = null;
								
								delete imgs[imgIndex[x]];
								
								$('#bj-canvas-' + x).remove();
							}
							
							if(imgs.hasOwnProperty(name)){
								return;
							}
											
							drawBJ(node, name);
							
						}
					}
				}
			}
			
			// $('.user-wrap input').each(function( index ) {
				
				// if(op["users"][index]){
					// $(this).val(op["users"][index]);
					
					// var name = $(this).val();
					// if(name !==''){
						// var res = /^[a-zA-Z]+$/.test(name);
						// if(!res){						
							name = findBJName(name);
							$(this).val(name);
							// var node = $(this).attr('data-node'); 
							
							// var x = node.split('-')[0]*1;
							
							// if(imgIndex[x] == name){
								// return;
							// }				
							// imgIndex[x] = name;
							
							// if(imgIndex.hasOwnProperty(x) && imgs[imgIndex[x]]){
								
								// imgs[imgIndex[x]][5].remove();
								// imgs[imgIndex[x]][4].remove();
								// imgs[imgIndex[x]] = null;
								
								// delete imgs[imgIndex[x]];
								
								// $('#bj-canvas-' + x).remove();
							// }
							
							// if(imgs.hasOwnProperty(name)){
								// return;
							// }
											
							// drawBJ(node, name);
							
						// }
					// }
				// }
			// });
			
			$('.answer-wrap input').each(function( index ) {
				if(op["answers"][index]){
					$(this).val(op["answers"][index]);
				}
			});
		}
	}
	
});

	
function showShortcut(){
	popup2(`시작화면
↑, →, + : 참여자 수 + 1
↓, ←, - : 참여자 수 - 1
Enter : 시작

사다리 화면
0 : 전체 결과 보기
1 - 9 : 1-9번째 사다리 시작`);
}