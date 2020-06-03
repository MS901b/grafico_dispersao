Array.prototype.sum = function() {
	var s = 0;
		for (var i = 0; i < this.length; i++) {
		s += (isNaN(this[i])) ?  0 : parseFloat(this[i]);
	}
	return s;
};

Array.prototype.max = function() {
	var max = this[0];
	var len = this.length;
	for (var i = 1; i < len; i++) if (parseFloat(this[i]) > max) max = parseFloat(this[i]);
	return max;
}
Array.prototype.min = function() {
	var min = this[0];
	var len = this.length;
	for (var i = 1; i < len; i++) if (parseFloat(this[i]) < min) min = parseFloat(this[i]);
	return min;
}

function roundNumber(num, dec) {
	var result = Math.round( Math.round( num * Math.pow( 10, dec + 1 ) ) / Math.pow( 10, 1 ) ) / Math.pow(10,dec);
	return result;
}

function xml2Str(xmlNode) {
   try {
      // Gecko-based browsers, Safari, Opera.
      return (new XMLSerializer()).serializeToString(xmlNode);
  }
  catch (e) {
     try {
        // Internet Explorer.
        return xmlNode.xml;
     }
     catch (e) {  
        //Other browsers without XML Serializer
        alert('Xmlserializer not supported');
     }
   }
   return false;
}

function mudarEscala(xMin,xMax,yMin,yMax){
	var applet = document.ggbApplet;
	
	
	stringXML = applet.getXML();

	// Converte a string para um documento XML
	try //Internet Explorer
	  {
	  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	  xmlDoc.async="false";
	  xmlDoc.loadXML(stringXML);
	  }
	catch(e)
	  {
	  try //Firefox, Mozilla, Opera, etc.
	    {
	    parser=new DOMParser();
	    xmlDoc=parser.parseFromString(stringXML,"text/xml");
	    }
	  catch(e) {alert(e.message)}
	  }



	x=xmlDoc.getElementsByTagName("euclidianView")[0];

	if (x.getElementsByTagName("size")[0]!=undefined) {
		var sizeX = x.getElementsByTagName("size")[0].getAttribute('width');
		var sizeY = x.getElementsByTagName("size")[0].getAttribute('height');
//		console.log('size do ggb',sizeX,sizeY);
	} 
	else
	{
		var sizeX = Number(applet.width)-2;
		var sizeY = Number(applet.height)-2;
//		console.log('size do applet',sizeX,sizeY);
	}

	
	var escalaX = sizeX/(xMax-xMin);
	var escalaY = sizeY/(yMax-yMin);
	var zeroX = -1*xMin*escalaX;
	var zeroY = Number(sizeY) + Number(yMin*escalaY);
		
	
	x.getElementsByTagName("coordSystem")[0].setAttribute('scale',escalaX);
	x.getElementsByTagName("coordSystem")[0].setAttribute('yscale',escalaY);
	x.getElementsByTagName("coordSystem")[0].setAttribute('xZero',zeroX);
	x.getElementsByTagName("coordSystem")[0].setAttribute('yZero',zeroY);


	 applet.setXML(xml2Str(xmlDoc)) ;
	 applet.refreshViews();
	 
}

