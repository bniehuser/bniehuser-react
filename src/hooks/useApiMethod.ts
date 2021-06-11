import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export interface ApiErrorState {
  inProgress: boolean;
  error?: string;
  success?: boolean;
  successMessage?: string;
}


/**
 * @example
 * ```typescript
 * const method = useApiMethod(someApiMethod);
 * await method.request(...someApiMethodArguments)
 * if(method.error) { doSomething(); }
 * // in render
 * {method.inProgress ? <Loader/> : <Content>...</Content>}
 * ```
 * @param method
 */

export default function useApiMethod<Args extends any[], Return>(method:(...args: Args) => Promise<Return|undefined>) {
  const history = useHistory();
  const [errorState, setState] = useState<ApiErrorState>({inProgress: false});
  const [locationChanged, setLocationChanged] = useState<boolean>(false);

  // listen for url change so we don't set state if redirected
  useEffect(() => {
    const stopListening = history.listen(() => setLocationChanged(true));
    return () => stopListening();
  }, [history]);

  // make api request and update state
  const request = async (...args: Args): Promise<Return|undefined> => {
    setState({inProgress: true});
    let error: string|undefined = undefined;
    let res:Return|undefined = undefined;
    try {
      res = await method(...args);
    } catch(e) {
      // we get a response object back, i think
      if(e.status && e.body && e.body.detail) {
        error = `(${e.status}) ${e.body.detail}`;
      } else {
        console.error(e);
        try {
          error = e.getMessage();
        } catch (err) {
          error = JSON.stringify(e);
        }
      }
    }
    if(!locationChanged) {
      setState({error, inProgress: false, success: !error});
    }
    return res;
  };

  // return state and request
  return {
    ...errorState,
    request
  }
}
