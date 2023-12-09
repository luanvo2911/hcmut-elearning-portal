import { instance } from "@utils/http-common";
import { FormType, User } from "@/types/user";

const auth = async (data: FormType): Promise<User> => {
  const { username, password } = data;
  const returnRoles = await instance
    .post<User[]>("/", {
      query: `
      SELECT user_info.account_type, user_info.user_id, user_info.user_name FROM user_information user_info 
      WHERE user_info.user_name = '${username}' and user_info.user_password = '${password}'
    `,
    })
    .then(({ data }: { data: User[] }) => {
      const returnRoles: User = {
        user_id: undefined,
        account_type: undefined,
        user_name: undefined,
      };
      if (data.length == 0) {
        returnRoles.account_type = "Invalid account";
      } else {
        const { account_type, user_id, user_name } = data[0];
        returnRoles.account_type = account_type;
        returnRoles.user_id = user_id;
        returnRoles.user_name = user_name;
      }
      return returnRoles;
    });
  return returnRoles;
};

export default auth;
