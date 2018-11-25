import { h } from 'preact';
import * as styles from './MonthNavigation.scss';
interface IMonthNavigationProps {
  currentDate: Date;
  onClickPrev: () => void;
  onClickNext: () => void;
}
export const MonthNavigation = ({ currentDate, onClickNext, onClickPrev }: IMonthNavigationProps) => {
  return (
    <nav className={styles.monthNavigation}>
      <button onClick={onClickPrev} className={styles.button}>❮</button>
      <span>{currentDate.toLocaleDateString('he-IL', { month: 'long' })}</span>
      <button onClick={onClickNext} className={styles.button}>❯</button>
    </nav>
  );
};
