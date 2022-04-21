
const calculateTime = ()=>{ 
    // set the countdown of days
    let COUNTDOWN_DAYS = 15;

    // get the current day to create specific date
    const getCurrentDate = new Date();
    const getCurrentDay = new Date().getDate();

    // min countdown of days
    if(COUNTDOWN_DAYS <= 0){  
        COUNTDOWN_DAYS = 1;
    }
    
    // set the new date
    getCurrentDate.setDate(getCurrentDay + COUNTDOWN_DAYS);
    const getNewlyCreatedDate = getCurrentDate.toDateString().substring(4);

    const endDate = new Date(getNewlyCreatedDate).getTime();
    const now = new Date().getTime();

    const difference = endDate - now;

    const seconds = 1000; // 1000ms / 1s
    const minutes = seconds * 60; // 1sec * 60 => 60sec / 1min
    const hours = minutes * 60 // 60sec * 60 => 3600sec / 1h
    const days = hours * 24; // 3600sec * 24 => 86400sec / 1d

    const timeSeconds = Math.floor((difference % minutes) / seconds);
    const timeMinutes = Math.floor((difference % hours) / minutes);
    const timeHours = Math.floor((difference % days) / hours);
    const timeDays = Math.floor(difference / days);

    return {
        timeEnd: difference,
        seconds: timeSeconds < 10 ? `0${timeSeconds}` : timeSeconds,
        minutes: timeMinutes < 10 ? `0${timeMinutes}` : timeMinutes,
        hours: timeHours < 10 ? `0${timeHours}` : timeHours,
        days: timeDays < 10 ? `0${timeDays}` : timeDays
    }
    
}

// animate card flip
function flipAnimation (flipCardTopContainer, flipCardBottomContainer, staticBottomNo, flipCardTopNo, time){    
    flipCardTopContainer.style.animation = "flipDown 0.6s linear";
    flipCardBottomContainer.style.animation = "flipUp 0.6s linear";
    
    let animationTop = ()=>{
        flipCardTopContainer.style.animation = "";
        flipCardTopContainer.removeEventListener("animationend", animationTop);
        staticBottomNo.innerHTML = time;
    };
    let animationBottom = ()=>{
        flipCardBottomContainer.style.animation = "";
        flipCardBottomContainer.removeEventListener("animationend", animationBottom);
        flipCardTopNo.innerHTML = time;
    };
    flipCardTopContainer.addEventListener("animationend", animationTop);
    flipCardBottomContainer.addEventListener("animationend", animationBottom);
}

// update each part of the countdown 
function updateCountdown(){
    const time = calculateTime();
    
    const staticSecondsNo = document.querySelectorAll('.static-seconds');
    const flipCardSecondsNo = document.querySelectorAll('.flipCard-seconds');

    const staticMinutesNo = document.querySelectorAll('.static-minutes');
    const flipCardMinutesNo = document.querySelectorAll('.flipCard-minutes');

    const staticHoursNo = document.querySelectorAll('.static-hour');
    const flipCardHoursNo = document.querySelectorAll('.flipCard-hour');

    const staticDaysNo = document.querySelectorAll('.static-day');
    const flipCardDaysNo = document.querySelectorAll('.flipCard-day');

    // update secounds display 
    if(Number(time.seconds) >= 0){
        const flipCardTopContainerSec = document.querySelector('#timer-top-seconds');
        const flipCardBottomContainerSec = document.querySelector('#timer-bottom-seconds');

        staticSecondsNo[0].innerHTML = time.seconds;

        flipAnimation(flipCardTopContainerSec, flipCardBottomContainerSec, staticSecondsNo[1], flipCardSecondsNo[0], time.seconds);
        flipCardSecondsNo[1].innerHTML = time.seconds;
    }
    
    // update minutes display
    if(Number(staticMinutesNo[0].textContent) !== Number(time.minutes)){
        const flipCardTopContainerMin = document.querySelector('#timer-top-minutes');
        const flipCardBottomContainerMin = document.querySelector('#timer-bottom-minutes');

        staticMinutesNo[0].innerHTML = time.minutes;

        flipAnimation(flipCardTopContainerMin, flipCardBottomContainerMin, staticMinutesNo[1], flipCardMinutesNo[0], time.minutes);
        flipCardMinutesNo[1].innerHTML = time.minutes;
    }
    
    // update hour display
    if(Number(staticHoursNo[0].textContent) !== Number(time.hours)){
        const flipCardTopContainerHour = document.querySelector('#timer-top-hour');
        const flipCardBottomContainerHour = document.querySelector('#timer-bottom-hour');

        staticHoursNo[0].innerHTML = time.hours;

        flipAnimation(flipCardTopContainerHour, flipCardBottomContainerHour, staticHoursNo[1], flipCardHoursNo[0], time.hours);
        flipCardHoursNo[1].innerHTML = time.hours;
    }

    // update day display
    if(Number(staticDaysNo[0].textContent) !== Number(time.days)){
        const flipCardTopContainerDay = document.querySelector('#timer-top-day');
        const flipCardBottomContainerDay = document.querySelector('#timer-bottom-day');

        staticDaysNo[0].innerHTML = time.days;

        flipAnimation(flipCardTopContainerDay, flipCardBottomContainerDay, staticDaysNo[1], flipCardDaysNo[0], time.days);
        flipCardDaysNo[1].innerHTML = time.days;
    }
}

// main func, update the clock 
const countdown = setInterval(()=>{        
        updateCountdown();
        
        if(calculateTime().timeEnd <= 0){
            clearInterval(countdown);
        }
}, 1000);