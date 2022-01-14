// 以下の{}は1秒ごとの時間表示のためのもの。{}でスコープを分けている。
{
	function showTime(){
		//右辺で現在の時間を取得、左辺のdateは何でもいい
		const date = new Date();                                              
		const aryWeek = ['日', '月', '火', '水', '木', '金', '土'];
		text = date.getFullYear() + '年' + //年の取得
					(date.getMonth() + 1) + '月' + //月の取得 ※0~11で取得になるため+1
					date.getDate() + '日' + //日付の取得
					'(' + aryWeek[date.getDay()] + ')' + //曜日の取得 0~6で取得になるため事前に配列で設定
					date.getHours() + '時' + //時間の取得
					date.getMinutes() + '分' + //分の取得
					date.getSeconds() + '秒'; //秒の取得

		document.getElementById('nowTime').innerHTML=text;
	}
	showTime();
	// 1秒ごとに更新
	setInterval(showTime, 1000)
}


//右辺で現在の時間を取得、左辺のdateは何でもいい
const date = new Date();                                              
const aryWeek = ['日', '月', '火', '水', '木', '金', '土'];
text = date.getFullYear() + '年' + //年の取得
			(date.getMonth() + 1) + '月' + //月の取得 ※0~11で取得になるため+1
			date.getDate() + '日' + //日付の取得
			'(' + aryWeek[date.getDay()] + ')' + //曜日の取得 0~6で取得になるため事前に配列で設定
			date.getHours() + '時' + //時間の取得
			date.getMinutes() + '分' + //分の取得
			date.getSeconds() + '秒'; //秒の取得
console.log(text);


time = date.getHours() + '時' + //時間の取得
					date.getMinutes() + '分' ; //分の取得
console.log(time);


//カレンダーの初期値を今日の日付にする
const yyyy=date.getFullYear();
//十の位が0の月日は一桁の数字で得られるが、欲しいのは二桁の数字。文字列として頭に0をつけてから下二桁を取得している。例えば1月のとき01月と表示するため
//sliceは数値の切り抜き
const mm=("0"+(date.getMonth()+1)).slice(-2);
const dd = ("0"+date.getDate()).slice(-2);
//javascriptからhtmlに値を渡す
document.getElementById("enterCalendar").value=yyyy+'-'+mm+'-'+dd;
document.getElementById("outCalendar").value=yyyy+'-'+mm+'-'+dd;

//セレクトボックスの初期値を現在時刻にする
const selectEhour = document.getElementById("ehour");
selectEhour.options[date.getHours()].selected = true
const selectEminute = document.getElementById("eminute");
selectEminute.options[date.getMinutes()].selected = true
const selectOhour = document.getElementById("ohour");
selectOhour.options[date.getHours()].selected = true
const selectOminute = document.getElementById("ominute");
selectOminute.options[date.getMinutes()].selected = true




