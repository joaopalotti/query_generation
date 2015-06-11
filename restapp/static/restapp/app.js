

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
		
		$http.get('http://localhost:8000/queries').success(function(data) {
			patientCtrl.patients = data;
		});

	}]);

    app.controller('KeywordController', ['$http', '$location', '$cookies', function($http, $location, $cookies){
        this.currentKeywords = "";
        

        var keywordCtrl = this;
        
        this.addKeywords = function(patient, person, order) {

            console.log("order is "+order);

            var keywords = {};
            
            keywords["person"] = person;
            keywords["order"] = order;
            keywords["keywords"] = keywordCtrl.currentKeywords;

            patient.keywords.push(keywords);

            

            $http.defaults.headers.put['X-CSRFToken'] = $cookies.csrftoken;
            $http.put('http://localhost:8000/query/'+patient.qId+'/keywords/'+person+'/'+order+'/', keywords).success(function(data) {
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
