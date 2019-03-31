import * as React from 'react';

import { ChildrenProps, MqObj, ReactPonsiveProps } from './types';
import { buildMqObj, getReactPonsiveProps, updateMqsMatches } from './_lib';

interface State {
  mqs: MqObj[],
};

class ReactPonsive extends React.Component<ReactPonsiveProps, State> {
  state: State = {
    mqs: [],
  };
  static getDerivedStateFromProps({ mqs }: ReactPonsiveProps) {
    const mqsState = mqs.map(buildMqObj);
    return {
      mqs: mqsState,
    }
  }
  componentDidMount() {
    this.state.mqs.forEach(mqObj => {
      mqObj.mq.addListener(this.updateMatches);
    });
  }

  componentWillUnmount() {
    this.state.mqs.forEach(mqObj => {
      mqObj.mq.removeListener(this.updateMatches);
    });
  }

  updateMatches = (e: MediaQueryListEvent) => {
    this.setState((prevState) => ({
      mqs: updateMqsMatches(prevState.mqs, e),
    }));
  }

  render() {
    const props = getReactPonsiveProps(this.state.mqs);
    if (this.props.component) {
      return React.createElement(this.props.component as React.ComponentType<ChildrenProps>, props);
    }
    return this.props.children(props);
  }
}

export default ReactPonsive;