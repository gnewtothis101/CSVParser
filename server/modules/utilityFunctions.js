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

utilityFunctions.prototype.formatRow = function(dataRow) {
    dataRow[dataRow.length - 1] = dataRow[dataRow.length - 1].replace('\r', '');
    return dataRow;
};

utilityFunctions.prototype.formatFilename = function(filename) {
    return filename.split('.')[0];
};


module.exports = new utilityFunctions();
