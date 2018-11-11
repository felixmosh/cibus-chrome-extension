import { h } from 'preact';
import * as classNames from 'classnames';
import * as s from './Header.scss';

export interface IHeaderProps {
  firstname: string;
  lastname: string;
}

export const Header = ({ firstname = '', lastname = '' }: IHeaderProps) => {
  const fullname = `${firstname} ${lastname}`.trim();
  return (
    <header className={classNames(s.header, { [s.hasName]: fullname })}>
      {fullname && (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 51 34"
            width="30px"
            height="20px"
            className={s.icon}
          >
            <g data-name="Layer 2">
              <g data-name="Layer 1">
                <rect
                  x=".5"
                  y=".5"
                  width="50"
                  height="33"
                  rx="8.19"
                  fill="none"
                  stroke="#666"
                  stroke-miterlimit="10"
                />
                <path
                  fill="none"
                  stroke="#666"
                  stroke-miterlimit="10"
                  stroke-width="2"
                  d="M27.5 9.5h23M27.5 14.5h23M28.5 19.5h22M31.5 24.5h19"
                />
                <circle cx="18" cy="11" r="5.5" fill="#666" />
                <path
                  d="M6.5 29.5s1-13 11.92-13c9.08 0 11.08 13 11.08 13z"
                  fill="#666"
                />
              </g>
            </g>
          </svg>
          שלום<strong>{fullname}</strong>
        </span>
      )}
    </header>
  );
};
