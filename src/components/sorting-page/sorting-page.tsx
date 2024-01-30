import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { sleep } from "../../utils/sleep";
import { TColumn } from "../../types/types";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css"

export const SortingPage: React.FC = () => {
  const [sortingMethod, setSortingMethod] = useState<"selectionSort" | "bubbleSort">("selectionSort");
  const [sortArray, setSortArray] = useState<TColumn[]>([]);
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [sortingDirection, setSortingDirection] = useState<"asc" | "desc" | null>(null);

  const minArrayLength = 3;
  const maxArrayLength = 17;

  const getRandomArr = (minLength: number, maxLength: number) => {
    const rdmLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
    const rdmNumsArray = Array.from(
      {
        length: rdmLength,
      },
      () => Math.floor(Math.random() * 100)
    );
    const columnsArray = rdmNumsArray.map((value) => ({
      value,
      state: ElementStates.Default,
    }));

    return columnsArray;
  };

  const setNewArray = async () => {
    setInProgress(true); // устанавливаем inProgress в true перед обновлением массива
    setSortingDirection(null);
    await setSortArray(getRandomArr(minArrayLength, maxArrayLength)); // ожидаем обновление массива
    setInProgress(false); // устанавливаем inProgress в false после завершения обновления массива
  };

  useEffect(() => {
    setSortArray(getRandomArr(minArrayLength, maxArrayLength));
  }, []);

  const bubbleSort = async (array: TColumn[], direction: "asc" | "desc") => {
    for (let i = 0; i < array.length; i += 1) {
      for (let j = 0; j < array.length - i - 1; j += 1) {
        array[j].state = ElementStates.Changing;
        if (array[j + 1]) array[j + 1].state = ElementStates.Changing;

        setSortArray([...array]);
        await sleep(SHORT_DELAY_IN_MS);
        if (
          (direction === "asc" && array[j].value > array[j + 1]?.value) ||
          (direction === "desc" && array[j].value < array[j + 1]?.value)
        ) {
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
        }

        array[j].state = ElementStates.Default;
        if (array[j + 1]) array[j + 1].state = ElementStates.Default;
        setSortArray([...array]);
      }
      array[array.length - i - 1].state = ElementStates.Modified;
      setSortArray([...array]);
    }
  };

  const selectionSort = async (array: TColumn[], direction: "asc" | "desc") => {
    for (let i = 0; i < array.length; i += 1) {
      let min = i;
      array[min].state = ElementStates.Changing;
      for (let j = i + 1; j < array.length; j += 1) {
        array[j].state = ElementStates.Changing;
        setSortArray([...array]);
        await sleep(SHORT_DELAY_IN_MS);
        if (
          (direction === "asc" && array[j].value < array[min].value) ||
          (direction === "desc" && array[j].value > array[min].value)
        ) {
          min = j;
          array[j].state = ElementStates.Changing;
          array[min].state =
            i === min ? ElementStates.Changing : ElementStates.Default;
        }
        if (j !== min) array[j].state = ElementStates.Default;

        setSortArray([...array]);
      }

      const tmp = array[i];
      array[i] = array[min];
      array[min] = tmp;

      array[min].state = ElementStates.Default;
      array[i].state = ElementStates.Modified;
      setSortArray([...array]);
    }
  };

  const ascSort = async () => {
    setInProgress(true);
    setSortingDirection('asc');
    if (sortingMethod === "bubbleSort") {
      await bubbleSort(sortArray, "asc"); 
    }
    if (sortingMethod === "selectionSort") {
      await selectionSort(sortArray, "asc"); 
    }
    setInProgress(false);
  };

  const descSort = async () => {
    setInProgress(true);
    setSortingDirection('desc');
    if (sortingMethod === "bubbleSort") {
      await bubbleSort(sortArray, "desc"); 
    }
    if (sortingMethod === "selectionSort") {
      await selectionSort(sortArray, "desc"); 
    }
    setInProgress(false);
  };

  return <SolutionLayout title="Сортировка массива">
  <div className={`${styles.sortPage}`}>
    <form className={`${styles.sortPage__form}`}>
      <RadioInput
        onChange={() => setSortingMethod('selectionSort')}
        checked={sortingMethod === 'selectionSort'}
        name="sortingMethod"
        label="Выбор"
        disabled={inProgress}
      />
      <RadioInput
        onChange={() => setSortingMethod('bubbleSort')}
        checked={sortingMethod === 'bubbleSort'}
        name="sortingMethod"
        label="Пузырёк"
        disabled={inProgress}
      />
      <Button isLoader={inProgress && sortingDirection === 'asc'} onClick={ascSort} type="button" text="По возрастанию" sorting={Direction.Ascending} disabled={inProgress}/>
      <Button isLoader={inProgress && sortingDirection === 'desc'} onClick={descSort} type="button" text="По убыванию" sorting={Direction.Descending} disabled={inProgress}/>
      <Button isLoader={inProgress && sortingDirection === null} onClick={setNewArray} text="Новый массив" disabled={inProgress}/>
    </form>
    <ul className={`${styles.sortPage__columns}`}>
      {sortArray && sortArray.map((item, index) => (
        <li key={index}>
          <Column index={item.value} state={item.state} />
        </li>
      ))}
    </ul>
  </div>
</SolutionLayout>;
};
