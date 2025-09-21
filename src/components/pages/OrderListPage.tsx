import OrdersTable from '../dashboard/OrdersTable';

export default function OrderListPage() {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-foreground">
          Order List
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage and track all your orders in one place
        </p>
      </div>
      <div className="flex-1 min-h-0">
        <OrdersTable />
      </div>
    </div>
  );
}
