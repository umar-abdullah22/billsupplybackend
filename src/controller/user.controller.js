import log from "../utils/logger";
import { createUser, findUser,validatePassword} from "../services/user.service";
import { sign } from "../utils/jwtToken";


// Register user
export async function CreateUserHandler(req, res) {
  try {
      
    const payload = req.body;
    const emailPresent = await findUser({ email: payload.email });
    if(emailPresent){
      return res.status(403).json({
        err: 'User already exists with this email address',
        statusCode: 2
        })
    }
    const userData = await createUser(payload);

    return res.status(200).json({
      data: userData,
      statusCode: 1,
      statusDesc: "signed up successfully.",
    })


  } catch (e) {
    log.error(e);
    return res.status(409).json({
      statusCode: 0,
      statusDesc: "error occurred while saving user details."});
  }
}

// Login user
export async function LoginUser(req, res) {
  try {
    const { email, password } = req.body;
    const emailPresent = await findUser({ email: email });
    if(emailPresent){
      const user = await validatePassword({email, password});
      if(user.hasOwnProperty('error')){
        return res.status(400).json({
          statusCode: 0,
          statusDesc: "user with this email does not exist.",
        })
      } else {
        const token = sign({_id:user._id});
        const result = Object.assign(user);
        const cookieOptions = {
          expires: new Date(
            Date.now()+90*24*60*60*1000
          ),
          httpOnly: true
        };
  
            // res.cookie('jwt',token,cookieOptions)
          result.token =  token
          result.expires =  cookieOptions
        return res.status(200).json({
          data: result,
          statusCode: 1,
          statusDesc: "signed in successfully.",
        })
      }
    }else{
      return res.status(400).json({
        statusCode: 0,
        statusDesc: "user with this email does not exist.",
      })

    }
    
  } catch(e){
    log.error(e);
    res.status(400).json({ error: e.message ,
      statusCode: 0,
      statusDesc: "error occurred."
    });
  }
}