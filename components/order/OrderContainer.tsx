import React from "react";
import IndividualOrder from "./IndividualOrder";
import { PackageSearch } from "lucide-react";
import { getOrders } from "@/lib/api";
import { auth } from "@/auth";
import { OrderType } from "@/lib/type";
import { redirect } from "next/navigation";
import Link from "next/link";

const OrderContainer = async () => {
  const session = await auth();
  const loggedInUserEmail = session?.user?.email;
  const orders = await getOrders(loggedInUserEmail);

  if(!session) {
    redirect('/')
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="w-full py-16 px-6 text-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
            <PackageSearch className="w-10 h-10 text-gray-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Orders Yet!
            </h3>
            <p className="text-gray-600 max-w-md">
              You haven't made any purchases yet. Start shopping to see your orders here.
            </p>
          </div>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <span>Start Shopping</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-h-[600px] overflow-y-auto space-y-4">
      {orders.map((order: OrderType) => (
        <IndividualOrder key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderContainer;
