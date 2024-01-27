import {ElementStates} from "./element-states";

export type TCircle = {
    item: string;
    state: ElementStates;
}

export type TColumn = {
    value: number;
    state: ElementStates;
}

export type TQuenue = TCircle & {
    head?: string;
}

export enum position {
    head = "head",
    tail = "tail",
}
