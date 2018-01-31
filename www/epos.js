$.afui.useOSThemes=false;
    $.afui.loadDefaultHash=true;
    $.afui.autoLaunch=false;

    //check search
    var search=document.location.search.toLowerCase().replace("?","");
    if(search.length>0)
    {

       $.afui.useOSThemes=true;
        if(search=="win8")
            $.os.ie=true;
        else if(search=="firefox")
            $.os.fennec="true"
        $.afui.ready(function(){
            $(document.body).get(0).className=(search);
        });
    }

/********  apipath *****************/

//var  apipath ='http://127.0.0.1:8000/epos/syncmobile_epos/'
var  apipath ='http://w02.yeapps.com/epos/syncmobile_epos/'

//var  apipath ='http://a007.yeapps.com/acme/medSearch/'
//var  apipath ='http://127.0.0.1:8000/acme/medSearch/'


/******** EPOS apipath *****************/



    $(document).ready(function(){
        $.afui.launch();
		//localStorage.prProdID_Str='';
		//alert('Local : '+ localStorage.prProdID_Str);
		
		localStorage.location_error=''
		$("#wait_image_login").hide();
		$('#menu_lv').empty()
		$('#menu_lv').append(localStorage.menu_list);
		
	//	$("#wait_image_login").hide();
		$("#loginButton").show();
		

		
		
		getLocationInfo_ready();
		
		//$("#se_mpo").val(localStorage.user_id);


	
	var currentDate = new Date()
	var day = currentDate.getDate();if(parseInt(day)<9)	{day="0" + day};
	var month = currentDate.getMonth() + 1;if(parseInt(month)<9){month="0" +month};
	var year = currentDate.getFullYear()
	//alert (parseInt(day))
	var today=  year + "-" + month + "-" + day
	localStorage.today=today;
							
							
	
		//currentDate=2016-03-11
		//localStorage.synced=''
		//alert (today);
		//alert (localStorage.synced);
		if (localStorage.synced=='YES'){
			$("#cid").val(localStorage.cid);
			$("#mobile_no").val(localStorage.mobile_no);
			$("#m_pass").val(localStorage.m_pass);
/*			if (localStorage.user_type=='sup'){
			$("#chemisVDiv").hide();
			$("#chSaveDiv").hide();
			
			
			} 
			else{
				$("#chemisVDiv").show();
				$("#chSaveDiv").show();
			} */
			//alert (localStorage.synced)
			$.afui.loadContent("#pageHome",true,true,'right');
			
		}
		//if ((localStorage.synced=='YES') & (localStorage.sync_date==today)){
		//if (localStorage.synced=='YES') {
//			$.afui.loadContent("#pageHome",true,true,'right');
//		}
		
		
    });

    //if($.os.ios)
        $.afui.animateHeader(true);
	//	getLocation()









//var mobile_off_flag=0;
//function homePage_refresh() {
//	$("#error_login").html('');
//	//location.reload();
//	$.afui.loadContent("#pageHome",true,true,'right');
//	
//}

