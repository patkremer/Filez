
$(function () {
	
	//dataService.getGame(2)
	//   .done(function (game) {
	//      var gameHtml = template(game);
	//      console.log(gameHtml);
	//      $('#game-wrapper').append(gameHtml);
	//   });
   // $('#game-create-container').toggleClass('hidden');
   $(document).ajaxStart(function () {
      console.log('triggered ajax start handler');
      $('#loading').toggleClass('hidden');
   });

   $(document).ajaxStop(function () {
      console.log('triggered ajax complete handler');
      $('#loading').toggleClass('hidden');
   });
   
   var ballers = AppData.ballers;
   var locations = AppData.locations;
   var games = AppData.games;

   //baller.Longitude = parseFloat(baller.Longitude);
   //baller.Latitude = parseFloat(baller.Latitude);
   //console.log($.param(baller));
   //location.Longitude = parseFloat(location.Longitude);
   //location.Latitude = parseFloat(location.Latitude);
   //console.log(baller);
   //console.log(location);
   //console.log(game);
   //console.log($.param(baller));
  // $.post(api.ballers + '/create', JSON.stringify(baller), success, 'json');


   //$.each(games, function (index, value) {
   //   console.log(value);
   //   dataService.createGame($.param(value))
   //      .done(function (data) {
   //         console.log(data);
   //         alertify.success('game created! id: ' + data.id);
   //      })
   //      .fail(function (jqXHR, textStatus, err) {
   //         //alertify.alert('Unable to Create Baller: ' + textStatus);
   //         console.log('failed to create game', textStatus);
   //         console.log(jqXHR);
   //         console.log(err);
   //      });
   //});

   //function success(data, textStatus, jqXHR) {
   //   console.log(data);
   //   console.log(textStatus);
   //   console.log(jqXHR);
   //}
   //dataService.createBaller($.param(baller))
   //   .done(function (data) {
   //      console.log(data);
   //      alertify.alert('success!');
   //   })
   //   .fail(function (jqXHR, textStatus, err) {
   //      //alertify.alert('Unable to Create Baller: ' + textStatus);
   //      console.log(textStatus);
   //      console.log(jqXHR);
   //      console.log(err);

   //   });
  
});



var gamePage = function () {

   var init = function () {

      $('#GetGame').on('click', function () {
         getGame($('#game-id-input').val());
      });

      $('#GetGames').on('click', function () {
         getGames();


      });

      $('#CreateGame').on('click', function () {
         console.log(this);
         createGame();
      });
      // $('#CreateGame').fo


   },

		getGames = function () {

		   var source = $('#games-template').html();
		   var template = Handlebars.compile(source);
		   var gameData = $('#games-list');

		   if (gameData.data('games') != null) {
		      //console.log('has game data!');
		      //console.log(gameData.data('games'));
		      gameData.toggleClass('hidden');
		      return;
		   }

		   dataService.getGames()
            .done(function (data) {
               var wrapper = { games: data };
               var html = template(wrapper);
               gameData.data('games', wrapper);
               gameData.html(html)
                  .toggleClass('hidden');

               //console.log($.hasData('#games-list'));
               //$('#games-list').html(html).toggleClass('hidden');
               //var details = gameData.find('button.game-details');
               //console.log(details);
            })
            .fail(function (jqXHR, textStatus, err) {
               alertify.alert('Unable to Get Games: ' + textStatus);
               console.log(jqXHR);
               console.log(err);
            });

		   gameData.on('click', 'button.game-details', function () {
		      //console.log(this);
		      var $this = $(this);
		      gameData.toggleClass('hidden');
		      getGame($this.data('game-id'));
		   });
		},

		updateGame = function (id) {

		},

      getSports = function () {
         var source = $('#sports-list-template').html();
         var template = Handlebars.compile(source);
         var html = '';
         var sportsData = $('#sports-list');

         if (sportsData.data('sports') != null && sportsData.data('sports').sports.length > 0) {
            var sports = sportsData.data('sports');
            console.log(sports);
            console.log(sports.sports.length);
            return;
         }

         dataService.getSports()
            .done(function (data) {
               var wrapper = { sports: data };
               html = template(wrapper);

               sportsData.data('sports', wrapper).html(html);
               //return html;
            })
            .fail(function (jqXHR, textStatus, err) {
               alertify.alert('Unable to Get Sports: ' + textStatus);
               console.log(jqXHR);
               console.log(err);
            });

      },

      getLocations = function () {
         var source = $('#locations-list-template').html();
         var template = Handlebars.compile(source);
         var locationsData = $('#location-list');
         // var html = '';

         if (locationsData.data('locations') != null && locationsData.data('locations').locations.length > 0) {
            console.log('locations data saved!');
            console.log(locationsData.data('locations'));
            console.log(locationsData.data('locations').locations.length);
            return;
         }

         dataService.getLocations()
            .done(function (data) {
               console.log(data);
               var wrapper = { locations: data };
               var html = template(wrapper);

               locationsData.data('locations', wrapper).html(html);
               //return html;
            })
            .fail(function (jqXHR, textStatus, err) {
               alertify.alert('Unable to Get Locations: ' + textStatus);
               console.log(jqXHR);
               console.log(err);
            });
      },

      // Create Game 
      createGame = function () {
         getSports();
         getLocations();
         var container = $('#game-create-container');
         container.toggleClass('hidden');
         $('.form-control').focus(function () {
            var $this = $(this);

            console.log($this.parents().parent('.form-group').addClass('has-success'));
         });


         $('#game-create-form').submit(function (event) {
            //alertify.alert('handler for .submit called');
            event.preventDefault();
            var $this = $(this);
            //console.log($this.serialize());
            console.log($this.serialize());
            var createdGame = dataService.createGame($this.serialize())
               .done(function (data) {
                  container.toggleClass('hidden');
                  getGame(data.id);
               })
               .fail(function (jqXHR, textStatus, err) {
                  alertify.alert('Unable to Create Game: ' + textStatus);
                  console.log(jqXHR);
                  console.log(err);

               });

            console.log(createdGame);
         });
      },

		deleteGame = function () {

		},

		getGame = function (id) {
		   var source = $('#game-detail-template').html();
		   var template = Handlebars.compile(source);
		   console.log(id.length);
		   if (id.length === 0) {

		      return;
		   }

		   dataService.getGame(id)
            .done(function (game) {
               console.log(game)
               var html = template(game);
               // console.log(gameHtml);
               $('#game-wrapper').toggleClass('hidden').html(html);
            })
		      .fail(function (jqXHR, textStatus, err) {
		         alertify.alert('Unable to get game: ' + textStatus);
		         console.log(jqXHR);
		         console.log(err);
		      });

		},

      showView = function (createGame, game, games) {
         if (createGame) {


         }
      };

  

	return {
		init: init
	}; 

}();



