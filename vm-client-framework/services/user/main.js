//https://mongodb.github.io/node-mongodb-native/api-generated/collection.html
var mongo = require('mongodb');

var Server = mongo.Server,
        Db = mongo.Db,
        BSON = mongo.BSONPure,
        ObjectID = mongo.ObjectID;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('userdb', server, {safe: true});

db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'userdb' database");
        db.collection('users', {safe: true}, function (err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
            }
        });
    }
});

exports.findById = function (req, res) {
    var id = req.params.id;
    console.log('Retrieving user: ' + id);
    db.createCollection('users', function (err, collection) {
        collection.findOne({'_id': new ObjectID(id)}, function (err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function (req, res) {
    db.collection('users', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
};

exports.login = function (req, res) {
    var data = req.body;
    console.log('login ' + JSON.stringify(data));
    db.collection('users', function (err, collection) {
        collection.findOne({'email': data.email, 'password': data.password}, function (err, item) {
            if (item) {
                item.ok = true;
                res.send(item);
            } else {
                res.send({'ok': false});
            }
        });

    });
};
exports.forgotPassword = function (req, res) {
    var data = req.body;
    console.log('login ' + JSON.stringify(data));
    db.collection('users', function (err, collection) {
        collection.findOne({'email': data.email}, function (err, item) {
            if (item) {

                res.send({'ok': true});

                sendNewPassword(data.email);



            } else {
                res.send({'ok': false});
            }
        });

    });
};
exports.addUser = function (req, res) {
    var user = req.body;
    console.log('Adding user: ' + JSON.stringify(user));
    db.collection('users', function (err, collection) {
        collection.findOne({$or: [{'username': user.username}, {'email': user.email}]}, function (err, item) {
            if (item) {
                if (user.email === item.email) {
                    res.send({'error': 'email'});
                } else if (user.username === item.username) {
                    res.send({'error': 'username'});
                } else {
                    res.send({'error': ''});
                }

            } else {
                user.role = 'user';
                collection.insert(user, {safe: true}, function (err, doc) {
                    if (err) {
                        res.send({'error': err});
                    } else {
                        console.log('Success: ' + doc.result);
                        res.send(doc.result);
                    }
                });
            }
        });
    });


};

exports.updateUser = function (req, res) {
    var id = req.params.id;
    var user = req.body;
    delete user._id;
    console.log('Updating user: ' + id);
    console.log(JSON.stringify(user));
    db.collection('users', function (err, collection) {
        collection.update({'_id': new ObjectID(id)}, user, {safe: true}, function (err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(user);
            }
        });
    });
};

exports.deleteUser = function (req, res) {
    var id = req.params.id;
    console.log('Deleting user: ' + id);
    db.collection('users', function (err, collection) {
        collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
};

function sendNewPassword(toEmail) {
    var nodemailer = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    //https://support.google.com/mail/answer/14257?rd=1
    var authEmail = "do.not.reply.this.email.2016%40gmail.com";//do.not.reply.this.email.2016@gmail.com
    var authPass = "Test2016";
    var fromEmail = "do.not.reply.this.email@caotri.com";
    var transporter = nodemailer.createTransport('smtps://' + authEmail + ':' + authPass + '@smtp.gmail.com');

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: '"Cao Tri Website 👥" <' + fromEmail + '>', // sender address
        to: toEmail, // list of receivers
        subject: 'Hello ✔', // Subject line
        //text: 'text Hello world 🐴', // plaintext body
        html: '<b>html Hello world 🐴</b>' // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}