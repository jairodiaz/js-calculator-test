/*jslint browser: true, evil: false, plusplus: true, white: true, indent: 2 */
/*global $ */

console.log("moj.js");

console.log("moj.js");

(function() {
  "use strict";

  var moj = {

    Modules: {},

    Utilities: {},

    // Events: $({}),

    init: function(){
      var x;

      for( x in moj.Modules ) {
        if(moj.Modules.hasOwnProperty(x)){
          moj.Modules[x].init();
        }
      }
    }

  };

  console.log("loaded module moj");

  window.moj = moj;
}());

console.log("end of moj.js");
