// Observer interface behavior (by convention)

// Smartphone observer
class Smartphone {
  update() {
    console.log("Smartphone received notification");
  }
}

// Tablet observer
class Tablet {
  update() {
    console.log("Tablet received notification");
  }
}

// Subject: NotificationCenter
class NotificationCenter {
  constructor() {
    this.observers = [];
  }

  attach(observer) {
    this.observers.push(observer);
    console.log(`Observer added: ${observer.constructor.name}`);
  }

  detach(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
    console.log(`Observer removed: ${observer.constructor.name}`);
  }

  notify() {
    this.observers.forEach(observer => observer.update());
  }
}

// Usage
const notificationCenter = new NotificationCenter();

const phone = new Smartphone();
const tablet = new Tablet();

notificationCenter.attach(phone);
notificationCenter.attach(tablet);

notificationCenter.notify();
