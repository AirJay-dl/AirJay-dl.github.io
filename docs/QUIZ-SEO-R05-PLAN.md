# Quiz SEO R05 plan

Status: approved for review with GA4 and Google Search Console data on 22 September 2026. Implementation starts after the data review so the final keyword and page scope can be adjusted from evidence.

## Search architecture

| URL | Primary query | Supporting queries |
| --- | --- | --- |
| `/quiz/` | snooker quiz | free snooker quiz; snooker trivia; snooker questions and answers |
| `/quiz/rules/` | snooker rules quiz | snooker scoring quiz; snooker foul questions |
| `/quiz/players/` | snooker players quiz | famous snooker players quiz; snooker records quiz |
| `/quiz/history/` | snooker history quiz | snooker tournament quiz; Crucible quiz; Triple Crown quiz |

A future `/quiz/world-championship/` page will only be added when Search Console or Semrush evidence supports the seasonal opportunity.

## First implementation batch

1. Align the Quiz title, H1 and description around `free snooker quiz` and `60 questions and answers`.
2. Keep `/quiz/` as the hub and add crawlable Rules, Players and History category pages.
3. Render useful question, answer and explanation content in the initial HTML while retaining the five-question game flow.
4. Use `CollectionPage`, `ItemList` and `BreadcrumbList` on the hub; use accurate `Quiz`, `Question` and `Answer` markup only where the same content is visible on the page.
5. Add contextual links from rules guides, player profiles and tournament pages, plus related first-party links from answer explanations and result screens.
6. Add visible review dates, editorial/source notes and a social sharing image.
7. Extend GA4 with category selection, answer, next-round, share and related-content events while retaining `quiz_start` and `quiz_complete`.
8. Update the sitemap, validate rendered HTML and structured data, and submit the new category URLs in Search Console.

## Measurement

- Seven days: indexing, rendered HTML, structured data and tracking errors only.
- Twenty-eight days: queries, impressions, clicks, CTR, average position, start rate, completion rate and next-round rate.
- Fifty-six days: confirm whether category pages and seasonal Quiz pages justify further expansion.
- Compare Quiz performance by organic landing page and category. Record tournament timing and major news as external factors.

## Semrush input

Start with the UK database, then check the US, Australia and Canada. Export Keyword, Intent, Volume, KD, Trend, SERP Features, CPC and Results for: `snooker quiz`, `snooker trivia`, `snooker questions`, `snooker questions and answers`, `snooker rules quiz`, `snooker scoring quiz`, `snooker player quiz`, `snooker history quiz`, `world snooker championship quiz`, `Crucible quiz` and `Ronnie O'Sullivan quiz`.

Keep highly relevant low-volume terms because this is a focused niche. Use the data to refine wording and page priority rather than creating one thin page for every variation.

## Technical references

- Google Search Central: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google Education Q&A structured data: https://developers.google.com/search/docs/appearance/structured-data/education-qa
- Google title links: https://developers.google.com/search/docs/appearance/title-link
- Google link best practices: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