$(function () {

	/**** Side Nav functions ***/ 
	$("#menu-close").click(function (e) {
		e.preventDefault();
		$("#sidebar-wrapper").toggleClass("active");
	});
	$("#menu-toggle").click(function (e) {
		e.preventDefault();
		$("#sidebar-wrapper").toggleClass("active");
	});

});







$(document).ready(function () {
 
	//console.log(window);
	var api = '/api/ballers';

	//var friendsTemplate = $('#friends-template').html(); s

	$('#gamedate').pickadate();
	$('#gametime').pickatime();


	function getData(uri, successFunction) {
		$.ajax({
			type: 'GET',
			url: uri,
			dataType: 'json',
			success: function (json) {
				successFunction(json);
			},

			error: function (xhr, status) {
				var n = noty({ layout: 'center', text: 'Sorry there was a problem! - ', type: 'error' });
			},

			complete: function (xhr, status) {
				console.log(xhr);
				console.log(status);
				var n = noty({layout: 'bottomRight', text: 'The request is complete! - ', type: 'success' });
			}

		});
	}

	function getHtml(source, dataArray) {
		var template = Handlebars.compile(source);
		var wrapper = { data: dataArray };
		return template(dataArray);
	}


	function showPeople(dataArray) {
		var html = getHtml(friendsTemplate, dataArray);
		$('#people-list').append(html);
	}


  

});






	var s,
	PeopleList = {

		settings: {
			url: '/api/ballers',
			template: $('#friends-template').html(),
			data: {},
		},

		init: function () {
			s = this.settings;
			getData(this.settings.url, PeopleList.setData);
			this.bindUIActions(this);
			//console.log(this);
		},

		bindUIActions: function (people) {
			$('#show-people').on('click', function () {
				var options = {
					direction: 'up'
				};
				console.log(people);

				$('#people-panel').toggle('drop', 700);  //.toggleClass('hidden');
			});

		},

		setData: function (dataArray) {
			s.data = dataArray;
			PeopleList.showPeople();
		},

		showPeople: function () {

			var wrapper = { data: s.data };
			var html = getHtml(s.template, wrapper);

			$('#people-list').append(html);
		}


	};

 //  PeopleList.init();





//***************** OLD STUFF keep
//(function () {
	
