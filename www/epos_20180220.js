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

var  apipath ='http://127.0.0.1:8000/epos/syncmobile_epos/'

//var apipath_image='http://i001.yeapps.com/image_hub/unigift/upload_image/'


//var  apipath ='http://w02.yeapps.com/epos/syncmobile_epos/'
//var apipath_image='http://i001.yeapps.com/image_hub/epos/upload_image/'

/******** EPOS apipath *****************/



    $(document).ready(function(){
        $.afui.launch();
		
		
		$('#mIDshow').html(localStorage.m_id);
		
		
		localStorage.location_error=''
		$("#wait_image_login").hide();
		$("#wait_image_memRegbtn").hide();
		$("#wait_image_pSaveBtn").hide();
		

		$("#loginButton").show();
		$("#errorChk").html("");

		
		
		getLocationInfo_ready();
		
		
		//alert (localStorage.sync)
		//if (localStorage.sync=='YES'){
//			//homePage();
//			$.afui.loadContent("#page_PrescriptionCapture",true,true,'right');
//		}
		//alert (localStorage.sync)
		if (localStorage.sync!='YES'){
			
			$.afui.loadContent("#signUpPage",true,true,'right');	
		}
//<!--------------------------------------03/01/18-------------------------->							

	
		
		
    });

    //if($.os.ios)
        $.afui.animateHeader(true);
	//	getLocation()










//=============================================

//page_PrescriptionCapture

function homePage() {
	
	$("#pSaveBtn").show();
	$.afui.loadContent("#page_PrescriptionCapture",true,true,'right');

}



//function page_login() {
//	
//	$.afui.loadContent("#login",true,true,'right');
//}







function reload_function() {
	location.reload();
}


