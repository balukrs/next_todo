import { Model } from 'mongoose';
import { pageParams } from '@/types/pagination';

const paginationData = async <T>(req: Request, fn: Model<T>): Promise<pageParams> => {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') ?? '1');
  const limit = parseInt(searchParams.get('limit') ?? '10');
  const skip = (page - 1) * limit;

  const count = await fn.countDocuments();
  const totalPages = Math.ceil(count / limit);

  return { skip, count, totalPages, limit, page };
};

export default paginationData;
