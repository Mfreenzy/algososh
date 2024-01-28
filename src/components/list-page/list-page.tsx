import React, { FormEvent, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { LinkedList } from "./linkList";
import { ElementColors, position, TCircle } from "../../types/types";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/delay";
import { ArrowIcon } from "../ui/icons/arrow-icon";

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputIdx, setInputIdx] = useState("");
  const [inputValueIdx, setInputValueIdx] = useState<number>();
  const [isActive, setActive] = useState(false);
  const [isAddingToHead, setIsAddingToHead] = useState(false);
  const [isAddingToTail, setIsAddingToTail] = useState(false);
  const [isRemoveFromHead, setIsRemoveFromHead] = useState(false);
  const [isRemoveFromTail, setIsRemoveFromTail] = useState(false);
  const [isInsertByIndex, setIsInsertByIndex] = useState(false);
  const [isRemoveByIndex, setIsRemoveByIndex] = useState(false);
  const [tempValue, setTempValue] = useState("");

  const initialValues = useMemo(() => ["0", "34", "8", "1"], []);
  const list = useMemo(
    () => new LinkedList<string>(initialValues),
    [initialValues]
  );
  const [arrayWithState, setArrayWithState] = useState<TCircle[]>(
    list.getArrayWithState()
  );

  const handleInputValChange = (e: FormEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleInputIdxChange = (e: FormEvent<HTMLInputElement>) => {
    setInputIdx(e.currentTarget.value);
  };

  const prepend = async () => {
    if (inputValue) {
      setActive(true);
      setIsAddingToHead(true);
      setInputValueIdx(0);
      await delay(SHORT_DELAY_IN_MS);

      list.prepend(inputValue);
      setIsAddingToHead(false);
      const arrayWithState = list.getArrayWithState();
      arrayWithState[0].state = ElementStates.Modified;
      setArrayWithState(arrayWithState);
      await delay(SHORT_DELAY_IN_MS);

      arrayWithState[0].state = ElementStates.Default;
      setArrayWithState(arrayWithState);
    }
    setInputValue("");
    setActive(false);
  };

  const append = async () => {
    if (inputValue) {
      setActive(true);
      setIsAddingToTail(true);
      setInputValueIdx(list.getSize - 1);
      await delay(SHORT_DELAY_IN_MS);

      list.append(inputValue);
      setIsAddingToTail(false);
      const arrayWithState = list.getArrayWithState();
      arrayWithState[arrayWithState.length - 1].state = ElementStates.Modified;
      setArrayWithState(arrayWithState);
      await delay(SHORT_DELAY_IN_MS);

      arrayWithState[arrayWithState.length - 1].state = ElementStates.Default;
      setArrayWithState(arrayWithState);
    }
    setInputValue("");
    setActive(false);
  };

  const shift = async () => {
    if (list.getSize) {
      const arrayWithState = list.getArrayWithState();
      setActive(true);
      setIsRemoveFromHead(true);
      setInputValueIdx(0);
      arrayWithState[0].item = "";
      setArrayWithState(arrayWithState);
      await delay(SHORT_DELAY_IN_MS);
      list.shift();
      setIsRemoveFromHead(false);
      setArrayWithState(list.getArrayWithState());
    }
    setActive(false);
  };

  const pop = async () => {
    if (list.getSize) {
      const arrayWithState = list.getArrayWithState();
      setTempValue(arrayWithState[arrayWithState.length - 1].item);
      setActive(true);
      setIsRemoveFromTail(true);
      setInputValueIdx(list.getSize - 1);

      arrayWithState[arrayWithState.length - 1].item = "";
      setArrayWithState(arrayWithState);
      await delay(SHORT_DELAY_IN_MS);

      list.pop();
      setIsRemoveFromTail(false);
      setArrayWithState(list.getArrayWithState());
    }
    setActive(false);
  };

  const addByIndex = async () => {
    const numericIdx = parseInt(inputIdx);
    if (numericIdx > list.getSize) return;

    setActive(true);
    setIsInsertByIndex(true);

    const arrayWithState = list.getArrayWithState();
    for (let i = 0; i < numericIdx; i++) {
      setInputValueIdx(i);
      await delay(SHORT_DELAY_IN_MS);
      if (i < numericIdx) {
        arrayWithState[i].state = ElementStates.Changing;
        setArrayWithState(arrayWithState);
      }
    }
    setIsInsertByIndex(false);
    setInputValueIdx(parseInt(""));
    list.insertByIndex(inputValue, numericIdx);
    const newArrayWithState = list.getArrayWithState();
    newArrayWithState[numericIdx].state = ElementStates.Modified;

    setArrayWithState(newArrayWithState);
    await delay(SHORT_DELAY_IN_MS);
    newArrayWithState[numericIdx].state = ElementStates.Default;
    setArrayWithState(newArrayWithState);

    setActive(false);
    setInputValue("");
    setInputIdx("");
  };
  const removeByIndex = async () => {
    const numericIdx = parseInt(inputIdx);
    if (numericIdx > list.getSize) return;

    setActive(true);
    const arrayWithState = list.getArrayWithState();
    for (let i = 0; i < numericIdx; i++) {
      await delay(SHORT_DELAY_IN_MS);
      arrayWithState[i].state = ElementStates.Changing;
      setArrayWithState([...arrayWithState]);
    }
    await delay(SHORT_DELAY_IN_MS);
    setTempValue(arrayWithState[numericIdx].item);
    arrayWithState[numericIdx].item = "";
    setIsRemoveByIndex(true);
    arrayWithState[numericIdx].state = ElementStates.Default;
    setInputValueIdx(numericIdx);

    await delay(SHORT_DELAY_IN_MS);
    list.removeByIndex(numericIdx);
    setArrayWithState(list.getArrayWithState());
    setIsRemoveByIndex(false);
    setActive(false);
    setInputIdx("");
  };

  const showHead = (index: number): string => {
    if (index === 0 && (!isAddingToHead || !isInsertByIndex)) {
      return position.head;
    } else if (index === 0 && isInsertByIndex && inputValueIdx !== 0) {
      return position.head;
    }
    return "";
  };
  const showTail = (index: number): string => {
    if (
      index === arrayWithState.length - 1 &&
      (!isRemoveFromTail || !isRemoveByIndex)
    ) {
      return position.tail;
    } else if (index === arrayWithState.length - 1 && isRemoveByIndex) {
      return position.tail;
    } else if (arrayWithState.length === 1) {
      return "";
    }
    return "";
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <div className={styles.container}>
          <Input
            value={inputValue}
            onChange={handleInputValChange}
            extraClass={styles.input}
            isLimitText={true}
            maxLength={4}
            placeholder={"Введите значение"}
          />
          <Button
            text="Добавить в head"
            onClick={prepend}
            disabled={!inputValue}
            isLoader={isAddingToHead}
          />
          <Button
            text="Добавить в tail"
            onClick={append}
            disabled={!inputValue}
            isLoader={isAddingToTail}
          />
          <Button
            text="Удалить из head"
            onClick={shift}
            disabled={!list.getSize}
            isLoader={isRemoveFromHead}
          />
          <Button
            text="Удалить из tail"
            onClick={pop}
            disabled={!list.getSize}
            isLoader={isRemoveFromTail}
          />
        </div>
        <div className={styles.container}>
          <Input
            value={inputIdx}
            onChange={handleInputIdxChange}
            extraClass={styles.input}
            placeholder={"Введите индекс"}
          />
          <Button
            text="Добавить по индексу"
            extraClass={styles.btn}
            onClick={addByIndex}
            disabled={!inputIdx || parseInt(inputIdx) > list.getSize - 1}
            isLoader={isInsertByIndex}
          />
          <Button
            text="Удалить по индексу"
            extraClass={styles.btn}
            onClick={removeByIndex}
            disabled={!inputIdx || parseInt(inputIdx) > list.getSize - 1}
            isLoader={isRemoveByIndex}
          />
        </div>

        <ul className={styles.list}>
          {arrayWithState.map((item, index) => (
            <li key={index} className={styles.list__item}>
              {isActive &&
                (isAddingToHead || isAddingToTail || isInsertByIndex) &&
                index === inputValueIdx && (
                  <Circle
                    isSmall={true}
                    extraClass={styles.small__top}
                    letter={inputValue}
                    state={ElementStates.Changing}
                  />
                )}

              {isActive &&
                (isRemoveFromHead || isRemoveFromTail || isRemoveByIndex) &&
                index === inputValueIdx && (
                  <Circle
                    isSmall={true}
                    extraClass={styles.small__bottom}
                    letter={tempValue}
                    state={ElementStates.Changing}
                  />
                )}

              <Circle
                index={index}
                head={isAddingToHead || isInsertByIndex ? "" : showHead(index)}
                tail={
                  isRemoveFromTail || isRemoveByIndex ? "" : showTail(index)
                }
                letter={item.item}
                state={item.state}
              />
              {arrayWithState.length - 1 !== index && (
                <ArrowIcon fill={ElementColors.Default} />
              )}
            </li>
          ))}
        </ul>
      </form>
    </SolutionLayout>
  );
};
