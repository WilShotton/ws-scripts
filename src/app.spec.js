import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import App from './app'


Enzyme.configure({ adapter: new Adapter() })

describe('<App />', () => {

    it('should match snapshot', () => {

        const wrapper = mount(<App />)

        expect(wrapper).toMatchSnapshot()
    })

    it('should be true', () => {

        expect(true).toBe(true)
    })
})
