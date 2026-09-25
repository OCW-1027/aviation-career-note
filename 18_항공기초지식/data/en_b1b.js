/* 航空の基礎知識 1-2 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("1-2",{title:"Time Zones, UTC and the Date Line: Reading Timetables and Flight Times Correctly",hl:"time zones",subtitle:"Aviation runs on UTC; passengers see local time. How not to trip over daylight saving and the date line",
lead:["Aviation work moves between two clocks. Operations, messages and weather forecasts all use UTC (Coordinated Universal Time), while passengers’ timetables and boarding passes show each airport’s local time. Daylight saving and the International Date Line make flight times harder still.","This lesson shows time zones and the date line in a moving diagram, then covers the time differences of major cities, daylight-saving rules, reading a timetable and practising flight-time calculations."],
sections:[
{h:"Time zones and the date line",blocks:[{t:"fig",id:"timezones_anim",cap:"Moving diagram: the numbers show the difference from UTC in hours. The dark band is night, moving west. The red dotted line is the date line: the 25th on the left, the 24th on the right. A flight from Tokyo to Los Angeles crosses the line and arrives on the previous day."},
{t:"rows",items:[
{name:"UTC",x:"The worldwide reference time, marked with Z. Used for operations, ATC, messages and TAFs."},
{name:"Local time",x:"UTC plus the offset. Japan and Korea are UTC+9. Used in timetables, boarding passes and airport displays."},
{name:"International Date Line",x:"Roughly the 180° meridian in the Pacific. Crossing eastwards the date goes back one day; westwards it goes forward."}]}]},
{h:"Time differences of major cities (standard time)",blocks:[{t:"table",cols:["City","Offset from UTC","Daylight saving"],rows:[
["Tokyo, Seoul","+9","No"],
["Beijing, Shanghai, Taipei, Hong Kong, Singapore","+8","No"],
["Bangkok, Hanoi, Jakarta","+7","No"],
["Delhi","+5:30","No"],
["Dubai","+4","No"],
["London","0","Yes (+1 in summer)"],
["Paris, Frankfurt","+1","Yes (+2 in summer)"],
["New York","−5","Yes (−4 in summer)"],
["Los Angeles","−8","Yes (−7 in summer)"],
["Honolulu","−10","No"],
["Sydney","+10","Yes (+11 in the southern summer)"]]},
{t:"note",x:"* Offsets and daylight saving can change by government decision. Check current information for operational use. ★"}]},
{h:"Daylight-saving rules",blocks:[{t:"table",cols:["Region","Starts","Ends"],rows:[
["Europe","Last Sunday of March","Last Sunday of October"],
["United States and Canada","Second Sunday of March","First Sunday of November"],
["South-eastern Australia and others (southern hemisphere)","First Sunday of October","First Sunday of April"],
["Japan, Korea, China and others","Not observed","—"]]},
{t:"point",warn:true,x:"Europe and North America change on different dates, so for a few weeks in March and October–November the difference from Japan and Korea is an hour off the usual. Take care with connection and arrival information. IATA’s summer and winter seasons also change on the last Sundays of March and October, in line with Europe."}]},
{h:"Reading a timetable",blocks:[{t:"table",cols:["Shown as","Meaning"],rows:[
["17:00 → 10:30","Departure and arrival each in that airport’s local time (24-hour clock)"],
["+1","Arrives the day after departure (e.g. 23:30 → 06:10+1)"],
["−1","Arrives the day before departure (on eastbound flights across the date line)"],
["Flight time","The duration shown in the timetable, not the difference between local times"]]}]},
{h:"Practising flight-time calculations",blocks:[{t:"table",cols:["Example","Working","Answer"],rows:[
["Seoul (Incheon) dep 10:00 → Tokyo (Narita) arr 12:20","Both UTC+9, so subtract directly","2 h 20 min"],
["Tokyo (Narita) dep 17:00 → Los Angeles arr 10:30 same day (summer)","17:00 JST = 08:00 UTC; 10:30 PDT (UTC−7) = 17:30 UTC","9 h 30 min — crossing the date line, it lands the same morning"],
["Tokyo (Haneda) dep 22:00 → London arr 05:30+1 (winter)","22:00 JST = 13:00 UTC; 05:30 GMT (UTC+0) = 05:30 UTC next day","16 h 30 min"]]},
{t:"point",x:"The trick is to convert both times to UTC first, then subtract. Subtracting local times directly is wrong by the time difference."}]},
{h:"Care on the ground",blocks:[{t:"check",items:[
{name:"Keep UTC and local time apart",x:"Movement messages (MVT) and forecasts are in UTC; passenger information is in local time. Records should state which."},
{name:"Connections across midnight",x:"Check whether the onward flight is “+1” so dates are not confused."},
{name:"The weeks when daylight saving changes",x:"Local times and connection times on European and American routes shift; check information, notices and bookings in advance."},
{name:"Crew hours",x:"Crew duty limits are managed in UTC or similar; align time references with operations control when deciding on delays."}]}]}],
voice:"[Interview to be added] Taking care with connection information during the daylight-saving changeover.",
terms:[["Coordinated Universal Time (UTC)","協定世界時","협정 세계시"],["Local Time (LT)","現地時刻","현지 시각"],["Time Difference","時差","시차"],["Daylight Saving Time (DST)","サマータイム","서머타임"],["International Date Line","日付変更線","날짜 변경선"],["Flight Time / Block Time","飛行時間","비행 시간"]],
quiz:[{q:"Narita dep 17:00 (UTC+9) → Los Angeles arr 10:30 (UTC−7), same day. Flight time?",opts:["6 h 30 min","9 h 30 min","17 h 30 min","14 h"],a:1,exp:"08:00 UTC to 17:30 UTC is 9 h 30 min."},
{q:"What does “+1” mean in a timetable?",opts:["One hour late","Arrives the next day","First flight","Offset from UTC"],a:1,exp:"It arrives the day after departure."},
{q:"When does European daylight saving end?",opts:["Last Sunday of October","First Sunday of November","30 September","It does not"],a:0,exp:"The US ends on the first Sunday of November: a different date."}],
next:"1-3 Reading the airport forecast (TAF)"});
})(window.ARTS);
