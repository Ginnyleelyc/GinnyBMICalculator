var cmId = document.getElementById('cmId');
var kgId = document.getElementById('kgId');
var sendbtn = document.querySelector('.sendbtn');
var answer = document.querySelector('#answer');
var save = document.querySelector('#answer .save');
var refresh = document.querySelector('#answer .refresh');
var record =document.querySelector('.record');
var Data = JSON.parse(localStorage.getItem('BMIList')) || [];
var today = new Date();

addText();
updataRecord(Data);

// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
  ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
    textbox.addEventListener(event, function() {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
    });
  });
}
// Install input filters.
setInputFilter(cmId, function(value) {
  return /^-?\d*[.]?\d{0,1}$/.test(value); });
setInputFilter(kgId, function(value) {
  return /^-?\d*[.]?\d{0,1}$/.test(value); });


function countBMI(){
	var answerBMI = document.querySelector('#answer .BMIN .BMI');
	var answercategory = document.querySelector('#answer .category');

	var cm = parseInt(cmId.value);
	var kg = parseInt(kgId.value);
	var m = cm / 100;
	var BMI = (kg / (m*m)).toFixed(2);

	var category;
	var color;
	var borColor;

	//檢查是否有輸入內容
	if(cmId.value == ""){
		alert("請輸入身高")
		return;
	}else if(kgId.value == ""){
		alert("請輸入體重")
		return;
	}
	
	//判斷ＢＭＩ狀態
    if (BMI < 18.5){
        category = '過輕';
        color = 'underweight';
        borColor = 'bor-underweight';
    }else if(18.5 <= BMI && BMI < 25){
    	category = '理想';
    	color = 'normal';
    	borColor = 'bor-normal';
    }else if(25 <= BMI && BMI < 30){
    	category = '過重';
    	color = 'overweight';
    	borColor = 'bor-overweight';
    }else if(30 <= BMI && BMI < 35){
    	category = '中度肥胖';
    	color = 'obeseI';
    	borColor = 'bor-obeseI';
    }else if(35 <= BMI && BMI < 40){
    	category = '嚴重肥胖';
    	color = 'obeseII';
    	borColor = 'bor-obeseII';
    }else if(40 <= BMI){
    	category = '非常嚴重肥胖';
    	color = 'obeseIII';
    	borColor = 'bor-obeseIII';
    }

    //show resultButton
    this.style.display= 'none';
    answer.style.display = 'block';
    answer.setAttribute('class',color);
    answerBMI.textContent = BMI;
    answercategory.textContent = category;


    //新增陣列到localStorage && 新增紀錄 
	save.addEventListener('click',function(){
		var info = {
			borColor:borColor,
			category:category,
			BMI:BMI,
			cm:cm,
			kg:kg
		}	
		Data.push(info);
		updataRecord(Data);
		localStorage.setItem('BMIList', JSON.stringify(Data));
		window.location.reload();
		addText();
	},false);

	//重新整理
	refresh.addEventListener('click',function(){
		window.location.reload();
		addText();
	},false);

	
}

function updataRecord(item){
	var str = "";
	var getToday = today.getFullYear()+" / "+(today.getMonth()+1)+" / "+ today.getDate() ;
	for(var i = 0 ; i < item.length ; i++){
		str += '<li class="'+item[i].borColor+'"><table><tr><td style="width:140px">'+item[i].category+'</td><td><span>BMI</span> '+item[i].BMI+'</td><td><span>weight</span> '+item[i].kg+'</td><td><span>height</span> '+item[i].cm+'</td><td class="date"><span>'+getToday+'</span></td><td><a href="#" data-num='+i+' class="fas fa-backspace"></a></td></tr></table></li>';
	}
    	record.innerHTML = str;
}

function delect(e){
	e.preventDefault();
	if(e.target.nodeName == "A" || e.target.nodeName == "I"){
		var num = e.target.dataset.num;
		Data.splice(num,1);
		localStorage.setItem('BMIList', JSON.stringify(Data));
		updataRecord(Data);
	};
	addText();		
}

function addText(){
	if(Data == null || Data.length == 0 ){
		document.querySelector('#noText').style.display='block';
	}else{
		document.querySelector('#noText').style.display='none';
	}
}

//animate
var ani = 'animated pulse';
$('.sendbtn, .save, .refresh').hover(function() {
    $(this).addClass(ani);
}, function() {
    $(this).removeClass(ani);
});


sendbtn.addEventListener('click',countBMI,false);
record.addEventListener('click',delect,false);



