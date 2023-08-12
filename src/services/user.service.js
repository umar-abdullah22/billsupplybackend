import pkg from 'lodash';
import User from "../model/users.model";

const { omit } = pkg;


export async function findUserByEmail(email) {
  return User.findOne({email: email});
}
export async function createUser(payload) {
  try {

  
     
     const userData = await User.create(payload);
     console.log(userData._id)  
    return userData

  } catch (error) {
    throw new Error(error);
  }
}
export async function validatePassword({
  email,
  password,
}) {
  const user = await User.findOne({ email }, '-__v -createdAt -updatedAt');

  if (!user) {
    return {error: 'No user found'};
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return {error: 'Invalid credentials'};
  }

  return omit(user.toJSON(), "password");
}
export async function findUser(query) {
  return User.findOne(query).lean();
}