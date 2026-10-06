const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { MONGODB_URL } = require('../config');

const uri = MONGODB_URL;

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  verifyToken: String,
  verifyTokenExpire: Date,
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function seedAdmin() {
  const adminEmail = process.argv[2] || 'admin@zevora.com';
  const adminPassword = process.argv[3] || 'admin123';

  console.log(`Connecting to MongoDB...`);
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB.');

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      existingAdmin.isVerified = true;
      await existingAdmin.save();
      console.log(`\n===========================================`);
      console.log(` Admin user UPDATED successfully!`);
      console.log(` Email:    ${adminEmail}`);
      console.log(` Password: ${adminPassword}`);
      console.log(` Login URL: http://localhost:3000/admin-dashboard/login`);
      console.log(`===========================================\n`);
    } else {
      await Admin.create({
        email: adminEmail,
        password: hashedPassword,
        isVerified: true,
      });
      console.log(`\n===========================================`);
      console.log(` Admin user CREATED successfully!`);
      console.log(` Email:    ${adminEmail}`);
      console.log(` Password: ${adminPassword}`);
      console.log(` Login URL: http://localhost:3000/admin-dashboard/login`);
      console.log(`===========================================\n`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Failed to seed admin user:', err.message);
    process.exit(1);
  }
}

seedAdmin();
