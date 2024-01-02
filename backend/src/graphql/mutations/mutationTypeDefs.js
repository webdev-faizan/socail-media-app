import {
  userTypedefs,
  emailVerificationTypedefs,
} from "../typedefs/userTypedefs.js";

const mutationTypeDefs = `
${userTypedefs}
${emailVerificationTypedefs}


`;

export default mutationTypeDefs;
