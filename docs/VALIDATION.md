# Validation

Initial verification on 2026-09-05:

- Production static export: 37 content pages plus 404, all prerendered successfully.
- TypeScript `tsc --noEmit`: passed.
- `scripts/verify-export.mjs`: passed title/description/canonical uniqueness, local links/assets, JSON-LD parsing, sitemap URL count, 42 unique event records, cross-month inclusion, exclusive ICS end date and 75-byte line limits.
- WebMCP `filter_snooker_calendar`: registered with expected schema; valid Ranking + English query returned the English Open; invalid category rejected; reset returned all six September entries. Supported browser context was used for this focused interface check.
- No full browser UI testing, screenshots, mobile click-through or Core Web Vitals measurement was requested or performed. Responsive CSS is implemented; real-device QA remains an editorial launch task.
- Ads are not activated. AdSense review and domain migration remain account/domain-specific follow-up steps.

## R06 · 2026-09-19

- TypeScript noEmit、静态构建、导出检查通过：194 个内容页面，100 名排名、101 个球员档案、150 题。
- 数据测试通过：Top 100 完整性、重复入库、跌出榜单保留、SQLite integrity_check、新闻日期/安全 URL 解析。
- Chrome 浏览器验收：Top 100 表格；新闻卡片；3 类第 10 组完成/结算/循环回第 1 组；390px 移动端无横向溢出和脚本异常。
- VPS 更新前 SQLite VACUUM INTO 备份；上线后 players=101、news_items=13、排名任务新增 200 条，integrity_check=ok。
- 正式域名 Quiz、Results、共享数据均 HTTP 200；game4fun.online HTTP 200。
- 比分任务实际成功记录 15:45、16:00 UTC，配合 crontab 确认 15 分钟源检查。浏览器轮询 60 秒不代表来源每分钟刷新。
