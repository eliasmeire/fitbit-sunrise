import document from 'document';
import { preferences } from 'user-settings';
import { zeroPad, getMonospaceDigits } from './lib/utils';
import {
  bgColorScale,
  sunColorScale,
  moonColorScale,
  starsOpacityScale
} from './lib/scales';

const timeLabel = document.getElementById('time');
const sunGroup = document.getElementById('sun-group');
const sun = document.getElementById('sun');
const moonGroup = document.getElementById('moon-group');
const moon = document.getElementById('moon');
const sky = document.getElementById('sky');
const stars = document.getElementById('stars');

export const renderTime = ({ hours, minutes }) => {
  const displayHours = getMonospaceDigits(zeroPad(hours));
  const displayMinutes = getMonospaceDigits(zeroPad(minutes));
  timeLabel.text = `${displayHours}:${displayMinutes}`;
};

export const renderScene = ({ hours, minutes }) => {
  const showStars = hours < 7 || hours > 20;
  const timeValue = hours + minutes / 60;
  const rotationAngle = timeValue / 24 * 360 + 20;

  stars.style.opacity = starsOpacityScale.getValue(timeValue);
  sky.style.fill = bgColorScale.getColor(timeValue);
  sun.style.fill = sunColorScale.getColor(timeValue);
  moon.style.fill = moonColorScale.getColor(timeValue);
  sunGroup.groupTransform.rotate.angle = rotationAngle;
  moonGroup.groupTransform.rotate.angle = rotationAngle + 180;
};
