# Notice Manager Changelog

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
