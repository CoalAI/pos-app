import { createStore } from 'vuex';
import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import HelloWorld from '@../../../src/components/HelloWorld.vue';

import auth from '@../../../src/store/modules/auth/index';
import order from '@../../../src/store/modules/order/index';

const store = createStore({
  state: {
    root: true,
    version: '1.0.0'
  },
  modules: {
    auth,
    order
  }
});

describe('HelloWorld.vue', () => {

  it('renders props.msg when passed', () => {
    const msg = 'new test message';
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
      global: {
        plugins: [store]
      }
    });
    expect(wrapper.text()).to.include(msg);
  });
});
