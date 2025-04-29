export type BannerType = {
    id: number;
    createdAt: string;
    imageUrl: string;
    isActive: boolean;
    title: string;
  };
  
  export type BannersDataType = {
    items: BannerType[];
    message: string;
    page: number;
    total: number;
  };