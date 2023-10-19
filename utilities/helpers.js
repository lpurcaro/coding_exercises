function getDiffInSeconds (dateA, dateB) {
    const millis = dateB - dateA;
    return Math.floor(millis / 1000) ;
}

function parseValue (value) {
    return isNaN(value) ? value : parseFloat(value);
}

function parseUrl (format, instance) {
    // get keys for response
    const [, ...variables] = format.split(/\//);
    // get values for response (there's also query params that will be handled later)
    const [, ...params] = instance.split(/\/|\?|&/);

    const mappedUrl = params.reduce((mappedObj, param, idx) => {
        const newParam = {};

        if (!variables[idx]) {
            // if variable does't exist at that idx it means we are iterating over a query param
            const [urlQueryKey, urlQueryValue] = param.split(/=/);
            newParam[urlQueryKey] = parseValue(urlQueryValue);
        } else if (variables[idx].startsWith(':')) {
            // if variable exists at that idx we have to evaluate if is a parameter variable (begin with a colon)
            const [, urlParamKey] = variables[idx].split(/:/);
            newParam[urlParamKey] = parseValue(param);
        }

        return { ...mappedObj, ...newParam};
    }, {});

    return mappedUrl;

}

module.exports = {
    getDiffInSeconds,
    parseUrl
}