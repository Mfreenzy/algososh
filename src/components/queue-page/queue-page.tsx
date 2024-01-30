import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Quenue } from "./quenue";
import { TQuenue, position } from "../../types/types";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";
import styles from "./quenue-page.module.css";

const empty = Array.from({ length: 7 }, () => ({
  item: "",
  state: ElementStates.Default,
}));

export const QueuePage: React.FC = () => {
  const [value, setValue] = useState("");
  const [array, setArray] = useState(empty);
  const [quenue, setQuenue] = useState(new Quenue<TQuenue>(7));
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
    quenue.enqueue({ item: value, state: ElementStates.Default });
    setQuenue(quenue);
    array[quenue.getTail() - 1] = { item: "", state: ElementStates.Changing };
    setArray([...array]);
    await delay(SHORT_DELAY_IN_MS);
    array[quenue.getTail() - 1] = {item: value, state: ElementStates.Changing };
    setArray([...array]);
    array[quenue.getTail() - 1] = {item: value, state: ElementStates.Default };
    setArray([...array]);
    setValue("");
    setIsActive(false);
    setIsAdd(false);
  };

  //2. Кнопка удаления

  const handleRemoveButton = async () => {
    setIsActive(true);
    setIsRemove(true);
    quenue.dequeue();
    setQuenue(quenue);
    array[quenue.getHead() - 1] = {item: array[quenue.getHead() - 1].item, state: ElementStates.Changing};
    setArray([...array]);
    await delay(SHORT_DELAY_IN_MS);
    array[quenue.getHead() - 1] = {item: "", state: ElementStates.Default };
    setArray([...array]);
    setIsActive(false);
    setIsRemove(false);
  };

  //3. Кнопка очистки

  const handleClearButton = async () => {
    setIsActive(true);
    setIsClean(true);
    quenue.clear();
    setQuenue(quenue);
    setArray(Array.from({ length: 7 }, () => ({item: "", state: ElementStates.Default })));
    setIsActive(false);
    setIsClean(false);
  };

  return (
    <SolutionLayout title="Очередь">
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
            disabled={!value || isActive || quenue.getLength() >= 7}
            isLoader={isAdd}
          />
          <Button
            text="Удалить"
            onClick={handleRemoveButton}
            disabled={quenue.isEmpty() || isActive}
            isLoader={isRemove}
          />
        </div>
        <Button
          text="Очистить"
          onClick={handleClearButton}
          disabled={quenue.isEmpty() || isActive}
          isLoader={isClean}
        />
      </form>
      <ul className={styles.list}>
        {array.map((item, index) => (
          <li key={index}>
            <Circle
              letter={item.item}
              state={item.state}
              index={index}
              head={
                index === quenue.getHead() && !quenue.isEmpty()
                  ? position.head
                  : ""
              }
              tail={
                index === quenue.getTail() - 1 && !quenue.isEmpty()
                  ? position.tail
                  : ""
              }
            />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
