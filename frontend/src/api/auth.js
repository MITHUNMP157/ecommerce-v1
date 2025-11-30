export const register = async (email, password) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const rawData = await response.text();
    console.log(email, password);
    let data;
    try {
      data = rawData ? JSON.parse(rawData) : null;
      console.log(data);
    } catch (raw) {
      console.log("Invalid JSON Response:", raw);
      throw new Error("Server did not return valid JSON");
    }

    if (!response.ok) {
      throw new Error(data.message || "Register Failed");
    }
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);
    if (!response) {
      throw new Error(data.message || "Invalid Credentials");
    }

    const token = data.token;
    const role = data.role;
    const userEmail = data.email;
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("userEmail", userEmail);
    return token;
  } catch (error) {
    console.error(
      `Error during login:`,
      error.response ? error.response.data : error.message
    );
    throw new Error(error.message || "Login Failed");
  }
};

export const verifyToken = async () => {
  const token = localStorage.getItem("token");
  if (!token) return { valid: false };
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}/verifyToken`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return { valid: false };
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Token verification failed:", error);
    localStorage.removeItem("token");
    return { valid: false };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
