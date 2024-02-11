import { ElementStates } from "../types/element-states";

export const TEST_URL = "http://localhost:3000";
export const arrayWithOneItem = [{ value: 100, state: ElementStates.Default }];

export const arrayWithItems = [
    { value: 9, state: ElementStates.Modified },
    { value: 97, state:ElementStates.Modified },
    { value: 100, state:ElementStates.Modified },
    { value: 61, state:ElementStates.Modified },
    { value: 16, state:ElementStates.Modified },
    { value: 37, state:ElementStates.Modified }
];

export const resultArrayWithItemsAsc = [
    { value: 9, state: ElementStates.Modified },
    { value: 16, state:ElementStates.Modified },
    { value: 37, state:ElementStates.Modified },
    { value: 61, state:ElementStates.Modified },
    { value: 97, state:ElementStates.Modified },
    { value: 100, state:ElementStates.Modified }
];

export const resultArrayWithItemsDesc = [
    { value: 100, state: ElementStates.Modified },
    { value: 97, state:ElementStates.Modified },
    { value: 61, state:ElementStates.Modified },
    { value: 37, state:ElementStates.Modified },
    { value: 16, state:ElementStates.Modified },
    { value: 9, state:ElementStates.Modified },
];