import mongoose,{Types} from 'mongoose';
import config from '../../enviorments';
import bcrypt from 'bcrypt';


const { SALT } = config;

const UserSchema = new mongoose.Schema({
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  email: { type: String, default: '' },
  password: {type: String },
  identityId: { type: String, default: '' },
  referredBy: { type: String, default: '' },
}, { timestamps: true });


UserSchema.pre("save", async function (next) {
  let user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();
  const saltRound = parseInt(SALT)
  console.log("SALT:",SALT)
  const salt = await bcrypt.genSalt(saltRound);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});

// Used for logging in
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};


const User = mongoose.model("user", UserSchema);
export default User;