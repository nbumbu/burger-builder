import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() })

describe('<NavigationItems/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('shall create the NavigationItems Component', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('shall create the NavigationItems Component', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
});