import * as React from 'react';

import withAlias from './withAlias';
import { Alias, MqObj, ReactPonsiveProps } from './types';
import { buildMqObj, buildReactPonsiveProps, updateMqsMatches } from './utils';

type Props = ReactPonsiveProps & {
  alias: Alias;
};

interface State {
  mqs: MqObj[];
}

interface MqEvent {
  value: string;
  mq: MediaQueryList;
}

class ReactPonsive extends React.Component<Props, State> {
  state: State = {
    mqs: [],
  };

  static getDerivedStateFromProps({ alias, mqs }: Props) {
    if (!Array.isArray(mqs)) {
      throw 'You need to provide an array of media queries strings';
    }
    const buildMqObjWithAlias = buildMqObj(alias);
    const mqsState = mqs.map(buildMqObjWithAlias);
    return {
      mqs: mqsState,
    };
  }

  mqEvents: MqEvent[] = [];

  componentDidMount() {
    this.mqEvents = this.state.mqs.map(({ value }) => {
      const mq = window.matchMedia(value);
      mq.addListener(this.updateMatches);
      return {
        value,
        mq,
      };
    });
  }

  componentDidUpdate(_: Props, prevState: State) {
    const newMqValues = this.state.mqs.map(({ value }) => value);
    const oldMqValues = prevState.mqs.map(({ value }) => value);
    this.mqEvents = this.mqEvents.filter(({ value, mq }) => {
      if (!newMqValues.includes(value)) {
        mq.removeListener(this.updateMatches);
        return false;
      }
      return true;
    });
    const newMqEvents = this.state.mqs
      .filter(
        ({ value }) =>
          newMqValues.includes(value) && !oldMqValues.includes(value),
      )
      .map(({ value }) => {
        const mq = window.matchMedia(value);
        mq.addListener(this.updateMatches);
        return {
          value,
          mq,
        };
      });
    this.mqEvents = [...this.mqEvents, ...newMqEvents];
  }

  componentWillUnmount() {
    this.mqEvents.forEach(({ mq }) => {
      mq.removeListener(this.updateMatches);
    });
  }

  private updateMatches = (e: MediaQueryListEvent) => {
    this.setState(prevState => ({
      mqs: updateMqsMatches(prevState.mqs, e),
    }));
  };

  render() {
    const defaultProps = buildReactPonsiveProps(this.state.mqs);
    const props = this.props.propsMapper
      ? this.props.propsMapper(defaultProps)
      : defaultProps;
    if (this.props.component) {
      return React.createElement(
        this.props.component as React.ComponentType<{}>,
        props,
      );
    }
    if (!this.props.children) {
      throw 'You must supply a component or children prop';
    }
    return this.props.children(props);
  }
}

export default withAlias(ReactPonsive);
