import { useState } from "react";
import {
  GPTMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from "../components";
import GptMessage from "../components/chat-bubbles/GPTMessage";

interface Message {
  text: string;
  isGpt: boolean;
}

const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    //TODO: UseCase

    setIsLoading(false);

    //TODO: add gpt true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GPTMessage text="Write your text in english" />

          {messages.map((message: Message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text="This is Open AI" />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>
      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Any Questions?"
        disableCorrections={true}
      />
    </div>
  );
};

export default ChatTemplate;
