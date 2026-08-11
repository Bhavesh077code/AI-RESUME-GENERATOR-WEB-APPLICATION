


export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      //expires: new Date(0),
      //secure: process.env.NODE_ENV === "production",
     //  sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: `Logged out ${email} successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};