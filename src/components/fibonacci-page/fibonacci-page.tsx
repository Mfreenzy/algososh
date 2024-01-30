import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { fibonacciSequence } from "./algosfibonacci";
import { delay } from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [isActive, setIsActive] = useState(false);
  const [numbers, setNumbers] = useState<number[]>();

  const render = async (value: string) => {
    setIsActive(true);
    const numbers = fibonacciSequence(parseInt(value));
    for (let i = 0; i < numbers.length; i++) {
      await delay(SHORT_DELAY_IN_MS);
      setNumbers(numbers.slice(0, i + 1));
    }
    setIsActive(false);
  };

  const handlerSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (value.length !== 0) {
      render(value);
    }
  };

  const handlerInput = (evt: FormEvent<HTMLInputElement>) =>
    setValue(evt.currentTarget.value);

  const isDisabled = (value: string) =>
    !value || parseInt(value) > 19 || parseInt(value) < 1;

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form onSubmit={handlerSubmit} className={styles.container}>
        <Input
          onChange={handlerInput}
          value={value}
          placeholder="Введите строку"
          extraClass={styles.input}
          isLimitText={true}
          type="number"
          min={1}
          max={19}
        />
        <Button
          text={"Расчитать"}
          type={"submit"}
          disabled={isDisabled(value)}
          isLoader={isActive}
        />
      </form>
      <ul className={styles.list}>
        {numbers?.map((number, index) => (
          <li key={index}>
            <Circle tail={index.toString()} letter={number.toString()} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
