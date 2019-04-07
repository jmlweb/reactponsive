const extractDisplayName = <P>(Component: React.ComponentClass<P> | React.StatelessComponent<P>) =>
    Component.displayName ||
    Component.name ||
    (Component.constructor && Component.constructor.name);

export default extractDisplayName;