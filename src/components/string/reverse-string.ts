import React, {SetStateAction} from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";
import { swap } from "../../utils/swap";
import { DELAY_IN_MS } from "../../constants/delays";
import { TCircle } from "../../types/types";

export const reverseString = async (
    array: TCircle[],
    setArray:  React.Dispatch<React.SetStateAction<TCircle[]>>,
    setActive: React.Dispatch<SetStateAction<boolean>>
) => {
    setActive(true);

    const middle = Math.ceil(array.length / 2);
    for (let i = 0; i < middle; i++) {
        let j = array.length - i - 1;
        if (i !== j) {
            array[i].state = ElementStates.Changing;
            array[j].state = ElementStates.Changing;
            setArray([...array]);
            await delay(DELAY_IN_MS);
        }
        swap(array, i, j);
        array[i].state = ElementStates.Modified;
        array[j].state = ElementStates.Modified;
        setArray([...array]);
    }
    setActive(false);
}

