import { openai } from "./openai";
import { DiaryEntry } from "@prisma/client";

const formatMessage = (
  message: string,
  role: "assistant" | "system" | "user"
) => {
  return { role: role, content: message };
};

const systemPromptDaily =
  "You are an AI nutrition assistant and we are analysing a note submitted by a user. The note contains the food the user ate for the day. We should provide the user feedback on how healthy their meals were. We should provide feedback regarding the amount of calories consumed, levels of saturated fat consumed and anything else that was unhealthy. You should also compare their nutritional intake compared to average human reccommended daily intake. It is ok not to be entirely accurate but you should try to give estimates of calories, saturated fats and things like that. If the user ate in an overall healthy way then tell them so. Your answer should be around 300 characters but can go to 500 if needed. ";

const systemPromptWeekly =
  "You are an AI nutrition assistant. We are analysing the some daily food notes. There may be 0, in which case your analysis can reflect that no notes were given. There may be up to 7 notes. Each note represents a daily food journal. Analyse each note and give overall feedback for the week on how healthy their meals were. Each note contains the food the user ate for the day. We should provide the user feedback on how healthy their meals were. We should provide feedback regarding the amount of calories consumed, levels of saturated fat consumed and anything else that was unhealthy. It is ok not to be entirely accurate but you should try to give estimates of calories, saturated fats and things like that. If the user ate in an overall healthy way then tell them so. Your answer should be around 500 characters but can go to 700 if needed.";

export const getDiaryEntryAnalysis = async (message: string) => {
  const systemMessage = formatMessage(systemPromptDaily, "system");
  const userMessage = formatMessage(message, "user");

  const result = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [systemMessage, userMessage],
    temperature: 0.6,
  });

  return result;
};

export const createWeeklySummary = async (notes: DiaryEntry[]) => {
  const systemMessage = formatMessage(systemPromptWeekly, "system");
  const userMessages = notes.map((note) => formatMessage(note.content, "user"));

  const result = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [systemMessage, ...userMessages],
    temperature: 0.6,
  });

  return result;
};
