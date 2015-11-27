var configContentType = require('./content-type-config');

function isNumber(a) {
    return typeof a == 'number' && isFinite(a);
}
var defaultTyep = 'text/plain';
var contentType = {
    'Content-Type': defaultTyep
};

module.exports = function(key) {

    if (!key || isNumber(key)) {
        return contentType;
    }

    return {
        'Content-Type': configContentType[key] || defaultTyep
    };
};
