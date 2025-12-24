import { TaskCreator } from "./services/TaskCreator";
import { EmailService } from "./services/EmailService";

// Use TaskCreator
const taskCreator = new TaskCreator();
taskCreator.createTask("Finish TypeScript assignment");

// Use EmailService
const emailService = new EmailService();
emailService.sendEmail("example@mail.com");
