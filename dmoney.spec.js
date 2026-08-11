import axios from "axios";
import { expect } from "chai";
import dotenv from "dotenv";

dotenv.config();

describe("dMoney Integration Flow", function () {
    this.timeout(15000);

    const baseURL = process.env.BASE_URL;

    // Tokens
    let adminToken;
    let systemToken;
    let agentToken;
    let customer1Token;
    let customer2Token;

    // User IDs
    let customer1Id;
    let customer2Id;
    let agentId;
    let merchantId;

    // Random email and phone for every test run
    const randomNumber = Date.now().toString().slice(-6);

    const customer1Email =
        `pronoysarkeramit+${randomNumber}1@gmail.com`;
    const customer1Phone =
        `0120${randomNumber}1`;

    const customer2Email =
        `pronoysarkeramit+${randomNumber}2@gmail.com`;
    const customer2Phone =
        `0120${randomNumber}2`;

    const agentEmail =
        `pronoysarkeramit+${randomNumber}3@gmail.com`;
    const agentPhone =
        `0120${randomNumber}3`;

    const merchantEmail =
        `pronoysarkeramit+${randomNumber}4@gmail.com`;
    const merchantPhone =
        `0120${randomNumber}4`;


    // =========================================================
    // 1. Admin Login
    // =========================================================

    it("should login as Admin", async () => {

        const response = await axios.post(
            `${baseURL}/user/login`,
            {
                email: "admin@dmoney.com",
                password: "1234"
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(200);
        expect(response.data.message).to.contain("Login successful");

        adminToken = response.data.token;

        expect(adminToken).to.be.a("string");
    });


    // =========================================================
    // 2. Create Customer 1
    // =========================================================

    it("should create Customer 1", async () => {

        const response = await axios.post(
            `${baseURL}/user/create/`,
            {
                name: "Sylvester Cole",
                email: customer1Email,
                password: "1234",
                phone_number: customer1Phone,
                nid: "9876543210",
                role: "Customer"
            },
            {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET",
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(201);
        expect(response.data.message).to.contain("User created");

        customer1Id = response.data.user.id;

        expect(customer1Id).to.be.a("number");
    });


    // =========================================================
    // 3. Create Customer 2
    // =========================================================

    it("should create Customer 2", async () => {

        const response = await axios.post(
            `${baseURL}/user/create/`,
            {
                name: "Erin Veum",
                email: customer2Email,
                password: "1234",
                phone_number: customer2Phone,
                nid: "9876543210",
                role: "Customer"
            },
            {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET",
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(201);
        expect(response.data.message).to.contain("User created");

        customer2Id = response.data.user.id;

        expect(customer2Id).to.be.a("number");
    });


    // =========================================================
    // 4. Create Agent
    // =========================================================

    it("should create Agent", async () => {

        const response = await axios.post(
            `${baseURL}/user/create/`,
            {
                name: "Cesar Beer",
                email: agentEmail,
                password: "1234",
                phone_number: agentPhone,
                nid: "9876543210",
                role: "Agent"
            },
            {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET",
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(201);
        expect(response.data.message).to.contain("User created");

        agentId = response.data.user.id;

        expect(agentId).to.be.a("number");
    });


    // =========================================================
    // 5. Create Merchant
    // =========================================================

    it("should create Merchant", async () => {

        const response = await axios.post(
            `${baseURL}/user/create/`,
            {
                name: "Jacob Kozey MD",
                email: merchantEmail,
                password: "1234",
                phone_number: merchantPhone,
                nid: "9876543210",
                role: "Merchant"
            },
            {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET",
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(201);
        expect(response.data.message).to.contain("User created");

        merchantId = response.data.user.id;

        expect(merchantId).to.be.a("number");
    });


    // =========================================================
    // 6. Activate Customer 1
    // =========================================================

    it("should activate Customer 1", async () => {

        const response = await axios.patch(
            `${baseURL}/user/update/${customer1Id}`,
            {
                status: "active"
            },
            {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET",
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(200);
        expect(response.data.message).to.contain("User updated successfully");
        expect(response.data.user.status).to.equal("active");
    });


    // =========================================================
    // 7. Activate Customer 2
    // =========================================================

    it("should activate Customer 2", async () => {

        const response = await axios.patch(
            `${baseURL}/user/update/${customer2Id}`,
            {
                status: "active"
            },
            {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET",
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(200);
        expect(response.data.message).to.contain("User updated successfully");
        expect(response.data.user.status).to.equal("active");
    });


    // =========================================================
    // 8. Activate Agent
    // =========================================================

    it("should activate Agent", async () => {

        const response = await axios.patch(
            `${baseURL}/user/update/${agentId}`,
            {
                status: "active"
            },
            {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET",
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(200);
        expect(response.data.message).to.contain("User updated successfully");
        expect(response.data.user.status).to.equal("active");
    });


    // =========================================================
    // 9. Activate Merchant
    // =========================================================

    it("should activate Merchant", async () => {

        const response = await axios.patch(
            `${baseURL}/user/update/${merchantId}`,
            {
                status: "active"
            },
            {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET",
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(200);
        expect(response.data.message).to.contain("User updated successfully");
        expect(response.data.user.status).to.equal("active");
    });


    // =========================================================
    // 10. System Login
    // =========================================================

    it("should login as System", async () => {

        const response = await axios.post(
            `${baseURL}/user/login`,
            {
                email: "system@dmoney.com",
                password: "1234"
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(200);
        expect(response.data.message).to.contain("Login successful");

        systemToken = response.data.token;

        expect(systemToken).to.be.a("string");
    });


    // =========================================================
    // 11. System → Agent Deposit
    // =========================================================

    it("should deposit 5000 from System to Agent", async () => {

        const response = await axios.post(
            `${baseURL}/transaction/deposit`,
            {
                from_account: "SYSTEM",
                to_account: agentPhone,
                amount: 5000
            },
            {
                headers: {
                    Authorization: `Bearer ${systemToken}`,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET",
                    "Content-Type": "application/json"
                }
            }
        );

        // Your actual API returned 201 for this request
        expect(response.status).to.equal(201);

        expect(response.data.message).to.contain(
            "SYSTEM deposit to Agent successful"
        );

        expect(response.data.amount).to.equal(5000);

        // No fee / commission field should exist
        expect(response.data).to.not.have.property("fee");
        expect(response.data).to.not.have.property("commission");
    });


    // =========================================================
    // 12. Agent Login
    // =========================================================

    it("should login as Agent", async () => {

        const response = await axios.post(
            `${baseURL}/user/login?env=dev`,
            {
                email: agentPhone,
                password: "1234"
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(200);
        expect(response.data.message).to.contain("OTP sent");
    });


    // =========================================================
    // 13. Agent OTP
    // =========================================================

    it("should verify Agent OTP", async () => {

        const response = await axios.post(
            `${baseURL}/user/verify-otp?env=dev`,
            {
                identifier: agentPhone,
                otp: "0000"
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(200);

        agentToken = response.data.token;

        expect(agentToken).to.be.a("string");
    });


    // =========================================================
    // 14. Agent → Customer 1 Deposit
    // =========================================================

    it("should deposit 2000 from Agent to Customer 1 and verify commission", async () => {

        const response = await axios.post(
            `${baseURL}/transaction/deposit`,
            {
                from_account: agentPhone,
                to_account: customer1Phone,
                amount: 2000
            },
            {
                headers: {
                    Authorization: `Bearer ${agentToken}`,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET",
                    "Content-Type": "application/json"
                }
            }
        );

  
        expect(response.status).to.equal(201);

        expect(response.data.message).to.contain("Deposit successful");

        // 2.5% of 2000 = 50
        expect(response.data.commission).to.equal(50);
    });


    // =========================================================
    // 15. Customer 1 Login
    // =========================================================

    it("should login as Customer 1", async () => {

        const response = await axios.post(
            `${baseURL}/user/login?env=dev`,
            {
                email: customer1Email,
                password: "1234"
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(200);
        expect(response.data.message).to.contain("OTP sent");
    });


    // =========================================================
    // 16. Customer 1 OTP
    // =========================================================

    it("should verify Customer 1 OTP", async () => {

        const response = await axios.post(
            `${baseURL}/user/verify-otp?env=dev`,
            {
                identifier: customer1Email,
                otp: "0000"
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(200);

        customer1Token = response.data.token;

        expect(customer1Token).to.be.a("string");
    });


    // =========================================================
    // 17. Customer 1 → Customer 2 Send Money
    // =========================================================

    it("should send 1000 from Customer 1 to Customer 2 and verify service fee", async () => {

        const response = await axios.post(
            `${baseURL}/transaction/sendmoney`,
            {
                from_account: customer1Phone,
                to_account: customer2Phone,
                amount: 1000
            },
            {
                headers: {
                    Authorization: `Bearer ${customer1Token}`,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET",
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(201);

        expect(response.data.message).to.contain(
            "Send money successful"
        );

        // Flat service fee = 5
        expect(response.data.fee).to.equal(5);
    });


    // =========================================================
    // 18. Customer 2 Login
    // =========================================================

    it("should login as Customer 2", async () => {

        const response = await axios.post(
            `${baseURL}/user/login?env=dev`,
            {
                email: customer2Email,
                password: "1234"
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(200);
        expect(response.data.message).to.contain("OTP sent");
    });


    // =========================================================
    // 19. Customer 2 OTP
    // =========================================================

    it("should verify Customer 2 OTP", async () => {

        const response = await axios.post(
            `${baseURL}/user/verify-otp?env=dev`,
            {
                identifier: customer2Email,
                otp: "0000"
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(200);

        customer2Token = response.data.token;

        expect(customer2Token).to.be.a("string");
    });


    // =========================================================
    // 20. Customer 2 → Agent Cashout
    // =========================================================

    it("should cashout 500 from Customer 2 to Agent and verify service fee", async () => {

        const response = await axios.post(
            `${baseURL}/transaction/withdraw`,
            {
                from_account: customer2Phone,
                to_account: agentPhone,
                amount: 500
            },
            {
                headers: {
                    Authorization: `Bearer ${customer2Token}`,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET",
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(201);

        expect(response.data.message).to.contain(
            "Withdraw successful"
        );

        // 1% of 500 = 5
        // Minimum fee = 5
        expect(response.data.fee).to.equal(5);
    });


    // =========================================================
    // 21. Customer 2 → Merchant Payment
    // =========================================================

    it("should pay 400 from Customer 2 to Merchant and verify service fee", async () => {

        const response = await axios.post(
            `${baseURL}/transaction/payment`,
            {
                from_account: customer2Phone,
                to_account: merchantPhone,
                amount: 400
            },
            {
                headers: {
                    Authorization: `Bearer ${customer2Token}`,
                    "X-AUTH-SECRET-KEY": "ROADTOSDET",
                    "Content-Type": "application/json"
                }
            }
        );

        expect(response.status).to.equal(201);

        expect(response.data.message).to.contain(
            "Payment successful"
        );

        // 1% of 400 = 4
        // Minimum fee = 5
        expect(response.data.fee).to.equal(5);
    });

});