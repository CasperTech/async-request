'use strict';

let Arequest,
    request = require('request'),
    _ = require('lodash');

request.debug = false;

Arequest = (defaultOptions) => {
    let arequest;

    Arequest.validateOptions(defaultOptions);

    arequest = async (url, options) => {
        return new Promise((resolve, reject) => {
            Arequest.validateOptions(options);

            options = _.assign({url: url}, options, defaultOptions);

            options = Arequest.mapOptions(options);

            request(options, (error, response) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve({
                    statusCode: response.statusCode,
                    headers: response.headers,
                    body: response.body
                });
            });
        });
    };

    arequest.defaults = (options) => {
        if (!options) {
            return defaultOptions;
        }

        if (options.cookieJar === true) {
            options.cookieJar = request.jar();
        }

        return Arequest(options);
    };

    return arequest;
};

/**
 *
 */
Arequest.validateOptions = (options) => {
    let unknownOption;

    if (!options) {
        return;
    }

    unknownOption = _.first(_.difference(_.keys(options), ['method', 'data', 'headers', 'proxy', 'cookieJar', 'cookieJar2']));

    if (unknownOption) {
        throw new Error('Unknown option ("' + unknownOption + '").');
    }

    if (options.method && _.indexOf(['GET', 'POST', 'PUT', 'HEAD', 'DELETE'], options.method) === -1) {
        throw new Error('Unknown option.method value ("' + options.method + '").');
    }
};

/**
 * Map options to meet the request interface.
 */
Arequest.mapOptions = (options) => {
    if (!options) {
        return options;
    }

    if (options.data) {
        options.form = options.data;

        delete options.data;
    }

    if (options.cookieJar) {
        options.jar = options.cookieJar;

        delete options.cookieJar;
    }

    return options;
};

module.exports = Arequest({});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxubGV0IEFyZXF1ZXN0LFxuICAgIHJlcXVlc3QgPSByZXF1aXJlKCdyZXF1ZXN0JyksXG4gICAgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuXG5yZXF1ZXN0LmRlYnVnID0gZmFsc2U7XG5cbkFyZXF1ZXN0ID0gKGRlZmF1bHRPcHRpb25zKSA9PiB7XG4gICAgbGV0IGFyZXF1ZXN0O1xuXG4gICAgQXJlcXVlc3QudmFsaWRhdGVPcHRpb25zKGRlZmF1bHRPcHRpb25zKTtcblxuICAgIGFyZXF1ZXN0ID0gYXN5bmMgKHVybCwgb3B0aW9ucykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgQXJlcXVlc3QudmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgICAgICAgICBvcHRpb25zID0gXy5hc3NpZ24oe3VybDogdXJsfSwgb3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xuXG4gICAgICAgICAgICBvcHRpb25zID0gQXJlcXVlc3QubWFwT3B0aW9ucyhvcHRpb25zKTtcblxuICAgICAgICAgICAgcmVxdWVzdChvcHRpb25zLCAoZXJyb3IsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogcmVzcG9uc2Uuc3RhdHVzQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogcmVzcG9uc2UuYm9keVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBhcmVxdWVzdC5kZWZhdWx0cyA9IChvcHRpb25zKSA9PiB7XG4gICAgICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRPcHRpb25zO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuY29va2llSmFyID09PSB0cnVlKSB7XG4gICAgICAgICAgICBvcHRpb25zLmNvb2tpZUphciA9IHJlcXVlc3QuamFyKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQXJlcXVlc3Qob3B0aW9ucyk7XG4gICAgfTtcblxuICAgIHJldHVybiBhcmVxdWVzdDtcbn07XG5cbi8qKlxuICpcbiAqL1xuQXJlcXVlc3QudmFsaWRhdGVPcHRpb25zID0gKG9wdGlvbnMpID0+IHtcbiAgICBsZXQgdW5rbm93bk9wdGlvbjtcblxuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdW5rbm93bk9wdGlvbiA9IF8uZmlyc3QoXy5kaWZmZXJlbmNlKF8ua2V5cyhvcHRpb25zKSwgWydtZXRob2QnLCAnZGF0YScsICdoZWFkZXJzJywgJ3Byb3h5JywgJ2Nvb2tpZUphcicsICdjb29raWVKYXIyJ10pKTtcblxuICAgIGlmICh1bmtub3duT3B0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBvcHRpb24gKFwiJyArIHVua25vd25PcHRpb24gKyAnXCIpLicpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLm1ldGhvZCAmJiBfLmluZGV4T2YoWydHRVQnLCAnUE9TVCcsICdQVVQnLCAnSEVBRCcsICdERUxFVEUnXSwgb3B0aW9ucy5tZXRob2QpID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gb3B0aW9uLm1ldGhvZCB2YWx1ZSAoXCInICsgb3B0aW9ucy5tZXRob2QgKyAnXCIpLicpO1xuICAgIH1cbn07XG5cbi8qKlxuICogTWFwIG9wdGlvbnMgdG8gbWVldCB0aGUgcmVxdWVzdCBpbnRlcmZhY2UuXG4gKi9cbkFyZXF1ZXN0Lm1hcE9wdGlvbnMgPSAob3B0aW9ucykgPT4ge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5kYXRhKSB7XG4gICAgICAgIG9wdGlvbnMuZm9ybSA9IG9wdGlvbnMuZGF0YTtcblxuICAgICAgICBkZWxldGUgb3B0aW9ucy5kYXRhO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmNvb2tpZUphcikge1xuICAgICAgICBvcHRpb25zLmphciA9IG9wdGlvbnMuY29va2llSmFyO1xuXG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLmNvb2tpZUphcjtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQXJlcXVlc3Qoe30pO1xuIl0sImZpbGUiOiJtYWluLmpzIn0=
