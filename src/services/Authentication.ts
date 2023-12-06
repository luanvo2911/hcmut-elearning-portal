import instance from "../utils/http-common";
import FormType from "../types/FormData";

const auth = async (data: FormType): Promise<string> => {
  const { username, password } = data;
  const returnRoles = await instance
    .post<FormType[]>("/", {
      query: `
      SELECT user_info.account_type FROM user_information user_info \
      WHERE user_info.user_name = '${username}' and user_info.user_password = '${password}'
    `,
    })
    .then(({ data }) => {
      console.log(data);
      let returnRoles: string = "";
      if (data.length == 0) {
        returnRoles = "Invalid account";
      } else {
        const { account_type } = data[0];
        returnRoles = account_type;
      }
      return returnRoles;
    });
  return returnRoles;
};

export default auth;
