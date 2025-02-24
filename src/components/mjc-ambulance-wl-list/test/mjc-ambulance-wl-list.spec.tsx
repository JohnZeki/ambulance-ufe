import { newSpecPage } from '@stencil/core/testing';
import { MjcAmbulanceWlList } from '../mjc-ambulance-wl-list';

describe('mjc-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MjcAmbulanceWlList],
      html: `<mjc-ambulance-wl-list></mjc-ambulance-wl-list>`,
    });
    
    const wlList = page.rootInstance as MjcAmbulanceWlList;
    const expectedPatients = wlList?.waitingPatients?.length

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");
    expect(items.length).toEqual(expectedPatients);

  });
});
