# 产品、内容与 SEO 更新记录

这个记录用于把网站改动与 Search Console、GA4 的后续变化对应起来。每次上线按“一项可解释的改动一行”记录；同一天的大型发布可以使用同一个 Release ID。

## 记录规则

- 上线前记录 28 天基线，上线后分别观察 7、28 和 56 天；比较时优先使用同比上一周期，并注明赛事热度、排名赛进行中等外部影响。
- SEO 页面改动至少记录目标查询、目标网址、搜索意图和主要内链变化。
- 不根据一两天数据判断结果。Google Search Console 数据有延迟，GA4 用于行为趋势，Search Console 用于搜索曝光、点击、CTR 和平均排名。
- 大型改版、内容发布和技术修复分开记录，避免无法判断是哪项改动造成变化。
- 发布后不修改原始基线；后续结论追加到同一行的观察字段。

## 核心字段

| 字段 | 用途 |
| --- | --- |
| Release ID | 将同一次发布的改动关联起来，例如 `2026-09-R02` |
| 状态与日期 | Planned、Live、Rolled back，以及实际上线日期 |
| 页面/模板 | 受影响的网址或页面类型 |
| 改动与假设 | 改了什么、为什么预计会改善用户或搜索表现 |
| 目标查询 | 这项内容要覆盖的主要搜索需求 |
| 28 天基线 | GSC 点击、曝光、CTR、平均排名；GA4 自然搜索用户、参与率 |
| 7/28/56 天结果 | 与基线和上一周期比较后的数据 |
| 外部因素 | 赛事开始、球员夺冠、媒体热点、抓取或服务中断 |
| 结论与下一步 | Keep、Iterate、Revert，以及下一项动作 |

## 下一轮更新清单

| Release ID | 状态 | 页面/模板 | 改动与假设 | 目标查询 | 上线日期 | 结果与结论 |
| --- | --- | --- | --- | --- | --- | --- |
| Next-R01 | Planned | 球员页、排名页 | 将 `Ranking Money` 明确为 `Two-year ranking money`，增加滚动排名奖金释义，减少用户误解 | snooker ranking money; how snooker rankings work | — | — |
| Next-R01 | Planned | Guides | 新增 `How Do Snooker World Rankings Work?`，并与排名榜、球员页和赛事页互链 | how do snooker rankings work; snooker world ranking system | — | — |
| Next-R01 | Planned | Guides | 建立 Getting Started、Rankings & Tournaments、Watching Snooker、History & Terminology 四类常识内容 | snooker rules; snooker scoring; 147 break; best of 11 frames | — | — |
| 2026-09-R05 | Planned · 2026-09-22 review | `/quiz/` | 结合 GA4、GSC 与 Semrush 数据调整标题、H1、说明文案与主关键词定位 | snooker quiz; free snooker quiz; snooker trivia | — | 方案已记录在 `docs/QUIZ-SEO-R05-PLAN.md` |
| 2026-09-R05 | Planned · 2026-09-22 review | `/quiz/rules/`、`/quiz/players/`、`/quiz/history/` | 建立可抓取的专题页，在初始 HTML 中呈现问题、答案与解释，并完善结构化数据和上下文内链 | snooker rules quiz; snooker players quiz; snooker history quiz | — | 根据数据确认页面优先级后实施 |
| 2026-09-R05 | Planned · 2026-09-22 review | Quiz GA4 | 增加分类选择、答题、继续下一轮、分享和相关内容点击事件 | 行为分析，无直接目标查询 | — | 与 `quiz_start`、`quiz_complete` 一并建立基线 |
| Architecture-I18N | Planned | 全站与未来数据库 | 保留英文根目录，为 `/zh/`、翻译关系、hreflang 和语言字段做好架构准备 | 中文与其他语言需求待 GSC 验证 | — | — |

## 已上线版本

