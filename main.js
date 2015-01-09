$(document).ready(function() {

	var hOffset
	var vOffset
	var shadowRadius
	var shadowOpacity
	var shadowColor
	var UIShadowColor
	var shadowColorString
	var boxColor
	var backColor
	var viewName

	
	var initialSetup = function() {
		hOffset = 0
		vOffset = 4
		shadowRadius = 5
		viewName = "viewName"
		shadowOpacity = 0.4
		shadowColor = "#000000"
		shadowColorString = hex2rgb("#000000", 0.4)
		updateBoxShadow()
		boxColor = "#ffffff"
		backColor = "#474747"
	}

	var updateBoxShadow = function() {
		var boxShadowString = hOffset + "px " + vOffset + "px " + shadowRadius + "px " + shadowColorString
		$(".box-container").css({"box-shadow": boxShadowString})
		console.log(boxShadowString)
	}

	var updateHOffset = function() {
		hOffset = $("#hOffset").val()
		updateSwiftCode()
		updateBoxShadow()
	}
	var updateVOffset = function() {
		vOffset = $("#vOffset").val()
		updateSwiftCode()
		updateBoxShadow()
	}
	var updateShadowRadius = function() {
		shadowRadius = $("#shadowRadius").val()
		updateSwiftCode()
		updateBoxShadow()
	}
	var updateShadowOpacity = function() {
		shadowOpacity = $("#shadowOpacity").val()
		shadowColorString = hex2rgb(shadowColor, shadowOpacity)
		updateSwiftCode()
		updateBoxShadow()
	}
	var updateShadowColor = function() {
		shadowColor = $("#shadowColor").val()
		shadowColorString = hex2rgb(shadowColor, shadowOpacity)
		updateSwiftCode()
		updateBoxShadow()
	}
	var updateBoxColor = function() {	
		boxColor = $("#boxColor").val()

		$(".box-container").css({"background-color": boxColor})
	}
	var updateBackColor = function() {
		backColor = $("#backColor").val()

		$(".main-content").css({"background-color": backColor})
	}
	var updateViewName = function() {
		viewName = $("#viewName").val()
		if (viewName == "") {
			viewName = "viewName"
		}
		updateSwiftCode()
	}

	var hex2rgb = function(hex, opacity) {
        var h=hex.replace('#', '');
        h =  h.match(new RegExp('(.{'+h.length/3+'})', 'g'));

        for(var i=0; i<h.length; i++)
            h[i] = parseInt(h[i].length==1? h[i]+h[i]:h[i], 16);

        if (typeof opacity != 'undefined')  h.push(opacity);

        return 'rgba('+h.join(',')+')';
	}

	var hex2rgbComponents = function(hex) {
        var h=hex.replace('#', '');
        h =  h.match(new RegExp('(.{'+h.length/3+'})', 'g'));

        for(var i=0; i<h.length; i++)
            h[i] = parseInt(h[i].length==1? h[i]+h[i]:h[i], 16);

        return h
	}

	var getUIColorCode = function() {
		var rgbComponents = hex2rgbComponents(shadowColor)
		UIShadowColor = "UIColor(" + "red: " + rgbComponents[0]/255 + ", green: " + rgbComponents[1]/255 + ", blue: " + rgbComponents[2]/255 + ").CGColor"
		return UIShadowColor
	}

	var updateSwiftCode = function() {

		var code = viewName + ".layer.shadowColor = " + getUIColorCode() + "\n"
		+ viewName + ".layer.shadowOffset = CGWidth(width: " + hOffset + ", height: " + vOffset  + "\n"
		+ viewName + ".layer.shadowOpacity = " + shadowOpacity + "\n"
		+ viewName + "layer.shadowRadius = " + shadowRadius
		$(".box-code").text(code)
	}

	$("#vOffset").keyup(function() {
		console.log("vertical offset adjusted")
		updateVOffset()
	})
	$("#hOffset").keyup(function() {
		updateHOffset()
	})
	$("#shadowRadius").keyup(function() {
		updateShadowRadius()
	})
	$("#shadowOpacity").keyup(function() {
		updateShadowOpacity()
	})
	$("#shadowColor").keyup(function() {
		updateShadowColor()
	})
	$("#boxColor").keyup(function() {
		updateBoxColor()
	})
	$("#backColor").keyup(function() {
		updateBackColor()
	})
	$("#viewName").keyup(function() {
		updateViewName()
	})


	initialSetup()
	var client = new ZeroClipboard($(".copy-button"));

	client.on( 'ready', function(event) {
        console.log( 'movie is loaded' );

        client.on( 'copy', function(event) {
          event.clipboardData.setData('text/plain', event.target.innerHTML);
        } );

        client.on( 'aftercopy', function(event) {
          console.log('Copied text to clipboard: ' + event.data['text/plain']);
        } );
      } );

});