# 🔫 ReactPonsive

> Responsive components and Hooks ⚒ for your favorite framework ⚛️

[![Last Commit][last-commit-badge]][last-commit]
[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[last-commit-badge]: https://img.shields.io/github/last-commit/jmlweb/reactponsive.svg
[last-commit]: https://github.com/jmlweb/reactponsive
[build-badge]: https://img.shields.io/travis/jmlweb/reactponsive/master.png?style=flat-square
[build]: https://travis-ci.org/jmlweb/reactponsive
[npm-badge]: https://img.shields.io/npm/v/reactponsive.png?style=flat-square
[npm]: https://www.npmjs.org/package/reactponsive
[coveralls-badge]: https://img.shields.io/coveralls/jmlweb/reactponsive/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/jmlweb/reactponsive

## Documentation

[http://jmlweb.github.io/reactponsive](http://jmlweb.github.io/reactponsive)

## Objetives

- To provide a simple way of dealing with complex interfaces **where the use of media queries in styles is not enough**.
- To work with **native MatchMedia API**.
- To support **[valid Media Query Strings](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)**, like dimensions, user options and more.
- To make possible to use **"alias"**, to avoid remembering the same media queries once and again.
- To be as **fast and optimized** as possible.

## Installation

```
npm install reactponsive
```

or

```
yarn add reactponsive
```

## Requirements

- **Render props and HOCs:** React >= 16.7.0
- **Hooks:** React >= 16.8.0 (or any older experimental version supporting hooks)

---

---

- [AliasProvider](#aliasprovider)
- [Hooks](#hooks)
- [Render Props](#render-props)
- [HOC](#hoc)

## Provider

This is where all the magic take place. **You must include this component before using the rest of the components and hooks.**

The use of `alias` is supported with the same property to keep your mind sane 😸.

This property is an object, where each key refers to the alias name, and the value to a valid [media query string](https://developer.mozilla.org/es/docs/CSS/Media_queries).

```jsx
import { Provider } from 'reactponsive';
import MyAppComponent from './MyAppComponent';

const alias = {
  tablet: '(min-width: 768px)',
  desktop: '(min-width: 1024px)',
  hd: '(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)',
  darkMode: '(prefers-color-scheme: dark)',
  supportsHover: '(hover: hover)',
  noMotion: '(prefers-reduced-motion: reduce)',
};
const App = () => (
  <AliasProvider alias={alias}>
    <MyAppComponent />
  </AliasProvider>
);

export default App;
```

## Hooks

### useInfo

It receives an array representing valid query strings or alias, and returns useful info about them:

```jsx
import { useInfo } from 'reactponsive';

const props = useReactPonsive([
  'tablet',
  '(min-width: 1024px)',
  '(min-width: 1280px)',
]);
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

### useToggler

It receives a valid query string or alias, or an array of them. It returns true if **any** of the media queries matches.

You can enable "strict mode" with a second boolean argument. Then, it returns true if **all** of the media queries match.

```
(string | string[], boolean?) => boolean;
```

```jsx
import { useToggler } from 'reactponsive';

const value1 = useToggler('tablet'); // true if matches
const value2 = useToggler(['tablet', 'desktop']); // true if any match
const value3 = useToggler(['tablet', 'desktop'], true); // true if both match
```

### useMapper

It receives an object with the media query strings as keys and returns the value corresponding to the last one that matches.

```jsx
import { useMapper } from 'reactponsive';

const component = useMapper({
  default: DefaultComponent,
  tablet: TabletComponent,
  (min-width: 1024px): DesktopComponent,
}); // DesktopComponent (or the last that matches or DefaultComponent if no one matches)
```

It returns the first one when providing "first" as the second argument.

```jsx
import { useMapper } from 'reactponsive';

const value = useMapper({
  default: DefaultComponent,
  tablet: TabletComponent,
  (min-width: 1024px): DesktopComponent,
}, 'first'); // TabletComponent (or DefaultComponent if it doesn't match)
```

### useFilter

It receives an object with the media query strings as keys and returns an array with all the values that match.

```jsx
import { useFilter } from 'reactponsive';

const modulesToStart = useFilter({
  darkMode: darkModeModule,
  supportsHover: hoverModule,
});

useEffect(() => {
  // let's suppose we want to dispatch the start action of each module
// when the media query matches and the module hasn't been started yet
  modulesToStart.forEach((module) => {
    if (!module.started) {
      module.start()
    }
  });
}, [modulesToStart]);

```

### useAlias

You'll rarely will need this, but it is possible to retrieve the `alias` you passed to the `Provider`

```jsx
import { useAlias } from 'reactponsive';

const alias = useAlias();
```

## Components

### Toggler

Only renders the children when the query string(s) match(es)

It supports a `strict` prop. When it's true, only renders the children when all the query strings match.

```jsx
<Toggler
  mqs={[
    'tablet',
    '(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)',
  ]}
>
  <div>This will render when any of the query strings match</div>
</Toggler>
```

```jsx
<Toggler
  mqs={[
    'tablet',
    '(-webkit-min-device-pixel-ratio: 1.25), (min-resolution: 120dpi)',
  ]}
  strict
>
  <div>This will render when all of the query strings match</div>
</Toggler>
```

### Mapper

Renders the last (by default) or first value defined in an object whose keys are media strings.

It is possible to pass a `default` key, and the value will render when no media query string match.

```jsx
<Mapper mqs={{
  default: <DefaultComponent />,
  tablet: <TabletComponent />,
  (min-width: 1024px): <DesktopComponent />,
}}>
  <div>DesktopComponent or TabletComponent (the last which matches) or DefaultComponent if no one matches.</div>
</Mapper>
```

```jsx
<Mapper mqs={{
  default: <DefaultComponent />,
  tablet: <TabletComponent />,
  (min-width: 1024px): <DesktopComponent />,
}} mode="first">
  <div>Tablet Component if matches, or DefaultComponent if not.</div>
</Mapper>
```

### Filter

Renders all the matching elements defined in an object whose keys are media strings.

It is possible to pass a `default` key, and the value will render when no media query string match.

```jsx
<Filter mqs={{
  default: <DefaultComponent />,
  tablet: <TabletComponent />,
  (min-width: 1024px): <DesktopComponent />,
}} />
```
