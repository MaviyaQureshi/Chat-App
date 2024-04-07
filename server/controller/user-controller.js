import User from "../modal/User.js";

export const addUser = async (request, response) => {
  try {
    const { sub } = request.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ sub });
    if (existingUser) {
      return response
        .status(200)
        .json({ message: "User already exists", user: existingUser });
    }

    // Create a new user
    const newUser = new User(request.body);
    await newUser.save();
    response
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getUser = async (request, response) => {
  try {
    // Fetch all users from the database
    const users = await User.find({});
    response.status(200).json({ users });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
