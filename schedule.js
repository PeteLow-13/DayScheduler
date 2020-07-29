function getTodaysDate(){
    return moment().startOf("day")
}
function getKeyFromDate(date){
    return date.format("YYYYMMDD")
}
function getSchedule(date){
    var key = getKeyFromDate(date)
    var value = localStorage.getItem(key)
    if(!value){
        return getDefaultSchedule(date)
    }
    return JSON.parse(value)
}
function getDefaultSchedule(date){
    var schedule = [];
    var currentTime = moment(currentDate).hour(8); 
    for(i = 0; i <= 9; i++){
        var entry = {
            startTime: moment(currentTime),
            endTime: moment(currentTime).add(1,"hour"),
            content: ""
        }
        schedule.push(entry)
        currentTime = currentTime.add(1,"hour")
    }
    return schedule
}
function setSchedule(key, schedule){
    localStorage.setItem(key, JSON.stringify(schedule))
}
function goToNextDate(){
    currentDate.add(1,"day")
    schedule = getSchedule(currentDate)
}
function goToPreviousDate(){
    currentDate.add(-1,"day")
    schedule = getSchedule(currentDate)
}
function renderSchedule(savedSchedule){
    var tBody = $("#schedule")
    tBody.empty()
    var schedule = savedSchedule.slice(0)
    schedule.forEach(function(entry,index,schedule){ tBody.append(getScheduleRow(entry,index,schedule))})
}
function getScheduleRow(entry,index,schedule){
    var row = document.createElement("tr")

    var startTime = document.createElement("td")
    startTime.innerHTML= moment(entry.startTime).format("hA")
    $(startTime).addClass("start-time")
    row.append(startTime)

    var content = document.createElement("td")
    if(moment().isAfter(entry.endTime)){
        $(content).addClass("past")
    } else if(moment().isBefore(entry.startTime)){
        $(content).addClass("future")
    } else{
        $(content).addClass("present")
    }
    var textBox = document.createElement("textarea")
    textBox.setAttribute("id","textarea-"+index)
    $(textBox).addClass("text-display")
    textBox.value = entry.content
    content.append(textBox)
    row.append(content)

    var save = document.createElement("td")
    save.innerHTML = "save"
    $(save).addClass("savebutton")
    $(save).click(function(){
        entry.content = $("#textarea-"+index).val()
        savedSchedule.splice(index,1,entry)
        setSchedule(currentDateKey,savedSchedule)
    })
    row.append(save)
    return row
}

var dateBanner = document.getElementById("current-date")
    dateBanner.textContent = moment().format("dddd, MMMM Do YYYY");



var currentDate = getTodaysDate()
var currentDateKey = getKeyFromDate(currentDate)
var savedSchedule = getSchedule(currentDate)
 renderSchedule(savedSchedule)

