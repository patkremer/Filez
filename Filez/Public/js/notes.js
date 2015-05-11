/***** Important JQuery Methods  *****

- is() method to return a boolean value
   - is('.class') to determine if an element has a specific class
- hasClass('class') -> used on elements that contain more that one class value

Chaining:
	$('a').text('jQuery') // Sets text to jQuery, and then returns $('a').
	.attr('href', 'http://www.jquery.com/') // Sets the href attribute and then returns
	$('a').
	.addClass('jQuery'); // Sets class and then returns $('a').

Creating elements and appending to dom:
	$('<div><a></a></div>')
		.find('a')
		.text('jQuery')
		.attr('href', 'http://www.jquery.com')
		.end().appendTo('body');

Disable and enable form elements: 
	$('#button')
		.attr('disabled', 'disabled');

	// Is it enabled?
	alert($('#button1').is(':enabled')); // Alerts true.
	// Or, using a filter.
	alert($('#button1:enabled').length); // Alerts "1".
	// Is it disabled?
	alert($('#button2').is(':disabled')); // Alerts "true".
	// Or, using a filter.
	alert($('#button2:disabled').length); // Alerts "1".
	
	// Set all check boxes or radio buttons to selected.
	$('input:checkbox,input:radio').attr('checked', 'checked');
	// Remove 

Check or uncheck all input checkboxes/radiobuttons
	$('input').removeAttr('checked');

	// Check all radio and check-box inputs on the page.
	$('input:radio,input:checkbox').val(['radio1', 'radio2', 'checkbox1',
	'checkbox2']);
	// Use explicit iteration to clear.
	// $('input:radio,input:checkbox').removeAttr('checked');
	// or
	// $('input:radio,input:checkbox').attr('checked', '');
	

Determine if input checked
	// Alerts "true".
	alert($('input:checkbox').is(':checked'));
	// Or, added to wrapper set if checked. Alerts "1".
	alert($('input:checkbox:checked').length);
	// Alerts "true".
	alert($('input:radio').is(':checked'));
	// Or, added to wrapper set if checked. Alerts

Setting and getting the value of an input element
	$('input:button').val('I am a button');
	$('input:checkbox').val('I am a check box');
	$('input:hidden').val('I am a hidden input');
	$('input:image').val('I am an image');
	$('input:password').val('I am a password');
	$('input:radio').val('I am a radio');
	$('input:reset').val('I am a reset');
	$('input:submit').val('I am a submit');
	$('input:text').val('I am a text');
	// Alerts input's value attribute.
	alert($('input:button').val());
	alert($('input:checkbox').val());
	alert($('input:hidden').val());
	alert($('input:image').val());
	64
	alert($('input:password').val());
	alert($('input:radio').val());
	alert($('input:reset').val());
	alert($('input:submit').val());
	alert($('input:text').val());

	// Example of how to structure in an object
	var s,
	NewsWidget = {

	  settings: {
	    numArticles: 5,
	    articleList: $("#article-list"),
	    moreButton: $("#more-button")
	  },

	  init: function() {
	    s = this.settings;
	    this.bindUIActions();
	  },

	  bindUIActions: function() {
	    s.moreButton.on("click", function() {
	      NewsWidget.getMoreArticles(s.numArticles);
	    });
	  },

	  getMoreArticles: function(numToGet) {
	    // $.ajax or something
	    // using numToGet as param
	  }

	};

	NewsWidget.init();
   
    /*
    $(function () {
        var fbFriends = fbData.friends.data;
        console.log(fbFriends[0]);


        // Friend model
        var Friend = Backbone.Model.extend({
            
            defaults: function() {
                return { 
                    id: "",
                    name: "",
                    picture: ""
                };
            }


        });

        // Friend Collection 
        var FriendList = Backbone.Collection.extend({
            model: Friend
        });


        var FriendView = Backbone.View.extend({
            tagName: "img",
            attributes: {
                class: "img-rounded"
            },

            initialize: function() {
                this.model.on("error", function (model, err) {
                    console.log(err);
                    this.render()
                });
            },

            render: function() {
                var view = this;

            },
        
        });


        var FriendListView = Backbone.View.extend({
            el: $('#friends'),
            initialize: function() {
                this.collection = new FriendList(fbFriends);
                this.render("Friends")
            },

            render: function(friend) {
                modelsToRender = _.filter(this.collection.models, function(item) {
                    return item.get("friend") = friend;
                });
                //_.each(modelsToRender, function())
            }
            
            
        });


        var myFriend = new Friend(fbFriends[0]);
        console.log(myFriend.attributes);

        

        var list = new FriendList(fbFriends);






        //var sports;

        var jqxhr = $.get('/api/sports', function (data) {
            console.log(data);
            game.sports = data;
            console.log(game);
        });
         //var game = {
        //    name: 'Balling time',
        //    description: 'blah',
        //    creatorId: 5,
        //    gameTime: '2014-01-29 00:00:00.000',
        //    locationId: 4,
        //    sportId: 2
        //};

        //$('#content-wrapper').append((getHtml(gameEdit, game)));


        //$('#game-form').submit(function () {
        //    var jqxhr = $.post('/api/games/create', $('#game-form').serialize())
        //        .success(function () {
        //            var loc = jqxhr.getResponseHeader('Location');
        //            var a = $('<a/>', { href: loc, text: loc });
        //            console.log(a);
        //        })
        //        .error(function () {
        //            console.log('Error posting');
        //        });
        //    return false;

        //});

        //console.log('works');


        //$.ajax({
        //    type: "POST",
        //    url: "/api/games/create",
        //    data: game,
        //    dataType: "json",
        //    success: function () {
        //        console.log('success!');
        //    }
        //});

       
        //var done = function () {
        //    console.log('success');
        //}


    });
*/







