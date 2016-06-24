$(function(){
		let $input = $('textarea');
		let $process = $('button');
		let $outputBox = $('pre');

		$process.on('click', function(){
		  let rawString = $input.val(); // GRAB INPUT

			let dataArr = rawString.match(/!.+=.+/g) //GRAB DATA AS AN ARRAY BASED ON '!' AND '='
			let messageString = rawString.replace(/!.+=.+\n/g, '') //REMOVE ALL THE DATA LINES FROM THE MESSAGE

			let dataObj = dataArr.reduce((p,c)=>
			{
				let k = c.split('=')[0].slice(1); //REMOVE THE '!' CHARACTER
				let v = c.split('=')[1];

				if(/@/.test(v)) //IF THE 'VALUE' SIDE OF THIS SPLIT CONTAINS '@'
				{
					for(var key in p) // SEARCH THROUGH ALREADY DEFINED PROPERTIES FOR REPLACEMENT STRINGS
					{
						var re = new RegExp('@([{]?'+key+'[}]?)', 'g'); // A REGEX BASED ON THE '@' CHARACTER FOLLOWED (OR NOT) BY A PAIR OF BRACKETS AND THE CURRENT KEY
						v = v.replace(re, p[key]); //REPLACE ANY MATCH WITH THE VALUE ALREADY STORED IN 'P'
					}
				}
				p[k] = v;
				return p;
			},{})
      
      for(var key in dataObj) //GO THROUGH EACH KEY IN DATA OBJECT
      {
      	var re = new RegExp('@([{]?'+key+'[}]?)', 'g') // AND CREATE A REGEX TO FIND MATCHES WITH THE @ SYMBOL AND OPTIONALLY {}
       	messageString = messageString.replace(re, dataObj[key]) // REPLACE ANY MATCHES WITH THE CORRESPONDING VALUE IN THE DATAOBJ
      }
      messageString = messageString.replace(/@@/g, '@');

      $outputBox.text(messageString) // OUTPUT TO PRE BLOCK
		});


})