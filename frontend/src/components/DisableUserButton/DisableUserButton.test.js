import React from 'react';
import { shallow } from 'enzyme';
import DisableUserButton from './index';

describe('<DisableUserButton />', () => {
    it('renders a button for disabling users', () => {
        const btn = shallow(<DisableUserButton />);
        expect(btn.find('button').length).toEqual(1);
    })
})