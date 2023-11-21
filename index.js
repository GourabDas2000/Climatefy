// For efficient image loading

let blurdiv = document.querySelector('.blur-div')

let img = document.querySelector("img")
function loaded(){
   img.classList.add('loaded')
}
if(img.complete){
    loaded()
}else{
    img.addEventListener('load',() => {
        loaded()
    })
}

// for hiding and showing the details in the cover page 

var x,y,result,result2,temp3,temp2,showmain;

const waitingPage = document.querySelector('.waitingPage')
const myweather = document.querySelector(".myweather")
const clear = document.querySelector('.clear')

//Targeting each tag

const main = document.querySelector(".main")
const description = document.querySelector(".description")
const temp = document.querySelector(".temp")
const feels_like = document.querySelector(".feels_like")
const temp_min = document.querySelector(".temp_min")
const temp_max = document.querySelector(".temp_max")
const pressure = document.querySelector(".pressure")
const humidity = document.querySelector(".humidity")
const name = document.querySelector(".name")
const snow = document.querySelector(".snow")
const visibility = document.querySelector(".visibility")
const cloud = document.querySelector(".cloud")
const rain = document.querySelector(".rain")
const speed = document.querySelector(".speed")
const deg = document.querySelector(".deg")
const quality = document.querySelector(".quality")


const wrrap_main = document.querySelector(".wrrap-main i")


document.querySelector(".show").addEventListener('click',()=>{

    waitingPage.style.display = 'block'
    //for fetching your own location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
            x = position.coords.latitude;
            y= position.coords.longitude;
            x=x.toFixed(2)
            y=y.toFixed(2)
            // Fething Data from api
            data(x,y)
        });
    }
})




// Fething Data from api

