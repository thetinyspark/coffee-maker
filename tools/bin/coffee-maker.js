#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const create_project_1 = require("./commands/create-project");
const add_event_1 = require("./commands/add-event");
const create_command_1 = require("./commands/create-command");
const create_mediator_1 = require("./commands/create-mediator");
const create_proxy_1 = require("./commands/create-proxy");
const create_service_1 = require("./commands/create-service");
const create_model_1 = require("./commands/create-model");
const create_store_model_1 = require("./commands/create-store-model");
const add_mediator_listener_1 = require("./commands/add-mediator-listener");
const add_proxy_listener_1 = require("./commands/add-proxy-listener");
commander_1.program
    .version("1.0.0")
    .description("Coffee Maker CLI - Tools for managing your Coffee Maker application");
commander_1.program
    .command("new <projectName>")
    .description("Create a new Coffee Maker project")
    .action(create_project_1.createNewProject);
commander_1.program
    .command("add-event <eventName>")
    .description("Add a new event to the events configuration")
    .action(add_event_1.addEvent);
commander_1.program
    .command("create-command <name> <eventKey>")
    .description("Create a new command and register it with the facade")
    .action(create_command_1.createCommand);
commander_1.program
    .command("create-mediator <name> <eventKey>")
    .description("Create a new mediator and register it with the facade")
    .action(create_mediator_1.createMediator);
commander_1.program
    .command("create-proxy <name> <eventKey>")
    .description("Create a new proxy and register it with the facade")
    .action(create_proxy_1.createProxy);
commander_1.program
    .command("create-service <name>")
    .description("Create a new service and register it with the facade")
    .action(create_service_1.createService);
commander_1.program
    .command("create-model <name>")
    .description("Create a new model")
    .action(create_model_1.createModel);
commander_1.program
    .command("create-store-model <name>")
    .description("Create a new store model")
    .action(create_store_model_1.createStoreModel);
commander_1.program
    .command("add-mediator-listener <mediatorName> <eventKey>")
    .description("Add an event listener to a specific mediator")
    .action(add_mediator_listener_1.addMediatorListener);
commander_1.program
    .command("add-proxy-listener <proxyName> <eventKey>")
    .description("Add an event listener to a specific proxy")
    .action(add_proxy_listener_1.addProxyListener);
commander_1.program.parse(process.argv);
