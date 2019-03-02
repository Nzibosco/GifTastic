$(document).ready(function () {


    var animals = ["cow", "cat", "bee", "chicken"];


    // Ajax begins
    function searchGIF() {
        var animalGiphy = $(this).attr("value");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=TKJ1rOOTUCXD1NF9ouxkrLsB0ssoEGHf&q=" + animalGiphy + "&limit=10&offset=0&rating=G&lang=en";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var giphyDiv = $("<div></div>");
                giphyDiv.addClass("gif-images");
                var rating = results[i].rating;
                var ratingP = $("<p></p>")
                ratingP.text("Rating: " + rating);
                giphyDiv.append(ratingP);
                var imageGif = results[i].images.fixed_height_still.url;
                var img = $("<img>");
                img.attr("src", imageGif);
                img.attr("data-still", results[i].images.fixed_height_still.url);
                img.attr("data-animate", results[i].images.fixed_height.url);
                img.attr("data-state", "still");
                img.attr("class", "gif");
                giphyDiv.append(img);
                $("#giphys").prepend(giphyDiv);
            };
        });

    };


    // create buttons for the animals
    function createButton() {
        $("#buttons").empty();
        for (var i = 0; i < animals.length; i++) {
            var button = $("<button></button>");
            button.attr("type", "submit")
            button.addClass("animal-btn");
            button.text(animals[i]);
            button.attr("value", animals[i]);

            //append  the button to the buttons div in our html
            $("#buttons").append(button);
        };
    };
    createButton();

    // grab text from the user input field and push it to animals array to make a new button. 
    $("#submit").on("click", function (event) {
        event.preventDefault();
        var userAnimal = $("#search-giphys").val().trim();
        animals.push(userAnimal);
        createButton();
        $("#search-giphys").val("");

    });

    // on click event 
    $(document).on("click", ".animal-btn", searchGIF);


    // clicking to animate the giphys

    $(document).on("click", ".gif", animateGIF);

    function animateGIF() {
        console.log($(this).attr("src"));
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    };


});