const apikey = 'b5227eb415d8925187dc818bdeba0098';
var data = async (a,b) => {
    var formain = `https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&APPID=${apikey}`;
    var forairpoll = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${a}&lon=${b}&appid=${apikey}`

    try{
        
        const fetchdata = await fetch(formain);
        result = await fetchdata.json()
        const fetchdata2 = await fetch(forairpoll);
        result2 = await fetchdata2.json()

        // placing data in write box 

        placedata(result,result2)

        //For showing or hiding the full bar
        waitingPage.style.display='none'
        myweather.childNodes[5].classList.remove("beforedetails")
        myweather.childNodes[5].classList.add("fordetails")
        document.querySelector('.show').style.display = 'none'
    }catch{
        console.log('somthing')
    }  
}

// placing data in write box 

function placedata(result,result2){

    main.textContent=result.weather[0].main
    description.textContent=result.weather[0].description
    temp.textContent = (result.main.temp - 273.15).toFixed() + '°C'
    feels_like.textContent = (result.main.feels_like - 273.15).toFixed() + '°C'
    temp_min.textContent = (result.main.temp_min - 273.15).toFixed() + '°C'
    temp_max.textContent = (result.main.temp_max - 273.15).toFixed() + '°C'
    pressure.textContent = result.main.pressure + 'hPa'
    humidity.textContent = result.main.humidity + '%'
    name.textContent = result.name 
    visibility.textContent = result.visibility + 'hPa'
    cloud.textContent = result.clouds.all + '%'
    if(result.rain){
        rain.textContent = result.rain + 'mm'
    }
    if(result.snow){
        snow.textContent = result.snow + 'mm'
    }
    speed.textContent = result.wind.speed + 'meter/sec'
    deg.textContent = result.wind.deg + '°'

    


    //for wind quality


    temp3= result2.list[0].main.aqi
    if(temp3 == 1){
        temp2 = 'Good'
    }
    else if (temp3 == 2) {
        temp2 = 'Fair'
    }
    else if ( temp3 == 3 ){
        temp2 = 'Moderate'
    }
    else if (temp3 == 4){
        temp2 = 'Poor'
    }
    else if (temp3 == 5){
        temp2 = 'Very Poor'
    }
    quality.textContent = temp2

    


    //For Changing icon according to the weather

    showmain = result.weather[0].main

    if(showmain == 'Rain'){
        wrrap_main.classList.add('fa-solid' ,'fa-cloud-showers-heavy','fa-xs')
    }
    else if (showmain == 'Haze'){
        wrrap_main.classList.add('fa-solid' ,'fa-smog','fa-xs')
    }
    else if (showmain == 'Thunderstorm'){
        wrrap_main.classList.add('fa-solid' ,'fa-cloud-bolt','fa-xs')
    }
    else if (showmain == 'Drizzle'){
        wrrap_main.classList.add('fa-solid' ,'fa-cloud-sun-rain','fa-xs')
    }
    else if (showmain == 'Snow'){
        wrrap_main.classList.add('fa-solid' ,'fa-cloud-meatball','fa-xs')
    }
    else if (showmain == 'Clear'){
        wrrap_main.classList.add('fa-solid' ,'fa-sun','fa-xs')
    }
    else if (showmain == 'Clouds'){
        wrrap_main.classList.add('fa-solid' ,'fa-cloud','fa-xs')
    }
    else if (showmain == 'Mist'){
        wrrap_main.classList.add('fa-solid' ,'fa-umbrella','fa-xs')
    }
    else if (showmain == 'Smoke'){
        wrrap_main.classList.add('fa-solid' ,'fa-volcano','fa-xs')
    }
    else if (showmain == 'Dust'){
        wrrap_main.classList.add('fa-solid' ,'fa-industry','fa-xs')
    }
    else if (showmain == 'Fog'){
        wrrap_main.classList.add('fa-solid' ,'fa-smog','fa-xs')
    }
    else if (showmain == 'Sand'){
        wrrap_main.classList.add('fa-solid' ,'fa-hourglass-start','fa-xs')
    }
    else if (showmain == 'Tornado'){
        wrrap_main.classList.add('fa-solid' ,'fa-tornado','fa-xs')
    }
    else{
        wrrap_main.classList.add('fa-solid' ,'fa-snowflake','fa-xs')
    }
    clear.addEventListener('click',() =>{
        myweather.childNodes[5].classList.remove("fordetails")
        myweather.childNodes[5].classList.add("beforedetails")
        document.querySelector('.show').style.display = 'block'
    })
}




// =============================== Service ====================================

// for Heading selecetion=====================================================================

const differentcondition = document.querySelectorAll(".different_condition div")
const cityname =  document.querySelector(".cityname");
const countrycode =  document.querySelector(".countrycode");
const latlon = document.querySelector(".latlon");
const searchboxin = document.querySelector('.searchbox input')


function changebar(){
    for(let i =0 ; i<differentcondition.length ; i++){
        if(differentcondition[i].classList.contains('activebar')){
            differentcondition[i].classList.remove('activebar')
        }
    }
}

cityname.addEventListener('click',()=>{
    changebar()
    cityname.classList.add('activebar');
    searchboxin.attributes[2].textContent = 'cityname';
})

countrycode.addEventListener('click',()=>{
    changebar()
    countrycode.classList.add('activebar');
    searchboxin.attributes[2].textContent = 'zipcode,countrycode(no space)';

})

latlon.addEventListener('click',()=>{
    changebar()
    latlon.classList.add('activebar');
    searchboxin.attributes[2].textContent = 'latitude,longitude(no space)';
})

// =========================================for searchbox ==========================================================================

const input = document.querySelector('.searchbox input')
const icondel = document.querySelector('.icondel')
const firsticon = document.querySelector('.searchbox i')


//timechange function ==========================================================================================================================

//Bydefoult day-night change
const Day = document.querySelector('.Day i')


//changing the forday , fornight class

const forday = document.querySelector('.forday')
const fornight = document.querySelector('.fornight')

//sun and moon rise and set  ------------------------------------------------------------------

astro_day = document.querySelector('.astro_day')
astro_night = document.querySelector('.astro_night')


Day.addEventListener('click',()=>{
    if(Day.classList.contains('fa-moon')){
        Day.classList.remove('fa-moon')
        Day.classList.add('fa-sun')
        fornight.classList.add('deactivetime')
        forday.classList.remove('deactivetime')
        astro_night.classList.add('off')
        astro_day.classList.remove('off')
    }
    else{
        Day.classList.remove('fa-sun')
        Day.classList.add('fa-moon')
        fornight.classList.remove('deactivetime')
        forday.classList.add('deactivetime')
        astro_day.classList.add('off')
        astro_night.classList.remove('off')
    }
})

// changing between fortoday and week ==========================================================================

const fortoday = document.querySelector('.fortoday')
const forweek = document.querySelector('.forweek')
const today = document.querySelector('.today')
const week = document.querySelector('.week')

today.addEventListener('click' , () => {
    fortoday.classList.remove('toeek')
    forweek.classList.add('toeek')
    today.classList.add('active')
    week.classList.remove('active')
})
week.addEventListener('click',() => {
    fortoday.classList.add('toeek')
    forweek.classList.remove('toeek')
    today.classList.remove('active')
    week.classList.add('active')
})


input.addEventListener('change',()=>{
    if(input.value == ''){
        icondel.style.display = 'none'
    }
    else{
        icondel.style.display = 'block'
    }
})

icondel.addEventListener('click',()=>{
    input.value = ''
})


var forFT = 0
var authors1 , authors2 ;
var storeI = [];
var dcardcount = [];


const unit  = document.querySelector('.unit')
const service_temp2 = document.querySelector('.service_temp p')
const todays_upper = document.querySelector('.todays_upper')
const todays_wind_feel_like = document.querySelector('.todays_wind_feel-like')

unit.addEventListener('click',()=>{
    
    if(forFT == 0){
        (service_temp2.textContent == 'F') ? service_temp2.textContent = '°C' : service_temp2.textContent = 'F';
        (hourcards[0].children[0].children[1].textContent == 'F') ? hourtemp('°C') : hourtemp('F');

    }
    else{
        (unit.textContent == 'F') ?  service_temp2.textContent = 'F' : service_temp2.textContent = '°C';
        (unit.textContent == 'F') ?  service_temp1.textContent = authors1.current.feelslike_f.toFixed(0) : service_temp1.textContent = authors1.current.feelslike_c.toFixed(0) ;
        (unit.textContent == 'F') ?  authf(authors1) : authc(authors1);
    }
    unit.textContent == 'F' ? unit.textContent = '°C' : unit.textContent = 'F'
})
const hrray = [6,9,11,13,15,19,21,23,1,3];
const hourcardscatch = document.querySelectorAll('.hourcards');
const card_feelsLike = document.querySelectorAll('.card_feelsLike span');
const max = document.querySelector('.max span');
const min = document.querySelector('.min span');
const avg = document.querySelector('.avg span');
const todays_wind_feellike = document.querySelector('.todays_wind_feel-like span');
const dcardstemp = document.querySelectorAll('.dcardstemp');




function authc(auth){
    for(let i=0 ; i<hourcards.length ; i++){
        hourcards[i].children[0].children[1].textContent =  auth.forecast.forecastday[0].hour[hrray[i]].temp_c.toFixed(0) + '°C';
        card_feelsLike[i].textContent = auth.forecast.forecastday[0].hour[hrray[i]] .feelslike_c + '°C';
    }
    max.textContent = auth.forecast.forecastday[0].day.maxtemp_c + '°C';
    min.textContent = auth.forecast.forecastday[0].day.maxtemp_c + '°C';
    avg.textContent = auth.forecast.forecastday[0].day.maxtemp_c + '°C';
    todays_wind_feellike.textContent =authors1.current.feelslike_c + '°C';
    for(let i = 0 ; i<dcardstemp.length ; i++){
        dcardstemp[i].textContent = dcardcount[i+1] + '°C';
    }
    for(let i = 1 ; i<storeI.length; i++ ){
        let ftemp = storeI[i]
        for(let ht = 0 ;ht<4 ; ht++ ){
           let foreachth = authors2.list[ftemp+ht+1]
           let againtime = foreachth.dt_txt
           let finaltime = ''
           for(let f=11 ; f<16 ; f++){
               finaltime = finaltime + againtime[f]
           }
           eachday[i-1].children[ht].children[0].children[0].textContent = (foreachth.main.temp -273).toFixed(0) + '°C'
           eachday[i-1].children[ht].children[2].children[0].children[0].textContent = (foreachth.main.temp_max  -273).toFixed(0) + '°C'
           eachday[i-1].children[ht].children[2].children[1].children[0].textContent = (foreachth.main.temp_min  -273).toFixed(0) + '°C'
           eachday[i-1].children[ht].children[3].children[0].textContent = (foreachth.main.feels_like  -273).toFixed(0) + '°C'
        } 
   }
}
function authf(auth){
    for(let i=0 ; i<hourcards.length ; i++){
        hourcards[i].children[0].children[1].textContent  =  auth.forecast.forecastday[0].hour[hrray[i]].temp_f.toFixed(0) + 'F';
        card_feelsLike[i].textContent = auth.forecast.forecastday[0].hour[hrray[i]].feelslike_f + 'F';        
    }
    max.textContent = auth.forecast.forecastday[0].day.maxtemp_f + 'F'; 
    min.textContent = auth.forecast.forecastday[0].day.maxtemp_f + 'F'; 
    avg.textContent = auth.forecast.forecastday[0].day.maxtemp_f + 'F'; 
    todays_wind_feellike.textContent =authors1.current.feelslike_f + 'F';
    for(let i = 0 ; i<dcardstemp.length ; i++){
        dcardstemp[i].textContent = ((dcardcount[i+1] * 1.8) + 32).toFixed(0) + 'F';
    }
    for(let i = 1 ; i<storeI.length; i++ ){
        let ftemp = storeI[i]
        for(let ht = 0 ;ht<4 ; ht++ ){
           let foreachth = authors2.list[ftemp+ht+1]
           let againtime = foreachth.dt_txt
           let finaltime = ''
           for(let f=11 ; f<16 ; f++){
               finaltime = finaltime + againtime[f]
           }
           eachday[i-1].children[ht].children[0].children[0].textContent = ((foreachth.main.temp -273) + 32).toFixed(0) + 'F'
           eachday[i-1].children[ht].children[2].children[0].children[0].textContent = ((foreachth.main.temp_max  -273) + 32).toFixed(0) + 'F'
           eachday[i-1].children[ht].children[2].children[1].children[0].textContent = ((foreachth.main.temp_min  -273) + 32).toFixed(0) + 'F'
           eachday[i-1].children[ht].children[3].children[0].textContent = ((foreachth.main.feels_like  -273) + 32).toFixed(0) + 'F'
        } 
   }
}

function hourtemp(rl){
    for(let i = 0 ; i<hourcards.length ; i++){
        hourcards[i].children[0].children[1].textContent = rl
        hourcards[i].children[4].children[0].textContent = rl
    }
    for(let i =0 ; i<todays_upper.children.length ; i++){
        todays_upper.children[i].children[0].textContent = rl
    }
    todays_wind_feel_like.children[0].textContent = rl
    for(let i = 0 ; i<daycards.length ; i++){
        daycards[i].children[2].textContent = rl
    }
    for(let i = 0 ; i< eachour.length ; i++){
        eachour[i].children[0].children[0].textContent = rl
        eachour[i].children[2].children[0].children[0].textContent = rl
        eachour[i].children[2].children[1].children[0].textContent = rl
        eachour[i].children[3].children[0].textContent = rl
    }
}


firsticon.addEventListener('click',()=>{
    var searchword = input.value;
    var apiurl , apiurl2;
    if(cityname.classList.contains('activebar')){
        apiurl = `http://api.weatherapi.com/v1/forecast.json?key=5c946c5534f749a89a6175936231111&q=${searchword}&days=1&aqi=yes&alerts=no`;
        apiurl2 = `https://api.openweathermap.org/data/2.5/forecast?q=${searchword}&appid=029e46846209482c4bce8cbd2d9b82f3`;
    }
    else if(countrycode.classList.contains('activebar')){
        let ab = searchword.split(',')
        apiurl = `http://api.weatherapi.com/v1/forecast.json?key=5c946c5534f749a89a6175936231111&q=${Number(ab[0])}&days=1&aqi=yes&alerts=no`;
        apiurl2 = `http://api.openweathermap.org/data/2.5/forecast?zip=${searchword}&appid=029e46846209482c4bce8cbd2d9b82f3`;
    }
    else if(latlon.classList.contains('activebar')){
        apiurl=`http://api.weatherapi.com/v1/forecast.json?key=5c946c5534f749a89a6175936231111&q=${searchword}&days=1&aqi=yes&alerts=no`;
        let ab = searchword.split(',')
        apiurl2 = `http://api.openweathermap.org/data/2.5/forecast?lat=${Number(ab[0]).toFixed(0)}&lon=${Number(ab[1]).toFixed(0)}&appid=029e46846209482c4bce8cbd2d9b82f3`;
    }
    //calling API =======================================================================================================================================================================
   
    call(apiurl)
    call2(apiurl2)
    unit.textContent = 'F';
})