function check_user() {	
	//alert ('hello')
//	$.afui.loadContent("#pageHome",true,true,'right');
	var cid=$("#cid").val().toUpperCase();
	var mobile_no=$("#mobile_no").val() ;
	var m_pass=$("#m_pass").val() ;
	//alert (password)


	if (mobile_no=="" || mobile_no==undefined || m_pass=="" || m_pass==undefined){
		
		//var url = "#login";      
//		$.mobile.navigate(url);
		$("#error_login").html("Required User ID and Password");
//		$.mobile.navigate(url);	
	}else{

		$("#loginButton").show();
		localStorage.cid='EPOS';
		localStorage.mobile_no=mobile_no;
		localStorage.m_pass=m_pass;
		localStorage.synced='NO'

	    if (mobile_no !== mobile_no){
			$("#loginErr").html("Invalid Mobile No");
			}
		
	
		if(localStorage.sync_code==undefined || localStorage.sync_code==""){
					localStorage.sync_code=0
				}
			
			//alert (apipath+'check_user?cid='+localStorage.cid+'&mobile_no='+mobile_no+'&m_pass='+encodeURIComponent(m_pass)+'&sync_code='+localStorage.sync_code)		
				
			$.ajax({
			  type:'POST',		 
			  url:apipath+'check_user?cid='+localStorage.cid+'&mobile_no='+mobile_no+'&m_pass='+encodeURIComponent(m_pass)+'&sync_code='+localStorage.sync_code,
			  
			  success: function(result) {
				 //alert (result)
			    //syncResult=result
				// alert('1')
				    if (result==''){
							//$("#loginButton").show();
//							$("#login_image").hide();
							alert ('Sorry Network not available');
						}
						else{
							var resultArray = result.split('<SYNCDATA>');
							//alert (resultArray)		
							if (resultArray[0]=='FAILED'){
								localStorage.fDo=resultArray[1];
								alert(localStorage.fDo)
								
							}
							if (resultArray[0]=='SUCCESS'){
								localStorage.sync_code=resultArray[1];
								localStorage.sync_time=resultArray[2];
						//		localStorage.noticeStr=resultArray[3];
								//alert (localStorage.sync_code)
							//	localStorage.outletString=resultArray[2];
//								localStorage.prodctStr=resultArray[3];
//								//localStorage.memMbStr=''
//								localStorage.recMemStr=resultArray[4];
								$.afui.loadContent("#pageHome",true,true,'right');
//				
							}
						
						}
				          
				        //error: function(result) {
//					
//				  }
					 

			  }
			  
			  
			  });
				
					
					
	}



}//Check User End
//=============================================



function homePage() {

	$.afui.loadContent("#pageHome",true,true,'right');

}


function page_login() {
	
	$.afui.loadContent("#login",true,true,'right');
}



function nextPage() {
	
	$.afui.loadContent("#imageSinglePage",true,true,'right');
}





function reload_function() {
	location.reload();
}


function getLocationInfo() { //location
	$("#lat").val(0);
	$("#longitude").val(0);
	
	
	$("#wait_image_visit_submit").show()
	$("#visit_submit").hide();
	$("#visit_location").hide();
	
	
	
	
	$("#wait_image_visit_submit_doc").hide()
	$("#visit_submit_doc").show();
	//$("#visit_location_doc").hide();
	$("#checkLocation_doc").html('');
	
	
	
	$("#errorChkVSubmit").html('');
	//$("#errorConfiProfileUpdate").html('');
	$("#errorChkVSubmit_doc").html('');
	
	var options = { enableHighAccuracy: true, timeout:15000};
	//var options = { enableHighAccuracy: true, timeout:1000};
	navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
	
}

function onSuccess(position) {
	
	$("#lat").val(position.coords.latitude);
	$("#longitude").val(position.coords.longitude);
	
	//$("#lat_p").val(position.coords.latitude);
	//$("#long_p").val(position.coords.longitude);
	
	
	localStorage.latitude=position.coords.latitude
	localStorage.longitude=position.coords.longitude
	
	
	
	
	
	
	$("#checkLocation").html('Location Confirmed'); 
	//$("#checkLocationProfileUpdate").html('Location Confirmed');
		
	
	$("#wait_image_visit_submit").hide();
	$("#visit_submit").show();
	$("#visit_location").hide();
	
	$("#checkLocation_doc").html('Location Confirmed'); 

	$("#wait_image_visit_submit_doc").hide();
	//$("#visit_submit_doc").show();
	//$("#visit_location_doc").hide();
	localStorage.location_error=''
	codeLatLng(position.coords.latitude, position.coords.longitude)
	
	
	
	
	
	
} 
function onError(error) {
	
	localStorage.location_error=error.code
	
	
	
	//alert (localStorage.location_error)
	
	$("#lat").val(0);
	$("#longitude").val(0);
	
	//$("#lat_p").val(0);
	//$("#long_p").val(0);

	if (localStorage.location_error==2){
		$("#checkLocation").html('<font style="color:#F00;">Please activate <font style="font-weight:bold">location </font> and <font style="font-weight:bold"> data </font></font>');
		//$("#checkLocationProfileUpdate").html('<font style="color:#F00;">Please activate <font style="font-weight:bold">location </font> and <font style="font-weight:bold"> data </font></font>');
		$("#checkLocation_doc").html('<font style="color:#F00;">Please activate <font style="font-weight:bold">location </font> and <font style="font-weight:bold"> data </font></font>');

	}else{
		$("#checkLocation").html('Location can not be found. Last Location will be submitted.');
		//$("#checkLocationProfileUpdate").html('Location can not be found. Last Location will be submitted.');
		$("#checkLocation_doc").html('Location can not be found. Last Location will be submitted.');
	}
	
	
	$("#wait_image_visit_submit").hide();
	$("#visit_submit").show();
	$("#visit_location").hide();
	
	
	$("#wait_image_visit_submit_doc").hide();
	$("#visit_submit_doc").show();
	$("#visit_location_doc").hide();
}


