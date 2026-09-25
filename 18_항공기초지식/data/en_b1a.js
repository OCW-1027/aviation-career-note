/* 航空の基礎知識 1-1 — English version */
(function(A){function set(no,en){if(A[no])A[no].en=en}
set("1-1",{title:"Why Planes Fly: Four Forces and How a Wing Works",hl:"how planes fly",subtitle:"Lift, weight, thrust and drag in moving diagrams — and how they connect to ground work: weight, heat and balance",
lead:["An aircraft weighing hundreds of tonnes stays up because its wings make clever use of the air. You do not need equations: understand four forces and the airflow around a wing and you have the essentials.","This lesson uses moving diagrams to show the four forces, how a wing creates lift, how flaps help an aircraft fly slowly, and the take-off sequence. It finishes by linking flight to ground work such as loadsheet weights and hot summer days."],
sections:[
{h:"The four forces",blocks:[{t:"fig",id:"forces_anim",cap:"Moving diagram: arrow length suggests the size of each force. See the table for A to D (nose to the left)."},
{t:"table",cols:["Mark","Force","Where it comes from"],rows:[
["A","Lift","The upward force the wings get from the air"],
["B","Weight","Aircraft, fuel, passengers, bags and cargo"],
["C","Thrust","The forward force from engines pushing air backwards"],
["D","Drag","Air resistance holding the aircraft back"]]},
{t:"point",x:"In straight, level flight lift balances weight and thrust balances drag. More lift than weight and the aircraft climbs; more thrust than drag and it speeds up."}]},
{h:"How a wing makes lift",blocks:[{t:"fig",id:"wing_airflow",cap:"Moving diagram: a wing section seen from the side. Dotted lines show the airflow, faster above. See the table for A to C."},
{t:"table",cols:["Mark","What happens"],rows:[
["A","Air over the top flows faster and its pressure drops (−)"],
["B","Air underneath flows more slowly and its pressure rises (+)"],
["C","The pressure difference, plus the reaction from pushing air downwards, lifts the wing: that is lift"]]},
{t:"rows",items:[
{name:"An everyday example",x:"Tilt a sheet of card slightly upwards in front of a fan and it lifts. A wing meets the air at a slight upward angle in the same way: the angle of attack."},
{name:"Getting more lift",x:"Fly faster, use a bigger wing, or increase the angle of attack slightly. Too much angle and the airflow breaks away and lift is lost: a stall."}]}]},
{h:"Flying slowly: flaps and slats",blocks:[{t:"fig",id:"flaps_anim",cap:"Moving diagram: flaps (A) and slats (B) extend, making the wing bigger and more curved, and lift (C) increases."},
{t:"rows",items:[
{name:"Why they are needed",x:"Take-off and landing speeds are low, so the wing is reshaped to give enough lift at low speed."},
{name:"When they are used",x:"Only for take-off and landing; they are retracted in the cruise."},
{name:"Care on the ground",x:"Flaps left down on a parked aircraft reduce the clearance under the wing; take care moving vehicles (0-1)."}]}]},
{h:"The take-off sequence",blocks:[{t:"ladder",rise:10,steps:[{name:"Take-off roll",sub:"Engine thrust accelerates the aircraft"},{name:"V1",sub:"Decision speed: stop or continue"},{name:"VR",sub:"Rotation: the nose starts to lift"},{name:"V2",sub:"Safe climb speed"},{name:"Climb",sub:"Gear up, flaps retracted"}]},
{t:"note",x:"* Speeds change with aircraft, weight and weather. A mid-size airliner typically lifts off at roughly 250–300 km/h. ★"}]},
{h:"Units of height and speed",blocks:[{t:"table",cols:["Quantity","Unit","Rule of thumb"],rows:[
["Altitude","Feet (ft)","1 ft ≈ 0.3 m; a cruise level of 35,000 ft is about 10,700 m"],
["Speed","Knots (kt)","1 kt ≈ 1.85 km/h"],
["Distance","Nautical miles (NM)","1 NM = 1.852 km"],
["Cruise speed","Mach number","Jet airliners cruise at about Mach 0.78–0.85 (around 830–900 km/h)"],
["Cabin pressure","Cabin altitude","Even at cruise, the cabin is kept at pressure similar to 1,800–2,400 m (6,000–8,000 ft)"]]},
{t:"point",x:"The cabin air is at lower pressure and drier than on the ground. That helps when passengers ask about ear pain, feeling unwell or alcohol affecting them more."}]},
{h:"Connecting it to ground work",blocks:[{t:"table",cols:["On the ground","Link to how planes fly"],rows:[
["Weight (loadsheet)","Heavier aircraft need more lift, a longer take-off run and higher speed (Course 1, lesson 3-7)"],
["Hot days and high airports","Thinner air reduces lift and engine power; payload may be restricted"],
["Headwinds and tailwinds","A headwind shortens the take-off run; a tailwind lengthens it"],
["Centre of gravity","Poor balance makes pitch control harder (Course 1, lesson 3-8)"]]},
{t:"point",x:"When operations control warns that heat may restrict the payload today, this is the physics behind it. Knowing why makes adjusting bags and cargo calmer."}]}],
voice:"[Interview to be added] Adjusting bags and cargo under a summer payload restriction.",
terms:[["Lift","揚力","양력"],["Drag","抗力","항력"],["Thrust","推力","추력"],["Angle of Attack","迎え角","받음각"],["Stall","失速","실속"],["Takeoff Decision Speed (V1)","離陸決定速度","이륙 결심 속도"]],
quiz:[{q:"What is true of the air over the top of the wing?",opts:["It slows and its pressure rises","It speeds up and its pressure drops","It does not move","It is the same as underneath"],a:1,exp:"Lower pressure above than below creates lift."},
{q:"When are flaps extended?",opts:["In the cruise","For take-off and landing","Only when parked","Always"],a:1,exp:"To get enough lift at low speed."},
{q:"Why can hot weather restrict the payload?",opts:["Thinner air reduces lift and engine power","More fuel is needed","More passengers board","It does not"],a:0,exp:"Thin air gives less lift at the same speed."}],
next:"1-3 Reading the airport forecast (TAF)"});
})(window.ARTS);
