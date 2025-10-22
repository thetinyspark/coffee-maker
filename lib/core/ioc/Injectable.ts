import Container, { rootContainer } from "./Container";

/**
 * Represents a constructable type that can be instantiated with new operator
 * @typeParam T - The type of the instance that will be created
 */
type Constructable<T> = new (...args: any[]) => T;

/**
 * Configuration properties for the Injectable decorator
 * @interface InjectableProps
 */
type InjectableProps = {
  /** Unique identifier for the injectable service */
  token: string;
  /** Optional container instance. If not provided, rootContainer will be used */
  container?: Container;
  /** Whether the service should be treated as a singleton. Default is false */
  singleton?: boolean;
};

/**
 * Decorator factory that marks a class as injectable and registers it with the IoC container
 * 
 * @example
 * ```typescript
 * // Basic usage with default container
 * @Injectable({
 *   token: "UserService"
 * })
 * class UserService {
 *   getUsers() { return []; }
 * }
 * 
 * // Custom container and singleton
 * const customContainer = new Container();
 * @Injectable({
 *   token: "LoggerService",
 *   container: customContainer,
 *   singleton: true
 * })
 * class LoggerService {
 *   log(msg: string) { console.log(msg); }
 * }
 * ```
 * 
 * @param props - Configuration properties for the injectable service
 * @returns A decorator function that registers the target class with the container
 */
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
