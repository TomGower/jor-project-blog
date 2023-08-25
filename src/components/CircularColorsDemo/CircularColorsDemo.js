'use client';
import React from 'react';
import clsx from 'clsx';
import { Play, Pause, RotateCcw } from 'react-feather';

import Card from '@/components/Card';
import VisuallyHidden from '@/components/VisuallyHidden';

import styles from './CircularColorsDemo.module.css';

const COLORS = [
  { label: 'red', value: 'hsl(348deg 100% 60%)' },
  { label: 'yellow', value: 'hsl(50deg 100% 55%)' },
  { label: 'blue', value: 'hsl(235deg 100% 65%)' },
];

function CircularColorsDemo() {
  // TODO: This value should increase by 1 every second:
  // const timeElapsed = 0;
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  // const selectedColor = COLORS[0];
  const selectedColor = COLORS[timeElapsed % 3];
  const [playStatus, setPlayStatus] = React.useState('play');

  React.useEffect(() => {
    if (playStatus === 'play') {
      function updateTime() {
        setTimeElapsed((s) => s + 1);
      }
      const timerId = setInterval(updateTime, 1000);

      return () => {
        clearInterval(timerId);
      };
    }
  }, [playStatus]);

  function pauseAnimation() {
    setPlayStatus('pause');
  }
  function playAnimation() {
    setPlayStatus('play');
  }
  function resetAnimation() {
    setTimeElapsed(0);
  }

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && <div className={styles.selectedColorOutline} />}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          {playStatus === 'play' ? (
            <button onClick={pauseAnimation}>
              <Pause />
              <VisuallyHidden>Pause</VisuallyHidden>
            </button>
          ) : (
            <button onClick={playAnimation}>
              <Play />
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
          )}
          <button onClick={resetAnimation}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
