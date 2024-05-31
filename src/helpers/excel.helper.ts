const excelJS = require("exceljs");

export const createExcelFile = async (bills: any) => {
  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet("bills");

  worksheet.columns = [
    { header: "id", key: "id", width: 15 },
    { header: "address", key: "address", width: 15 },
    { header: "product name", key: "pname", width: 15 },
    { header: "quantity", key: "quantity", width: 15 },
    { header: "price", key: "price", width: 15 },
    { header: "color", key: "color", width: 15 },
    { header: "size", key: "size", width: 15 },
    { header: "totalPrice", key: "totalPrice", width: 15 },
  ];

  await bills.forEach((bill: any) =>
    bill.carts.forEach((cart: any) => {
      worksheet.addRow({
        id: bill.id,
        address: bill.address,
        pname: cart.product.name,
        quantity: cart.quantity,
        price: cart.product.price,
        color: cart.color,
        size: cart.size,
        totalPrice: cart.totalPrice,
      });
    })
  );

  return workbook;
};
