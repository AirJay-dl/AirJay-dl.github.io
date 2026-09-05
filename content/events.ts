export type Tournament = {slug:string;name:string;start:string;end:string;venue:string;city:string;country:string;type:'Ranking'|'Invitational'|'Qualifying';source:string;note:string;featured?:boolean};
const official='https://www.wst.tv/fullcalendarwithseedingcut-offs/';
const current='https://www.wst.tv/';
const secondary='https://res.snooker.org/res/index.asp?season=2026&template=2';
const rows: [string,string,string,string,string,string,string,Tournament['type'],string,string,boolean?][] = [
['china-open-qualifiers-2026','China Open qualifiers','2026-06-10','2026-06-14','Mattioli Arena','Leicester','England','Qualifying',official,'Qualifying stage; separate from the main tournament in China.'],
['wuhan-open-qualifiers-2026','Wuhan Open qualifiers','2026-06-15','2026-06-18','Mattioli Arena','Leicester','England','Qualifying',official,'Qualifying stage for the August tournament.'],
['championship-league-2026','Championship League','2026-06-22','2026-07-15','Mattioli Arena','Leicester','England','Ranking',official,'Staged across several groups and playing blocks; this range includes rest days.'],
['shenzhen-open-qualifiers-2026','Shenzhen Open qualifiers','2026-07-19','2026-07-22','Mattioli Arena','Leicester','England','Qualifying',secondary,'Earlier provisional calendars used the name Xi’an Grand Prix for this slot.'],
['british-open-qualifiers-2026','British Open qualifiers','2026-07-23','2026-07-24','Mattioli Arena','Leicester','England','Qualifying',official,'Qualifiers precede the main event in Cheltenham.'],
['english-open-qualifiers-2026','English Open qualifiers','2026-07-25','2026-07-26','Mattioli Arena','Leicester','England','Qualifying',official,'These qualifying dates are distinct from the September main event.'],
['shanghai-masters-2026','Shanghai Masters','2026-07-27','2026-08-02','Luwan Gymnasium','Shanghai','China','Invitational',secondary,'An invitational event; do not confuse it with the German Masters.'],
['china-open-2026','China Open','2026-08-08','2026-08-16','Sports Centre','Taiyuan','China','Ranking',secondary,'Event dates and city are listed in the season calendar.'],
['wuhan-open-2026','Wuhan Open','2026-08-23','2026-08-29','Venue not verified','Wuhan','China','Ranking',official,'Check the organiser for the precise venue and session programme.'],
['british-open-2026','British Open','2026-08-31','2026-09-06','The Centaur','Cheltenham','England','Ranking',current,'The event spans August and September. It therefore appears in both monthly views.',true],
['english-open-2026','English Open','2026-09-07','2026-09-13','Brentwood Centre','Brentwood','England','Ranking','https://everyoneevents.com/whats-on/english-open-2026/','The main event follows the British Open. Check the draw before buying a ticket for a particular player.',true],
['northern-ireland-open-qualifiers-2026','Northern Ireland Open qualifiers','2026-09-13','2026-09-16','Mattioli Arena','Leicester','England','Qualifying',current,'Qualifying takes place in Leicester; the main tournament is in Belfast.'],
['international-championship-qualifiers-2026','International Championship qualifiers','2026-09-17','2026-09-19','Mattioli Arena','Leicester','England','Qualifying',current,'This listing covers qualifying, not the main event in Nanjing.'],
['scottish-open-qualifiers-2026','Scottish Open qualifiers','2026-09-20','2026-09-23','Mattioli Arena','Leicester','England','Qualifying',current,'The qualifying stage is in England; the December main event is in Scotland.'],
['shenzhen-open-2026','Shenzhen Open','2026-09-28','2026-10-04','Venue not verified','Shenzhen','China','Ranking',current,'The current WST listing says Shenzhen Open. Earlier provisional calendars called this slot Xi’an Grand Prix.'],
['northern-ireland-open-2026','Northern Ireland Open','2026-10-18','2026-10-25','Waterfront Hall','Belfast','Northern Ireland','Ranking',official,'Part of the Home Nations series. September qualifiers have a separate listing.'],
['international-championship-2026','International Championship','2026-10-31','2026-11-07','Venue not verified','Nanjing','China','Ranking',official,'Spans October and November. Confirm venue details with WST before planning a visit.'],
['champion-of-champions-2026','Champion of Champions','2026-11-09','2026-11-15','Mattioli Arena','Leicester','England','Invitational',official,'An invitational competition with its own qualification criteria.'],
['german-masters-qualifiers-2026','German Masters qualifiers','2026-11-16','2026-11-19','Robin Park','Wigan','England','Qualifying',secondary,'Qualifying venue is Wigan in the current secondary listing. Recheck the organiser before travel.'],
['uk-championship-qualifiers-2026','UK Championship qualifiers','2026-11-21','2026-11-26','Mattioli Arena','Leicester','England','Qualifying',official,'Separate from the main tournament in York.'],
['uk-championship-2026','UK Championship','2026-11-28','2026-12-06','York Barbican','York','England','Ranking',official,'One of snooker’s three Triple Crown events, spanning November and December.',true],
['shoot-out-2026','Shoot Out','2026-12-09','2026-12-12','Tower Circus','Blackpool','England','Ranking',secondary,'Uses a special timed, single-frame format. Read the event rules before comparing it with conventional tournaments.'],
['scottish-open-2026','Scottish Open','2026-12-14','2026-12-20','Meadowbank Sports Centre','Edinburgh','Scotland','Ranking',official,'The Scottish leg of the Home Nations series.'],
['championship-league-group-1-2026','Championship League · Group 1','2026-12-21','2026-12-22','Mattioli Arena','Leicester','England','Invitational',secondary,'The invitational edition is distinct from the summer ranking event.'],
['championship-league-group-2-2027','Championship League · Group 2','2027-01-02','2027-01-03','Mattioli Arena','Leicester','England','Invitational',secondary,'Group-stage dates; not a knockout championship week.'],
['championship-league-group-3-2027','Championship League · Group 3','2027-01-04','2027-01-05','Mattioli Arena','Leicester','England','Invitational',secondary,'Group-stage dates for the invitational edition.'],
['championship-league-group-4-2027','Championship League · Group 4','2027-01-06','2027-01-07','Mattioli Arena','Leicester','England','Invitational',secondary,'Group-stage dates for the invitational edition.'],
['championship-league-group-5-2027','Championship League · Group 5','2027-01-08','2027-01-09','Mattioli Arena','Leicester','England','Invitational',secondary,'Group-stage dates for the invitational edition.'],
['masters-2027','The Masters','2027-01-10','2027-01-17','Alexandra Palace','London','England','Invitational',official,'A Triple Crown invitational. Its results do not contribute to the main world ranking list.',true],
['championship-league-group-6-2027','Championship League · Group 6','2027-01-18','2027-01-19','Mattioli Arena','Leicester','England','Invitational',secondary,'Group-stage dates for the invitational edition.'],
['championship-league-group-7-2027','Championship League · Group 7','2027-01-20','2027-01-21','Mattioli Arena','Leicester','England','Invitational',secondary,'Group-stage dates for the invitational edition.'],
['championship-league-winners-2027','Championship League · Winners Group','2027-01-22','2027-01-23','Mattioli Arena','Leicester','England','Invitational',secondary,'The closing group of the invitational competition.'],
['german-masters-2027','German Masters','2027-01-25','2027-01-31','Tempodrom','Berlin','Germany','Ranking',official,'The main event is in Berlin; the November qualifying stage is listed separately.'],
['welsh-open-qualifiers-2027','Welsh Open qualifiers','2027-02-02','2027-02-03','Ponds Forge','Sheffield','England','Qualifying',secondary,'Qualifying dates immediately precede the Welsh main event.'],
['world-open-qualifiers-2027','World Open qualifiers','2027-02-04','2027-02-06','Ponds Forge','Sheffield','England','Qualifying',secondary,'English qualifying stage for the March tournament in China.'],
['welsh-open-2027','Welsh Open','2027-02-08','2027-02-14','Venue Cymru','Llandudno','Wales','Ranking',official,'The Welsh leg of the Home Nations series.'],
['world-grand-prix-2027','World Grand Prix','2027-02-16','2027-02-21','Kai Tak Arena','Hong Kong','Hong Kong','Ranking',secondary,'A limited-field ranking event; player eligibility is determined by the relevant season list.'],
['players-championship-2027','Players Championship','2027-03-02','2027-03-07','Telford International Centre','Telford','England','Ranking',official,'A limited-field event based on season performance.'],
['world-open-2027','World Open','2027-03-15','2027-03-21','Yushan Sport Centre','Yushan','China','Ranking',secondary,'Do not confuse this event with the World Championship in Sheffield.'],
['tour-championship-2027','Tour Championship','2027-03-29','2027-04-04','Manchester Central','Manchester','England','Ranking',official,'Spans March and April; the field is selected through season performance.'],
['world-championship-qualifiers-2027','World Championship qualifiers','2027-04-05','2027-04-14','English Institute of Sport','Sheffield','England','Qualifying',official,'Qualifying is held at a different venue from the Crucible main event.'],
['world-championship-2027','World Championship','2027-04-17','2027-05-03','Crucible Theatre','Sheffield','England','Ranking',official,'The season’s concluding Triple Crown event. Dates are provisional and subject to organiser updates.',true]
];
export const events:Tournament[]=rows.map(([slug,name,start,end,venue,city,country,type,source,note,featured])=>({slug,name,start,end,venue,city,country,type,source,note,featured}));
export const months=Array.from({length:12},(_,i)=>{const d=new Date(Date.UTC(2026,5+i,1));return {value:d.toISOString().slice(0,7),label:d.toLocaleDateString('en-GB',{month:'long',year:'numeric',timeZone:'UTC'}),short:d.toLocaleDateString('en-GB',{month:'short',timeZone:'UTC'})}});
export function inMonth(e:Tournament,month:string){return month==='all'||e.start.slice(0,7)<=month&&e.end.slice(0,7)>=month;}
export function dateLabel(date:string,year=false){return new Date(date+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'short',...(year?{year:'numeric' as const}:{}),timeZone:'UTC'});}
