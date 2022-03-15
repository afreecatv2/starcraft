var temp = '서지수 박성진 초난강 정소윤 채린쟝 제동빠 철구 허유 피글렛 보혜 소룡이 전제민 하얀눈길 허진석,다린 랜딩 클템 트할 모토케이 서도일 쪼해피롱 크라운 토스봇 수입뿌드 강만식,보라 미키 세나 남덕선 또봉순 오뀨 빈스 불비 애공 안아 마이티베어 빵훈,별비 추르미 우힝이 유혜미 꼬꼬 조경훈 갈배 혜로로 파찌 럭뜨 하블리 귤 하곰 레이닝 김인호 린다랑 롤선생 오리3 이뀨 황핫바 알밤소녀 갱제 스맵 나는눈꽃 나는상윤 인나 하호키나비,나예리 다예 김요요 유복실 에스카 따냥잉 저라뎃 준밧드 초보원딜러 김구거 꿀비 물방개 콧등콧등 렘레미 오렌지 벤츠 최인해 상어녀 이온 최기명 슬아 기나 나나세 데인티 다나짱 효딤 순자21 최하니 라코 웃바 원창연 꼬니부깅 성예랑,경짱 야미 무찌 뽀누나 모꿀몬 뚜밥 소심 킴성태 싸패 샤코타임 여밍 앵지 란란 요닝 나무늘봉순 연어덮밥 천사윤 조오리 쿼드 오기 공춘리 토마토 디임 다연이 기룡이 지유 미니쉘 난초 시조새 블랙워크 두치와뿌꾸 호희 동겜누 하이루루 하리,혜라 구래햇살아 타요 이상호 오돌녀 늑대채린 이유란 오향 박사장 꿀탱탱 이주헌 햄찌 단잉 우리밍 구보라 팥순 홍이랑 하부기 도꿍 류하 꽃봄 라운이 지아 승하 안꼬,김레인 도읍지 강덕구 냥슬 최고요 수수한세리 여우비 혜윰 키모야 맛종욱 에이먼 마인 윤유연 임아니 구루미 오세블리 러아 파이 또비니 서윤 이톨 양양 깨박이 권지인 예원이 하두링 마꼬 강콩 뿌리 묘아 김무무 최도랑 감스트 쏘유 따뜻 최군 박투신 안겨 단아냥,지두두 만다 혜지연 유히루 강새이 홍혜리 엔돌핀 카히리 마우낭 하윰 매린 단양 섭이 남순 김민교 용느 심심한은비 슬랑이 예슬 이아린 맨만숙 박삐삐 차차피자 김보나 예리얌 박듀듀 흑설2 이루리 바미 쭈디,윤이나 밍찌니 강니니 덕순이 나는푸르 김순지 떙지 아라미누나 뽀라라 이백조 서리 다쁘 파닥,유영진 이재호 정영재 김지성 조기석 김명운 조일장 김민철 박상현 변현제 도재욱 장윤철 김윤중,최호선 몽군 임진묵 황병영 김태영 이영웅 김재현 이제동 홍구 김정우 김성대 김경모 유진우 송병구 정윤종 윤용태 윤수철 홍덕 원지훈 김범수,신상문 염보성 구성훈 흑운장 유승곤 정민기 박정일 김윤환 박재혁 한두열 서문지훈 이영한 이예훈 배병우 고석현 윤진규 얍삽e 배성흠 이경민 박수범 진영화 김승현 프발 손경훈 원선재,민찬기 전상욱 변형태 이윤열 기뉴다 지동원 이인극 박태민 박성준 김건욱 스틱 김학수 안기효 강민 전태규 라박이 이승훈 손석희 권혁진 난수 고도준 빡죠스';

//mergeRecord();
makeTier();

function mergeRecord(){
	for(k2 in mrecord_list2){
		record_list2[k2]=mrecord_list2[k2];
	}	
	for(var k3 in hrecord_list2){
		if(record_list2.hasOwnProperty(k3)){
			for(var i=0;i<hrecord_list2[k3].length;i++){
				record_list2[k3].push(hrecord_list2[k3][i]);
			}
		}else{
			record_list2[k3]=hrecord_list2[k3];
		}
	}
	
	console.log(JSON.stringify(record_list2));
}

