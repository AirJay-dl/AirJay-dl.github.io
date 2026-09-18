# VPS content automation

The live scoreboard and editorial watch use two deliberately separate jobs.

## Score data

Every 15 minutes, `scripts/update-live-score.mjs` reads the current-season Snooker.org calendar, selects the active event (with a main ranking event taking priority when dates overlap), follows its event page, and switches the published event automatically. It publishes completed matches, clearly labels partial scores as in progress, validates the event page before writing, and replaces `data/live-score.json` atomically. When no event is active it previews the next scheduled event. A failed source check leaves the last successful snapshot in place.

The homepage loads the static verified snapshot first, then refreshes the small JSON file in the browser. This keeps the page fast and indexable while allowing the score panel to become fresher without rebuilding the whole site.

The current fallback reads the public English Open results page with an identifying user agent. Snooker.org's robots file permits the `/res/` path. Replace this parser with the authorised API adapter when credentials become available.

## Rankings

`scripts/update-rankings.mjs` checks the World Snooker Tour ranking service every four hours. It keeps the first 50 positions from both the latest official list and the provisional live list, validates each list before replacing `data/rankings.json`, and leaves the previous file in place if the source is incomplete. The rankings page renders an official top-50 snapshot during the static build and enhances it with the latest VPS snapshot in the browser.

## News candidates

`scripts/watch-news-sources.mjs` checks the WST news index every two hours and stores candidate links. It never copies or automatically republishes article text. A candidate becomes a site article only after its date and facts are verified and an original briefing is written with source links.

## Suggested schedule

```cron
*/15 * * * * /usr/bin/node /srv/snookercalendar/automation/update-live-score.mjs >> /srv/snookercalendar/automation/live-score.log 2>&1
37 */4 * * * /usr/bin/node /srv/snookercalendar/automation/update-rankings.mjs >> /srv/snookercalendar/automation/rankings.log 2>&1
17 */2 * * * /usr/bin/node /srv/snookercalendar/automation/watch-news-sources.mjs >> /srv/snookercalendar/automation/news-watch.log 2>&1
```

The score task uses one calendar request and one event request per run. Event IDs, active dates and round names are discovered from the source instead of being changed manually between tournaments.

## R06 更新（2026-09-19）

- 比分源检查仍为每 15 分钟；Results 浏览器读取缓存每 60 秒，这不是每分钟向来源采集。
- 排名每 4 小时检查，要求官方/临时各 100 条且排名连续、身份唯一；不完整数据拒绝发布。以来源 player ID/slug 去重写入 players，保留历史球员，导出共享 players.json。配置数据库后，排名入库失败则不发布新快照。
- 新闻每两小时（17 */2）从 WPBSA RSS 和 WST 新闻列表收集带日期的标题链接，存 news_items、source_runs，并原子写入 shared/data/news.json。首页和 News 自动读取；两来源都失败时保留旧文件，部分失败保留旧链接并显示提示。WST 列表可能返回旧文章，按原始发布日期排序，不能把检查时间冒充发表时间。
- 自动新闻是带出处的外链索引，比分简报明确为数据生成；不会自动复制整篇报道或冒充原创编辑文章。
- shared/data 与版本发布目录分离，切换/回滚页面不覆盖动态数据。迁移数据库前用 SQLite VACUUM INTO 备份。
