import Dropdown from '../Dropdown';
import MultipleChoiceDropdown from '../MultipleDropdown';

export interface Tag{
  id: number;
  name: string;
}

export default function RandomProblem() {
  const onCountClick = (option: number) => {
    console.log(option);
  };

  const onDifficultyClick = (options: string[]) => {
    console.log(options);
  };

  const onTagClick = (options: Tag[]) => {
    console.log(options);
  };

  const tags: Tag[] = [
    {id:1, name: '0-1 너비 우선 탐색'},
    {id:2, name: '2-sat'},
    {id:3, name: '3차원 기하학'},
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <MultipleChoiceDropdown
        name={'태그'}
        options={tags}
        displayNames={tags.map((tag) => tag.name)}
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
