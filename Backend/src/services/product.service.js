export const find = async () => {
  try {
    const result = [
      {
        id: 1,
        name: "Product 1",
      },
      {
        id: 2,
        name: "Product 2",
      },
    ];
    return result;
  } catch (error) {
    console.log("Error when create user : ", error.message);
    throw new BadRequestError(error.message);
  }
};
