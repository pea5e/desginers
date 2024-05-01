
var widthpart ;
var heightpart;


const security = document.cookie.replaceAll('; ','=').split('=')[document.cookie.replaceAll('; ','=').split('=').indexOf("security")+1];

const tshirt = document.getElementById("yourt")


    var loadFile = function(event) {
  	  var image = document.getElementById('design');
      image.style.display = "block";
  	  image.src = URL.createObjectURL(event.target.files[0]);
      image.onload = () => {
        var biggest = image.naturalWidth>image.naturalHeight | 0;
        var size = [image.naturalHeight,image.naturalWidth];
        size_max = size[biggest];
        var t_size = tshirt.getBoundingClientRect().width
        var zoom =  document.getElementById("zoom") 
        if (size_max > t_size*0.75)
            size_max = t_size*0.75;
        
        zoom.value = 21-((size_max/(t_size*0.75))*20)
        zoom.style.display="block"
        size[biggest] = size_max;
        size[(biggest+1)%2] = ([image.naturalHeight,image.naturalWidth][(biggest+1)%2]/[image.naturalHeight,image.naturalWidth][biggest])*size_max;
        widthpart = size[1]/20;
        heightpart = size[0]/20;
        image.style.height = size[0]+"px";
        image.style.width = size[1]+"px";
        middle_t = t_size/2
        image.style.top = (middle_t-size[0]/2)+"px";
        image.style.left = (middle_t-size[1]/2)+"px";
      }
    };
    function choose(ele)
      {
      document.getElementById("custom").style.backgroundColor = ele.value; 
      }
    function change (){
      var des = document.getElementById('design')
        if (des.style.cursor != "move")
          des.style.cursor = "move";
        else 
          des.style.cursor = "pointer";
    }

    var cus = document.getElementById('custom');

      cus.onmousemove = function(event){
      var des = document.getElementById('design')
      if (des && des.style.cursor != "pointer")
      {
        let info = getComputedStyle(des);
        let box = document.getElementById("custom").getBoundingClientRect();
	      var cx = event.clientX - box.left;
        var cy = event.clientY - box.top;
        if (cy>( parseInt(info.height) / 2 ) && cx>( parseInt(info.width) / 2 )
        && cy<box.height-( parseInt(info.height) / 2 ) &&  cx<box.width-( parseInt(info.width) / 2 ))
        {
          des.style.cursor = "move";
          des.style.top = cy - ( parseInt(info.height) / 2 )+"px";
          des.style.left = cx - ( parseInt(info.width) / 2 )+"px";
        }
        else {
          des.style.cursor ="not-allowed";
        }
      }
      }
// add moving from point you click in while mouse down
// add cusror to zoom in zoom out the design
// with border or outline for design image
// add report for credits or copyrights

   
    function zoom()
      {
        let image = document.getElementById('design');
        let rect = image.getBoundingClientRect();
        let box = document.getElementById("custom").getBoundingClientRect();
        let size = document.getElementById('zoom')
        image.style.width = (21-size.value)*widthpart+"px";
        image.style.height = (21-size.value)*heightpart+"px";
        // image.style.left = (rect.left-box.left)+((rect.width - image.getBoundingClientRect().width)/2)+"px";
        // image.style.top = (rect.top-box.top)+((rect.height - image.getBoundingClientRect().height)/2)+"px";
        image.style.left = parseFloat(image.style.left.match(/[0-9\.]+/)[0])+((rect.width - image.getBoundingClientRect().width)/2)+"px";
        image.style.top = parseFloat(image.style.top.match(/[0-9\.]+/)[0])+((rect.height - image.getBoundingClientRect().height)/2)+"px";

      }


    function mode(ele)
      {
        let old = document.getElementById("design").style.mixBlendMode;
        document.getElementById(old).style.backgroundColor = "white";
        document.getElementById(old).style.color = "black";
        document.getElementById("design").style.mixBlendMode = ele.id;
        ele.style.backgroundColor = "black";
        ele.style.color = "white";
      }

    

        
      function saving() {
        var image = document.getElementById('design');
        if (image.src == "")
          document.getElementById("error").innerHTML = "<i class=\"fa-solid fa-circle-exclamation\"></i>Ajouter un design"; 
        else if(document.getElementById("prixrange").value == "60" )
          document.getElementById("error").innerHTML = "<i class=\"fa-solid fa-circle-exclamation\"></i>fixer le prix"; 
        else
        {
          document.getElementById("error").innerHTML = '';
          let rect = tshirt.getBoundingClientRect().width;
          var img64 = image.src
          var couleur = document.getElementById("color").value;
          var prix = document.getElementById("prixrange").value;
          var y = document.getElementById("design").style.top.match(/[0-9]+/)[0]/rect;
          var x = document.getElementById("design").style.left.match(/[0-9]+/)[0]/rect;
          var w = document.getElementById("design").style.width.match(/[0-9]+/)[0]/rect;
          var h = document.getElementById("design").style.height.match(/[0-9]+/)[0]/rect;
          var blend = document.getElementById("design").style.mixBlendMode;
          let cook = document.cookie.replaceAll('; ','=').split('=');
          var email = cook[cook.indexOf("email")+1];

          addtshirt({"secret_key":security,
          "y":y,"x":x,"w":w,"h":h,"blend":blend,"email":email,"prix":prix,"color":couleur,"img":img64})
        }
      }
      

      function addtshirt(obj) {
        fetch(obj["img"])
        .then(function (response) {
          return response.blob();
        })
        .then(function (blob) {
          var reader = new FileReader();
          reader.readAsDataURL(blob); 
          reader.onloadend = function() {
            obj["img"] = reader.result;
            document.getElementsByClassName("loader")[0].style.display = "flex";
            document.getElementsByTagName("main")[0].style.display = "none";
            
             fetch("https://api.printsplash.repl.co/add",
          {
              method: "POST", 
              mode: "cors", 
              headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify(obj),
          }).then(()=>location.reload())

          }
      });
      }


      document.getElementById("logout").onclick = () => {
            location.href = "/login";
      }



document.getElementById("prixnum").onchange = () => {
    var num = document.getElementById("prixnum");
    if (num.value > 200)
      num.value="200";
    if (num.value < 60)
      num.value="60";
    document.getElementById("prixrange").value = num.value;
    document.getElementById("profit").innerHTML = num.value-60+".00 MAD";
    num.value = num.value+'.00';
}

document.getElementById("prixrange").oninput = () => {
  var num = document.getElementById("prixrange").value;
  document.getElementById("prixnum").value = num+".00";
  document.getElementById("profit").innerHTML = num-60+".00 MAD";
}


