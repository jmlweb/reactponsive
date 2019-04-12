import { addParameters, configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import theme from './theme';
import './index.css';

addDecorator(
  withInfo({
    inline: true,
  }),
);

addParameters({
  options: {
    showPanel: false,
    theme,
  }
})

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
