let loader = document.getElementById("button");
let xhttp = new XMLHttpRequest();
loader.addEventListener("click", load_photo);

function load_photo() {
    xhttp.open("GET", "https://randomuser.me/api/?results=50", true);
    $.ajax({
        beforeSend: function() {
            $('.loader').show();
        },
        complete: function() {
            $(".loader").fadeOut("slow");
        }
    });
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                let data = JSON.parse(xhttp.responseText);
                console.log(data);
                for (let i = 0; i < data.results.length; i++) {
                    let img = document.createElement("img");
                    document.body.appendChild(img);
                    img.setAttribute("src", data.results[i].picture.large);
                    img.style.width = "15vw";
                    img.style.height = "15vw";
                    img.style.marginLeft = "4vw";
                    img.style.marginBottom = "3vw";
                }
            } catch (err) {
                document.write(err.message + " in " + xhttp.responseText);
            }
        }
        
    };
    xhttp.send(null);
}

$(window).on('load', preloader);

function preloader() {
    $(".loader").fadeOut("slow");
}

window.onscroll = function () {
    // висота окна + прокрутка >= висота body
    if (document.documentElement.clientHeight + pageYOffset >= document.body.offsetHeight) {
        load_photo();
    }
}