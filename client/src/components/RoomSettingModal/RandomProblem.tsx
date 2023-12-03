import Dropdown from '../Dropdown';
import MultipleChoiceDropdown from '../MultipleDropdown';

export default function RandomProblem() {
  const onCountClick = (option: number) => {
    console.log(option);
  };

  const onDifficultyClick = (options: string[]) => {
    console.log(options);
  };

  const onTagClick = (options: string[]) => {
    console.log(options);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <MultipleChoiceDropdown
        name={'태그'}
        options={[
          'BFS',
          'DFS',
          '에라토스테네스의 체',
          '구현',
          '비트필드를 이용한 다이나믹 프로그래밍',
          '커넥션 프로파일을 이용한 다이나믹 프로그래밍',
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
        ]}
        onOptionClick={onTagClick}
        buttonClassName="flex w-[232px] justify-center rounded-lg border border-gutter bg-default_white px-2 py-1 text-sm text-default_black"
        itemBoxClassName="rounded-lg border border-gutter"
        itemClassName="bg-fg py-1 text-sm text-text_default hover:bg-gutter"
      />
      <div className="flex flex-row">
        <MultipleChoiceDropdown
          name={'난이도'}
          options={['Bronze', 'Silver', 'Gold', 'Platinum']}
          onOptionClick={onDifficultyClick}
          buttonClassName="flex w-[120px] justify-center rounded-lg border border-gutter bg-default_white px-2 py-1 text-sm text-default_black"
          itemBoxClassName="rounded-lg border border-gutter"
          itemClassName="bg-fg py-1 text-sm text-text_default hover:bg-gutter"
        />

        <Dropdown
          options={[1, 2, 3, 4]}
          onOptionClick={onCountClick}
          optionPostFix="개"
          buttonClassName="rounded-lg border border-gutter bg-default_white px-2 py-1 text-sm text-default_black"
          itemBoxClassName="rounded-lg border border-gutter"
          itemClassName="hover:opacity-80 bg-fg text-sm text-text_default py-1 odd:bg-gutter"
        />
        <button className="bg-accent text-default_white flex h-[30px] items-center justify-center rounded-lg px-3 py-1 text-sm hover:opacity-80">
          등록
        </button>
      </div>
    </div>
  );
}
