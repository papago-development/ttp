# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.2.2](https://github.com/ionstarter/angular-firebase-starter/compare/v2.2.1...v2.2.2) (2024-06-28)


### Bug Fixes

* **tasks:** disable queries when deleting a task to prevent refetch ([523f94f](https://github.com/ionstarter/angular-firebase-starter/commit/523f94f3a6cf906e2377b3435fa1a2af1b554ca8))

## [2.2.1](https://github.com/ionstarter/angular-firebase-starter/compare/v2.2.0...v2.2.1) (2024-06-07)


### Bug Fixes

* update theme service to use ion-palette-dark class ([d0dbfdc](https://github.com/ionstarter/angular-firebase-starter/commit/d0dbfdc2c163b8188f745c456dc5ed0f36e67934))

## [2.2.0](https://github.com/ionstarter/angular-firebase-starter/compare/v2.1.0...v2.2.0) (2024-06-04)


### Features

* support Live Updates ([#25](https://github.com/ionstarter/angular-firebase-starter/issues/25)) ([365535d](https://github.com/ionstarter/angular-firebase-starter/commit/365535dd24d0a6509b23c1f24cc078d5f0a34499))
* support Splash Screen ([#26](https://github.com/ionstarter/angular-firebase-starter/issues/26)) ([9aa4d25](https://github.com/ionstarter/angular-firebase-starter/commit/9aa4d25ced59f64742ca870909e3b76b5a9c8d7a))
* update to Ionic Framework 8 ([#27](https://github.com/ionstarter/angular-firebase-starter/issues/27)) ([a2de1dc](https://github.com/ionstarter/angular-firebase-starter/commit/a2de1dc8f5d1c6d05ae280852c03c1273d64eed0))

## [2.1.0](https://github.com/ionstarter/angular-firebase-starter/compare/v2.0.0...v2.1.0) (2024-05-27)


### Features

* integrate Firebase Analytics ([#21](https://github.com/ionstarter/angular-firebase-starter/issues/21)) ([006a0f3](https://github.com/ionstarter/angular-firebase-starter/commit/006a0f332b89fe1d95395f1e2f4d6700d57dd112))


### Bug Fixes

* **tasks:** throw on error ([#24](https://github.com/ionstarter/angular-firebase-starter/issues/24)) ([b655fd1](https://github.com/ionstarter/angular-firebase-starter/commit/b655fd1f2a224c6dc639265aded89d6a02cf7140))

## [2.0.0](https://github.com/ionstarter/angular-firebase-starter/compare/v1.4.0...v2.0.0) (2024-04-20)


### ⚠ BREAKING CHANGES

* update to Capacitor 6 (#19)

### Features

* update to Capacitor 6 ([#19](https://github.com/ionstarter/angular-firebase-starter/issues/19)) ([8c197b4](https://github.com/ionstarter/angular-firebase-starter/commit/8c197b404666e9b3cf8f97840ad4f3a0fb54ad21))


### Bug Fixes

* **core:** ignore `Directory exists` error on Android ([414f7e5](https://github.com/ionstarter/angular-firebase-starter/commit/414f7e540b09d70a761a53cfe8ad00c4f3627cd2))

## [1.4.0](https://github.com/ionstarter/angular-firebase-starter/compare/v1.3.0...v1.4.0) (2024-04-20)


### Features

* add `minlength` attribute to password fields ([06d166a](https://github.com/ionstarter/angular-firebase-starter/commit/06d166aaa869982c157006ca0aaf12d31376bc02))


### Bug Fixes

* parse `CapacitorException` correctly ([#17](https://github.com/ionstarter/angular-firebase-starter/issues/17)) ([0be5113](https://github.com/ionstarter/angular-firebase-starter/commit/0be5113bdd5fb7aa7d0960e4a50430fc4827458b))
* **profile:** error message was not displayed ([#18](https://github.com/ionstarter/angular-firebase-starter/issues/18)) ([9339057](https://github.com/ionstarter/angular-firebase-starter/commit/93390578e90cbcfa15ccbf4d1736605f39ee1d71))

## [1.3.0](https://github.com/ionstarter/angular-firebase-starter/compare/v1.2.0...v1.3.0) (2024-03-27)


### Features

* parse `auth/invalid-credential` error ([8b77944](https://github.com/ionstarter/angular-firebase-starter/commit/8b77944fb25f5b85c362f1046468ca34f4dfad0f))
* **tasks:** add loading animation ([#11](https://github.com/ionstarter/angular-firebase-starter/issues/11)) ([1b2a3de](https://github.com/ionstarter/angular-firebase-starter/commit/1b2a3de8bf5b16b92c2232f2099bd4b92ddd54d9))

## [1.2.0](https://github.com/ionstarter/angular-firebase-starter/compare/v1.1.1...v1.2.0) (2024-03-18)


### Features

* **widgets:** add `appOpenUrl` directive ([#10](https://github.com/ionstarter/angular-firebase-starter/issues/10)) ([7a0b024](https://github.com/ionstarter/angular-firebase-starter/commit/7a0b024c96ea212c0e477335a46a8ad157822760))


### Bug Fixes

* add missing icon ([db25a19](https://github.com/ionstarter/angular-firebase-starter/commit/db25a196fc6a51147ade24d54afaafd773576f3b))
* add missing translations ([166c067](https://github.com/ionstarter/angular-firebase-starter/commit/166c067fd324da0e1b7056a18b63f17ccc23bdc1)), closes [#8](https://github.com/ionstarter/angular-firebase-starter/issues/8)
* remove the Firebase web configuration on setup ([f314c84](https://github.com/ionstarter/angular-firebase-starter/commit/f314c84bdfab60e44433059c9e2f12b7a08fb6f3))
* **scripts:** remove unnecessary configuration files on setup [skip ci] ([a02c23a](https://github.com/ionstarter/angular-firebase-starter/commit/a02c23aa2b7808f5c3f7cce852d1463d5fc937bf))
* **setup:** set development team to an empty string ([8136547](https://github.com/ionstarter/angular-firebase-starter/commit/81365479fa0bf51811e818d2cdd1eb78f2f66255))

## [1.1.1](https://github.com/ionstarter/angular-firebase-starter/compare/v1.1.0...v1.1.1) (2024-02-23)


### Bug Fixes

* **i18n:** add correct translation for `and` ([a1a1d48](https://github.com/ionstarter/angular-firebase-starter/commit/a1a1d48ba2dcf4fa0daa0ed7de8dc70b70acd4fe))
* **login:** add missing whitespace ([38ea39f](https://github.com/ionstarter/angular-firebase-starter/commit/38ea39fbafe8ce65d748b6df365d9dfb51f61966))
* **register:** add missing whitespace ([3f39b1f](https://github.com/ionstarter/angular-firebase-starter/commit/3f39b1f4cd0cb056b033630216fea47e1ecde235))

## [1.1.0](https://github.com/ionstarter/angular-firebase-starter/compare/v1.0.0...v1.1.0) (2024-02-13)


### Features

* **core:** add translation for `auth/popup-closed-by-user` error ([b5b806e](https://github.com/ionstarter/angular-firebase-starter/commit/b5b806e0e443837188dbb35dd13646e5d624af1c))
* **core:** throw error if file size exceeded ([77b1d46](https://github.com/ionstarter/angular-firebase-starter/commit/77b1d465e5418c7ef63b643e73cccf7c2776f420))
* set change detection strategy to `OnPush` ([cb87fac](https://github.com/ionstarter/angular-firebase-starter/commit/cb87fac0bd012bc03fec162fe3ce30fd6942721e))
* **tasks:** disable `close` button if form is dirty ([2223ab5](https://github.com/ionstarter/angular-firebase-starter/commit/2223ab5b6b39a4bf3b089842b2583d570ba54a43))
* **tasks:** prevent modal dismiss via gesture or backdrop ([b653322](https://github.com/ionstarter/angular-firebase-starter/commit/b653322b68d1c580d63b95e87e8076bb1af6b240))


### Bug Fixes

* **ci:** set correct step name ([19c105e](https://github.com/ionstarter/angular-firebase-starter/commit/19c105e3fd4293d83708b5e210ab8732d3e69cd9))
* **tasks:** mark form as dirty on file deletion ([dfa8555](https://github.com/ionstarter/angular-firebase-starter/commit/dfa8555b6b66c7d0acc28057ca566423e31d68a1))
* **tasks:** set `lines` property ([00541e9](https://github.com/ionstarter/angular-firebase-starter/commit/00541e91d1ab92dd2dee88ad39ad5a80406dbe84))

## 1.0.0 (2024-02-12)

Initial release 🎉
