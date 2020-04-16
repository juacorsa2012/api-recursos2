const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema(
{
    nombre: {
        type: String,
        required: [true, 'El nombre del usuario es un dato requerido'],      
        trim: true
    },
    
    email: {
        type: String,
        required: [true, 'El email del usuario es un dato requerido'],      
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'El email no tiene el formato esperado']
    },

    password: {
        type: String,
        required: [true, 'La contraseña del usuario es un dato requerido'],             
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
        select: false
    },

    rol: {
        type: String,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    },   
    
    created_at: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
});

usuarioSchema.methods.esPasswordCorrecto = async function(bodyPassword, userPassword) {
    return await bcrypt.compare(bodyPassword, userPassword)
};

const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios');

module.exports = Usuario;