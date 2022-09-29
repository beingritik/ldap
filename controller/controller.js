const datab = require('../models/model.js');
const { exec } = require("child_process");
const bodyparser = require('body-parser');
const adVar = require('../ad/adfunc');

var mygroup;
var groupval;
var info;
var memberInfo;
var userLogon;
var memberLogon;

//for adding the new member in mongo db 

exports.newUser = ((req, res) => {
    console.log("the  body is:", req.body)
    if (!req.body) {
        console.log('empty here in all');
        res.status(400).send({ message: "cant be empty." })
    }

    console.log('entered');
    console.log("the  usergroup is:", req.body.userGroup);
    const user = new datab({
        userName: req.body.userName,
        userGroup: req.body.userGroup
    })

    if (!req.body.userGroup) {
        // req.body.userGroup="";
        user.save(user).then(data => {
            // data.userGroup=null;
            res.send(data);
            // console.log(data)
        })
    }
    else {
        user.save(user).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send("error in entering the data through API.")
        })
    }


});

//search and fetch for all user

exports.findall = ((req, res) => {
    console.log('our data is ', req.body);
    const given = req.body.userName;

    if (given) {
        const userName = given;
        datab.find({ userName: `${given}` })
            .then(data => {
                if (!data[0].userGroup) {
                    console.log("no team under you.", data[0].userGroup)
                    mygroup = data[0].userGroup;
                    res.send(data);
                    return;
                } else {
                    console.log("you have the following group:", data[0].userGroup)
                    adVar.adFunc()
                        .then(() => {
                            adVar.fetchGroupUsers(data[0].userGroup).then((groupval) => {
                                console.log('my entry :', groupval);
                                res.render('./drop', { users: groupval });
                            });
                        })
                }
            })
            .catch(err => {
                res.status(500).send({ message: "no username exists:" + userName })
                return;
            })
    }
});

//search and fetch for single user

exports.findone = ((req, res) => {
    const user = req.body.singleUser;
    if (user) {
        const userName = user;
        adVar.adFunc()
            .then(() => {
                adVar.searchUser(user).then((info) => {
                    console.log('entry of findone is: ', info);
                    uname = info.sAMAccountName;
                    // to fetch the command output through child_process modules
                    exec(`Get-ADUser -Identity ${uname} -Properties lastLogonTimestamp | Select @{Name='lastLogonTimestamp';Expression={[DateTime]::FromFileTime($_.lastLogonTimestamp)}}`, { 'shell': 'powershell.exe' }, (error, stdout, stderr) => {
                        // do whatever with stdout
                        if (error) {
                            console.log(`error: ${error.message}`);
                            return;
                        }
                        if (stderr) {
                            console.log(`stderr: JSON.Parse(${stderr})`);
                            return;
                        } else
                            userLogon = stdout.slice(43);
                        console.log("the taken output is:", userLogon);
                        res.render('./single', { userinfo: info, userLogon });
                    })
                });
            })
    } else {
        searchUser.catch((err) => {
            console.log(err)
        })
    }
});

// for fetching the members through AD

exports.memberinfo = ((req, res) => {
    const user = req.body.memberName;
    console.log('our data is in memberinfo with memberName as: ', user);
    if (user) {
        const userName = user;
        adVar.adFunc()
            .then(() => {
                // console.log("adfunc is running with:",userName)
                adVar.searchMember(userName).then((info) => {
                    // console.log('entry of memberone inside is: ', info);
                    // console.log("riitk is in memberinfo-last step-end")
                    exec(`Get-ADUser -Identity ${info.sAMAccountName} -Properties lastLogonTimestamp | Select @{Name='lastLogonTimestamp';Expression={[DateTime]::FromFileTime($_.lastLogonTimestamp)}}`, { 'shell': 'powershell.exe' }, (error, stdout, stderr) => {
                        // do whatever with stdout
                        if (error) {
                            console.log(`error: ${error.message}`);
                            return;
                        }
                        if (stderr) {
                            console.log(`stderr: JSON.Parse(${stderr})`);
                            return;
                        } else
                            memberLogon = stdout.slice(43);
                        console.log("the taken output in member is:", memberLogon);
                        res.render('./member', { memberinfo: info, memberLogon });
                    })


                    //  console.log("the logon is:", logon)
                });

            })
    } else {
        searchUser.catch((err) => {
            console.log(err)
        })
    }
});
