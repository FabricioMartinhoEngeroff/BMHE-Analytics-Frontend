interface TableProps {
    data: { [key: string]: string | number }[];
    columns: string[];
    loading?: boolean;
  }
  
  export default function InsightTable({ data, columns, loading = false }: TableProps) {
    return (
      <div className="table-container">
        <h2>Relatório de Insights</h2>
  
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column}>{row[column]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
  