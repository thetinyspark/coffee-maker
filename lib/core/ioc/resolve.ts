import Container, { rootContainer } from "./Container";

/**
 * Resolves a dependency from a container or from the root container
 * This is a convenience function that provides type safety when resolving dependencies
 * 
 * @typeParam T - The type of the dependency to resolve
 * @param token - The token of the dependency to resolve
 * @param container - Optional container to resolve from (defaults to rootContainer)
 * @returns The resolved dependency cast to type T
 * 
 * @example
 * ```typescript
 * // Define an interface
 * interface IUserService {
 *     getUsers(): User[];
 * }
 * 
 * // Register a service
 * @Injectable({
 *     token: "UserService"
 * })
 * class UserService implements IUserService {
 *     getUsers() { return []; }
 * }
 * 
 * // Resolve with type safety
 * const userService = resolve<IUserService>("UserService");
 * const users = userService.getUsers();
 * 
 * // Using a custom container
 * const customContainer = new Container();
 * const logger = resolve<LoggerService>("Logger", customContainer);
 * ```
 */
export default function resolve<T>(token:string, container:Container = null): T {
  if( container !== null )
    return container.resolve(token) as T;
  else  
    return rootContainer.resolve(token) as T;
}
