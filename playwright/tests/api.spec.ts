import { test, expect } from "@playwright/test";
import { REQUEST_URL, PRODUCT_ID } from "../test-data/constants"; // Constants for API base URL and product ID
import REQUEST_BODY from "../test-data/request_body.json"; // Sample request body used in POST request

// -----------------------------
// Matchers Examples
// -----------------------------
test.describe("Matchers example", () => {
  // ✅ Test for object inclusion within an array
  test("toContainEqual example", async () => {
    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    expect(users).toContainEqual({ id: 1, name: "Alice" });
  });

  // ✅ Deep equality check between two objects
  test("toEqual example", async () => {
    expect({ name: "Alice", age: 30 }).toEqual({
      name: "Alice",
      age: 30,
    });
  });

  // ✅ Partial object match using toMatchObject
  test("toMatchObject example", async () => {
    const user = {
      id: 1,
      name: "Alice",
      age: 30,
    };
    expect(user).toMatchObject({ name: "Alice" }); // Ignores extra keys
  });

  // ✅ Manual nested property access check
  test("manual nested property check", async () => {
    const user = {
      profile: {
        name: "Alice",
      },
    };
    expect(user.profile.name).toBe("Alice"); // Direct nested property check
  });
});

// -----------------------------
// API Test Suite: CRUD Operations
// -----------------------------
test.describe("CRUD Operations", () => {
  // ✅ GET request: List all products
  test("API Test - GET Products", async ({ request }) => {
    const response = await request.get(REQUEST_URL);
    const responseBody = await response.json(); // Parse JSON body

    expect(response.ok()).toBeTruthy(); // Check if status is 2xx
    expect(response.status()).toBe(200); // Ensure exact status is 200

    // Check that at least one product matches expected structure
    expect(responseBody).toContainEqual(
      expect.objectContaining({
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      })
    );
  });

  // ✅ GET request: Single product by ID
  test("API TEST 2 - GET Product", async ({ request }) => {
    const response = await request.get(`${REQUEST_URL}/${PRODUCT_ID}`);
    const responseBody = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Partial match: checks only certain fields
    expect(responseBody).toMatchObject({
      title: "Solid Gold Petite Micropave ",
      price: 168,
      category: "jewelery",
    });

    // Check specific properties exist
    expect(responseBody).toHaveProperty("image");
    expect(responseBody).toHaveProperty("rating.rate");
  });

  // ✅ POST request: Create a new product
  test("API TEST 3 - CREATE Product", async ({ request }) => {
    const response = await request.post(REQUEST_URL, {
      data: REQUEST_BODY, // Importing from external JSON
    });

    const responseBody = await response.json();
    console.log(responseBody); // For debugging

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Match fields sent in the request
    expect(responseBody).toMatchObject({
      title: "string",
      price: 0.1,
      description: "string",
      image: "http://example.com",
      category: "string",
    });

    expect(responseBody).toHaveProperty("id"); // New ID should be generated
    expect(responseBody).toHaveProperty("price", 0.1); // Value match check
  });

  // ✅ PUT request: Update an existing product
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
    console.log(responseBody); // Output updated product

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Confirm key fields were updated correctly
    expect(responseBody).toMatchObject({
      title: "Test",
      price: 0.3,
      description: "Test",
    });
  });

  // ✅ DELETE request: Remove a product by ID
  test("API TEST 5 - DELETE Product", async ({ request }) => {
    const response = await request.delete(`${REQUEST_URL}/${PRODUCT_ID}`);
    const responseBody = await response.json();
    console.log(responseBody); // Output deleted item or result

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200); // Deletion was successful
  });
});
