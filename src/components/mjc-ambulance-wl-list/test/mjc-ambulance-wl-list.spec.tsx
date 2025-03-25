import { newSpecPage } from '@stencil/core/testing';
import { MjcAmbulanceWlList } from '../../mjc-ambulance-wl-list/mjc-ambulance-wl-list';
import { MjcAmbulanceWlApp } from '../../mjc-ambulance-wl-app/mjc-ambulance-wl-app';
import { WaitingListEntry } from '../../../api/ambulance-wl/models';
import fetchMock from 'jest-fetch-mock';


describe('mjc-ambulance-wl-app', () => {

  const sampleEntries: WaitingListEntry[] = [
    {
      id: "entry-1",
      patientId: "p-1",
      name: "Juraj Prvý",
      waitingSince: new Date("20240203T12:00"),
      estimatedDurationMinutes: 20
    },
    {
      id: "entry-2",
      patientId: "p-2",
      name: "James Druhý",
      waitingSince: new Date("20240203T12:00"),
      estimatedDurationMinutes: 5
    }
  ];

  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('renders sample entries', async () => {
    // Mock the API response using sampleEntries
    fetchMock.mockResponseOnce(JSON.stringify(sampleEntries));

    // Set up the page with your component
    const page = await newSpecPage({
      components: [MjcAmbulanceWlList],
      html: `<mjc-ambulance-wl-list ambulance-id="test-ambulance" api-base="http://test/api"></mjc-ambulance-wl-list>`,
    });

    const wlList = page.rootInstance as MjcAmbulanceWlList;
    const expectedPatients = wlList?.waitingPatients?.length;

    // Wait for the DOM to update
    await page.waitForChanges();

    // Query the rendered list items
    const items = page.root.shadowRoot.querySelectorAll("md-list-item");

    // Assert that the expected number of patients and rendered items match the sample entries
    expect(expectedPatients).toEqual(sampleEntries.length);
    expect(items.length).toEqual(expectedPatients);
  });

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

  it('renders error message on network issues', async () => {
    // Mock the network error
    fetchMock.mockRejectOnce(new Error('Network Error'));

    const page = await newSpecPage({
      components: [MjcAmbulanceWlList],
      html: `<mjc-ambulance-wl-list ambulance-id="test-ambulance" api-base="http://test/api"></mjc-ambulance-wl-list>`,
    });

    const wlList = page.rootInstance as MjcAmbulanceWlList;
    const expectedPatients = wlList?.waitingPatients?.length;

    // Wait for the DOM to update
    await page.waitForChanges();

    // Query the DOM for error message and list items
    const errorMessage = page.root.shadowRoot.querySelectorAll(".error");
    const items = page.root.shadowRoot.querySelectorAll("md-list-item");

    // Assert that the error message is displayed and no patients are listed
    expect(errorMessage.length).toBeGreaterThanOrEqual(1);
    expect(expectedPatients).toEqual(0);
    expect(items.length).toEqual(expectedPatients);
  });

});