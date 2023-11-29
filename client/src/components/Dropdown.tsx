import { Key, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

export interface DropdownProps<T> {
  options: Array<T>;
  onOptionClick: (option: T) => void;
  optionPostFix?: string;
  buttonClassName?: string;
  itemBoxClassName?: string;
  itemClassName?: string;
}

/**
 * Custom Dropdown Component
 * @param {DropdownProps<T>} props
 * @param {Array<T>} props.options dropdown items with value
 * @param {Function} props.onOptionClick callback function when dropdown item is clicked
 * @param {string} props.optionPostFix postfix of dropdown item
 * @param {string} props.buttonClassName className of dropdown button for tailwindcss
 * @param {string} props.itemBoxClassName className of dropdown item box for tailwindcss
 * @param {string} props.itemClassName className of dropdown item for tailwindcss
 *
 * @return {JSX.Element}
 */
export default function Dropdown<T>({
  options,
  onOptionClick,
  optionPostFix = '',
  buttonClassName = '',
  itemBoxClassName = '',
  itemClassName = '',
}: DropdownProps<T>): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  const [selected, setIsSelected] = useState<T>(options[0]);
  return (
    <div className="relative">
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
        className={`${itemBoxClassName} absolute overflow-hidden flex w-full`}
        style={{ display: isActive ? 'block' : 'none' }}>
        {options.map((option) => (
          <li
            key={option as Key}
            onClick={() => {
              setIsSelected(option);
              setIsActive(!isActive);
              onOptionClick(option);
            }}
            className={`${itemClassName} flex justify-center cursor-pointer`}>
            {option + optionPostFix}
          </li>
        ))}
      </ol>
    </div>
  );
}