//料金計算ボタンがクリックされた時の処理
function butotnClick(){  

	//ここから料金計算
	//計算は駐車時間10日間までを想定
	//文字列の切り出し 最初の数字がずれてる気がするがなぞ
	const emonth=enterCalendar.value.substr(5,2);
	const eday=enterCalendar.value.substr(8,2);
	const omonth=outCalendar.value.substr(5,2);
	const oday=outCalendar.value.substr(8,2);
	//Number();で数値に変換、これをしないと文字列になる
	const enterMonth=Number(emonth);  
	const enterDay=Number(eday);
	const enterHour=Number(ehour.value);
	const enterMinute=Number(eminute.value);
	//入庫から年をまたいで出庫月が1月だったら1月を13月とみなすからoutMonthはletで定義
	let outMonth=Number(omonth);
	const outDay=Number(oday);
	const outHour=Number(ohour.value);
	const outMinute=Number(ominute.value);
	betweenMonth=outMonth-enterMonth;

	if(enterMonth===outMonth){
		betweenDay=outDay-enterDay;
	}else{  //月をまたぐ場合
		if(outMonth===1){
			outMonth=13;
		}          
		if(enterMonth===1 || enterMonth===3 || enterMonth===5 || enterMonth===7 || enterMonth===8 || enterMonth===10 || enterMonth===12){
			betweenDay=31-enterDay+outDay;
		}else if(enterMonth===2){  //2月は28日までとする(うるう年は考慮してない)
			betweenDay=28-enterDay+outDay;
		}else{
			betweenDay=30-enterDay+outDay;
		}
	}
	const priceMax=1000;


	//入庫した日に出庫する場合
	if(betweenDay===0){ 
		if(enterMinute<=outMinute){
			betweenHour=outHour-enterHour;
			betweenMinute=outMinute-enterMinute;
		}else{
			betweenHour=outHour-enterHour-1;
			betweenMinute=60-enterMinute+outMinute;
		}
		
		
		if(enterHour<8){  // enterHour < 8
			if(outHour<8){  // outHour < 8
				price=betweenHour*100+100;
			}else if(outHour>=8 && outHour<20){ // 8 <= outHour < 20
				betweenHourFirst=7-enterHour;
				betweenMinuteFirst=60-enterMinute;
				betweenHourSecond=outHour-8;
				betweenMinuteSecond=outMinute;
				/*
				console.log(`駐車時間(0時から8時):${betweenHourFirst}時間${betweenMinuteFirst}分`);
				console.log(`駐車時間(8時から20時):${betweenHourSecond}時間${betweenMinuteSecond}分`);*/
				
				priceFirst=betweenHourFirst*100+100;
				if(betweenMinuteSecond<30){
					priceSecond=betweenHourSecond*200+100;
				}else{
					priceSecond=betweenHourSecond*200+200;
				}
				if(priceSecond>1000){
					priceSecond=priceMax;
				}
				price=priceFirst+priceSecond;
				
			}else{  // 20 <= outHour
				betweenHourFirst=7-enterHour;
				betweenMinuteFirst=60-enterMinute;
				betweenHourSecond=12;
				betweenMinuteSecond=0;
				betweenHourThird=outHour-20;
				betweenMinuteThird=outMinute;
				/*
				console.log(`駐車時間(0時から8時):${betweenHourFirst}時間${betweenMinuteFirst}分`);
				console.log(`駐車時間(8時から20時):${betweenHourSecond}時間${betweenMinuteSecond}分`);
				console.log(`駐車時間(20時から24時):${betweenHourThird}時間${betweenMinuteThird}分`);*/
				priceFirst=betweenHourFirst*100+100;
				priceSecond=priceMax;
				priceThird=betweenHourThird*100+100;
				price=priceFirst+priceSecond+priceThird;
			}
		}else if(enterHour>=8 && enterHour<20){ // 8 <= enterHour < 20
			if(outHour>=8 && outHour<20){  // 8 <= outHour < 20
				if(betweenMinute<30){
					price=betweenHour*200+100;
				}else{
					price=betweenHour*200+200;
				}
				if(price>1000){
					price=priceMax;
				}
			}else{  // 20 <= outHour
				betweenHourFirst=19-enterHour;
				betweenMinuteFirst=60-enterMinute;
				betweenHourSecond=outHour-20;
				betweenMinuteSecond=outMinute;
				/*
				console.log(`駐車時間(0時から8時):${betweenHourFirst}時間${betweenMinuteFirst}分`);
				console.log(`駐車時間(8時から20時):${betweenHourSecond}時間${betweenMinuteSecond}分`);*/
				if(betweenMinuteFirst<30){
					priceFirst=betweenHourFirst*200+100;
				}else{
					priceFirst=betweenHourFirst*200+200;
				}
				if(priceFirst>1000){
					priceFirst=priceMax;
				}
				priceSecond=betweenHourSecond*100+100;
				price=priceFirst+priceSecond;
			}  
		}else{  // 20 <= enterHour
			price=betweenHour*100+100;
		}
	}



	//入庫した次の日に出庫する場合
	else if(betweenDay===1){   
		betweenHourOneday=23-enterHour;
		betweenMinuteOneday=60-enterMinute;
		betweenHourTwoday=outHour;
		betweenMinuteTwoday=outMinute;
		if(betweenMinuteOneday+betweenMinuteTwoday>=60){
			betweenHour=betweenHourOneday+betweenHourTwoday+1;
			betweenMinute=betweenMinuteOneday+betweenMinuteTwoday-60;
		}else{
			betweenHour=betweenHourOneday+betweenHourTwoday;
			betweenMinute=betweenMinuteOneday+betweenMinuteTwoday;
		}
		
		
		/*
		console.log(`駐車時間(1日目):${betweenHourOneday}時間${betweenMinuteOneday}分`);
		console.log(`駐車時間(2日目):${betweenHourTwoday}時間${betweenMinuteTwoday}分`);*/
		if(enterHour<8){
			if(outHour<8){
				betweenHourFirst=7-enterHour;
				betweenMinuteFirst=60-enterMinute;
				betweenHourSecond=12;
				betweenMinuteSecond=0;
				betweenHourThird=outHour+4;
				betweenMinuteThird=outMinute;
				/*
				console.log(`駐車時間(前日0時から前日8時):${betweenHourFirst}時間${betweenMinuteFirst}分`);
				console.log(`駐車時間(前日8時から前日20時):${betweenHourSecond}時間${betweenMinuteSecond}分`);
				console.log(`駐車時間(前日20時から8時):${betweenHourThird}時間${betweenMinuteThird}分`);*/
				priceFirst=betweenHourFirst*100+100;
				priceSecond=priceMax;
				priceThird=betweenHourThird*100+100;
				if(priceThird>1000){
					priceThird=priceMax;
				}
				price=priceFirst+priceSecond+priceThird;
			}else if(outHour>=8 && outHour<20){
				betweenHourFirst=7-enterHour;
				betweenMinuteFirst=60-enterMinute;
				betweenHourSecond=12;
				betweenMinuteSecond=0;
				betweenHourThird=12;
				betweenMinuteThird=0;
				betweenHourFourth=outHour-8;
				betweenMinuteFourth=outMinute;
				/*
				console.log(`駐車時間(前日0時から前日8時):${betweenHourFirst}時間${betweenMinuteFirst}分`);
				console.log(`駐車時間(前日8時から前日20時):${betweenHourSecond}時間${betweenMinuteSecond}分`);
				console.log(`駐車時間(前日20時から8時):${betweenHourThird}時間${betweenMinuteThird}分`);
				console.log(`駐車時間(8時から20時):${betweenHourFourth}時間${betweenMinuteFourth}分`);*/
				priceFirst=betweenHourFirst*100+100;
				priceSecond=priceMax;
				priceThird=priceMax;
				if(betweenMinuteFourth<30){
					priceFourth=betweenHourFourth*200+100;
				}else{
					priceFourth=betweenHourFourth*200+200;
				}
				if(priceFourth>1000){
					priceFourth=priceMax;
				}
				price=priceFirst+priceSecond+priceThird+priceFourth;
			}else{  // 20 <= outHour
				betweenHourFirst=7-enterHour;
				betweenMinuteFirst=60-enterMinute;
				betweenHourSecond=12;
				betweenMinuteSecond=0;
				betweenHourThird=12;
				betweenMinuteThird=0;
				betweenHourFourth=12;
				betweenMinuteFourth=0;
				betweenHourFifth=outHour-20;
				betweenMinuteFifth=outMinute;
				/*
				console.log(`駐車時間(前日0時から前日8時):${betweenHourFirst}時間${betweenMinuteFirst}分`);
				console.log(`駐車時間(前日8時から前日20時):${betweenHourSecond}時間${betweenMinuteSecond}分`);
				console.log(`駐車時間(前日20時から8時):${betweenHourThird}時間${betweenMinuteThird}分`);
				console.log(`駐車時間(8時から20時):${betweenHourFourth}時間${betweenMinuteFourth}分`);            
				console.log(`駐車時間(20時から24時):${betweenHourFifth}時間${betweenMinuteFifth}分`);*/
				priceFirst=betweenHourFirst*100+100;
				priceSecond=priceMax;
				priceThird=priceMax;
				priceFourth=priceMax;
				priceFifth=betweenHourFifth*100+100;
				price=priceFirst+priceSecond+priceThird+priceFourth+priceFifth;
			}
		}else if(enterHour>=8 && enterHour<20){
			if(outHour<8){
				betweenHourFirst=19-enterHour;
				betweenMinuteFirst=60-enterMinute;
				betweenHourSecond=outHour+4;
				betweenMinuteSecond=outMinute;
				/*
				console.log(`駐車時間(前日8時から前日20時):${betweenHourFirst}時間${betweenMinuteFirst}分`);
				console.log(`駐車時間(前日20時から8時):${betweenHourSecond}時間${betweenMinuteSecond}分`);*/
				if(betweenMinuteFirst<30){
					priceFirst=betweenHourFirst*200+100;
				}else{
					priceFirst=betweenHourFirst*200+200;
				}
				if(priceFirst>1000){
					priceFirst=priceMax;
				}
				priceSecond=betweenHourSecond*100+100;
				if(priceSecond>1000){
					priceSecond=priceMax;
				}
				price=priceFirst+priceSecond;
			}else if(outHour>=8 && outHour<20){
				betweenHourFirst=19-enterHour;
				betweenMinuteFirst=60-enterMinute;
				betweenHourSecond=12;
				betweenMinuteSecond=0;
				betweenHourThird=outHour-8;
				betweenMinuteThird=outMinute;
				/*
				console.log(`駐車時間(前日8時から前日20時):${betweenHourFirst}時間${betweenMinuteFirst}分`);
				console.log(`駐車時間(前日20時から8時):${betweenHourSecond}時間${betweenMinuteSecond}分`);
				console.log(`駐車時間(8時から20時):${betweenHourThird}時間${betweenMinuteThird}分`);*/
				if(betweenMinuteFirst<30){
					priceFirst=betweenHourFirst*200+100;
				}else{
					priceFirst=betweenHourFirst*200+200;
				}
				if(priceFirst>1000){
					priceFirst=priceMax;
				}
				priceSecond=priceMax;
				if(betweenMinuteThird<30){
					priceThird=betweenHourThird*200+100;
				}else{
					priceThird=betweenHourThird*200+200;
				}
				if(priceThird>1000){
					priceThird=priceMax;
				}
				price=priceFirst+priceSecond+priceThird;
			}else{  // 20 <= outHour
				betweenHourFirst=19-enterHour;
				betweenMinuteFirst=60-enterMinute;
				betweenHourSecond=12;
				betweenMinuteSecond=0;
				betweenHourThird=12;
				betweenMinuteThird=0;
				betweenHourFourth=outHour-20;
				betweenMinuteFourth=outMinute;
				/*
				console.log(`駐車時間(前日8時から前日20時):${betweenHourFirst}時間${betweenMinuteFirst}分`);
				console.log(`駐車時間(前日20時から8時):${betweenHourSecond}時間${betweenMinuteSecond}分`);
				console.log(`駐車時間(8時から20時):${betweenHourThird}時間${betweenMinuteThird}分`);
				console.log(`駐車時間(20時から24時):${betweenHourFourth}時間${betweenMinuteFourth}分`);*/
			
				if(betweenMinuteFirst<30){
					priceFirst=betweenHourFirst*200+100;
				}else{
					priceFirst=betweenHourFirst*200+200;
				}
				if(priceFirst>1000){
					priceFirst=priceMax;
				}
				priceSecond=priceMax;
				priceThird=priceMax;
				priceFourth=betweenHourFourth*100+100;
				price=priceFirst+priceSecond+priceThird+priceFourth;
			}
		}else{  // 20 <= enterHour
			if(outHour<8){  
				price=betweenHour*100+100;
				if(price>1000){
					price=priceMax;
				}
			}else if(outHour>=8 && outHour<20){ // 8 <= outHour < 20
				betweenHourFirst=31-enterHour;
				betweenMinuteFirst=60-enterMinute;
				betweenHourSecond=outHour-8;
				betweenMinuteSecond=outMinute;
				/*
				console.log(`駐車時間(前日20時から8時):${betweenHourFirst}時間${betweenMinuteFirst}分`);
				console.log(`駐車時間(8時から20時):${betweenHourSecond}時間${betweenMinuteSecond}分`);*/
				priceFirst=betweenHourFirst*100+100;
				if(priceFirst>1000){
						priceFirst=priceMax;
					}
				if(betweenMinuteSecond<=30){
					priceSecond=betweenHourSecond*200+100;
				}else{
					priceSecond=betweenHourSecond*200+200;
				}
				if(priceSecond>1000){
					priceSecond=priceMax;
				}
				price=priceFirst+priceSecond;
			}else{  // 20 <= outHour
				betweenHourFirst=31-enterHour;
				betweenMinuteFirst=60-enterMinute;
				betweenHourSecond=12;
				betweenMinuteSecond=0;
				betweenHourThird=outHour-20;
				betweenMinuteThird=outMinute;
				/*
				console.log(`駐車時間(前日20時から8時):${betweenHourFirst}時間${betweenMinuteFirst}分`);
				console.log(`駐車時間(8時から20時):${betweenHourSecond}時間${betweenMinuteSecond}分`);
				console.log(`駐車時間(20時から24時):${betweenHourThird}時間${betweenMinuteThird}分`);*/
				priceFirst=betweenHourFirst*100+100;
				if(priceFirst>1000){
					priceFirst=priceMax;
				}
				priceSecond=priceMax;
				priceThird=betweenHourThird*100+100;
				price=priceFirst+priceSecond+priceThird;
			}
		}  
	}



	//入庫した2日後以降10日後以内に出庫する場合  
	else{
		const betweenDayTimes=[
			{betweenHourDay:23-enterHour, betweenMinuteDay:60-enterMinute},
			{betweenHourDay:24, betweenMinuteDay:0},  
			{betweenHourDay:outHour, betweenMinuteDay:outMinute}
		];
		if(betweenDayTimes[0].betweenMinuteDay + betweenDayTimes[2].betweenMinuteDay >= 60){
			betweenHour=betweenDayTimes[0].betweenHourDay + betweenDayTimes[2].betweenHourDay +1+ (betweenDay-1) *24;
			betweenMinute=betweenDayTimes[0].betweenMinuteDay + betweenDayTimes[2].betweenMinuteDay -60;
		}else{
			betweenHour=betweenDayTimes[0].betweenHourDay + betweenDayTimes[2].betweenHourDay +(betweenDay-1)*24
			betweenMinute=betweenDayTimes[0].betweenMinuteDay + betweenDayTimes[2].betweenMinuteDay;
		}
		
		/*
		console.log(`(駐車時間1日目):${betweenDayTimes[0].betweenHourDay}時間${betweenDayTimes[0].betweenMinuteDay}分`);
		for(let i=1; i<betweenDay; i++){  // 駐車時間24時間0分を繰り返す
			console.log(`(駐車時間${i+1}日目)：${betweenDayTimes[1].betweenHourDay}時間${betweenDayTimes[1].betweenMinuteDay}分`);
		}
		console.log(`(駐車時間${betweenDay+1}日目)：${betweenDayTimes[2].betweenHourDay}時間${betweenDayTimes[2].betweenMinuteDay}分`); */

		if(enterHour<8){
			if(outHour<8){
				const betweenEightTimes=[
					{betweenHourEight:7-enterHour, betweenMinuteEight:60-enterMinute},
					{betweenHourEight:12, betweenMinuteEight:0},
					{betweenHourEight:outHour+4, betweenMinuteEight:outMinute}
				];
				/*
				console.log(`駐車時間(${betweenDay}日前0時から${betweenDay}日前8時)：${betweenEightTimes[0].betweenHourEight}時間${betweenEightTimes[0].betweenMinuteEight}分`);
				// 繰り返しはすぐにできなかったので省略
				console.log(`駐車時間(1日前20時から8時)：${betweenEightTimes[2].betweenHourEight}時間${betweenEightTimes[2].betweenMinuteEight}分`);*/
				priceFirst=betweenEightTimes[0].betweenHourEight *100+100;
				priceMiddle=(betweenDay*2-1)*priceMax;
				priceLast=betweenEightTimes[2].betweenHourEight *100+100;
				if(priceLast>1000){
					priceLast=priceMax;
				}
				price=priceFirst+priceMiddle+priceLast;
			}else if(outHour>=8 && outHour<20){
				const betweenEightTimes=[
					{betweenHourEight:7-enterHour, betweenMinuteEight:60-enterMinute},
					{betweenHourEight:12, betweenMinuteEight:0},
					{betweenHourEight:outHour-8, betweenMinuteEight:outMinute}
				];
				/*
				console.log(`駐車時間(${betweenDay}日前0時から${betweenDay}日前8時)：${betweenEightTimes[0].betweenHourEight}時間${betweenEightTimes[0].betweenMinuteEight}分`);
				// 繰り返しはすぐにできなかったので省略
				console.log(`駐車時間(8時から20時)：${betweenEightTimes[2].betweenHourEight}時間${betweenEightTimes[2].betweenMinuteEight}分`);*/
				priceFirst=betweenEightTimes[0].betweenHourEight *100+100;
				priceMiddle=(betweenDay*2)*priceMax;
				if(betweenEightTimes[2].betweenMinuteEight<30){
					priceLast=betweenEightTimes[2].betweenHourEight *200+100;
				}else{
					priceLast=betweenEightTimes[2].betweenHourEight *200+200;
				}
				if(priceLast>1000){
					priceLast=priceMax;
				}
				price=priceFirst+priceMiddle+priceLast;
			}else{  // 20 <= outHour
				const betweenEightTimes=[
					{betweenHourEight:7-enterHour, betweenMinuteEight:60-enterMinute},
					{betweenHourEight:12, betweenMinuteEight:0},
					{betweenHourEight:outHour-20, betweenMinuteEight:outMinute}
				];
				/*
				console.log(`駐車時間(${betweenDay}日前0時から${betweenDay}日前8時)：${betweenEightTimes[0].betweenHourEight}時間${betweenEightTimes[0].betweenMinuteEight}分`);
				// 繰り返しはすぐにできなかったので省略
				console.log(`駐車時間(20時から24時)：${betweenEightTimes[2].betweenHourEight}時間${betweenEightTimes[2].betweenMinuteEight}分`);*/
				priceFirst=betweenEightTimes[0].betweenHourEight *100+100;
				priceMiddle=(betweenDay*2+1)*priceMax;
				priceLast=betweenEightTimes[2].betweenHourEight *100+100;
				if(priceLast>1000){
					priceLast=priceMax;
				}
				price=priceFirst+priceMiddle+priceLast;
			}
		}else if(enterHour>=8 && enterHour<20){
			if(outHour<8){
				const betweenEightTimes=[
					{betweenHourEight:19-enterHour, betweenMinuteEight:60-enterMinute},
					{betweenHourEight:12, betweenMinuteEight:0},
					{betweenHourEight:outHour+4, betweenMinuteEight:outMinute}
				];
				/*
				console.log(`駐車時間(${betweenDay}日前8時から${betweenDay}日前20時)：${betweenEightTimes[0].betweenHourEight}時間${betweenEightTimes[0].betweenMinuteEight}分`);
				// 繰り返しはすぐにできなかったので省略
				console.log(`駐車時間(1日前20時から8時)：${betweenEightTimes[2].betweenHourEight}時間${betweenEightTimes[2].betweenMinuteEight}分`);*/
				if(betweenEightTimes[0].betweenMinuteEight<30){
					priceFirst=betweenEightTimes[0].betweenHourEight *200+100;
				}else{
					priceFirst=betweenEightTimes[0].betweenHourEight *200+200;
				}
				if(priceFirst>1000){
					priceFirst=priceMax;
				}
				priceMiddle=(betweenDay-1)*2*priceMax;
				priceLast=betweenEightTimes[2].betweenHourEight *100+100;
				if(priceLast>1000){
					priceLast=priceMax;
				}
				price=priceFirst+priceMiddle+priceLast;
			}else if(outHour>=8 && outHour<20){
				const betweenEightTimes=[
					{betweenHourEight:19-enterHour, betweenMinuteEight:60-enterMinute},
					{betweenHourEight:12, betweenMinuteEight:0},
					{betweenHourEight:outHour-8, betweenMinuteEight:outMinute}
				];
				/*
				console.log(`駐車時間(${betweenDay}日前8時から${betweenDay}日前20時)：${betweenEightTimes[0].betweenHourEight}時間${betweenEightTimes[0].betweenMinuteEight}分`);
				// 繰り返しはすぐにできなかったので省略
				console.log(`駐車時間(8時から20時)：${betweenEightTimes[2].betweenHourEight}時間${betweenEightTimes[2].betweenMinuteEight}分`);*/
				if(betweenEightTimes[0].betweenMinuteEight<30){
					priceFirst=betweenEightTimes[0].betweenHourEight *200+100;
				}else{
					priceFirst=betweenEightTimes[0].betweenHourEight *200+200;
				}
				if(priceFirst>1000){
					priceFirst=priceMax;
				}
				priceMiddle=(betweenDay*2-1) *priceMax;
				if(betweenEightTimes[2].betweenMinuteEight<30){
					priceLast=betweenEightTimes[2].betweenHourEight *200+100;
				}else{
					priceLast=betweenEightTimes[2].betweenHourEight *200+200;
				}
				if(priceLast>1000){
					priceLast=priceMax;
				}
				price=priceFirst+priceMiddle+priceLast;
			}else{  // 20 <= outHour
				const betweenEightTimes=[
					{betweenHourEight:19-enterHour, betweenMinuteEight:60-enterMinute},
					{betweenHourEight:12, betweenMinuteEight:0},
					{betweenHourEight:outHour-20, betweenMinuteEight:outMinute}
				];
				/*
				console.log(`駐車時間(${betweenDay}日前8時から${betweenDay}日前20時)：${betweenEightTimes[0].betweenHourEight}時間${betweenEightTimes[0].betweenMinuteEight}分`);
				// 繰り返しはすぐにできなかったので省略
				console.log(`駐車時間(20時から24時)：${betweenEightTimes[2].betweenHourEight}時間${betweenEightTimes[2].betweenMinuteEight}分`);*/
				if(betweenEightTimes[0].betweenMinuteEight<30){
					priceFirst=betweenEightTimes[0].betweenHourEight *200+100;
				}else{
					priceFirst=betweenEightTimes[0].betweenHourEight *200+200;
				}
				if(priceFirst>1000){
					priceFirst=priceMax;
				}
				priceMiddle=(betweenDay*2) *priceMax;
				priceLast=betweenEightTimes[2].betweenHourEight *100+100;
				if(priceLast>1000){
					priceLast=priceMax;
				}
				price=priceFirst+priceMiddle+priceLast;
			}
		}else{  // 20 <= enterHour
			if(outHour<8){
				const betweenEightTimes=[
					{betweenHourEight:31-enterHour, betweenMinuteEight:60-enterMinute},
					{betweenHourEight:12, betweenMinuteEight:0},
					{betweenHourEight:outHour+4, betweenMinuteEight:outMinute}
				];
				/*
				console.log(`駐車時間(${betweenDay}日前20時から${betweenDay-1}日前8時)：${betweenEightTimes[0].betweenHourEight}時間${betweenEightTimes[0].betweenMinuteEight}分`);
				// 繰り返しはすぐにできなかったので省略
				console.log(`駐車時間(1日前20時から8時)：${betweenEightTimes[2].betweenHourEight}時間${betweenEightTimes[2].betweenMinuteEight}分`);*/
				priceFirst=betweenEightTimes[0].betweenHourEight *100+100;
				if(priceFirst>1000){
					priceFirst=priceMax;
				}
				priceMiddle=(betweenDay*2-3) *priceMax;
				priceLast=betweenEightTimes[2].betweenHourEight *100+100;
				if(priceLast>1000){
					priceLast=priceMax;
				}
				price=priceFirst+priceMiddle+priceLast;
			}else if(outHour>=8 && outHour<20){
				const betweenEightTimes=[
					{betweenHourEight:31-enterHour, betweenMinuteEight:60-enterMinute},
					{betweenHourEight:12, betweenMinuteEight:0},
					{betweenHourEight:outHour-8, betweenMinuteEight:outMinute}
				];
				/*
				console.log(`駐車時間(${betweenDay}日前20時から${betweenDay-1}日前8時)：${betweenEightTimes[0].betweenHourEight}時間${betweenEightTimes[0].betweenMinuteEight}分`);
				// 繰り返しはすぐにできなかったので省略
				console.log(`駐車時間(8時から20時)：${betweenEightTimes[2].betweenHourEight}時間${betweenEightTimes[2].betweenMinuteEight}分`);*/
				priceFirst=betweenEightTimes[0].betweenHourEight *100+100;
				if(priceFirst>1000){
					priceFirst=priceMax;
				}
				priceMiddle=(betweenDay-1)*2 *priceMax;
				if(betweenEightTimes[2].betweenMinuteEight<30){
					priceLast=betweenEightTimes[2].betweenHourEight *200+100;
				}else{
					priceLast=betweenEightTimes[2].betweenHourEight *200+200;
				}
				if(priceLast>1000){
					priceLast=priceMax;
				}
				price=priceFirst+priceMiddle+priceLast;
			}else{  // 20 <= outHour
				const betweenEightTimes=[
					{betweenHourEight:31-enterHour, betweenMinuteEight:60-enterMinute},
					{betweenHourEight:12, betweenMinuteEight:0},
					{betweenHourEight:outHour-20, betweenMinuteEight:outMinute}
				];
				/*
				console.log(`駐車時間(${betweenDay}日前20時から${betweenDay-1}日前8時)：${betweenEightTimes[0].betweenHourEight}時間${betweenEightTimes[0].betweenMinuteEight}分`);
				// 繰り返しはすぐにできなかったので省略
				console.log(`駐車時間(20時から24時)：${betweenEightTimes[2].betweenHourEight}時間${betweenEightTimes[2].betweenMinuteEight}分`);*/
				priceFirst=betweenEightTimes[0].betweenHourEight *100+100;
				if(priceFirst>1000){
					priceFirst=priceMax;
				}
				priceMiddle=(betweenDay*2-1) *priceMax;
				priceLast=betweenEightTimes[2].betweenHourEight *100+100;
				if(priceLast>1000){
					priceLast=priceMax;
				}
				price=priceFirst+priceMiddle+priceLast;
			}
		}
	}
	
	console.log(`入庫:${enterMonth}月${enterDay}日 ${enterHour}:${enterMinute}`);
	document.getElementById('enter').innerHTML = (`入庫:${enterMonth}月${enterDay}日 ${enterHour}時${enterMinute}分`);
	console.log(`出庫:${outMonth}月${outDay}日 ${outHour}:${outMinute}`);
	document.getElementById('out').innerHTML = (`出庫:${outMonth}月${outDay}日 ${outHour}時${outMinute}分`);
	console.log(`駐車日数:${betweenDay}日`)

	console.log(`駐車時間合計:${betweenHour}時間${betweenMinute}分`);
	console.log(`料金:${price}円`);
	document.getElementById('parkTime').innerHTML = (`駐車時間:${betweenHour}時間${betweenMinute}分`);
	document.getElementById('priceyen').innerHTML=(`料金:${price}円`);

	if(betweenMonth>=2 || betweenDay>10){
    alert('ご利用は10日間までです。これを超える場合は、事前に事務所へ連絡をお願いします。');
		//それまでの駐車時間合計と料金が消えるようにする
    document.getElementById('parkTime').innerHTML='';
    document.getElementById('priceyen').innerHTML='';
  }else if(betweenMonth<0 || betweenDay<0 || betweenHour<0 || betweenMinute<0){
    alert('出庫時間が入庫時間より前になっています。');
    document.getElementById('parkTime').innerHTML='';
    document.getElementById('priceyen').innerHTML='';
  }
}

let button = document.getElementById('btn');
button.addEventListener('click', butotnClick);