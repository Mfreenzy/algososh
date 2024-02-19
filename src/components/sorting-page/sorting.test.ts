import {selectionSortAsc, selectionSortDesc} from "./selection-sort";
import {bubbleSortAsc, bubbleSortDesc} from "./bubble-sort";
import {
    arrayWithItems,
    resultArrayWithItemsAsc,
    arrayWithOneItem,
    resultArrayWithItemsDesc
} from '../../constants/forTest';

jest.setTimeout(30000);
const setArray = jest.fn();
const setActive = jest.fn();

describe("selection sort asc", () => {
    it("should be correct with empty array", async () => {
        await selectionSortAsc([], setArray, setActive);
        expect(setArray).toHaveBeenCalledTimes(0);
    });

    it("should be correct with only one item", async () => {
        await selectionSortAsc(arrayWithOneItem, setArray, setActive);
        expect(setArray).toHaveBeenCalledTimes(0);
    });

    it("should be correct with items", async () => {
        await selectionSortAsc(arrayWithItems, setArray, setActive);
        expect(setArray).toHaveBeenLastCalledWith(resultArrayWithItemsAsc);
    });
});

describe("selection sort desc", () => {
    it("should be correct with empty array", async () => {
        await selectionSortDesc([], setArray, setActive);
        expect(setArray).toHaveBeenCalledTimes(0);
    });

    it("should be correct with only one item", async () => {
        await selectionSortDesc(arrayWithOneItem, setArray, setActive);
        expect(setArray).toHaveBeenCalledTimes(0);
    });

    it("should be correct with items", async () => {
        await selectionSortDesc(arrayWithItems, setArray, setActive);
        expect(setArray).toHaveBeenLastCalledWith(resultArrayWithItemsDesc);
    });
});

describe("bubble sort asc", () => {
    it("should be correct with empty array", async () => {
        await bubbleSortAsc([], setArray, setActive);
        expect(setArray).toHaveBeenCalledTimes(0);
    });

    it("should be correct with only one item", async () => {
        await bubbleSortAsc(arrayWithOneItem, setArray, setActive);
        expect(setArray).toHaveBeenCalledTimes(0);
    });

    it("should be correct with items", async () => {
        await bubbleSortAsc(arrayWithItems, setArray, setActive);
        expect(setArray).toHaveBeenLastCalledWith(resultArrayWithItemsAsc);
    });
});

describe("selection sort desc", () => {
    it("should be correct with empty array", async () => {
        await bubbleSortDesc([], setArray, setActive);
        expect(setArray).toHaveBeenCalledTimes(0);
    });

    it("should be correct with only one item", async () => {
        await bubbleSortDesc(arrayWithOneItem, setArray, setActive);
        expect(setArray).toHaveBeenCalledTimes(0);
    });

    it("should be correct with items", async () => {
        await bubbleSortDesc(arrayWithItems, setArray, setActive);
        expect(setArray).toHaveBeenLastCalledWith(resultArrayWithItemsDesc);
    });
});