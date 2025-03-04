import React, { useEffect, useState } from "react";
import Sidebar from "../../components/insightsComponents/Sidebar";
import Header from "../../components/insightsComponents/Header";
import Chart from "../../components/insightsComponents/Chart";
import InsightTable from "../../components/insightsComponents/Table";
import { getInsightsData } from "../../services/insightsService";
import "../../styles/insightStyle.css";

export const InsightsPage: React.FC = () => {
  const [chartData, setChartData] = useState<{ name: string; [key: string]: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getInsightsData();
      setChartData(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="insights-container">
      <Sidebar />

      <div className="main-content">
        <Header title="Painel de Insights" />

        <div className="insights-content">
          <Chart data={chartData} />
          <InsightTable 
            data={chartData} 
            columns={["name", "vendas", "lucro", "clientes"]}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};
