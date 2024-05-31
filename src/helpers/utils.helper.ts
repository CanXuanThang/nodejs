export const getPagingData = (data: any, page: number, limit: number) => {
  let { count: totoalItems, rows: rows } = data;

  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totoalItems / limit);
  return { totoalItems, rows, totalPages, currentPage };
};
