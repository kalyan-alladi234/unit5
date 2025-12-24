"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TaskCreator_1 = require("./services/TaskCreator");
const EmailService_1 = require("./services/EmailService");
// Use TaskCreator
const taskCreator = new TaskCreator_1.TaskCreator();
taskCreator.createTask("Finish TypeScript assignment");
// Use EmailService
const emailService = new EmailService_1.EmailService();
emailService.sendEmail("example@mail.com");