// selecting field and giving them specific value==================================================================
const call = async (apiurl) => {
    await fetch(apiurl).then((responsek) => {
      return responsek.json();
    }).then((data) => {
      authors1 = data;
      locatedata(authors1)
    })
}
const call2 = async (apiurl) => {
    await fetch(apiurl).then((responsek) => {
      return responsek.json();
    }).then((data) => {
      authors2 = data;
      locateweek(authors2)
    })
    forFT = 1
}
const dayname = ['Monday' ,'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']



// all declaration for locatedata=====================================================================

const date_time1 = document.querySelector('.date_time h1');
const date_time2 = document.querySelector('.date_time p');
const service_temp1 = document.querySelector('.service_temp h1');
const condition_text = document.querySelector('.condition_text');
const service_condition_icon = document.querySelector('.service_condition_icon');
const service_icon = document.querySelector('.service_icon');
const service_uv = document.querySelector('.service_uv span');
const service_pressure = document.querySelector('.service_pressure span');
const service_gust1 = document.querySelector('.service_gust span');
const chance_of_rain = document.querySelector('.chance_of_rain span');
const chance_of_snow = document.querySelector('.chance_of_snow span');
const service_temp1tail = document.querySelector('.service_temp p');
const Forweather_img = document.querySelector('.Forweather_img');

