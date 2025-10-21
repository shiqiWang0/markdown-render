import "./index.css";
import MarkdownViewer from "./components/markDown";
import { exampleMarkdown } from "./mock/doc";

function App() {
  return <MarkdownViewer markdown={exampleMarkdown} />;
}

export default App;
