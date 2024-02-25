//カレンダー生成
function make_calendar(year,month) {

let last_date = new Date(year,month,0).getDate();
let first_day = new Date(year,month,1);
let day = ["sun","mon","tue","wed","thu","fri","sat"]

let cal = document.getElementById("calendar");
let disp = document.getElementById("month")

disp.textContent = year +"年 " + (month+1) +"月"

while (cal.firstChild) {
    cal.removeChild(cal.firstChild);
}

for (let i = -first_day.getDay(); i < last_date; i) {
    let cal_row = document.createElement("tr");
    for (let w = 0; w < 7; w++){
        i++
        let cal_cell = document.createElement("td");
        let cell = document.createElement("div");
        let date_txt = document.createElement("p");
        let schedule = document.createElement("div");
        let date = new Date(year,month,i)
        let formattedDate = `${date.getFullYear().toString().padStart(4, '0')}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

        cell.setAttribute("class", "calendar_cell")
        date_txt.setAttribute("class", day[date.getDay()]);
        date_txt.textContent = date.getDate();
        if (i <= 0) {
            date_txt.setAttribute("class", "pre")
        }
        if(i > new Date(year,month+1,0).getDate()) {
            date_txt.setAttribute("class", "pre")
        }
        if (date.toDateString() == today.toDateString()) {
            cal_cell.setAttribute("class", "today")
            date_txt.setAttribute("class", "today_text")
        }
        schedule.setAttribute("id", formattedDate)

        cell.append(date_txt);
        cell.append(schedule);
        cal_cell.append(cell);
        cal_row.append(cal_cell)
    }
    cal.append(cal_row)
}
schedule(0,year,month+1)
schedule(1,year,month+1)
schedule(2,year,month+1)
schedule(3,year,month+1)
}

function schedule(cal,year,month){
    id = ["en.japanese%23holiday%40group.v.calendar.google.com","yamada1992pc@gmail.com","717bfd6b09aa62c614b31658231949a224cdd0c089ee9f68a0ef3affb85c2ecc@group.calendar.google.com","48c35c72b03cd256cf7eae24c63bcd273386e28d7bd3ec71fa4d78048d3bceb2@group.calendar.google.com"]
    color = ["#33b679","#039be5","#d81b60","#f6bf26"]
    fetch("https://script.google.com/macros/s/AKfycbwB5for-qhAs9a15ohsdBOHF0zZMXsj4yiQITlPElEKSQyE1LPCTLHDIoSFovKW0YgL/exec?id="+id[cal]+"&year="+year+"&month="+month)
  .then(response => response.json())
  .then(result => {
      for (let date in result) {
          if (date == "color") {
            continue
          }
          cell = document.getElementById(date)
          for (let i = 0; i < Object.keys(result[date]).length; i++) {
            event_disp = document.createElement("p")
            event_disp.setAttribute("class", "event")
            event_disp.style.backgroundColor = result["color"]

            event_disp.textContent = result[date][i]
            cell.append(event_disp)
        }
    }
  })
}

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
make_calendar(year,month)

function change(inc){
    month += inc
    if (month < 0) {
        month = 11
        year -= 1
    }
    else if(month >= 12){
        month = 0
        year += 1
    }
    make_calendar(year,month)
}
function back() {
    let today = new Date();
    year = today.getFullYear();
    month = today.getMonth();
    make_calendar(year,month)
}

function test() {
    const API_key = "a6afc9dfe0c13cb590ea54113b78f711f943381e9120c499875757f9b09f756e0e45f808727d5d8e3dc51fc4714e10cc";
    const device_id = "01-202308171543-63425124";
    const headers = {
        "Authorization": API_key,
        "Content-Type": "application/json; charset=utf8",
    };
    
    const data = '{"command":"turnOn","parameter":"default","commandType":"command"}';
    
    fetch(`https://api.switch-bot.com/v1.0/devices/${device_id}/commands`, {
        method: 'POST',
        mode: 'no-cors', // CORSを無効にする
        headers: headers,
        body: data
    })
    .then(response => {
        console.log('Request sent successfully, but response is opaque due to CORS policy.');
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });    
}

function ifttt(id){
    fetch("https://maker.ifttt.com/trigger/"+id+"/with/key/fZc7s42e9OD6NWv7MjjUCcqCM9txQsIbl_1ZnSUIoYg")
}
function macrodroid(id) {
    fetch("https://trigger.macrodroid.com/08bfc554-f05e-47ae-befb-65a745a14b27/test?control="+id)
}

function clock() {
    let clock = document.getElementById("clock")

    let now = new Date()
    let hour = now.getHours()
    let minute = now.getMinutes()
    let second = now.getSeconds()

    clock.textContent = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}

setInterval(clock,100)