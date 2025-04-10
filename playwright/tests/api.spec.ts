import { test, expect } from "@playwright/test";
import { REQUEST_URL, PRODUCT_ID } from "../test-data/constants";
import RESPONSE_BODY from "../test-data/request_body.json";
import { log } from "console";
// -----------------------------
// Matchers Examples
// -----------------------------
test.describe("Matchers example", () => {
  test("toContainEqual example", async () => {
    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    expect(users).toContainEqual({ id: 1, name: "Alice" });
  });

  test("toEqual example", async () => {
    expect({ name: "Alice", age: 30 }).toEqual({
      name: "Alice",
      age: 30,
    });
  });

  test("toMatchObject example", async () => {
    const user = {
      id: 1,
      name: "Alice",
      age: 30,
    };
    expect(user).toMatchObject({ name: "Alice" });
  });

  test("manual nested property check", async () => {
    const user = {
      profile: {
        name: "Alice",
      },
    };
    expect(user.profile.name).toBe("Alice");
  });
});
// -----------------------------
// API Test Example
// -----------------------------
test.describe("CRUD Operations", () => {
  test("API Test - GET Products", async ({ request }) => {
    const response = await request.get(REQUEST_URL);
    const responseBody = await response.json();

    expect(response.ok()).toBeTruthy(); // Status is 2xx
    expect(response.status()).toBe(200); // Specifically 200 OK

    expect(responseBody).toContainEqual(
      // Ensure product with matching title exists
      expect.objectContaining({
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      })
    );
  });

  test("API TEST 2 - GET Product", async ({ request }) => {
    const response = await request.get(`${REQUEST_URL}/${PRODUCT_ID}`);
    const responseBody = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // ✅ Check that the response object contains a specific title
    expect(responseBody).toMatchObject({
      title: "Solid Gold Petite Micropave ",
    });
    expect(response.body).toMatchObject({ price: 168, category: "jewelery" });
    expect(response.body).toHaveProperty("image");
    expect(response.body).toHaveProperty("rating.rate");
  });

  test("API TEST 3 - CREATE Product", async ({ request }) => {
    const response = await request.post(REQUEST_URL, {
      data: RESPONSE_BODY,
    });

    const responseBody = await response.json();

    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    console.log(response.status());
    expect(response.status()).toBe(200);

    expect(responseBody).toEqual({
      id: 21,
      title: "string",
      price: 0.1,
      description: "string",
      image: "http://example.com",
      category: "string",
    });

    expect(responseBody).toHaveProperty("price", 0.1);
  });

  test("API TEST 4 - UPDATE Product", async ({ request }) => {
    const response = await request.put(`${REQUEST_URL}/${PRODUCT_ID}`, {
      data: {
        id: 6,
        title: "Test",
        price: 0.3,
        description: "Test",
        category: "string",
        image: "http://example.com",
      },
    });
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.ok()).toBeTruthy();

    expect(response.status()).toBe(200);

    expect(responseBody).toMatchObject({
      title: "Test",
      price: 0.3,
      description: "Test",
    });
  });

  test("API TEST 5 - DELETE Product", async ({ request }) => {
    const response = await request.delete(`${REQUEST_URL}/${PRODUCT_ID}`);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
  });
});
