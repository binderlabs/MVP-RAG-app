import type { MessageResponse } from "../../interfaces";

export const messageUseCase = async (prompt: string) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_GPT_API}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) throw new Error("Can't recibe answer");

    const data = (await res.json()) as MessageResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Cant do correction ",
    };
  }
};
