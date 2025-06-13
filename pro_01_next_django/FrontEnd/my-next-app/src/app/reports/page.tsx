import Chart01 from '../../components/charts/test/chart01/Chart01';
import Chart02 from '../../components/charts/test/chart02/Chart01';
import Chart03 from '../../components/charts/test/chart03/Chart01';

export default function ReportsPage() {
  return (
    <div className="container mt-4">
      <h1>Reports</h1>
      <Chart01 />
      <Chart02 />
      <Chart03 />
    </div>
  );
}