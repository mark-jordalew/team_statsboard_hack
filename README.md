# Panther Dashboard

To view the dashboard, you need an **api key** and an **api secret**. When you
have these, use the following path:

    http://tissuu.com/res/publisher-suite/_debug/dashboard?api_key=YOUR_API_KEY&api_secret=YOUR_API_SECRET

For local development, replace `http://tissuu.com` with
`http://dev-html.tissuu.com` and make sure to run nginx with `panther-tissuu`
and start the publisher-suite project using `make run` in the root.


## Contributing

1. Add a new `.html` file in the `templates` directory with your content.
2. Add the filename to the `pages` array at the top of the `index.js` file.
3. Update the `scripts/RELEASE_NOTES.md` file to reflect your changes

If you're making a new page, checkout the `example` page for inspiration. To use
the templates on the example page, include this stylesheet in `<head>`.

    <link rel="stylesheet" href="styles/dashboard.css">


## Todo

- [ ] Put these into an issue todos into an github issuu perhaps
- [ ] Actually use the SQL to auto generate the hmm URL automatically.
[Example](https://github.com/issuu/publisher-suite/blob/a5afa7eaa152279b65ccf5403a5e55c8fd094722/resources/app_model/debug/templates/free-trial.html)
- [ ] Clean up commits
- [ ] backend test failing: /Users/ck/code/issuu/publisher-suite/resources/app_model/debug/debug_resources.py:60: [W0622(redefined-builtin), DebugDashboardPageCss.get] Redefining built-in 'file'
- [ ] Make header hideable
- [ ] Display page name in header
- [ ] Improve example pages and dashboard styles
- [ ] Fuzzy search for more than pages (e.g. graphs/keywords provided by each dashboard page)
