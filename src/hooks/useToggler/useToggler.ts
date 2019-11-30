import useInfo from '../useInfo';

const useToggler = (mq: string | string[], strict: boolean = false) => {
  const { passes } = useInfo(mq);
  if (!Array.isArray(mq) || strict === false) {
    return passes.length > 0;
  }
  return passes.length === mq.length;
};

export default useToggler;
