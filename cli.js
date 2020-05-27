const fs = require('fs-extra');
const { exec } = require('child_process');

const config = require('./user.config.json');

const { sourceLocation, sandboxLocation } = config;
const arg1 = process.argv[2];
const arg2 = process.argv.length > 3 ? process.argv[3] : '';

const sync = (sourceFullPath, sandboxFullPath, messages = { begin: 'Syncing', end: 'Finished', commit: 'synced' }) => {
  console.log(messages.begin);
  fs.copySync(sourceFullPath, sandboxFullPath);
  exec(`cd ${sandboxFullPath}; git add .; git commit -m "${messages.commit}";`);
  console.log(messages.end);
};

switch (arg1) {
  case "--sync-plugins":
    const pluginsPath = '/config/studio/plugins'
    sync(`${sourceLocation}${pluginsPath}`, `${sandboxLocation}${pluginsPath}`, {
      begin: 'Syncing plugins...',
      end: 'Plugins synced',
      commit: 'plugins synced'
    });
    break;

  case "--sync-content-types":
    const contentTypesPath = '/config/studio/content-types'
    sync(`${sourceLocation}${contentTypesPath}`, `${sandboxLocation}${contentTypesPath}`, {
      begin: 'Syncing content types...',
      end: 'Content types synced',
      commit: 'content types synced'
    });
    break;

  case "--sync-administration-config":
      const administrationConfigPath = '/config/studio/administration'
      sync(`${sourceLocation}${administrationConfigPath}`, `${sandboxLocation}${administrationConfigPath}`, {
        begin: 'Syncing administration config...',
        end: 'Administration config synced',
        commit: 'Administration config synced'
      });
      break;

  case "--sync-form-control-config":
    const formControlConfigPath = '/config/studio/form-control-config'
    sync(`${sourceLocation}${formControlConfigPath}`, `${sandboxLocation}${formControlConfigPath}`, {
      begin: 'Syncing form controls config...',
      end: 'Form controls config synced',
      commit: 'Form controls config synced'
    });
    break;

  case "--sync-static-assets":
    const staticAssetsPath = `/static-assets${arg2}`; // if no arg2 provide entire static assets folder is synced
    sync(`${sourceLocation}${staticAssetsPath}`, `${sandboxLocation}${staticAssetsPath}`, {
      begin: 'Syncing static assets...',
      end: 'Static assets synced',
      commit: 'Static assets synced'
    });
    break;
  default:
    console.log(process.argv);
    throw new Error('Wrong arguments')
}
