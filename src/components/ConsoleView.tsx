const ConsoleView: React.FC = () => {
  return (
    <div style={{
      background: "#0d0d0d",
      color: "#0f0",
      padding: "8px",
      fontFamily: "monospace",
      overflowY: "auto"
    }}>
      &gt; Console ready  
      <br />
      &gt; No errors yet  
    </div>
  );
};

export default ConsoleView;