function getLocationInfo() { //location
	$("#lat").val(0);
	$("#longitude").val(0);
	
	
	$("#wait_image_visit_submit").show()
	$("#visit_submit").hide();
	$("#visit_location").hide();
	
	
	
	
	//$("#wait_image_visit_submit_doc").hide()
	//$("#visit_submit_doc").show();
	//$("#visit_location_doc").hide();
	$("#checkLocation_doc").html('');
	
	
	
	$("#errorChkVSubmit").html('');
	//$("#errorConfiProfileUpdate").html('');
	//$("#errorChkVSubmit_doc").html('');
	
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
//	$("#wait_image_visit_submit").hide();
	$("#visit_submit").show();
	$("#visit_location").hide();
	
    $("#checkLocation_doc").html('');
//	$("#wait_image_visit_submit_doc").hide();
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



/************  Image **************/

function upload_image(imageURI, imageName) {
   // alert (localStorage.photo_submit_url)
   //alert (imageURI+' |  '+imageName)
	var options = new FileUploadOptions();
    options.fileKey="upload";
    options.fileName=imageName;
    options.mimeType="image/jpeg";
	
    var params = {};
    params.value1 = "test";
    params.value2 = "param";
	
    options.params = params;
	options.chunkedMode = false;
	
    var ft = new FileTransfer();
     ft.upload(imageURI, encodeURI(apipath_image),winProfile,failProfile,options);
	 
}

function winProfile(r) {
}

function failProfile(error) {
	//$("#error_prescription_submit").text('Memory Error. Please take new picture and Submit');
}		



/************  Image **************/

function imageSinglePage() {	

	$.afui.loadContent("#imageSinglePage",true,true,'right');
}




function page_PrescriptionCapture() {	
	$("#errorChk").html("");
	$.afui.loadContent("#page_PrescriptionCapture",true,true,'right');
}


/************  prescription_submit **************/


function prescriptionSave(){
//		   $("#pSaveBtn").hide();   
			//var cid= 'EPOS'
			//alert('hi')
			//$('#mIDshow').html(localStorage.m_id);
			
			
			//var m_id=$("#m_id").val();
			//var mobile_no=$("#mobile_no").val();
			var prescriptionPhoto=$("#prPhoto1").val();
			var notes=$("#notes").val();
			//var submit_date_time=$("#submit_date_time").val();
			
			var tempTime = $.now();
			var p_image=tempTime.toString()+"_pr.jpg";
			
			//alert(m_id)
			//alert(p_image)
//alert('ok')
				
			//alert(apipath+'prescriptionSubmit?cid='+localStorage.cid+'&mobile_no='+localStorage.mobile_no+'&m_id='+localStorage.m_id+'&p_image='+p_image+'&notes='+notes)
			
			
		//	+'&sync_code='+localStorage.sync_code
		//	+'&m_pass='+encodeURIComponent(localStorage.m_pass)
		//+'&submit_date_time='+submit_date_time
		$("#wait_image_pSaveBtn").show();
		$("#pSaveBtn").hide();
			$.ajax({
					//type: 'POST',
					url:apipath+'prescriptionSubmit?cid='+localStorage.cid+'&mobile_no='+localStorage.mobile_no+'&m_id='+localStorage.m_id+'&p_image='+p_image+'&notes='+notes,
					type: 'POST',
							timeout: 30000,
							error: function(xhr) {
							//alert ('Error: ' + xhr.status + ' ' + xhr.statusText);
							$("#wait_image_pSaveBtn").hide();
							$("#pSaveBtn").show();
							
							$("#errorChk").html('Network Timeout. Please check your Internet connection..');
						},
					
					   
					   success: function(result2) {
						   
						 var resultArray = result2.split('<SYNCDATA>');
			             //alert (resultArray)
						 
						//$("#wait_image_pSaveBtn").hide();
						//$("#pSaveBtn").show();
						
						if (resultArray[0]=='Success'){
						//if(result2=='Success'){							
						   $("#wait_image_pSaveBtn").hide();
						   $("#pSaveBtn").show();
							//alert (prescriptionPhoto)
							//alert (p_image)
							upload_image(prescriptionPhoto, p_image);
							
							
							//var imageDiv="myImage1"
//							var myImagePrescription_show="myImagePrescription_show"
//							var uri=''
//							var image = document.getElementById(imageDiv);
//							var image1 = document.getElementById(myImagePrescription_show);
//							image.src = uri;
//							image1.src = uri;
//							
							$("#errorChk").html("");
							
							$("#notes").val('');
							
							$("#pSaveBtn").hide();
							
							//$("#pSaveBtn").show();
							
							$.afui.loadContent("#page_msg",true,true,'right');
							
													
						}else{
							//$("#errorChk").html('Unauthorized Access');
							
							if (resultArray[0]=='Failed'){
								
								$("#wait_image_pSaveBtn").hide();
																									
								$("#pSaveBtn").show();
								
								$("#errorChk").html(resultArray[1]);
							}
						}
					   
					   }});
						
		}
		 
		 
/************  prescription_submit_End **************/
	
//--------------------------------------------- Exit Application

function exit() {	
	navigator.app.exitApp();
}

//--------------------------------------------- 





//=================================




/*********2017/09/26************/	
function newMemReg(){
	//alert('hi')
	//alert(cid)
//	  var cid=$("#cid").val();
//	  var m_id=$("#m_id").val();
	  var m_name=$("#m_name").val();
	  var m_age=$("#m_age").val();
	  
	  var mobile_no=$("#mobile_no_Signup").val();
//	  var m_pass=$("#m_pass_Signup").val();
//	  var gender=$("#gender").val();
	  var gender=($("input:radio[name='gender']:checked").val())
	//alert (bonus_combo)

	 
	  var status=($("input:radio[name='status']:checked").val())
	  
	  var div_name=$("#div_name").val();
      
	  var dist_name=$("#dist_name").val();
	  
	  var area=$("#area").val();
	  
	  var address=$("#address").val();
	  
	
	  
	  //alert(apipath+'memDetailsSave?mobile_no='+mobile_no+'&m_name='+m_name+'&m_age='+m_age+'&gender='+gender+'&status='+status+'&div_name='+div_name+'&dist_name='+dist_name+'&area='+area+'&address='+address)
	  
	//  +'&m_pass='+encodeURIComponent(m_pass)
	  
	 // alert ('hi')
	// +'&sync_code='+sync_code
	 if ((m_name.length<1) ||(m_age.length<1) ||(mobile_no.length<1) ||(address.length<1)  ||(gender.length<1)){
		 
		 $("#errorChkMem").html('Please complete mandatory field');
		 
		 }else{
		 
		 $("#wait_image_memRegbtn").show();
	$("#memRegbtn").hide();


	  localStorage.sync=='NO'
	  $.ajax({
		//type:'POST',
		url:apipath+'memDetailsSave?mobile_no='+mobile_no+'&m_name='+m_name+'&m_age='+m_age+'&gender='+gender+'&status='+status+'&div_name='+div_name+'&dist_name='+dist_name+'&area='+area+'&address='+address,
		type: 'POST',
		timeout: 30000,
		error: function(xhr) {
			$("#wait_image_memRegbtn").hide();
			$("#memRegbtn").show();
			$("#memRegbtn").show();
			$("#errorChkMem").html('Network Timeout. Please check your Internet connection..');
			
		},

		 success:function(result, status,xhr){	
		 //success: function(result) {
			var resultArray = result.split('<SYNCDATA>');
			//alert (resultArray)
			
			if (resultArray[0]=='FAILED'){
				$("#wait_image_memRegbtn").hide();
				$("#memRegbtn").show();
				
			}
			
			else{
				if (resultArray[0]=='SUCCESS'){
					$("#wait_image_memRegbtn").hide();
					$("#memRegbtn").show();
					localStorage.sync_code=resultArray[1];
					localStorage.m_id=resultArray[2];
					
					localStorage.mobile_no=resultArray[3];
					
					localStorage.cid=resultArray[4];
					localStorage.sync='YES'
					
					$("#notes").val('');
					
					$('#mIDshow').html(localStorage.m_id);
					//alert (localStorage.cid)
					
					//alert (localStorage.mobile_no)
					//alert (localStorage.sync_code)
					//alert (localStorage.m_id)
					
					$("#memRegbtn").hide();
					$.afui.loadContent("#page_PrescriptionCapture",true,true,'right');
				}
			}

		}      
	  
	  });	
	  
	  }
	  }
	  

			  



/******* 2017/09/26 **************/



//============================================
function gotoPic(picNo) {
	var imageDiv="myImage"+picNo
	var imageText="prPhoto"+picNo
	


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



//function page_prItemPage(){
//	
//	$.afui.loadContent("#page_prItemPage",true,true,'right');
//}



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
	//localStorage.picFlag=0
	//var picNo=parseInt(localStorage.picFlag)+1 
	var imageDiv="myImage1"
	var imageText="prPhoto1"
	//var myImagePrescription_show="myImagePrescription_show"
	//localStorage.picFlag=picNo
	var image = document.getElementById(imageDiv);
	//var image1 = document.getElementById(myImagePrescription_show);
	image.src = uri;
	//image1.src = uri;
	imagePath = uri;
	
	//localStorage.prPhoto1=uri
	
	//alert (uri)
	//takePicture();
	
	
   
    
	$("#"+imageText).val(imagePath);
	
	
        
}

function cameraError(message){
	var a=''
    //alert("Canceled!"); 
	
}


