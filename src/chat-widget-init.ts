
import ReactDOM from "react-dom";


const initChatWidget = (options = {}) => {
  // Create a container element for the chat widget
  const container = document.createElement("div");
  container.id = "chat-widget-container";
  document.body.appendChild(container);

  // Render the UserChat component into the container
  ReactDOM.render(<UserChat {...options} />, container);
};

// Expose the init function globally
window.ChatWidget = { init: initChatWidget };
