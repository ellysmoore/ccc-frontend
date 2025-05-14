export interface PaginationRequest {
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  status: string;
  data: T[];
  meta?: {
    page: number;
    total_pages: number;
    total_items: number;
  };
};

export interface MessageProps {
  text:  string;
  type: 'failed' | 'success' | '';
  handleClose?: () => void;
}