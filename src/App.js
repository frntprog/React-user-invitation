import React from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users/Users";
import { useState } from "react";
import { useEffect } from "react";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetch("https://reqres.in/api/users");
      const json = await data.json();
      setUsers(json.data);
    };

    fetchUsers()
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const changeSearchValueHandle = (e) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvides = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          onChangeSearchValue={changeSearchValueHandle}
          onClickSendInvides={onClickSendInvides}
          onClickInvite={onClickInvite}
          searchValue={searchValue}
          isLoading={isLoading}
          invites={invites}
          items={users}
        />
      )}
    </div>
  );
}

export default App;
