$(document).ready(function () {
    $("#bothDisplay").hide();
    $("#displayCalendar").hide();

    function runQuery(queryURL) {
        $.ajax({
            url: queryURL,
            type: "GET",
            headers: { 'user-key': '542de442a516e41fb48a13a6f2917dfb' },
            contentType: "application/JSON",
        }).then(function (response) {
            $("#restaurantDisplay").empty();
            $("#recipeDisplay").empty();
            console.log(response);


            for (var i = 0; i < 6; i++) {
                console.log(response);
                // console.log(response.restaurants[i].restaurant.name);
                // console.log(response.restaurants[i].restaurant.currency);
                // console.log(response.restaurants[i].restaurant.location.address);
                // console.log(response.restaurants[i].restaurant.menu_url);
                // console.log(response.restaurants[i].restaurant.photos_url);

                var restaurantDisplay = $("<div>");
                restaurantDisplay.addClass("well");
                restaurantDisplay.attr("id", "restaurantWell-" + i);
                $("#restaurantDisplay").append(restaurantDisplay);

                $("#restaurantWell-" + i).append("<h4> Establishment: " + response.restaurants[i].restaurant.name + "</h4>");
                $("#restaurantWell-" + i).append("<h6> Price Range (max $$$$): " + response.restaurants[i].restaurant.currency + "</h4>");
                $("#restaurantWell-" + i).append("<h5> Cuisine: " + response.restaurants[i].restaurant.cuisines + "</h5>");
                $("#restaurantWell-" + i).append("<h5> Address: " + response.restaurants[i].restaurant.location.address + "</h5>");
                $("#restaurantWell-" + i).append('<a href="'  + response.restaurants[i].restaurant.menu_url + '" target="_blank">Click to view menu </a>');
            }
        }) //closes .then(function (response)
    };



    function searchRecipe(queryURLrecipe) {
      $.ajax({
        url: queryURLrecipe ,
        method: "GET"
      }).then(function(response) {
        $("#recipeDisplay").empty();
        $("#restaurantDisplay").empty();


            for (var i = 0; i < 6; i++) { 
                console.log(response);
        //   console.log(response.hits[i].recipe.label);
        //   console.log(response.hits[i].recipe.healthLabels);
        //   console.log(response.hits[i].recipe.calories);
        //   console.log(response.hits[i].recipe.ingredients);
        //   console.log(response.hits[i].recipe.image);

          var recipeDisplay = $("<div>");
          recipeDisplay.addClass("well");
          recipeDisplay.attr("id", "recipeWell-" + i);
          $("#recipeDisplay").append(recipeDisplay);

          $("#recipeWell-" + i).append("<h4>Recipe Name: " + response.hits[i].recipe.label +  "</h4>");
          $("#recipeWell-" + i).append('<a href="'  + response.hits[i].recipe.url + '" target="_blank">Click to view full recipe </a>');
          $("#recipeWell-" + i).append("<h6>Health Labels: " + response.hits[i].recipe.healthLabels +  "</h6>");
          $("#recipeWell-" + i).append('<img src="' + response.hits[i].recipe.image + '">');

          for (var j = 0; j < response.hits[i].recipe.ingredients.length; j++) {
          $("#recipeWell-" + i).append("<h6>" + response.hits[i].recipe.ingredients[j].text +  "</h6>");

          }
        }
    }) //closes .then(function (response)
};
          
        

    $("#submit").on("click", function () {
        var queryTerm = $("#searchArea").val().trim();
        console.log(queryTerm);

        var recipe = $('#recipe').is(":checked")

        var restaurant = $('#restaurant').is(":checked")

        var queryURL = "https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/search?entity_id=601&entity_type=city&count=5";

        var queryURLrecipe = "https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?app_id=da06b7eb&app_key=3b93ed52b89ba41f57fb99a692028518&to=5&q=" + queryTerm;

        var newURL = queryURL + "&q=" + queryTerm;
        console.log(newURL);
        

       

//If only Restaurant box selected
        if (!recipe && restaurant) {
            $("#bothDisplay").show();
            runQuery(newURL);


//Only recipe box selected
        } else if (recipe && !restaurant) {
            $("#recipeDisplay").show();
            searchRecipe(queryURLrecipe);
     

//Both restaurant & recipe box selected
        } else if (restaurant && recipe) {
            $("#recipeDisplay").show();
            $("#restaurantDisplay").show();

            runQuery(newURL);
            searchRecipe(queryURLrecipe);

        };
    }) //closes submit on click function
}); //closes doc ready function
