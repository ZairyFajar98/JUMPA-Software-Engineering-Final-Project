const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const SENDGRID_API_KEY = functions.config().sendgrid.key;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

exports.onAppointmentMade = functions.database.ref('/appointments/{id}').onCreate(event => {
    const data = event.val();
    let msg = {
        to: data.secondPerson,
        from: 'jumpa@appointment.com',
        subject: 'New Appointment',
        html: `
        <p> Hello there, you got new Appointment from `+ data.firstPersonName + `.</p><br>` +
        '<p>date: ' + data.date + '</p></br>' +
        '<p>time: ' + data.time + '</p></br>' +
        '<p>location: ' + data.location + '</p></br>' +
        '<p>purposes: ' + data.purpose + '</p></br>' +
        `<p> Check it out at <a href='https://jumpa-842c1.firebaseapp.com/'>JUMPA</a>`
    }
    console.log(msg);
    //todo: kirim email bahwa appointment telah dibuat
    sgMail.send(msg);
    return true;
});

exports.onAppointmentEdit = functions.database.ref('/appointments/{id}/timestamp').onUpdate(event => {
    event.after.ref.parent.once('value',snap => {
        data = snap.val();
        let msg = {
            //orang kedua ngedit
            to: data.firstPerson,
            from: 'jumpa@appointment.com',
            subject: 'Appointment Update',
            html: `
            <p> Hello there, one of your Appointment with `+ data.secondPerson + ` has been edited.</p><br>` +
            '<p>date: ' + data.date + '</p></br>' +
            '<p>time: ' + data.time + '</p></br>' +
            '<p>location: ' + data.location + '</p></br>' +
            '<p>purposes: ' + data.purpose + '</p></br>' +
            `<p> Check it out at <a href='https://jumpa-842c1.firebaseapp.com/'>JUMPA</a>`
        }
        if(data.firstPersonStatus == 'accept'){
            //orang pertama ngedit
            msg.to = data.secondPerson;
            msg.html = `
            <p> Hello there, one of your Appointment with `+ data.firstPerson + `.</p><br>` +
            '<p>date: ' + data.date + '</p></br>' +
            '<p>time: ' + data.time + '</p></br>' +
            '<p>location: ' + data.location + '</p></br>' +
            '<p>purposes: ' + data.purpose + '</p></br>' +
            `<p> Check it out at <a href='https://jumpa-842c1.firebaseapp.com/'>JUMPA</a>`;
        }
        console.log(msg);
        sgMail.send(msg);
    });  
    return true;
});

exports.onAppointmentSet = functions.database.ref('/appointments/{id}/status').onUpdate(event => {
    if(event.after.val() == 'upcoming'){
        event.after.ref.parent.once('value',snap => {
            data = snap.val();
            let msg = {
                //orang kedua ngedit
                to: data.firstPerson,
                from: 'jumpa@appointment.com',
                subject: 'Appointment Set',
                html: `
                <p> Hello there, one of the Appointment between `+ data.firstPerson + " and " + data.secondPerson + ` is set.</p><br>` +
                '<p>date: ' + data.date + '</p></br>' +
                '<p>time: ' + data.time + '</p></br>' +
                '<p>location: ' + data.location + '</p></br>' +
                '<p>purposes: ' + data.purpose + '</p></br>' +
                `<p> Check it out at <a href='https://jumpa-842c1.firebaseapp.com/'>JUMPA</a>`
            }
            sgMail.send(msg);
            msg.to = data.secondPerson;
            sgMail.send(msg);
        });
    }
    return true;
})

