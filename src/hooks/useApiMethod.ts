import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

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

export default function useApiMethod<Args extends any[], Return>(
  method: (...args: Args) => Promise<Return | undefined>,
) {
  const location = useLocation();
  const [errorState, setState] = useState<ApiErrorState>({ inProgress: false });
  const pathRef = useRef(location.pathname);
  const requestPathRef = useRef<string | null>(null);

  // track latest pathname so awaited requests see fresh value
  useEffect(() => {
    pathRef.current = location.pathname;
  }, [location.pathname]);

  // make api request and update state
  const request = async (...args: Args): Promise<Return | undefined> => {
    requestPathRef.current = pathRef.current;
    setState({ inProgress: true });
    let error: string | undefined = undefined;
    let res: Return | undefined = undefined;
    try {
      res = await method(...args);
    } catch (e: any) {
      if (e?.status && e?.body && e.body.detail) {
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
    if (pathRef.current === requestPathRef.current) {
      setState({ error, inProgress: false, success: !error });
    }
    return res;
  };

  return {
    ...errorState,
    request,
  };
}
