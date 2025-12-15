export default function Account() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Account</h1>
      <div className="space-y-4">
        <div>Email: <strong>user@example.com</strong></div>
        <div>Company: <strong>Your Company Ltd</strong></div>
        <button className="mt-4 px-4 py-2 border rounded" disabled>Change Password (TODO)</button>
      </div>
    </div>
  );
}
