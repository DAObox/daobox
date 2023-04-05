# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.0.5-beta-0] - 2023-04-05

### Changed 
    - upgrade to @tanstack/react-query
    - add `useFetchMembersAndBalances`, hook calls the subgraph directly

## [0.0.4-beta-0] - 2023-04-02
### Changed 
    - `tokenVotingInstallItem` => `encodeTokenVotingPlugin`
    - refactored `encodeTokenVotingPlugin` to not rely on the SDK

### Added
    - encoder for `LensVotingPlugin`
    - POJO for DAOBox plugins

### Fixed
    - IPFS nodes user configuration

## [0.0.3-beta-12] - 2023-03-31

### Added
- support for Polygon and Mumbai
- user defined IPFS nodes
- added missing enum `DaoSortBy` from `@aragon/sdk-client`
    


## [0.0.3-beta-8] - 2023-03-27

### Fix
- added missing types from `@aragon/sdk-client`
    `VoteValues`
    `SortDirection`

### Added
- `tokenVotingInstallItem`: encodes data to install the plugin in a DAO
- `arbitratorPluginInstallItem`: encodes data to install an Aragon plugin in a DAO
- `daoActionEncoder`: creates a list of actions the DAO should make

### Changed
- `encodeTokenVotingPlugin`: implemented internally, no longer relies on the SDK

## [0.0.3-beta-7] - 2023-03-27

### Added

- exports for the `@aragon/sdk-client` types
- types from dist as a workarount to [this issue](https://github.com/aragon/sdk/issues/169)
