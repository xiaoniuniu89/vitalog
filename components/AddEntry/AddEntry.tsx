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
import { Plus } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  entry: z
    .string()
    .min(10, {
      message: "Entry must be at least 10 characters",
    })
    .max(160, {
      message: "Entry must be less than 300 characters",
    }),
});

function AddEntry({setNotes, entryDate}: {setNotes: React.Dispatch<any>, entryDate: string}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitDisabled(true);
    const sanitizedEntry = data.entry.trim();
  
    fetch(`/api/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ entry: sanitizedEntry, createdAt: entryDate }),
    })
    .then(response => response.json()) // Resolve the first promise and parse the JSON
    .then(newEntry => {
      console.log(newEntry)
      // @ts-ignore
        setNotes((prevNotes) => [...prevNotes, newEntry.data]);
    })
    .catch(error => {
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
            <Button type="submit" className="mt-2">
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
