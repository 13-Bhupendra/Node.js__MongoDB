import { Auth_Collection } from "../model/auth_model.js";
import { UserProfile_Collection } from "../model/userProfile_model.js";

// ============== Get all user data controller =============*/
export const getAllUsersData = async (req, res)=>{
    try {
        const users = await Auth_Collection.find({role : "user"});

         res.status(200).json({status : true , message : "Users fetched successfully !" , users});
    } catch (error) {
         res.status(500).json({status : false , message : "Users fetched failed !" , error});
    }
}


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


// ============== Admin edit user (name + email) =============*/
export const adminEditUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!id) {
      return res.status(400).json({ status: false, message: "User id is required" });
    }

    const authDoc = await Auth_Collection.findById(id);
    if (!authDoc) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const oldEmail = authDoc.email;

    if (email && email !== oldEmail) {
      const existing = await Auth_Collection.findOne({ email });
      if (existing && existing._id.toString() !== id) {
        return res.status(400).json({
          status: false,
          errors: { email: "Email already exists" },
        });
      }
    }

    const updatedAuth = await Auth_Collection.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    const updatedProfile = await UserProfile_Collection.findOneAndUpdate(
      { email: oldEmail },
      { $set: { name, email } },
      { new: true }
    );

    res.status(200).json({
      status: true,
      message: "User updated successfully",
      updatedAuth,
      updatedProfile,
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Update failed",
      error: error.message,
    });
  }
};



// ============== Admin delete user =============*/
export const adminDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ status: false, message: "User id is required" });
    }

    const authDoc = await Auth_Collection.findById(id);
    if (!authDoc) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    const email = authDoc.email;

    await Auth_Collection.findByIdAndDelete(id);
    await UserProfile_Collection.findOneAndDelete({ email });

    res.status(200).json({
      status: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Deletion failed",
      error: error.message,
    });
  }
};
