# Notice Manager

Collect WordPress admin notices into 'Notices' panel.
Notice Manager adds a 'Notices' panel alongside the 'Help' and 'Screen Option' collapsible panels. Notices are collected into the fold-out panel at the top of the page - making for a smoother and more accessible experience.

## Activation

Upon plugin activation, Notice Manager adds a setting page **Settings > Notice Manager** with various options. All options need to be enabled manually from that page.

## About

Notice Manager attempts to address some of the issues with WordPress's current notices implementation - the `admin_notices` hook system and accompanying scripts (I'm looking at you `common.js`!)

Notice Manager addresses the following issues:
- WordPress core's `common.js` script moves some of the notices below the title, while leaving other notices above the title (eg. `update-nag`). This is confusing and non-accessible. Notice Manager moves all notices together - either above the title or into the 'Notices' panel.
- WordPress core moves notices after they've already been printed on the page, Creating a jumpy experience. This is only partially addressed by Notice Manager as `common.js` functionality cannot be overridden/disabled currently. Notice Manager is less jumpy as it hides notices before they are in their final position.
- Opinionated: Notices should not appear below the title. Oftentimes the notices on a page are not related directly to the page being viewed. Having the title and the content uninterrupted by notices is arguably more accessible and makes for a smoother user experience.

### Minimalist Ethic

Notice Manager represents a minimalist approach to the issues and does not preclude other solutions being developed currently.
- Notice Manager does not invent any new UI on WordPress's admin side. It bootstraps WordPress's already existing and familiar `screen-meta-links` collapsing panels (The 'Help' and 'Screen Options' panels). More on that below.
- Notice Manager does not affect how plugins interact with WordPress core notice system. Notice Manager simply collects notices already printed to the page. It supports all plugins using the current `admin_notices` hook(s).
- Notice Manager does not change notices appearance. It simply moves them around in much the same way core's `common.js` does.
- Notice Manager works with what exists now.
- Notice Manager preserves backward compatibility.

### Screen Meta Links

WordPress does not currently allow plugin authors a way to add panels and content to the `screen-meta-links` - apart from interacting with the hardcoded Screen Meta 'Help' and 'Screen Options' panels.

Notice Manager uses a library (`abuyoyo/screen-meta-links`) that employs render-blocking JavaScript and PHP to generate new panels on page load. This could be developed as its own separate feature using PHP only and a hook system - to allow plugin authors to interface and add their own panels to WordPress's Screen Meta panels. However that is beyond the scope of this plugin.
