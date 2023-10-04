# Test Project

### Prerequisites

Docker is required to run this project.

### Installation

Follow these steps to set up and run the project:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Arsalan-Khalid1/fena-test.git

   ```

2. Create the network layer and setup bridge:

   ```bash
   sudo docker network create app-tier --driver bridge

   ```

3. Build the Docker images for the project components:

   ```bash
   sudo docker build -t app ./app/
   sudo docker build -t email-sender ./email_sender/

   ```

4. Start the project using Docker Compose::

   ```bash
   sudo docker-compose up
   ```

5. open browser::
   localhost:8080
