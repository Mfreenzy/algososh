import {TColumn} from "../../types/types";
import React, {Dispatch, SetStateAction} from "react";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/delay";
import {DELAY_IN_MS} from "../../constants/delays";
import {swap} from "../../utils/swap";


export const bubbleSortAsc = async (
    arr: TColumn[],
    setArray: Dispatch<React.SetStateAction<TColumn[]>>,
    setActive: Dispatch<SetStateAction<boolean>>) => {
    if (arr.length < 3) return;
    setActive(true);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            arr[j].state = ElementStates.Changing;
            arr[j + 1].state = ElementStates.Changing;
            setArray([...arr]);
            await delay(DELAY_IN_MS);
            if (arr[j].value > arr[j + 1].value) {
                swap(arr, j, j + 1);
            }
            arr[j].state = ElementStates.Default;
        }
        arr[arr.length - i - 1].state = ElementStates.Modified;
        setArray([...arr]);
    }
    setActive(false);
}

export const bubbleSortDesc = async (
    arr: TColumn[],
    setArray: Dispatch<React.SetStateAction<TColumn[]>>,
    setActive: Dispatch<SetStateAction<boolean>>) => {
    if (arr.length < 3) return;
    setActive(true);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            arr[j].state = ElementStates.Changing;
            arr[j + 1].state = ElementStates.Changing;
            setArray([...arr]);
            await delay(DELAY_IN_MS);
            if (arr[j].value < arr[j + 1].value) {
                swap(arr, j, j + 1);
            }
            arr[j].state = ElementStates.Default;
        }
        arr[arr.length - i - 1].state = ElementStates.Modified;
        setArray([...arr]);
    }
    setActive(false);
}