const hourcards = document.querySelectorAll('.hourcards');


const hourcards1 = hourcards[0]
h1cardtime = hourcards1.querySelector('.cardtime')
h1temp = hourcards1.querySelector('.temp')
h1icon = hourcards1.querySelector('.card_icon')
h1card_condition = hourcards1.querySelector('.card_condition')
h1card_wind = hourcards1.querySelector('.card_wind')
h1card_humidity = hourcards1.querySelector('.card_humidity')
h1card_feelsLike = hourcards1.querySelector('.card_feelsLike span')
h1card_rain = hourcards1.querySelector('.card_rain')
h1card_snow = hourcards1.querySelector('.card_snow')
h1card_wind2 = hourcards1.querySelector('.card_wind2')

const hourcards2 = hourcards[1]
h2cardtime = hourcards2.querySelector('.cardtime')
h2temp = hourcards2.querySelector('.temp')
h2icon = hourcards2.querySelector('.card_icon')
h2card_condition = hourcards2.querySelector('.card_condition')
h2card_wind = hourcards2.querySelector('.card_wind')
h2card_humidity = hourcards2.querySelector('.card_humidity')
h2card_feelsLike = hourcards2.querySelector('.card_feelsLike')
h2card_rain = hourcards2.querySelector('.card_rain')
h2card_snow = hourcards2.querySelector('.card_snow')
h2card_wind2 = hourcards2.querySelector('.card_wind2')

const hourcards3 = hourcards[2]
h3cardtime = hourcards3.querySelector('.cardtime')
h3temp = hourcards3.querySelector('.temp')
h3icon = hourcards3.querySelector('.card_icon')
h3card_condition = hourcards3.querySelector('.card_condition')
h3card_wind = hourcards3.querySelector('.card_wind')
h3card_humidity = hourcards3.querySelector('.card_humidity')
h3card_feelsLike = hourcards3.querySelector('.card_feelsLike span')
h3card_rain = hourcards3.querySelector('.card_rain')
h3card_snow = hourcards3.querySelector('.card_snow')
h3card_wind2 = hourcards3.querySelector('.card_wind2')

const hourcards4 = hourcards[3]

h4cardtime = hourcards4.querySelector('.cardtime')
h4temp = hourcards4.querySelector('.temp')
h4icon = hourcards4.querySelector('.card_icon')
h4card_condition = hourcards4.querySelector('.card_condition')
h4card_wind = hourcards4.querySelector('.card_wind')
h4card_humidity = hourcards4.querySelector('.card_humidity')
h4card_feelsLike = hourcards4.querySelector('.card_feelsLike span')
h4card_rain = hourcards4.querySelector('.card_rain')
h4card_snow = hourcards4.querySelector('.card_snow')
h4card_wind2 = hourcards4.querySelector('.card_wind2')

const hourcards5 = hourcards[4]
h5cardtime = hourcards5.querySelector('.cardtime')
h5temp = hourcards5.querySelector('.temp')
h5icon = hourcards5.querySelector('.card_icon')
h5card_condition = hourcards5.querySelector('.card_condition')
h5card_wind = hourcards5.querySelector('.card_wind')
h5card_humidity = hourcards5.querySelector('.card_humidity')
h5card_feelsLike = hourcards5.querySelector('.card_feelsLike span')
h5card_rain = hourcards5.querySelector('.card_rain')
h5card_snow = hourcards5.querySelector('.card_snow')
h5card_wind2 = hourcards5.querySelector('.card_wind2')

const hourcards6 = hourcards[5]
h6cardtime = hourcards6.querySelector('.cardtime')
h6temp = hourcards6.querySelector('.temp')
h6icon = hourcards6.querySelector('.card_icon')
h6card_condition = hourcards6.querySelector('.card_condition')
h6card_wind = hourcards6.querySelector('.card_wind')
h6card_humidity = hourcards6.querySelector('.card_humidity')
h6card_feelsLike = hourcards6.querySelector('.card_feelsLike span')
h6card_rain = hourcards6.querySelector('.card_rain')
h6card_snow = hourcards6.querySelector('.card_snow')
h6card_wind2 = hourcards6.querySelector('.card_wind2')


const hourcards7 = hourcards[6]
h7cardtime = hourcards7.querySelector('.cardtime')
h7temp = hourcards7.querySelector('.temp')
h7icon = hourcards7.querySelector('.card_icon')
h7card_condition = hourcards7.querySelector('.card_condition')
h7card_wind = hourcards7.querySelector('.card_wind')
h7card_humidity = hourcards7.querySelector('.card_humidity')
h7card_feelsLike = hourcards7.querySelector('.card_feelsLike span')
h7card_rain = hourcards7.querySelector('.card_rain')
h7card_snow = hourcards7.querySelector('.card_snow')
h7card_wind2 = hourcards7.querySelector('.card_wind2')

const hourcards8 = hourcards[7]
h8cardtime = hourcards8.querySelector('.cardtime')
h8temp = hourcards8.querySelector('.temp')
h8icon = hourcards8.querySelector('.card_icon')
h8card_condition = hourcards8.querySelector('.card_condition')
h8card_wind = hourcards8.querySelector('.card_wind')
h8card_humidity = hourcards8.querySelector('.card_humidity')
h8card_feelsLike = hourcards8.querySelector('.card_feelsLike span')
h8card_rain = hourcards8.querySelector('.card_rain')
h8card_snow = hourcards8.querySelector('.card_snow')
h8card_wind2 = hourcards8.querySelector('.card_wind2')


