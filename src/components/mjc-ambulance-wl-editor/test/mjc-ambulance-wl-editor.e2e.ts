import { newE2EPage } from '@stencil/core/testing';

describe('mjc-ambulance-wl-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<mjc-ambulance-wl-editor></mjc-ambulance-wl-editor>');

    const element = await page.find('mjc-ambulance-wl-editor');
    expect(element).toHaveClass('hydrated');
  });
});
