"use client"
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import 'highlight.js/styles/github-dark.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function App(){
    const linkRef = useRef<HTMLInputElement>(null);
    const [output, setOutput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const bufferRef = useRef("");
    const typingRef = useRef(false);
    const intervalRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const startTyping = () => {
        if (typingRef.current) return;
        typingRef.current = true;
        if (intervalRef.current !== null) return;
        intervalRef.current = window.setInterval(() => {
            const buffer = bufferRef.current;
            if (!buffer || buffer.length === 0) {
                typingRef.current = false;
                if (intervalRef.current !== null) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
                return;
            }
            const stepSize = 10;
            const chunk = buffer.slice(0, stepSize);
            bufferRef.current = buffer.slice(stepSize);
            setOutput(prev => {
                const next = prev + chunk;
                if (containerRef.current) {
                    containerRef.current.scrollTop = containerRef.current.scrollHeight;
                }
                return next;
            });
        }, 30);
    };

    useEffect(() => {
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []);

    const handleClick = async() => {
        const link = linkRef.current?.value;
        if(!link) return;
        setOutput("");
        setIsLoading(true);
        try{
            const res = await fetch("/api/generate-tweet",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({link})
            });
            if(!res.ok) throw new Error(await res.text());
            const reader = res.body?.getReader();
            const decoder = new TextDecoder();
            if(!reader){
                throw new Error("No readable stream from response");
            }
            while(true){
                const {value, done} = await reader.read();
                if(done) break;
                const chunk = decoder.decode(value, {stream:true});
                bufferRef.current += chunk;
                startTyping();
            }
        }catch(err:any){
            setOutput(`Error: ${err?.message ?? 'Something went wrong'}`)
        }finally{
            setIsLoading(false);
        }
    }

    return(
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto pt-32 p-2">
            <div className="flex items-center gap-2 w-full">
                <Input ref={linkRef} type="text" placeholder="Enter the Youtube Video link."/>
                <Button onClick={handleClick}> Generate ! </Button>
            </div>
            {isLoading && output.length === 0 && (
                <span className="m-2">Analysing the Youtube Content for a potential banger...</span>
            )}
            {output !== "" && (
                <div ref={containerRef} className="mt-6 w-full rounded-md border border-muted-foreground/30 p-4 bg-muted-foreground/20 text-base prose prose-invert prose-pre:whitespace-pre-wrap">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeHighlight]}
                        components={{
                            h1: ({ children, ...props }: any) => (
                                <h1 className="text-2xl md:text-3xl font-bold leading-tight mt-4 mb-3" {...props}>{children}</h1>
                            ),
                            h2: ({ children, ...props }: any) => (
                                <h2 className="text-xl md:text-2xl font-semibold leading-snug mt-6 mb-3" {...props}>{children}</h2>
                            ),
                            h3: ({ children, ...props }: any) => (
                                <h3 className="text-lg md:text-xl font-semibold leading-snug mt-4 mb-2" {...props}>{children}</h3>
                            ),
                            h4: ({ children, ...props }: any) => (
                                <h4 className="text-base md:text-lg font-medium leading-snug mt-3 mb-2" {...props}>{children}</h4>
                            ),
                            p: ({ children, ...props }: any) => (
                                <p className="my-2 leading-7 whitespace-pre-wrap" {...props}>{children}</p>
                            ),
                            ul: ({ children, ...props }: any) => (
                                <ul className="list-disc pl-6 my-2 space-y-1" {...props}>{children}</ul>
                            ),
                            ol: ({ children, ...props }: any) => (
                                <ol className="list-decimal pl-6 my-2 space-y-1" {...props}>{children}</ol>
                            ),
                            li: ({ children, ...props }: any) => (
                                <li className="leading-7" {...props}>{children}</li>
                            ),
                            a: ({ children, ...props }: any) => (
                                <a className="underline decoration-muted-foreground/50 hover:decoration-muted-foreground" {...props}>{children}</a>
                            ),
                            hr(){
                                return <div className="h-3" aria-hidden="true" />;
                            },
                            code({className, children, ...props}){
                                return (
                                    <code className={className} {...props}>
                                        {String(children)}
                                    </code>
                                );
                            },
                        }}
                    >
                        {output}
                    </ReactMarkdown>
                    {isLoading && (
                        <span className="ml-1 inline-block w-2 h-5 align-[-2px] bg-gray-400/60 animate-pulse" />
                    )}
                </div>
            )}
        </div>
    )
}