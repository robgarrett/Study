// NodeJS require caches objects, so cannot use it for multple instances,
// export a function instead.
module.exports = function() {
	var ratePoints = 0;
	return {
		rate: function(points) {
			ratePoints = points;
		},
		getPoints: function() {
			return ratePoints;
		}
	}
}
