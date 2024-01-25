import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TCircle } from "../../types/types";
import { Stack } from "./stack";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [array, setArray] = useState<TCircle[]>([]);
  const [stack] = useState(new Stack<TCircle>());
  const [isActive, setIsActive] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [isClean, setIsClean] = useState(false);

  const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
    setValue(evt.currentTarget.value);
  };

  //1. Кнопка добавления 

  const handleAddButton = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setIsActive(true);
    setIsAdd(true);
    if (value) {
      stack.push({ item: value, state: ElementStates.Changing });
      setValue("");
      setArray([...stack.getItems()]);
      await delay(SHORT_DELAY_IN_MS);
      stack.peak().state = ElementStates.Default;
      setArray([...stack.getItems()]);
    }
    setIsActive(false);
    setIsAdd(false);
  };

  //2. Кнопка удаления

  const handleRemoveButton = async () => {
    setIsActive(true);
    setIsRemove(true);
    stack.peak().state = ElementStates.Changing;
    setArray([...stack.getItems()]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setArray([...stack.getItems()]);
    setIsActive(false);
    setIsRemove(false);
  };

  //3. Кнопка очистки 

  const handleClearButton = async () => {
    setIsActive(true);
    setIsClean(true);
    await delay(SHORT_DELAY_IN_MS);
    stack.clear();
    setArray([...stack.getItems()]);
    setIsActive(false);
    setIsClean(false);
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={handleAddButton}>
        <div className={styles.container}>
          <Input
            value={value}
            onChange={handleInputChange}
            extraClass={styles.input}
            isLimitText={true}
            maxLength={4}
          />
          <Button
            text="Добавить"
            type={"submit"}
            disabled={!value || isActive}
            isLoader={isAdd}
          />
          <Button
            text="Удалить"
            onClick={handleRemoveButton}
            disabled={!array.length || isActive}
            isLoader={isRemove}
          />
        </div>
        <Button
          text="Очистить"
          onClick={handleClearButton}
          disabled={!array.length || isActive}
          isLoader={isClean}
        />
      </form>
      <ul className={styles.list}>
        {array.map((item, index) => (
          <li key={index}>
            <Circle
              letter={item.item}
              state={item.state}
              tail={index.toString()}
              head={array.length - 1 === index ? "top" : ""}
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
