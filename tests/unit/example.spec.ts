import { shallowMount } from '@vue/test-utils'
import TestComponent from '@/components/TestComponent.vue'

describe('TestComponent.vue', () => {
  it('renders "Test component"', () => {
    const msg = 'Test component'

    const wrapper = shallowMount(TestComponent)
    expect(wrapper.find('h1').exists()).toBe(true)
    expect(wrapper.find('h1').text()).toBe(msg)
  })
})
