import userModel from "../../../model/userModel.js";
const UserRegistration = async (_, userInfo) => {
  const { firstName, lastName, email, password } = userInfo.registerationForm;
  const isAlreadyUserRegister = await userModel.findOne({ email });
  if (isAlreadyUserRegister) {
    return {
      message: "Already user register",
      extenstions: {
        status: 402,
      },
    };
  } else {
    const this_user = new userModel({
      firstName,
      lastName,
      email,
      password,
    });
    await this_user.save();
    return {
      ...this_user.toObject(),
      message: "User successfully registered!",
      extenstions: {
        status: 201,
      },
    };
  }
};

export default UserRegistration;
