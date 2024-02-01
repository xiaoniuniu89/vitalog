"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader, Plus } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DiaryEntry } from "@prisma/client";

type handleSave = (newEntry: { data: DiaryEntry }) => Promise<void>;

const FormSchema = z.object({
  entry: z
    .string()
    .min(10, {
      message: "Entry must be at least 10 characters",
    })
    .max(200, {
      message: "Entry must be less than 200 characters",
    }),
});

function AddEntry({
  handleSave,
  entryDate,
}: {
  handleSave: handleSave;
  entryDate: string;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitDisabled(true);
    const sanitizedEntry = data.entry.trim();

    fetch(`/api/entry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ entry: sanitizedEntry, createdAt: entryDate }),
    })
      .then((response) => response.json())
      .then((newEntry) => {
        handleSave(newEntry);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error: " + error.message);
      })
      .finally(() => {
        setIsSubmitDisabled(false);
      });
  }

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const maxChars = 200;
  const entryValue = form.watch("entry", "");
  const remainingChars = maxChars - entryValue.length;

  // if (isSubmitDisabled) {
  //   return <Loader className="m-auto animate-spin" />;
  // }

  return (
    <div className="flex flex-col justify-center h-full my-8">
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="entry"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Entry</FormLabel> */}
                  <FormControl>
                    <Textarea
                      maxLength={maxChars}
                      placeholder="What did you eat today?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {remainingChars} characters remaining
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-2"
              disabled={isSubmitDisabled}
              variant="vitaGreen"
            >
              Submit
            </Button>
          </form>
        </Form>
      ) : (
        <Button
          className="m-auto "
          variant="outline"
          size={"icon"}
          onClick={() => setIsEditing(true)}
        >
          <Plus color="grey" />
        </Button>
      )}
    </div>
  );
}

export default AddEntry;
