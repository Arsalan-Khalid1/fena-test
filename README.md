# Test Project

### Prerequisites

Docker is required to run this project.

### Installation

Follow these steps to set up and run the project:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/your-repo.git

   ```

2. Build the Docker images for the project components:

   ```bash
   docker build -t app ./app/
   docker build -t email-sender ./email_sender/
   docker build -t client ./client/

   ```

3. Start the project using Docker Compose::
   ```bash
   docker-compose up
   ```