const hourcards9 = hourcards[8]
h9cardtime = hourcards9.querySelector('.cardtime')
h9temp = hourcards9.querySelector('.temp')
h9icon = hourcards9.querySelector('.card_icon')
h9card_condition = hourcards9.querySelector('.card_condition')
h9card_wind = hourcards9.querySelector('.card_wind')
h9card_humidity = hourcards9.querySelector('.card_humidity')
h9card_feelsLike = hourcards9.querySelector('.card_feelsLike span')
h9card_rain = hourcards9.querySelector('.card_rain')
h9card_snow = hourcards9.querySelector('.card_snow')
h9card_wind2 = hourcards9.querySelector('.card_wind2')

const hourcards10 = hourcards[9]
h10cardtime = hourcards10.querySelector('.cardtime')
h10temp = hourcards10.querySelector('.temp')
h10icon = hourcards10.querySelector('.card_icon')
h10card_condition = hourcards10.querySelector('.card_condition')
h10card_wind = hourcards10.querySelector('.card_wind')
h10card_humidity = hourcards10.querySelector('.card_humidity')
h10card_feelsLike = hourcards10.querySelector('.card_feelsLike span')
h10card_rain = hourcards10.querySelector('.card_rain')
h10card_snow = hourcards10.querySelector('.card_snow')
h10card_wind2 = hourcards10.querySelector('.card_wind_details .card_wind2')




const maxwind = document.querySelector('.maxwind span')
const avgwind = document.querySelector('.avgwind span')
const minwind = document.querySelector('.minwind span')
const moonrise = document.querySelector('.moonrise span')
const moonset = document.querySelector('.moonset span')
const sunrise = document.querySelector('.sunrise span')
const sunset = document.querySelector('.sunset span')
const co = document.querySelector('.co')
const no2 = document.querySelector('.no2')
const o3 = document.querySelector('.o3')
const so2 = document.querySelector('.so2')
const pom2_5 = document.querySelector('.pom2_5')
const pm10 = document.querySelector('.pm10')
const finalreview = document.querySelector('.finalreview')
const todays_lower = document.querySelector('.todays_lower')


