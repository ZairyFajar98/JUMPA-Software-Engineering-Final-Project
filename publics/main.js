/* 
.
DOM Selection 
.
*/

//element coresponding to user interface
const signinBtnElement = document.getElementById('signinBtn');
const signoutBtnElement = document.getElementById('signoutBtn');
const menuNavElement = document.getElementById('menuNav');
const notLogIntElement = document.getElementById('notLogInt');
const logIntElement = document.getElementById('logInt');
const homeElement = document.getElementById('home');
const menuCompElement = document.getElementById('menuComp');
const menuNegoElement = document.getElementById('menuNego');
const menuUpcoElement = document.getElementById('menuUpco');
const menuHistElement = document.getElementById('menuHist');
const menuInfoElement = document.getElementById('menuInfo');
const menuEditElement = document.getElementById('menuEdit');
const fotoUserElement = document.querySelector('nav img');
const namaUserElement = document.querySelector('nav .nama-user');
//menu button element
const logoBtnElement = document.getElementById('logoBtn');
const compMenuBtnElement = document.getElementsByClassName('compMenuBtn');
const negoMenuBtnElement = document.getElementsByClassName('negoMenuBtn');
const upcoMenuBtnElement = document.getElementsByClassName('upcoMenuBtn');
const histMenuBtnElement = document.getElementsByClassName('histMenuBtn');
//table element
const negoTableElement = menuNegoElement.querySelector('tbody');
const upcoTableElement = menuUpcoElement.querySelector('tbody');
const histTableElement = menuHistElement.querySelector('tbody');  
//element that exist in compose menu
let formElement = document.getElementById('compForm');
const inputFormElement = formElement.querySelectorAll('input');
const inputPurposesElement = formElement.querySelector('textarea');
const formCancelElement = document.getElementById('cancelComp');
//element that exist in info form
let infoElement = document.getElementById('infoForm');
const backBtnElement = document.getElementById('infoBackBtn');
//element coresponding to edit action
let editElement = document.getElementById('editForm');
const editBtnElement = editElement.querySelector('button');
const editCancelElement = document.getElementById('cancelEdit');

/*
.
Firebase Realtime Database variable declaration
.
*/

const db = firebase.database();
const dbAppointmentsRef = db.ref('appointments');
const dbUsersRef = db.ref('users');

/*
.
Firebase Authentication variable declaration
.
*/
const provider = new firebase.auth.GoogleAuthProvider();


/* ---------------------------------------------------------------- */
let trackPosition = "home";

/* user sign-in function */
function signinFunc(){
    firebase.auth().signInWithPopup(provider).then(function(result){
        console.log("signin successful");
    }).catch(function(error){
        console.log(error);
    })
}
signinBtnElement.addEventListener('click',signinFunc);


/* user sign-out function */
function signoutFunc(){
    firebase.auth().signOut().then(function() {
        console.log("signout successful");
    }).catch(function(error){
        console.log(error);
    });
}
signoutBtnElement.addEventListener('click',signoutFunc);

/* 
action depends on status of the user ( sign in or sign out ) 
*/
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //UI change accordingly
        signinUI(user);
        //show data
        dbAppointmentsRef.on('value', snap => {
            // clear table
            tableClear();
            // retrieve data from the Firebase Realtime Database and show it on the table according to each appointment status and user
            snap.forEach(elt => {
                if(elt.child("firstPerson").val() == firebase.auth().currentUser.email || elt.child("secondPerson").val() == firebase.auth().currentUser.email){
                    //fill table in negotiating menu
                    if(elt.child("status").val() == "negotiating"){
                        //create DOM element
                        let cell1 = new Elt('td',elt.child("secondPerson").val());
                        let cell2 = new Elt('td',elt.child("location").val());
                        let cell3 = new Elt('td',elt.child("date").val());
                        let cell4 = new Elt('td',elt.child("time").val());
                        let cell5 = negoTableAction();
                        let row = new ParentElt('tr',cell1.getElt());
                        row.addChild(cell1.getElt());
                        row.addChild(cell2.getElt());
                        row.addChild(cell3.getElt());
                        row.addChild(cell4.getElt());
                        row.addChild(cell5.getElt());
                        row.addId(elt.key);
                        //append row to the table
                        negoTableElement.appendChild(row.getElt());
                    }
                    //fill table in upcoming menu
                    if(elt.child("status").val() == "upcoming"){
                        //create DOM element
                        let cell1 = new Elt('td',elt.child("secondPerson").val());
                        let cell2 = new Elt('td',elt.child("location").val());
                        let cell3 = new Elt('td',elt.child("date").val());
                        let cell4 = new Elt('td',elt.child("time").val());
                        let cell5 = upcoTableAction();
                        let row = new ParentElt('tr',cell1.getElt());
                        row.addChild(cell1.getElt());
                        row.addChild(cell2.getElt());
                        row.addChild(cell3.getElt());
                        row.addChild(cell4.getElt());
                        row.addChild(cell5.getElt());
                        row.addId(elt.key);
                        //append row to the table
                        upcoTableElement.appendChild(row.getElt());
                    }
                    //fill table in history menu
                    if(elt.child("status").val() == "done"){
                        //create DOM element
                        let cell1 = new Elt('td',elt.child("secondPerson").val());
                        let cell2 = new Elt('td',elt.child("location").val());
                        let cell3 = new Elt('td',elt.child("date").val());
                        let cell4 = new Elt('td',elt.child("time").val());
                        let cell5 = histTableAction();
                        let row = new ParentElt('tr',cell1.getElt());
                        row.addChild(cell1.getElt());
                        row.addChild(cell2.getElt());
                        row.addChild(cell3.getElt());
                        row.addChild(cell4.getElt());
                        row.addChild(cell5.getElt());
                        row.addId(elt.key);
                        //append row to the table
                        histTableElement.appendChild(row.getElt());
                    }
                }

            });
        });
    } else {
        //UI change accordingly
        signoutUI();
    }
  });

