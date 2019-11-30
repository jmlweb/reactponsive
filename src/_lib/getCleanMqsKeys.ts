const isNotDefault = (key: string) => key !== 'default'

const getCleanMqsKeys = <T>(mqs: Record<string, T>) => Object.keys(mqs).filter(isNotDefault);

export default getCleanMqsKeys;
