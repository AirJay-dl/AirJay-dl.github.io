export const dataSource='https://www.wst.tv/rankings/?showLive=false';
export const statsSource='https://www.snooker.org/res/index.asp?season=2026';
export const dataChecked='13 September 2026';
export const officialRankingLabel='World Ranking List after 2026 Unibet British Open';

export type RankingRow=readonly [number,string,string,string,number,string,number,string,string];
export const rankings:RankingRow[]=[
 [1,'Zhao Xintong','zhao-xintong','China',1265550,'1997-04-03',2016,'The Cyclone','895d376f-9f42-4e67-8a63-bc78676d0726'],
 [2,'Mark Selby','mark-selby','England',1139150,'1983-06-19',1999,'The Jester','ba7831b4-ab75-4435-946a-c6f02e4e2d4b'],
 [3,'Judd Trump','judd-trump','England',1108350,'1989-08-20',2005,'The Ace in the Pack','e2f3cfe7-6138-4ce6-b1dc-77dcc1d0a65f'],
 [4,'Neil Robertson','neil-robertson','Australia',1098200,'1982-02-11',1998,'The Thunder From Down Under','8b83133a-4c15-4275-811e-bdf2cb02702f'],
 [5,'Wu Yize','wu-yize','China',1067900,'2003-10-14',2021,'The Lanzhou Lion','d935d534-e696-4292-b773-e9b8efee1ea7'],
 [6,'John Higgins','john-higgins','Scotland',962000,'1975-05-18',1992,'Wizard of Wishaw','a5eecca1-8302-4739-84fc-6721627baa43'],
 [7,'Shaun Murphy','shaun-murphy','England',873000,'1982-08-10',1998,'The Magician','03fe92d3-ad85-434c-bc17-5fe02a496187'],
 [8,'Kyren Wilson','kyren-wilson','England',708100,'1991-12-23',2010,'The Warrior','a8c0d3a6-706b-4bf0-8dce-9cde97fe88c4'],
 [9,'Mark Williams','mark-williams','Wales',702400,'1975-03-21',1992,'The Welsh Potting Machine','6aaddcbb-345c-474a-9069-e7757e155729'],
 [10,'Barry Hawkins','barry-hawkins','England',664800,'1979-04-23',1996,'The Hawk','ec561f17-e982-43b3-8807-82fc76adbe75'],
 [11,'Xiao Guodong','xiao-guodong','China',646900,'1989-02-10',2007,'The Chongqing Cyberman','c3d39c08-92fd-471b-8901-903a4bd22027'],
 [12,'Chris Wakelin','chris-wakelin','England',573800,'1992-03-16',2013,'The Monster','a1beeb4b-2493-476c-9682-1900eb83c2d5'],
 [13,'Mark Allen','mark-allen','Northern Ireland',560550,'1986-02-22',2005,'The Pistol','c37aba27-5b12-4fae-8a8b-9e749c7a25f3'],
 [14,"Ronnie O'Sullivan",'ronnie-osullivan','England',513750,'1975-12-05',1992,'The Rocket','226c7294-655e-4925-bcde-17330ddfc438'],
 [15,'Ding Junhui','ding-junhui','China',470850,'1987-04-01',2003,'The Dragon','3ff06750-8c3c-456c-8fac-58209b6f679e'],
 [16,'Jack Lisowski','jack-lisowski','England',374100,'1991-06-25',2010,'Jack-Pot','d56f02ab-f2df-41ca-b9a4-24167aded141'],
 [17,'Zhang Anda','zhang-anda','China',349200,'1991-12-25',2009,'','0512f55a-faea-48df-a8fc-895fbcaef511'],
 [18,'Zhou Yuelong','zhou-yuelong','China',348900,'1998-01-24',2014,'The Jumping Dragon','960cd1e6-2bb4-4229-aefe-447646412bf2'],
 [19,'Stuart Bingham','stuart-bingham','England',348300,'1976-05-21',1995,'Ball-Run','ac932300-dacb-4e91-803b-99a03fa20853'],
 [20,'Si Jiahui','si-jiahui','China',346000,'2002-07-11',2019,'The Pearl','f3c7e0cf-7cb6-405e-9ba1-4d02716a20c3'],
 [21,'Chang Bingyu','chang-bingyu','China',340100,'2002-08-08',2019,'','f4834b43-a4d4-4810-ba79-b9a288e65f96'],
 [22,'Jak Jones','jak-jones','Wales',339300,'1993-07-29',2010,'','036bc430-6c51-4d63-a366-a6ca218f7f39'],
 [23,'Elliot Slessor','elliot-slessor','England',336700,'1994-08-04',2013,'','b1239913-b987-4bae-a7f6-ff4eb481f503'],
 [24,'Thepchaiya Un-Nooh','thepchaiya-un-nooh','Thailand',330600,'1985-04-18',2009,'F1','67203224-1d66-4c1e-b655-150f4f835aba'],
 [25,'Ali Carter','ali-carter','England',318150,'1979-07-25',1996,'The Captain','c796b82d-1040-422d-b27d-9249310b99a3'],
 [26,'Gary Wilson','gary-wilson','England',282800,'1985-08-11',2004,'The Tyneside Terror','e5f4377c-5119-4c0a-9a88-e42eb8e48677'],
 [27,'Lei Peifan','lei-peifan','China',270800,'2003-05-31',2019,'','9e0b1245-cc2c-4dab-ad27-46db80701684'],
 [28,'Pang Junxu','pang-junxu','China',263500,'2000-02-15',2020,'','9c842985-9f09-4bd0-aa6a-dafe523b40ee'],
 [29,'Noppon Saengkham','noppon-saengkham','Thailand',253500,'1992-07-15',2010,'','aaf6c342-11f7-4d03-86b3-1144a4fd92f8'],
 [30,'Hossein Vafaei','hossein-vafaei','Iran',245200,'1994-10-15',2012,'The Prince of Persia','99019ac8-ad6a-4927-9f93-1935ea43ca55'],
 [31,"Joe O'Connor",'joe-oconnor','England',236450,'1995-11-08',2018,'KO','c2809815-3bd0-41fa-b727-458e22c98070'],
 [32,'Stephen Maguire','stephen-maguire','Scotland',232200,'1981-03-13',1998,'The Maverick','c07238de-bca9-4067-9749-00841bd06d28'],
 [33,'David Gilbert','david-gilbert','England',224950,'1981-06-12',2001,'The Farmer','9b2532c1-a189-4573-8320-f254d2f9bfde'],
 [34,'Yuan Sijun','yuan-sijun','China',217400,'2000-05-29',2017,'','734865fe-9ee2-4a3e-b4d1-035bf819aff2'],
 [35,'Tom Ford','tom-ford','England',196200,'1983-08-17',2000,'Model T','69df4145-0b26-4a1e-9afb-c9ae74fa3fd1'],
 [36,'Jackson Page','jackson-page','Wales',194650,'2001-08-08',2019,'Action','19ce247e-1824-4f94-8fe3-c94ce4056802'],
 [37,'Aaron Hill','aaron-hill','Ireland',188500,'2002-02-28',2020,'The Breeze','be51ee14-4b28-4932-8d3d-af8011dc9201'],
 [38,'Stan Moody','stan-moody','England',185200,'2006-09-14',2023,'','a65d6cc8-05fa-4827-8294-a1da17c975f6'],
 [39,'Xu Si','xu-si','China',177250,'1998-01-24',2017,'','f5586d0e-89f5-434e-8723-65046b1d6fe9'],
 [40,'Anthony McGill','anthony-mcgill','Scotland',177100,'1991-02-05',2010,'The Glaswegian Gladiator','ac8407bc-1cbf-4642-86a3-1e3cacbaeb62'],
 [41,'Luca Brecel','luca-brecel','Belgium',171500,'1995-03-08',2011,'The Belgian Bullet','cd124662-9d97-413c-9609-5051d002ab3b'],
 [42,'Ryan Day','ryan-day','Wales',167250,'1980-03-23',1999,'Dynamite','5d419487-e341-4301-a4f5-e493a2a78754'],
 [43,'Zak Surety','zak-surety','England',160300,'1991-10-04',2014,'The Sure Thing','24564b03-cfd6-474c-a653-0268241d632f'],
 [44,'He Guoqiang','he-guoqiang','China',155800,'2000-08-05',2023,'He-Man','5587fb4d-8517-4572-918e-65ff83b71d74'],
 [45,'Jimmy Robertson','jimmy-robertson','England',149600,'1986-05-03',2002,'','4e7f33e8-925d-4442-b8f7-6023cd920d9e'],
 [46,'Michael Holt','michael-holt','England',148750,'1978-08-07',1996,'The Hitman','1b987fe8-f707-4f12-95a4-ac44a3e4573d'],
 [47,'Ben Woollaston','ben-woollaston','England',144500,'1987-05-14',2003,'','8ad4ff3f-9f92-44ba-a884-6c8a8e0dcf08'],
 [48,'Matthew Selt','matthew-selt','England',142750,'1985-03-07',2000,'','c1ac359d-8359-405b-9879-74dd9b4a5b2c'],
 [49,'Long Zehuang','long-zehuang','China',141850,'1996-12-28',2023,'','40859ee8-e438-4062-aa9b-84e4e8e22bac'],
 [50,'Daniel Wells','daniel-wells','Wales',138300,'1988-07-31',2008,'','a458950b-c644-4f16-b89a-543ccfccc61c'],
];

export const rankingSnapshot={checked:dataChecked,source:dataSource,official:{label:officialRankingLabel,positions:rankings.map(r=>({rank:r[0],name:r[1],slug:r[2],country:r[3],money:r[4]}))}};

export const matchStats=[
 ['Mark Selby',14,13,0,1,110,73,37,'66.36%'],['Judd Trump',10,8,0,2,57,40,17,'70.18%'],['Liam Highfield',16,12,0,4,102,66,36,'64.71%'],['David Gilbert',22,15,2,5,127,78,49,'61.42%']
] as const;