//==Reload Location
function getLocationInfo_ready() { //location
	$("#wait_image_visit_submit").show()
	$("#visit_submit").show();
	$("#visit_location").hide();
	
	$("#checkLocation").html(''); 
	//$("#checkLocationProfileUpdate").html('');
	
	
	$("#wait_image_visit_submit_doc").hide()
	//$("#visit_submit_doc").show();
	//$("#visit_location_doc").hide();
	
	$("#checkLocation_doc").html('');
	
	var options = { enableHighAccuracy: true, timeout:30000};
	navigator.geolocation.getCurrentPosition(onSuccess_ready, onError_ready, options);
}

// onSuccess Geolocationshom

function onSuccess_ready(position) {
	$("#lat").val(position.coords.latitude);
	$("#longitude").val(position.coords.longitude);
	
	//$("#lat_p").val(position.coords.latitude);
	//$("#long_p").val(position.coords.longitude);
	
	
	localStorage.latitude=position.coords.latitude
	localStorage.longitude=position.coords.longitude
	
	
	
	$("#errorChkVSubmit").html('');
	//$("#errorConfiProfileUpdate").html('');
	$("#errorChkVSubmit_doc").html('');
	
	
	$("#checkLocation").html('Location Confirmed'); 
	//$("#checkLocationProfileUpdate").html('Location Confirmed');
		
	
	$("#wait_image_visit_submit").hide();
	$("#visit_submit").show();
	$("#visit_location").hide();
	
	$("#checkLocation_doc").html('Location Confirmed'); 

	$("#wait_image_visit_submit_doc").hide();
	//$("#visit_submit_doc").show();
	//$("#visit_location_doc").hide();
	//alert (position.coords.longitude)
	geocoder = new google.maps.Geocoder();
	codeLatLng(position.coords.latitude, position.coords.longitude)
	
	
} 
function onError_ready(error) {
	
	//alert (error);
	
	$("#lat").val(0);
	$("#longitude").val(0);
	
	//$("#lat_p").val(0);
	//$("#long_p").val(0);
	//localStorage.location_detail='';
	
	//$("#checkLocation").html('Location not found. Last Location will submit.');
	//$("#checkLocationProfileUpdate").html('Location not found. Last Location will submit.');
	
	
	$("#checkLocation").html(''); 
	$("#wait_image_visit_submit").hide();
	$("#visit_submit").show();
	$("#visit_location").hide();
	
    $("#checkLocation_doc").html('');
	$("#wait_image_visit_submit_doc").hide();
	alert ("Please on your GPS")
	//$("#visit_submit_doc").show();
	//$("#visit_location_doc").hide();
}






//========================================

function codeLatLng(lat, lng) {
	
    var geocoder;
	//alert ('sdfds')
	geocoder = new google.maps.Geocoder();
	
	var latlng = new google.maps.LatLng(lat, lng);
	//alert (latlng)
	geocoder.geocode(
		{'latLng': latlng}, 
		function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						
						var add= results[0].formatted_address ;
						var add1= results[1].formatted_address ;
						var add2= results[2].formatted_address ;
						//alert (add2)
						//alert (add1)
						var  value=add.split(",");
						var  value1=add1.split(",");
						var  value2=add2.split(",");
						
						state=value2[1];
						city=value2[0];
						area=value1[0];
						road=value[0];
						localStorage.location_detail=state+','+city+','+area+','+road;
						//alert (localStorage.location_detail)
					}
					else  {
						alert("address not found");
					}
			}
			 else {
				alert("Geocoder failed due to: " + status);
			}
		}
	);
  }

//====================================
//set confirm page

