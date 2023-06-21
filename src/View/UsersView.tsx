import { useEffect, useState } from "react";
import { getAllCustomer } from "../Service/UserService";
import { IUser } from "../interface";
import { UserList } from "../components/user/UserList";

export function UsersView() {
  //TODO:get all users except admin
  const [customers, setCustomers] = useState<IUser[]>([]);

  useEffect(() => {
    getAllCustomer().then((res) => {
      setCustomers(res);
    });
  }, []);

  return (
    <>
      <h1>UsersView</h1>
      <UserList users={customers}></UserList>
    </>
  );
}
