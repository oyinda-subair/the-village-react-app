import '@testing-library/jest-dom/extend-expect';
import { jestPreviewConfigure } from 'jest-preview';

import '@assets/styles/index.css';
import '@assets/styles/tailwind.css';

jestPreviewConfigure({
  autoPreview: true,
});

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

Object.defineProperty(URL, 'createObjectURL', {
  writable: true,
  value: jest.fn(),
});
