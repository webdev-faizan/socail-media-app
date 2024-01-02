import userResolver,{signupEmailVerification} from "./resolver/userResolver.js";

const mutationsResolver = {
  signupUser: userResolver,
  emailVerification: signupEmailVerification,
};
export default mutationsResolver;
