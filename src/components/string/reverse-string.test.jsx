import {reverseString} from "./reverse-string";
import {ElementStates} from "../../types/element-states";

describe('reverse string',  () => {
    const setArray = jest.fn();
    const setActive = jest.fn();

    it('should be correctly with even items', async () => {
        const string = '1234';
        const stringArr = string
            .split('')
            .map(item => ({item, state: ElementStates.Default}))
        const reversedString  = '4321';
        const reversedStringArr = reversedString
            .split('')
            .map(item => ({item, state: ElementStates.Modified}));

        await reverseString(stringArr, setArray, setActive);
        expect(setArray).toHaveBeenLastCalledWith(reversedStringArr);
    });

    it('should be correctly with odd items', async () => {
        const string = '12345';
        const stringArr = string
            .split('')
            .map(item => ({item, state: ElementStates.Default}))
        const reversedString  = '54321';
        const reversedStringArr = reversedString
            .split('')
            .map(item => ({item, state: ElementStates.Modified}));

        await reverseString(stringArr, setArray, setActive);
        expect(setArray).toHaveBeenLastCalledWith(reversedStringArr);
    });

    it('should be correctly with only one item', async () => {
        const string = '1';
        const stringArr = string
            .split('')
            .map(item => ({item, state: ElementStates.Default}))
        const reversedString  = '1';
        const reversedStringArr = reversedString
            .split('')
            .map(item => ({item, state: ElementStates.Modified}));

        await reverseString(stringArr, setArray, setActive);
        expect(setArray).toHaveBeenLastCalledWith(reversedStringArr);
    });

    it('should be correctly with empty string', async () => {
        const string = '';
        const stringArr = string
            .split('')
            .map(item => ({item, state: ElementStates.Default}));

        await reverseString(stringArr, setArray, setActive);
        expect(setArray).toHaveBeenCalledTimes(0);
    });
});