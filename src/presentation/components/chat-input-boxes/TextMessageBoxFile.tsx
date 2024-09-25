import { FormEvent, useRef, useState } from "react";

interface Props {
  onSendMessage: (message: string, files: File[]) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept: string;
}

const TextMessageBoxFile = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  accept,
}: Props) => {
  const [message, setMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim().length === 0 && selectedFiles.length === 0) return; // Asegurarse de que hay mensaje o archivos

    onSendMessage(message, selectedFiles);
    setMessage("");
    setSelectedFiles([]); // Limpiar los archivos seleccionados después de enviar
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Verificamos si event.target.files no es null y si tiene archivos
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);

      // Asegúrate de que no se seleccionen más de 3 archivos
      if (selectedFiles.length + filesArray.length > 3) {
        alert("You can only select up to 3 files.");
        return;
      }

      setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h16 rounded-xl bg-white w-full px-4"
    >
      <div className="mr-3">
        <button
          type="button"
          className="flex items-center justify-center text-gray-500 hover:text-gray-600"
          onClick={() => inputFileRef.current?.click()}
        >
          <i className="fa-solid fa-paperclip text-xl"></i>
        </button>
        <input
          type="file"
          ref={inputFileRef}
          accept={accept}
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            name="message"
            className="flex w-full border-2 rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disableCorrections ? "on" : "off"}
            autoCorrect={disableCorrections ? "on" : "off"}
            spellCheck={disableCorrections ? "true" : "false"}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className="ml-4">
        <button className="btn-primary">
          {selectedFiles.length === 0 ? (
            <span className="mr-2">Send</span>
          ) : (
            <span className="mr-2">
              {selectedFiles.length === 1
                ? selectedFiles[0].name.substring(0, 10) + "..."
                : `${selectedFiles.length} files`}
            </span>
          )}
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};

export default TextMessageBoxFile;
