import { h } from 'preact';
import * as styles from './TooltipContent.scss';
import cn from 'clsx';

export const TooltipContent = ({ children, withCaret }: any) => {
  return (
    <div
      className={cn(styles.tooltipContent, {
        [styles.withCaret]: withCaret,
      })}
    >
      {children}
    </div>
  );
};
