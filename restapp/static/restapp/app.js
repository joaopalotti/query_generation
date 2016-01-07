

(function() {

    var app = angular.module('cdsQuerygen', ['ngCookies']);

    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('{$');
        $interpolateProvider.endSymbol('$}');



    });

    
    app.controller('PatientController', ['$http', '$location', '$cookies', function($http, $location, $cookies){
        this.currentKeywords = "";
        this.patients = {};
        this.person = "";
        

        var patientCtrl = this;
        
        $http.get('/queries').success(function(data) {
            patientCtrl.patients = data;
        });

        this.remove_keywords = function(qid, person, order, keywordsIn) {
        
            $http.defaults.headers.put['X-CSRFToken'] = $cookies.csrftoken;
      $http.delete('/keywords/'+qid+'/'+person+'/'+order).success(function(data) {
        
        for(var i = 0; i < patientCtrl.patients.length; i++) {
                if(patientCtrl.patients[i].qId == qid) {
                    console.log("fond the q");
                    for(var j = 0; j < patientCtrl.patients[i].keywords.length; j++) {
                        var kw = patientCtrl.patients[i].keywords[j];
                        if(kw.person == person && kw.order == order) {
                            console.log("fond the k with " + patientCtrl.patients[i].keywords.length);
                                console.log(kw);
                            patientCtrl.patients[i].keywords.splice(j,1);
                            console.log("removed, now "+ patientCtrl.patients[i].keywords.length);
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
                if(patient.keywords[i].order > max_order) {
                    max_order = patient.keywords[i].order;
                }
            }

            console.log("max is "+max_order)

            var keywords = {};
            
            keywords["person"] = person;
            
            keywords["order"] = max_order+1;
            keywords["keywords"] = keywordCtrl.currentKeywords;


            patient.keywords.push(keywords);

            

            $http.defaults.headers.put['X-CSRFToken'] = $cookies.csrftoken;
            $http.put('/keywords/'+patient.qId+'/', keywords).success(function(data) {
                // keywordCtrl.result = data;
                keywordCtrl.currentKeywords = "";
                console.log(data);
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
