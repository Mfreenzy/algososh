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

export enum SortName {
    select = "выбор",
    bubble = "пузырек"
}

export enum position {
    head = "head",
    tail = "tail",
}

export enum ElementColors {
    Default = "#0032ff",
    Changing = "#d252e1",
    Modified = "#7fe051",
}