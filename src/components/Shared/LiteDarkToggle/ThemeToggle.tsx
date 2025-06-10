import * as React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/Shared/ThemeProvider';
import styles from '@/components/Shared/LiteDarkToggle/ThemeToggle.module.css'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setTheme(isChecked ? 'dark' : 'light');
  };

  return (
    // Apply the styles from the module to each element
    <label className={styles['theme-slider-switch']}>
      <input
        type="checkbox"
        onChange={handleSliderChange}
        checked={theme === 'dark'}
        aria-label="Toggle theme"
      />
      <span className={`${styles['theme-slider-slider']} ${styles.round}`}>
        <span className={styles['slider-knob']}>
          <Sun className={`${styles['sun-icon']} h-5 w-5`} />
          <Moon className={`${styles['moon-icon']} h-5 w-5`} />
        </span>
      </span>
    </label>
  );
};