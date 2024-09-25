import type { MessageResponse } from "../../interfaces";

export const compareUseCase = async (prompt: string, files: File[]) => {
  try {
    const formData = new FormData();

    formData.append("messageDto", JSON.stringify({ prompt }));
    console.log("prompt");
    console.log(prompt);
    console.log(files);
    files.forEach((file) => {
      formData.append("files", file);
    });

    const res = await fetch(`${import.meta.env.VITE_GPT_API}/compare`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Can't receive answer");

    const data = (await res.json()) as MessageResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Can't do correction",
    };
  }
};
