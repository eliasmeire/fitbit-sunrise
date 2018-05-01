import * as messaging from 'messaging';
import clock from 'clock';
import { parseDate } from './lib/utils';
import { renderTime, renderScene } from './render';
import { eventTypes, settingKeys } from '../common/shared';
import { FakeClock } from './lib/fakeClock';

// Improvements:
// - position sun and moon based on location (colors as well)
// - incorporate weather data i.e. show rain, clouds...
// - settings for colors

let fakeClock = {};
clock.granularity = 'minutes';

messaging.peerSocket.onmessage = ({ data }) => {
  switch (data.type) {
    case eventTypes.SETTING_CHANGED:
      if (data.settingsKey === settingKeys.LUDICROUS) {
        clock.ontick = undefined;
        fakeClock.ontick = undefined;
        start(data.value === 'true');
      }
      break;
  }
};

const render = event => {
  const date = parseDate(event.date);
  renderTime(date);
  renderScene(date);
};

function start(ludicrousMode) {
  if (ludicrousMode) {
    fakeClock = new FakeClock();
    fakeClock.ontick = render;
  } else {
    render({ date: new Date() });
    clock.ontick = render;
  }
}

start(false);
