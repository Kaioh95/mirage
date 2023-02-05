export function calcPassedTime(time: string | undefined){
    if(!time){
        return '--';
    }
    let timeNow = new Date().valueOf();
    let diff = timeNow - new Date(time).valueOf();

    let years = Math.floor(diff /1000/60/60/24/30.33/12),
    days = Math.floor(diff /1000/60/60/24),
    hours = Math.floor(diff /1000/60/60),
    minutes = Math.floor(diff /1000/60),
    seconds = Math.floor(diff /1000);

    if(seconds<60)
        return seconds + "s"
    else if(minutes<60)
        return minutes + "min"
    else if(hours<24)
        return hours + "h"
    else if(days<365)
        return days + " days"
    else
        return years + " years"
}