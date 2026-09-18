import catalog from '../public/data/players.json' with {type:'json'};

export type Player={slug:string;name:string;initials:string;country:string;born:string;pro:string;label:string;description:string;milestones:string[];bio:string;watch:string;source:string;rank:number;rankingMoney:number;editorial:boolean};

const editorial:Record<string,Partial<Player>>={
 'ronnie-osullivan':{name:'Ronnie O’Sullivan',label:'The Rocket',description:'Seven Crucible world titles and a career spanning generations.',milestones:['1993 · First UK Championship title, aged 17','2001 · First World Championship title','2022 · Seventh World Championship title'],bio:'Ronnie O’Sullivan turned professional in 1992 and won the UK Championship the following year. His seventh World Championship in 2022 matched Stephen Hendry’s record of seven at the Crucible. The span between his first world title in 2001 and that seventh victory is a useful measure of his longevity.',watch:'Watch the position of the cue ball after a straightforward pot. A fluent scoring visit can look effortless because the difficult work is being done before the next shot begins. Compare the pace of an open-table visit with the choices he makes when the reds are clustered; the change in task is more revealing than speed alone.'},
 'judd-trump':{label:'The Ace',description:'The 2019 world champion who completed the career Triple Crown.',milestones:['2011 · First UK Championship title','2019 · First Masters title','2019 · World champion, beating John Higgins 18–9'],bio:'Judd Trump joined the professional tour in 2005. His 2019 World Championship victory over John Higgins completed a career set of the World Championship, UK Championship and Masters titles. He had first reached the Crucible final in 2011, making the 2019 win the resolution of a much longer pursuit.',watch:'Before an attacking shot, look at the likely cue-ball route and the position left if the pot misses. This offers a better way to understand attacking snooker than simply calling a shot brave. Watch how a player turns the first opening into a repeatable scoring position.'},
 'ding-junhui':{label:'A defining Chinese champion',description:'A former world number one and three-time UK Championship winner.',milestones:['2005 · First UK Championship title','2009 · Second UK Championship title','2019 · Third UK Championship title'],bio:'Ding Junhui is a former world number one whose UK Championship victories in 2005, 2009 and 2019 span three distinct stages of his career. His early success made him a central figure in conversations about Chinese snooker, but his record also stands as an individual story of sustained achievement.',watch:'Follow the choice of colour after each red. A high-value colour is useful only if the next red remains accessible. Asking what the selected colour makes possible two shots later is a practical way to appreciate a controlled break, even before learning technical vocabulary.'},
 'kyren-wilson':{label:'The Warrior',description:'The 2024 world champion, from Kettering to the Crucible.',milestones:['2015 · First ranking title at the Shanghai Masters','2020 · First World Championship final','2024 · World champion, beating Jak Jones 18–14'],bio:'Kyren Wilson won the 2024 World Championship with an 18–14 victory over Jak Jones. He had reached the final in 2020, and his first ranking title came at the 2015 Shanghai Masters. Those milestones trace a progression from breakthrough winner to a player who converted repeated Crucible contention into the title.',watch:'In a long match, look beyond the most spectacular break. Track the frames that need a second or third scoring visit, and how each player responds after a missed chance. A match can turn through several modest contributions rather than a single century.'},
};

const bornLabel=(date:string)=>new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
const initials=(name:string)=>{const parts=name.split(' ');return `${parts[0][0]}${parts.at(-1)?.[0]||''}`.toUpperCase()};
const money=(value:number)=>`£${value.toLocaleString('en-GB')}`;

export const players:Player[]=catalog.players.map(row=>{
 const {name,slug,country}=row;const rank=row.rank||row.liveRank||0,rankingMoney=row.rankingMoney||0,dob=row.born,pro=row.turnedPro,nickname='';
 const richer=editorial[slug];
 const base:Player={
  slug,name,initials:initials(name),country,born:dob?bornLabel(dob):'Not recorded',pro:pro?String(pro):'Not recorded',rank,rankingMoney,
  label:nickname||'Player profile',
  description:`${name}: ${country} snooker player, ranking record and career background.`,
  milestones:[`Represents · ${country}`,`Professional debut · ${pro||'Not recorded'}`,`Ranking record · Official and provisional lists shown above`],
  bio:`${name} represents ${country} on the World Snooker Tour. The ranking panel above shows the latest stored official and provisional positions. ${pro?`WST records a professional debut in ${pro}.`:''}`,
  watch:`Use the season calendar to follow ${name} through ranking events and qualifiers. Results and ranking totals are checked against the linked source; the ranking figure can change after each eligible tournament.`,
  source:row.source,
  editorial:Boolean(richer),
 };
 return {...base,...richer};
});
