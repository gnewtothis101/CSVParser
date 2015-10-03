/*=========================================
=            UTILITY FUNCTIONS            =
=========================================*/

(function() {
    'use strict';
})();

function utilityFunctions() {}

// Formats date
utilityFunctions.prototype.getFormattedDate = function() {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

utilityFunctions.prototype.removeNewlines = function(dataRow) {
    dataRow[dataRow.length-1] = dataRow[dataRow.length-1].replace('\r', '');
    return dataRow;
};

module.exports = new utilityFunctions();
