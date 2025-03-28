"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const options = [
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C#", value: "csharp" },
  { label: "C++", value: "cpp" },
  { label: "Ruby", value: "ruby" },
  { label: "PHP", value: "php" },
  { label: "Swift", value: "swift" },
  { label: "Kotlin", value: "kotlin" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },
  { label: "TypeScript", value: "typescript" },
  { label: "Scala", value: "scala" },
  { label: "Perl", value: "perl" },
  { label: "Haskell", value: "haskell" },
  { label: "Lua", value: "lua" },
  { label: "Dart", value: "dart" },
  { label: "Elixir", value: "elixir" },
  { label: "Clojure", value: "clojure" },
  { label: "Shell", value: "shell" },
  { label: "R", value: "r" },
  { label: "MATLAB", value: "matlab" },
  { label: "Objective-C", value: "objective-c" },
  { label: "Assembly", value: "assembly" },
  { label: "F#", value: "fsharp" },
  { label: "VB.NET", value: "vbnet" },
  { label: "Erlang", value: "erlang" },
  { label: "Groovy", value: "groovy" },
  { label: "Fortran", value: "fortran" },
  { label: "COBOL", value: "cobol" },
  { label: "Ada", value: "ada" },
  { label: "Crystal", value: "crystal" },
  { label: "Nim", value: "nim" },
  { label: "Julia", value: "julia" },
  { label: "Prolog", value: "prolog" },
  { label: "Smalltalk", value: "smalltalk" },
  { label: "Scheme", value: "scheme" },
  { label: "Common Lisp", value: "common-lisp" },
  { label: "Pascal", value: "pascal" },
  { label: "Delphi", value: "delphi" },
  { label: "ABAP", value: "abap" },
  { label: "RPG", value: "rpg" },
  { label: "Tcl", value: "tcl" },
  { label: "Awk", value: "awk" },
  { label: "Bash", value: "bash" },
  { label: "PowerShell", value: "powershell" },
  { label: "Visual Basic", value: "visual-basic" },
  { label: "Scratch", value: "scratch" },
  { label: "COBOLScript", value: "cobolscript" },
  { label: "VHDL", value: "vhdl" },
  { label: "Verilog", value: "verilog" },
  { label: "PL/SQL", value: "plsql" },
  { label: "T-SQL", value: "tsql" },
  { label: "SQL", value: "sql" },
  { label: "APL", value: "apl" },
  { label: "Eiffel", value: "eiffel" },
  { label: "OCaml", value: "ocaml" },
  { label: "Racket", value: "racket" },
  { label: "Forth", value: "forth" },
  { label: "PostScript", value: "postscript" },
  { label: "ActionScript", value: "actionscript" },
  { label: "ColdFusion", value: "coldfusion" },
  { label: "XQuery", value: "xquery" },
  { label: "VBScript", value: "vbscript" },
  { label: "FoxPro", value: "foxpro" },
  { label: "LiveCode", value: "livecode" },
  { label: "Q#", value: "qsharp" },
  { label: "Zig", value: "zig" },
  { label: "Io", value: "io" },
  { label: "Pony", value: "pony" },
  { label: "Chapel", value: "chapel" },
  { label: "Euphoria", value: "euphoria" },
  { label: "REXX", value: "rexx" },
  { label: "Icon", value: "icon" },
  { label: "J", value: "j" },
  { label: "K", value: "k" },
  { label: "Q", value: "q" },
  { label: "Max", value: "max" },
  { label: "PureScript", value: "purescript" },
  { label: "Reason", value: "reason" },
  { label: "SML", value: "sml" },
  { label: "Vala", value: "vala" },
  { label: "Wolfram", value: "wolfram" },
  { label: "XSLT", value: "xslt" },
  { label: "YAML", value: "yaml" },
  { label: "ZPL", value: "zpl" },
];

const formSchema = z.object({
  name_0227459574: z.array(z.string()).nonempty("Please at least one item"),
});

export default function TechStackForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_0227459574: ["React"],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="name_0227459574"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select your framework</FormLabel>
              <FormControl>
                <MultiSelector
                  values={field.value}
                  onValuesChange={field.onChange}
                  loop
                  className="max-w-xs"
                >
                  <MultiSelectorTrigger>
                    <MultiSelectorInput placeholder="Select languages" />
                  </MultiSelectorTrigger>
                  <MultiSelectorContent>
                    <MultiSelectorList>
                      {options.map((option, i) => (
                        <MultiSelectorItem key={i} value={option.label}>
                          {option.value}
                        </MultiSelectorItem>
                      ))}
                    </MultiSelectorList>
                  </MultiSelectorContent>
                </MultiSelector>
              </FormControl>
              <FormDescription>Select multiple options.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
