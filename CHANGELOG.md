# Notice Manager Changelog

## 0.17

### Removed
- Remove plugin update checker.
- Remove 3rd party libraries.

## 0.16

### Added
- Add plugin action link to Notice Manager settings page.

## 0.15

### Added
- Add BSD 3-Clause License file.
- Add `vendor` directory and require `vendor/autoload.php`.
- Add `Update URI` header to plugin to avoid conflict with wp.org repo plugin of the same name.

### Changed
- Convert stylesheet to SCSS and use `node-sass` to render css file.
- Better option descriptions on settings page.
- Readme file - add detailed plugin description.
- Support `.notice-error` class.
- Do not count hidden notices in `.plugin-count` bullet.

## 0.14

### Added
- Added `above_title` setting - move all scripts above title.
- Added `.plugin_count` bullet to panel tab - showing number of notices in panel and priority.

### Changed
- Improve "jumpy" notices when page is loaded with certain setting combinations by selectively setting css `display: none` to notices not in their expected location.
- Improve integration between different options (eg. `above_title` with `auto-collect`).
- Option `auto-collapse` will not automatically collapse panel if an error notice is showing.

## 0.13

### Changed
- Always show "Dismiss notices" button in panel.

### Dependencies
- use `wph_add_screen_meta_panels`
- include `abuyoyo/screen-meta-links` as vendor library instead of plugin.

## 0.10
- Remove screen-meta-link panel if no notices on page.
- Remove delayed `scrollTop()` script.

## 0.9
- Initial release.