| Release ID | 状态 | 页面/模板 | 改动与假设 | 目标查询 | 上线日期 | 版本 | 数据观察 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-09-R04 | Live | `/quiz/`、首页、Guides、Players、Rankings | 新增 60 道有来源的斯诺克知识题，分 3 类、每轮 5 题；加入首页推荐块、全站导航与语境内链；预期提高回访、参与时间和 Guides/Players 内容发现 | snooker quiz; snooker trivia; snooker rules quiz | 2026-09-18 | Git `a681b12`；Sites v7；VPS `release-20260918-r04` | GA4 观察 `quiz_start`、`quiz_complete`、完成率、继续下一组比例；GSC 先观察收录和长尾展示 |
| 2026-09-R04 | Live | 5 个重点赛事页 | 为 Shenzhen Open、Northern Ireland Open、International Championship、Champion of Champions、UK Championship 增加赛程说明、场馆、历史、奖金与观看信息及相关赛事内链；预期承接赛事名 + year/schedule/venue/results 意图 | event name + 2026; schedule; draw; results; venue | 2026-09-18 | Git `a681b12`；Sites v7；VPS `release-20260918-r04` | 赛事开始前后分别看目标页展示、点击、CTR 与跳转到 Results 的比例 |
| 2026-09-R04 | Live | 数据更新架构 | SQLite Phase 1 已在 VPS 启用，保存赛事、比赛、排名快照与任务运行记录；前端继续读取共享 JSON，比分每 15 分钟、排名每 4 小时更新 | 技术基础，无直接目标查询 | 2026-09-18 | Git `a681b12`；VPS `release-20260918-r04` | 上线验收：1 个赛事、67 场比赛、2 个排名快照、100 条排名记录；继续观察更新成功率和数据延迟 |
| 2026-09-R03 | Live | `/results/` | 新建集中结果页，展示当前赛事、进行中比分、已完成比赛、后续赛程和历史冠军；预期承接比分与结果意图，并把访问导向赛事详情页 | snooker results; snooker results today; snooker live scores | 2026-09-15 | Git `25261fb`；Sites v5 | 基线待用户提供；2026-09-22 看 7 天收录与异常，2026-10-13 做 28 天判断，2026-11-10 做 56 天复查 |
| 2026-09-R03 | Live | `/calendar/season/` | 重写标题、H1 与导语，增加当前/下一赛事、赛季内链和 FAQ；预期提升 schedule、fixtures、calendar 查询的相关性和页面参与度 | snooker schedule; snooker fixtures; snooker calendar | 2026-09-15 | Git `25261fb`；Sites v5 | 同上；赛事期间需单独标记搜索需求波动 |
| 2026-09-R03 | Live | `/rankings/` | 明确 2026/27、Top 50、两年滚动排名奖金及官方/临时排名区别，增加结果页与球员页内链 | snooker rankings; snooker rankings 2026; world snooker rankings | 2026-09-15 | Git `25261fb`；Sites v5 | 基线待用户提供；重点观察非品牌展示、CTR、平均排名与球员页点击 |
| 2026-09-R03 | Live | 全站导航、sitemap、结构化数据 | 导航拆分 Schedule 与 Results；结果页加入 sitemap；核心页加入 canonical、BreadcrumbList，58 个赛事页保留 SportsEvent；预期改善抓取、页面发现和搜索意图分流 | schedule/results/rankings 主题词群 | 2026-09-15 | Git `25261fb`；Sites v5 | 7 天检查索引和抓取异常；28 天比较三个目录的曝光分布 |

## 2026-09-R03 数据回填表

收到 GA4 和 Search Console 数据后，在这里保留原始口径与观察结论。基线建议使用 **2026-08-18 至 2026-09-14**；上线后窗口使用完整自然日，避免把 9 月 15 日的部分数据混入比较。

| 页面 | GSC 基线：点击 / 曝光 / CTR / 平均排名 | GA4 基线：自然搜索用户 / 浏览 / 参与率 | 7 天 | 28 天 | 56 天 | 外部因素与结论 |
| --- | --- | --- | --- | --- | --- | --- |
| `/results/` | 待回填 | 待回填 | 2026-09-16—09-22 | 2026-09-16—10-13 | 2026-09-16—11-10 | 记录同期赛事、数据更新中断和搜索收录日期 |
| `/calendar/season/` | 待回填 | 待回填 | 2026-09-16—09-22 | 2026-09-16—10-13 | 2026-09-16—11-10 | 记录当前赛事和赛历变更 |
| `/rankings/` | 待回填 | 待回填 | 2026-09-16—09-22 | 2026-09-16—10-13 | 2026-09-16—11-10 | 记录官方排名表发布日期和排名赛结束时间 |

