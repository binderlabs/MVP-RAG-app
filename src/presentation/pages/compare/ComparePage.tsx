import { useState } from "react";
import {
  GPTMessage,
  MyMessage,
  TextMessageBoxFile,
  TypingLoader,
} from "../../components";
import GptMessage from "../../components/chat-bubbles/GPTMessage";
import { compareUseCase } from "../../../core/uses-cases/compare.usecase";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    message: string;
  };
}

const ComparePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, files: File[]) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { ok, message } = await compareUseCase(text, files);
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
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GPTMessage message="Write your compare question in english" />

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
      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Any Questions?"
        disableCorrections={true}
        accept=".pdf"
      />
    </div>
  );
};

export default ComparePage;
