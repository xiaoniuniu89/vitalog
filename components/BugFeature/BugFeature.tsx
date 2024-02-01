import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "../ui/input";

export function BugFeature() {
  const FormSchema = z.object({
    type: z.enum(["bug", "enhancement"], {
      required_error: "You need to select a request type.",
    }),
    content: z
      .string()
      .min(10, {
        message: "Entry must be at least 10 characters",
      })
      .max(200, {
        message: "Entry must be less than 500 characters",
      }),
    title: z
      .string()
      .min(5, {
        message: "title must be at least 5 characters",
      })
      .max(50, {
        message: "Title must be less than 50 characters",
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitDisabled(true);
    const sanitizedContent = data.content.trim();
    const sanitizedTitle = data.title.trim();
    const sanitizedType = data.type.trim();

    fetch(`/api/github/issues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: sanitizedContent,
        title: sanitizedTitle,
        label: sanitizedType,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        alert("Success: " + res.message);
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
  const maxChars = 500;
  const contentValue = form.watch("content", "");
  const remainingChars = maxChars - contentValue.length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Bug/Feature Request</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bug/Feature</DialogTitle>
          <DialogDescription>Log a bug or feature request</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Bug or feature request?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1 py-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="bug" />
                        </FormControl>
                        <FormLabel className="font-normal">Bug</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="enhancement" />
                        </FormControl>
                        <FormLabel className="font-normal">Feature</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="pb-4">
                  {/* <FormLabel>Entry</FormLabel> */}
                  <FormControl>
                    <Input maxLength={50} placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Entry</FormLabel> */}
                  <FormControl>
                    <Textarea
                      maxLength={maxChars}
                      placeholder="Content....."
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
              className="mt-2 w-full"
              disabled={isSubmitDisabled}
              variant="vitaGreen"
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
