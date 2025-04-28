import { Model } from 'mongoose';

type paramTypes = {
  skip: number;
  count: number;
  totalPages: number;
  limit: number;
  page: number;
};

const paginationData = async <T>(req: Request, fn: Model<T>): Promise<paramTypes> => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '10');
  const skip = (page - 1) * limit;

  const count = await fn.countDocuments();
  const totalPages = Math.ceil(count / limit);

  return { skip, count, totalPages, limit, page };
};

export default paginationData;
