import { useState } from "react";
import {
  GPTMessage,
  MyMessage,
  TextMessageBox,
  TypingLoader,
} from "../../components";
import GptMessage from "../../components/chat-bubbles/GPTMessage";
import { messageUseCase } from "../../../core/uses-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    message: string;
  };
}

const MessagePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { ok, message } = await messageUseCase(text);
    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: "Couldn't anwser, try again", isGpt: true },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          isGpt: true,
          info: { message },
        },
      ]);
    }
    setIsLoading(false);

    //TODO: add gpt true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GPTMessage message="Write your text in english" />

          {messages.map((message: Message, index) =>
            message.isGpt ? (
              <GptMessage key={index} {...message.info!} />
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

export default MessagePage;
