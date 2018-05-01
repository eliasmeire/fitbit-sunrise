import { me } from 'companion';
import { settingsStorage } from 'settings';
import * as messaging from 'messaging';
import { eventTypes, settingKeys } from '../common/shared';

messaging.peerSocket.onopen = () => {
  syncAllSettings();
};

settingsStorage.onchange = evt => {
  const event = {
    type: eventTypes.SETTING_CHANGED,
    settingsKey: evt.key,
    value: evt.newValue
  };

  sendEvent(event);
};

if (me.launchReasons.settingsChanged) {
  syncAllSettings();
}

function sendEvent(event) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(event);
  } else {
    console.log('No peerSocket connection found');
  }
}

function syncAllSettings() {
  const events = Object.keys(settingKeys).map(setting => {
    const settingsKey = settingKeys[setting];
    return {
      type: eventTypes.SETTING_CHANGED,
      settingsKey,
      value: settingsStorage.getItem(settingsKey)
    };
  });

  events.forEach(e => sendEvent(e));
}