function set_confirm_page(){
	$("#wait_image_visit_submit").hide();
	$("#visit_submit").hide();
	$("#visit_location").show();
	
	
	//$("#lat").val(0);
	//$("#longitude").val(0);
	
	$("#lat_p").val(0);
	$("#long_p").val(0);
	$("#checkLocation").html('');
	
	
	$("#wait_image_visit_submit_doc").hide();
	$("#visit_submit_doc").show();
	//$("#visit_location_doc").show();
	$("#checkLocation_doc").html('');
	
	
}


		




//=======================================

function imageSinglePage() {	

	$.afui.loadContent("#imageSinglePage",true,true,'right');
}




function page_PrescriptionCapture() {	

	$.afui.loadContent("#page_PrescriptionCapture",true,true,'right');
}

function prescriptionSave(){
		      
			 
			var m_id=$("#m_id").val();
			var mobile_no=$("#mobile_no").val();
			var p_image=$("#p_image").val();
			var notes=$("#notes").val();
			var submit_date_time=$("#submit_date_time").val();
			
	
			
		//	alert(salary);
//alert('ok')
				
			alert(apipath+'prescriptionSubmit?cid='+localStorage.cid+'&mobile_no='+localStorage.mobile_no+'&m_pass='+encodeURIComponent(localStorage.m_pass)+'&synccode='+localStorage.sync_code+'&m_id='+m_id+'&mobile_no='+mobile_no+'&p_image='+p_image+'&notes='+notes+'&submit_date_time='+submit_date_time)
		
			$.ajax({
					type: 'POST',
					url:apipath+'prescriptionSubmit?cid='+localStorage.cid+'&mobile_no='+localStorage.mobile_no+'&m_pass='+encodeURIComponent(localStorage.m_pass)+'&synccode='+localStorage.sync_code+'&m_id='+m_id+'&mobile_no='+mobile_no+'&p_image='+p_image+'&notes='+notes+'&submit_date_time='+submit_date_time,
					
					
					
					   
					   success: function(result2) {
						
						if(result2=='Success'){							
						  
							$(".errorChk").text("Submitted Successfully");
							$("#pSaveBtn").show();						
						}else{
							$(".errorChk").text('Unauthorized Access');																	
							$("#pSaveBtn").show();
							}
					   
					   }});
						
		}
		 
		 
//=============================================		 
	
//--------------------------------------------- Exit Application

function exit() {	
	navigator.app.exitApp();
}

//--------------------------------------------- 


//=================Notice===========
function page_notice() {
//alert('adhgfcdasgj')

 //    var m_name=$("#m_name").val();
//      var m_age=$("#m_age").val();
			//alert (apipath+'check_user?cid='+localStorage.cid+'&mobile_no='+mobile_no+'&m_pass='+encodeURIComponent(m_pass)+'&sync_code='+localStorage.sync_code)		

      alert(apipath+'notice?cid='+localStorage.cid+'&mobile_no='+localStorage.mobile_no+'&m_pass='+encodeURIComponent(localStorage.m_pass)+'&sync_code='+localStorage.sync_code)
     // alert('hello')
      
      $.ajax({
        type:'GET',
        url:apipath+'notice?cid='+localStorage.cid+'&mobile_no='+localStorage.mobile_no+'&m_pass='+encodeURIComponent(localStorage.m_pass)+'&sync_code='+localStorage.sync_code,
        
    //    +'&m_id='+m_id+'&status='+status
        
        success: function(noticeStr) {
       //     alert(noticeStr)
			  noticeList=noticeStr.split('<rd>');
			  strShow="";			  
			  for (i=0;i<noticeList.length;i++){
			  	noticeRec = 	noticeList[i]				
				strList=noticeRec.split('<fd>')				
				var	notice_date = strList[0]
				var	notice = strList[1]
//				var	age = strList[2]
//				var	salary = strList[3]
//				var	designation = strList[4]


				$('#tblOne').append('<tr><td>'+notice_date+'</td><td>'+notice+'</td></tr>');
                



				
					
				}	
				/*alert (strShow)					
				$(".errorChking").html(strShow);*/
			  }
			}
	
		);	
	






	$.afui.loadContent("#noticePage",true,true,'right');
}





