# 独立域名上线

品牌暂定 The Snooker Calendar。类似 `snooker-calendar.com` 的域名形式直观，但当前没有查询或保证可注册，也没有购买域名。关键词域名本身不会保证 Google 排名。

## GitHub Pages

1. 购买自己选择的域名。先在 GitHub 的账号 Pages 设置完成域名验证，再到本仓库 Settings → Pages 添加自定义域名。
2. 若使用 `www`，按 GitHub 文档将 CNAME 指向 `AirJay-dl.github.io`。主域名使用 GitHub 当时列出的 A/AAAA 或 DNS 提供商支持的 ALIAS/ANAME；设置时重新核对，勿盲目使用旧 IP。
3. 建议明确一个主地址（主域名或 www），配置另一个到主地址的重定向。
4. 仓库 Actions variables：`SITE_URL=https://实际域名`、`CUSTOM_DOMAIN=实际域名`。重新运行 Publish snooker calendar。用户级仓库的 basePath 保持空。
5. 检查 HTTPS 生效，开启 Enforce HTTPS。核对首页和嵌套文章、favicon、JS、CSS、ICS、RSS、robots、sitemap 均能从新域名访问。
6. 核对每页 canonical 和 JSON-LD 已变更，检查原 github.io 地址指向新域名的行为。Search Console 验证新域名并提交 sitemap。
7. 在 `lib/site.ts` 更换联系邮箱为真实可收信的域名邮箱，先完成邮箱服务商的 MX、SPF、DKIM，按需求设置 DMARC。不能只更换展示文字而邮箱无法接收。
8. 更换域名不等于自动通过 AdSense，需按账户显示的审核流程办理。

官方文档：
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## Sites 预览

`.openai/hosting.json` 绑定已创建的 Sites 项目。Sites 预览为私有时不能供 Google 抓取。实际 SEO 主站是用户选择的公开 GitHub Pages/独立域名，不应将私有预览用作 AdSense 审核网址。
