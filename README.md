# Coffee Maker

[![npm version](https://badge.fury.io/js/%40thetinyspark%2Fcoffe-maker.svg)](https://badge.fury.io/js/%40thetinyspark%2Fcoffe-maker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight MVC-oriented TypeScript library inspired by PureMVC, enhanced with IoC (Inversion of Control) Container support.

## Installation

```bash
npm install @thetinyspark/coffe-maker
```

## Features

Coffee Maker implements several design patterns to help you build well-structured applications:

- **Command Pattern** (Controller): Encapsulate request processing logic
- **Model Pattern**: Manage application data and business rules
- **Proxy Pattern**: Provide a surrogate for controlling access to objects
- **Mediator Pattern**: Define communication between components
- **Facade Pattern**: Provide a unified interface to a set of interfaces
- **IoC Container**: Manage dependency injection
- **Module System**: Organize and structure your application components

## Quick Start

### Basic Setup

```typescript
import { Facade, ICommand, Model, Mediator } from '@thetinyspark/coffe-maker';

// Create your facade
const facade = new Facade();

// Register a model
class UserModel extends Model {
    private users = [];
    
    addUser(user) {
        this.users.push(user);
        this.emit("userAdded", user);
    }
}
facade.registerModel("userModel", new UserModel());

// Create a command
class AddUserCommand implements ICommand {
    execute(data: any): void {
        const userModel = this.facade.getModel("userModel");
        userModel.addUser(data);
    }
}
facade.registerCommand("ADD_USER", AddUserCommand);

// Create a mediator
class UserListMediator extends Mediator {
    constructor(view: HTMLElement) {
        super("userList", view);
    }
    
    onRegister(): void {
        // Listen to model changes
        this.facade.getModel("userModel").on("userAdded", this.updateView.bind(this));
    }
    
    updateView(user: any): void {
        // Update the view
    }
}
```

### Using the IoC Container

```typescript
import { container, Injectable } from '@thetinyspark/coffe-maker';

@Injectable()
class UserService {
    getUsers() {
        return ['user1', 'user2'];
    }
}

// Register the service
container.register('UserService', UserService);

// Resolve the service
const userService = container.resolve('UserService');
```

## Architecture

### Facade Pattern
The Facade serves as the main interface for your application, managing the communication between:
- Commands (Controller)
- Models (Data & Business Logic)
- Mediators (View-related logic)
- Services (Business Services)

```typescript
facade.registerCommand("commandName", CommandClass);
facade.registerModel("modelName", modelInstance);
facade.registerMediator("mediatorName", mediatorInstance);
facade.registerService("serviceName", serviceInstance);
```

### Module System
Modules help organize your application components:

```typescript
import { CoffeeModule, ModuleConfiguration } from '@thetinyspark/coffe-maker';

const module = new CoffeeModule();
const config: ModuleConfiguration = {
    commands: [
        { key: "ADD_USER", factory: AddUserCommand }
    ],
    models: [
        { key: "userModel", instance: new UserModel() }
    ],
    mediators: [
        { key: "userList", instance: new UserListMediator() }
    ],
    services: [
        { key: "userService", instance: new UserService() }
    ]
};

module.configure(config);
module.load(facade);
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Advanced Usage Examples

### Complex Module Organization

```typescript
// Define module types
interface UserModuleConfig {
    users: User[];
    currentUser: User | null;
}

// Create a module-specific proxy
class UserProxy extends Proxy {
    private users: User[] = [];

    addUser(user: User): void {
        this.users.push(user);
        this.emit("userAdded", user);
    }

    getUsers(): User[] {
        return [...this.users];
    }
}

// Create a module-specific mediator
class UserListMediator extends Mediator {
    constructor(private view: HTMLElement) {
        super();
    }

    onRegister(): void {
        const userProxy = this.getFacade().getProxy("userProxy") as UserProxy;
        userProxy.on("userAdded", this.updateView.bind(this));
        this.updateView(userProxy.getUsers());
    }

    private updateView(users: User[]): void {
        this.view.innerHTML = users
            .map(user => `<div>${user.name}</div>`)
            .join("");
    }
}

// Create module-specific commands
class AddUserCommand implements ICommand {
    execute(notification: INotification): void {
        const userProxy = this.facade.getProxy("userProxy") as UserProxy;
        const userData = notification.getData();
        userProxy.addUser(userData);
    }
}

// Create a service
@Injectable({
    token: "UserService",
    singleton: true
})
class UserService {
    async fetchUsers(): Promise<User[]> {
        const response = await fetch('/api/users');
        return response.json();
    }
}

// Configure and load the module
const userModule = new CoffeeModule();
userModule.configure({
    proxies: [
        { key: "userProxy", instance: new UserProxy() }
    ],
    mediators: [
        { key: "userList", instance: new UserListMediator(document.querySelector(".user-list")) }
    ],
    commands: [
        { key: "ADD_USER", factory: () => new AddUserCommand() }
    ],
    services: [
        { key: "userService", instance: resolve<UserService>("UserService") }
    ]
});

const facade = new Facade();
userModule.load(facade);
```

### Best Practices

1. **Command Organization**
   ```typescript
   // Group related commands in a namespace
   namespace UserCommands {
       export class Add implements ICommand {
           execute(notification: INotification): void {
               // Add user logic
           }
       }

       export class Remove implements ICommand {
           execute(notification: INotification): void {
               // Remove user logic
           }
       }
   }
   ```

2. **State Management with StoreModel**
   ```typescript
   interface AppState {
       users: User[];
       loading: boolean;
       error: string | null;
   }

   class AppStore extends StoreModel {
       constructor() {
           super();
           this.setState({
               users: [],
               loading: false,
               error: null
           });
       }

       setLoading(loading: boolean): void {
           this.setState({ loading });
       }

       setUsers(users: User[]): void {
           this.setState({ users });
       }

       setError(error: string | null): void {
           this.setState({ error });
       }
   }
   ```

3. **Service Dependency Injection**
   ```typescript
   @Injectable({
       token: "LoggerService",
       singleton: true
   })
   class LoggerService {
       log(message: string): void {
           console.log(`[${new Date().toISOString()}] ${message}`);
       }
   }

   @Injectable({
       token: "UserService",
       singleton: true
   })
   class UserService {
       constructor(private logger: LoggerService) {
           this.logger = resolve<LoggerService>("LoggerService");
       }

       async getUsers(): Promise<User[]> {
           this.logger.log("Fetching users...");
           // Implementation
       }
   }
   ```

4. **Event-Driven Communication**
   ```typescript
   // Mediator listening to multiple events
   class DashboardMediator extends Mediator {
       onRegister(): void {
           const facade = this.getFacade();
           
           facade.subscribe("USER_LOGGED_IN", this.onUserLogin.bind(this));
           facade.subscribe("DATA_UPDATED", this.onDataUpdate.bind(this));
           facade.subscribe("ERROR_OCCURRED", this.onError.bind(this));
       }

       private onUserLogin(notification: INotification): void {
           const user = notification.getData();
           // Update UI for logged-in user
       }

       private onDataUpdate(notification: INotification): void {
           const newData = notification.getData();
           // Refresh dashboard with new data
       }

       private onError(notification: INotification): void {
           const error = notification.getData();
           // Show error in dashboard
       }
   }
   ```

For more detailed information about the architecture and patterns used, see [ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Related Projects

