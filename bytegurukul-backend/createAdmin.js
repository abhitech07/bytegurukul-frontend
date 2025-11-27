const bcrypt = require('bcryptjs');
const { User, sequelize } = require('./models'); // Adjust path to your models if needed

const createAdmin = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // --- CHANGE THESE DETAILS ---
        const adminData = {
            username: 'AdminUser',
            email: 'admin@bytegurukul.com',
            password: 'secureAdminPassword123', // You will use this to login
            role: 'Admin' // Ensure this matches your Role logic (case-sensitive)
        };

        // Manually hash the password since we might use bulkCreate or update which bypasses hooks sometimes
        // or to be explicit.
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminData.password, salt);

        const existingAdmin = await User.findOne({ where: { email: adminData.email } });
        
        if (existingAdmin) {
            console.log('Admin user already exists. Updating password...');
            // Update the existing user's password
            existingAdmin.password = hashedPassword;
            existingAdmin.role = adminData.role; // Ensure role is correct
            await existingAdmin.save();
            console.log('Admin password updated successfully!');
        } else {
            // Create new admin with hashed password
            const admin = await User.create({
                ...adminData,
                password: hashedPassword
            });
            console.log(`Admin created successfully! \nEmail: ${admin.email} \nRole: ${admin.role}`);
        }

    } catch (error) {
        console.error('Error creating/updating admin:', error);
    } finally {
        await sequelize.close();
    }
};

createAdmin();