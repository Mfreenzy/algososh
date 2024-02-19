import { Circle } from './circle';
import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';

describe('Circle component', () => {
    it("Renders without letter", () => {
        const tree = renderer
            .create(<Circle />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Renders with letter", () => {
        const tree = renderer
            .create(<Circle letter="test"/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Renders with head", () => {
        const tree = renderer
            .create(<Circle head="1"/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Renders with react-element in head", () => {
        const tree = renderer
            .create(<Circle head={<Circle />}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Renders with tail", () => {
        const tree = renderer
            .create(<Circle tail="1"/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Renders with react-element in tail", () => {
        const tree = renderer
            .create(<Circle tail={<Circle />}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Renders with index", () => {
        const tree = renderer
            .create(<Circle index={1}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Renders with prop isSmall == true", () => {
        const tree = renderer
            .create(<Circle isSmall={true} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Renders with dafault state", () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Default} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Renders with changing state", () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Changing} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("Renders with modified state", () => {
        const tree = renderer
            .create(<Circle state={ElementStates.Modified} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});