#!/usr/bin/env node
import { program } from "commander";
import { createNewProject } from "./commands/create-project";
import { addEvent } from "./commands/add-event";
import { createCommand } from "./commands/create-command";
import { createMediator } from "./commands/create-mediator";
import { createProxy } from "./commands/create-proxy";
import { createService } from "./commands/create-service";
import { createModel } from "./commands/create-model";
import { createStoreModel } from "./commands/create-store-model";
import { addMediatorListener } from "./commands/add-mediator-listener";
import { addProxyListener } from "./commands/add-proxy-listener";

program
    .version("1.0.0")
    .description("Coffee Maker CLI - Tools for managing your Coffee Maker application");

program
    .command("new <projectName>")
    .description("Create a new Coffee Maker project")
    .action(createNewProject);

program
    .command("add-event <eventName>")
    .description("Add a new event to the events configuration")
    .action(addEvent);

program
    .command("create-command <name> <eventKey>")
    .description("Create a new command and register it with the facade")
    .action(createCommand);

program
    .command("create-mediator <name> <eventKey>")
    .description("Create a new mediator and register it with the facade")
    .action(createMediator);

program
    .command("create-proxy <name> <eventKey>")
    .description("Create a new proxy and register it with the facade")
    .action(createProxy);

program
    .command("create-service <name>")
    .description("Create a new service and register it with the facade")
    .action(createService);

program
    .command("create-model <name>")
    .description("Create a new model")
    .action(createModel);

program
    .command("create-store-model <name>")
    .description("Create a new store model")
    .action(createStoreModel);

program
    .command("add-mediator-listener <mediatorName> <eventKey>")
    .description("Add an event listener to a specific mediator")
    .action(addMediatorListener);

program
    .command("add-proxy-listener <proxyName> <eventKey>")
    .description("Add an event listener to a specific proxy")
    .action(addProxyListener);

program.parse(process.argv);