// 1. calls renderer (should return DOM node) for each item in arr
// 2. appends all the DOM nodes to parent
function renderMultiple(arr, renderer, parent) {
	var renderedEls = [].map.call(arr, renderer); // 1
	var docFrag = document.createDocumentFragment();
	for (var i = renderedEls.length; i--;) docFrag.appendChild(renderedEls[i]);
	parent.appendChild(docFrag); // 2
}


function searchIMDB(query) {
	$.getJSON('http://www.omdbapi.com/', {
		s: query,
		r: 'json'
	}, function(data) {
		var results = data.Search;
		renderMovies(results);
	});
}

var renderMovies = (function() {
	var parent = $('#movie-results')[0];

	return function(results) {
		$(parent).empty();
		renderMultiple(results, renderMovie, parent);
	};
})();

function renderMovie(movieData) {
	var $li = $('<li>');
	var $title = $('<h3>');
	$title.text(movieData.Title);
	$li.append($title);
	return $li[0];
}



$('#movie-search-form').on('submit', function(event) {
	event.preventDefault();
	searchIMDB(this.query.value);
	this.query.value = '';
});