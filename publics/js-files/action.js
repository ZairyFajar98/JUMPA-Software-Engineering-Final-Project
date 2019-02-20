function tableClear(){
	while (negoTableElement.firstChild) {
		negoTableElement.removeChild(negoTableElement.firstChild);
	}
	while (upcoTableElement.firstChild) {
		upcoTableElement.removeChild(upcoTableElement.firstChild);
	}
	while (histTableElement.firstChild) {
		histTableElement.removeChild(histTableElement.firstChild);
	}
}

function sendForm(){
    let d = new Date();
    let data = {
        //from form
        firstPersonName: firebase.auth().currentUser.displayName,
        firstPerson: firebase.auth().currentUser.email,
        secondPerson : formElement.intemail.value,
        date : formElement.date.value,
        time : formElement.time.value,
        purpose : formElement.purposes.value,
        location : formElement.location.value,
        //aditional
        status : "negotiating",
        firstPersonStatus: "accept",
        secondPersonStatus: "reject",
        timestamp: d.getTime()
    }
    if(cekInput(data)){
        dbAppointmentsRef.push(data);
        alert("sent");
    }
}

function cekInput(data){
    if(data.secondPerson=="" || data.purpose=="" || data.date=="" || data.time=="" || data.location==""){
        alert('all field must be filled');
        return false;
    }
    let f = new Date(data.date);
    if(data.timestamp >= f.getTime()){
        console.log(data.timestamp,f.getTime());
        alert('date must be after today');
        return false;
    }
    return true;
}

function showInfo(data){
    homeElement.setAttribute('hidden','true');
    menuCompElement.setAttribute('hidden','true');
    menuNegoElement.setAttribute('hidden','true');
    menuUpcoElement.setAttribute('hidden','true');
    menuHistElement.setAttribute('hidden','true');
    menuInfoElement.removeAttribute('hidden');
    menuEditElement.setAttribute('hidden','true'); 
    infoForm.name.value = data.firstPersonName;
    infoForm.intemail.value = data.secondPerson;
    infoForm.purposes.value = data.purpose;
    infoForm.status.value = data.status;
    infoForm.date.value = data.date;
    infoForm.time.value = data.time;
    infoForm.location.value = data.location;
}

function editAppointment(data,key,editor){
    homeElement.setAttribute('hidden','true');
    menuCompElement.setAttribute('hidden','true');
    menuNegoElement.setAttribute('hidden','true');
    menuUpcoElement.setAttribute('hidden','true');
    menuHistElement.setAttribute('hidden','true');
    menuInfoElement.setAttribute('hidden','true');
    menuEditElement.removeAttribute('hidden');
    let d = new Date();
    editForm.name.value = data.firstPersonName;
    editForm.intemail.value = data.secondPerson;
    editForm.purposes.value = data.purpose;
    editForm.date.value = data.date;
    editForm.time.value = data.time;
    editForm.location.value = data.location;
    editBtnElement.addEventListener('click', function() {
        let dataBaru = {
            date : editElement.date.value,
            time : editElement.time.value,
            location : editElement.location.value,
            //additional
            timestamp: d.getTime(),
            firstPersonStatus: "reject",
            secondPersonStatus: "accept"
        }
    if(editor == "satu"){
        dataBaru.firstPersonStatus = "accept";
        dataBaru.secondPersonStatus = "reject";
    }
    console.log(dataBaru);
    if(cekInput(dataBaru)){
        dbAppointmentsRef.child(key).update(dataBaru);
        alert("edited");
    }
    negoMenu();   
    });
}
