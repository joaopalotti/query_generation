

(function() {

    var app = angular.module('cdsQuerygen', ['ngCookies']);

    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');



    });

    app.controller('ExpectedController', ['$http', '$location', '$cookies', function($http, $location, $cookies){

    }]);   

    app.controller('PatientController', ['$http', '$location', '$cookies', function($http, $location, $cookies){
        this.currentKeywords = "";
        this.patients = {};
        this.person = "";
        
        this.expectedResults = null;

        var patientCtrl = this;
        
        this.getQueries = function() {
            $http.get('/queries').success(function(data) {
                patientCtrl.patients = data;
            });
        }

        this.getQueries();

        this.addExpected = function(patient, expectedIn) {

            var expected = {};
            expected["person"] = patientCtrl.person;
            expected["expected"] = expectedIn;

            console.log(expected);
            $http.put('/expected/'+patient.qId+'/', expected).success(function(data) {
                patientCtrl.expectedResults = expectedIn;
                patientCtrl.doneExpected = true;
                patientCtrl.getQueries();
            }).error(function(data, status, headers, config) {
                alert("error on post");
                console.log(data);
            });
        };

        this.remove_keywords = function(qid, person, order, keywordsIn) {
        
            $http.defaults.headers.put['X-CSRFToken'] = $cookies.csrftoken;
            $http.delete('/keywords/'+qid+'/'+person+'/'+order).success(function(data) {
            
                for(var i = 0; i < patientCtrl.patients.length; i++) {
                    if(patientCtrl.patients[i].qId == qid) {
                        console.log("fond the q");
                        for(var j = 0; j < patientCtrl.patients[i].keywords.length; j++) {
                            var kw = patientCtrl.patients[i].keywords[j];
                            if(kw.person == person && kw.order == order) {
                                patientCtrl.patients[i].keywords.splice(j,1);
                            }
                        }
                    }
                }
              }).error(function(data, status, headers, config) {
                  alert("error on post");
                  console.log(data);
              });
            }

    }]);    

    app.controller('KeywordController', ['$http', '$location', '$cookies', function($http, $location, $cookies){
        this.currentKeywords = "";
        
        var keywordCtrl = this;
        
        this.addKeywords = function(patient, person, order) {


            var max_order = 0;
            for(var i = 0; i < patient.keywords.length; i++) {
                if(patient.keywords[i].person == person && patient.keywords[i].order > max_order) {
                    max_order = patient.keywords[i].order;
                }
            }

            var keywords = {};
            keywords["person"] = person;
            keywords["order"] = max_order+1;
            keywords["keywords"] = keywordCtrl.currentKeywords;
            patient.keywords.push(keywords);

            $http.defaults.headers.put['X-CSRFToken'] = $cookies.csrftoken;
            $http.put('/keywords/'+patient.qId+'/', keywords).success(function(data) {
                // keywordCtrl.result = data;
                keywordCtrl.currentKeywords = "";
            }).error(function(data, status, headers, config) {
                alert("error on post");
                console.log(data);
            });

            
        };

    }]);


    

    // set the initial keyboard focus to a specific HTML element
    // set via "focus" attribute, e.g., <input focus="true">
    app.directive('focus', function($timeout) {
        return {
            scope : {
                trigger : '@focus'
            },
            link : function(scope, element) {
                scope.$watch('trigger', function(value) {
                    if (value === "true") {
                        $timeout(function() {
                            element[0].focus();
                        });
                    }
                });
            }
        };
    }); 


    
})();
