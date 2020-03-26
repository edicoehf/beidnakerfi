import React from 'react';
import { shallow } from 'enzyme';
import DisableUserButton from './index';

describe('<DisableUserButton />', () => {
  it('renders a button for disabling users', () => {
    const wrapper = shallow(<DisableUserButton />);
    const button = <button type="button">Loka notanda</button>;
    expect(wrapper.contains(button)).toEqual(true);
  });
});
