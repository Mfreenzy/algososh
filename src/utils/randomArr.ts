import {ElementStates} from "../types/element-states";
import {TColumn} from "../types/types";

const getRandomInt = (min: number = 3, max: number = 17) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export const randomArray = (length: number = getRandomInt(), max: number = 100): TColumn[] =>
    [...Array(length)].map(() =>
        ({value: Math.floor(Math.random() * max), state: ElementStates.Default }));