function locatedata(authors){
    const date = new Date()
    var no_day = date.getDay()
    var timeformat = ''
    const time = authors.location.localtime
    for (let i=time.length-1 ; i>time.length-6 ; i--){
        timeformat = time[i]+timeformat
    }


    // for auto change time day or night==============================================================


    if(authors.current.is_day == 1){
        if(Day.classList.contains('fa-moon')){
            Day.classList.remove('fa-moon')
            Day.classList.add('fa-sun')
        }
        fornight.classList.add('deactivetime')
        forday.classList.remove('deactivetime')
        astro_night.classList.add('off')
        astro_day.classList.remove('off')
    }
    else if (authors.current.is_day == 0){
            if(Day.classList.contains('fa-sun')){
                Day.classList.remove('fa-sun')
                Day.classList.add('fa-moon')
            }
            fornight.classList.remove('deactivetime')
            forday.classList.add('deactivetime')
            astro_day.classList.add('off')
            astro_night.classList.remove('off')
    }


    date_time1.textContent = dayname[no_day-1] + ' ,'
    date_time2.textContent = timeformat
    service_temp1.textContent = authors.current.temp_c;
    service_temp1tail.textContent = '°C';
    condition_text.textContent =  authors.current.condition.text
    service_condition_icon.style.backgroundImage = `url('${authors.current.condition.icon}')`
    service_icon.style.backgroundImage = `url('${authors.current.condition.icon}')`
    service_uv.textContent = authors.current.uv.toFixed(0)
    service_pressure.textContent = authors.current.pressure_in.toFixed(0)
    service_gust1.textContent = authors.current.gust_mph
    chance_of_rain.textContent = authors.forecast.forecastday[0].day.daily_chance_of_rain + '%'
    chance_of_snow.textContent = authors.forecast.forecastday[0].day.daily_chance_of_snow + '%'
    var code = authors.current.condition.code
    if(code == 1000){
        Forweather_img.style.backgroundImage ="url('./images/sunny.jpg')";
    }
    else if(code == 1030){
        Forweather_img.style.backgroundImage = "url('./images/mist.jpg')";
    }
    else if(code == 1003 || code == 1006 || code == 1087 ){
        Forweather_img.style.backgroundImage = "url('./images/cloudy.jpg')";
    }
    else if(code == 1009 || code == 1273){
        Forweather_img.style.backgroundImage = "url('./images/overcast.jpg')";
    }
    else if(code == 1063 || code == 1180 || code == 1183 || code == 1186 || code == 1189 || code == 1192 || code == 1195 || code == 1198 || code == 1201 || code == 1240 || code == 1243 || code == 1246 || code == 1276){
        Forweather_img.style.backgroundImage = "url('./images/rain.jpg')";
    }
    else if(code == 1147){
        Forweather_img.style.backgroundImage = "url('./images/fog.jpg')";
    }
    else{
        Forweather_img.style.backgroundImage = "url('./images/snowFall.jpg')";
    }

    // for day ===========================================================================================================

    h1cardtime.textContent = '6' + ':' +'00' + ' AM'
    h1temp.textContent = authors.forecast.forecastday[0].hour[6].temp_c.toFixed(0) + '°C'
    h1icon.style.backgroundImage = `url('${authors.forecast.forecastday[0].hour[6].condition.icon }')`
    h1card_condition.textContent = authors.forecast.forecastday[0].hour[6].condition.text 
    h1card_wind.textContent = authors.forecast.forecastday[0].hour[6].wind_kph + 'Km/h'
    h1card_humidity.textContent = authors.forecast.forecastday[0].hour[6].humidity + '%'
    h1card_feelsLike.textContent = authors.forecast.forecastday[0].hour[6].feelslike_c.toFixed(0) +'°C'
    h1card_rain.textContent = authors.forecast.forecastday[0].hour[6].chance_of_rain + '%'
    h1card_snow.textContent = authors.forecast.forecastday[0].hour[6].chance_of_snow + '%'
    h1card_wind2.textcontent = qualityie(authors.forecast.forecastday[0].hour[6].air_quality)

    h2cardtime.textContent = '9' + ':' +'00' + ' AM'
    h2temp.textContent = authors.forecast.forecastday[0].hour[9].temp_c.toFixed(0) + '°C'
    h2icon.style.backgroundImage = `url('${authors.forecast.forecastday[0].hour[9].condition.icon }')`
    h2card_condition.textContent = authors.forecast.forecastday[0].hour[9].condition.text
    h2card_wind.textContent = authors.forecast.forecastday[0].hour[9].wind_kph + 'Km/h'
    h2card_humidity.textContent = authors.forecast.forecastday[0].hour[9].humidity + '%'
    h2card_feelsLike.textContent = authors.forecast.forecastday[0].hour[9].feelslike_c.toFixed(0) +'°C'
    h2card_rain.textContent = authors.forecast.forecastday[0].hour[9].chance_of_rain + '%'
    h2card_snow.textContent = authors.forecast.forecastday[0].hour[9].chance_of_snow + '%'
    h2card_wind2.textcontent = qualityie(authors.forecast.forecastday[0].hour[9].air_quality)
    
    h3cardtime.textContent = '11' + ':' +'00' + ' AM'
    h3temp.textContent = authors.forecast.forecastday[0].hour[11].temp_c.toFixed(0) + '°C'
    h3icon.style.backgroundImage = `url('${authors.forecast.forecastday[0].hour[11].condition.icon }')`
    h3card_condition.textContent = authors.forecast.forecastday[0].hour[11].condition.text
    h3card_wind.textContent = authors.forecast.forecastday[0].hour[11].wind_kph + 'Km/h'
    h3card_humidity.textContent = authors.forecast.forecastday[0].hour[11].humidity + '%'
    h3card_feelsLike.textContent = authors.forecast.forecastday[0].hour[11].feelslike_c.toFixed(0) +'°C'
    h3card_rain.textContent = authors.forecast.forecastday[0].hour[11].chance_of_rain + '%'
    h3card_snow.textContent = authors.forecast.forecastday[0].hour[11].chance_of_snow + '%'
    h3card_wind2.textcontent = qualityie(authors.forecast.forecastday[0].hour[11].air_quality)
    
    h4cardtime.textContent = '1' + ':' +'00' + ' PM'
    h4temp.textContent = authors.forecast.forecastday[0].hour[13].temp_c.toFixed(0) + '°C'
    h4icon.style.backgroundImage = `url('${authors.forecast.forecastday[0].hour[13].condition.icon }')`
    h4card_condition.textContent = authors.forecast.forecastday[0].hour[13].condition.text 
    h4card_wind.textContent = authors.forecast.forecastday[0].hour[13].wind_kph + 'Km/h'
    h4card_humidity.textContent = authors.forecast.forecastday[0].hour[13].humidity + '%'
    h4card_feelsLike.textContent = authors.forecast.forecastday[0].hour[13].feelslike_c.toFixed(0) +'°C'
    h4card_rain.textContent = authors.forecast.forecastday[0].hour[13].chance_of_rain + '%'
    h4card_snow.textContent = authors.forecast.forecastday[0].hour[13].chance_of_snow + '%'
    h4card_wind2.textcontent = qualityie(authors.forecast.forecastday[0].hour[13].air_quality)

    h5cardtime.textContent = '3' + ':' +'00' + ' PM'
    h5temp.textContent = authors.forecast.forecastday[0].hour[15].temp_c.toFixed(0) + '°C'
    h5icon.style.backgroundImage = `url('${authors.forecast.forecastday[0].hour[15].condition.icon }')`
    h5card_condition.textContent = authors.forecast.forecastday[0].hour[15].condition.text
    h5card_wind.textContent = authors.forecast.forecastday[0].hour[15].wind_kph + 'Km/h'
    h5card_humidity.textContent = authors.forecast.forecastday[0].hour[15].humidity + '%'
    h5card_feelsLike.textContent = authors.forecast.forecastday[0].hour[15].feelslike_c.toFixed(0) +'°C'
    h5card_rain.textContent = authors.forecast.forecastday[0].hour[15].chance_of_rain + '%'
    h5card_snow.textContent = authors.forecast.forecastday[0].hour[15].chance_of_snow + '%'
    h5card_wind2.textcontent = qualityie(authors.forecast.forecastday[0].hour[15].air_quality)
    
    //for night ==========================================================================================


    h6cardtime.textContent = '7' + ':' +'00' + ' PM'
    h6temp.textContent = authors.forecast.forecastday[0].hour[19].temp_c.toFixed(0) + '°C'
    h6icon.style.backgroundImage = `url('${authors.forecast.forecastday[0].hour[19].condition.icon }')`
    h6card_condition.textContent = authors.forecast.forecastday[0].hour[19].condition.text
    h6card_wind.textContent = authors.forecast.forecastday[0].hour[19].wind_kph + 'Km/h'
    h6card_humidity.textContent = authors.forecast.forecastday[0].hour[19].humidity + '%'
    h6card_feelsLike.textContent = authors.forecast.forecastday[0].hour[19].feelslike_c.toFixed(0) +'°C'
    h6card_rain.textContent = authors.forecast.forecastday[0].hour[19].chance_of_rain + '%'
    h6card_snow.textContent = authors.forecast.forecastday[0].hour[19].chance_of_snow + '%'
    h6card_wind2.textcontent = qualityie(authors.forecast.forecastday[0].hour[19].air_quality)

    h7cardtime.textContent = '9' + ':' +'00' + ' PM'
    h7temp.textContent = authors.forecast.forecastday[0].hour[21].temp_c.toFixed(0) + '°C'
    h7icon.style.backgroundImage = `url('${authors.forecast.forecastday[0].hour[21].condition.icon }')`
    h7card_condition.textContent = authors.forecast.forecastday[0].hour[21].condition.text
    h7card_wind.textContent = authors.forecast.forecastday[0].hour[21].wind_kph + 'Km/h'
    h7card_humidity.textContent = authors.forecast.forecastday[0].hour[21].humidity + '%'
    h7card_feelsLike.textContent = authors.forecast.forecastday[0].hour[21].feelslike_c.toFixed(0) +'°C'
    h7card_rain.textContent = authors.forecast.forecastday[0].hour[21].chance_of_rain + '%'
    h7card_snow.textContent = authors.forecast.forecastday[0].hour[21].chance_of_snow + '%'
    h7card_wind2.textcontent = qualityie(authors.forecast.forecastday[0].hour[21].air_quality)

    h8cardtime.textContent = '11' + ':' +'00' + ' PM'
    h8temp.textContent = authors.forecast.forecastday[0].hour[23].temp_c.toFixed(0) + '°C'
    h8icon.style.backgroundImage = `url('${authors.forecast.forecastday[0].hour[23].condition.icon }')`
    h8card_condition.textContent = authors.forecast.forecastday[0].hour[23].condition.text
    h8card_wind.textContent = authors.forecast.forecastday[0].hour[23].wind_kph + 'Km/h'
    h8card_humidity.textContent = authors.forecast.forecastday[0].hour[23].humidity + '%'
    h8card_feelsLike.textContent = authors.forecast.forecastday[0].hour[23].feelslike_c.toFixed(0) +'°C'
    h8card_rain.textContent = authors.forecast.forecastday[0].hour[23].chance_of_rain + '%'
    h8card_snow.textContent = authors.forecast.forecastday[0].hour[23].chance_of_snow + '%'
    h8card_wind2.textcontent = qualityie(authors.forecast.forecastday[0].hour[23].air_quality)

    h9cardtime.textContent = '1' + ':' +'00' + ' AM'
    h9temp.textContent = authors.forecast.forecastday[0].hour[1].temp_c.toFixed(0) + '°C'
    h9icon.style.backgroundImage = `url('${authors.forecast.forecastday[0].hour[1].condition.icon }')`
    h9card_condition.textContent = authors.forecast.forecastday[0].hour[1].condition.text
    h9card_wind.textContent = authors.forecast.forecastday[0].hour[1].wind_kph + 'Km/h'
    h9card_humidity.textContent = authors.forecast.forecastday[0].hour[1].humidity + '%'
    h9card_feelsLike.textContent = authors.forecast.forecastday[0].hour[1].feelslike_c.toFixed(0) +'°C'
    h9card_rain.textContent = authors.forecast.forecastday[0].hour[1].chance_of_rain + '%'
    h9card_snow.textContent = authors.forecast.forecastday[0].hour[1].chance_of_snow + '%'
    h9card_wind2.textcontent = qualityie(authors.forecast.forecastday[0].hour[1].air_quality)

    h10cardtime.textContent = '3' + ':' +'00' + ' AM'
    h10temp.textContent = authors.forecast.forecastday[0].hour[3].temp_c.toFixed(0) + '°C'
    h10icon.style.backgroundImage = `url('${authors.forecast.forecastday[0].hour[3].condition.icon }')`
    h10card_condition.textContent = authors.forecast.forecastday[0].hour[3].condition.text
    h10card_wind.textContent = authors.forecast.forecastday[0].hour[3].wind_kph + 'Km/h'
    h10card_humidity.textContent = authors.forecast.forecastday[0].hour[3].humidity + '%'
    h10card_feelsLike.textContent = authors.forecast.forecastday[0].hour[3].feelslike_c.toFixed(0) +'°C'
    h10card_rain.textContent = authors.forecast.forecastday[0].hour[3].chance_of_rain + '%'
    h10card_snow.textContent = authors.forecast.forecastday[0].hour[3].chance_of_snow + '%'
    h10card_wind2.textcontent = qualityie(authors.forecast.forecastday[0].hour[3].air_quality)
    
    
    // console.log(h10card_wind2.textcontent)



    max.textContent = authors.forecast.forecastday[0].day.maxtemp_c + '°C'
    min.textContent = authors.forecast.forecastday[0].day.mintemp_c + '°C'
    avg.textContent = authors.forecast.forecastday[0].day.avgtemp_c + '°C'
    maxwind.textContent = authors.forecast.forecastday[0].day.maxwind_kph.toFixed(1) + 'Km/h'
    avgwind.textContent = authors.current.vis_km.toFixed(1) + 'Km/h'
    minwind.textContent = authors.current.humidity 
    todays_wind_feellike.textContent = authors.current.feelslike_c + '°C'
    moonrise.textContent = authors.forecast.forecastday[0].astro.moonrise
    moonset.textContent = authors.forecast.forecastday[0].astro.moonset
    sunrise.textContent = authors.forecast.forecastday[0].astro.sunrise
    sunset.textContent = authors.forecast.forecastday[0].astro.sunset
    co.textContent = authors.current .air_quality.co.toFixed(1)
    no2.textContent = authors.current .air_quality.no2.toFixed(1)
    o3.textContent = authors.current .air_quality.o3.toFixed(1)
    so2.textContent = authors.current .air_quality.so2.toFixed(1)
    pom2_5.textContent = authors.current .air_quality.pm2_5
    pm10.textContent = authors.current .air_quality.pm10.toFixed(1)
    // todays_lower_icon.style.backgroundImage = `url('${authors.current.condition.icon }')`
    let y = authors.current.air_quality
    finalreview.textContent = qualityie(y)
}

