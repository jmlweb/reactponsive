const pick = (keys: string[]) => (obj: {
  [key: string]: any,
}) => Object.keys(obj).filter(v => keys.includes(v)).reduce((acc, curr) => ({
  ...acc,
  [curr]: obj[curr],
}), {});

export default pick;