import document from 'document';
import { preferences } from 'user-settings';
import { zeroPad, getMonospaceDigits } from './lib/utils';
import { darkenHex } from './lib/color';
import {
  bgColorScale,
  sunColorScale,
  moonColorScale,
  starsOpacityScale,
  hillDarkenScale
} from './lib/scales';

const timeLabel = document.getElementById('time');
const sunGroup = document.getElementById('sun-group');
const sun = document.getElementById('sun');
const moonGroup = document.getElementById('moon-group');
const moon = document.getElementById('moon');
const sky = document.getElementById('sky');
const stars = document.getElementById('stars');
const frontHill = document.getElementById('hill--front');
const backHill = document.getElementById('hill--back');

export const renderTime = ({ hours, minutes }) => {
  const displayHours = getMonospaceDigits(zeroPad(hours));
  const displayMinutes = getMonospaceDigits(zeroPad(minutes));
  timeLabel.text = `${displayHours}:${displayMinutes}`;
};

export const renderScene = ({ hours, minutes }) => {
  const showStars = hours < 7 || hours > 20;
  const timeValue = hours + minutes / 60;
  const rotationAngle = timeValue / 24 * 360 + 20;
  const hillDarkenFactor = hillDarkenScale.getValue(timeValue);

  stars.style.opacity = starsOpacityScale.getValue(timeValue);

  sky.style.fill = bgColorScale.getColor(timeValue);
  sun.style.fill = sunColorScale.getColor(timeValue);
  moon.style.fill = moonColorScale.getColor(timeValue);
  frontHill.style.fill = darkenHex('#7E905B', hillDarkenFactor);
  backHill.style.fill = darkenHex('#94A661', hillDarkenFactor);

  sunGroup.groupTransform.rotate.angle = rotationAngle;
  moonGroup.groupTransform.rotate.angle = rotationAngle + 180;
};
