//https://mongodb.github.io/node-mongodb-native/api-generated/collection.html
var mongo = require('mongodb');

var Server = mongo.Server,
        Db = mongo.Db,
        BSON = mongo.BSONPure,
        ObjectID = mongo.ObjectID;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('productdb', server, {safe: true});

db.open(function (err, db) {
    if (!err) {
        populateDB();
        console.log("Connected to 'productdb' database");
        db.collection('products', {safe: true}, function (err, collection) {
            if (err) {
                console.log("The 'products' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function (req, res) {
    var id = req.params.id;
    console.log('Retrieving product: ' + id);
    db.collection('products', function (err, collection) {
        collection.findOne({'_id': new ObjectID(id)}, function (err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function (req, res) {
    db.collection('products', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
};

exports.addProduct = function (req, res) {
    var product = req.body;
    console.log('Adding product: ' + JSON.stringify(product));
    db.collection('products', function (err, collection) {
        collection.insert(product, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateProduct = function (req, res) {
    var id = req.params.id;
    var product = req.body;
    delete product._id;
    console.log('Updating product: ' + id);
    console.log(JSON.stringify(product));
    db.collection('products', function (err, collection) {
        collection.update({'_id': new ObjectID(id)}, product, {safe: true}, function (err, result) {
            if (err) {
                console.log('Error updating product: ' + err);
                res.send({'error': 'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(product);
            }
        });
    });
}

exports.deleteProduct = function (req, res) {
    var id = req.params.id;
    console.log('Deleting product: ' + id);
    db.collection('products', function (err, collection) {
        collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function (err, result) {
            if (err) {
                res.send({'error': 'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
//-------------------------------------------------------------------------------

exports.findAllCategories = function (req, res) {
    db.collection('categories', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
};




exports.findProductsInCategory = function (req, res) {
    var categoryId = req.params.categoryId;
    console.log('Retrieving product: ' + categoryId);
    db.createCollection('products', function (err, collection) {
        collection.find({'categoryId': categoryId}).toArray(function (err, item) {
            res.send(item);
            console.log('Number of Products: ' + item.length);
        });
    });
};
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function () {

    var products = [
        {            
            "categoryId" :"ao-thun-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 25400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-thun-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1000,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-thun-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1200,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-thun-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1300,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-thun-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-thun-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1500,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-thun-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1600,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-thun-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1800,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        
        /////////////
        {            
            "categoryId" :"ao-so-mi-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 25400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-so-mi-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1000,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-so-mi-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1200,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-so-mi-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1300,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-so-mi-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-so-mi-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1500,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-so-mi-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1600,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-so-mi-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1800,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        ///////////////
        {            
            "categoryId" :"ao-khoac-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 25400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-khoac-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1000,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-khoac-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1200,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-khoac-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1300,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-khoac-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-khoac-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1500,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-khoac-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1600,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"ao-khoac-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1800,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        //////////////
        {            
            "categoryId" :"quan-tay-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 25400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-tay-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1000,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-tay-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1200,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-tay-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1300,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-tay-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-tay-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1500,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-tay-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1600,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-tay-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1800,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        ///////////////////
        {            
            "categoryId" :"quan-jeans-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 25400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-jeans-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1000,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-jeans-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1200,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-jeans-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1300,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-jeans-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-jeans-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1500,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-jeans-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1600,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-jeans-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1800,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        ///////////////////
        {            
            "categoryId" :"quan-short-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 25400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-short-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1000,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-short-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1200,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-short-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1300,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-short-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-short-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1500,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-short-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1600,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" :"quan-short-nam",
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1800,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        //////////////////////
        {            
            "categoryId" : 21,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 25400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" : 21,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1000,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" : 21,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1200,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" : 21,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1300,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" : 21,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" : 21,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1500,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" : 21,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1600,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" : 21,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1800,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        //////////////////
        {            
            "categoryId" : 22,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 25400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" : 22,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1000,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" : 22,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1200,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" : 22,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1300,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" : 22,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1400,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" : 22,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1500,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" : 22,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1600,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        },
        {            
            "categoryId" : 22,
            "name" : "LAN RIOJA CRIANZA",
            "description" : "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert product market. Light and bouncy, with a hint of black truffle, this product will not fail to tickle the taste buds.",
            "pictures" : ["images/si.jpg", "images/si1.jpg", "images/si2.jpg"],
            "price" : 1800,
            "sizes" : ["S", "M", "L"],
            "colors" : ["red", "blue", "white"]
        }
        
        
        
        
    ];

    db.collection('products', function (err, collection) {
        collection.insert(products, {safe: true}, function (err, result) {});
    });
};

