import { ElementStates } from "../types/element-states";

export const TEST_URL = "http://localhost:3000";
export const arrayWithOneItem = [{ value: 100, state: ElementStates.Default }];
export const circleContentSelector = "[class*=circle_content]";
export const circleChangingSelector ="[class*=circle_changing]";
export const circleCircleSelector = "[class*=circle_circle]";
export const buttonSubmitSelector = 'button[type="submit"]';
export const circleModifiedSelector = "[class*=circle_modified]";
export const circleDefaultSelector = "[class*=circle_default]";
export const circleSmallSelector = "[class*=circle_small]";


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