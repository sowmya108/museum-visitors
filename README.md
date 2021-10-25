# museum-visitors

A Simple Server in NodeJs that has one API to return museum visitors.

Given:
A date in milliseconds.
(Optional) museum to ignore

It will return:
The month of the search
The year of the search
The total visitors for the month, not counting the ignored museum
The museum with the highest number of visitors, not counting the ignored museum
The museum with the lowest number of visitors, not counting the ignored museum
The ignored museum.

Examples -
GET /api/visitors?date=dateInMilliseconds&ignore=museumToIgnore

To setup run the foloowing inside source directory -
Clone the repo &
Step 1 :  npm install 
Step 2 : nodemon index.js

