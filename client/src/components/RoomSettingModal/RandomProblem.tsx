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
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <MultipleChoiceDropdown
        options={['BFS', 'DFS', '에라토스테네스의 체', '구현','비트필드를 이용한 다이나믹 프로그래밍','커넥션 프로파일을 이용한 다이나믹 프로그래밍','A','B','C','D','E','F','G','H','I','J','K','L','M','N']}
        onOptionClick={onTagClick}
        buttonClassName="flex w-[232px] justify-center rounded-lg border border-aod_gutter bg-aod_white px-2 py-1 text-sm text-aod_black"
        itemBoxClassName="rounded-lg border border-aod_gutter"
        itemClassName="bg-aod_fg py-1 text-sm text-aod_text hover:bg-aod_gutter"
      />
      <div className="flex flex-row">
        <MultipleChoiceDropdown
          options={['Bronze', 'Silver', 'Gold', 'Platinum']}
          onOptionClick={onDifficultyClick}
          buttonClassName="flex w-[120px] justify-center rounded-lg border border-aod_gutter bg-aod_white px-2 py-1 text-sm text-aod_black"
          itemBoxClassName="rounded-lg border border-aod_gutter"
          itemClassName="bg-aod_fg py-1 text-sm text-aod_text hover:bg-aod_gutter"
        />

        <Dropdown
          options={[1, 2, 3, 4]}
          onOptionClick={onCountClick}
          optionPostFix="개"
          buttonClassName="rounded-lg border border-aod_gutter bg-aod_white px-2 py-1 text-sm text-aod_black"
          itemBoxClassName="rounded-lg border border-aod_gutter"
          itemClassName="hover:opacity-80 bg-aod_fg text-sm text-aod_text py-1 odd:bg-aod_gutter"
        />
        <button className="flex items-center justify-center rounded-lg bg-aod_accent px-3 py-1 text-sm text-aod_white hover:opacity-80 h-[30px]">
          등록
        </button>
      </div>
    </div>
  );
}
