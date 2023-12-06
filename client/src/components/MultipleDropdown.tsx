import { useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaAngleUp, FaCheck } from 'react-icons/fa6';

export interface MultipleChoiceDropdownProps<T> {
  name: string;
  options: Array<T>;
  displayNames: string[];
  selected: T[];
  setSelected: React.Dispatch<React.SetStateAction<T[]>>;
  optionPostFix?: string;
  buttonClassName?: string;
  itemBoxClassName?: string;
  itemClassName?: string;
}

interface Identifiable {
  id: string | number;
}

/**
 * Custom MultipleChoiceDropdown Component
 * @param {MultipleChoiceDropdownProps<T>} props
 * @param {string} props.name name of dropdown
 * @param {Array<T>} props.options dropdown items with value
 * @param {string[]} props.displayNames displayname of dropdown
 * @param {string} props.optionPostFix postfix of dropdown item
 * @param {string} props.buttonClassName className of dropdown button for tailwindcss
 * @param {string} props.itemBoxClassName className of dropdown item box for tailwindcss
 * @param {string} props.itemClassName className of dropdown item for tailwindcss
 *
 * @return {JSX.Element}
 */

export default function MultipleChoiceDropdown<T extends Identifiable>({
  name,
  options,
  displayNames,
  selected,
  setSelected,
  optionPostFix = '',
  buttonClassName = '',
  itemBoxClassName = '',
  itemClassName = '',
}: MultipleChoiceDropdownProps<T>): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: T) => {
    if (selected.some((o) => o.id === option.id)) {
      setSelected(selected.filter((o) => o.id !== option.id));
    } else {
      setSelected([...selected, option]);
    }
  };

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
          {(selected.length > 0)? `${selected.length}개 선택됨` : `${name}`}
          <div className="w-4">
            {isActive ? <FaAngleUp /> : <FaAngleDown />}
          </div>
        </div>
      </div>
      <ol
        className={`${itemBoxClassName} absolute z-10 flex max-h-[320px] w-full overflow-auto`}
        style={{ display: isActive ? 'block' : 'none' }}>
        {options.map((option, index) => (
          <li
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className={`${itemClassName} flex cursor-pointer items-center justify-between`}>
            <div className={`w-4 p-1`}>
              <FaCheck
                color={
                  selected.some((o) => o.id === option.id) ? 'green' : 'gray'
                }
              />
            </div>
            <div className="flex-grow overflow-hidden overflow-ellipsis whitespace-nowrap px-1 text-center hover:whitespace-normal">
              {displayNames === undefined
                ? option + optionPostFix
                : displayNames[index] + optionPostFix}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
