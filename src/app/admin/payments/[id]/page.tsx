'use client'

import Link from "next/link";

export const PaymentDetailsPage = () => {
  return (
    <div className="w-full px-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-blue-600">Payment Details</h2>
        </div>
        <div className="px-6 py-4">
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-sm text-left text-gray-600">
              <tbody>
                <tr>
                  <th className="py-2 pr-4 font-medium text-gray-700">Transaction Reference</th>
                  <td className="py-2">{locals?.post_data}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4 font-medium text-gray-700">User</th>
                  <td className="py-2">
                    {locals?.user_id ? (
                      <Link href={`/admin/users/${uid}`} className="text-blue-500 underline">
                        {locals?.last_name} {locals?.first_name}
                      </Link>
                    ) : (
                      "Guest"
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="py-2 pr-4 font-medium text-gray-700">Email</th>
                  <td className="py-2">{locals?.email}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4 font-medium text-gray-700">Amount</th>
                  <td className="py-2">{locals?.amount}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4 font-medium text-gray-700">Payment Status</th>
                  <td className="py-2">{locals?.payment_status_id}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4 font-medium text-gray-700">Response Data</th>
                  <td className="py-2">{locals?.response_data}</td>
                </tr>
                <tr>
                  <th className="py-2 pr-4 font-medium text-gray-700">Completed</th>
                  <td className="py-2">{String(locals?.completed)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
