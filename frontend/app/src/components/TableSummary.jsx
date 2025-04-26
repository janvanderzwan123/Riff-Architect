function TableSummary({ title, data, onCreate }) {
    if (!Array.isArray(data)) {
      data = [];
    }
  
    return (
      <div style={{ marginBottom: '40px' }}>
        <h2>{title}</h2>
        <button onClick={onCreate}>Create New</button>
        <table>
          <thead>
            <tr>
              {data.length > 0 && Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default TableSummary;
  