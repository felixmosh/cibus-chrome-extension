import { h } from 'preact';
import * as styles from './TooltipContent.scss';
import * as classNames from 'classnames';

export const TooltipContent = ({ payload, children, withCaret }: any) => {
  return (
    <div className={classNames(styles.tooltipContent, {[styles.withCaret]: withCaret})}>{children}</div>
  );
};
