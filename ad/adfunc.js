const ldap = require('ldapjs');
var client = ldap.createClient({
    url: 'ldap://lntdccspoc.com'
});

//for establishing the connection

exports.adFunc = function adFunc() {

    return new Promise((resolve, reject) => {

        client.bind("Ritikj@lntdccspoc.com", "pass@123", function (err) {
            if (err) {
                console.log("Error in new connetion " + err)
            } else {
                /*if connection is success then go for any operation*/
                console.log("Success in connection");
            }
        });
        resolve(123);
    })


}


//for fetching the memebers from the given  user group fetched from local mongo

exports.fetchGroupUsers = function fetchGroupUsers(mygroup) {

    return new Promise((resolve, reject) => {
        const group = mygroup;
        var opts = {
            //  filter: '(objectClass=*)',  //simple search
            //  filter: '(&(uid=2)(sn=John))',// and search
            filter: `cn=${group}`, // or search
            scope: 'sub',
            attributes: []
        };
        client.search('CN=Users,DC=lntdccspoc,DC=com', opts, function (err, res) {
            if (err) {
                console.log("Error in search " + err)
                reject();
            } else {
                res.on('searchEntry', function (entry) {
                    console.log('entry of findall: ' + entry.object.member);
                    groupval = entry.object.member;
                    resolve(groupval);
                    // end();
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

    })

}

// for  fetching  a single user info

exports.searchUser = function searchUser(user) {
    // console.log("the searchuser parameter is :",user)
    return new Promise((resolve, reject) => {
        const name = user;
        var opts = {
            //  filter: '(objectClass=*)',  //simple search
            //  filter: '(&(uid=2)(sn=John))',// and search
            filter: `sAMAccountName=${name}`, // or search
            scope: 'sub',
            attributes: ['cn', 'lastLogonTimestamp', 'telephoneNumber', 'memberOf', 'primaryGroupID', 'sAMAccountName', 'userPrincipalName', 'mail']
        };
        client.search('CN=Users,DC=lntdccspoc,DC=com', opts, function (err, res) {
            if (err) {
                console.log("Error in search " + err)
                reject();
            } else {
                res.on('searchEntry', function (entry) {
                    console.log("the whole entry variable is:", entry.object);
                    // info = JSON.stringify(entry.object.member);
                    info = entry.object;
                    console.log("the info is : ", info)
                    resolve(info);

                });
                res.on('searchReference', function (referral) {
                    console.log('referral: ' + referral.uris.join());
                });
                res.on('error', function (err) {
                    console.error('error: ' + err.message);
                });
                res.on('end', function (result) {
                    console.log('status: ' + result.status);
                    // reject();
                });
            }
        });
    });
}

// for  fetching  a single member info

exports.searchMember = function searchMember(user) {

    return new Promise((resolve, reject) => {
        const name = user;
        console.log("the parameter in searchmember is:", name);
        var opts = {
            //  filter: '(objectClass=*)',  //simple search
            //  filter: '(&(uid=2)(sn=John))',// and search
            filter: `cn=${name}`, // or search
            scope: 'sub',
            attributes: ['cn', 'lastLogonTimestamp', 'telephoneNumber', 'memberOf', 'primaryGroupID', 'sAMAccountName', 'userPrincipalName', 'mail']
        };
        client.search('CN=Users,DC=lntdccspoc,DC=com', opts, function (err, res) {
            console.log("the parameter in searchmember inner search function is:", name);
            if (err) {
                console.log("Error in search " + err)
            } else {
                res.on('searchEntry', function (entry) {
                    memberinfo = entry.object
                    console.log("the info variable is :", memberinfo)
                    resolve(memberinfo);
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
    });
}