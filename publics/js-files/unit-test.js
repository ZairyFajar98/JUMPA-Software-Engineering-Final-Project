/* OAuth testing
....................................
test sign in with this gmail account
email: masterarkoes99@gmail.com
name: Master Arkoes
log "correct" if match, and "incorrect" if doesnt match */

function authtest(){
    if(firebase.auth().currentUser.email == "masterarkoes99@gmail.com" && firebase.auth().currentUser.displayName == "Master Arkoes"){
        console.log("correct");
    }else{
        console.log("incorrect");
    }
}

/* Save data to database testing
...................................
compose appointment feature used to save data,
the test will save an already prepared data to database and compare between
prepared data and data that saved on the database
log "correct" if match, and "incorrect" if doesnt match */

function savingtest(){
    let dataTest = {
        firstPersonName: "check",
        firstPerson: "check@check.check.com",
        secondPerson : "test@test.test.com",
        date : "09:00",
        time : "23/12/2018",
        location: "depok",
        purpose : "testing",
        status : "negotiating",
        firstPersonStatus: "accept",
        secondPersonStatus: "reject"
    }
    key = dbAppointmentsRef.push(dataTest).getKey();
    dbAppointmentsRef.child(key).once('value',snap => {
        let status = "correct data";
        for(let prop in dataTest){
            if(dataTest.hasOwnProperty(prop)){
                if(dataTest.prop !== snap.val().prop){
                    status = "incorrect data";
                }
            }
        }
        console.log(status);
    });
}

/* Retrive data from database testing
......................................
in main.js file, when:
- data created trough compose appointment feature,
- status change in one of the appointments, or 
- appointments data update trough negotiate appointment feature
JUMPA will retrieve data and show it on the table
according to each appointment status.
in this test, function will retrieve already prepared data: 
2 negotiating, 1 upcoming, and 1 done.
then function will count the appointment for each status
log "correct" if match, and "incorrect" if doesnt match */
function retrievetest(){
    let nego = 0;
    let upcome = 0;
    let done = 0;
    dbAppointmentsRef.once('value', snap => {
        snap.forEach(appointment => {
            if(appointment.child("status").val() == "negotiating"){
                nego = nego + 1;
            }else if(appointment.child("status").val() == "upcoming"){
                upcome = upcome + 1;
            }else{
                done = done + 1;
            }
        });
    });
    if(nego == 2 && upcome == 1 && done == 1){
        console.log("retrieve data correct");
    }else{
        console.log("retrieve data incorrect");
    }
}

/* update data testing
negotiate feature have an action to edit appointment and 
update it on the database, this test is goint to update an appointment
with an already prepared data. then compare between
prepared data and data that saved on the database
log "correct" if match, and "incorrect" if doesnt match */
function updatetest(){
    let dataTest = {
        date : "10:00",
        time : "17/12/2018",
        location: "depoK 2"
    }
    key = "-LSUNyezSVIuvgYJp14r"
    dbAppointmentsRef.child(key).update(dataTest);
    dbAppointmentsRef.child(key).once('value',snap => {
        let status = "correct data";
        for(let prop in dataTest){
            if(dataTest.hasOwnProperty(prop)){
                if(dataTest.prop !== snap.val().prop){
                    status = "incorrect data";
                }
            }
        }
        console.log(status);
    });
}

/* delete data testing
history feature have an action to delete selected appointment
from the table and database also. this test will delete appointment
from database with specific key, then check if the appointment 
successfully deleted */
function deletetest(){
    let status = "succesfully deleted";
    let key = "-LSUP90GlQXZDPE-8Efl";
    dbAppointmentsRef.child(key).remove();
    dbAppointmentsRef.once('value', snap => {
        snap.forEach(app => {
            if(app.key == key){
                status = "delete unsuccessful";
            }
        });
    });
    console.log(status)
}
