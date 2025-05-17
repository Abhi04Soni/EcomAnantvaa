const Orders = () => {
    // Dummy order data
    const orders = [
      { id: '12345', date: '2024-04-21', status: 'Shipped', total: '$59.99' },
      { id: '12346', date: '2024-04-10', status: 'Delivered', total: '$89.99' },
    ];
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-[rgb(82,52,26)]">My Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-2 px-4 border">Order ID</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.date}</td>
                  <td className="py-2 px-4">{order.status}</td>
                  <td className="py-2 px-4">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Orders;
  