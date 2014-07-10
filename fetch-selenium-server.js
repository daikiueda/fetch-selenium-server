"use strict";

var STORAGE_INDEX_URL = "http://selenium-release.storage.googleapis.com/",

    http = require( "http" ),
    fs = require( "fs" ),
    Q = require( "q" ),
    _ = require( "lodash" );


function fetchStorageIndexXML(){
    var deferred = Q.defer(),
        body = "",
        req;

    req = http.get( STORAGE_INDEX_URL, function( res ){

        res.on( "data", function( chunk ){
            body += chunk;
        } );

        res.on( "end", function(){
            deferred.resolve( body );
        } );
    } );

    req.on( "error", function( err ){
        deferred.reject( err );
    } );

    return deferred.promise;
}


function getTargetVersionFileName( indexXML ){
    require( "xml2js" ).parseString( indexXML, function( err, data ){
        console.log( data.ListBucketResult.Contents );
    } );
}


function fetchSeleniumServer(){
    var deferred = Q.defer(),
        req;
    
    fetchStorageIndexXML()
        .then(
            function( data ){
                getTargetVersionFileName( data );
                deferred.resolve( true );
            },
            function( err ){
                deferred.reject( err );
            }
        );
    
    return deferred.promise;
}

module.exports = fetchSeleniumServer;
