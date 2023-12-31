import userResolver from "./resolver/userResolver.js";

const mutationsResolver = {
  signupUser: userResolver,
};
export default mutationsResolver;
