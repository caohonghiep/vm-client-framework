app.service('productService', function () {
    
    var productDao = new ProductDao();

    this.add=function(product,successCallback, errorCallBack){
        productDao.add(product,successCallback, errorCallBack);
    };
    
    this.get=function(id,successCallback, errorCallBack){
        
    };
    
    this.getAll=function(successCallback, errorCallBack){
        
    };
    
    this.find=function(successCallback, errorCallBack){
        
    };
    
    this.search=function(successCallback, errorCallBack){
        
    };
    
    this.upload=function(product,successCallback, errorCallBack){
        
    };
    
    this.download=function(product,successCallback, errorCallBack){
        
    };
    
    this.synchronize=function(product,successCallback, errorCallBack){
        
    };
});


app.service('userService', function () {
    
});

app.service('siteService', function () {
    
});