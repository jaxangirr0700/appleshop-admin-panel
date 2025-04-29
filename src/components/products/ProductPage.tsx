"use client";
import { Button, Table } from "antd";
import React, { useState } from "react";
import { ProductDataType, ProductType } from "../../types/product";
import { useDeleteData } from "../../utils/axiosData/deleteData";
import { useFetchData } from "../../utils/axiosData/getData";
import AddProduct from "./edits/AddProduct";
import EditProduct from "./edits/EditProduct";
import { CategoryDataType } from "../../types/categories";

function ProductPage() {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const pageSize = 5;
  const { data: productData, fetchData } = useFetchData<ProductDataType>(
    `/products?page=${currentPage}&limit=${pageSize}`
  );
  const products = productData?.items || [];
  const { data: categoryData, loading } =
    useFetchData<CategoryDataType>(`/categories`);
  const categories = categoryData?.items || [];
  const total = productData?.total || 0;
  const { deleteData } = useDeleteData();

  const showAddDrawer = () => setAddOpen(true);
  const onCloseAdd = () => setAddOpen(false);

  const handleDelete = async (id: number) => {
    setLoadingId(id);
    try {
      await deleteData(`products/${id}`, fetchData);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex gap-2 items-center justify-center mb-4">
        <Button>Umumiy Mahsulotlar: {total}</Button>
      </div>
      <AddProduct
        onClose={onCloseAdd}
        open={addOpen}
        showDrawer={showAddDrawer}
      />
      <EditProduct
        categories={categories}
        open={editOpen}
        product={editProduct}
        setEditProduct={setEditProduct}
      />
      <div style={{ overflowX: "auto" }}>
        <Table
          loading={loading}
          className="rounded-lg shadow-lg"
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              render: (id, product) => (
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setEditOpen(true);
                    setEditProduct(product);
                  }}
                >
                  {id}
                </span>
              ),
            },
            {
              title: "Name",
              dataIndex: "name",
            },
            {
              title: "Description",
              dataIndex: "description",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (price: number) => `$${price.toFixed(2)}`,
            },
            {
              title: "Stock",
              dataIndex: "stock",
            },
            {
              title: "Image",
              dataIndex: "imageUrl",
              render: (img: string) =>
                img ? (
                  <img
                    width={70}
                    height={70}
                    style={{ borderRadius: "10px" }}
                    src={img}
                    alt="Product Image"
                  />
                ) : (
                  <span className="w-[70px] h-[70px]">No Image</span>
                ),
            },
            {
              title: "Created At",
              dataIndex: "createdAt",
              render: (date) => new Date(date).toLocaleString("ru"),
            },
            {
              title: "Categorie",
              dataIndex: "categoryId",
              render: (categoryId) => {
                const category = categories.find((f) => categoryId === f.id);
                return category ? category.name : "Topilmadi";
              },
            },
            {
              title: "Delete",
              dataIndex: "id",
              render: (id) => (
                <Button
                  loading={loadingId === id}
                  danger
                  onClick={() => handleDelete(id)}
                >
                  Delete
                </Button>
              ),
            },
          ]}
          dataSource={products.map((product) => ({
            ...product,
            key: product.id,
          }))}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>
    </div>
  );
}

export default React.memo(ProductPage);
