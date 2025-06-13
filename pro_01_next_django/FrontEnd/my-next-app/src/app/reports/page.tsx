import Chart01 from '../../components/charts/test/chart01/Chart01';
import Chart02 from '../../components/charts/test/chart02/Chart01';
import Chart03 from '../../components/charts/test/chart03/Chart01';
import StepChart from '../../components/charts/test/stepChart';
import WaterfallChart from '../../components/charts/test/WaterfallChart';

export default function ReportsPage() {
    
  return (
    <div className="container mt-4">
      <h1>Reports</h1>
      <Chart01 />
      <Chart02 />
      <Chart03 />
      <h2 className="mt-5">Step Chart</h2>
      <StepChart data={[10, 20, 30, 25, 35, 40, 30]} />
      <h2 className="mt-5">Waterfall Chart</h2>
      <WaterfallChart data={[10, -5, 15, -10, 5, 20, -15]} />
    </div>
  );
}