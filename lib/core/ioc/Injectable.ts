import Container, { rootContainer } from "./Container";

type Constructable<T> = new (...args: any[]) => T;
type InjectableProps = {
  token: string;
  container?: Container;
  singleton?: boolean;
};

function Injectable<T>(
  props: InjectableProps
): (target: Constructable<T>) => void {
  const container = props.container || rootContainer;
  const singleton = props.singleton || false;
  return function (target: Constructable<T>): void {
    container.register(props.token, () => new target(), singleton);
  };
}

export default Injectable;
