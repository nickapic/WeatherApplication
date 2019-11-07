window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription= document.querySelector('.temperature-description');
    //shift+alt+down to duplicate stuff btw
    let temperatureDegree= document.querySelector('.temperature-degree');
    let locationTimezone= document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.tempreature')
    const temperatureSpan = document.querySelector('.temperature span');
    if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(position=>{
                long=position.coords.longitude;
                lat=position.coords.latitude;
                //add proxy because the api didnt work directly for a localy hosted server 
                const proxy="https://cors-anywhere.herokuapp.com/"
                const api=`${proxy}https://api.darksky.net/forecast/b8e1b7f62437462e9d627ac84b4a20c4/${lat},${long}`;

                fetch(api)
                .then(response=>{
                    //industry standard to convert it into Json
                  return response.json();  
                })
                .then(data =>{
                    console.log(data);
                    //to pull all data from currently
                    const{temperature,summary, icon }  = data.currently;
                    //Set DOM Elements from the API 
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //Sets Icon
                    setIcons(icon, document.querySelector('.icon'));
               
                    //Change tempreature 
                    temperatureSection.addEventListener('click', ()=>{
                        if (temperatureSpan.textContent === 'F'){
                            temperatureSpan.textContent = 'C';
                        } else{
                            temperatureSpan.textContent="F";
                        }
                    })
               
                });
            });
    }

    function setIcons(icon,iconID){
        const skycons = new Skycons({ color: "white" });
        //what this is gonna do is its gonna look for every line and replace - with _
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        //plays the animation
        skycons.play();
        //returns the skycons with an id and the current icon id
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});
