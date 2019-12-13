/*const moongose = require('mongoose');
const schema = moongose.Schema;
const bcrypt  = require('bcrypt-nodejs');

const usuario_schema = new schema({
    email: { type: String, unique:true,lowercase:true,required:true},
    password:{ type: String,required:true},
    nombre:{ type: String, required:true}
},{
timestamps: true//le agrega prop de creacion y act.
});//representa la informacion y las propiedad que van a estar contenidas del objeto de tipo usuario, 
//moongose nos da el acceso.

usuario_schema.pre('save',function(next){
    const usuario = this;
    if(!usuario.isModified('password')){
        return next();
    }
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            next(err);
        }
        bcrypt.hash(usuario.password,salt,null,(err,hash)=>{
            if (err){
                next(err);
            }
            usuario.password=hash;
            next();
        });
        
    });

     
});
usuario_schema.method.compararPassword =function(pass,cb){
    bcrypt.compare(pass,this.password,function(err,sonIguales){
        if(err){
            return cb(err)
        }
        cb(null,sonIguales);
    });
}
module.exports= moongose.model('usuario',usuario_schema);
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);