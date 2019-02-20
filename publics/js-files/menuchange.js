function signinUI(user){
	menuNavElement.removeAttribute('hidden');
	signinBtnElement.setAttribute('hidden','true');
	signoutBtnElement.removeAttribute('hidden');
	notLogIntElement.setAttribute('hidden','true');
	logIntElement.removeAttribute('hidden');
	fotoUserElement.src=user.photoURL;
	namaUserElement.innerHTML = user.displayName;
	inputFormElement[0].defaultValue = user.displayName;
}

function signoutUI(){
	menuNavElement.setAttribute('hidden','true');
	signoutBtnElement.setAttribute('hidden','true');
	signinBtnElement.removeAttribute('hidden');
	logIntElement.setAttribute('hidden','true');
	notLogIntElement.removeAttribute('hidden');
}

function homePage(){
    trackPosition = "home";
    homeElement.removeAttribute('hidden');
    menuCompElement.setAttribute('hidden','true');
    menuNegoElement.setAttribute('hidden','true');
    menuUpcoElement.setAttribute('hidden','true');
    menuHistElement.setAttribute('hidden','true');
    menuInfoElement.setAttribute('hidden','true'); 
    menuEditElement.setAttribute('hidden','true'); 
}

function compMenu(){
    trackPosition = "comp";
    homeElement.setAttribute('hidden','true');
    menuCompElement.removeAttribute('hidden');
    menuNegoElement.setAttribute('hidden','true');
    menuUpcoElement.setAttribute('hidden','true');
    menuHistElement.setAttribute('hidden','true');
    menuInfoElement.setAttribute('hidden','true');
    menuEditElement.setAttribute('hidden','true');  
}

function negoMenu(){
    trackPosition = "nego";
    homeElement.setAttribute('hidden','true');
    menuCompElement.setAttribute('hidden','true');
    menuNegoElement.removeAttribute('hidden');
    menuUpcoElement.setAttribute('hidden','true');
    menuHistElement.setAttribute('hidden','true');
    menuInfoElement.setAttribute('hidden','true');
    menuEditElement.setAttribute('hidden','true');  
}

function upcoMenu(){
    trackPosition = "upco";
    homeElement.setAttribute('hidden','true');
    menuCompElement.setAttribute('hidden','true');
    menuNegoElement.setAttribute('hidden','true');
    menuUpcoElement.removeAttribute('hidden');
    menuHistElement.setAttribute('hidden','true');
    menuInfoElement.setAttribute('hidden','true');
    menuEditElement.setAttribute('hidden','true');  
}

function histMenu(){
    trackPosition = "hist";
    homeElement.setAttribute('hidden','true');
    menuCompElement.setAttribute('hidden','true');
    menuNegoElement.setAttribute('hidden','true');
    menuUpcoElement.setAttribute('hidden','true');
    menuHistElement.removeAttribute('hidden');
    menuInfoElement.setAttribute('hidden','true');
    menuEditElement.setAttribute('hidden','true'); 
}