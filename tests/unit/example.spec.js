import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Home from '@../src/components/Home.vue';

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Home, {
      propsData: { msg },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
