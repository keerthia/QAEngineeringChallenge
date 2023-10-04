
import * as React from 'react';
import renderer from 'react-test-renderer';
import ModalScreen from '../../app/modal';

it('Index page loads correctly', () => {
    const tree = renderer.create(<ModalScreen> Snapshot of ModalScreen</ModalScreen>).toJSON();
    console.log(tree);
    expect(tree).toMatchSnapshot();
}
);
