Selectize.define('select_on_focus', function(options) {
	var self = this;
	var scoreFunction = self.settings.score;

	self.on('focus', function() {
		var originalFocus = self.onFocus;
		return function(e) {
			var value = self.getValue();
			var text = self.getItem(self.getValue()).text();
			self.clear();
			if (value !== "") {
				self.setTextboxValue(text);	
				self.$control_input.select();
			}
			setTimeout( function () {
				self.setActiveOption(self.getOption(value));
				self.settings.score = scoreFunction;
			},0);
			return originalFocus.apply(this, arguments);
		};
	}());

	self.onBlur = (function() {
		var originalBlur = self.onBlur;
		return function(e) {
			setTimeout( function () {
				self.settings.score = function() {
					return function() {
						return 1;
					};
				};
			}, 0 );
			return originalBlur.apply(this, arguments);
		}
	}());
	self.settings.score = function() {
		return function() { return 1; };
	};

});