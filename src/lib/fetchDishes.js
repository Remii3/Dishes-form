export const fetchSendNewDish = async (dishData) => {
  try {
    const response = await fetch(
      "https://frosty-wood-6558.getsandbox.com:443/dishes",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(dishData),
      }
    );
    const data = await response.json();
    return { response, data };
  } catch (err) {
    throw new Error(err ? err.message : "Something went wrong.");
  }
};
