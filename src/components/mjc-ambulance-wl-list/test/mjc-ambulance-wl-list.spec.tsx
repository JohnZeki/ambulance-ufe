import { newSpecPage } from '@stencil/core/testing';
import { MjcAmbulanceWlList } from '../mjc-ambulance-wl-list';

describe('mjc-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MjcAmbulanceWlList],
      html: `<mjc-ambulance-wl-list></mjc-ambulance-wl-list>`,
    });
    expect(page.root).toEqualHtml(`
      <mjc-ambulance-wl-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </mjc-ambulance-wl-list>
    `);
  });
});
