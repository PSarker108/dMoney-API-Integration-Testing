# dMoney API Integration Testing

Automated API integration testing project for the dMoney application using **Mocha, Chai, and Axios**.

The project validates a complete transaction flow starting from user creation and activation through multiple financial transactions, including deposits, send money, cashout, and merchant payment.

## Tech Stack

- Node.js
- JavaScript
- Mocha
- Chai
- Axios
- dotenv

## Project Flow

The test suite validates the following end-to-end flow:

1. Admin Login
2. Create Customer 1
3. Create Customer 2
4. Create Agent
5. Create Merchant
6. Activate Customer 1
7. Activate Customer 2
8. Activate Agent
9. Activate Merchant
10. System Login
11. System deposits 5000 Tk to Agent
12. Agent Login
13. Agent OTP Verification
14. Agent deposits 2000 Tk to Customer 1
    - Verify deposit commission
15. Customer 1 Login
16. Customer 1 OTP Verification
17. Customer 1 sends 1000 Tk to Customer 2
    - Verify service fee
18. Customer 2 Login
19. Customer 2 OTP Verification
20. Customer 2 cashes out 500 Tk from Agent
    - Verify service fee
21. Customer 2 pays 400 Tk to Merchant
    - Verify service fee

## Test Coverage

The integration flow validates:

- API response status codes
- Authentication and authorization
- User creation
- User activation
- OTP verification
- System-to-Agent deposit
- Agent-to-Customer deposit
- Deposit commission
- Customer-to-Customer money transfer
- Send money service fee
- Customer cashout
- Cashout service fee
- Customer-to-Merchant payment
- Payment service fee
- End-to-end transaction flow

## Project Structure

```text
dMoney-API-Integration-Testing/
│
├── dmoney.spec.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
````

> `.env` is excluded from version control and should be created locally.

## Environment Configuration

Create a `.env` file in the project root:

```env
BASE_URL=http://localhost:5000
```

The test suite reads the API base URL from the environment configuration instead of hardcoding it in the test file.

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate to the project directory:

```bash
cd dMoney-API-Integration-Testing
```

Install dependencies:

```bash
npm install
```

Make sure the dMoney API is running locally before executing the tests.

## Run Tests

Run the complete integration test suite with:

```bash
npm test
```

The test suite is configured in `package.json`, so the complete test flow can be executed using a single command.

## Test Execution Result

The complete integration flow currently executes successfully with all test cases passing.

```text
  dMoney Integration Flow
    ✔ should login as Admin
    ✔ should create Customer 1
    ✔ should create Customer 2
    ✔ should create Agent
    ✔ should create Merchant
    ✔ should activate Customer 1
    ✔ should activate Customer 2
    ✔ should activate Agent
    ✔ should activate Merchant
    ✔ should login as System
    ✔ should deposit 5000 from System to Agent
    ✔ should login as Agent
    ✔ should verify Agent OTP
    ✔ should deposit 2000 from Agent to Customer 1 and verify commission
    ✔ should login as Customer 1
    ✔ should verify Customer 1 OTP
    ✔ should send 1000 from Customer 1 to Customer 2 and verify service fee
    ✔ should login as Customer 2
    ✔ should verify Customer 2 OTP
    ✔ should cashout 500 from Customer 2 to Agent and verify service fee
    ✔ should pay 400 from Customer 2 to Merchant and verify service fee

  21 passing
```

## Testing Approach

The project follows an end-to-end integration testing approach where dependent API operations are executed sequentially.

Data generated during earlier steps is reused by subsequent requests. For example:

* Newly created user IDs are used during activation.
* Authentication tokens are stored and reused for authorized requests.
* Generated customer and agent account information is reused throughout the transaction flow.
* Each transaction validates both the API response status and relevant business response data.

This allows the test suite to verify that multiple APIs work correctly together as a complete transaction workflow.

## Dependencies

The project uses:

* **Axios** — HTTP client for sending API requests
* **Mocha** — Test framework and test runner
* **Chai** — Assertion library
* **dotenv** — Environment variable management

## Security

Sensitive configuration and credentials are kept outside the source code using environment variables.

The following files are excluded from Git:

```text
.env
node_modules/
```

## Author

Pronoy Sarker

```
