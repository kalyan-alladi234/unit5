// Task-related responsibility
class TaskService {
  createTask(name: string): void {
    console.log(`Creating task: ${name}`);
  }
}

// Email-related responsibility
class EmailService {
  sendEmail(to: string): void {
    console.log(`Sending email to ${to}`);
  }
}

// Orchestrator (uses both services)
class TaskManager {
  private taskService: TaskService;
  private emailService: EmailService;

  constructor(taskService: TaskService, emailService: EmailService) {
    this.taskService = taskService;
    this.emailService = emailService;
  }

  createTaskAndNotify(taskName: string, email: string): void {
    this.taskService.createTask(taskName);
    this.emailService.sendEmail(email);
  }
}

// Usage
const taskService = new TaskService();
const emailService = new EmailService();

const taskManager = new TaskManager(taskService, emailService);
taskManager.createTaskAndNotify("Finish SRP assignment", "user@gmail.com");
