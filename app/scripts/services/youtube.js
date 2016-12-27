/**
 * @ngdoc service
 * @name resumeApp.youtube
 * @description
 * # youtube
 * Service in the resumeApp.
 */
/*jslint node: true */
/*global angular */
angular.module('resumeApp')
    .factory('youtube', ['$http', function ($http) {
        'use strict';
        var fetchSome, OAUTH2_CLIENT_ID = 'AIzaSyCZjkovom0KStuGbfNP00v1b02Un-S1SSE',
            OAUTH2_SCOPES = [
                'https://www.googleapis.com/auth/youtube'
            ],
            ytvideoPromise, ytPageToken, ytvideos, ytstatus = 'starting', resultInjector,
            cacheVideos, ytnextPage, currentPage, totalCount, fetchSize = 50, pageSize = 10,
            urlstart = 'https://www.googleapis.com/youtube/v3/search' +
            '?part=snippet&channelId=UC3O0zQOrbjLCYqYJ1rpvTRg&maxResults=' +
            fetchSize,
            urlend = '&q=vera&key=AIzaSyCZjkovom0KStuGbfNP00v1b02Un-S1SSE';


        if (currentPage === undefined) {
            currentPage = 0;
            cacheVideos = [];
        }

        fetchSome = function (now, token) {
            var insertMe;
            if ((token === undefined) || (token === null)) {
                insertMe = '';
            } else {
                insertMe = '&pageToken=' + token;
            }
            ytvideoPromise = $http.get(urlstart + insertMe + urlend).success(function (data) {
                console.log('success on $http.get()');
                // this callback will be called asynchronously
                // when the response is available
                if (now) {
                    // needed for immediate display, set some details
                    ytnextPage = data.nextPageToken;
                    totalCount = data.pageInfo.totalResults;

                    // save the most recent fetch result in the cache
                    cacheVideos = cacheVideos.concat(data.items);

                    // and deliver the request from the cache
                    ytvideos = cacheVideos.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                    ytstatus = 'ready';
                    // immediate case, so call main.js injector function now
                    resultInjector(ytvideos, pageSize, currentPage * pageSize, totalCount);

                    // btw are there any more?
                    if ((ytnextPage !== undefined) && (ytnextPage !== null)) {
                        fetchSome(false, ytnextPage);  // get a page ahead if there are more
                        // false means the result is not needed immediately - it
                        // is a speculative fetch. Completion in the success() routine
                        // can happen whenever, that's fine.
                    }
                } else {
                    // speculative fetch completed, add the data to the cache
                    // and set the next page link in case it is needed, status is ready
                    ytnextPage = data.nextPageToken;
                    cacheVideos = cacheVideos.concat(data.items);
                    ytstatus = 'ready';
                }
            }).error(function (data, status, headers, config) {
                var index, attr;
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log('error on $http.get()');
                ytvideos = undefined;
                ytnextPage = undefined;
                ytstatus = 'error';
                totalCount = null;

                console.log('********* data **********');
                for (index = 0; index < data.length; index = index + 1) {
                    attr = data[index];
                    console.log(attr);
                    console.log(attr.errors[0]);
                    console.log((attr.errors[0]).extendedHelp);
                }

                console.log('********* status ********');
                for (index = 0; index < status.length; index = index + 1) {
                    attr = status[index];
                    console.log(attr);
                }

                console.log('********* headers *******');
                for (index = 0; index < headers.length; index = index + 1) {
                    attr = headers[index];
                    console.log(attr);
                }
                
                console.log('********* config ********');
                for (index = 0; index < config.length; index = index + 1) {
                    attr = config[index];
                    console.log(attr);
                }
            });
        };



        fetchSome(true, null);  // request the first page
        // passing in true means update immediately, it was not called
        // speculatively. null for the 2nd parameter means start at the
        // beginning


        // pass the rest of the functions back out in the return
        return {
            get: function () {
                return ytvideos;
            },
            status: function () {
                return ytstatus;
            },
            ready: function () {
                return (ytstatus === 'ready');
            },
            getPage: function () {
                return currentPage;
            },
            setPage: function (newPage, pageToken) {
                // see if we have already reached the end of list
                // if so null out next when we are actually on the last page
                if ((pageToken === undefined) &&
                        (newPage > Math.floor((totalCount + pageSize - 1) / pageSize))) {
                            // we reached the end, page wise
                    ytnextPage = null;
                    return;
                }
                if (totalCount === null) {return; }
                if (totalCount === undefined) {return; }
                if (ytstatus === null) {return; }
                if (ytstatus === undefined) {return; }
                if ((ytstatus === 'error') || (ytstatus === 'starting')) {return; }
                if (ytstatus !== 'ready') {return; }

                if (newPage > -1) {
                    if ((newPage <= Math.floor((totalCount + pageSize - 1) / pageSize))) {
                        // note the count + pageSize-1:
                        // get the last bit, if any
                        currentPage = newPage;
                        ytPageToken = pageToken;
                        if (currentPage < Math.floor(cacheVideos.length / pageSize)) {
                            // We already got this one. Want to see it again? apparently.
                            // get them out of the cache
                            if ((currentPage + 1) * pageSize > totalCount) {
                                ytvideos = cacheVideos.slice(currentPage * pageSize, totalCount);
                            } else {
                                ytvideos = cacheVideos.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
                            }
                            ytstatus = 'ready';

                            // since we are not using anything with .success() in this
                            // case, we just pass the cached values right in
                            resultInjector(ytvideos, pageSize, currentPage * pageSize, totalCount);

                            if (currentPage > (Math.floor((cacheVideos.length + pageSize - 1) / pageSize) - 2)) {
                                // last page available, get the next in advance
                                fetchSome(false, ytnextPage); // request the next page
                                // passing in false means no immediate updates, it IS called
                                // speculatively. 2nd parameter gets us the correct query result
                                // for this page
                            }
                        } else {
                            // we do not have this page yet so get it
                            fetchSome(true, ytnextPage); // request the next page
                            // passing in true means update immediately, it was not called
                            // speculatively. 2nd parameter gets us the correct query result
                            // for this page
                        }
                    }
                }
            },
            fetchSome: function (now, pageToken) {
                fetchSome(now, pageToken);
            },
            getTotal: function () {
                return totalCount;
            },
            nextPage: function () {
                return ytnextPage;
            },
            updateNext: function () {
                this.setPage(currentPage + 1, ytnextPage);
            },
            updateLast: function () {
                if (currentPage > 0) {
                    this.setPage(currentPage - 1, null);
                }
            },
            setToken: function (tkn) {
                return ytPageToken === tkn;
            },
            setPageSize: function (pSize) {
                if (pSize < 3) {return; }
                currentPage = Math.floor(currentPage * pageSize / pSize);
                pageSize = pSize;
                this.setPage(currentPage, ytPageToken);
            },
            injectOnSuccess: function (injector) {
                resultInjector = injector;
                if (ytvideos !== undefined) {
                    injector(ytvideos);
                }
            }
        };
    }]);
