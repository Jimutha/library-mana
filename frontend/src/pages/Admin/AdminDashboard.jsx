import PieChartComp from "../../components/Charts/PieChartComp";
import BarChartComp from "../../components/Charts/BarChartComp";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieChartComp />
        <BarChartComp />
      </div>
    </div>
  );
};

export default AdminDashboard;
