/*=========================================
=            UTILITY FUNCTIONS            =
=========================================*/

(function() {
    'use strict';
})();

function toObject(arr, headerKey) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i] !== undefined) {
            rv[headerKey[i]] = arr[i];
        }
    }
    return rv;
}

function utilityFunctions() {}

// Formats date
utilityFunctions.prototype.getFormattedDate = function() {
    return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

utilityFunctions.prototype.formatRow = function(dataRow, headerKey) {
    dataRow[dataRow.length - 1] = dataRow[dataRow.length - 1].replace('\r', '');
    return toObject(dataRow, headerKey);
};

utilityFunctions.prototype.formatFilename = function(filename) {
    return filename.split('.')[0];
};


module.exports = new utilityFunctions();
