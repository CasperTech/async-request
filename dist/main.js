'use strict';

let Arequest,
    request = require('request'),
    _ = require('lodash');

request.debug = false;

Arequest = (defaultOptions) => {
    let arequest;

    Arequest.validateOptions(defaultOptions);

    arequest = async (url, options) => {
        return new Promise((resolve) => {
            Arequest.validateOptions(options);

            options = _.assign({url: url}, options, defaultOptions);

            options = Arequest.mapOptions(options);

            request(options, (error, response) => {
                if (error) {
                    throw new Error(error);
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxubGV0IEFyZXF1ZXN0LFxuICAgIHJlcXVlc3QgPSByZXF1aXJlKCdyZXF1ZXN0JyksXG4gICAgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuXG5yZXF1ZXN0LmRlYnVnID0gZmFsc2U7XG5cbkFyZXF1ZXN0ID0gKGRlZmF1bHRPcHRpb25zKSA9PiB7XG4gICAgbGV0IGFyZXF1ZXN0O1xuXG4gICAgQXJlcXVlc3QudmFsaWRhdGVPcHRpb25zKGRlZmF1bHRPcHRpb25zKTtcblxuICAgIGFyZXF1ZXN0ID0gYXN5bmMgKHVybCwgb3B0aW9ucykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIEFyZXF1ZXN0LnZhbGlkYXRlT3B0aW9ucyhvcHRpb25zKTtcblxuICAgICAgICAgICAgb3B0aW9ucyA9IF8uYXNzaWduKHt1cmw6IHVybH0sIG9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcblxuICAgICAgICAgICAgb3B0aW9ucyA9IEFyZXF1ZXN0Lm1hcE9wdGlvbnMob3B0aW9ucyk7XG5cbiAgICAgICAgICAgIHJlcXVlc3Qob3B0aW9ucywgKGVycm9yLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXNDb2RlLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiByZXNwb25zZS5ib2R5XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGFyZXF1ZXN0LmRlZmF1bHRzID0gKG9wdGlvbnMpID0+IHtcbiAgICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdE9wdGlvbnM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob3B0aW9ucy5jb29raWVKYXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuY29va2llSmFyID0gcmVxdWVzdC5qYXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBBcmVxdWVzdChvcHRpb25zKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGFyZXF1ZXN0O1xufTtcblxuLyoqXG4gKlxuICovXG5BcmVxdWVzdC52YWxpZGF0ZU9wdGlvbnMgPSAob3B0aW9ucykgPT4ge1xuICAgIGxldCB1bmtub3duT3B0aW9uO1xuXG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB1bmtub3duT3B0aW9uID0gXy5maXJzdChfLmRpZmZlcmVuY2UoXy5rZXlzKG9wdGlvbnMpLCBbJ21ldGhvZCcsICdkYXRhJywgJ2hlYWRlcnMnLCAncHJveHknLCAnY29va2llSmFyJywgJ2Nvb2tpZUphcjInXSkpO1xuXG4gICAgaWYgKHVua25vd25PcHRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIG9wdGlvbiAoXCInICsgdW5rbm93bk9wdGlvbiArICdcIikuJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMubWV0aG9kICYmIF8uaW5kZXhPZihbJ0dFVCcsICdQT1NUJywgJ1BVVCcsICdIRUFEJywgJ0RFTEVURSddLCBvcHRpb25zLm1ldGhvZCkgPT09IC0xKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBvcHRpb24ubWV0aG9kIHZhbHVlIChcIicgKyBvcHRpb25zLm1ldGhvZCArICdcIikuJyk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBNYXAgb3B0aW9ucyB0byBtZWV0IHRoZSByZXF1ZXN0IGludGVyZmFjZS5cbiAqL1xuQXJlcXVlc3QubWFwT3B0aW9ucyA9IChvcHRpb25zKSA9PiB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmRhdGEpIHtcbiAgICAgICAgb3B0aW9ucy5mb3JtID0gb3B0aW9ucy5kYXRhO1xuXG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLmRhdGE7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuY29va2llSmFyKSB7XG4gICAgICAgIG9wdGlvbnMuamFyID0gb3B0aW9ucy5jb29raWVKYXI7XG5cbiAgICAgICAgZGVsZXRlIG9wdGlvbnMuY29va2llSmFyO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBcmVxdWVzdCh7fSk7XG4iXSwiZmlsZSI6Im1haW4uanMifQ==
