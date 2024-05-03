import { Key, useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

export interface DropdownProps<T> {
  options: Array<T>;
  optionPostFix?: string;
  selected: T;
  setSelected: (value: T) => void | React.Dispatch<React.SetStateAction<T>>;
  buttonClassName?: string;
  itemBoxClassName?: string;
  itemClassName?: string;
}

/**
 * Custom Dropdown Component
 * @param {DropdownProps<T>} props
 * @param {Array<T>} props.options dropdown items with value
 * @param {string} props.optionPostFix postfix of dropdown item
 * @param {T} props.selected selected item
 * @param {function(T):void | React.Dispatch<React.SetStateAction<T>> } props.setSelected set selected item
 * @param {string} props.buttonClassName className of dropdown button for tailwindcss
 * @param {string} props.itemBoxClassName className of dropdown item box for tailwindcss
 * @param {string} props.itemClassName className of dropdown item for tailwindcss
 *
 * @return {JSX.Element}
 */
export default function Dropdown<T>({
  options,
  selected,
  setSelected,
  optionPostFix = '',
  buttonClassName = '',
  itemBoxClassName = '',
  itemClassName = '',
}: DropdownProps<T>): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownOutsideClick = (event: MouseEvent) => {
    const targetElement = document.elementFromPoint(
      event.clientX,
      event.clientY,
    );

    if (dropdownRef.current && !dropdownRef.current.contains(targetElement)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', dropdownOutsideClick);

    return () => {
      document.removeEventListener('click', dropdownOutsideClick);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className={`${buttonClassName} cursor-pointer`}>
        <div className="flex flex-row items-center gap-2">
          {selected + optionPostFix}
          {isActive ? <FaAngleUp /> : <FaAngleDown />}
        </div>
      </div>
      <ol
        className={`${itemBoxClassName} absolute flex w-full overflow-hidden`}
        style={{ display: isActive ? 'block' : 'none' }}>
        {options.map((option) => (
          <li
            key={option as Key}
            onClick={() => {
              setSelected(option);
              setIsActive(!isActive);
            }}
            className={`${itemClassName} flex cursor-pointer justify-center`}>
            {option + optionPostFix}
          </li>
        ))}
      </ol>
    </div>
  );
}