function matchTier(){
	// var r = addInfo(bj_list2, mbj_list2);
	// r = addInfo(r, hbj_list2);	
	var r = bj_list;
	
	temp = temp.split(',');
	for(var i=0;i<temp.length;i++){
		var t = temp[i].split(' ');
		temp[i] = t;
	}

	var tl = [];
	for(var i=0;i<r.length;i++){
		tl[i] = [];
		tl[i].push(r[i][0]);
		tl[i].push(r[i][1]);
		tl[i].push(r[i][2]);
		var m = false;
		for(var j=0;j<temp.length;j++){
			for(var k=0;k<temp[j].length;k++){
				if(temp[j][k] == r[i][0]){
					m=true;
					var tier = j;
					if(tier ==10){
						tier = 'G';
					}else if(tier ==11){
						tier = 'K';
					}else if(tier ==12){
						tier = 'J';
					}else if(tier ==13){
						tier = 'R';
					}
					
					tl[i].push(tier);
					break;
				}
			}
			if(m){
				break;
			}
		}
		if(!m){
			tl[i].push(0);
		}
	}
	
	console.log(JSON.stringify(tl));
}


function addInfo(a, b){
	var r = a.slice();
	for(var i=0;i<b.length;i++){
		var m = false;
		for(var j=0;j<a.length;j++){
			if(b[i][0]==a[j][0]){
				m=true;
				break;
			}
		}
		if(!m){
			r.push(b[i]);
		}
	}
	return r;
}

function test(){
	var r = {};
	for(var k in record_list){
		r[k] = [];
		for(var i=0;i<record_list[k].length;i+=2){
			r[k].push(record_list[k][i]);			
		}
	}
	console.log(JSON.stringify(r));
}

function makeTier(){
	temp = temp.split(',');
	for(var i=0;i<temp.length;i++){
		var t = temp[i].split(' ');
		temp[i] = t;
	}
	log(temp.length);
	temp.splice(0, 0, temp[13]);
	temp.splice(14, 1);
	temp.splice(0, 0, temp[13]);
	temp.splice(14, 1);
	temp.splice(0, 0, temp[13]);
	temp.splice(14, 1);
	temp.splice(0, 0, temp[13]);
	temp.splice(14, 1);
	
	var bj_tier = [];
	for(var i=0;i<temp.length;i++){
		bj_tier[i] = [];
		for(var j=0;j<temp[i].length;j++){
			
			if(record_list.hasOwnProperty(temp[i][j])){
				bj_tier[i].push([temp[i][j],record_list[temp[i][j]][0][1].slice(0,1), record_list[temp[i][j]][0][9]]);
			}else{
				for(var k=0;k<bj_list.length;k++){
					if(temp[i][j]==bj_list[k][0]){
						bj_tier[i].push([temp[i][j],bj_list[k][1],'']);
						break;
					}					
				}
			}			
		}
	}
	
	
	
	
	bj_tier[0].splice(0,0,['갓','','']);
	bj_tier[1].splice(0,0,['킹','','']);
	bj_tier[2].splice(0,0,['잭','','']);
	bj_tier[3].splice(0,0,['조커','','']);
	bj_tier[4].splice(0,0,['0','','']);
	bj_tier[5].splice(0,0,['1','','']);
	bj_tier[6].splice(0,0,['2','','']);
	bj_tier[7].splice(0,0,['3','','']);
	bj_tier[8].splice(0,0,['4','','']);
	bj_tier[9].splice(0,0,['5','','']);
	bj_tier[10].splice(0,0,['6','','']);
	bj_tier[11].splice(0,0,['7','','']);
	bj_tier[12].splice(0,0,['8','','']);
	bj_tier[13].splice(0,0,['9','','']);
	
	log(JSON.stringify(bj_tier));
	
}
