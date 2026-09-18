# Snooker quiz · first release

The first release contains 60 editorially checked questions. It is designed as a lightweight repeat-visit product and an internal-link destination for rules, player and tournament content.

## Question bank

- Rules and scoring: 20 questions
- Tournaments and history: 20 questions
- Players and records: 20 questions
- Four sets in each category, with five questions per set
- Four answer options, one correct response, a short explanation and a source for every question

The first version has no timer, login or leaderboard. This keeps the game fast, mobile-friendly and easy to maintain. Time-sensitive records must carry a reliable source and should be reviewed after major events.

## Discovery

The global navigation and footer link to `/quiz/`. Contextual entries also appear on the home page, Guides, Rankings and Players pages.

## Measurement

GA4 receives `quiz_start` with category and set number, and `quiz_complete` with category, set number and score. Review entry-page click-through, starts, completion rate and repeat play before adding harder game mechanics.

## Expansion rule

Add questions in complete five-question sets. Expand a category from 20 to 40 only after the existing sets receive enough starts to show demand. New questions must include an explanation and a first-party or authoritative source.

## R06 扩容

题库扩为 150 道：Rules、Tournaments、Players 每类 50 道。每类 10 组，每组 5 道：20 道 Beginner、15 道 Fan、15 道 Expert。保留逐题解释与来源链接；完成第 10 组后回到第 1 组。专题 SEO 页面和更细的行为埋点仍按 R05 计划在 9 月 22 日结合数据决策。