//	// var gamesList = $('#games-list'),
//	//     	gameDetails = $('#game-details'),
//	var uri = '/api/games';

//	var getData = function (url, successFunction) {
//		$.ajax({
//			type: 'GET',
//			url: uri,
//			data: {},
//			success: function (data, textStatus, jqXHR) {
//				successFunction(data);
//			}
//		});
//	}

//	var getHtml = function (source, data) {
//		var template = Handlebars.compile(source);
//		var html = template(data);
//		return html;
//	}

//	var s,
//	GamesView = {

//		settings: {
//			url: uri,
//			gameTemplate: $('#game-template').html(),
//			allGamesButton: $('#all-games-btn'),

//		},
		  
//		init: function() {
//			s = this.settings;
//			this.bindUIActions();
//		},

//		bindUIActions: function () {
//		   getData(s.uri + '/2/ballers', GamesView.showDetail);

//			//s.allGamesButton.on('click', function () {
//			//	var $this = $(this);
//			//	$this.attr('disabled', 'disabled');
//			//	console.log($this);

//			//	if ($this.is('disabled')) {
//			//		console.log('disabled');
//			//	}

//			//});
//		},

//		showDetail: function (data) {
//		   console.log(data);
//		   var html = getHtml(s.gameTemplate, data);
//		},

//		showGames: function(data) {
//			//var html = getHtml(s.gameTemplate, data);
//			//$('#games-list').html(html);
//		},

//	};

//	GamesView.init();


	

	//GameView.init();

	// var source = $('#game-template').html();
	// var template = Handlebars.compile(source);


	// var context = [
	// 	{
	// 		name: "New Game", 
	// 		locationName: "Recenter Name", 
	// 		gameTime: "Monday, 10/12/14 5:00pm", 
	// 		description: "Descripton bitch", 
	// 		creatorName: "Pkizzle", 
	// 		createdAt: "Friday, 10/9/14 10:00AM" 
	// 	},
	// 	{
	// 		name: "New Game", 
	// 		locationName: "Recenter Name", 
	// 		gameTime: "Monday, 10/12/14 5:00pm", 
	// 		description: "Descripton bitch", 
	// 		creatorName: "Pkizzle", 
	// 		createdAt: "Friday, 10/9/14 10:00AM" 
	// 	}];

	// var html = template(context);

	// $('#games-list').append(html)



//})();










//var s,
//  GamesView = {

//      settings: {
//          url: uri,
//          gameTemplate: $('#game-template').html(),
//          allGamesButton: $('#all-games-btn'),

//      },

//      init: function() {
//          s = this.settings;
//          this.bindUIActions();
//      },

//      bindUIActions: function () {
//         getData(s.uri + '/2/ballers', GamesView.showDetail);

//          //s.allGamesButton.on('click', function () {
//          //  var $this = $(this);
//          //  $this.attr('disabled', 'disabled');
//          //  console.log($this);

//          //  if ($this.is('disabled')) {
//          //      console.log('disabled');
//          //  }

//          //});
//      },

//      showDetail: function (data) {
//         console.log(data);
//         var html = getHtml(s.gameTemplate, data);
//      },

//      showGames: function(data) {
//          //var html = getHtml(s.gameTemplate, data);
//          //$('#games-list').html(html);
//      },

//  };

//  GamesView.init();
//var friendsList = friends.friends.data;
//console.log(friends);
//console.log(friendsList);


//
//console.log(source);

//var template = Handlebars.compile(source);
//console.log(template);
//var html = template(friendsList);

//$('#people-panel').append(html);

//$('#people-panel').html(html);


/**
var url = 'api/games'
var game = {
	 name: 'Balling time',
	 description: 'blah',
	 creatorId: 5,
	 gameTime: '2014-01-29 00:00:00.000',
	 locationName: 'West View Rec',
	 sportName: 'Basketball'
};

var contentdiv = $('#content-wrapper');
// var gameedit = $('#game-edit-template').html(),
var gameTemplate

//  $('#content-wrapper').append((getHtml(gameEdit, game)));

function gethtml(source, data) {
	var template = handlebars.compile(source);
	return template(data);
}

console.log(contentdiv);


//var sports;

var jqxhr = $.get('/api/sports', function (data) {
	 console.log(data);
	 game.sports = data;
	 console.log(game);
});






var gameedit = $('#game-edit-template').html(),
	 contentdiv = $('#content-wrapper');

console.log(contentdiv);

function gethtml(source, data) {
	 var template = handlebars.compile(source);
	 return template(data);
}

**/