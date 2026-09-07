const bcrypt = require("bcryptjs");
const User = require("../models/User");

/**
 * Ensures at least one Administrator account exists so the application
 * can be logged into on a fresh database. Runs once at server startup.
 *
 * Credentials are read from env vars when provided, otherwise fall back
 * to a known default — which is intentionally printed to the console
 * with a reminder to change it, since this is a development bootstrap
 * convenience, not a production-safe mechanism.
 */
const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "Administrator" });

    if (existingAdmin) {
      return;
    }

    const email = (
      process.env.DEFAULT_ADMIN_EMAIL || "admin@bloodbank.com"
    ).toLowerCase();

    const password = process.env.DEFAULT_ADMIN_PASSWORD || "Admin@123";

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "Blood Bank Admin",
      email,
      password: hashedPassword,
      role: "Administrator",
      status: "Active",
    });

    console.log("=================================================");
    console.log(" No administrator account found — one was created.");
    console.log(` Email:    ${email}`);
    console.log(` Password: ${password}`);
    console.log(" Please log in and change this password immediately,");
    console.log(" or set DEFAULT_ADMIN_EMAIL / DEFAULT_ADMIN_PASSWORD");
    console.log(" in your .env before first run.");
    console.log("=================================================");
  } catch (error) {
    console.error("Error seeding default administrator:", error.message);
  }
};

module.exports = seedAdmin;
