import React from 'react';
import Provider from './Provider';

const providerDecorator = ({ alias } = {}) => storyFn => (
  <Provider alias={alias}>{storyFn()}</Provider>
);

export default providerDecorator;
