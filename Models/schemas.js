const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for drones
const droneSchema = new Schema({
    name: String,
    description: String,
    model: String,
    manufacturingDate: Date,
    status: String,
    price: Number,
    parts: [{
        partId: { type: Schema.Types.ObjectId, ref: 'Part' },
        quantity: Number
    }],
    assemblyStages: [{ type: Schema.Types.ObjectId, ref: 'AssemblyStage' }],
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

// Define schema for parts
const partSchema = new Schema({
    name: String,
    description: String,
    category: String,
    quantityAvailable: Number,
    price: Number,
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier' }
});

// Define schema for assembly stages
const assemblyStageSchema = new Schema({
    name: String,
    description: String
});

// Define schema for users
const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    role: String
});

// Define schema for suppliers
const supplierSchema = new Schema({
    name: String,
    contactInformation: String
});

// Export schemas
module.exports = {
    Drone: mongoose.model('Drone', droneSchema),
    Part: mongoose.model('Part', partSchema),
    AssemblyStage: mongoose.model('AssemblyStage', assemblyStageSchema),
    User: mongoose.model('User', userSchema),
    Supplier: mongoose.model('Supplier', supplierSchema)
};
