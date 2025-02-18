import { newE2EPage } from '@stencil/core/testing';

describe('mjc-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mjc-ambulance-wl-list></mjc-ambulance-wl-list>');

    const element = await page.find('mjc-ambulance-wl-list');
    expect(element).toHaveClass('hydrated');
  });
});
