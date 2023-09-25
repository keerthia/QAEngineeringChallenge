
import * as React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import { ExternalLink } from '../ExternalLink';

it('Opens the correct URL', () => {
    const tree = renderer.create(<ExternalLink href="http://localhost:8081/"/>).toJSON();
    console.log("ExternalLink",tree.props.href);
    expect(tree.props.href).toBe('http://localhost:8081/');
      expect(tree).toMatchSnapshot();

}

);

