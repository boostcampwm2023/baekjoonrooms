import { Key, useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp, FaCheck } from 'react-icons/fa6';

export interface MultipleChoiceDropdownProps<T> {
  name: string;
  options: Array<T>;
  onOptionClick: (option: T[]) => void;
  optionPostFix?: string;
  buttonClassName?: string;
  itemBoxClassName?: string;
  itemClassName?: string;
}

/**
 * Custom MultipleChoiceDropdown Component
 * @param {MultipleChoiceDropdownProps<T>} props
 * @param {string} props.name name of dropdown
 * @param {Array<T>} props.options dropdown items with value
 * @param {Function} props.onOptionClick callback function when dropdown item is clicked
 * @param {string} props.optionPostFix postfix of dropdown item
 * @param {string} props.buttonClassName className of dropdown button for tailwindcss
 * @param {string} props.itemBoxClassName className of dropdown item box for tailwindcss
 * @param {string} props.itemClassName className of dropdown item for tailwindcss
 *
 * @return {JSX.Element}
 */

export default function MultipleChoiceDropdown<T>({
  name,
  options,
  onOptionClick,
  optionPostFix = '',
  buttonClassName = '',
  itemBoxClassName = '',
  itemClassName = '',
}: MultipleChoiceDropdownProps<T>): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState<T[]>([]);

  const handleOptionClick = (option: T) => {
    setSelected((prevSelected) => {
      let newSelected;
      if (prevSelected.includes(option)) {
        newSelected = prevSelected.filter((o) => o !== option);
      } else {
        newSelected = [...prevSelected, option];
      }

      // Sort the selected options in the order they appear in the options array
      newSelected.sort((a, b) => options.indexOf(a) - options.indexOf(b));

      return newSelected;
    });
  };

  // Wrap onOptionClick with useEffect to prevent exhaustive-deps - https://github.com/facebook/react/issues/14920
  useEffect(() => {
    const callback = () => {
      onOptionClick(selected);
    };
    callback();
  }, [onOptionClick, selected]);

  return (
    <div className="relative">
      <div
        onClick={() => {
          setIsActive(!isActive);
        }}
        className={`${buttonClassName} cursor-pointer`}>
        <div className="flex flex-row items-center gap-2">
          <div>{`${name}`}</div>
          <div className="w-4">
            {isActive ? <FaAngleUp /> : <FaAngleDown />}
          </div>
        </div>
      </div>
      <ol
        className={`${itemBoxClassName} absolute z-10 flex w-full overflow-auto max-h-[320px]`}
        style={{ display: isActive ? 'block' : 'none' }}>
        {options.map((option) => (
          <li
            key={option as Key}
            onClick={() => handleOptionClick(option)}
            className={`${itemClassName} flex cursor-pointer justify-between items-center`}>
            <div className={`w-4 p-1`}>
              <FaCheck color={selected.includes(option) ? "green" : "gray"} />
            </div>
            <div className="flex-grow text-center px-1 overflow-hidden overflow-ellipsis whitespace-nowrap hover:whitespace-normal">
              {option + optionPostFix}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
