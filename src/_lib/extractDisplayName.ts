const extractDisplayName = (Component: React.ComponentClass | React.StatelessComponent) =>
    Component.displayName ||
    Component.name ||
    (Component.constructor && Component.constructor.name) ||
    'Component';

export default extractDisplayName;