/************  prescription_submit **************/
function prescription_submit(){
	$("#error_prescription_submit").html("")		
	$("#wait_image_prescription").show();
	$("#btn_prescription_submit").hide();
	
	var doctorId=localStorage.visit_client.split('|')[1]	
	var doctor_name=localStorage.visit_client.split('|')[0]
	
	var areaId=localStorage.visit_market_show.split('|')[1]
	
	
	//alert (checkOther)
	if (doctor_name==''){		
		$("#error_prescription_submit").text("Required Doctor");
		$("#wait_image_prescription").show();
		$("#btn_prescription_submit").hide();
	}else{
		
		var latitude=$("#lat").val();
		var longitude=$("#longitude").val();
		//alert (longitude)		
		var picNo = localStorage.picNo
		var imageDiv="myImage"+picNo
		var imageText="prPhoto"+picNo
		var prescriptionPhoto=$("#"+imageText).val();
		
		
		
		
		
		
		//prescriptionPhoto='dasdfadf'
		//if (prescriptionPhoto==''){
//			$("#error_prescription_submit").html('Required picture');
//			$("#wait_image_prescription").hide();
//			$("#btn_prescription_submit").show();
//		}else{		
			var medicine_1=$("#medicine_1").val();
			var medicine_2=$("#medicine_2").val();
			var medicine_3=$("#medicine_3").val();
			var medicine_4=$("#medicine_4").val();
			var medicine_5=$("#medicine_5").val();	
			var now = $.now();
			 //alert 	('1')
			var imageName=localStorage.user_id+'_'+now.toString()+'.jpg';
				 
				// alert 	(localStorage.base_url+'prescription_submit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+encodeURIComponent(localStorage.user_pass)+'&synccode='+localStorage.synccode+'&areaId='+areaId+'&doctor_id='+encodeURIComponent(doctorId)+'&doctor_name='+encodeURIComponent(doctor_name)+'&latitude='+latitude+'&longitude='+longitude+'&pres_photo='+imageName+'&campaign_doc_str='+localStorage.prProdID_Str+'&opProdID_Str='+localStorage.opProdID_Str+'&medicine_1='+medicine_1+'&medicine_2='+medicine_2+'&medicine_3='+medicine_3+'&medicine_4='+medicine_4+'&medicine_5='+medicine_5+'&checkOther='+checkOther)
				$("#errorShow").val(localStorage.base_url+'prescription_submit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+encodeURIComponent(localStorage.user_pass)+'&synccode='+localStorage.synccode+'&areaId='+areaId+'&doctor_id='+encodeURIComponent(doctorId)+'&doctor_name='+encodeURIComponent(doctor_name)+'&latitude='+latitude+'&longitude='+longitude+'&pres_photo='+imageName+'&campaign_doc_str='+localStorage.prProdID_Str+'&opProdID_Str='+localStorage.opProdID_Str+'&medicine_1='+medicine_1+'&medicine_2='+medicine_2+'&medicine_3='+medicine_3+'&medicine_4='+medicine_4+'&medicine_5='+medicine_5+'&checkOther='+checkOther)
				 $.ajax(localStorage.base_url+'prescription_submit?cid='+localStorage.cid+'&rep_id='+localStorage.user_id+'&rep_pass='+encodeURIComponent(localStorage.user_pass)+'&synccode='+localStorage.synccode+'&areaId='+areaId+'&doctor_id='+encodeURIComponent(doctorId)+'&doctor_name='+encodeURIComponent(doctor_name)+'&latitude='+latitude+'&longitude='+longitude+'&pres_photo='+imageName+'&campaign_doc_str='+localStorage.prProdID_Str+'&opProdID_Str='+localStorage.opProdID_Str+'&medicine_1='+medicine_1+'&medicine_2='+medicine_2+'&medicine_3='+medicine_3+'&medicine_4='+medicine_4+'&medicine_5='+medicine_5+'&checkOther='+checkOther,{
								// cid:localStorage.cid,rep_id:localStorage.user_id,rep_pass:localStorage.user_pass,synccode:localStorage.synccode,
								type: 'POST',
								timeout: 30000,
								error: function(xhr) {
											alert (data)
											var resultArray = data.split('<SYNCDATA>');
											$("#error_prescription_submit").html(resultArray[1]);
											$("#wait_image_prescription").hide();
											$("#btn_prescription_submit").show();
											
								},
							success:function(data, status,xhr){				
						//alert (status)
								if (status!='success'){
									
									$("#error_prescription_submit").html('Network timeout. Please ensure you have active internet connection.');
									$("#wait_image_prescription").hide();
									$("#btn_prescription_submit").show();
								}
								else{
									//alert (data)
									   var resultArray = data.split('<SYNCDATA>');	
										if (resultArray[0]=='FAILED'){						
											$("#error_prescription_submit").html(resultArray[1]);
											$("#wait_image_prescription").hide();
											$("#btn_prescription_submit").show();
										}else if (resultArray[0]=='SUCCESS'){									
											//var result_string=resultArray[1];
											
											
											localStorage.opProdID_Str='';
											localStorage.prProdID_Str='';
											oprtunityVal='';
											optionVal='';
											//alert (result_string)
										
											//image upload function	
											//alert (prescriptionPhoto +'  ,  '+ imageName)								
											uploadPhoto(prescriptionPhoto, imageName);
											//var picNo=parseInt(localStorage.picFlag)+1 
											
										
											imageSource=''
											var image = document.getElementById(imageDiv);
											image.src = imageSource;
											imagePath = imageSource;
											$("#"+imageText).val(imagePath);
											if (picNo==1){localStorage.prPhoto1=''}
											if (picNo==2){localStorage.prPhoto2=''}
											if (picNo==3){localStorage.prPhoto3=''}
											if (picNo==4){localStorage.prPhoto4=''}
											if (picNo==5){localStorage.prPhoto5=''}
											if (picNo==6){localStorage.prPhoto6=''}
											if (picNo==7){localStorage.prPhoto7=''}
											if (picNo==8){localStorage.prPhoto8=''}
											if (picNo==9){localStorage.prPhoto9=''}
											if (picNo==10){localStorage.prPhoto10=''}

				
											
											 
											$('#market_combo_id_lv').empty();
											$('#market_combo_id_lv').append(localStorage.unschedule_market_cmb_id);

											
											//alert ('aaaa')
											$("#lat").val("");
											$("#long").val("");
											//alert ('1')
											//$("#prescriptionPhoto").val("");
											
											$(checkOther).prop('checked', false);
											$("#medicine_1").val('');
											$("#medicine_2").val('');
											$("#medicine_3").val('');
											$("#medicine_4").val('');
											$("#medicine_5").val('');
											$("#wait_image_prescription").hide();
											$("#btn_prescription_submit").show();
											
											getDocDataprCart()
											getDocDataopCart()
											$("#pr_id_lv").empty()
											setPrProduct()
											$("#op_id_lv").empty()
											setOpProduct()

											//--------------------------
											//if (picNo==1){localStorage.prPhoto1=''}
//											if (picNo==2){localStorage.prPhoto2=''}
//											if (picNo==3){localStorage.prPhoto3=''}
//											if (picNo==4){localStorage.prPhoto4=''}
//											if (picNo==5){localStorage.prPhoto5=''}
//											if (picNo==6){localStorage.prPhoto6=''}
//											if (picNo==7){localStorage.prPhoto7=''}
//											if (picNo==8){localStorage.prPhoto8=''}
//											if (picNo==9){localStorage.prPhoto9=''}
//											if (picNo==10){localStorage.prPhoto10=''}
//											for (j=0; j < 10; j++){
//												var picNoGet=parseInt(j)+1 
//												var imageDiv="myImage"+picNoGet
//												var imageText="prPhoto"+picNoGet
//												var imageSource=''
//												if (picNoGet==1){imageSource=localStorage.prPhoto1}
//												if (picNoGet==2){imageSource=localStorage.prPhoto2}
//												if (picNoGet==3){imageSource=localStorage.prPhoto3}
//												if (picNoGet==4){imageSource=localStorage.prPhoto4}
//												if (picNoGet==5){imageSource=localStorage.prPhoto5}
//												if (picNoGet==6){imageSource=localStorage.prPhoto6}
//												if (picNoGet==7){imageSource=localStorage.prPhoto7}
//												if (picNoGet==8){imageSource=localStorage.prPhoto8}
//												if (picNoGet==9){imageSource=localStorage.prPhoto9}
//												if (picNoGet==10){imageSource=localStorage.prPhoto10}
//												
//												var image = document.getElementById(imageDiv);
//												image.src = imageSource;
//												imagePath = imageSource;
//												$("#"+imageText).val(imagePath);
//											}

											$.afui.loadContent("#page_confirm_visit_success",true,true,'right');
											
											
										}else{						
											$("#error_prescription_submit").html('Authentication error. Please register and sync to retry.');
											$("#wait_image_prescription").hide();
											$("#btn_prescription_submit").show();
											}
								}
}
						});			 
				
						
//		}pic else
	}
//$.afui.loadContent("#page_confirm_visit_success",true,true,'right');
}

/************  prescription_submit End **************/



//=================================

function NewMempage() {	

	$.afui.loadContent("#signUpPage",true,true,'right');
}


/*********2017/09/26************/	
function newMemReg(){
	
	
	  
	  var m_name=$("#m_name").val();
	  var m_age=$("#m_age").val();
//	  var gender=$("#gender").val();
	  var gender=($("input:radio[name='gender']:checked").val())
	//alert (bonus_combo)
	  var mobile_no=$("#mobile_no").val();
	  var m_pass=$("#m_pass").val();
	 
	  var div_name=$("#div_name").val();
      
	  var dist_name=$("#dist_name").val();
	  var address=$("#address").val();
//	  alert (m_pass)
	  
/*	  if (name==""){
			$(".errorChk").text("Please enter your name!");
			
	  }else if(mobile==""){
			$(".errorChk").text("Enter valid phone number");
			
	  }else if(ageRange==""){
			$(".errorChk").text("Please select an option");
	  }else{*/
	//  alert (otltName)
     // alert ('hi')
	  alert(apipath+'memDetailsSave?cid='+localStorage.cid+'&mobile_no='+localStorage.mobile_no+'&m_pass='+encodeURIComponent(localStorage.m_pass)+'&sync_code='+localStorage.sync_code+'&m_id='+m_id+'&m_name='+m_name+'&m_age='+m_age+'&gender='+gender+'&mobile_no='+mobile_no+'&m_pass='+m_pass+'&div_name='+div_name+'&dist_name='+dist_name+'&address='+address)
//	  alert('hello')
	  
	  $.ajax({
		type:'POST',
		url:apipath+'memDetailsSave?cid='+localStorage.cid+'&mobile_no='+localStorage.mobile_no+'&m_pass='+encodeURIComponent(localStorage.m_pass)+'&sync_code='+localStorage.sync_code+'&m_name='+m_name+'&m_age='+m_age+'&gender='+gender+'&mobile_no='+mobile_no+'&m_pass='+m_pass+'&div_name='+div_name+'&dist_name='+dist_name+'&address='+address,
		
	//	+'&m_id='+m_id+'&status='+status
		
        success: function(result1) {
			
			if (result1!='Success'){
			$(".errorChk").text("Submitted Successfully");
			$("#memRegbtn").hide();
			$.afui.loadContent("#login",true,true,'right');
			}else{
			$("#memRegbtn").show();
			$.afui.loadContent("#signUpPage",true,true,'right');		
			}

		}      
	  
	  });
	  }
	  



	
	
//}

/******* 2017/09/26 **************/

function payment_mode(){
	var payment_mode='CASH'
	payment_mode=($("input:radio[name='payment_mode']:checked").val())
	var bonus_combo=($("input:radio[name='bonus_combo']:checked").val())
	//alert (bonus_combo)
	$("#wait_image_visit_submit").hide();
	//$.afui.loadContent("#page_visit",true,true,'right');
	localStorage.payment_mode=payment_mode
	//alert (localStorage.payment_mode)
}


//============================================
function gotoPic(picNo) {
	var imageDiv="myImage"+picNo
	var imageText="prPhoto"+picNo
	
	//if (picNo!=localStorage.picNo){
//		localStorage.prProdID_Str=''
//		localStorage.opProdID_Str=''
//		getDocDataprCart()
//		$("#pr_id_lv").empty()
//		setPrProduct()
//		$("#op_id_lv").empty()
//		setOpProduct()
//	}
	localStorage.picNo=picNo
	
	var prPic=$("#"+imageText).val();
	
	var image_show = document.getElementById('myImagePrescription_show');
	image_show.src = prPic;
	$("#myImagePrescription_show").val(prPic)
	
	//alert (prPic)
	if (prPic!=''){		
	$.afui.loadContent("#imageSinglePage",true,true,'right');
	}
}



function page_prItemPage(){
	
	$.afui.loadContent("#page_prItemPage",true,true,'right');
}

/**********  page_opItemPage ***********/
/*function page_opItemPage(){
	//setOpProduct();
	$("#opitemSearch").val('');
	$("#medicineList").empty();
	
	//localStorage.opProdID_Str='';
	$.afui.loadContent("#page_opItemPage",true,true,'right');
}
*/


//========================================UploadImages================


function takePicture(){
navigator.camera.getPicture( cameraSuccess, cameraError, {
		quality: 90,
		targetWidth: 400,
       // destinationType: Camera.DestinationType.FILE_URI,
		destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true ,
        correctOrientation: true,
        saveToPhotoAlbum: true
    }); 
	
}

function cameraSuccess(uri){  
	localStorage.picFlag=0
	var picNo=parseInt(localStorage.picFlag)+1 
	var imageDiv="myImage"+picNo
	var imageText="prPhoto"+picNo
	localStorage.picFlag=picNo
	var image = document.getElementById(imageDiv);
	image.src = uri;
	imagePath = uri;
	if (picNo==1){
		localStorage.prPhoto1=uri
	}
	if (picNo==2){
		localStorage.prPhoto2=uri
	}
	if (picNo==3){
		localStorage.prPhoto3=uri
	}
	if (picNo==4){
		localStorage.prPhoto4=uri
	}
	if (picNo==5){
		localStorage.prPhoto5=uri
	}
	if (picNo==6){
		localStorage.prPhoto6=uri
	}
	if (picNo==7){
		localStorage.prPhoto7=uri
	}
	if (picNo==8){
		localStorage.prPhoto8=uri
	}
	if (picNo==9){
		localStorage.prPhoto9=uri
	}
	if (picNo==10){
		localStorage.prPhoto10=uri
	}
	//alert (uri)
	//takePicture();
	
	
   
    
	$("#"+imageText).val(imagePath);
        
}

function cameraError(message){
	var a=''
    //alert("Canceled!"); 
	
}

/***************  medicine search******************/
function searchMedicine(){
	// opitemSearch
	var searchValue = $("#opitemSearch").val();
	
	if(searchValue.length<3){
		$('#medicineList').html('<p>Type minimum 3 character <span style="color:red;"><sup>*</sup></span></p>');
	}
	else{
		//alert(apipath+'search_medicine?searchValue='+searchValue);
		$.ajax({
			  url: apipath+'search_medicine?searchValue='+searchValue,
			  success: function(resStr) {
				if (resStr!=""){
					keywordStr=resStr.split("||");
					  var keywordS='';
					  for (i=0;i<keywordStr.length;i++){
						  keywordLi=keywordStr[i].split("|")
						  var pID=keywordLi[0].trim();
						  var medName=keywordLi[1];
						  keywordS+='<li>'
						  keywordS+='<div  style="float:left; width:80%"  id="medId'+pID+'">'
						  keywordS+='<span onclick="medClickVal2(\''+pID+'\',\''+medName+'\')" style="margin-bottom:10px; " >'+medName+'</span>' 
						  keywordS+='</div>'
						  keywordS+='<div style="float:right; width:20%">'
						  /******* jahangirEditedStart20Feb medClickVal *********/
						  keywordS+='<input onmouseout="medClickVal(\''+pID+'\',\''+medName+'\')" id="inpId'+pID+'" type="number" style="width:56px; height:35px;" value=""/>'
						  /******* jahangirEditedEnd20Feb medClickVal *********/
						  keywordS+='</div>'
						  keywordS+='</li>'
					  }
					  
					$('#medicineList').empty();
					$('#medicineList').append(keywordS).trigger('create');
					 
					$(".error").text("");
					 
					  url="#page_opItemPage";					
					  $.mobile.navigate(url);
				
				
				}else{
					$(".error").text("Invalid keywords");
				}
			
			  }
			
		});
	}
}
