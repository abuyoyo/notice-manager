# Notice Manager Changelog

## 0.26

Release date: Sep 1 2024

### Changed
- Use Mutation Observer instead of deprecated `DOMNodeRemoved` event.

### Added
- Add method `NoticeManager.bootstrap()` to initialize Notice manager.

## 0.25

Release date: Feb 18 2024

### Fixed
- Fix fatal error `Class "WPHelper\MetaBox" not found` due to dependency `abuyoyo/adminmenupage` < 0.29 not requiring dependency `abuyoyo/metabox`.

### Dependencies
- Library WPHelper\AdminPage (`abuyoyo/adminmenupage`) updated to 0.29. Requires `abuyoyo/metabox`. 

## 0.24

Release date: Oct 4 2023

### Fixed
- Set `WPHelper\PluginCore` option `update_checker` to true. If library Plugin-Update-Checker is installed, allows updates from repo.

### Dependencies
- Library WPHelper\PluginCore (`abuyoyo/plugincore`) updated to 0.27. Supports both Plugin-Update-Checker v5 and v4. 

## 0.23

### Fixed
- Fix `.plugin-count` bullet styling issue.
- Fix 0-count panel caused by collecting `.hidden` notices.
- Fix wrong priority color `.plugin-count` bullet caused by collecting `.hidden` notices.
- Fix empty notices-panel removing all screen-meta-link panels.

## 0.22

### Fixed
- Do not collect `.theme-info` notices.
- Fix `vendor/autoload` include path.

## 0.21

### Fixed
- Fix PHP 8.2 deprecated optional parameter before required parameter. Fixed upstream in `abuyoyo/screen-meta-links ~0.13`.

### Dependencies
- Update library `abuyoyo/screen-meta-links` to version 0.13.

## 0.20

### Minor
- Just another version bump (composer.json as well).

## 0.19

### Added
- Add 'Distraction Free' option.

## 0.18

### Minor
- Version bump everywhere.

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