## 2026-09-R04 数据回填表

本次发布日为 **2026-09-18**。Quiz 是新页面，没有历史页面基线；赛事页应与各自上线前 28 天比较，并单独标注赛事是否临近或正在进行。

| 页面/功能 | GSC 基线：点击 / 曝光 / CTR / 平均排名 | GA4 基线：自然搜索用户 / 浏览 / 参与率 | 7 天检查 | 28 天判断 | 56 天复查 | 外部因素与结论 |
| --- | --- | --- | --- | --- | --- | --- |
| `/quiz/` | 新页面，无页面基线 | 新页面；记录 `quiz_start`、`quiz_complete` | 2026-09-19—09-25 | 2026-09-19—10-16 | 2026-09-19—11-13 | 观察收录、题目开始率、完成率与继续下一组比例 |
| 5 个重点赛事页 | 待回填 | 待回填 | 2026-09-19—09-25 | 2026-09-19—10-16 | 2026-09-19—11-13 | 分页记录赛事热度、赛事阶段及比分更新状态 |
| 动态比分与排名更新 | 不直接归因 SEO | 记录 Results 与赛事页参与变化 | 检查任务失败与数据延迟 | 汇总更新成功率 | 评估数据库读接口需求 | 数据库和 JSON 更新时间需与异常流量时段对应 |

## 每次发布后的采集方法

1. 在 Search Console 导出目标页面和查询的最近 28 天数据。
2. 在 GA4 记录自然搜索用户、落地页浏览、参与率和关键事件。
3. 7 天只检查收录、跟踪和严重异常；28 天做第一次判断；56 天确认趋势。
4. 对赛事型页面同时记录赛事是否正在进行，避免把赛程周期造成的流量变化归因于页面修改。

## 2026-09-R06：自动新闻、Top 100 与 Quiz 扩容

状态：VPS 已上线并验收（2026-09-19，`release-20260919-r06`）。R05 仍保留给 9 月 22 日的 GA/GSC 驱动 SEO 复盘。

| 页面 | 改动与假设 | 观察指标 |
| --- | --- | --- |
| 首页、`/news/` | 每两小时收集 WPBSA RSS 与 WST 可解析新闻链接，显示来源和原始发布日期；比分自动生成赛事简报。原创文章继续独立展示 | 新闻入口点击、回访、参与时间；外链点击需后续检查 GA 配置 |
| `/rankings/`、`/players/` | 官方和临时排名各 Top 100；本次合计 101 位不同球员；进入榜单即入库，跌出榜单保留档案 | 排名/球员目录曝光、点击、索引量；数据任务成功率 |
| `/results/` | 明确来源每 15 分钟检查、浏览器每分钟读取，修正原先容易误解的刷新说明 | 数据时效、来源失败与实际延迟 |
| `/quiz/` | 3 类各 50 题，总计 150；每类 10 组，每组 5 题，含 15 道 Expert 题 | quiz_start、quiz_complete、完成率、参与时间；9/22 与 R05 一并回顾 |

GA/GSC 基线待用户提供；不把赛事热度或新闻数量变化直接解释为 SEO 因果。按实际发布日期后 7/28/56 天观察，并记录同时发生的赛事。新发现但尚未静态构建的球员使用 noindex 的通用详情页，下一次构建后生成独立可索引页与 sitemap 项。

### R06 数据完整性修复 · 2026-09-19

每日巡检发现更新器仍把已完成比赛截断为前 24 场，导致时间戳虽新但后续结果未显示。移除结果、进行中和待赛列表的采集输出截断；首页组件自己的展示数量限制保留。此修复仅涉及 VPS 数据任务，不改静态页面。验收对比赛事来源与公开 JSON 的完整数量。

验收：02:04 UTC 公开快照含 43 场已完成、0 场进行中、14 场待赛，与 Snooker.org event=2771 的数量一致；Neil Robertson 6–0 Alexander Ursenbacher 等原先截断的赛果已显示。当前为资格赛，无冠军决赛；日期选赛机制保留，赛事结束后按来源日历选择下一项赛事。
