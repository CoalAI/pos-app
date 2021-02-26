/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import { render } from '@testing-library/vue';
import HelloWorld from '@/../../src/components/HelloWorld.vue';

describe('components/HelloWorld', () => {
  test('Renders the title', () => {
    const { queryByText } = render(HelloWorld);
    const element = queryByText('de.NO_DEALS.TITLE');
    expect(element).toBeInTheDocument();
  });
});
