const service = angular.module('stickyService', []);

// each function returns a promise object
service.factory('StickyService', ['$http',
	$http => ({
	get: () => $http.get('/v1/stickies'),
	create: stickyData => $http.post('/v1/add', stickyData),
	update: (id, status) => $http.put(`v1/update/${id}/${status}`),
	}),
]);
