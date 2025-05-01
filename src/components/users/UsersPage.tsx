"use client";
import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useFetchData } from "../../utils/axiosData/getData";
import UsersApi from "../../utils/axiosData/UsersApi";
import AddUsers from "./edits/AddUsers";
import EditUser from "./edits/EditUser";
import { UserDatatype, UserType } from "../../types/users";

function UsersPage() {
  const [AddOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserType | null>(null);
  const [loadingAll, setLoadingAll] = useState<boolean>(false);
  const {
    data: userData,
    fetchData,
    loading,
  } = useFetchData<UserDatatype>(`/users`);
  const showDrawer = () => setAddOpen(true);
  const onClose = () => setAddOpen(false);
  const onCloseEdit = () => setEditOpen(false);
  const user = userData?.items || [];

  useEffect(() => {
    setLoadingAll(loading);
  }, [loading]);
  async function hendleDelete(id: number) {
    setLoadingAll(true);
    try {
      await UsersApi.delete(id);
    } catch (error) {
      console.log(error);
    } finally {
      fetchData();
      setLoadingAll(false);
    }
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex gap-2 items-center justify-center mb-4">
        <Button
          onClick={() => console.log(`Userlarning umumiy soni ${user.length}`)}
        >
          Umumiy son: {user.length}
        </Button>
      </div>

      <div className="flex flex-col my-5 w-full">
        <AddUsers
          onClose={onClose}
          open={AddOpen}
          showDrawer={showDrawer}
          fetchData={fetchData}
        />
        <EditUser
          onCloseEdit={onCloseEdit}
          open={editOpen}
          user={editUser}
          fetchData={fetchData}
        />
        <div style={{ overflowX: "auto" }}>
          <Table
            loading={loadingAll}
            className="rounded-lg shadow-lg"
            columns={[
              {
                title: "ID",
                dataIndex: "id",
                render: (id, user) => (
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setEditOpen(true);
                      setEditUser(user);
                    }}
                  >
                    {id}
                  </span>
                ),
              },
              {
                title: "Ismi",
                dataIndex: "name",
              },
              {
                title: "Email",
                dataIndex: "email",
                responsive: ["md"],
              },
              {
                title: "Photo",
                dataIndex: "image",
                render: (img: string, user: UserType) =>
                  img &&
                  (img.startsWith("http://") || img.startsWith("https://")) ? (
                    <img
                      width={50}
                      height={50}
                      style={{ borderRadius: "10px" }}
                      src={img}
                      alt={user.name}
                    />
                  ) : (
                    <span>Mavjud emas</span>
                  ),
              },
              {
                title: "Roli",
                dataIndex: "role",
              },
              {
                title: "Phone",
                dataIndex: "phone",
              },
              {
                title: "Saqlangan",
                dataIndex: "createdAt",
                render: (create) => {
                  const date = new Date(create);
                  return <span>{date.toLocaleString()}</span>;
                },
              },
              {
                title: "Delete",
                dataIndex: "id",
                render: (id) => (
                  <Button
                    color="danger"
                    variant="filled"
                    onClick={() => {
                      hendleDelete(id);
                    }}
                  >
                    Delete
                  </Button>
                ),
              },
            ]}
            dataSource={user.map((i) => ({ ...i, key: i.id }))}
            pagination={{ pageSize: 5 }}
            scroll={{ x: true }}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(UsersPage);
