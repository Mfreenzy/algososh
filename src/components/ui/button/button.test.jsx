import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('Button component', () => {
    it("Renders with text", () => {
        const tree = renderer
            .create(<Button text='test' />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Renders without text", () => {
        const tree = renderer
            .create(<Button />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Renders with disable state", () => {
        const tree = renderer
            .create(<Button disabled />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Loading indicator works", () => {
        const tree = renderer
            .create(<Button isLoader={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('Callback works correctly after button click', () => {
        const callBack = jest.fn();
        render(<Button onClick={callBack}/>);
        fireEvent.click(screen.getByRole('button'));
        expect(callBack).toHaveBeenCalled();
    });
});