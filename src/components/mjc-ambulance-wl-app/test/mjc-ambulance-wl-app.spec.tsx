import { newSpecPage } from '@stencil/core/testing';
import { MjcAmbulanceWlApp } from '../mjc-ambulance-wl-app';

describe('mjc-ambulance-wl-app', () => {

  it('renders editor', async () => {
    const page = await newSpecPage({
      url: `http://localhost/entry/@new`,
      components: [MjcAmbulanceWlApp],
      html: `<mjc-ambulance-wl-app base-path="/"></mjc-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual ("mjc-ambulance-wl-editor");

  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/ambulance-wl/`,
      components: [MjcAmbulanceWlApp],
      html: `<mjc-ambulance-wl-app base-path="/ambulance-wl/"></mjc-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("mjc-ambulance-wl-list");
  });
});