import React, {Dispatch, SetStateAction} from "react";
import {TColumn} from "../../types/types";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {swap} from "../../utils/swap";

export const selectionSortAsc = async (
    arr: TColumn[],
    setArray: Dispatch<React.SetStateAction<TColumn[]>>,
    setActive: Dispatch<SetStateAction<boolean>>) => {
    if (arr.length < 3) return;
    setActive(true);
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            arr[i].state = ElementStates.Changing;
            arr[j].state = ElementStates.Changing;
            setArray([...arr]);
            await delay(SHORT_DELAY_IN_MS);
            if (arr[j].value < arr[minIndex].value) {
                minIndex = j;
            }
            arr[j].state = ElementStates.Default;
            setArray([...arr]);
        }
        swap(arr, i, minIndex);
        arr[i].state = ElementStates.Modified;
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    setArray([...arr]);
    setActive(false);
}

export const selectionSortDesc = async (
    arr: TColumn[],
    setArray: Dispatch<React.SetStateAction<TColumn[]>>,
    setActive: Dispatch<SetStateAction<boolean>>) => {
    if (arr.length < 3) return;

    setActive(true);
    for (let i = 0; i < arr.length - 1; i++) {
        let maxIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            arr[i].state = ElementStates.Changing;
            arr[j].state = ElementStates.Changing;
            setArray([...arr]);
            await delay(SHORT_DELAY_IN_MS);
            if (arr[j].value > arr[maxIndex].value) {
                maxIndex = j;
            }
            arr[j].state = ElementStates.Default;
            setArray([...arr]);
        }
        swap(arr, i, maxIndex);
        arr[i].state = ElementStates.Modified;
    }
    arr[arr.length - 1].state = ElementStates.Modified;
    setArray([...arr]);
    setActive(false);
}