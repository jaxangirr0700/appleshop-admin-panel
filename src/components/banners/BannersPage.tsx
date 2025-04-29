"use client";
import { Button, Switch, Table } from "antd";
import React, { useState } from "react";
import useAuthStore from "../../store/my-auth-store";
import { useDeleteData } from "../../utils/axiosData/deleteData";
import { useFetchData } from "../../utils/axiosData/getData";
import { PatchtData } from "../../utils/axiosData/PatchData";
import AddBanners from "./edits/AddBanner";
import EditBanners from "./edits/EditBanner";
import { BannersDataType, BannerType } from "../../types/banners-type";



function BannersPage() {
  const MyAuthState = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<BannerType | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const pageSize = 5;

  const {
    data: bannersData,
    fetchData,
    loading,
  } = useFetchData<BannersDataType>(
    `/banners?limit=${pageSize}&page=${currentPage}&order=ASC`
  );
  const { deleteData } = useDeleteData();
  const banners = bannersData?.items || [];
  const total = bannersData?.total || 0;
  const showAddDrawer = () => setAddOpen(true);
  const onCloseAdd = () => setAddOpen(false);
  const onCloseEdit = () => setEditOpen(false);
  const handleDelete = async (id: number) => {
    setLoadingId(id);
    try {
      await deleteData(`products/${id}`, fetchData);
    } finally {
      setLoadingId(null);
    }
  };
  return (
    <>
      <div className="flex flex-col p-4">
        <h1 className="mb-4">Bannerlar Ro'yxati</h1>
        <AddBanners
          onCloseAdd={onCloseAdd}
          addOpen={addOpen}
          showAddDrawer={showAddDrawer}
        />
        <EditBanners
          open={editOpen}
          onCloseEdit={onCloseEdit}
          banner={editBanner}
          fetchData={fetchData}
        />
        <Table
          loading={loading}
          className="rounded-lg shadow-lg"
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              render: (id: number, banner: BannerType) => (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setEditOpen(true);
                    setEditBanner(banner);
                  }}
                >
                  {id}
                </span>
              ),
            },
            {
              title: "Nomi",
              dataIndex: "title",
            },
            {
              title: "Image",
              dataIndex: "imageUrl",
              render: (img: string) =>
                img && img ? (
                  <img
                    className="max-w-30 max-h-30 object-cover"
                    style={{
                      borderRadius: "10px",
                      width: "auto",
                      height: "auto",
                    }}
                    src={img}
                    alt="Banner Image"
                  />
                ) : (
                  <span className="w-[70px] h-[70px]">No Image</span>
                ),
            },
            {
              title: "Tavsif",
              dataIndex: "isActive",
              render: (isActive: boolean, banner: BannerType) => (
                <Switch
                  onChange={() => {
                    const newBanner = {
                      title: banner.title,
                      imageUrl: banner.imageUrl,
                      isActive: !banner.isActive,
                    };
                    PatchtData(
                      `banners/${banner.id}`,
                      newBanner,
                      MyAuthState.token,
                      fetchData
                    );
                    fetchData();
                  }}
                  checked={isActive}
                />
              ),
            },
            {
              title: "Hosil qilingan",
              dataIndex: "createdAt",
              render: (date: string) => new Date(date).toLocaleString("ru"),
            },
            {
              title: "Delete",
              dataIndex: "id",
              render: (id: number) => (
                <Button
                  danger
                  loading={loadingId === id}
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  Delete
                </Button>
              ),
            },
          ]}
          dataSource={banners.map((banner) => ({
            ...banner,
            key: banner.id,
          }))}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>
    </>
  );
}

export default React.memo(BannersPage);
