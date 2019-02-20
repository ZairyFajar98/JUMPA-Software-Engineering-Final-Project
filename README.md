JUMPA

This is the final project of my Software Engineering course on 2018

JUMPA is a web-based application for making and maintaining appointments between two people, in which both parties can compose and/or negotiate their appointment requests/invitations in JUMPA website and they will get email notifications for every update made to their appointments. URL : https://jumpa-842c1.firebaseapp.com/

How to Use :
1. Extract to your directory, initialize firebase in that directory,
2. Configure your Firebase web integration
3. Create Firebase Realtime Database and enable Google Authentication in the Firebase console
4. Initialize Firebase Functions, then install dependencies with Firebase and SendGrid via npm at ./functions,
5. Get your Google Cloud API key and put it on ./publics/index.html, SendGrid API key and put it on ./functions/index.js then serve with Firebase to run it.
