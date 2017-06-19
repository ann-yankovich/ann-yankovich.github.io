var version = "1.0.0";

requirejs.config({
    baseUrl: '.',
    urlArgs: 'v=' + version,
    shim : {
        bootstrap: { deps :['jquery'] }
    },
    paths: {
        jquery: 'lib/jquery',
        'jquery.browser': 'lib/jquery.browser',
        forms: 'lib/forms',
        genesis: 'lib/genesis',
        'facebook-connect': 'lib/facebook-connect',
        api: 'https://api.triptogether.com/api',
        'facebook-sdk': 'https://connect.facebook.net/en_US/sdk'
    }
});

requirejs(['app/main']);