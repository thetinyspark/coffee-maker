import Container, { rootContainer } from "./Container";

export default function resolve<T>(token:string, container:Container = null): T {
  if( container !== null )
    return container.resolve(token) as T;
  else  
    return rootContainer.resolve(token) as T;
}
