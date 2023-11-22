# Vending Machine API

## Setup
To set up the server, follow these steps:

1. Create your own .env file using the provided .env.example as a template.
2. Fill in the required information in the .env file:
    - MQTT path
    - MongoDB path and connection details
    - Server port


## Initialization
Start the server using the following command:

npm run dev

Once the server is running, the MqttClient implemented in mqttService.ts will subscribe to the MQTT, allowing it to listen to all machine messages and update corresponding data in the database. You can then proceed to use the available endpoints.

# Endpoints
To interact with the server, use the following endpoint paths:

Base Path: http://host:port/api
/machine
Perform various operations related to vending machines. Most operations are designed to gather data for a front-end application.

POST: /machine

- Create a new machine based on the provided data.
- Required data format can be found in MachineDTO.

GET: /machine

- Retrieve information for all machines, including basic details such as id, credit, and status.
/machine/:id
Perform specific operations on a particular machine.

GET: /machine/:id

- Retrieve the same data as the general endpoint, but for a specific machine.
GET: /machine/:id/products

- Retrieve information about the products in the specified machine, including price, stock, and name.
GET: /machine/:id/stats

- Retrieve data related to sales, including total earnings and an array of sales history.

