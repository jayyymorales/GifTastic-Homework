var movies = ["No", "Funny", "Supernatural", "Sherlock", "Game of Thrones", "Hapy", "Puppy", "Cat", "Dance"];
var articleCounter = 0;

function displayMovieInfo(numArticles, queryURL) {
    $("#movies-view").empty();

    var gif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=335893fa0c5b4b3eb176442841261a45&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        for (var i = 0; i < 10; i++) {

            articleCounter++;
            var gifDiv = $("<div class='col-xl-6 col-lg-6 col-md-6'>");
            gifDiv.attr("id", "article-well-" + articleCounter);
            $("#movies-view").append(gifDiv);

            if (response.data[i].type !== "null") {
                $("#article-well-" + articleCounter)
                    .append("<center><strong><p> Rating: " + response.data[i].rating + "<p><img src=" + response.data[i].images.fixed_height.url + ">");
            }
        }
    });
}

function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < movies.length; i++) {
        var a = $("<button>");
        a.addClass("movie");
        a.attr("data-name", movies[i]);
        a.text(movies[i]);
        $("#buttons-view").append(a);
    }
}

$("#run-search").on("click", function(event) {
    event.preventDefault();
    var movie = $("#search-term").val().trim();
    movies.push(movie);
    renderButtons();
});

$("#clear-all").on("click", function() {
    $("#movies-view").empty();
});

$(document).on("click", ".movie", displayMovieInfo);

renderButtons();