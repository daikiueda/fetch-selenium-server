"use strict";

var fetchSeleniumServer = require( "../fetch-selenium-server" );

describe( "fetchSeleniumServer", function(){
    it( "fetchSeleniumServer", function( done ){

        fetchSeleniumServer().then(
            function( data ){
                console.log( data );
                done();
            }
        );
    } )
} );

