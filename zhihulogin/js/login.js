window.onload = function(){

	(function(){
		var switchToLogin = document.getElementById("switchToLogin");
		var switchToRegist = document.getElementById("switchToRegist");
		switchToLogin.addEventListener("click",function(){
			var login = document.getElementById("login").style.display = "block";
			var register = document.getElementById("register").style.display = 'none';
		});
		switchToRegist.addEventListener("click",function(){
				var login = document.getElementById("login").style.display = "none";
			var register = document.getElementById("register").style.display = 'block';
		});
	})();

	(function(){
		function isMail(mail){
			if(mail.match(/[\w\.]+@([\w-]+\.){1,63}[a-z]{2,}/)){
				return true;
			}else{
				return false;
			}
		}
		function isPhone(phoneNumber){
			if(phoneNumber.match(/^[0-9]{11}$/)){
				return true;
			}else{
				return false;
			}
		}
		//请填写手机号码或者邮箱
		var loginButton = document.getElementById("loginButton");
		loginButton.addEventListener("click",function(event){
			event.preventDefault();
			var mailOrPhone = document.getElementById("loginphoneOrMail").value;
			var password = document.getElementById("loginPassword").value;
			console.log(password);
			var innerHTML="";
			if(!mailOrPhone){
				innerHTML += '<li id="loginWarnAccount"><i class="fa fa-exclamation-circle fa-fw"></i>请填写手机号码或者邮箱</li>' 
			}else{
				if(!isPhone(mailOrPhone) && !isMail(mailOrPhone)){
					innerHTML += '<li id="loginWarnAccount"><i class="fa fa-exclamation-circle fa-fw"></i>请输入正确的手机号码或邮箱</li>';
				}
			}
			if(!password){
				innerHTML += '<li id="loginWarnPassword"><i class="fa fa-exclamation-circle fa-fw"></i>请填写密码</li>' ;
			}

			
			document.getElementById("loginFailure").style.display = "block";
			document.querySelector("#loginFailure ul").innerHTML = innerHTML;
		});

		var registerButton = document.getElementById("registerButton");
		registerButton.addEventListener("click",function(event){
			event.preventDefault();
			var name = document.getElementById("registerName").value;
			var innerHTML = "";
			if(!name){
				innerHTML +=  '<li id="registerWarnName"><i class="fa fa-exclamation-circle fa-fw"></i>请填写姓名</li>';
			}
			var mailOrPhone = document.getElementById("registerMailOrPhone").value;
			if(!mailOrPhone){
				innerHTML +=  '<li id="registerWarnMailOrPhone"><i class="fa fa-exclamation-circle fa-fw"></i>请填写手机号或邮箱</li>';
			}else{
				if(!isPhone(mailOrPhone) && !isMail(mailOrPhone)){
					innerHTML += '<li id="registerWarnMailOrPhone"><i class="fa fa-exclamation-circle fa-fw"></i>请输入正确的手机号码或邮箱</li>';
				}
			}
			var password = document.getElementById("registerPassword").value;
			if(!password){
				innerHTML += '<li id="registerWarnPassword"><i class="fa fa-exclamation-circle fa-fw"></i>请填写密码</li>';
			}
			document.getElementById("registerFailure").style.display = 'block';
			document.querySelector("#registerFailure ul").innerHTML = innerHTML;
		});

		(function(){
			document.getElementById("loginphoneOrMail").addEventListener("focus",function(){
				var loginWarnAccount = document.getElementById("loginWarnAccount");
				if(loginWarnAccount){
					loginWarnAccount.parentNode.removeChild(loginWarnAccount);
				}
				if(!document.querySelector("#loginFailure li")){
					document.getElementById("loginFailure").style.display = 'none';
				}
			});

			document.getElementById("loginPassword").addEventListener("focus",function(){
				var loginWarnPassword = document.getElementById("loginWarnPassword");
				if(loginWarnPassword){
					loginWarnPassword.parentNode.removeChild(loginWarnPassword);
				}
				
				if(!document.querySelector("#loginFailure li")){
					document.getElementById("loginFailure").style.display = 'none';
				}
			});
		})();

		document.getElementById("registerName").addEventListener("focus",function(){
				var registerWarnName = document.getElementById("registerWarnName");
				if(registerWarnName){
					registerWarnName.parentNode.removeChild(registerWarnName);
				}
				if(!document.querySelector("#registerFailure li")){
					document.getElementById("registerFailure").style.display = 'none';
				}
			});

			document.getElementById("registerPassword").addEventListener("focus",function(){
				var registerWarnPassword = document.getElementById("registerWarnPassword");
				if(registerWarnPassword){
					registerWarnPassword.parentNode.removeChild(registerWarnPassword);
				}
				
				if(!document.querySelector("#registerFailure li")){
					document.getElementById("registerFailure").style.display = 'none';
				}
			});


			document.getElementById("registerMailOrPhone").addEventListener("focus",function(){
				var registerWarnMailOrPhone = document.getElementById("registerWarnMailOrPhone");
				if(registerWarnMailOrPhone){
					registerWarnMailOrPhone.parentNode.removeChild(registerWarnMailOrPhone);
				}
				
				if(!document.querySelector("#registerFailure li")){
					document.getElementById("registerFailure").style.display = 'none';
				}
			});


	})();
}