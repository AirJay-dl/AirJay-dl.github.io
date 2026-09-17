export type EventGuide={
  checked:string;
  overview:string;
  scheduleNotes:string[];
  venue:string;
  history:string;
  prizeNote:string;
  watchNote:string;
  relatedSlugs:string[];
  sources:{label:string;url:string}[];
};

const calendar='https://www.wst.tv/fullcalendarwithseedingcut-offs/';

export const eventGuides:Record<string,EventGuide>={
  'shenzhen-open-2026':{
    checked:'18 September 2026',
    overview:'The Shenzhen Open is the next listed main-tour ranking event after the September qualifying block. This page keeps the confirmed event window separate from session times, draw positions and venue details that have not yet been published by the organiser.',
    scheduleNotes:['Ranking event window: 28 September to 4 October 2026.','The confirmed draw and session order will be added when the event source publishes them.','The calendar previously used a different working event name for this slot, so older listings should not be treated as the current title.'],
    venue:'The tour calendar confirms Shenzhen, China. A precise venue is not shown in the source currently used by this site, so travel planning should wait for the organiser announcement.',
    history:'This listing is treated as the Shenzhen Open rather than being merged with a tournament held under another name. That preserves a clean event archive if the tour confirms it as a new title.',
    prizeNote:'The 2026 prize-money breakdown has not been added because this page does not yet have a current official purse document.',
    watchNote:'Territorial broadcast and streaming links will be listed only after WST or the event organiser publishes a current 2026 guide.',
    relatedSlugs:['international-championship-qualifiers-2026','northern-ireland-open-2026'],
    sources:[{label:'World Snooker Tour calendar',url:calendar}],
  },
  'northern-ireland-open-2026':{
    checked:'18 September 2026',
    overview:'The Northern Ireland Open returns to Belfast as a Home Nations ranking event. Its Leicester qualifying stage has a separate page, so this page follows only the televised final-stage week at Waterfront Hall.',
    scheduleNotes:['Main event: 18–25 October 2026 in Belfast.','Qualifying matches were scheduled separately in Leicester from 13–16 September.','Session times and the final-stage draw will be added after official publication.'],
    venue:'Waterfront Hall is the listed Belfast venue. Ticket holders should use the organiser schedule for individual session access because a tournament date range does not confirm a particular player’s start time.',
    history:'Jack Lisowski won the 2025 Northern Ireland Open by beating Judd Trump 9–8, securing his first ranking title. The 2026 event will establish a new draw and should not reuse the previous edition’s match order.',
    prizeNote:'Prize money will be shown after the 2026 event information or official draw document confirms the current breakdown.',
    watchNote:'Availability differs by country. The page will link to the current WST viewing guide once it is published rather than carrying over 2025 broadcasters.',
    relatedSlugs:['northern-ireland-open-qualifiers-2026','international-championship-2026'],
    sources:[{label:'World Snooker Tour calendar',url:calendar},{label:'WST: Lisowski’s 2025 Northern Ireland Open title',url:'https://www.wst.tv/news/2025/november/06/lisowski-is-october-player-of-the-month/'}],
  },
  'international-championship-2026':{
    checked:'18 September 2026',
    overview:'The International Championship is a ranking event in Nanjing following a separate qualifying competition in Leicester. This page will connect the confirmed qualifiers to the final-stage draw when WST publishes it.',
    scheduleNotes:['Main event: 31 October to 7 November 2026 in Nanjing.','The qualifying event runs from 17–19 September in Leicester and has its own live page.','Held-over matches and the final-stage session order must be confirmed by the official draw.'],
    venue:'Nanjing is confirmed in the season listing, but the precise 2026 venue remains unverified on this site. Venue information will stay labelled until a dated organiser source confirms it.',
    history:'Wu Yize won the 2025 title 10–6 against John Higgins for his first ranking-event victory. That result provides historical context only; the 2026 field and draw are tracked separately.',
    prizeNote:'The current edition’s prize-money table will be added from an official 2026 event document when available.',
    watchNote:'A region-specific viewing section will be published after WST announces the current rights and streaming options.',
    relatedSlugs:['international-championship-qualifiers-2026','champion-of-champions-2026'],
    sources:[{label:'World Snooker Tour calendar',url:calendar},{label:'WST: Wu Yize player profile and 2025 title record',url:'https://www.wst.tv/players/d935d534-e696-4292-b773-e9b8efee1ea7'}],
  },
  'champion-of-champions-2026':{
    checked:'18 September 2026',
    overview:'Champion of Champions is an invitational event built around tournament winners and qualified players rather than the rolling world-ranking list. The field can change as qualifying events finish, so this page separates confirmed dates from an incomplete participant list.',
    scheduleNotes:['Tournament week: 9–15 November 2026.','The listed venue is Mattioli Arena in Leicester.','The final field, group order and session schedule will be added only after official confirmation.'],
    venue:'Mattioli Arena is the listed Leicester venue. Individual tickets and session access should be checked against the event’s current ticket page when released.',
    history:'Mark Selby won Champion of Champions for the first time in 2025, defeating Judd Trump in the final. The invitational qualification list resets for the 2026 edition.',
    prizeNote:'Because this is an invitational event, its prize money does not count toward the two-year world ranking list. The current purse will be added only from the 2026 event source.',
    watchNote:'Viewing information will be added by territory when the organiser publishes the 2026 broadcast guide.',
    relatedSlugs:['international-championship-2026','uk-championship-qualifiers-2026'],
    sources:[{label:'World Snooker Tour calendar',url:calendar},{label:'WST: Selby wins 2025 Champion of Champions',url:'https://www.wst.tv/news/2025/november/16/Selby-Beats-Trump-To-Become-Champion-Of-Champions-For-First-Time/'}],
  },
  'uk-championship-2026':{
    checked:'18 September 2026',
    overview:'The UK Championship is a ranking event and one of snooker’s Triple Crown tournaments. The York final stages follow a separate Leicester qualifying event, and this page will preserve both stages as distinct records.',
    scheduleNotes:['Qualifying: 21–26 November 2026 in Leicester.','Main event: 28 November to 6 December 2026 at York Barbican.','The final-stage draw and daily session order will be added after the qualifying field is confirmed.'],
    venue:'York Barbican hosts the main event. The venue listed for qualifying is Mattioli Arena in Leicester, so visitors should verify which stage their ticket covers.',
    history:'Mark Selby won the 2025 UK Championship in York. The competition forms the Triple Crown with the Masters and World Championship.',
    prizeNote:'Prize money contributes to the world ranking list. The 2026 round-by-round breakdown will be added from the official event document.',
    watchNote:'The UK and international broadcast list changes by territory and will be added when the 2026 viewing guide is published.',
    relatedSlugs:['uk-championship-qualifiers-2026','champion-of-champions-2026','masters-2027'],
    sources:[{label:'World Snooker Tour calendar',url:calendar},{label:'WST: Selby captures the 2025 UK title',url:'https://www.wst.tv/news/2025/december/07/selby-capture-uk-crown-in-york/'}],
  },
};
