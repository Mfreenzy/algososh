import React, { FormEvent, useState } from "react";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { TCircle } from "../../types/types";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { reverseString } from "./reverse-string";

export const StringComponent: React.FC = () => {
  const [array, setArray] = useState<TCircle[]>([]);
  const [value, setValue] = useState<string>("");
  const [isActive, setIsActive] = useState(false);

  const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
    setValue(evt.currentTarget.value);
  };

  const handleButtonClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const letters = value.split("").map((item) => ({
      item,
      state: ElementStates.Default,
    }));
    reverseString(letters, setArray, setIsActive);
    setValue("");
  };

  return (
    <SolutionLayout title="Строка">
      <form className={`${styles.container}`} onSubmit={handleButtonClick}>
        <Input
          placeholder="Введите строку"
          extraClass={`${styles.input}`}
          isLimitText={true}
          maxLength={11}
          value={value}
          onChange={handleInputChange}
        />
        <Button
          text="Развернуть"
          type="submit"
          disabled={!value}
          isLoader={isActive}
        />
      </form>
      <ul className={`${styles.list}`}>
        {array?.map((char: TCircle, index: number) => (
          <li key={index}>
            <Circle letter={char.item} state={char.state} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
