(function($){

	$(".servers").html(function(){
		var beginS = "<option>", endS = "</option>";
		var s = beginS + servers.join(endS + beginS) + endS;
		return s;
	});

	var classList = {
		"Death Knight" : ["Blood", "Frost", "Unholy"],
		"Druid" : ["Balance", "Feral DPS", "Feral Tank", "Resotration"],
		"Hunter" : ["Beast Mastery", "Marksmanship", "Survival"],
		"Mage" : ["Arcane", "Fire", "Frost"],
		"Paladin" : ["Holy", "Retribution", "Protection"],
		"Priest" : ["Discipline", "Holy", "Shadow"],
		"Rogue" : ["Assassanation", "Combat", "Subtlety"],
		"Shaman" : ["Elemental", "Enhancement", "Restoration"],
		"Warlock" : ["Affliction", "Demonology", "Destruction"],
		"Warrior" : ["Arms", "Fury", "Protection"]
	};

	/* LFG */
	var lfgForm = $("#lfgForm").submit(function(e){
		e.preventDefault();
		return false;
	});
	$("#lfgClass", lfgForm).html(function(){
		var s = "<option>- Select Class</option>", n;
		for(n in classList){
			s += "<option>" + n + "</option>";
		};
		console.log(s);
		return s;
	}).change(function(e){
		var val = e.target.value;
		var beginS = "<option>", endS = "</option>";
		var s = beginS + classList[e.target.value].join(endS + beginS) + endS;
		$("#lfgSpecs", lfgForm).removeAttr("disabled").html(s);
	});


	/* LFM */
	var lfmForm = $("#lfmForm").submit(function(e){
		e.preventDefault();
		return false;
	});
	$("#lfmClasses", lfmForm).html(function(){
		var beginS = "<button class=\"btn\" data-toggle=\"button\">";
		var endS = "</button>";
		var s = "";
			for(n in classList){
				s += beginS + n + endS;
			};
		return s;
	});

})(jQuery);

