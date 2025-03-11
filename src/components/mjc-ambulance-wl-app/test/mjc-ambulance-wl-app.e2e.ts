import { newE2EPage } from '@stencil/core/testing';

describe('mjc-ambulance-wl-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mjc-ambulance-wl-app></mjc-ambulance-wl-app>');

    const element = await page.find('mjc-ambulance-wl-app');
    expect(element).toHaveClass('hydrated');
  });
});
