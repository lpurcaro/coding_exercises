const url = require('url');

function getDiffInSeconds (dateA, dateB) {
    const millis = dateB - dateA;
    return Math.floor(millis / 1000) ;
}

function parseValue (value) {
    return isNaN(value) ? value : parseFloat(value);
}

function parseUrl (format, instance) {
    const { query, pathname } = url.parse(instance, true);
    const [, ...params] = pathname.split(/\//);
    const [, ...variables] = format.split(/\//);

    const formattedQuery = Object.keys(query).reduce((prev, next) => { 
        return { ...prev, [next]: parseValue(query[next])}
    }, {});

    const mappedUrl = variables.reduce((mappedObj, variable, idx) => {
        const newParam = {};
        
        if (variable.startsWith(':')) {
            const [, urlParamKey] = variable.split(/:/);
            newParam[urlParamKey] = parseValue(params[idx]);
        }

        return { ...mappedObj, ...newParam};
    }, formattedQuery);

    return mappedUrl;

}

module.exports = {
    getDiffInSeconds,
    parseUrl
}