function qualityie(y){
    let i = 0
    for (index in y){
        
        if(i == 7){
            var forfinal = y[index]
        }
        i+=1
    }
    if(forfinal == 1){
        return 'Good'
    }
    else if(forfinal == 2){
        return 'Moderate'
    }
    else if(forfinal == 3){
        return 'Unhealthy for sensitive group'
    }
    else if(forfinal == 4){
        return 'Unhealthy'
    }
    else if(forfinal == 5){
        return 'Very Unhealthy'
    }
    else if(forfinal == 6){
        return 'Hazardous'
    }
}
//updating daycards ======================================================================================================

const daycards = document.querySelectorAll('.daycards')
const eachday = document.querySelectorAll('.eachday')



for(let i = 0 ; i<daycards.length ; i++){
    daycards[i].addEventListener('click' , () => {
        for(let j = 0 ; j<daycards.length ; j++){
            daycards[j].classList.remove('activeday')
            eachday[j].classList.add('activeach')
        }
        daycards[i].classList.add('activeday')
        eachday[i].classList.remove('activeach')
    })
}


//all declaration ==================================================================================
const daylen = 0
const dcarddate = document.querySelectorAll('.dcarddate')
const dcardsicon = document.querySelectorAll('.dcardsicon')
const dcardmain = document.querySelectorAll('.dcardmain')

