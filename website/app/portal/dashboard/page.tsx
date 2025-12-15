export default function Dashboard() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">Active Toolkit: <strong>Growth Engine</strong></div>
        <div className="p-4 border rounded">Tasks: <strong>3</strong></div>
        <div className="p-4 border rounded">Upcoming Call: <strong>None</strong></div>
      </div>
    </div>
  );
}
