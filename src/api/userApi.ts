const currentUser = {
  email: "aas",
  _id: "123as",
  password: "@abcAbc",
};
export const getUser = async () => {
  return currentUser?.email ? currentUser : null;
};
