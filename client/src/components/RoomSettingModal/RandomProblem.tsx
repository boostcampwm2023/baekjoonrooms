import { useState } from 'react';

import { constTags } from '../../../public/tags';
import Dropdown from '../Dropdown';
import MultipleChoiceDropdown from '../MultipleDropdown';
import { randomProblem } from '../../apis/randomProblems';
import { Tag } from '../../types/Tag';
import { Difficulty, difficultyMapping } from '../../types/Difficulty';
import { ProblemType } from '../../types/ProblemType';

interface RandomProblemProps {
  problemList: ProblemType[];
  setProblemList: React.Dispatch<React.SetStateAction<ProblemType[]>>;
}

export default function RandomProblem({
  problemList,
  setProblemList,
}: RandomProblemProps) {
  const [count, setCount] = useState(1);
  const [tags, setTags] = useState<Tag[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty[]>([]);

  const constDifficulties: Difficulty[] = [
    { id: 1, name: 'Bronze' },
    { id: 2, name: 'Silver' },
    { id: 3, name: 'Gold' },
    { id: 4, name: 'Platinum' },
    { id: 5, name: 'Diamond' },
    { id: 6, name: 'Ruby' },
  ];

  const requestRandomProblem = async () => {
    if(tags.length === 0 || difficulty.length === 0) {
      alert('태그와 난이도를 선택해주세요.');
      return;
    }
    const tagIds = tags.map((tag) => tag.id);
    const difficultyIds = difficulty
      .map((diff) => diff.id)
      .flatMap((id) => difficultyMapping[id]);
    try {
      const res = await randomProblem(tagIds, difficultyIds, count);
      if(res.length === 0) {
        alert('해당 문제가 없습니다.');
        return;
      }
      const newProblems = res.map((problem) => ({
        title: problem.title,
        boj_problem_id: problem.bojProblemId,
        url: `https://www.acmicpc.net/problem/${problem.bojProblemId}`,
        level: problem.level,
        tag: problem.tags.map((tag:Tag) => tag.name),
      }));

      if (problemList.length + newProblems.length > 4) {
        alert('문제는 최대 4개까지만 등록할 수 있습니다.');
        return;
      }
      setProblemList([...problemList, ...newProblems]);
    } catch (error) {
      alert('문제를 가져오는데 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <MultipleChoiceDropdown
        name={'태그'}
        options={constTags}
        displayNames={constTags.map((tag) => tag.name)}
        selected={tags}
        setSelected={setTags}
        buttonClassName="flex w-[232px] justify-center rounded-lg border border-gutter bg-default_white px-2 py-1 text-sm text-default_black"
        itemBoxClassName="rounded-lg border border-gutter"
        itemClassName="bg-fg py-1 text-sm text-text_default hover:bg-gutter"
      />
      <div className="flex flex-row">
        <MultipleChoiceDropdown
          name={'난이도'}
          options={constDifficulties}
          displayNames={constDifficulties.map((diff) => diff.name)}
          selected={difficulty}
          setSelected={setDifficulty}
          buttonClassName="flex w-[120px] justify-center rounded-lg border border-gutter bg-default_white px-2 py-1 text-sm text-default_black"
          itemBoxClassName="rounded-lg border border-gutter"
          itemClassName="bg-fg py-1 text-sm text-text_default hover:bg-gutter"
        />
        <Dropdown
          options={[1, 2, 3, 4]}
          optionPostFix="개"
          selected={count}
          setSelected={setCount}
          buttonClassName="rounded-lg border border-gutter bg-default_white px-2 py-1 text-sm text-default_black"
          itemBoxClassName="rounded-lg border border-gutter"
          itemClassName="hover:opacity-80 bg-fg text-sm text-text_default py-1 odd:bg-gutter"
        />
        <button
          className="flex h-[30px] items-center justify-center rounded-lg bg-accent px-3 py-1 text-sm text-default_white hover:opacity-80"
          onClick={requestRandomProblem}>
          등록
        </button>
      </div>
    </div>
  );
}
