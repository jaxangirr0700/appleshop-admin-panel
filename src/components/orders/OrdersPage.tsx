import { Button, Table } from "antd";
import React, { useState } from "react";
import { useDeleteData } from "../../utils/axiosData/deleteData";
import { useFetchData } from "../../utils/axiosData/getData";
import AddOrders from "./edits/AddOrders";
import EditOrders from "./edits/EditOrders";
import { OrderDataType, OrsderType } from "../../types/orders";
import { UserDatatype, UserType } from "../../types/users";

function OrdersPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [addOpen, setAddOpen] = useState<boolean>(false);
  const [editOrder, setEditOrder] = useState<OrsderType | null>(null);
  const pageSize = 10;
  const {
    data: orderData,
    fetchData,
    loading,
  } = useFetchData<OrderDataType>(
    `/orders?limit=${pageSize}&page=${currentPage}&order=ASC`
  );
  const { data: usersData } = useFetchData<UserDatatype>(`/users`);
  const { deleteData, loadingDelete } = useDeleteData();

  const showAddDrawer = () => setAddOpen(true);
  const onCloseAdd = () => setAddOpen(false);

  const orders = orderData?.items || [];
  const total = orderData?.total || 0;
  const users: UserType[] = usersData?.items || [];

  return (
    <div className="flex flex-col p-4">
      <AddOrders
        open={addOpen}
        showDrawer={showAddDrawer}
        onClose={onCloseAdd}
        getOrders={fetchData}
      />
      <EditOrders
        item={editOrder}
        fetchData={fetchData}
        setItem={setEditOrder}
      />
      <Table
        loading={loading}
        className="rounded-lg shadow-lg"
        rowKey={"id"}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            render: (id, order) => {
              return (
                <span
                  className=" cursor-pointer"
                  onClick={() => {
                    setEditOrder(order);
                  }}
                >
                  {id}
                </span>
              );
            },
          },
          {
            title: "Foydalanuvchi",
            dataIndex: "customerId",
            render: (userID) => {
              const user = users.find((f) => f.id === userID);

              return <>{user ? user.name : "Noma'lum"}</>;
            },
          },

          {
            title: "Narxi",
            dataIndex: "totalPrice",
          },
          {
            title: "Status",
            dataIndex: "status",
          },

          {
            title: "Xosil qilingan",
            dataIndex: "createdAt",
            render: (date) => new Date(date).toLocaleString("ru"),
          },
          {
            title: "Delete",
            dataIndex: "id",
            render: (id) => (
              <Button
                loading={loadingDelete}
                danger
                onClick={async () => {
                  await deleteData(`banners/${id}`, fetchData);
                }}
              >
                Delete
              </Button>
            ),
          },
        ]}
        dataSource={orders}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    </div>
  );
}

export default React.memo(OrdersPage);
