'use strict';

/**
 * @ngdoc service
 * @name resumeApp.auth
 * @description
 * # auth
 * Service in the resumeApp.
 */
angular.module('resumeApp')
  .service('auth', ['$window', function ($window) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var authorization = {
        'version': '0.0.1',
        'checking': false,
        'ready': false,
        'authorized': false,
        'immediate': true,
        'timeout': 1,

        'const': {
            OAUTH2_CLIENT_ID: 'AIzaSyAGWxOwZpPOuKpx8obgUuy_GDZiHY8wo3k',
            OAUTH2_SCOPES: [
                'https://www.googleapis.com/auth/youtube']},

        // Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
        // If the currently logged-in Google Account has previously authorized
        // the client specified as the OAUTH2_CLIENT_ID, then the authorization
        // succeeds with no user intervention. Otherwise, it fails and the
        // user interface that prompts for authorization needs to display.
        checkAuth: function () {
            authorization.checking = true;
            if (authorization.immediate) {
                gapi.auth.authorize({
                    client_id: OAUTH2_CLIENT_ID,
                    scope: OAUTH2_SCOPES,
                    immediate: true});
            } else {
                gapi.auth.authorize({
                    client_id: OAUTH2_CLIENT_ID,
                    scope: OAUTH2_SCOPES,
                    immediate: false
                });
            }
        },



        // Handle the result of a gapi.auth.authorize() call.
        handleAuthResult: function (authResult) {
          if (authResult && !authResult.error) {
              authorization.checking = false;
              authorization.authorized = true;
              // Authorization was successful. Hide authorization prompts and show
              // content that should be visible after authorization succeeds.
              $('.pre-auth').hide();
              $('.post-auth').show();
              loadAPIClientInterfaces();
          } else {
              authorization.checking = false;
              authorization.authorized = false;
              // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
              // client flow. The current function is called when that flow completes.
              $('#login-link').click(function() {
                  gapi.auth.authorize({
                      client_id: OAUTH2_CLIENT_ID,
                      scope: OAUTH2_SCOPES,
                      immediate: authorization.const.immediate
                  });
              });
          }
      }
  };


  // Load the client interfaces for the YouTube Analytics and Data APIs, which
  // are required to use the Google APIs JS client. More info is available at
  // https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
  function loadAPIClientInterfaces() {
      gapi.client.load('youtube', 'v3', function () {
          handleAPILoaded();
      });
  }


          return authorization;
  }]);

// Upon loading, the Google APIs JS client automatically invokes this callback.
function googleApiClientReady () {
    gapi.auth.init(function () {
        authorization.ready = true;
        $window.setTimeout(checkAuth, authorization.const.timeout);
    });
};