const eachour = document.querySelectorAll('.eachour')
const etemp = document.querySelectorAll('.etemp')
const etime = document.querySelectorAll('.etime')
const eicon = document.querySelectorAll('.eicon')
const emax = document.querySelectorAll('.emax')
const emin = document.querySelectorAll('.emin')
const erealfeel = document.querySelectorAll('.erealfeel span')
const edescription = document.querySelectorAll('.edescription')



//swtching between dau and night ======================================================================

Day.addEventListener('click',() =>{
    if(Day.classList.contains('fa-moon')){
        service_icon.style.backgroundImage = `url('https://cdn.weatherapi.com/weather/64x64/night/113.png')`
        service_condition_icon.style.backgroundImage = `url('https://cdn.weatherapi.com/weather/64x64/night/113.png')`
        todays_lower.style.backgroundImage = `url('https://cdn.weatherapi.com/weather/64x64/night/113.png')`
        for(let i = 0 ; i<dcardsicon.length ; i++){
            dcardsicon[i].style.backgroundImage = `url('https://cdn.weatherapi.com/weather/64x64/night/113.png')`;
        }
        for(let i = 0 ; i<eicon.length ; i++){
            eicon[i].style.backgroundImage = `url('https://cdn.weatherapi.com/weather/64x64/night/113.png')`;
        }
    }
    else if(Day.classList.contains('fa-sun')){
        service_icon.style.backgroundImage = `url('https://cdn.weatherapi.com/weather/64x64/day/113.png')`
        service_condition_icon.style.backgroundImage = `url('https://cdn.weatherapi.com/weather/64x64/day/113.png')`
        todays_lower.style.backgroundImage = `url('https://cdn.weatherapi.com/weather/64x64/day/113.png')`
        for(let i=0 ; i<dcardsicon.length ; i++){
            dcardsicon[i].style.backgroundImage = `url('https://cdn.weatherapi.com/weather/64x64/day/113.png')`
        }
        for(let i=0 ; i<eicon.length ; i++){
            eicon[i].style.backgroundImage = `url('https://cdn.weatherapi.com/weather/64x64/day/113.png')`
        }
    }
})


// for palcing week data ======================================================================================================




function locateweek(authors){
    
    var d = new Date()
    var td = d.getDate()
    drray = []
    var remp = ''
    
    var dcardmaincount = []
    for(let i =0 ; i<authors.list.length ; i++){
          var y = authors.list[i].dt_txt
          var y2 = authors.list[i].main.temp   
          var y3 =  authors.list[i].weather[0].description      
          for(let u =0; u<10 ; u++){
            remp = remp + y[u]           
          }
          
          if(!drray.includes(remp)){
            drray.push(remp)
            dcardcount.push((y2-275).toFixed(0))
            dcardmaincount.push(y3)
            storeI.push(i)
          }         
          remp = ''
          
    }

    for(let i = 0 ; i <dcarddate.length ; i++){
        dcarddate[i].textContent = drray[i+1]
        dcardstemp[i].textContent = dcardcount[i+1] + '°C'
        dcardmain[i].textContent = dcardmaincount[i+1]
        var qicon = authors.list[storeI[i+1]].weather[0].icon
        dcardsicon[i].style.backgroundImage = `url('https://openweathermap.org/img/wn/${qicon}.png')`;
    }
    for(let i = 1 ; i<storeI.length; i++ ){
         let ftemp = storeI[i]
         for(let ht = 0 ;ht<4 ; ht++ ){
            let foreachth = authors.list[ftemp+ht+1]
            let againtime = foreachth.dt_txt
            let finaltime = ''
            let eforcon = foreachth.weather[0].icon
            for(let f=11 ; f<16 ; f++){
                finaltime = finaltime + againtime[f]
            }
            eachday[i-1].children[ht].children[0].children[0].textContent = (foreachth.main.temp -273).toFixed(0) + '°C'
            eachday[i-1].children[ht].children[0].children[1].textContent = finaltime
            eachday[i-1].children[ht].children[1].style.backgroundImage = `url('https://openweathermap.org/img/wn/${eforcon}.png')`
            eachday[i-1].children[ht].children[2].children[0].children[0].textContent = (foreachth.main.temp_max  -273).toFixed(0) + '°C'
            eachday[i-1].children[ht].children[2].children[1].children[0].textContent = (foreachth.main.temp_min  -273).toFixed(0) + '°C'
            eachday[i-1].children[ht].children[3].children[0].textContent = (foreachth.main.feels_like  -273).toFixed(0) + '°C'
            eachday[i-1].children[ht].children[4].textContent = authors.list[1].weather[0].description



         } 
    }

}
// js media-query ===================================================================
const mediaQuery = window.matchMedia('(max-width : 460px)');
const menu = document.querySelector('.menu');
const left_details = document.querySelector('.left_details');
const right_details = document.querySelector('.right_details');


if(mediaQuery.matches){
    menu.addEventListener('click', () => {
        left_details.style.transform = 'translateX(0%)';
        right_details.style.cursor = 'pointer' ; 
        right_details.style.filter = 'blur(5px)';
    
    })
    icondel.addEventListener('click' , () => {
        left_details.style.transform = 'translateX(-100%)';
        right_details.style.cursor = 'default' ; 
        right_details.style.filter = 'blur(0px)';
    })
}
