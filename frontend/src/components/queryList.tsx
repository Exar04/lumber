import { Link } from "react-router";
import { Button } from "./ui/button";
import { useState } from "react";
import { ScrollArea } from "./ui/scroll-area";

export function QueryList() {
    const [queries, setQueries] = useState<string[]>([])

    const addNewQuery = () => {
        let baseName = "newQuery";
        let counter = 1;

        while (queries.includes(`${baseName}${counter}`)) {
            counter++;
        }

        const newQueryName = `${baseName}${counter}`;
        setQueries([...queries, newQueryName]);
    };

    return (
        <ScrollArea className=" px-3 h-full ">
            <Button className=" w-full  mb-3" type="button" variant="secondary" onClick={() => { addNewQuery() }}>Add New Query</Button>
            {queries.map((item, id) => (
                <Link to={`/query/${item}`} className=" w-full" key={id}>
                    <Button className=" w-full bg-zinc-900/80 hover:bg-zinc-300 my-1" type="button" variant="ghost">{item}</Button>
                </Link>
            ))}
        </ScrollArea>
    )
}