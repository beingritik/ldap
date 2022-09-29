
var express = require('express');
var app = express();

var ldap = require('ldapjs');

app.listen(3000, function () {
    console.log("server started")
})

/*update the url according to your ldap address*/
var client = ldap.createClient({
    url: 'ldap://lntdccspoc.com'
});

/*use this to create connection*/
function authenticateDN(username, password) {

    /*bind use for authentication*/
    client.bind(username, password, function (err) {
        if (err) {
            console.log("Error in new connetion " + err)
        } else {
            /*if connection is success then go for any operation*/
            console.log("Success");

        }
    });
}
authenticateDN("Ritik Jain", "pass@123")
















// const ldap = require('ldapjs');

// const server = ldap.createServer();

// server.search('o=lntdccspoc',(req,res,next)=>{
//     console.log("search wala")

//     const obj ={
//         dn:req.dn.toString(),
//         attributes:{
//             objectclass:['organization','top'],
//             o:'lntdccspoc'
//         }
    
//     }
//     if(req.filter.matches(obj.attributes))
//     console.log("attributes")
//     res.send(obj);
//     res.end();

// })

// // server.listen(389,()=>{
// //     console.log('LDAP SERVER IS running at %s', server.url);

// // });


// var ActiveDirectory = require('activedirectory');
// var config = {
//     url: 'ldap://10.2.23.21:389',
//     baseDN: 'dc=lntdccspoc,dc=com'
// };

// var ad = new ActiveDirectory(config);

// var username = 'aquilh@lntdccsspoc.com';
// var password = 'pass@123';
// // Authenticate
// ad.authenticate(username, password, function(err, auth) {
//     if (err) {
//         console.log("first stage")
//         console.log('ERROR: '+JSON.stringify(err));
//         return;
//     }
//     if (auth) {
//         console.log('Authenticated!');
//     }
//     else {
//         console.log('Authentication failed!');
//     }

// });

// console.log("ritik");


// const ldap = require('ldapjs');
// const server = ldap.createServer();

// server.search('o=example',(req,res,next)=>{
//     const obj ={
//         dn:req.dn.toString(),
//         attributes:{
//             objectclass:['organization','top'],
//             o:'example'
//         }
    
//     }
//     if(req.filter.matches(obj.ttributes))
//     res.send(obj);
//     res.end();

// })
// server.listen(()=>{
//     console.log('LDAP SERVER IS running at %s', server.url);

// });


// var express = require('express');

// var app = express();



// var ldap = require('ldapjs');



// const port = process.env.PORT || 3002;



// app.listen(port, ()=>{


//     console.log('server is running at port :', port);

// });  





// var client = ldap.createClient({

//   url: `ldap//10.2.23.21:389`

// });

// function ldapauth(dn, password, callback) {

// var serverStatus;


// //dn = entry.object.dn from another ldap query

// client.bind(dn, password, function(err, res) {

//     if(err) {

//         console.log(['Error:',err.code, err.dn, err.message]);

//         serverStatus = err.code;

//         client.unbind();

//         return callback (serverStatus);

//     } else {

//         console.log('we are Inside');
//         console.log('Auth Status: ' + res.status);

//         if(res.status == 0) {

//             serverStatus = res.status;

//         } else {

//             serverStatus = 500;

//         }



