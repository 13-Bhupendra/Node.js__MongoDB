import { UserProfile_Collection } from "../model/userProfile_model.js";

/* ========== Get Profile ========== */
export const getUserProfile = async (req, res) => {
  try {
    const email = req.user.email;

    const user = await UserProfile_Collection.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Profile fetched",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Profile fetch failed",
      error: error.message,
    });
  }
};

/* ========== Update Profile ========== */
export const updateUserProfile = async (req, res) => {
  try {
    const email = req.user.email;
    const { phone, pincode, address, city, state } = req.body;

    const user = await UserProfile_Collection.findOneAndUpdate(
      { email },
      { $set: { phone, pincode, address, city, state } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Profile update failed",
      error: error.message,
    });
  }
};
