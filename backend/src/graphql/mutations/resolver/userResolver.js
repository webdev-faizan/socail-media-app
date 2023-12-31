import userModel from "../../../model/userModel.js";
import sendNodemailerMail from "../../../services/mail.js";
import VerifedEmailMail from "../../../templates/mail/VerifedEmailMail.js";
const UserRegistration = async (_, userInfo) => {
  const { firstName, lastName, email, password } = userInfo.registerationForm;
  const isAlreadyUserRegister = await userModel.findOne({ email });
  if (false) {
    return {
      message: "Already user register",
      extenstions: {
        status: 400,
      },
    };
  } else {
    const this_user = new userModel({
      firstName,
      lastName,
      email,
      password,
      optExpiryToken: Date.now() + 10 * 60 * 1000,
    });

    await this_user.save();

    const link = `${process.env.BASE_URL}/verify-email/${this_user._id}`;

    const html = await VerifedEmailMail(firstName + " " + lastName, link);
    await sendNodemailerMail({ to: email, subject: "Email Verified", html });

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
