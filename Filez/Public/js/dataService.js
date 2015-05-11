
var api = {
	games: '/api/games',

	ballers: '/api/ballers',

	sports: '/api/sports',

   locations: '/api/locations'
};


var dataService = function () {
	console.log(api);
	var urlBase = '/api/games',

		//authenticate = function (authToken) {
		//	return $.ajax({
		//		url: "/api/authentication",
		//		type: "POST",
		//		beforeSend: function (request) {
		//			request.setRequestHeader("AuthToken", authToken);
		//		}
		//	});
		//},

	  createBaller = function (baller) {
		 return $.ajax({
			url: api.ballers + '/create',
			data: baller,
			contentType: 'application/x-www-form-urlencoded',
			type: 'POST'
		 });
	  },
	  createLocation = function (location) {
		 return $.ajax({
			url: api.locations,
			data: location,
		   // contentType: 'application/x-www-form-urlencoded',
			type: 'POST'
		 });
	  },


		getGames = function() {
			return $.getJSON(urlBase);
		},

		getGame = function(id) {
			return $.getJSON(urlBase + '/' + id);
		},

		getGamesByLocation = function (locationId) {
			return $.getJSON(urlBase + '/Locations/' + locationId);
		},

		createGame = function (game) {
			return $.ajax({
				url: urlBase + '/create',
				data: game,
				type: 'POST'
			});
		},

		updateGame = function (game) {
			return $.ajax({
				url: urlBase + '/' + game.id,
				data: game,
				type: 'PUT'
			});
		},

		deleteGame = function (id) {
			return $.ajax({
				url: urlBase + '/' + id,
				type: 'DELETE'
			});
		},

		getSports = function () {
			return $.getJSON(api.sports);
		},

	  getLocations = function () {
		 return $.getJSON(api.locations);
	  }

	return {
		//authenticate: authenticate,
		getGames: getGames,
		getGame: getGame,
		getSports: getSports,
		getGamesByLocation: getGamesByLocation,
		createGame: createGame,
		updateGame: updateGame,
		getLocations: getLocations,
		createBaller: createBaller,
	   createLocation: createLocation
	};


}();

console.log(dataService);

