import { validateSession } from '@/lib/get-session';
import prisma from '@/lib/prisma';

export default async function AdminPage() {
  const session = await validateSession(true, 'admin');

  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold font-display mb-8">Admin Panel</h1>
      <h2>Authorized as {session?.user.email}</h2>
      <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 bg-neutral-50 border-b border-neutral-200">
          <h2 className="font-semibold">All Users ({users.length})</h2>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-neutral-500 border-b border-neutral-100">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Email</th>
              <th className="p-4 font-medium">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {users.map((user) => (
              <tr key={user.id} className="text-sm hover:bg-neutral-50/50">
                <td className="p-4">{user.name}</td>
                <td className="p-4 text-neutral-600">{user.email}</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/10">
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