//compose action
//cancel
formCancelElement.addEventListener('click',function(){
    inputFormElement.forEach(inp => {
        inp.value = inp.defaultValue;
    });
    inputPurposesElement.value = "";
    homePage();
    return null;
})

//negotiating table action
negoTableElement.addEventListener('click',e => {
    if(e.target.innerHTML == 'Agree'){
        dbAppointmentsRef.child(e.path[3].id).once('value',snap => {
            let dataBaru = {
                firstPersonStatus: snap.child("firstPersonStatus").val(),
                secondPersonStatus: snap.child("secondPersonStatus").val(),
                status: snap.child("status").val()
            }
            if(snap.child("firstPerson").val() == firebase.auth().currentUser.email && snap.child("firstPersonStatus").val() == "reject"){
                //sender accept
                dataBaru.firstPersonStatus = "accept";
            }else if(snap.child("secondPerson").val() == firebase.auth().currentUser.email && snap.child("secondPersonStatus").val() == "reject" ){
                //receiver accept
                dataBaru.secondPersonStatus = "accept";
            }else{
                alert("already agreed, because the appointment last edited by you");
            }
            if(dataBaru.firstPersonStatus == "accept" && dataBaru.secondPersonStatus == "accept"){
                dataBaru.status = "upcoming";
            }
            dbAppointmentsRef.child(snap.key).update(dataBaru);
        });
    }
    if(e.target.innerHTML == 'Edit'){
        dbAppointmentsRef.child(e.path[3].id).once('value',snap => {
            if(snap.child("firstPerson").val() == firebase.auth().currentUser.email && snap.child("firstPersonStatus").val() == "reject"){
                //sender edit
                editAppointment(snap.val(),snap.key,"satu");
            }else if(snap.child("secondPerson").val() == firebase.auth().currentUser.email && snap.child("secondPersonStatus").val() == "reject" ){
                //receiver edit
                editAppointment(snap.val(),snap.key,"dua");
            }else{
                alert("can't edit until the appointment edited by the other person, because the appointment last edited by you");
            }
        });
    }
    if(e.target.innerHTML == 'Info'){
        dbAppointmentsRef.child(e.path[3].id).once('value',snap => {
            showInfo(snap.val());
        });
    }
});
editCancelElement.addEventListener('click',function(){
    negoMenu();
});

//upcoming table action
upcoTableElement.addEventListener('click',e => {
    if(e.target.innerHTML == 'Finish'){
        dbAppointmentsRef.child(e.path[3].id).once('value',snap => {
            let dataBaru = {
                status: 'done'
            };
            dbAppointmentsRef.child(snap.key).update(dataBaru);
        });
    }
    if(e.target.innerHTML == 'Info'){
        dbAppointmentsRef.child(e.path[3].id).once('value',snap => {
            showInfo(snap.val());
        });
    }
});

//History table action
histTableElement.addEventListener('click',e => {
    if(e.target.innerHTML == 'Delete'){
        dbAppointmentsRef.child(e.path[3].id).remove();
    }
    if(e.target.innerHTML == 'Info'){
        dbAppointmentsRef.child(e.path[3].id).once('value',snap => {
            showInfo(snap.val());  
        });
    }
});
backBtnElement.addEventListener('click',function() {
    if(trackPosition == "nego"){
        negoMenu();
    }else if(trackPosition == "upco"){
        upcoMenu();
    }else{
        homePage();
    }
})

//menu click
compMenuBtnElement[0].addEventListener('click',compMenu);
compMenuBtnElement[1].addEventListener('click',compMenu);
negoMenuBtnElement[0].addEventListener('click',negoMenu);
negoMenuBtnElement[1].addEventListener('click',negoMenu);
upcoMenuBtnElement[0].addEventListener('click',upcoMenu);
upcoMenuBtnElement[1].addEventListener('click',upcoMenu);
histMenuBtnElement[0].addEventListener('click',histMenu);
histMenuBtnElement[1].addEventListener('click',histMenu);
logoBtnElement.addEventListener('click',homePage);