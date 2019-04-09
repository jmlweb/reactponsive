# ⚛️ ReactPonsive

> Responsive utils in all the flavors for your favorite framework

- [AliasProvider](#aliasprovider)
- [Hooks](#hooks)
- [Render Props](#render-props)
- [HOC](#hoc)

## AliasProvider

Just wrap your app with `AliasProvider` to keep your mind sane.

The value must be a valid [media query string](https://developer.mozilla.org/es/docs/CSS/Media_queries).

```jsx
import { AliasProvider } from 'reactponsive';
import MainComponent from './MainComponent';

const alias = {
  
  tablet: '(min-width: 768px)',
  desktop: '(min-width: 1024px)',
  hd: '(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)',
};
const App = () => (
	<AliasProvider alias={alias}>
		<MainComponent />
	</AliasProvider>
);

export default App;
```


## Hooks

### useReactPonsive

It receives an array representing valid query strings or alias:

```jsx
import { useReactPonsive } from 'reactponsive'; 

const props = useReactPonsive(['tablet', '(min-width: 1024px)', '(min-width: 1280px)']);
```

It returns:

- **first**: The first matching query string or alias or `undefined`.
- **last**: The last matching query string or alias or `undefined`.
- **matches**: An object, having the query strings or aliases as properties, and the results of the match as values.
- **passes**: An array containing only the matching query strings or aliases.

```js
{
  first: 'tablet',
  last: '(min-width: 1024px)',
  matches: {
  	tablet: true,
  	'(min-width: 1024px)': true,
  	'(min-width: 1280px)': false,
  },
  passes: ['tablet', '(min-width: 1024px)'],
}
```

### useReactPonsiveToggle

```
(string | string[], boolean?) => boolean;
```

```jsx
import { useReactPonsiveToggle } from 'reactponsive';

const value1 = useReactPonsiveToggle('tablet'); // true if matches
const value2 = useReactPonsiveToggle(['tablet', 'desktop']); // true if any match
const value3 = useReactPonsiveToggle(['tablet', 'desktop'], true); // true if both match
```

### useReactPonsiveValue

It receives an object with the media query strings as keys and returns the value corresponding to the last one that matches.

```jsx
import { useReactPonsiveValue } from 'reactponsive';

const value = useReactPonsiveValue({
  default: DefaultComponent,
  tablet: TabletComponent,
  (min-width: 1024px): DesktopComponent,
}); // DesktopComponent (or the last that matches or DefaultComponent if no one matches)
```

It has a second argument, which values are "last" or "first" (last by default)

```jsx
import { useReactPonsiveValue } from 'reactponsive';

const value = useReactPonsiveValue({
  default: DefaultComponent,
  tablet: TabletComponent,
  (min-width: 1024px): DesktopComponent,
}, 'first'); // TabletComponent (or DefaultComponent if it doesn't match)
```


## Render Props

### ReactPonsive

It support the following props:

| Prop      | Required | Description                                                                                  |
| --------- | -------- | -------------------------------------------------------------------------------------------- |
| mqs       | yes      | An array representing valid query strings. i.e. `['(min-width: 300px), (min-width: 768px)']` |
| children  | no\*     | A function receiving an object, with the properties defined below                        |
| component | no\*     | A component receiving the props defined below.                                 |
| propsMapper | no | A function which receives the original props object and can return a different one (i.e. for performance reasons you can omit some of them) |

(\*) You must supply `children` or `component`

The props passed are:

- **first**: The first matching query string or alias or `undefined`.
- **last**: The last matching query string or alias or `undefined`.
- **matches**: An object, having the query strings or aliases as properties, and the results of the match as values.
- **passes**: An array containing only the matching query strings or aliases.

```jsx
import { ReactPonsive } from 'reactponsive';

const MyComp = () => (
  <ReactPonsive mqs={['tablet', 'desktop', '(min-width: 1280px)']}>
    {({ first, last, matches, passes }) => {
      // do whatever with the props
    })}
  </ReactPonsive>
);
```

```jsx
import { ReactPonsive } from 'reactponsive';
// RespComp will receive the props from ReactPonsive 
import RespComp from './RespComp';

const MyComp = () => (
  <ReactPonsive mqs={['tablet', 'desktop', '(min-width: 1280px)']} component={RespComp} />
);

export default MyComp;
```

```jsx
const propsMapper = props => ({ ...props, matchesLength: props.matches.length });
```

### ReactPonsiveToggle

Only renders the children when the query string(s) match(es)

It supports a `strict` prop. When it's true, only renders the children when all the query strings match.

```jsx
<ReactPonsiveToggle mqs={['tablet', '(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)']}>
	<div>This will render when any of the query strings match</div>
</ReactPonsiveToggle>
```

```jsx
<ReactPonsiveToggle mqs={['tablet', '(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)']} strict>
	<div>This will render when all of the query strings match</div>
</ReactPonsiveToggle>
```
### ReactPonsiveValue

Renders the last (by default) or first value defined in an object whose keys are media strings.

It is possible to pass a `default` key, and the value will render when no media query string is matched.

```jsx
<ReactPonsiveValue mqs={{
  default: <DefaultComponent />,
  tablet: <TabletComponent />,
  (min-width: 1024px): <DesktopComponent />,
}}>
  <div>DesktopComponent or TabletComponent (the last which matches) or DefaultComponent if no one matches.</div>
</ReactPonsiveValue>
```

```jsx
<ReactPonsiveValue mqs={{
  default: <DefaultComponent />,
  tablet: <TabletComponent />,
  (min-width: 1024px): <DesktopComponent />,
}} mode="first">
  <div>Tablet Component if matches, or DefaultComponent if not.</div>
</ReactPonsiveValue>
```

## HOC

### withReactPonsive

HOC version of [ReactPonsive](#reactponsive).

```jsx
import { withReactPonsive } from 'reactponsive';
import MyComponent from './MyComponent';

const EnhancedComponent = withReactPonsive(['tablet', '(min-width: 1024px)', '(min-width: 1280px)'])(MyComponent);
// Component will receive first, last, matches and passes
```

You can provide the propsMapper as second argument

```jsx
import { withReactPonsive } from 'reactponsive';
import MyOtherComponent from './MyOtherComponent';
import MyOtherMobileComponent from './MyOtherMobileComponent';

const MyComponent = ({ passesLength }) => passesLength > 2 ? <MyOtherComponent /> : <MyOtherMobileComponent />;

const propsMapper = ({ passes }) => ({ passesLength: passes.length });

const EnhancedComponent = withReactPonsive(['tablet', '(min-width: 1024px)', '(min-width: 1280px)'], propsMapper)(MyComponent);
```

### withReactPonsiveToggle

HOC version of [ReactPonsiveToggle](#reactponsivetoggle).

```jsx
import { withReactPonsiveToggle } from 'reactponsive';
import MyComponent from './MyComponent';

const EnhancedComponent = withReactPonsiveToggle(['tablet', '(min-width: 1024px)', '(min-width: 1280px)'])(MyComponent);
// Component will render only if any of the media query strings matches
```

```jsx
import { withReactPonsiveToggle } from 'reactponsive';
import MyComponent from './MyComponent';
const EnhancedComponent = withReactPonsiveToggle(['tablet', '(min-width: 1024px)', '(min-width: 1280px)'], true)(MyComponent);
// Component will render only if all of the media query strings match
```