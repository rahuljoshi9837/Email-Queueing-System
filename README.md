# 📬 Email Queueing System using Node.js, RabbitMQ, and Docker

This is a **Dockerized Email Queueing System** built with **Node.js microservices** and **RabbitMQ**. It demonstrates asynchronous communication between services for scalable and reliable email processing.

---

## 🚀 Features

- Microservice-based architecture using Node.js
- REST API (Producer) to queue email messages
- RabbitMQ message broker for communication between services
- Worker service (Consumer) for sending emails using Nodemailer
- Docker & Docker Compose for containerized deployment
- Retry logic for RabbitMQ connection failures
- Support for environment configuration via `.env` file

---

## 🧰 Tech Stack

- Node.js
- Express.js
- RabbitMQ
- Nodemailer
- Docker & Docker Compose

---

## 📁 Project Structure

```
email-queueing-system/
├── producer/              # API service to queue emails
│   ├── index.js
│   └── routes/email.js
├── consumer/              # Worker service to send emails
│   └── worker.js
├── shared/                # Shared environment configuration
│   └── config.js
├── .env                   # Environment variables (excluded from Git)
├── .gitignore
├── docker-compose.yml
├── README.md
└── package.json
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rahuljoshi9837/Email-Queueing-System.git
cd email-queueing-system
```

### 2. Create a `.env` file

Create a `.env` file in the root directory with the following content:

```env
PORT=5000
RABBITMQ_URL=amqp://rabbitmq
EMAIL_QUEUE=email_queue
SMTP_USER=your@email.com
SMTP_PASS=your_app_password
```

> 🔐 **Note:** If you're using Gmail, you must enable [2-Step Verification](https://myaccount.google.com/security) and generate an [App Password](https://myaccount.google.com/apppasswords).

---

### 3. Start the application

```bash
docker-compose up --build
```

This command will:
- Start RabbitMQ (with management UI on port `15672`)
- Launch the **Producer** service on port `5000`
- Launch the **Consumer** worker service

---

## 🐳 Sample docker-compose.yml

```yaml
version: '3.8'

services:
  rabbitmq:
    image: rabbitmq:3-management
    container_name: rabbitmq
    ports:
      - "5672:5672"
      - "15672:15672"
    environment:
      RABBITMQ_DEFAULT_USER: guest
      RABBITMQ_DEFAULT_PASS: guest

  producer:
    build:
      context: .
      dockerfile: producer/Dockerfile
    container_name: producer
    depends_on:
      - rabbitmq
    environment:
      - PORT=5000
      - RABBITMQ_URL=amqp://rabbitmq
      - EMAIL_QUEUE=email_queue
      - SMTP_USER=your@email.com
      - SMTP_PASS=your_app_password
    ports:
      - "5000:5000"

  consumer:
    build:
      context: .
      dockerfile: consumer/Dockerfile
    container_name: consumer
    depends_on:
      - rabbitmq
    environment:
      - RABBITMQ_URL=amqp://rabbitmq
      - EMAIL_QUEUE=email_queue
      - SMTP_USER=your@email.com
      - SMTP_PASS=your_app_password
```

> 📝 Be sure to replace `SMTP_USER` and `SMTP_PASS` with your real email and app password in your `.env` file or environment section.

---

## 🧪 Testing the API

Send a POST request to the following endpoint using Postman or cURL:

### Endpoint

```
POST http://localhost:5000/api/email
```

### Sample Request Body

```json
{
  "to": "receiver@example.com",
  "subject": "Test Email",
  "body": "Hello from Dockerized Microservices!"
}
```

---

## 🐇 Accessing RabbitMQ UI

- URL: [http://localhost:15672](http://localhost:15672)
- Username: `guest`
- Password: `guest`

Click on **Queues** → **email_queue** to monitor messages.

---

## 📌 Future Improvements

- Add logging of successful and failed email attempts
- Save message status to MongoDB for analytics
- Implement a retry mechanism or dead-letter queue
- Build a frontend dashboard to visualize queued and sent emails

---

## 👨‍💻 Author

**Rahul Joshi**  
Node.js & Microservices Developer | Passionate about scalable backend systems