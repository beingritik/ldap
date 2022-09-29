////for all attributes fetch


// var express = require('express');
// var app = express();
// var ldap = require('ldapjs');

// app.listen(3000, function () {
//     console.log("server started")
// })

// /*update the url according to your ldap address*/
// var client = ldap.createClient({
//     url: 'ldap://lntdccspoc.com'
// });

// /*use this to create connection*/
// function authenticateDN(username, password) {

//     /*bind use for authentication*/
//     client.bind(username, password, function (err) {
//         if (err) {
//             console.log("Error in new connetion " + err)
//         } else {
//             /*if connection is success then go for any operation*/
//             console.log("Success in connection");

//         }
//     });
// }

// authenticateDN("Ritikj@lntdccspoc.com", "pass@123");



// function searchUser() {
//     var opts = {
//         //  filter: '(objectClass=*)',  //simple search
//         //  filter: '(&(uid=2)(sn=John))',// and search
//         filter: '(objectClass=*)', // or search
//         scope: 'sub',
//         attributes: []
//     };

//     client.search('CN=Aquil hasan,CN=Users,DC=lntdccspoc,DC=com', opts, function (err, res) {
//         if (err) {
//             console.log("Error in search " + err)
//         } else {
//             res.on('searchEntry', function (entry) {
//                 console.log('entry: ' + JSON.stringify(entry.object));
//             });
//             res.on('searchReference', function (referral) {
//                 console.log('referral: ' + referral.uris.join());
//             });
//             res.on('error', function (err) {
//                 console.error('error: ' + err.message);
//             });
//             res.on('end', function (result) {
//                 console.log('status: ' + result.status);
//             });
//         }
//     });
// }

// searchUser();




// ////for selective attributes fetch

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
            console.log("Success in connection");

        }
    });
}

authenticateDN("Ritikj@lntdccspoc.com", "pass@123");

function searchUser() {
    const name= "Aquilh";
    var opts = {
        //  filter: '(objectClass=*)',  //simple search
        //  filter: '(&(uid=2)(sn=John))',// and search

        filter: `sAMAccountName=${name}`, // or search
        scope: 'sub',
        attributes: ['CN','userPrincipalName','name']
    };

    client.search('CN=Users,DC=lntdccspoc,DC=com', opts, function (err, res) {
        if (err) {
            console.log("Error in search " + err)
        } else {
            res.on('searchEntry', function (entry) {
                // console.log("here: "+entry);
                console.log('entry: ' + JSON.stringify(entry.object));
            });
            res.on('searchReference', function (referral) {
                console.log('referral: ' + referral.uris.join());
            });
            res.on('error', function (err) {
                console.error('error: ' + err.message);
            });
            res.on('end', function (result) {
                console.log('status: ' + result.status);
            });

           
        }
    });
}


// to fetch all members under one group

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
            console.log("Success in connection");

        }
    });
}

authenticateDN("Ritikj@lntdccspoc.com", "pass@123");


function fetchGroupUsers() {
    const name= "vdi-get-usergroup";
    var opts = {
        //  filter: '(objectClass=*)',  //simple search
        //  filter: '(&(uid=2)(sn=John))',// and search
        filter: `cn=${name}`, // or search
        scope: 'sub',
        attributes: []
    };

    client.search('CN=vdi-get-usergroup,CN=Users,DC=lntdccspoc,DC=com', opts, function (err, res) {
        if (err) {
            console.log("Error in search " + err)
        } else {
            res.on('searchEntry', function (entry) {
                //console.log("here we can fetch any key by our choice , like we are fetching member here: "+entry.object.member)
                console.log('entry: ' + JSON. stringify(entry.object));
            });
            res.on('searchReference', function (referral) {
                console.log('referral: ' + referral.uris.join());
            });
            res.on('error', function (err) {
                console.error('error: ' + err.message);
            });
            res.on('end', function (result) {
                console.log('status: ' + result.status);
            });

           
        }
    });
}

fetchGroupUsers();

//multiple

// exports.findall=((req,res)=>{
//     // console.log("all k under", req.body)
//     datab.find().then(data=>{
//         // console.log(data)
//         res.send(data)
//     })
//     .catch((err)=>{
//         res.status(500).send("error message in getting out:", err);
//     })
// });







// axios.get('mongodb://localhost:27017/userData').then((response) => {
    //     // res.render('./index', { users: response.data })
        
    //     console.log("stringified data :" + JSON.stringify(response.data));
    //     console.log("parsed data:", JSON.parse(JSON.stringify(response.data[0].userGroup)));
    //     vari = response.data[0]
    // }).then(()=>{
    //     adFunc(vari.userGroup);
    // }
    // )
    // .catch((err) => {
    //     res.send(err)
    // })